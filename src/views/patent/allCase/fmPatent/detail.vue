<template>
  <div class="patentdetail">
    <!-- 知识产权贯标企业 -->
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
import echarts from 'echarts';
import VueCookie from "vue-cookie";
import pasuploader from 'cps/pasuploader/uploader.vue'
import { gbs } from "config/settings.js";
import Filters from "utils/filters/filters.js";
import { store } from "utils/";
const rootUrl = CONFIG.rootUrl;
const detailUrl = './api/findCaseDetail/{caseSysNo}'
const zlzsUrl='./api/findPasCertificateExpressDetail/{caseSysNo}'
const yearFeeUrl ='./api/editPasYearFeeRecord'
const pasFlowUrl ='./api/editFeedbackOfPasFlow'
const createpasFlowUrl ='./api/createFeedbackOfPasFlow'
const delOtherMaterialUrl = './api/delOtherMaterial/{id}'
const pdfUrl = "./api/preview";
const standby1_Data={
        submitOrg: "",
        submitTime: '',
        declarator: "",
    }
const standby2_Data= {
        applicatNumber: "",
        applicatTime: "",
        applicatFeeDeadline:'',
    }
const standby3_Data={
        turnInApplicatFeeTime: "",
        turnInApplicatFee: "",
        maker: "",
        officialYellowTicketNumber:''
      }
const standby4_Data={
        trialReviewResult: 1,
        supplementReviewDeadline: "",
        rejectReviewDeadline: "",
        boardFeeDeadline:'',
      }
const standby5_Data={
        submitTime:'',
      }
const standby6_Data={
        boardFeeReceiveAmount: '',
        serviceFee:'',
        boardFeeReceiveTime: "",
        turnInAmount: "",
        boardFeeTurnInTime: '',
        officialYellowTicketNumber: "",
        maker:'',
      }

const standby7_Data={
        yearFeeTurnInType:1,
        yearFeeReceiveAmount: '',
        serviceFee:'',
        yearFeeReceiveTime: "",
        maker: "",
        turnInAmount: '',
        turnInTime: "",
        officialYellowTicketNumber:'',
      }
const standby4ss_Data={
        substantReviewResult: 1,
        supplementReviewDeadline: "",
        rejectReviewDeadline: "",
        boardFeeDeadline:'',
        whichYear:''
      }
const standby5ss_Data={
        submitTime:""
      }
const yearoptions = [
		{
		  value: '1',
		  name: '0',
		  label: '1'
		}, {
		  value: '2',
		  name: '1',
		  label: '2'
		}, {
		  value: '3',
		  name: '2',
		  label: '3'
		}, {
		  value: '4',
		  name: '3',
		  label: '4'
		}, {
		  value: '5',
		  name: '4',
		  label: '5'
		}, {
		  value: '6',
		  name: '5',
		  label: '6'
		}, {
		  value: '7',
		  name: '6',
		  label: '7'
		}, {
		  value: '8',
		  name: '7',
		  label: '8'
		}, {
		  value: '9',
		  name: '8',
		  label: '9'
		}, {
		  value: '10',
		  name: '9',
		  label: '10'
		}, {
		  value: '11',
		  name: '10',
		  label: '11'
		}, {
		  value: '12',
		  name: '11',
		  label: '12'
    },{
		  value: '13',
		  name: '12',
		  label: '13'
		}, {
		  value: '14',
		  name: '13',
		  label: '14'
		}, {
		  value: '15',
		  name: '14',
		  label: '15'
		}, {
		  value: '16',
		  name: '15',
		  label: '16'
		}, {
		  value: '17',
		  name: '16',
		  label: '17'
		}, {
		  value: '18',
		  name: '17',
		  label: '18'
		}, {
		  value: '19',
		  name: '18',
		  label: '19'
		}, {
		  value: '20',
		  name: '19',
		  label: '20'
		}
    
	]
  const dataObj = {//条件数据
		contractNo:null,
		patentName:null,
		applicant: null,
		contacter:null,
		applicatNumber:null
	};
