<template>
<!-- 万人发明专利拥有量 -->
  <div class="workCommonListswr clientServiceOrderwr">
	  <div class="condition clearfix">
	  	<div class="form_control">
				<el-select v-model="dataObj.contractNo" @change="wrFnsele" placeholder="请选择区域">
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
	  	<div class="form_control form_control2">
				<el-date-picker
					v-model="dataObj.patentName"
					type="daterange"
					placeholder="截止日期开始 - 结束">
				</el-date-picker>
			</div>
			<div class="form_control">
				<el-select v-model="dataObj.contacter" placeholder="选择行业大类">
					<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
	  	<div class="form_control form_control2">
				<span>类型：</span>
				<el-radio v-model="dataObj.applicant" label="1">申请量</el-radio>
  			<el-radio v-model="dataObj.applicant" label="2">授权量</el-radio>
			</div>
		  <!-- <div class="form_control"><el-input v-model="dataObj.applicatNumber" placeholder="申请号"></el-input></div> -->
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
				<!-- <button class="reset" @click="reset">重置</button> -->
			</div>
	  </div>
		<div id="main"></div>
		<div>
			<!-- <div>嘉兴市</div> -->
			<table class="tables">
				<thead>
					<tr>
						<th>区域</th>
						<th>2011年</th>
						<th>2012年</th>
						<th>2013年</th>
						<th>2014年</th>
						<th>2015年</th>
						<th>2016年</th>
						<th>2017年</th>
						<th>2018年</th>
						<th>2019年</th>
						<th>2020年</th>
						<th>总计</th>
						<th>十二月累计</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>海盐县</td>
						<td>34.4</td>
						<td>34.6</td>
						<td>21.11</td>
						<td>21.11</td>
						<td>21.11</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
					<tr>
						<td>南湖区</td>
						<td>34.4</td>
						<td>36.9</td>
						<td>36.9</td>
						<td>21.11</td>
						<td>36.9</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
					<tr>
						<td>秀洲区</td>
						<td>34.4</td>
						<td>36.9</td>
						<td>36.9</td>
						<td>21.11</td>
						<td>36.9</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
					<tr>
						<td>海宁市</td>
						<td>34.4</td>
						<td>36.9</td>
						<td>36.9</td>
						<td>21.11</td>
						<td>36.9</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
					<tr>
						<td>嘉善县</td>
						<td>34.4</td>
						<td>36.9</td>
						<td>36.9</td>
						<td>21.11</td>
						<td>36.9</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
					<tr>
						<td>平湖市</td>
						<td>34.4</td>
						<td>36.9</td>
						<td>36.9</td>
						<td>21.11</td>
						<td>36.9</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
					<tr>
						<td>桐乡市</td>
						<td>34.4</td>
						<td>36.9</td>
						<td>36.9</td>
						<td>21.11</td>
						<td>36.9</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
						<td>22.87</td>
					</tr>
				</tbody>
			</table>
		</div>
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import $ from 'jquery'
	import VueCookie from 'vue-cookie'
	import { store } from "utils/";
	import echarts from 'echarts';
	const findCaseListUrl = './api/findCaseList';
	const delCaseUrl ='./api/delCase/{caseSysNo}'
	const dataObj = {//条件数据
		contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber:null
	};
  export default {
    data() {
      return {
				transtitle:['未显示','已显示'],
				ziduan:[0,1,2,3,4,5,6,7,8,9],
				showtrans: false,
				options: [{
					value: '秀洲区',
					label: '秀洲区'
				}, {
					value: '南湖区',
					label: '南湖区'
				}, {
					value: '平湖市',
					label: '平湖市'
				}, {
					value: '桐乡市',
					label: '桐乡市'
				}, {
					value: '海宁市',
					label: '海宁市'
				}, {
					value: '嘉善县',
					label: '嘉善县'
				}, {
					value: '海盐县',
					label: '海盐县'
				}],
				options2: [{
					value: '软件和信息服务',
					label: '软件和信息服务'
				}, {
					value: '新能源汽车',
					label: '新能源汽车'
				}, {
					value: '新医药与生命健康',
					label: '新医药与生命健康'
				}, {
					value: '人工智能',
					label: '人工智能'
				}, {
					value: '智能电网',
					label: '智能电网'
				}, {
					value: '轨道交通',
					label: '轨道交通'
				}, {
					value: '集成电路',
					label: '集成电路'
				}, {
					value: '智能制造设备',
					label: '智能制造设备'
				}],
				queryObj: {},
				dataObj: Object.assign({}, dataObj),
				rootUrl:CONFIG.rootUrl,
				dataList:[],
				currentPage: 1,
				pgIndex: 1,
				pgCount: 15,
				total:0,
				fileList:[],
				dialogVisible:false,
				allotVisible: false,
				content:'', //备注
				loading: false,
				token:'',
				name:'嘉兴市万人发明专利拥有量'
      }
    },
    mounted() {
			this.wrfmzlFn()

			
			










		this.token = VueCookie.get('token')
    	this.recoverQueryData();
		this.search();
		let that = this;
		let getlist = store.get('userdefaultlist')||this.ziduan;
		this.ziduan = getlist;
		let el = document.body||document.documentElement;
		el.onclick = function(){
			that.showtrans = false
		}
	},
	computed:{
		
		isexport(){
			let arr = store.get('permission')
			return arr.indexOf('pas_appearance_case_export')>-1
		}
	},
	methods: {
		wrFnsele(key){
			if(key)	this.name = key+'万人发明专利拥有量'
			this.wrfmzlFn()
		},
		wrfmzlFn(){
			var that = this
			var obj = require('../../../../assets/dark.json')
			echarts.registerTheme('dark', obj)
			var chartDom = document.getElementById('main');
			var myChart = echarts.init(chartDom, 'dark');
			var option;
			option = {
					title: {
							text: that.name
					},
					tooltip: {
							trigger: 'axis',
							axisPointer: {
									type: 'cross',
									crossStyle: {
											color: '#999'
									}
							}
					},
					toolbox: {
							feature: {
									dataView: {show: true, readOnly: false},
									magicType: {show: true, type: ['line', 'bar']},
									restore: {show: true},
									saveAsImage: {show: true}
							}
					},
					legend: {
							data: ['发明专利', '实用新型', '外观专利', '合计']
					},
					xAxis: [
							{
									type: 'category',
									data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
									axisPointer: {
											type: 'shadow'
									}
							}
					],
					yAxis:[
							{
									type: 'value',
									name: '数量（件数）',
							}
					],
					series: [
							{
									name: '发明专利',
									type: 'bar',
									data: [1, 2, 5, 7, 12, 11, 19, 21, 28,26]
							},
							{
									name: '实用新型',
									type: 'bar',
									data: [2, 4, 6, 3, 9, 10, 13, 15, 19,23]
							},
							{
									name: '外观专利',
									type: 'bar',
									data: [5, 7, 3, 8, 12, 15, 17, 21, 26,33]
							},
							{
									name: '合计',
									type: 'line',
									yAxisIndex: 0,
									data: [9, 11, 16, 18, 20, 26, 37, 46, 58,69]
							}
					]
			};

			option && myChart.setOption(option);
		},








		exportlist(){
			let datas = {
				pgIndex: this.pgIndex,
				pgCount: this.pgCount,
				patentType: 1
			}
			let ret = Object.assign({},this.dataObj,datas)
			window.open(this.rootUrl+'/api/exportCaseList?'+$.param(ret)+'&token='+this.token)
		},
		setlist(){
			store.set('userdefaultlist',this.ziduan)
		},
		
		showtransfer(){
			this.showtrans = !this.showtrans;
		},
		toaddrecord(){
			this.$router.push({
				name: "reviseBasic",
				params: { state: 0,type: 1 }
			});
		},
    	recoverQueryData(){
    		var queryObj = this.queryObj = this.$route.query;
    		var dataObj = this.dataObj;
    		for (var n in dataObj){
    			if (dataObj.hasOwnProperty(n)) {
	    			dataObj[n] = queryObj[n];
	    		}
    		}
    		this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
		  },
    	search(extra){
    		var ret = {}
    		ret.pgIndex = extra ? 1 : this.pgIndex;
    		ret.pgCount = this.pgCount;
    		var data = Object.assign({}, this.dataObj, ret);
    		//console.log(data)
    		this.getOrderList(data);
    		this.$router.replace({query: Object.assign({}, data)});
    		//console.log(this.$route.query)
    	},
    	reset(){
			this.dataObj = Object.assign({}, dataObj);
			this.search()
    	},
    	handleCurrentChange(val) {
    		this.pgIndex = val;
    		this.search();
      },
     
      getOrderList(data){
      	data = data || {};
      	data.patentType = '1';
      	this.loading = true;
      	this.$http.get(findCaseListUrl, {params: data})
      	.then((resp) => {
      		this.loading = false;
      		var data = resp.data;
      		var dataList = data.elements;
      		/*dataList.forEach((item, i) => {
      			var arr = this.selectedItems;
      			var idx = this.inArrayOf(arr, item, 'order_sn');
      			item.checked = idx != -1;
      		});*/
      		this.dataList = dataList;
      		this.total = data.totalElements;
      	})
      	.catch((err) => {
      		this.loading = false;
      		console.log(err);
      	});
	  },
	  delCase(item){
		  this.$confirm('您确定要删除吗？','提示',{
			  confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
		  }).then(res=>{
			  this.$http.delete(delCaseUrl.replace("{caseSysNo}",item.caseSysNo)).then(res=>{
					this.search();
					this.$message.success('操作成功')
				  }).catch(err=>{
					this.$message.error(err.response.data.msg)
					// '案件当前状态不可删除'
				})
		  })
	  },
      view(item){
      	this.$router.push({name: 'wgPatentDetail', params: {id: item.caseSysNo}})
      },
      handleSuccess(res,file,filelist){
		  this.fileList.push(file.name)
		  console.log(res,file,filelist)
	  },

    },
    filters: {
	  patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceformat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
    },
    watch:{
    	/*$route(to, from) {
    		if (to.query.selfChange) {
    			return;
    		}
	    	this.recoverQueryData()
    		this.search();
      }*/
	  }
  }
