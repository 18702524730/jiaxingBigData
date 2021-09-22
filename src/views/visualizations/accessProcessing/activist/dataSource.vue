<template>
<!--  数据源接入 -->
  <div class="shujuList">
		<div class="tabs">
			<div>添加数据源</div>
			<div>
				<div :class="{active:active==1}" @click="active = 1">云数据库</div>
				<div :class="{active:active==2}" @click="active = 2">本地上传</div>
			</div>
		</div>
		<div class="imagesym">
			<img :src="active==1?require('../../../../assets/img/imageym1.1.png'):require('../../../../assets/img/imageym1.2.png')" alt="">
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
.shujuList{
	/* border: 1px solid #DFE2E5; */width: 100%;padding-bottom: 20px;
	.imagesym{
		>img{
			width: 100%;
		}
	}
	.tabs{
		display: flex;
		align-items: center;
		color: #fff;
		background: #100C2A;
		padding: 10px 20px;
		>div:first-child{
			font-size: 20px;
			margin-right: 60px;
		}
		>div:last-child{
			font-size: 16px;
			display: flex;
			>div{
				margin: 0 15px;
				cursor: pointer;
			}
			>div:hover{
				color: #20a0ff;
			}
			>.active{
				color: #20a0ff;
			}
		}
	}
}
</style>