export default {
  components: {
    pasuploader
  },
  data() {
    return {
      yearoptions: yearoptions,
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
      thetype:1,
      caseSysNo:'',
      ischange:'',
      applyrules: {
        submitOrg: [{ required: true, message: "请填写递交机构", trigger: "blur" }],
        declarator: [{ required: true, message: "请填写申报员", trigger: "blur" }],
	    },
      isfeerules: {
        boardFeeReceiveAmount: [{ required: true, message: "请填写办登费收款金额", trigger: "blur" }],
        maker: [{ required: true, message: "请填写制单人", trigger: "blur" }],
        turnInAmount: [{ required: true, message: "请填写缴费金额", trigger: "blur" }],
      },
      
      // 申请材料
      standby1:'',
      standby1_Data:[],
      standby1_Datas:Object.assign({},standby1_Data),
      standby1_Datac:{},
      standby1_title:'',
      is_standby1:false,
      standby1_name:'',
      // 受理通知
      standby2:'',
      standby2_Data:[],
      standby2_name:'',
      standby2_Datas:Object.assign({},standby2_Data),
      standby2_Datac:{},
      standby2_title:'',
      is_standby2:false,
      // 申请费
      standby3:'',
      standby3_Data:[],
      standby3_name:'',
      standby3_Datas:Object.assign({},standby3_Data),
      standby3_Datac:{},
      standby3_title:'',
      is_standby3:false,
      // 初步审查
      ismodify: false,
      standby4:'',
      standby4_Data:[],
      standby4_name:'',
      standby4_Datas:Object.assign({},standby4_Data),
      standby4_Datac:{},
      standby4_title:'',
      is_standby4:false,
      standby4c_Datac:[],
      // 补正/审查
      ismodifyd: false,
      standby5:'',
      standby5_Data:[],
      standby5_name:'',
      standby5_Datas:Object.assign({},standby5_Data),
      standby5_Datac:{},
      standby5_title:'',
      is_standby5:false,
      standby5c_Datac:[],
      //实质请求审核
      
      is_ssresult: false,
      ssresult_title:'',
      ssresult_Data:[],
      ssresult_Datas:{
        substantReqAuditResult:1,
      },
      ssresult:'',
      ssresult_Data:[],
      ssresult_name:'',
      // 实质审查
      ismodifyss: false,
      standby4ss:'',
      standby4ss_Data:[],
      standby4ss_name:'',
      standby4ss_Datas:Object.assign({},standby4ss_Data),
      standby4ss_Datac:{},
      standby4ss_title:'',
      is_standby4ss:false,
      standby4css_Datac:[],
      // 补正/审查(实审)
      ismodifydss: false,
      standby5ss:'',
      standby5ss_Data:[],
      standby5ss_name:'',
      standby5ss_Datas:Object.assign({},standby5ss_Data),
      standby5ss_Datac:{},
      standby5ss_title:'',
      is_standby5ss:false,
      standby5css_Datac:[],
      // 办登费
      standby6:'',
      standby6_Data:[],
      standby6_name:'',
      standby6_Datas:Object.assign({},standby6_Data),
      standby6_Datac:{},
      standby6_title:'',
      is_standby6:false,
      //专利证书
      zlzsdata:{},
      // 年费
      standby7:'',
      standby7_Data:[],
      standby7_name:'',
      standby7_Datas:Object.assign({},standby7_Data),
      standby7_Datac:{},
      standby7_title:'',
      is_standby7:false,
      num:'',
      // 其他申请材料
      standby8:'',
      standby8_Data:[],
      standby8_name:'',
      // 其他官文材料
      standby9:'',
      standby9_Data:[],
      standby9_name:'',
      isdisabled:false,
      
      
      
      radios: 2,
      resradio:1,
      type: "", //type: 0 默认; 1 创新保; 2 国内商标自助注册
      noRepeat: true, //防止重复提交
      radio: 1,
      auditstate: "",
      isAllWorkOrder: false,
      audit: {
        radio: "",
        state: ""
      },
      rootUrl: rootUrl,
      status: 1,
      work_order_sn: "",
      remarkData: [],
      dialogRemark: false,
      content: "",

      dialogVisible: false,
      dialogImg: false,
      detailInfo: {
        baseInfo:{},
        pasFlowFeedbackMap:{},
        otherOfficialMaterialList:[],
        otherApplicantMaterialList:[],
        pasYearFeeRecordList:[],
        pasInvoiceInfoFormList:[],
      },
      textarea: "",
      dialogState: false,
      // 当前服务状态
      recordContent: "",
      imgsrc: "",
      proxyImg: [],
      // 营业执照
      usinessLicense: [],
      // 委托书
      powerAttorney: [],
      licenseName: [],

      localStore: store,
      //服务记录
      dialogService: false,
      acceptMaterials: "",
      recordData: "",
      dialogServiceLoading: false,
      // 弹框 - 证书 - 预览
      previewImg: false,
      previewSrc: "",
	    token: "",
    };
  },
  watch: {
  },
  methods: {
    setUploadedMaterial(data){
        var dat = data.data;
        let d = Object.assign({},dat)
        let isrepeat= false;
        let md= this[data.valueName+'_Data'];
         for(let i=0;i<md.length;i++){
           if(d.url == md[i]['url']){
             isrepeat = true;
             break;
           }
         }
         if(!isrepeat){
            md.unshift(d)
          }
				if (d.url) {

					this[data.valueName]= d.url;
					this[data.valueName+'_name']= d.fileName;
					// this.trademarkData.contract_url = d.url;
				}else{
					this.uploaderErrCallback(d);
        }
        console.log(data)
    },
    resetUploader(valueName){
				this[valueName] = '';
				this[valueName+'_name'] = '';
    },
    resetUploaders(valueName,nm){
				this[nm][valueName] = '';
				this[nm][valueName+'_name'] = '';
		},
    uploaderErrCallback(data){
				this.$alert(data.msg);
    },
    totimestamp(str) {
        return str?new Date(str).getTime():null
    },
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
    getzlzs(){
      this.$http.get(zlzsUrl.replace('{caseSysNo}',this.$route.params.id)).then(res=>{
          this.zlzsdata = res.data.obtainCertificate;
      })
    },
    createFlow(data,whichName){
      let subdata = data||{};
      this.$http.post(createpasFlowUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search()
        this.commonCancel(whichName)
      }).catch(err=>{
        this.$message.error(err.response.data.msg);
      })
    },
    editFlow(data,whichName){
      let subdata = data||{};
      this.$http.put(pasFlowUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search()
        this.commonCancel(whichName)
      }).catch(err=>{
        this.$message.error(err.response.data.msg);
      })
    },
    editYearFlow(data,whichName){
      let subdata = data||{};
      this.$http.put(yearFeeUrl,subdata).then(res=>{
        this.$message.success('操作成功');
        this.search()
        this.commonCancel(whichName)
      }).catch(err=>{
        this.$message.error(err.response.data.msg);
      })
    },
    //定位专用
    commonSubmitu(whichName){
      let subdata = Object.assign({},this[whichName+'_Datas']);
      let arr = [];
      let files = this[whichName+'_Data'];
      if(files.length>0){
        for(let i=0;i<files.length;i++){
          arr.push(files[i]['fileId'])
        }
      }
      if(arr.length>0){
        subdata.fileIds = arr;
      }
      switch(whichName){
        case 'standby1':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          subdata.nextFlowStage = 2;
          subdata.caseSysNo = this.caseSysNo;
          this.$refs.standby1_Datas.validate(valid=>{
            if(valid){
              if(!subdata.submitTime){
                this.$message.warning("请选择提交时间");
                return;
              }
              this.createFlow(subdata,whichName);
            }
          })
          break;
        case 'standby2':
          subdata.applicatTime = this.totimestamp(subdata.applicatTime);
          subdata.applicatFeeDeadline = this.totimestamp(subdata.applicatFeeDeadline);
          subdata.nextFlowStage = 3;
          subdata.caseSysNo = this.caseSysNo;
          if(!subdata.applicatNumber){
            this.$message.warning("请填写申请号");
            return;
          }
          if(!subdata.applicatTime){
            this.$message.warning("请选择申请时间");
            return;
          }
          if(!subdata.applicatFeeDeadline){
            this.$message.warning("请选择申请费缴纳截止时间");
            return;
          }
          this.createFlow(subdata,whichName);
          break;
        case 'standby3':
          subdata.turnInApplicatFeeTime = this.totimestamp(subdata.turnInApplicatFeeTime);
          if(this.isNull(subdata) && this.standby3_Data.length<1){
            this.$message.warning("请填写申请费缴纳信息或者上传支付凭证");
            return;
          }
          subdata.nextFlowStage = 4;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby4':
          subdata.supplementReviewDeadline = this.totimestamp(subdata.supplementReviewDeadline);
          subdata.rejectReviewDeadline = this.totimestamp(subdata.rejectReviewDeadline);
          if(!subdata.trialReviewResult){
            this.$message.warning("请选择初步审查结果");
            return;
          }
          if(!subdata.supplementReviewDeadline && subdata.trialReviewResult==2){
            this.$message.warning("请选择补正审查截止时间");
            return;
          }
          if(!subdata.rejectReviewDeadline && subdata.trialReviewResult==3){
            this.$message.warning("请选择驳回复审截止时间");
            return;
          }
          subdata.caseSysNo = this.caseSysNo;
          if(subdata.trialReviewResult==1){
            subdata.nextFlowStage = 6;
            delete subdata.supplementReviewDeadline
            delete subdata.rejectReviewDeadline
            this.createFlow(subdata,whichName);
          }
          if(subdata.trialReviewResult==2){
            subdata.nextFlowStage = 5;
            delete subdata.boardFeeDeadline
            delete subdata.rejectReviewDeadline
            this.createFlow(subdata,whichName);
          }
          if(subdata.trialReviewResult==3){
            subdata.nextFlowStage = -1;
            delete subdata.supplementReviewDeadline
            delete subdata.boardFeeDeadline
            this.createFlow(subdata,whichName);
          }
          break;
        case 'standby5':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          if(!subdata.submitTime){
            this.$message.warning("请选择递交日期");
            return;
          }
          subdata.nextFlowStage = 4;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'ssresult':
          subdata.nextFlowStage = 7;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby4ss':
          subdata.boardFeeDeadline = this.totimestamp(subdata.boardFeeDeadline);
          subdata.supplementReviewDeadline = this.totimestamp(subdata.supplementReviewDeadline);
          subdata.rejectReviewDeadline = this.totimestamp(subdata.rejectReviewDeadline);
          if(!subdata.boardFeeDeadline && subdata.substantReviewResult==1){
            this.$message.warning("请选择办登费缴纳截止时间");
            return;
          }
          if(!subdata.whichYear && subdata.substantReviewResult==1){
            this.$message.warning("请填写第几年度");
            return;
          }
          if(!subdata.supplementReviewDeadline && subdata.substantReviewResult==2){
            this.$message.warning("请选择补正审查截止时间");
            return;
          }
          if(!subdata.rejectReviewDeadline && subdata.substantReviewResult==3){
            this.$message.warning("请选择驳回复审截止时间");
            return;
          }
          if(subdata.substantReviewResult==1){
            subdata.nextFlowStage = 9;
            delete subdata.supplementReviewDeadline
            delete subdata.rejectReviewDeadline
            
          }
          if(subdata.substantReviewResult==2){
            subdata.nextFlowStage = 8;
            delete subdata.boardFeeDeadline
            delete subdata.rejectReviewDeadline
            delete subdata.whichYear
          }
          if(subdata.substantReviewResult==3){
            subdata.nextFlowStage =-2;
            delete subdata.supplementReviewDeadline
            delete subdata.boardFeeDeadline
            delete subdata.whichYear
          }
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby5ss':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          if(!subdata.submitTime){
            this.$message.warning("请选择递交日期");
            return;
          }
          subdata.nextFlowStage = 7;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby6':
          subdata.boardFeeReceiveTime = this.totimestamp(subdata.boardFeeReceiveTime);
          subdata.boardFeeTurnInTime = this.totimestamp(subdata.boardFeeTurnInTime);
          if(this.isNull(subdata) && this.standby6_Data.length<1){
            this.$message.warning("请填写办登费缴纳信息或者上传支付凭证");
            return;
          }
          subdata.nextFlowStage = 10;
          subdata.caseSysNo = this.caseSysNo;
          this.createFlow(subdata,whichName);
          break;
        case 'standby7':
          subdata.yearFeeReceiveTime = this.totimestamp(subdata.yearFeeReceiveTime);
          subdata.turnInTime = this.totimestamp(subdata.turnInTime);
          if(this.isNull(subdata) && this.standby7_Data.length<1){
            this.$message.warning("请填写年费缴纳信息或者上传支付凭证");
            return;
          }
          if(!subdata.yearFeeTurnInType){
            this.$message.warning("请选择年费缴纳方式");
            return;
          }
          this.editYearFlow(subdata,whichName)
          break;
      }
        
    },
    commonSubmitc(whichName){
      let subdata = Object.assign({},this[whichName+'_Datas']);
      let arr = [];
      let files = this[whichName+'_Data'];
      if(files.length>0){
        for(let i=0;i<files.length;i++){
          arr.push(files[i]['fileId'])
        }
      }
      console.log(arr,files)
      if(arr.length>0){
        subdata.fileIds = arr;
      }else{
        // subdata.fileIds = null;
        delete subdata.fileIds
        delete subdata.pasFiles
      }
      switch(whichName){
        case 'standby1':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          this.$refs.standby1_Datas.validate(valid=>{
            if(valid){
              if(!subdata.submitTime){
                this.$message.warning("请选择提交时间");
                return;
              }
              this.editFlow(subdata,whichName)
            }
          })
          break;
        case 'standby2':
          subdata.applicatTime = this.totimestamp(subdata.applicatTime);
          subdata.applicatFeeDeadline = this.totimestamp(subdata.applicatFeeDeadline);
          if(!subdata.applicatNumber){
            this.$message.warning("请填写申请号");
            return;
          }
          if(!subdata.applicatTime){
            this.$message.warning("请选择申请时间");
            return;
          }
          if(!subdata.applicatFeeDeadline){
            this.$message.warning("请选择申请费缴纳截止时间");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby3':
          subdata.turnInApplicatFeeTime = this.totimestamp(subdata.turnInApplicatFeeTime);
          if(this.isNull(subdata) && this.standby3_Data.length<1){
            this.$message.warning("请填写申请费缴纳信息或者上传支付凭证");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby4':
          subdata.supplementReviewDeadline = this.totimestamp(subdata.supplementReviewDeadline);
          subdata.rejectReviewDeadline = this.totimestamp(subdata.rejectReviewDeadline);
          if(!subdata.trialReviewResult){
            this.$message.warning("请选择初步审查结果");
            return;
          }
          if(!subdata.supplementReviewDeadline && subdata.trialReviewResult==2){
            this.$message.warning("请选择补正审查截止时间");
            return
          }
          if(!subdata.rejectReviewDeadline && subdata.trialReviewResult==3){
            this.$message.warning("请选择驳回复审截止时间");
            return
          }
          this.editFlow(subdata,whichName)        
          break;
        case 'standby5':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          if(!subdata.submitTime){
            this.$message.warning("请选择递交日期");
            return
          }
          this.editFlow(subdata,whichName)
          break;
        case 'ssresult':
          this.editFlow(subdata,whichName)
          break;
        case 'standby4ss':
          subdata.boardFeeDeadline = this.totimestamp(subdata.boardFeeDeadline);
          subdata.supplementReviewDeadline = this.totimestamp(subdata.supplementReviewDeadline);
          subdata.rejectReviewDeadline = this.totimestamp(subdata.rejectReviewDeadline);
          if(!subdata.boardFeeDeadline && subdata.substantReviewResult==1){
            this.$message.warning("请选择办登费缴纳截止时间");
            return;
          }
          if(!subdata.whichYear && subdata.substantReviewResult==1){
            this.$message.warning("请填写第几年度");
            return;
          }
          if(!subdata.supplementReviewDeadline && subdata.substantReviewResult==2){
            this.$message.warning("请选择补正审查截止时间");
            return;
          }
          if(!subdata.rejectReviewDeadline && subdata.substantReviewResult==3){
            this.$message.warning("请选择驳回复审截止时间");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby5ss':
          subdata.submitTime = this.totimestamp(subdata.submitTime);
          if(!subdata.submitTime){
            this.$message.warning("请选择递交日期1");
            return
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby6':
          subdata.boardFeeReceiveTime = this.totimestamp(subdata.boardFeeReceiveTime);
          subdata.boardFeeTurnInTime = this.totimestamp(subdata.boardFeeTurnInTime);
          if(this.isNull(subdata) && this.standby6_Data.length<1){
            this.$message.warning("请填写办登费缴纳信息或者上传支付凭证");
            return;
          }
          this.editFlow(subdata,whichName)
          break;
        case 'standby7':
          subdata.yearFeeReceiveTime = this.totimestamp(subdata.yearFeeReceiveTime);
          subdata.turnInTime = this.totimestamp(subdata.turnInTime);
          if(this.isNull(subdata) && this.standby7_Data.length<1){
            this.$message.warning("请填写年费缴纳信息或者上传支付凭证");
            return;
          }
          if(!subdata.yearFeeTurnInType){
            this.$message.warning("请选择年费缴纳方式");
            return;
          }
          this.editYearFlow(subdata,whichName)
          break;
      }
        
    },
    commonCancel(whichName){
      this[whichName+'_Data'] = [];
      this.resetUploader(whichName);
      this['is_'+whichName] = false;
    },
    otherDel(nm,item){
      this.$confirm('您确定要删除吗？','提示',{
			  confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
		  }).then(res=>{
        this.$http.delete(delOtherMaterialUrl.replace("{id}",item.id)).then(res=>{
          this.commonDel(nm,item)
        })
		  })
      
    },
    commonDel(aName,it){
      let datas = this[aName+'_Data'];
      for(let i=0;i<datas.length;i++){
        if(it.fileName ==datas[i]['fileName']){
          datas.splice(i,1);
          if(it.url==this[aName]){
            this.resetUploader(aName)
          }
          break;
        }
      }
      if(this[aName+'_Data'].length==0){
          this.resetUploader(aName)
      }
    },
    torevise() {
      store.set('pas_modify_basic',this.detailInfo.baseInfo);
      this.$router.push({
        name: "fmreviseBasic",
        params: { state: this.caseSysNo,type:2 }
      });
    },
    uploadMaterial(uc,t,n) {
      if(uc=='u'){
        this.ischange = 'u';
        switch(t){
          case 'standby1':
            this[t+'_Datas'] = Object.assign({},standby1_Data);
            this[t+'_title'] = '上传申请材料';
            break;
          case 'standby2':
            this[t+'_Datas'] = Object.assign({},standby2_Data);
            this[t+'_title'] = '受理通知';
            break;
          case 'standby3':
            this[t+'_Datas'] = Object.assign({},standby3_Data);
            this[t+'_title'] = '申请费缴纳信息';
            break;
          case 'standby4':
            this[t+'_Datas'] = Object.assign({},standby4_Data);
            this[t+'_title'] = '反馈初步审查结果';
            this.ismodify = false;
            break;
          case 'standby4ss':
            this[t+'_Datas'] = Object.assign({},standby4ss_Data);
            this[t+'_title'] = '反馈实质审查结果';
            this.ismodifyss = false;
            break;
          case 'standby5':
            this[t+'_Datas'] = Object.assign({},standby5_Data);
            this[t+'_title'] = '上传补正材料';
            this.ismodifyd = false;
            break;
          case 'standby5ss':
            this[t+'_Datas'] = Object.assign({},standby5ss_Data);
            this[t+'_title'] = '上传补正材料';
            this.ismodifydss = false;
            break;
          case 'standby6':
            this[t+'_Datas'] = Object.assign({},standby6_Data);
            this[t+'_title'] = '缴纳办登费信息';
            break;
          case 'standby7':
            this.isdisabled = false;
            this[t+'_Datas'] = Object.assign({},n);
            this.num = n['whichYear'];
            this[t+'_title'] = `第${this.num}年年费信息`;
            break;
          case 'ssresult':
            this[t+'_title'] = '上传实质请求审核结果';
            break;
        }
      }else{
        this.ischange = 'c';
        this[t+'_Datas'] = Object.assign({},n);
        if(n['pasFiles']){
          this[t+'_Data'] = [...n['pasFiles']];
        }
        switch(t){
          case 'standby1':
            this[t+'_title'] = '修改申请材料';
            break;
          case 'standby2':
            this[t+'_title'] = '修改受理通知';
            break;
          case 'standby3':
            this[t+'_title'] = '修改申请费缴纳信息';
            break;
          case 'standby4':
            
            this[t+'_title'] = '修改初步审查结果';
            this.ismodify = true;
            break;
          case 'standby4ss':
            this[t+'_title'] = '修改实质审查结果';
            this.ismodifyss = true;
            break;
          case 'standby5':
            this[t+'_title'] = '修改补正材料';
            break;
          case 'standby5ss':
            this[t+'_title'] = '修改补正材料';
            break;
          case 'standby6':
            this[t+'_title'] = '修改缴纳办登费信息';
            break;
          case 'standby7':
            this.num = n['whichYear'];
            this.isdisabled = true;
            this[t+'_title'] = `第${this.num}年年费信息`;
            break;
          case 'ssresult':
            this[t+'_title'] = '修改实质请求审核结果';
            break;
        }
      }
      this['is_'+t] = true
    },
    // 弹框内预览
    previewClick(data) {
      console.log(data);
      this.$http
        .get("./api/preview?pdf_url=" + data.url)
        .then(response => {
          this.previewSrc = response.data.urls;
        })
        .catch(error => {
          console.log(error);
        });
      this.certificateImg = data.type;
      this.previewImg = true;
    },
    preview(src) {
      this.$http.get("./api/preview?pdf_url=" + src)
        .then(response => {
          let urls = response.data.urls;
          if(urls){
            this.certificatePreview(urls)
          }else{
            this.$message.warning('预览失败')
          }
        })
        .catch(error => {
          this.$message({
            message: "该文件无法预览",
            type: "error"
          });
        });
      // this.imgsrc = src;
      // this.dialogVisible = true;
    },
    search() {
      var self = this;
      this.$http.get(detailUrl.replace('{caseSysNo}',this.$route.params.id))
        .then(resp => {
          self.detailInfo = resp.data;
          if(this.detailInfo.otherApplicantMaterialList){
            this.standby8_Data = this.detailInfo.otherApplicantMaterialList;
          }
          if(this.detailInfo.otherOfficialMaterialList){
            this.standby9_Data = this.detailInfo.otherOfficialMaterialList;
          }
          if(!this.detailInfo.pasFlowFeedbackMap){
            this.detailInfo.pasFlowFeedbackMap =  {};
          }
        })
        .catch(err => {
          this.$message.error(err.response.data.msg);;
        });
    },
    // 执照
    licenseUrl(url) {
      this.$http
        .get("./api/preview?pdf_url=" + url)
        .then(response => {
          this.licenseName = response.data.urls;
        })
        .catch(error => {
          this.$message({
            message: "pdf预览生成失败",
            type: "error"
          });
        });
    },
    // 营业执照
    imgUrl(url) {
      this.$http
        .get("./api/preview?pdf_url=" + url)
        .then(response => {
          this.usinessLicense = response.data.urls;
        })
        .catch(error => {
          this.$message({
            message: "pdf预览生成失败",
            type: "error"
          });
        });
    },
    // 委托书
    certificateImgUrl(url) {
      var self = this;
      this.$http
        .get("./api/preview?pdf_url=" + url)
        .then(response => {
          self.powerAttorney = response.data.urls;
        })
        .catch(error => {
          this.$message({
            message: "pdf预览生成失败",
            type: "error"
          });
        });
    },
    certificatePreview(url) {
      this.proxyImg = url;
      this.dialogImg = true;
    },
    pageback(){
      this.$router.go(-1)
    }
  },
  created() {},
  mounted() {
    var that = this
    var obj = require('../../../../assets/dark.json')
    echarts.registerTheme('dark', obj)
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom, 'dark');
    var option;
    var posList = [
        'left', 'right', 'top', 'bottom',
        'inside',
        'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
        'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
    ];

    app.configParameters = {
        rotate: {
            min: -90,
            max: 90
        },
        align: {
            options: {
                left: 'left',
                center: 'center',
                right: 'right'
            }
        },
        verticalAlign: {
            options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
            }
        },
        position: {
            options: posList.reduce(function (map, pos) {
                map[pos] = pos;
                return map;
            }, {})
        },
        distance: {
            min: 0,
            max: 100
        }
    };

    app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
            var labelOption = {
                normal: {
                    rotate: app.config.rotate,
                    align: app.config.align,
                    verticalAlign: app.config.verticalAlign,
                    position: app.config.position,
                    distance: app.config.distance
                }
            };
            myChart.setOption({
                series: [{
                    label: labelOption
                }, {
                    label: labelOption
                }, {
                    label: labelOption
                }, {
                    label: labelOption
                }]
            });
        }
    };


    var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {
            }
        }
    };

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: {
              text: '嘉兴市知识产权贯标企业'
        },
        legend: {
            data: ['海宁市', '桐乡市', '平湖市', '南湖区', '秀洲区', '嘉善县', '海盐县']
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '海宁市',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [5, 6, 8, 4, 9,15, 25, 75, 145]
            },
            {
                name: '桐乡市',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [1, 3, 15, 26, 44, 58, 68, 85, 96]
            },
            {
                name: '平湖市',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [2, 3, 6, 8, 16, 23, 35, 45, 68]
            },
            {
                name: '南湖区',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [3, 14, 26, 36, 45, 58, 68, 95, 125]
            },
            {
                name: '秀洲区',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [1, 5, 8, 12, 69, 78, 86, 95, 105]
            },
            {
                name: '嘉善县',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [2, 9, 15, 16, 35, 48, 52, 65, 89]
            },
            {
                name: '海盐县',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series'
                },
                data: [3, 6, 9, 15, 18, 29, 45, 58, 65]
            }
        ]
    };
    option && myChart.setOption(option);





    this.caseSysNo = this.$route.params.id;
    this.search();
    this.getzlzs()
    this.token = VueCookie.get("token");
  },
  filters: {
    patentInvoiceTypeFormat:Filters.patentInvoiceTypeFormat,
	  feeDeductFormat: Filters.feeDeductFormat,
	  priceFormat:Filters.priceformat,
	  dateFormat: Filters.formatDate.datesFormat,
    invoiceTypeFormat: Filters.invoiceTypeFormat,
    trialReviewResultFormat: Filters.trialReviewResultFormat,
    paperFormat: Filters.paperFormat,
    sendTypeFormat: Filters.sendTypeFormat,
    yearFeeTurnInTypeFormat:Filters.yearFeeTurnInTypeFormat
  },
  watch: {
    dialogService: function(now, val) {
      if (!now) {
        this.previewImg = false;
      }
    },
    status() {
      if (this.status == 2) {
      }
    }
  }
};
</script>
<style lang='less'>
.patentdetail {
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
  }
  .service_detail_tab {
    margin: 0 0 0 0;
    position: relative;
    background-color: #fff;
    box-sizing: content-box;
    width: 100%;
    ul {
      border-bottom: 1px solid #dfe2e5;
      height: 40px;
      li {
        height: 40px;
        text-align: center;
        font-size: 14px;
        color: #556677;
        cursor: pointer;
        padding: 13px 12px 0;
        line-height: 100%;
      }
      .sele_border {
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #dfe2e5;
        border-bottom: 1px solid #fff;
      }
    }
  }
  .form {
    background-color: #fff;
    padding: 0 30px 30px;
    border: 1px solid #dfe2e5;
    border-top: 0;
    border-radius: 0 2px 2px 2px;
    min-height: 500px;
    .basic_lists {
      padding-top: 20px;
      .tips {
        color: #999;
        font-size: 14px;
        margin-left: 10px;
      }
      .basictitle {
        margin-left: -30px;
        margin-right: -30px;
        padding: 10px 30px;
        font-size: 16px;
        color: #223344;
        height: 56px;
        line-height: 36px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        background-color: #efefef;
      }
      .otherdata {
        padding: 20px 0;
        font-size: 14px;
        > li {
          margin-bottom: 10px;
        }
      }
      //左侧
      //公共部分，主要是间距，字体大小，颜色
      .basic_category {
        text-align: left;
        padding-bottom: 10px;
        .category_left {
          width: 60%;
        }
        ul {
          width: 50%;
          padding-left: 30px;
          li {
            overflow-x: hidden;
            p {
              float: left;
              line-height: 18px;
              margin-bottom: 10px;
            }
            // 已支付
            p.topay {
              color: #36af47;
            }
            p.nopay {
              color: #f64744;
            }
            .tit {
              margin-right: 10px;
              font-size: 13px;
              color: #556677;
            }
            .txt {
              float: left;
              font-size: 13px;
              color: #7f8fa4;
              max-width: 69%;
            }
          }
        }
        .firstaudit{
            padding-top: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ccc;
            &:first-child{
              padding-top: 0;
            }
            &:last-child{
              border-bottom: none;
            }
          }
        //右侧图片预览定位
        
      }
    }



    // 弹框样式
    .state_preview {
      .bzbox:last-child{
        border-bottom: none;
      }
      .el-dialog__title {
        font-size: 14px;
        color: #223344;
        font-weight: normal;
        font-weight: bold;
      }
      .el-dialog__body {
        padding-top: 10px;
        padding-bottom: 30px;
      }
      .el-dialog--small {
        width: 700px;
      }
      .el-form-item__label{
        padding-top: 9px;
      }
      .submitdate{
        .el-form-item__label{
          &::before{
            content: '*';
            color: #f76868;
            font-size: 14px;
            padding-right: 3px;
          }
        }
      }
      .submitdates{
        .el-form-item__label{
          &::before{
            content: '*';
            color: #f76868;
            font-size: 14px;
            padding-right: 3px;
          }
        }
      }
      .radio,
      .state_radio,
      p {
        font-size: 14px;
        color: #556677;
      }
      .set_btn {
        p {
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
        }
        .right_btn {
          background: #479cff;
          color: #fff;
        }
        .left_btn {
          background: #ffffff;
          border: 1px solid #479cff;
          color: #479cff;
        }
      }
      .service_limit {
        position: absolute;
        bottom: 85px;
        right: 30px;
        color: #999;
        font-size: 13px;
      }
    }

    .preview_tit {
      p {
        cursor: pointer;
        img {
          vertical-align: top;
          margin-right: 7px;
        }
      }
    }
    // 预览
    .img_preview {
      .el-dialog--tiny {
        width: 940px;
        img {
          width: 900px;
        }
      }
    }
    .img_preview {
      .el-carousel {
        margin: 0 auto;
        width: 835px;
        .el-carousel__container {
          margin: 0 auto;
          height: 650px;
          .el-carousel__arrow {
            position: fixed;
          }
          .el-carousel__item {
            text-align: center;
            width: 810px;
            overflow-y: auto;
            img {
              width: 810px;
            }
          }
        }
      }
    }

    .setServicerDialog {
      .el-dialog--small {
        width: 520px;
      }
      .el-dialog__body {
        padding-top: 10px;
        .el-form-item {
          margin-bottom: 12px;
        }
      }
      .el-form-item__label {
        text-align: left;
        display: block;
        float: none;
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .set_btn {
        text-align: right;
        span {
          width: 88px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 2px;
          cursor: pointer;
          display: inline-block;
        }
        .right_btn {
          background: #479cff;
          color: #fff;
        }
        .left_btn {
          background: #ffffff;
          border: 1px solid #479cff;
          color: #479cff;
          margin-right: 10px;
        }
        .disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      }
    }

    .servicerInfo {
      .service_table {
        margin-top: 10px;
        > p {
          font-size: 13px;
          color: #556677;
          margin-bottom: 10px;
          button {
            width: 70px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 2px;
            font-size: 13px;
          }
          .service_btn {
            border: 1px solid #479cff;
            color: #479cff;
            cursor: pointer;
          }
          .service_nullbtn {
            border: 1px solid #dfe2e5;
            color: #7f8fa4;
            cursor: default;
          }
        }
        .tb01 {
          width: 20%;
        }
        .tb02 {
          width: 15%;
        }
        .tb03 {
          width: 15%;
        }
        .tb04 {
          width: 15%;
        }
        .tb05 {
          width: 35%;
        }
        ul {
          li {
            text-align: left;
            line-height: 40px;
            height: 40px;
          }
        }
        .table_tit {
          background: #f5f5f5;
          border: 1px solid #dfe2e5;
          li {
            font-size: 13px;
            color: #223344;
          }
        }
        .table_list {
          border-left: 1px solid #dfe2e5;
          border-right: 1px solid #dfe2e5;
          li {
            border-bottom: 1px solid #dfe2e5;
            p {
              line-height: 18px;
              line-height: 40px;
              height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 13px;
              color: #556677;
            }
          }
        }
      }
    }

    .state_list {
      .state_time {
        margin-top: -10px;
        p {
          span {
            font-size: 16px;
            color: #d8d8d8;
          }
        }
        a {
          text-decoration: none;
          font-size: 13px;
          color: #999999;
          cursor: pointer;
        }
        a:hover {
          color: #3db1fa;
        }
        i {
          border-left: 1px dashed #ddd;
          height: 23px;
          display: block;
          margin-top: -8px;
          margin-left: 4px;
        }
      }
      .change_providers {
        img {
          width: 70px;
        }
        .change_txt {
          span {
            font-size: 14px;
            color: #333333;
          }
          p {
            font-size: 13px;
            color: #666666;
            line-height: 19px;
            img {
              width: 18px;
              vertical-align: top;
            }
            a {
              text-decoration: none;
              cursor: pointer;
              color: #3db1fa;
            }
          }
        }
      }
    }
    // 服务记录
  }
  .el-form-item__label {
    text-align: left;
  }
  .el-textarea__inner {
    resize: none;
  }
  .el-form-item__label {
    text-align: left;
  }
}

