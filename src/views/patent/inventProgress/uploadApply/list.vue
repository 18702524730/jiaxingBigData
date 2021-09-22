<template>
<!-- 知识产权服务专题分析 -->
  <div class="workCommonListztfx clientServiceOrder">
  	<!-- <div class="commonListHead clientServiceOrderHead">
  				<el-tabs v-model="activeName" @tab-click="tabClick">
  			    <el-tab-pane v-for="(item, idx) in serviceStatusOptions" :label="item.label" :name="item.name" ></el-tab-pane>
  			  </el-tabs>
  		  </div> -->
        
	  <div class="condition clearfix">
	  	<div class="form_control">
				<el-select v-model="dataObj.contractNo" placeholder="请选择区域">
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
			
			<div class="form_submit">
				<button class="submit" @click="search(true)">搜索</button>
			</div>
	  </div>
		<div id="main"></div>
  </div>
</template>

<script>
	import qs from 'qs'
	import echarts from 'echarts';
	import Filters from 'utils/filters/'
	const workOrderListUrl = './api/findPasFlowList';
	const dataObj = {//条件数据
		// contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber: null
	};

  export default {
    data() {
      return {
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
      	activeName:'all',
      	dataObj: Object.assign({}, dataObj),

      	status:'',
      	order_tasking_state:'',

      
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
			var obj = require('../../../../assets/dark.json')
			echarts.registerTheme('dark', obj)
			var chartDom = document.getElementById('main');
			var myChart = echarts.init(chartDom, 'dark');
			var option;

			option = {
				
					title: {
							text: '嘉兴市知识产权服务专题分析'
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
							data: ['新增知识产权服务站', '新增知识产权规范化市场', '知识产权服务站总计', '知识产权规范化市场总计'],
							top: '5%'
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
									name: '数量',
							}
					],
					series: [
							{
									name: '新增知识产权服务站',
									type: 'bar',
									data: [1, 2, 5, 7, 12, 11, 19, 21, 28,26]
							},
							{
									name: '新增知识产权规范化市场',
									type: 'bar',
									data: [2, 4, 6, 3, 9, 10, 13, 15, 19,23]
							},
							{
									name: '知识产权服务站总计',
									type: 'line',
									yAxisIndex: 0,
									data: [1, 3, 8, 15, 27, 38, 47, 68, 96,112]
							},
							{
									name: '知识产权规范化市场总计',
									type: 'line',
									yAxisIndex: 0,
									data: [2, 6, 12, 15, 24, 34, 47, 62, 81,104]
							}
					]
			};

			option && myChart.setOption(option);









    	this.recoverQueryData();
    	this.search();
    },
    methods: {
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
    		

    		//ret.status = this.status;

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
		data.patentType = '2';
		data.flowStage = '1';
      	this.loading = true;
      	this.$http.get(workOrderListUrl, {params: data})
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
      view(item){
      	this.$router.push({name: 'inventuploadApplyDetail', params: {id: item.caseSysNo,step:21}})
      },
    },
    filters: {
      patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceFormat:Filters.priceformat,
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
.workCommonListztfx{
	/* border: 1px solid #DFE2E5; */width: 100%;overflow-x:auto ;padding-bottom: 20px;
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
                    th.smWidth{min-width: 110px;}
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
.clientServiceOrder{
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
