<template>
<!-- 专利权质押融资登记额 -->
<div class="patentdetail2">
  <div class="condition clearfix">
    
    <div class="form_control form_control2">
      <span>类型：</span>
      <el-radio v-model="applicant" label="1">质押融资额度</el-radio>
      <el-radio v-model="applicant" label="2">融资企业数量</el-radio>
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
          title: {
              text: '嘉兴市专利权质押融资登记额'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {            // Use axis to trigger tooltip
                  type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
              }
          },
          legend: {
              data: ['海宁市', '桐乡市', '平湖市', '南湖区', '秀洲区', '嘉善县', '海盐县'],
              left: '40%'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
          },
          yAxis: {
              type: 'value',
              name: '登记额（万元）'
          },
          series: [
              {
                  name: '海宁市',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [320, 332, 301, 334, 390, 330, 320,423,562,689]
              },
              {
                  name: '桐乡市',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [120, 132, 101, 134, 90, 230, 210,324,452,586]
              },
              {
                  name: '平湖市',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [220, 182, 191, 234, 290, 330, 310,452,523,654]
              },
              {
                  name: '南湖区',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [150, 232, 201, 154, 190, 330, 410,568,654,785]
              },
              {
                  name: '秀洲区',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data:  [862, 1018, 964, 1026, 1679, 1600, 1570,1754,1845,1986]
              }
              ,
              {
                  name: '嘉善县',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [620, 732, 701, 734, 1090, 1130, 1120,1245,1385,1478]
              }
              ,
              {
                  name: '海盐县',
                  type: 'bar',
                  stack: 'total',
                  label: {
                      show: true
                  },
                  emphasis: {
                      focus: 'series'
                  },
                  data: [120, 132, 101, 134, 290, 230, 220,321,456,567]
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