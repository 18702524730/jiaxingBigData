<template>
<!-- PCT国际专利申请 -->
  <div class="workCommonLists clientServiceOrder2">
  	<!-- <div class="commonListHead clientServiceOrderHead">
  				<el-tabs v-model="activeName" @tab-click="tabClick">
  			    <el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
  			  </el-tabs>
  		  </div> -->
        
	  <div class="condition clearfix">
	  	
			<div class="form_control">
				<el-select v-model="dataObj.patentName" placeholder="请选择产业">
					<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
			</div>
	  </div>
		<div id="main"></div>
  </div>
</template>

<script>
	import qs from 'qs'
	import { store } from "utils/";
	import Filters from 'utils/filters/'
	import $ from 'jquery';
	import echarts from 'echarts';
	import VueCookie from 'vue-cookie'
	const findCaseListUrl = './api/findCaseList';
	const delCaseUrl ='./api/delCase/{caseSysNo}'
	const dataObj = {//条件数据
		contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber: null
	};
const ziduandata =[
	{key:0,label:'订单号（案号）'},
	{key:1,label:'申请人'},
	{key:2,label:'专利名称'},
	{key:3,label:'申请号'},
	{key:4,label:'申请日'},
	{key:5,label:'案件当前状态'},
	{key:6,label:'业务员'},
	{key:7,label:'代理人'},
	{key:8,label:'递交机构'},
	{key:9,label:'备注'},
	{key:10,label:'合同号'},
	{key:11,label:'是否费减'},
	{key:12,label:'官费（元）'},
	{key:13,label:'服务费（元）'},
	{key:14,label:'此单金额（元）'},
	{key:15,label:'合同金额（元）'},
	{key:16,label:'缴纳申请费金额（元）'},
	{key:17,label:'缴纳申请费日期'},
	{key:18,label:'办登费收款金额（元）'},
	{key:19,label:'缴纳金额（元）'},
	{key:20,label:'办登费缴费时间'},
	{key:21,label:'收证日期'},
	{key:22,label:'第2年年费收款金额（元）'},
	{key:23,label:'第2年缴费时间'},
	{key:24,label:'第2年缴费金额（元）'},
	{key:25,label:'第3年年费收款金额（元）'},
	{key:26,label:'第3年缴费时间'},
	{key:27,label:'第3年缴费金额（元）'},
	{key:28,label:'第4年年费收款金额（元）'},
	{key:29,label:'第4年缴费时间'},
	{key:30,label:'第4年缴费金额（元）'},
	{key:31,label:'第5年年费收款金额（元）'},
	{key:32,label:'第5年缴费时间'},
	{key:33,label:'第5年缴费金额（元）'},
	{key:34,label:'第6年年费收款金额（元）'},
	{key:35,label:'第6年缴费时间'},
	{key:36,label:'第6年缴费金额（元）'},
	{key:37,label:'第7年年费收款金额（元）'},
	{key:38,label:'第7年缴费时间'},
	{key:39,label:'第7年缴费金额（元）'},
	{key:40,label:'第8年年费收款金额（元）'},
	{key:41,label:'第8年缴费时间'},
	{key:42,label:'第8年缴费金额（元）'},
	{key:43,label:'第9年年费收款金额（元）'},
	{key:44,label:'第9年缴费时间'},
	{key:45,label:'第9年缴费金额（元）'},
	{key:46,label:'第10年年费收款金额（元）'},
	{key:47,label:'第10年缴费时间'},
	{key:48,label:'第10年缴费金额（元）'},
]
  export default {
    data() {
      return {
				options: [{
					value: '嘉兴市',
					label: '嘉兴市'
				},{
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
		  ziduandata:ziduandata,
		  transtitle:['未显示','已显示'],
		  ziduan:[0,1,2,3,4,5,6,7,8,9],
		  showtrans: false,
			rootUrl: CONFIG.rootUrl,
      	  queryObj: {},
      	  dataObj: Object.assign({}, dataObj),
		token:'',
	      dataList:[],
	      currentPage: 1,
	      pgIndex: 1,
	      pgCount: 15,
	      total:0,


	      dialogVisible:false,
	      allotVisible: false,
	      content:'', //备注
	      loading: false
      }
    },
    mounted() {
			var that = this
			var obj = require('../../../../assets/dark.json')
			echarts.registerTheme('dark', obj)
			var chartDom = document.getElementById('main');
			var myChart = echarts.init(chartDom, 'dark');
			var option;
			var dataMap = {};
			function dataFormatter(obj) {
					var pList = ['海宁市','桐乡市','平湖市','南湖区','秀洲区','嘉善县','海盐县'];
					var temp;
					for (var year = 2011; year <= 2020; year++) {
							var max = 0;
							var sum = 0;
							temp = obj[year];
							for (var i = 0, l = temp.length; i < l; i++) {
									max = Math.max(max, temp[i]);
									sum += temp[i];
									obj[year][i] = {
											name: pList[i],
											value: temp[i]
									};
							}
							obj[year + 'max'] = Math.floor(max / 100) * 100;
							obj[year + 'sum'] = sum;
					}
					return obj;
			}

			dataMap.dataApp = dataFormatter({
					//max : 1625,
					2020:[1625,1130,2451,1123,1435,2222,1056],
					2019:[1411,922,2039,920,1167,1845,866],
					2018:[1215,752,1723,735,974,1521,727],
					2017:[1111,671,1601,731,849,1366,642],
					2016:[984,525,1360,602,642,1116,528],
					2015:[811,446,1146,487,494,930,427],
					2014:[696,390,1001,423,390,804,362],
					2013:[603,311,847,357,304,667,312],
					2012:[500,257,692,285,238,600,266],
					2011:[431,215,601,232,194,545,234]
			});

			dataMap.dataAuth = dataFormatter({
					//max : 362,
					2020:[362,313,441,313,345,522,205],
					2019:[241,192,303,192,166,285,186],
					2018:[221,175,172,173,197,152,172],
					2017:[111,267,260,273,284,136,164],
					2016:[194,152,130,62,62,111,52],
					2015:[281,244,114,148,249,93,142],
					2014:[166,266,350,243,339,284,289],
					2013:[160,121,247,235,234,167,272],
					2012:[150,125,169,128,123,160,126],
					2011:[143,121,160,123,119,154,123]
			});




			option = {
					baseOption: {
							timeline: {
									axisType: 'category',
									// realtime: false,
									// loop: false,
									autoPlay: true,
									// currentIndex: 2,
									playInterval: 1000,
									// controlStyle: {
									//     position: 'left'
									// },
									data: [
											'2011-01-01','2012-01-01','2013-01-01','2014-01-01',
											{
													value: '2015-01-01',
													tooltip: {
															formatter: '{b} 申请量达到一个高度'
													},
													symbol: 'diamond',
													symbolSize: 16
											},
											'2016-01-01', '2017-01-01','2018-01-01','2019-01-01',
											{
													value: '2020-01-01',
													tooltip: {
															formatter: function (params) {
																	return params.name + '申请量达到又一个高度';
															}
													},
													symbol: 'diamond',
													symbolSize: 18
											},
									],
									label: {
											formatter : function(s) {
													return (new Date(s)).getFullYear();
											}
									}
							},
							title: {
									subtext: ''
							},
							tooltip: {
							},
							legend: {
									left: 'right',
									data: ['PCT专利申请件数', 'PCT专利授权件数'],
									selected: {
											
									}
							},
							calculable : true,
							grid: {
									top: 80,
									bottom: 100,
									tooltip: {
											trigger: 'axis',
											axisPointer: {
													type: 'shadow',
													label: {
															show: true,
															formatter: function (params) {
																	return params.value.replace('\n', '');
															}
													}
											}
									}
							},
							xAxis: [
									{
											'type':'category',
											'axisLabel':{'interval':0},
											'data':[
													'海宁市','\n桐乡市','平湖市','\n南湖区','秀洲区','\n嘉善县','海盐县'
											],
											splitLine: {show: false}
									}
							],
							yAxis: [
									{
											type: 'value',
											name: '专利申请量（件）'
									}
							],
							series: [
									{name: 'PCT专利申请件数', type: 'bar'},
									{name: 'PCT专利授权件数', type: 'bar'},
									{
											name: 'PCT专利授权件数占比',
											type: 'pie',
											center: ['80%', '25%'],
											radius: '28%',
											z: 100
									}
							]
					},
					options: [
							{
									title: {text: '2011嘉兴地区PCT专利申请量'},
									series: [
											{data: dataMap.dataApp['2011']},
											{data: dataMap.dataAuth['2011']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2011sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2011sum']}
											]}
									]
							},
							{
									title: {text: '2012嘉兴地区PCT专利申请量'},
									series: [
											{data: dataMap.dataApp['2012']},
											{data: dataMap.dataAuth['2012']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2012sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2012sum']}
											]}
									]
							},
							{
									title: {text: '2013嘉兴地区PCT专利申请量'},
									series: [
											{data: dataMap.dataApp['2013']},
											{data: dataMap.dataAuth['2013']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2013sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2013sum']}
											]}
									]
							},
							{
									title: {text: '2014嘉兴地区PCT专利申请量'},
									series: [
											{data: dataMap.dataApp['2014']},
											{data: dataMap.dataAuth['2014']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2014sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2014sum']}
											]}
									]
							},
							{
									title: {text: '2015嘉兴地区PCT专利申请量'},
									series: [
											{data: dataMap.dataApp['2015']},
											{data: dataMap.dataAuth['2015']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2015sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2015sum']}
											]}
									]
							},
							{
									title: {text: '2016嘉兴地区PCT专利申请量'},
									series: [
											{data: dataMap.dataApp['2016']},
											{data: dataMap.dataAuth['2016']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2016sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2016sum']}
											]}
									]
							},
							{
									title : {text: '2017嘉兴地区PCT专利申请量'},
									series : [
											{data: dataMap.dataApp['2017']},
											{data: dataMap.dataAuth['2017']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2017sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2017sum']}
											]}
									]
							},
							{
									title : {text: '2018嘉兴地区PCT专利申请量'},
									series : [
											{data: dataMap.dataApp['2018']},
											{data: dataMap.dataAuth['2018']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2018sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2018sum']}
											]}
									]
							},
							{
									title : {text: '2019嘉兴地区PCT专利申请量'},
									series : [
											{data: dataMap.dataApp['2019']},
											{data: dataMap.dataAuth['2019']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2019sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2019sum']}
											]}
									]
							},
							{
									title : {text: '2020嘉兴地区PCT专利申请量'},
									series : [
											{data: dataMap.dataApp['2020']},
											{data: dataMap.dataAuth['2020']},
											{data: [
													{name: 'PCT申请件数', value: dataMap.dataApp['2020sum']},
													{name: 'PCT授权件数', value: dataMap.dataAuth['2020sum']}
											]}
									]
							}
					]
			};

			option && myChart.setOption(option);








    	this.recoverQueryData();
		this.search();
		let getlist = store.get('userdefaultlists')||this.ziduan;
		this.ziduan = getlist;
		let el = document.body||document.documentElement;
		el.onclick = function(){
			that.showtrans = false
		}
	},
	computed:{
		isexport(){
			let arr = store.get('permission')
			return arr.indexOf('pas_utility_case_export')>-1
		}
	},
    methods: {
		exportlist(){
			let datas = {
				pgIndex: this.pgIndex,
				pgCount: this.pgCount,
				patentType: 3
			}
			let ret = Object.assign({},this.dataObj,datas)
			window.open(this.rootUrl+'/api/exportCaseList?'+$.param(ret)+'&token='+this.token)
		},
		setlist(){
			store.set('userdefaultlists',this.ziduan)
		},
		showtransfer(){
			this.showtrans = !this.showtrans;
		},
		toaddrecord(){
			this.$router.push({
				name: "syreviseBasic",
				params: { state: 0,type: 3 }
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
      	data.patentType = '3';
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
				})
		  })
	  },
      view(item){
      	this.$router.push({name: 'syPatentDetail', params: {id: item.caseSysNo}})
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
.workCommonLists{
	/* border: 1px solid #DFE2E5; */width: 100%;padding-bottom: 20px;
	/* .commonListHead{
		position: relative;
		height: 55px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 30px;}
		.el-tabs__item{padding: 0 20px;height: 55px;line-height: 55px;}
	} */
	.condition{
		padding: 10px 10px 20px;
		background: #100C2A;
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{
				height: 30px;
				background: #2F384C;
    		border: 1px solid #2F384C;
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
.clientServiceOrder2{
	#main{
		width: 100%;
		height: 700px;
		margin-top: 30px;
		padding-top: 30px;
	}
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
