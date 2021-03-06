import {store} from 'utils/';
import VueCookie from 'vue-cookie'
export default {
	name: 'head-nav',
	data() {
	  return {
		menusData:[],
			name:'',
		dialog: {
			show_access: false,
			show_set: false,
			show_pass: false,
			title: '修改密码',
			user_info: this.$store.state.user.userinfo,

			set_info: {
				login_style: '',
				disabled_update_pass: [],
				select_users: []
			},

			user_info_rules: {
				old_password: [{
					required: true,
					message: '旧密码不能为空！',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '新密码不能为空！',
					trigger: 'blur'
				}, {
					trigger: 'blur',
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('请再次输入密码'));
						} else {
							if ('' !== this.dialog.user_info.password) {
								this.$refs.user_info.validateField('password_confirm');
							}
							callback();
						}
					}
				}],
				password_confirm: [{
					required: true,
					message: '确认密码不能为空！',
					trigger: 'blur'
				}, {
					trigger: 'blur',
					validator: (rule, value, callback) => {
						if (value === '') {
							callback(new Error('请再次输入密码'));
						} else if (value !== this.dialog.user_info.password) {
							callback(new Error('两次输入密码不一致!'));
						} else {
							callback();
						}
					}
				}],
			}
		}
	  }
	},
	mounted() {
	  // this.setDialogInfo('access');
	  this.initRouters();
		this.name = store.get('userinfo').name;
	},
	methods: {
		//修复切换主菜单不高亮的问题
		changeMenu(key){
			this.$emit('complete', false);
			setTimeout(()=> {
				if(key == '/service') return
				this.$emit('complete', true);
			}, 50);
		},
		initRouters(){
				var routes = this.$router.options.routes;
				var permission = store.get('permission');
				var arr = [];
				for (var i = 0; i < routes.length; i++) {
					if (routes[i].hidden !== true) {
						var tempObj      = {},
							module       = routes[i],
							menus        = module.children || [];
						tempObj.name     = module.meta.name;
						tempObj.path     = module.path;
						tempObj.access   = module.path;
						tempObj.isAllowed = true;
						tempObj.children = [];
						for (var j = 0; j < menus.length; j++) {
							if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
								var tempChildObj      = {},
									menu              = menus[j],
									pages             = menu.children;
								tempChildObj.name     = menu.meta.name;
								tempChildObj.path     = '/' + menu.path;
								tempChildObj.access   = tempObj.path + '/' + menu.path;
								tempChildObj.isAllowed = true;
								tempChildObj.children = [];
								for (var k = 0; k < pages.length; k++) {
									if (pages[k].hidden !== true) {
										var tempPageObj    = {},
											page           = pages[k];
										tempPageObj.name   = page.meta.name;
										tempPageObj.path   = '/' + page.path;
										tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
										tempPageObj.isAllowed = true;
										if (tempPageObj.isAllowed) {
											tempChildObj.children.push(tempPageObj);
										}
									}
								}
								if (tempChildObj.isAllowed) {
									tempObj.children.push(tempChildObj);
								}
							}
						}
						if (tempObj.isAllowed) {
							arr.push(tempObj);
						}
					}
				}
				this.menusData = [].concat(arr);
				store.set('menusData', this.menusData);
				if(this.$route.name == 'bsOrderList') return
				this.$emit('complete', true);
		},
		/**
		 * 退出登录
		 */
		logout() {
			this.$confirm('你确定退出登录么?', '确认退出', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// this.$http.put(CONFIG.adminUrl+'/api/logout?access_token=' + VueCookie.get('token'))
				// .then((resp) => {
				// 	this.$store.dispatch('remove_userinfo').then(() => {
				  this.$router.push('/login');
				// });
				// }).catch((err) => {
				// })
			});
		},

		/**
		 * 弹出框-修改密码或者系统设置
		 * @param {string} cmditem 弹框类型
		 */
		setDialogInfo(cmditem) {
			if (!cmditem) {
				console.log('test');
				this.$message('菜单选项缺少command属性');
				return;
			}
			switch (cmditem) {
				case 'info':
					this.$router.push({
						path: '/demo/user/edit',
						query: {
							id: this.$store.state.user.userinfo.id
						}
					});
					break;
				case 'pass':
					this.dialog.show_pass = true;
					this.dialog.title = '修改密码';
					break;
				case 'set':
					this.onGetSetting();
					this.dialog.show_set = true;
					this.dialog.title = '系统设置';
					break;
				case 'logout':
					this.logout();
					break;
			}
		},

		/**
		 * 修改密码
		 * @param  {object} userinfo 当前修改密码的表单信息
		 */
		updUserPass(userinfo) {
			this.$refs[userinfo].validate((valid) => {
				if (valid) {
					this.$$api_user_updatePass({
						data:{
							old_password: this.dialog[userinfo].old_password,
							password: this.dialog[userinfo].password,
							password_confirm: this.dialog[userinfo].password_confirm
						},
						fn:data=>{
							this.dialog.show_pass = false;
							this.$message.success('修改成功！');
						}
					});
				}
			});
		},

		/**
		 * 获取系统设置信息
		 */
		onGetSetting() {
			//获取系统设置信息
			if (this.$store.state.user.userinfo.pid == 0) {
				this.$$api_system_getSetting({
					fn:data=>{
						if (data.setting_info.disabled_update_pass) {
							data.setting_info.disabled_update_pass = data.setting_info.disabled_update_pass.split(',');
						} else {
							data.setting_info.disabled_update_pass = [];
						}
						data.setting_info.login_style = data.setting_info.login_style + '';

						this.dialog.set_info = data.setting_info;
					}
				});
			} else {
				this.$message.error('只有管理员才能操作！');
			}
		},

		/**
		 * 修改系统设置信息
		 */
		onUpdateSetting() {
			// console.log(this.dialog.set_info.login_style);
			// console.log(this.dialog.set_info.disabled_update_pass);
			// console.log(this.dialog.set_info.id);

			this.$$api_system_updateSetting({
				data:{
					id: this.dialog.set_info.id,
					login_style: this.dialog.set_info.login_style,
					disabled_update_pass: this.dialog.set_info.disabled_update_pass && this.dialog.set_info.disabled_update_pass.length ? this.dialog.set_info.disabled_update_pass.join(',') : ''
				},
				fn:data=>{
					this.dialog.show_set = false;
				}
			});
		}
	}
}
