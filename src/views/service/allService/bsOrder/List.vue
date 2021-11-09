<template>
	<div class="commonListAll">
		<div id="index_box">
			<div class="index_header">
				<div class="h_left">
					<p class="time">{{times}}</p>
					<p class="date">
						<span>{{myData.toLocaleDateString()}}</span>
						<span>{{Week[myData.getDay()]}}</span>
					</p>
				</div>
				<div class="h_center">
                    嘉兴智力成果监测与发展服务平台
				</div>
				<div class="h_right">
					<input type="text" class="pagevalue" />
					<!-- <div class="pagevalue_sel">办件情况</div> -->
					<ul class="hiddenul">
						<li>监督情况</li>
					</ul>
				</div>
			</div>
			<div class="index_contont">
				<div class="ct_one">
					<div class="totalbkind">
						<p class="totalbkind_h5">商标申请区域分析</p>
						<div id="zxqsfxfuc" style="width:100%;height:100%;"></div>
					</div>
					<div class="totalbkind" style="margin-top: 2%;">
						<p class="totalbkind_h5" style="font-size: 0.7vw;">商标总量权利人排名</p>
						<div id="bm_content2" class="bm_content" style="width: 100%;height: 80%;">
							<table class="table table-condensed ">
									<tbody id="tb3"></tbody>
									<tbody id="tb4"></tbody>
							</table>
						</div>
					</div>
					<div class="totalbkind" style="margin-top: 2%;height: 33.5%;">
						<p class="totalbkind_h5">商标申请及注册趋势</p>
						<div id="zxdepartmenttop5" class="tablecommon" style="width:100%;height:100%;"></div>
					</div>
				</div>
				<div class="ct_two">
					<div id="echartMap"></div>
					<div class="totalbkind" style="margin-top: 3%;height: 33.5%;width: 48%;float: left;margin-left: 1%;">
						<p class="totalbkind_h5">商标注册企业分布</p>
						<div id="tsqsfxfuc" style="width:100%;height:100%;"></div>
					</div>
					<div class="totalbkind" style="margin-top: 3%;height: 33.5%;width: 48%;float: left;margin-left: 3%;">
						<p class="totalbkind_h5">专利维持年限分布</p>
						<div class="tablecommon" id="zlwcnx" style="width:100%;height:100%">
							
						</div>
					</div>
				</div>
				<div class="ct_three">
					<div class="totalbkind">
						<p class="totalbkind_h5">专利申请区域分析</p>
						<div id="zxreback" style="width: 100%;height: 100%;"></div>
					</div>
					<div class="totalbkind"  style="margin-top: 2%;">
						<p class="totalbkind_h5" style="font-size: 0.7vw;">专利总量权利人排名</p>
						<div id="bm_content1" class="bm_content" style="width: 100%;height: 80%;">
							<table class="table table-condensed ">
									<tbody id="tb1"></tbody>
									<tbody id="tb2"></tbody>
							</table>
						</div>
					</div>
					<div class="totalbkind"  style="margin-top: 2%;height: 33.5%;">
						<p class="totalbkind_h5" style="font-size: 0.6vw;">近五年万人发明专利</p>
						<div class="tablecommon" id="tsreback" style="width:100%;height: 100%;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import {store} from 'utils/';
	const distributeMenuPermission = 'iprp_order_manage_fenpei';
	import 'echarts/map/js/jiaxing.js';
	export default {
		name: 'order-list',
		data() {
			return {
				times: '',
				myData: new Date(),
				Week: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
				userInfo:{},
				distributeIsAllowed:false,
				namelist1:[
					{value:'嘉兴职业技术学院',num:3679},
					{value:'嘉兴学院',num:2663},
					{value:'浙江亚特电器有限公司',num:1328},
					{value:'桐乡市濮院毛针织技术服务中心',num:1255},
					{value:'浙江晶科能源有限公司',num:992},
					{value:'浙江友邦集成吊顶股份有限公司',num:891},
					{value:'晶科能源有限公司',num:881},
					{value:'巨石集团有限公司',num:841},
					{value:'浙江合众新能源有限公司',num:795},
					{value:'中核核电运行管理有限公司',num:783},
					{value:' ',num: ''},
					{value:' ',num: ''},
				],
				namelist2:[
					{value:'桐乡市袋鼠王商贸有限公司',num:1035},
					{value:'雅莹集团股份有限公司',num: 923},
					{value:'嘉兴朗颖信息科技有限公司',num:696},
					{value:'海宁市海洲街道家帝日用品网店',num:646},
					{value:'桐乡市卡顿商贸有限公司',num:641},
					{value:'浙江华之毅时尚集团有限公司',num:474},
					{value:'嘉兴市美鹿羊绒制品有限公司',num:460},
					{value:'桐乡市益植美商贸有限公司',num:441},
					{value:'嘉兴市吉森服饰有限公司',num:429},
					{value:'海宁市若森服装设计工作室',num:409},
					{value:' ',num: ''},
					{value:' ',num: ''},
				]
			}
		},
		mounted() {
			var that = this
			this.userInfo = store.get('userinfo');
			// this.distributeIsAllowed = store.get('permission').indexOf(distributeMenuPermission) !== -1;
			setInterval(function(){
				that.times = new Date().toLocaleTimeString()
			}, 1000)
			this.echartMap();
			this.zxqsfxfuc();
			this.tsqsfxfuc();
			this.zxrebackfuc();
			this.tsrebackfuc();
			this.zlwcnx();
			this.zxdepartmenttop5()


			var box = document.getElementById("bm_content1");
			var l1 = document.getElementById("tb1");
			var l2 = document.getElementById("tb2");
			var scrollMove;
			autoScroll();
			function autoScroll() {
					var product = RenderList();
					l1.innerHTML = product;
					if (l1.offsetHeight > box.offsetHeight) {
							l2.innerHTML = l1.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
							scrollMove = setInterval(scrollup, 30);//数值越大，滚动速度越慢
							box.onmouseover = function () {
									clearInterval(scrollMove)
							}
					}
			}
			function scrollup() {
					//滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
					if (box.scrollTop >= l1.offsetHeight) {
							box.scrollTop = 0;
					} else {
							box.scrollTop++;
					}
			}
			//鼠标离开时，滚动继续
			box.onmouseout = function () {
					scrollMove = setInterval(scrollup, 30);
			}
			function RenderList() {
					var str = '';
					for (var i = 0; i < that.namelist1.length; i++) {
							var a = i>9?'':i + 1+"&nbsp; &nbsp; ";
							str += '<tr>';
							str += '<td class="ellipsis">';
							str += '<span class="center" style="margin-left: 10px;">' + a+that.namelist1[i].value + '</span>';
							str += '</td>';
							str += '<td class="ellipsis">'+ that.namelist1[i].num +'</td>';
							str += ' </tr>';
					}
					return str;
			}



			var boz = document.getElementById("bm_content2");
			var l3 = document.getElementById("tb3");
			var l4 = document.getElementById("tb4");
			var scroll2Move;
			auto2Scroll();
			function auto2Scroll() {
					var pro2duct = Render2List();
					l3.innerHTML = pro2duct;
					if (l3.offsetHeight > boz.offsetHeight) {
							l4.innerHTML = l3.innerHTML;//克隆list1的数据，使得list2和list1的数据一样
							scroll2Move = setInterval(scro2llup, 30);//数值越大，滚动速度越慢
							boz.onmouseover = function () {
									clearInterval(scroll2Move)
							}
					}
			}
			function scro2llup() {
					//滚动条距离顶部的值恰好等于list1的高度时，达到滚动临界点，此时将让scrollTop=0,让list1回到初始位置，实现无缝滚动
					if (boz.scrollTop >= l3.offsetHeight) {
							boz.scrollTop = 0;
					} else {
							boz.scrollTop++;
					}
			}
			//鼠标离开时，滚动继续
			boz.onmouseout = function () {
					scroll2Move = setInterval(scro2llup, 30);
			}
			function Render2List() {
					var str = '';
					for (var i = 0; i < that.namelist2.length; i++) {
							var a = i>9?'':i + 1+"&nbsp; &nbsp; ";
							str += '<tr>';
							str += '<td class="ellipsis">';
							str += '<span class="center" style="margin-left: 10px;">' + a+that.namelist2[i].value + '</span>';
							str += '</td>';
							str += '<td class="ellipsis">'+ that.namelist2[i].num +'</td>';
							str += ' </tr>';
					}
					return str;
			}
		},
		methods: {
			echartMap() {
				var option;
				var myChart = echarts.init(document.getElementById('echartMap'));
				let iconRQ = "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjNCRkRBMEJBQzgwRjExRUFBNUI0RTMyMThEN0UxMzFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjNCRkRBMEJCQzgwRjExRUFBNUI0RTMyMThEN0UxMzFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6M0JGREEwQjhDODBGMTFFQUE1QjRFMzIxOEQ3RTEzMUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6M0JGREEwQjlDODBGMTFFQUE1QjRFMzIxOEQ3RTEzMUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5mT42iAAABQ0lEQVR42mL8LabOQCQIBOL1xChkItJAkLp+IBajpqFWQCwPxJ7UNDQCSgdQy1BmIA6Bsl2AmJMahjoAsTiUzQPETtQwNAKN709IAwvUayZQ/hcg/o0k/x6Ig9D0+ABxKJT9HYh/oMm/BBm6GYitgTgfiBmJcLkkEK/CIXcGiGNB3v8JxIVQF31gIA/8AeIWaNK7gRymG4BYH4hPkGjgXSC2A+JaWNChR9QjqIJeIP5PhIGzgdgAiI8Tin2QbSVAvIOAgROBOA0auUQlKV4gtidgqBGp6RSUFrmIKA/ESDEUPcGfBOIUIH6Lln29iTVUCIjdkJJKExDbAPFcqJdPEMpd2AwF5TBWaFKxBeJ6qOHIqaMbmjrcsBUw2AwNh7rKAEeaBaWOMiD2BeJvQOxOyFBuaFJJwZZU0MBWaHCIo0sABBgAetA4Jx5t/ToAAAAASUVORK5CYII="

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
				var LableData = [
					{
						name: "平湖市",
						coords: [
							[121.014666,30.698921],
							[121.314666,30.698921]
						], // 线条位置[开始位置，结束位置]
						value: [21014, 42152]
					},
						{
						name: "秀洲区",
						coords: [
								[120.610431,30.793323],
								[120.410431,30.993323]
						], // 线条位置[开始位置，结束位置]
						value: [38299, 32154]
				}, 
				{
						name: "桐乡市",
						coords: [
								[120.451085,30.629065],
								[120.201085,30.829065]
						], // 线条位置[开始位置，结束位置]
						value: [99760, 62541]
				}, 
				{
						name: "海宁市",
						coords: [
								[120.648821,30.455544],
								[120.348821,30.285544]
						], // 线条位置[开始位置，结束位置]
						value: [59342, 72543]
				}, 
				{
						name: "海盐县",
						coords: [
								[120.942017,30.522223],
								[120.942017,30.422223]
						], // 线条位置[开始位置，结束位置]
						value: [33152, 18654]
				},{
						name: "嘉善县",
						coords: [
								[120.921871,30.841352],
								[121.021871,30.954682]
						], // 线条位置[开始位置，结束位置]
						value: [25101, 21521]
					},{
						name: "南湖区",
						coords: [
								[120.842186,30.711139],
								[121.312186,30.881139,100]
						], // 线条位置[开始位置，结束位置]
						value: [36369, 40135]
					},
				];
				var lable2data = [
					{
						name1: "嘉兴市专利数据",
						name2: "嘉兴市商标数据",
						coords: [
							[121.214666,30.375921],
							[121.214666,30.375921]
						], // 线条位置[开始位置，结束位置]
						value1: [305857, 87982,142305,75570],
						value2: [346967, 227881],
					},
				]
				var COLORS = ["#070093", "#1c3fbf", "#1482e5", "#70b4eb", "#b4e0f3", "#ffffff"];
				option = {
						/*backgroundColor: '#000f1e',*/
						// visualMap: {
						// 		type: 'piecewise',
						// 		inverse: true,
						// 		top: 10,
						// 		left: 10,
						// 		pieces: [{
						// 				value: 0, color: COLORS[0]
						// 		}, {
						// 				value: 1, color: COLORS[1]
						// 		}, {
						// 				value: 2, color: COLORS[2]
						// 		}, {
						// 				value: 3, color: COLORS[3]
						// 		}, {
						// 				value: 4, color: COLORS[4]
						// 		}, {
						// 				value: 5, color: COLORS[5]
						// 		}],
						// 		borderColor: '#ccc',
						// 		borderWidth: 2,
						// 		backgroundColor: '#eee',
						// 		dimension: 2,
						// 		inRange: {
						// 				color: COLORS,
						// 				opacity: 0.7
						// 		}
						// },
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
												min: 1,
												max: 2
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
																color: "#fff"
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
														let arr = [params.name, "商标：" + params.value[0] + "件", "专利：" + params.value[1] + "件"];
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
														let arr = [
															params.data.name1, 
															"专利申请量：" + params.data.value1[0] + "件",
															"发明专利：" + params.data.value1[1] + "件",
															"实用新型：" + params.data.value1[2] + "件",
															"外观设计：" + params.data.value1[3] + "件",
															"",
															params.data.name2, 
															"商标申请量：" + params.data.value2[0] + "件",
															"商标注册量：" + params.data.value2[1] + "件",
														];
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
												opacity: 0,
				
										},
										data: lable2data,
								},
						]
				};
				myChart.on('click', function(params) {
						console.log(params);
				});
				option && myChart.setOption(option);
				window.addEventListener("resize",function(){
							myChart.resize();
					});
	
			},
			zxqsfxfuc(){
				var obj = require('../../../../assets/dark.json')
				echarts.registerTheme('dark', obj)
				var chartDom = document.getElementById('zxqsfxfuc');
				var myChart = echarts.init(chartDom, 'dark');
				var option
				option = {
					backgroundColor: 'transparent',
						tooltip: {
								trigger: 'axis',
								axisPointer: {            // 坐标轴指示器，坐标轴触发有效
										type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
								}
						},
						grid: {
								left: '3%',
								right: '4%',
								bottom: '4%',
								top: '25%',
								containLabel: true
						},
						xAxis: [
								{
										type: 'category',
										data: ['海宁市', '桐乡市', '平湖市', '南湖区', '秀洲区', '嘉善县', '海盐县'],
										axisTick: {
												alignWithLabel: true
										},
										splitLine: {
											show: false
										}
								},
						],
						yAxis: [
								{
										type: 'value',
										name:'申请量（件）'
								}
						],
						series: [
								{
										name: '申请量',
										type: 'bar',
										barWidth: '60%',
										data: [59342, 99760, 21014, 36369, 38299, 25101, 33152]
								}
						]
				};
				option && myChart.setOption(option);
			},

			tsqsfxfuc(){
				var obj = require('../../../../assets/dark.json')
				echarts.registerTheme('dark', obj)
				var chartDom = document.getElementById('tsqsfxfuc');
				var myChart = echarts.init(chartDom, 'dark');
				var option
				option = {
						backgroundColor: 'transparent',
						title: {
								text: '',
								left: 'center'
						},
						tooltip: {
								trigger: 'item',
								formatter: function (p) {
										return p.percent+'%';
								}
						},
						label: {
								show: true,
								formatter(params) {
										var arr = [params.name,params.percent+'%']
										return arr.join("\n")
								},
						},
						emphasis: {
								label: {
										show: true,
										formatter: "{b|{b}}\n{per|{d}%}",
										rich: {
												"b": {
														"fontSize": 14,
												},
												"per": {
														"fontSize": 14,
												}
										}
								}
						},
						legend: {
								show:false,
								orient: 'vertical',
								left: 'left',
						},
						series: [
								{
										name: '访问来源',
										type: 'pie',
										radius: '50%',
										center: ["50%", "53%"],
										data: [
												{value: 1048, name: '南湖区'},
												{value: 735, name: '桐乡市'},
												{value: 580, name: '平湖区'},
												{value: 484, name: '秀洲区'},
												{value: 300, name: '海宁市'}
										],
										emphasis: {
												itemStyle: {
														shadowBlur: 10,
														shadowOffsetX: 0,
														shadowColor: 'rgba(0, 0, 0, 0.5)'
												}
										}
								}
						]
				};
				option && myChart.setOption(option);
            
				myChart.currentIndex = -1;
				function bing1 () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }
				var timer = setInterval(bing1, 1000);
				myChart.on('mouseover', function(params) {
						clearInterval(timer)
						myChart.dispatchAction({
								type: 'downplay',
								seriesIndex: 0,
								dataIndex: myChart.currentIndex
						});
						console.log(params.dataIndex)
						myChart.currentIndex = params.dataIndex;
						myChart.dispatchAction({
								type: 'highlight',
								seriesIndex: 0,
								dataIndex: myChart.currentIndex
						});
						
				});

				myChart.on('mouseout', function(params) {
						timer = setInterval(bing1,1000)
				});
				window.addEventListener("resize",function(){
            myChart.resize();
        });
			},

			zxrebackfuc(){
				var obj = require('../../../../assets/dark.json')
				echarts.registerTheme('dark', obj)
				var chartDom = document.getElementById('zxreback');
				var myChart = echarts.init(chartDom, 'dark');
				var option
				option = {
						backgroundColor: 'transparent',
						xAxis: {
								type: 'category',
								data: ['海宁市', '桐乡市', '平湖市', '南湖区', '秀洲区', '嘉善县', '海盐县'],								
								splitLine: {
									show: false
								}
						},
						tooltip: {
								trigger: 'axis',
								axisPointer: {            // 坐标轴指示器，坐标轴触发有效
										type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
								}
						},
						grid: {
								left: '3%',
								right: '4%',
								bottom: '4%',
								top: '25%',
								containLabel: true
						},
						yAxis: {
								type: 'value',
								name:'专利申请量（件）'
						},
						series: [{
								data: [72543, 62541, 42152, 40135, 32154, 21521, 18654],
								type: 'bar'
						}]
				};

				option && myChart.setOption(option);
			},

			zlwcnx(){
				var obj = require('../../../../assets/dark.json')
				echarts.registerTheme('dark', obj)
				var chartDom = document.getElementById('zlwcnx');
				var myChart = echarts.init(chartDom, 'dark');
				var option
				option = {
						backgroundColor: 'transparent',
						tooltip: {
								trigger: 'item',
								formatter: function (p) {
										return p.percent+'%';
								}
						},
						grid: {
								left: '10%',
								right: '4%',
								bottom: '4%',
								top: '18%',
								containLabel: true
						},
						label: {
								show: true,
								formatter(params) {
										var arr = [params.name,params.percent+'%']
										return arr.join("\n")
								},
						},
						emphasis: {
								label: {
										show: true,
										formatter: "{b|{b}}\n{per|{d}%}",
										rich: {
												"b": {
														"fontSize": 14,
												},
												"per": {
														"fontSize": 14,
												}
										}
								}
						},
						legend: {
								orient: 'vertical',
								left: 'left',
								show: false,
						},
						series: [
								{
										name: '访问来源',
										type: 'pie',
										radius: '50%',
										data: [
												{value: 1048, name: '1年'},
												{value: 735, name: '2年'},
												{value: 580, name: '3年'},
												{value: 484, name: '4~5年'},
												{value: 300, name: '6~8年'},
												{value: 300, name: '9~12年'},
												{value: 300, name: '13~20年'}
										],
										emphasis: {
												itemStyle: {
														shadowBlur: 10,
														shadowOffsetX: 0,
														shadowColor: 'rgba(0, 0, 0, 0.5)'
												}
										}
								}
						]
				};

				option && myChart.setOption(option);
				myChart.currentIndex = -1;
				function bing1 () {
            var dataLen = option.series[0].data.length;
            // 取消之前高亮的图形
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
            myChart.currentIndex = (myChart.currentIndex + 1) % dataLen;
            // 高亮当前图形
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: myChart.currentIndex
            });
        }
				var timer = setInterval(bing1, 1000);
				myChart.on('mouseover', function(params) {
						clearInterval(timer)
						myChart.dispatchAction({
								type: 'downplay',
								seriesIndex: 0,
								dataIndex: myChart.currentIndex
						});
						myChart.currentIndex = params.dataIndex;
						myChart.dispatchAction({
								type: 'highlight',
								seriesIndex: 0,
								dataIndex: myChart.currentIndex
						});
						
				});

				myChart.on('mouseout', function(params) {
						timer = setInterval(bing1,1000)
				});
				window.addEventListener("resize",function(){
            myChart.resize();
        });
			},
			tsrebackfuc(){
				var obj = require('../../../../assets/dark.json')
				echarts.registerTheme('dark', obj)
				var chartDom = document.getElementById('tsreback');
				var myChart = echarts.init(chartDom, 'dark');
				var option
				option = {
						backgroundColor: 'transparent',
						xAxis: {
								type: 'category',
								data: ['2016', '2017', '2018', '2019', '2020'],
								splitLine: {
									show: false
								}
						},
						yAxis: {
								type: 'value',
								name:'拥有量（件）'
						},
						grid: {
								left: '10%',
								right: '4%',
								bottom: '3%',
								top: '24%',
								containLabel: true
						},
						series: [{
								data: [9, 11, 13, 20, 33],
								type: 'line'
						}]
				};

				option && myChart.setOption(option);
				
			},
			zxdepartmenttop5(){
				var obj = require('../../../../assets/dark.json')
				echarts.registerTheme('dark', obj)
				var chartDom = document.getElementById('zxdepartmenttop5');
				var myChart = echarts.init(chartDom, 'dark');
				var option
				option = {
						backgroundColor: 'transparent',
						xAxis: {
								type: 'category',
								data: ['2016', '2017', '2018', '2019', '2020',],
								splitLine: {
									show: false
								}
						},
						yAxis: {
								type: 'value',
								name:'申请量（件）'
						},
						
						grid: {
								left: '3%',
								right: '4%',
								bottom: '4%',
								top: '24%',
								containLabel: true
						},
						series: [{
								data: [12090, 20032, 32100, 23221, 12111, 42211, 13370],
								type: 'line',
								symbol: 'triangle',
								symbolSize: 20,
								lineStyle: {
										color: '#5470C6',
										width: 4,
										type: 'dashed'
								},
								itemStyle: {
										borderWidth: 3,
										borderColor: '#EE6666',
										color: 'yellow'
								}
						}]
				};

				option && myChart.setOption(option);
			}
		},
		filters: {

		},
		watch:{
		}
	}
