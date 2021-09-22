<template>
  <div class="manufacturings">
		<div class="tishi" v-show="detail===1">温馨提示：点击地图可查看详情</div>
	  <div id="echartMap" v-show="detail===1"></div>
    <!-- 列表 -->
    <div v-show="detail===2" class="images" @click="detail=1">
      <img src="~assets/img/liebiao.png" alt="">
    </div>
    <!-- 详情 -->
    <div v-show="detail===3" class="images" @click="detail=1">
      <img src="~assets/img/qyhx.png" alt="">
    </div>
  </div>
</template>

<script>
	import echarts from 'echarts';
	import 'echarts/map/js/jiaxing.js';
  export default {
    name: 'work-order-list',
    components: {
    },
    data() {
      return {
        detail: 1,
      }
    },
    mounted() {
      setTimeout(() => {
      this.echartMap();
      }, 200);
    },
    methods: {
      echartMap() {
        var that = this
				var option;
				var myChart = echarts.init(document.getElementById('echartMap'));
				var data = [{
								name: "秀洲区",
								value: [120.610431,30.793323]
						},
						{
								name: "桐乡市",
								value: [120.451085,30.629065]
						},
					
						{
								name: "海宁市",
								value: [120.648821,30.455544]
						},
						{
								name: "海盐县",
								value: [120.942017,30.522223]
						},
						{
							name: "平湖市",
							value: [121.014666,30.698921]
						},
						{
							name: "嘉善县",
							value: [120.921871,30.841352]
						},
						{
							name: "南湖区",
							value: [120.842186,30.711139]
						},
				]
        var namelist = [
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
					'桐乡市袋鼠王商贸有限公司',
					'雅莹集团股份有限公司',
					'嘉兴朗颖信息科技有限公司',
					'海宁市海洲街道家帝日用品网店',
					'桐乡市卡顿商贸有限公司',
					'浙江华之毅时尚集团有限公司',
					'嘉兴市美鹿羊绒制品有限公司',
					'桐乡市益植美商贸有限公司',
					'嘉兴市吉森服饰有限公司',
					'海宁市若森服装设计工作室',
				]
				var LableData = [
					{
						name: "平湖市",
						coords: [
							[121.014666,30.698921],
							[121.314666,30.698921]
						], // 线条位置[开始位置，结束位置]
						value: namelist.slice(0,Math.random()*100)
					},
						{
						name: "秀洲区",
						coords: [
								[120.610431,30.793323],
								[120.410431,30.993323]
						], // 线条位置[开始位置，结束位置]
						value: namelist.slice(0,Math.random()*100)
          }, 
          {
              name: "桐乡市",
              coords: [
                  [120.451085,30.629065],
                  [120.201085,30.829065]
              ], // 线条位置[开始位置，结束位置]
              value: namelist.slice(0,Math.random()*100)
          }, 
          {
              name: "海宁市",
              coords: [
                  [120.648821,30.455544],
                  [120.348821,30.285544]
              ], // 线条位置[开始位置，结束位置]
              value: namelist.slice(0,Math.random()*100)
          }, 
          {
              name: "海盐县",
              coords: [
                  [120.942017,30.522223],
                  [120.942017,30.422223]
              ], // 线条位置[开始位置，结束位置]
              value: namelist.slice(0,Math.random()*100)
          },{
              name: "嘉善县",
              coords: [
                  [120.921871,30.841352],
                  [121.021871,30.954682]
              ], // 线条位置[开始位置，结束位置]
              value: namelist.slice(0,Math.random()*100)
					},{
						name: "南湖区",
						coords: [
								[120.842186,30.711139],
								[121.312186,30.881139,100]
						], // 线条位置[开始位置，结束位置]
						value: namelist.slice(0,Math.random()*100)
					},
				];
				option = {
						geo: {
								map: 'jiaxing',
								aspectScale: 0.85,
								zoom: 1, //当前视角的缩放比例
								layoutCenter: ["50%", "50%"], //地图位置
								layoutSize: '100%',
								itemStyle: {
										normal: {
												shadowColor: '#276fce',
												shadowOffsetX: 0,
												shadowOffsetY: 15,
												opacity: 0.5,
										},
										emphasis: {
												areaColor: '#276fce',
				
										}
								},
						},
						series: [
								// 常规地图
								{
										type: 'map',
										mapType: 'jiaxing',
										aspectScale: 0.85,
										layoutCenter: ["50%", "50%"], //地图位置
										layoutSize: '100%',
										zoom: 1, //当前视角的缩放比例
										// roam: true, //是否开启平游或缩放
										scaleLimit: { //滚轮缩放的极限控制
												min: 0,
												max: 2
										},
                    label: {
                        show: true,
                        color: '#fff',
                        formatter(params) {
                            let arr
                            LableData.forEach(element => {
                              if(element.name === params.name){
                                arr = params.name+"("+element.value.length+")"
                                console.log(arr)
                              }
                            });
														return arr
												},
                    },
										itemStyle: {
												normal: {
														areaColor: '#0c274b',
														borderColor: '#1cccff',
														borderWidth: 1.5
												},
												emphasis: {
														areaColor: '#02102b',
														label: {
																color: "#fff",
														}
												}
										},
								},
								// 区域散点图
								{
										type: 'effectScatter',
										coordinateSystem: 'geo',
										zlevel: 2,
										symbolSize: 10,
										rippleEffect: { //坐标点动画
												period: 3,
												scale: 5,
												brushType: 'fill'
										},
										label: {
												normal: {
														show: false,
														position: 'right',
														formatter: '{b}',
														color: '#b3e2f2',
														fontWeight: "bold",
														fontSize: 14
												}
										},
				
										data: data,
										itemStyle: { //坐标点颜色
												normal: {
														show: true,
														color: '#ff8003',
														shadowBlur: 20,
														shadowColor: '#fff'
												},
												emphasis: {
														areaColor: '#f00'
												}
										},
				
								},
								{
										type: 'lines',
										zlevel: 3,
										symbol: 'circle',
										symbolSize: [5, 5],
										color: '#ff8003',
										opacity: 1,
										label: {
												show: true,
												padding: [10, 20],
												color: '#fff',
												backgroundColor: "#1a3961",
												borderColor: '#aee9fb',
												borderWidth: 1,
												borderRadius: 6,
												formatter(params) {
														let arr = [];
                            for(let i = 0; i < params.value.length; i++){
                              if(i<5) arr.push(params.value[i])
                            }
														return arr.join("\n")
												},
												textStyle: {
														align: 'left',
														lineHeight: 20,
												}
										},
										lineStyle: {
												type: 'solid',
												color: '#fff',
												width: 0.5,
												opacity: 1,
				
										},
										data: LableData,
								},
						]
				};
				myChart.on('click', function(params) {
						console.log(params);
            if(params.componentSubType === 'map'){
              that.detail = 2
            }else{
              that.detail = 3
            }
            console.log(that.detail)
				});
				option && myChart.setOption(option);
				window.addEventListener("resize",function(){
							myChart.resize();
					});
	
			},
    },
    filters: {

    },
    watch:{

	  }
  }
</script>
<style lang='less'>
  .manufacturings{
		position: relative;
    #echartMap{
      width: 100%;
      height: 800px;
      margin: 0 auto;
    }
    .images,.images>img{
      width: 100%;
      display: block;
    }
		.tishi{
			position: absolute;
			left: 50px;
			top: 50px;
			background: #1A3961;
			border-radius: 5px;
			border: 1px solid #6C99B4;
			color: yellow;
			padding: 5px 10px;
		}
  }
</style>
