<template>
<!-- 建立企业联盟 -->
<div class="patentdetail2">
  <div class="condition clearfix">
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
import echarts from 'echarts';
import {store} from 'utils/';
  const dataObj = {//条件数据
		contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber:null
	};
const amountRule = (rule, value, callback) => {
    let exp = /^\d+(\.\d{1,2})?$/
    if(value&& !exp.test(value)){
      callback(new Error('请输入正确的金额'))
    }else {
      callback()
    }
  }
const addurl = './api/addCase'
const editurl = './api/editCase'
export default {
    name:'reviseBasic',
    data(){
        return{
          dataObj: Object.assign({}, dataObj),
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
          applicant:'1',
            thetype:'',
            caseSysNo:'',
            amountRules:{
              'officialFee':[{validator: amountRule,trigger:'blur'}],
              'serviceFee':[{validator: amountRule,trigger:'blur'}],
              'amount':[{validator: amountRule,trigger:'blur'}],
              'contractAmount':[{validator: amountRule,trigger:'blur'}],
              'firstCollectMoneyAmount':[{validator: amountRule,trigger:'blur'}],
              'secondCollectMoneyAmount':[{validator: amountRule,trigger:'blur'}],
              'sebeSettleChannelAmount':[{validator: amountRule,trigger:'blur'}],
              'channelSettleSebeAmount':[{validator: amountRule,trigger:'blur'}],
              'correspondAmount':[{validator: amountRule,trigger:'blur'}]
            }
        }
    },
    mounted(){
      var that = this
      var obj = require('../../../../assets/dark.json')
      echarts.registerTheme('dark', obj)
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom, 'dark');
      var option;
      option = {
					backgroundColor: '#100C2A',
					title: {
							text: '嘉兴市建立企业联盟'
					},
					tooltip: {
							trigger: 'axis'
					},
					legend: {
							data: ['嘉兴市','秀洲区', '南湖区', '平湖市', '桐乡市', '海宁市', '嘉善县', '海盐县'],
					},
					grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
					},
					toolbox: {
							feature: {
									saveAsImage: {}
							}
					},
					xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
					},
					yAxis: {
							type: 'value',
					},
					series: [
							{
									name: '嘉兴市',
									type: 'line',
									data: [9, 11, 16, 18, 20, 26, 37, 46, 58,69]
							},
							{
									name: '秀洲区',
									type: 'line',
									data: [2, 4, 6, 3, 9, 10, 13, 15, 19,23]
							},
							{
									name: '南湖区',
									type: 'line',
									data: [5, 7, 3, 8, 12, 15, 17, 21, 26,33]
							},
							{
									name: '平湖市',
									type: 'line',
									data: [1, 2, 5, 7, 12, 11, 19, 21, 28,26]
							},
							{
									name: '桐乡市',
									type: 'line',
									data: [1, 2, 3, 5, 8, 15, 17, 22, 21,25]
							},
							{
									name: '海宁市',
									type: 'line',
									data: [3, 4, 5, 7, 16, 19, 23, 33, 36,43]
							},
							{
									name: '嘉善县',
									type: 'line',
									data: [1, 3, 4, 8, 11, 15, 19, 19, 22,16]
							},
							{
									name: '海盐县',
									type: 'line',
									data: [5, 1, 3, 6, 9, 15, 16, 21, 11,10]
							}
					]
			};

			option && myChart.setOption(option);








      // store.remove('pas_patent_data')
      let ptype= this.$route.params.type;
      let caseSysNo = this.$route.params.state;
      this.thetype = ptype;
      this.caseSysNo = caseSysNo==0?null:caseSysNo;
      if(caseSysNo==0){
        let data = store.get('pas_patent_data');
        if(data){
          this.addData = Object.assign({},data)
        }
        let that =this;
        this.addData.channelReturnCaseTime =this.totimestamp(this.addData.channelReturnCaseTime); 
        this.addData.eventDeadline = this.totimestamp(this.addData.eventDeadline);
        this.addData.platformReceiveCaseTime = this.totimestamp(this.addData.platformReceiveCaseTime);
        this.addData.channelDivisionTime = this.totimestamp(this.addData.channelDivisionTime);
        this.addData.firstCollectMoneyTime = this.totimestamp(this.addData.firstCollectMoneyTime);
        this.addData.secondCollectMoneyTime = this.totimestamp(this.addData.secondCollectMoneyTime);
        window.onbeforeunload = function(){
          store.remove('pas_patent_data')
          if(!that.isNull(that.addData)){
            store.set('pas_patent_data', that.addData)
          }
        }
      }else{
        let info = store.get('pas_modify_basic');
        this.addData = Object.assign({},info)
      }      
    },
    beforeRouteLeave(to,from,next){
      if(!this.caseSysNo){
        store.remove('pas_patent_data');
        if(!this.isNull(this.addData)){
          this.addData.channelReturnCaseTime =this.totimestamp(this.addData.channelReturnCaseTime); 
          this.addData.eventDeadline = this.totimestamp(this.addData.eventDeadline);
          this.addData.platformReceiveCaseTime = this.totimestamp(this.addData.platformReceiveCaseTime);
          this.addData.channelDivisionTime = this.totimestamp(this.addData.channelDivisionTime);
          this.addData.firstCollectMoneyTime = this.totimestamp(this.addData.firstCollectMoneyTime);
          this.addData.secondCollectMoneyTime = this.totimestamp(this.addData.secondCollectMoneyTime);
          store.set('pas_patent_data', this.addData)
        }
      }
      next()
    },
    
    methods:{
      isNull(obj){
        let isnull = true;
        for( var key in obj){
          if(obj.hasOwnProperty(key)){
             if(obj[key]){
              isnull = false
            }
          }
         
        }
        return isnull
      },
      totimestamp(str) {
        return str?new Date(str).getTime():null
      },
    }
}
</script>

<style lang='less'>
.patentdetail2{
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
			.el-input__inner{height: 30px;}
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
  }
}
.btnbox{
    padding-top: 30px;
    text-align: center;
    .el-button--large{
      width: 150px;
    }
  }
</style>