</script>
<style lang='less'>

.commonListAll{
	height: 100vh;
	#index_box{
		position: relative;
		width: 100%;
		height: 100%;
		background: url(img/indexbc.png);
		margin-top: 60px;
	}
	.index_header{
		width: 100%;
		height: 9.25%;
		color: #01d4f9;
	}
	.index_header>div{
		float: left;
		height: 100%;
		position: relative;
	}

	.h_left .time{
		margin-top: 0.8vh;
		font-size: 1.2vw;
		margin-left: 0.8vw;
	}
	.h_left .date{
		margin-top: -0.2vh;
		font-size: 0.5vw;
		margin-left: 0.8vw;
		color: #39d6fe;
	}

	.h_left{
		width: 8.3%;
	}

	.h_center{
		width: 83.4%;
		text-align: center;
		font-size: 1.9vw;
		font-weight: 600;
		letter-spacing: 0.15vw;
		box-sizing: border-box;
		background: url(img/tbbg.png);
		background-size: 100%;
	}

	.h_right{
		width: 8.3%;
	}

	.pagevalue{
		display: none;
	}

	.pagevalue_sel{
		width: 85%;
		height: 32%;
		border: 0.1vh solid #01D4F9;
		text-align: center;
		box-sizing: border-box;
		padding-top: 0.1vh;
		font-size: 1.05vw;
		position: absolute;
		bottom: 3.6vh;
		margin-left: 0.2vw;
	}

	.hiddenul{
		display: none;
	}
	/*ç‰ˆæƒæ‰€æœ‰*/
	/*äº‘ç èµ„æºæ·˜å®åº—é“º  å¤§æ•°æ®å¯è§†åŒ–å¤§å±æ¨¡æ¿ä¸“å®¶*/
	/*https://shop188702750.taobao.com/search.htm?spm=a1z10.1-c.0.0.1221421cqgmNaI&search=y*/

	.index_contont{
		width: 100%;
		height: 90.75%;
		box-sizing: border-box;
		padding-left: 2.5vw;
		padding-right: 2.5vw;
	}
	.index_contont>div{
		float: left;
		height: 100%;
	}
	.ct_one{
		width: 24.6%;
	}
	.ct_two{
		width: 50.8%;
		box-sizing: border-box;
		padding-left: 0.5vw;
		padding-right: 1vw;
	}
	.ct_three{
		width: 24.6%;
	}

	.totalbkind{
		width: 100%;
		height: 31.55%;
		background: url(img/short.png);
		background-size: 100% 100%;
		position: relative;
		>div{
			position: absolute;
			top: 0;
		}
		.bm_content{
			width: 100%;
			height: 100%;
			overflow: hidden;
			top: 4vh;
			font-size: 0.9vw;
			>table{
				width: 100%;
				tr>td:first-child{
					width: 80%;
				}
				tr{
					line-height: 3vh;
				}
			}
		}
	}

	// .ywltjfx{
	// 	height: 65%;
	// 	width: 100%;
	// 	margin-top: 3.45%;
	// 	background: url(img/long.png);
	// 	background-size: 100% 100%;
	// }

	.ywltjfx_ct{
		width: 100%;
		height: 45%;
		overflow-y: hidden;
	}

	#echartMap{
		width: 100%;
		height: 62%;
	}

	// .ywlbmfb{
	// 	width: 100%;
	// 	height: 35.4%;
	// 	background: url(img/dbbg.png) no-repeat;
	// 	background-size: 100% 100%;
	// 	position: relative;
	// }
	.totalbkind_h5{
		width: 8.6vw;
		color: #fff;
		text-align: center;
		font-size: 0.9vw;
		line-height: 3.65vh;
	}
	.title_p{
		padding-left: 0.5vw;
		border-left: 0.2vw solid #00beff;
		color: #00beff;
		margin-left: 1.2vw;
		font-size: 0.8vw;
		font-weight: 600;
		line-height: 0.8vw;
	}

	table{
		table-layout: fixed;
		word-break: break-all;
		word-wrap: break-word;
	}

	.ywltjfx_ct table{
		width: 97%;
		margin-top: 1.2vh;
	}

	.ywltjfx_ct table tr th {
		background: #183662;
		color: #00BEFF;
		padding-top: 0.9vh;
		padding-bottom: 0.9vh;
	}
	.ywltjfx_ct table tr th:nth-child(1),
	.ywltjfx_ct table tr td:nth-child(1){
		text-align: left;
		text-indent: 1.4vw;
	}
	.ywltjfx_ct table tr th:nth-child(2),
	.ywltjfx_ct table tr td:nth-child(2){
		text-align: left;
		padding-left: 1.4vw;
	}
	.ywltjfx_ct table tr td:nth-child(3),
	.ywltjfx_ct table tr td:nth-child(4){
		text-align: center;
	}

	.ywltjfx_ct table tr:nth-child(2) td{
		color: #e8a730;
		padding-top: 0.9vh;
		padding-bottom: 0.9vh;
	}
	.ywltjfx_ct table tr:nth-child(3) td{
		color: #e7c72e;
		padding-top: 0.9vh;
		padding-bottom: 0.9vh;
	}
	.ywltjfx_ct table tr:nth-child(4) td{
		color: #a2b64f;
		padding-top: 0.9vh;
		padding-bottom: 0.9vh;
	}
	.ywltjfx_ct table tr:nth-child(5) td,
	.ywltjfx_ct table tr:nth-child(6) td{
		color: #9cccdf;
		padding-top: 0.9vh;
		padding-bottom: 0.9vh;
	}
	.ywltjfx_ct table tr td{
		border-bottom: 0.05vh solid rgba(57,117,174,0.15);
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
	}

	.tablecommon table{
		width: 97%;
		padding-top: 3.5vh;
	}

	.tablecommon table th{
		height: 2vw;
		background: rgba(57,117,174,0.3);
		color: rgba(0, 186, 255, 1);
	}

	.tablecommon table th:nth-child(2){
		text-align: left;
		text-indent: 0.5vw;
	}
	.tablecommon table td{
		height: 2vw;
		border-bottom: rgba(57, 117, 174, 0.15) 0.1vw solid;
	}
	.tablecommon table td:nth-child(2){
		text-indent: 0.5vw;
	}
	.tablecommon table td:nth-child(1),
	.tablecommon table td:nth-child(3){
		text-align: center;
	}
	table tr td{
		color: #9cccdf;
	}
	table tr:nth-child(1) td{
		color: #e8a730;
	}
	table tr:nth-child(2) td{
		color: #e7c72e;
	}
	table tr:nth-child(3) td{
		color: #a2b64f;
	}


	
	

}
</style>
