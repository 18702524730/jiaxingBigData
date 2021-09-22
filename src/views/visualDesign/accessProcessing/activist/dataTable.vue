<template>
<!--  数据表格 -->
  <div class="shujuList7 clientServiceOrder">
	  <div v-if="active==1" class="images">
			<img src="~assets/img/imageym7.png" alt="">
		</div>
	  
  </div>
</template>

<script>
	import qs from 'qs'
	import Filters from 'utils/filters/'
	import { store } from "utils/";
	import pasuploader from 'cps/pasuploader/uploader.vue'
	const findCaseListUrl = './api/findStereoProtectCaseList';
	const delCaseUrl ='./api/deleteStereoProtectCase/{dataUniqueNo}'
	const dataObj = {//条件数据
		businessSrc:null,
		businessType:null,
		businessName: null,
		salesman:null,
		custType:null,
		obligee:null,
		contactPerson:null,
		contractNo:null,
		crossDepartmentInspirePerson:null,
		agent: null,
	};
  export default {
	 components:{
		 pasuploader
	 },
    data() {
      return {
				active: 1,
      	queryObj: {},
      	dataObj: Object.assign({}, dataObj),
		rootUrl:CONFIG.rootUrl,
	      dataList:[],
	      currentPage: 1,
	      pgIndex: 1,
          pgCount: 15,
          signTime:[],
	      total:0,
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
	      dialogVisible:false,
	      allotVisible: false,
	      content:'', //备注
		  loading: false,
		  sourcelist:[
				{label:'1',value: 1},
				{label:'2',value: 2},
				{label:'3',value: 3}
			],
			cuslist:[
				{label:'新客户',value: 1},
				{label:'老客户',value: 2},
				{label:'分配客户/交办业务',value: 3}
			],
      }
    },
    mounted() {
    	this.recoverQueryData();
		this.search();
    },
    methods: {
			open() {
        this.$confirm('您的专利申请已经到了阶段，我们将实质审查阶段相关信息下发您的手机，请注意查收！', '尊敬的用户您好', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '确定!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          });          
        });
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
            this.signTime = queryObj.signTimeStart && [new Date(queryObj.signTimeStart-0), new Date(queryObj.signTimeEnd-86390000)];
    		this.pgIndex = queryObj.pgIndex ? queryObj.pgIndex-0 : 1;
		  },
    	search(extra){
            var ret = {}
            if (this.signTime) {
                ret.signTimeStart = this.signTime[0] ? new Date(this.signTime[0]).getTime() : null;
                ret.signTimeEnd = this.signTime[1] ? new Date(this.signTime[1]).getTime() + 86390000 : null;
            }
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
            this.signTime = []
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
			  this.$http.delete(delCaseUrl.replace("{dataUniqueNo}",item.dataUniqueNo)).then(res=>{
					this.search();
					this.$message.success('操作成功')
				  }).catch(err=>{
					this.$message.error(err.response.data.msg)
					// '案件当前状态不可删除'
				})
		  })
	  },
	  toadd(){
		  this.$router.push({name:'activistAdd',params:{type:1,id:0}})
	  },
      view(item){
      	this.$router.push({name: 'activistDetail', params: {id: item.dataUniqueNo}})
      },
    },
    filters: {
	  patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceformat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
	  customerTypeFormat:Filters.customerTypeFormat
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
.shujuList7{
	/* border: 1px solid #DFE2E5; */width: 100%;padding-bottom: 20px;
	/* .commonListHead{
		position: relative;
		height: 55px;
		//.el-tabs{position: absolute;bottom:0;width: 100%;}
		.el-tabs__header{margin-bottom: 0;padding-left: 30px;}
		.el-tabs__item{padding: 0 20px;height: 55px;line-height: 55px;}
	} */
	.images{
		>img{width: 100%;}
	}
	.wids{width: 100%;margin-top: 30px;}
	.activistadd{
		padding-left: 10px;
		padding-top: 10px;
		>span{
			display: inline-block;
			width: 100px;
			height: 40px;
			border-radius: 2px;
			text-align: center;
			line-height: 40px;
			font-size: 14px;
			background-color: #479CFF;
			color: #fff;
			cursor: pointer;
		}
	}
	.shuliangs{
		display: flex;
		padding: 10px 10px 20px;
		background: #100C2A;
		justify-content: center;
		align-items: center;
		border: 1px solid #dcdcdc;
		border-left: 0;
		border-right: 0;
		>div{
			width: 200px;
			color: #fff;
			text-align: center;
			margin: 0 30px;
			.title{
				font-size: 16px;
			}
			.number{
				font-size: 26px;
			}
		}
	}
	.sbjc{
		font-size: 16px;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background: #20a0ff;
		color: #fff;
		cursor: pointer;
		margin: 30px 0;
		border-radius: 2px;
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
	.condition{
		padding: 10px 10px 20px;
		background: #100C2A;
		.title{
			font-size: 30px;
			color: #fff;
			text-align: center;
		}
		.form_control{
			float: left;width: 150px;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{height: 30px;}
        }
        .form_controls{
			float: left;display: inline-block;margin-right: 10px;margin-bottom: 10px;
			.el-input__inner{height: 30px;}
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
