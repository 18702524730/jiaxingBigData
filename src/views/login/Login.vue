<template>
	<div class="login" @click="login">
		<img src="~assets/img/login.png" alt="">
		<div class="footer">
			<p>© 2018 拾贝公司 All Rights Reserved</p>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import qs from 'qs'
	import md5 from 'md5'
	const adminUrl = CONFIG.adminUrl;
	const homeUrl = CONFIG.homeUrl;
	const spUrl = CONFIG.spUrl;
	const codeUrl = adminUrl+'/servlet/captchaCode?t=';
	const loginSuffixUrl = '/api/login';
	export default {
		components: {
		},
		data() {
			return {
				errLoginCount:0,
				homeUrl:homeUrl,
				spUrl:spUrl,
				ruleForm:{
					name:'',
					password:'',
					code:''
				},
				rules: {
					
				},
				imageCode:'',
				msg:''
			}
		},
		mounted() {
			//this.imgCode();
		},
		methods: {
			imgCode(){
				this.imageCode = codeUrl+Math.random();
			},
			submitForm(formName) {
				this.msg = "";
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.login();
					} else {
						return false;
					}
				});
			},
			login(){
				this.$router.push({name: 'service'})


				return
				var self = this;
				var data = {
					name:'lsf',
					password: md5('123456'),
					captcha:this.ruleForm.code,
					loginPlatform:2+'',
				}
				console.log(this.ruleForm.name,this.ruleForm.password)
				this.$http.post(adminUrl+loginSuffixUrl,data)
				.then((resp) => {
					self.$router.push({name: 'appearancePatent'});
				})
				.catch((error) => {
					var error = error.response.data;
					this.errLoginCount = error.errLoginCount || 0;
					self.msg = error.msg;
					self.imgCode();
				});
			}
		},
		filters: {
		},
		watch:{
		}
	}
</script>

<style lang='less'>
	html,body,#app{height:100%;}
	.login{
		position: relative;
		height: 100%;
		background: #030411;
		>img{
			display: block;
			width: 100%;
			// height: 100%;
		}
		.footer{width:100%;height:60px;position: absolute;bottom:0px;left:0;
			p{font-size: 12px;color: #fff;text-align:center;line-height:60px;}
		}
	}
</style>