.zipfilebox {
  display: flex;
  .namebox {
    margin-right: 20px;
    color: #666;
  }
}
.ziliao {
  text-decoration: underline;
  margin-right: 20px;
}
.downloadbtn {
  color: #379dea;
  cursor: pointer;
  margin-right: 20px;
  white-space: nowrap;
}
.uploadbtn {
  font-size: 14px;
  color: #379dea;
  cursor: pointer;
}
.reviseapply {
  > li {
    height: 30px;
  }
  .tit {
    float: left;
    margin-right: 10px;
    font-size: 13px;
    color: #556677;
  }
  .txt {
    float: left;
    font-size: 13px;
    color: #7f8fa4;
    max-width: 69%;
  }
}
.reviseapplybox {
  padding: 20px 30px 0;
  .resbox{
    padding-top: 20px;
    border-bottom: 1px solid #ccc;
    &:last-child{
      border-bottom: none;
    }
    &:first-child{
      padding-top:0;
    }
  }
  .el-input__icon {
    top: -3px;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .btnbox {
    padding-top: 10px;
    text-align: center;
    .el-button--large {
      width: 80px;
    }
  }
  .uploadintr{
	  line-height: 20px;
	  color:#999;
	  font-size: 12px;
  }
  .materialbox{
	  padding-top: 10px;
	  padding-bottom: 10px;
	  >li{
		  line-height: 24px;
	  }
  }
}
.bzbox{
  padding-top: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