</script>
<style lang='less'>
.workCommonListswr{
	/* border: 1px solid #DFE2E5; */width: 100%;padding-bottom: 20px;
	/* .commonListHead{
		position: relative;
		height: 55px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 30px;}
		.el-tabs__item{padding: 0 20px;height: 55px;line-height: 55px;}
	} */
	
	#main{
		width: 100%;
		height: 700px;
		margin-top: 30px;
		padding-top: 30px;
	}
	.tables{
		width: 100%;
		color: #fff;
		margin-top: 30px;
		background: #100C2A;
		td,th{
			border: 1px solid #484753;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
		tbody tr:nth-child(2n+2),thead tr{
			background: #0E0B23;
		}
	}
	.eachexportbtn{
		display: inline-block;
		width: 88px;
		height: 36px;
		background-color: #20a0ff;
		color: #fff;
		font-size: 14px;
		margin-left: 10px;
		border-radius: 4px;
		text-align: center;
		line-height: 36px;
		cursor: pointer;
		vertical-align: middle;
	}
	.condition{
		padding: 10px 10px 20px;
		background: #100C2A;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{
				background: #2F384C;
				border: 1px solid #2F384C;
				height: 30px;
			}
		}
		.form_control2{
			width: auto;
			height: 30px;
			line-height: 30px;
			color: #bfcbd9;
			.el-radio{
				color: #bfcbd9;
			}
		}
		.data_picker{
			width: 220px;
			.el-date-editor--daterange.el-input{
				width: 220px;
			}
		}
		.form_submit{
			float: left;
			button{float: left;width: 88px;height: 30px;line-height: 28px;text-align:center;color:#fff;font-size:14px;border:1px solid #479CFF;background: #479CFF;border-radius: 2px;margin-right: 10px;}
			.submit{}
			.reset{background-color: #fff;color:#479CFF;}
		}
	}
	.result{
		padding: 10px 10px 0 10px;
		overflow-x: auto;
		.el-checkbox__inner{width: 16px;height: 16px;border-radius: 2px;}
		.el-checkbox__inner::after{left: 4px;top: 0;}
		.el-checkbox__input.is-checked .el-checkbox__inner{background-color: #36AF47;border-color: #36AF47;}
		/* .table_handle{
			height: 50px;background: #F9F9F9;border: 1px solid #DFE2E5;border-bottom:0;padding:14px 0 0;font-size: 16px;color:#DFE2E5;line-height: 20px;vertical-align: top;
			.all{
				margin-left: 20px;height: 20px;display: inline-block;
				.el-checkbox{height: 20px;vertical-align: top;}
			}
			.table_handle_btn{margin-left: 20px;margin-right: 20px;padding-left:24px;font-size: 14px;color:#479CFF;display: inline-block;background: transparent url(~assets/img/myServiceOrder/batch.png) 0 center no-repeat;display: inline-block;cursor: pointer;}
			.batch{background-image: url(~assets/img/myServiceOrder/batch.png);}
			.infoSubmit{background-image: url(~assets/img/myServiceOrder/infoSubmit.png);}
		} */
		.result_type{
			width:100%;background-color: #F5F5F5;border: 1px solid #DFE2E5;
			thead{
				height: 50px;overflow:hidden;border: 1px solid #DFE2E5;
				tr{
					height: 50px;overflow:hidden;
					th{text-align: left;font-size: 13px;color: #223344;font-weight: normal;padding:5px 3px;}
					th.alignc{text-align: center;}
					th.minWidth{min-width: 60px;}
                    th.comWidth{min-width: 140px;}
                    th.smWidth{min-width: 100px;}
					th.maxWidth{max-width: 200px;}
				}
			}
			tbody{
				tr{
					height: 50px;border: 1px solid #DFE2E5;background-color: #fff;
					td{
						min-height: 50px;font-size: 13px;color: #556677;padding:5px 3px;word-break:break-all;
						.el-checkbox{position: relative;top: -1px;}
						.regInfo{display: inline-block;min-width: 100px;max-width: 150px;word-break: break-all;}
					}
					td.alignc{text-align: center;}
					td.maxWidth{max-width: 200px;}
					td.action{
						text-align: center;
						min-width: 60px;
						a{color: #479CFF;margin-right: 7px}
					}
				}
				tr:hover,tr.hover{
					background-color: #F9F9F9;
				}
				tr.empty{
					.empty_ic{
						height: 200px;text-align: center;padding-top:83px;
						span{display: inline-block;height: 34px;line-height: 34px;padding-left: 40px; background: transparent url(~assets/img/nulldata.png) 0 center no-repeat;color: #A8AFB5}
					}
					&:hover{background-color: #fff;}
				}
			}
			tfoot{

			}
		}
		.my_loading{border: 1px solid #DFE2E5;height: 400px;margin-top: -1px;margin-bottom: 75px;}
		.tb_pagination{
			padding-top: 20px;
			.el-pagination{padding:0;}
		}
	}

	.distributeDialog{
		.el-dialog{
			width: 330px;transform:translate(-50%,-50%);
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{
				font-size: 14px;
				.el-dialog__close{font-size: 12px;}
			}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.dialog_con_box{
					padding-top: 10px;
					.el-radio{width: 92px;overflow: hidden;margin-bottom: 8px;}
					.el-radio+.el-radio{margin-left: 0; }
					.el-radio__inner{width: 16px;height: 16px;}
				}
				.el-textarea{margin-top: 10px;}
			}
			.dialog-footer{
				.el-button{width: 88px;height: 30px;padding:8px 15px;border: 1px solid #479CFF;border-radius: 2px;color:#479CFF;line-height: 14px; }
				.el-button--primary{background: #479CFF;border-radius: 2px;color: #fff;}
			}
		}
	}

	.memoDialog{
		.el-dialog{
			width: 500px;height: 256px;
			.el-dialog__title{font-size: 14px;font-weight: normal;color: #223344;}
			.el-dialog__headerbtn{font-size: 14px;}
			.el-dialog__body{
				padding:10px 20px;
				h5{font-size: 14px;color: #556677;font-weight: normal;}
				.el-textarea{margin-top: 10px;}
			}
		}
	}

}
.clientServiceOrderwr{
	.result{
		thead{
			tr{
				th:first-child{padding-left: 20px;}
			}
		}
		tbody{
			tr{
				td:first-child{padding-left: 20px;}
				td.action{
					text-align: right;padding-right: 10px;
					a{margin-right: 10px;}
				}
			}
		}
	}
}
</style>
