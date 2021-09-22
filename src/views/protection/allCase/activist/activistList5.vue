<template>
  <div class="jcmanMap">
		<div v-show="isshow===1">
			<div class="btns">
				<div :class="{'active':active===1}" @click="checkFn(1)">诉讼信息</div>
				<div :class="{'active':active===2}" @click="checkFn(2)">专利无效信息</div>
			</div>
			<div class="ts">
				<div class="red"> 红色：急需处理（可点击查看）</div>
				<div class="yellow"> 橙色： 需要处理（可点击查看）</div>
			</div>
			<div id="container"></div> 
		</div>
		<div class="images" v-show="isshow===2" @click="isshow=1"><img src="~assets/img/liebiao.png" alt=""></div>
  </div>
</template>
<script>
	import AMapLoader from '@amap/amap-jsapi-loader';
	import jiaxing from '../../../../assets/geojson.json'
	import lanse from '../../../../assets/lanse.json'
	import hongse from '../../../../assets/hongse.json'
	import huangse from '../../../../assets/huangse.json'
	import lanse2 from '../../../../assets/lanse2.json'
	import hongse2 from '../../../../assets/hongse2.json'
	import huangse2 from '../../../../assets/huangse2.json'
	import citys from '../../../../assets/citys'
	import $ from 'jquery'
  export default {
    name: 'work-order-list',
    components: {
    },
    data() {
      return {
				active: 1,
				map: null,
				AMap: null,
				loca: null,
				geo: null,
				scatter: null,
				geoLevelF: null,
				breathRed: null,
				geoLevelE: null,
				breathYellow: null,
				dat: null,
				isshow: 1,
      }
    },
		beforeCreate() {
			console.log('创建前')
        AMapLoader.load({
            "key": "efe78a0f982a542f3361e9719f2fc147",              // 申请好的Web端开发者Key，首次调用 load 时必填
						"version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
						"Loca":{                // 是否加载 Loca， 缺省不加载
								"version": '2.0.0'  // Loca 版本，缺省 1.3.2
						},
        }).then( AMap => {
            this.$nextTick(() => {
							this.AMap = AMap;
							this.initMap(AMap)
						});
        }).catch(e => {
        	console.error(e);
        })
    },
    mounted() {
			
    },
    methods: {
			initMap(AMap) {
				var that = this
				var position = [120.807818,30.576271]; //简写
				this.map = new AMap.Map("container", {
						mapStyle: 'amap://styles/35dfa90d526a7df0f0638b738dcffaa0',
						pitch: 30,
						zoom: 10.6,
						viewMode: '3D',
						showLabel: true,
						center:position,
				});
				function addPolygon(data) {
					let polygon = new AMap.Polygon({
						path: data,
						fillColor: '#ccebc5',
						// strokeOpacity: 1,
						fillOpacity: 0.3,
						strokeColor: '#2b8cbe',
						strokeWeight: 1,
						strokeStyle: 'dashed',
						strokeDasharray: [5, 5],
					});
					polygon.on('mouseover', () => {
						polygon.setOptions({
							fillOpacity: 0.7,
							fillColor: '#7bccc4'
						})
					})
					polygon.on('mouseout', () => {
						polygon.setOptions({
							fillOpacity: 0.3,
							fillColor: '#ccebc5'
						})
					})
					polygon.on('click', () => {
						that.isshow = 2
					})
					that.map.add(polygon);
				}
				jiaxing.features.forEach(element => {
					addPolygon(element.geometry.coordinates)
				});



				
				this.loca = new Loca.Container({
						map:this.map,
				});
				// 蓝色普通点
				this.geo = new Loca.GeoJSONSource({
						data: lanse,
						// url: lanse,
				});
				this.scatter = new Loca.ScatterLayer({
						zIndex: 111,
						opacity: 1,
						visible: true,
						zooms: [2, 22],
				});
				// 红色呼吸点
				this.geoLevelF = new Loca.GeoJSONSource({
						data:hongse,
				});
				this.breathRed = new Loca.ScatterLayer({
						loca:this.loca,
						zIndex: 113,
						opacity: 1,
						visible: true,
						zooms: [2, 22],
				});
				// 黄色呼吸点
				this.geoLevelE = new Loca.GeoJSONSource({
						data:huangse,
				});
				this.breathYellow = new Loca.ScatterLayer({
						loca:this.loca,
						zIndex: 112,
						opacity: 1,
						visible: true,
						zooms: [2, 22],
				});
				this.dat = new Loca.Dat();
				this.biaojiFn(3)
			},
			biaojiFn(k){
				if(k===1){
					// 蓝色普通点
					this.geo = new Loca.GeoJSONSource({
							data: lanse,
							// url: lanse,
					});
					// 红色呼吸点
					this.geoLevelF = new Loca.GeoJSONSource({
							data:hongse,
					});
					// 黄色呼吸点
					this.geoLevelE = new Loca.GeoJSONSource({
							data:huangse,
					});
				}else if(k===2){
					// 蓝色普通点
					this.geo = new Loca.GeoJSONSource({
							data: lanse2,
							// url: lanse,
					});
					// 红色呼吸点
					this.geoLevelF = new Loca.GeoJSONSource({
							data:hongse2,
					});
					// 黄色呼吸点
					this.geoLevelE = new Loca.GeoJSONSource({
							data:huangse2,
					});
				}
				
				
				this.scatter.setSource(this.geo);
				this.scatter.setStyle({
						color: 'rgba(43,156,75,1)',
						unit: 'meter',
						size: [1600, 1600],
						borderWidth: 0,
				});
				// this.loca.add(this.scatter);

				
				
				this.breathRed.setSource(this.geoLevelF);
				this.breathRed.setStyle({
						unit: 'meter',
						size: [6600, 6600],
						borderWidth: 0,
						zIndex: 112,
						texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
						duration: 500,
						animate: true,
				});

				this.breathYellow.setSource(this.geoLevelE);
				this.breathYellow.setStyle({
						unit: 'meter',
						size: [6600, 6600],
						borderWidth: 0,
						zIndex: 112,
						texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
						duration: 1000,
						animate: true,
				});

				// 启动渲染动画
				this.loca.animate.start();
				// this.dat.addLayer(this.scatter, ' 贴地');
				// this.dat.addLayer(this.breathRed, '红色');
				// this.dat.addLayer(this.breathYellow, '黄色');
			},
			checkFn(k){
				this.active = k;
				this.biaojiFn(k)
			},
    },
		beforeDestroy(){
			// this.map.destroy()
			this.map.destroy()
			this.loca.destroy()
			console.log("销毁前")
		},
		destroyed(){
			console.log("销毁后")
		},
    filters: {

    },
    watch:{

	  }
  }
	
</script>
<style lang='less'>
	.dg.ac{
		display: none;
	}
  .jcmanMap{
		position: relative;
		#container {width:100%; height: 850px; }  
		.btns{
			position: absolute;
			top: 50px;
			left: 50px;
			display: flex;
			width: 200px;
			color: #fff;
			z-index: 10;
			background: #999;
			border-radius: 4px;
			overflow: hidden;
			font-size: 14px;
			>div{
				width: 100px;
				text-align: center;
				height: 40px;
				line-height: 40px;
				cursor: pointer;
			}
			>div:first-child{
				border-right: 1px solid #20a0ff;
			}
			>div:hover{
				background: #20a0ff;
				color: #fff;
			}
			>.active{
				background: #20a0ff;
				color: #fff;
			}
		}
		.images{
			width: 100%;
			img{width:100%;display: block;}
		}
		.ts{
			position: absolute;
			top: 90px;
			left: 50px;
			z-index: 3;
			font-size: 14px;
			>div{
				line-height: 20px;
				background: #999;
				padding: 4px 10px;
				margin-top: 10px;
			}
			.red{
				color: red;
			}
			.yellow{
				color: #F9AC44;
			}
		}
  }
</style>
