<template>
<!--   自助式数据建模 -->
  <div class="shujuList1 clientServiceOrder">
	  <div v-if="active==1" class="images">
			<img src="~assets/img/imageym2.png" alt="">
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
	const cityOptions = ['上海1', '上海2', '上海3', '上海4','上海5', '上海6', '上海7', '上海8','上海9', '上海10'];
  export default {
	 components:{
		 pasuploader
	 },
    data() {
      return {
				checkAll:false,
				checkedCities: ['上海1'],
				cities: cityOptions,
        isIndeterminate: true,
				active: 1,
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
				options2:[{
					value: '一个月',
					label: '一个月'
				},{
					value: '二个月',
					label: '二个月'
				},{
					value: '三个月',
					label: '三个月'
				},{
					value: '四个月',
					label: '四个月'
				},{
					value: '五个月',
					label: '五个月'
				},{
					value: '六个月',
					label: '六个月'
				},{
					value: '七个月',
					label: '七个月'
				},{
					value: '八个月',
					label: '八个月'
				},{
					value: '九个月',
					label: '九个月'
				},{
					value: '十个月',
					label: '十个月'
				},{
					value: '十一个月',
					label: '十一个月'
				},{
					value: '十二个月',
					label: '十二个月'
				}],
				options3:[{
					value: '所有',
					label: '所有'
				},],
				value1:'',
				value2:'',
				value3:'',
				value4:'',
      	queryObj: {},
      	dataObj: Object.assign({}, dataObj),
		rootUrl:CONFIG.rootUrl,
	      dataList:[],
	      currentPage: 1,
	      pgIndex: 1,
          pgCount: 15,
          signTime:[],
	      total:0,
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
			handleCheckAllChange(val) {
        this.checkedCities = this.checkAll ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
				console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
	  }
  }
</script>
<style lang='less'>
.shujuList1{
	/* border: 1px solid #DFE2E5; */width: 100%;padding-bottom: 20px;
	.images{
		>img{width: 100%;}
	}
	.results{
		padding: 10px 10px 20px;
		background: #100C2A;
		margin-top: 30px;
		.title{
			font-size: 20px;
			color: #fff;
		}
	}
	table{
		width: 100%;
		color: #fff;
		text-align: center;
		margin-top: 30px;
		.el-checkbox{color: #fff;}
		thead{
			background: #0E0B23;
		}
		tr{
			line-height: 30px;
			>td:nth-child(2),>th:nth-child(2){
				text-align: left;
			}
			>th{
				min-width: 60px;
			}
		}
		th,td{
			border: 1px solid #484753;
			span{
				margin: 0 5px;
				cursor: pointer;
			}
			span:hover{
				color: #20a0ff;
			}
		}
		tbody>tr:nth-child(2n){
			background: #0E0B23;
		}
	}
	.tables{
		padding: 10px 10px 20px;
		background: #100C2A;
		margin-top: 30px;
		.title{
			font-size: 20px;
			color: #fff;
		}
		
	}
	.condition{
		padding: 10px 10px 20px;
		background: #100C2A;
		.title{
			font-size: 18px;
			color: #fff;
			text-align: left;
		}
		.contcen{
			display: flex;
			color: #fff;
			line-height: 30px;
			margin-top: 30px;
			flex-wrap: wrap;
			>div{
				margin-right: 30px;
				margin-bottom: 10px;
				display: flex;
				.el-input__inner{
					background: #2F384C;
					border: 1px solid #2F384C;
					color: #fff;
				}
				span{
					flex-shrink: 0;
				}
			}
			.search{
				background: #20a0ff;
				width: 70px;
				border-radius: 3px;
				text-align: center;
				display: inline-block;
				cursor: pointer;
			}
			.form_control2{
				width: auto;
				height: 30px;
				line-height: 30px;
				color: #fff;
				.el-radio{
					color: #fff;
				}
			}
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
