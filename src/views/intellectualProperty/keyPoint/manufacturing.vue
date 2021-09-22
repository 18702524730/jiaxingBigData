<template>
  <div class="manMap">
		<div>
			<div id="container"></div> 
			<div class="tanchuang"><img src="~assets/img/tanchuang.png" alt=""></div>
			<div class="nav-warp">
				<div  class="item"  @click="tolink(1)">
					<div  class="first-icon"></div>
					<span >企业需求对接</span>
					<div  class="arrow"></div>
				</div> 
				<div  class="item" @click="tolink(2)">
					<div  class="second-icon"></div> 
					<span >机构展业对接</span> 
					<div  class="arrow"></div>
				</div> 
				<div  class="item" @click="tolink(3)">
					<div  class="third-icon"></div> 
					<span >企业创新评价</span> 
					<div  class="arrow"></div>
				</div> 
				<div  class="item" @click="tolink(4)">
					<div  class="fourth-icon"></div> 
					<span >专利价值评估</span> 
					<div  class="arrow"></div>
				</div>
			</div>
		</div>
  </div>
</template>
<script>
	import AMapLoader from '@amap/amap-jsapi-loader';
	import jiaxing from '../../../assets/geojson.json'
	import citys from '../../../assets/citys'
	import $ from 'jquery'
  export default {
    name: 'work-order-list',
    components: {
    },
    data() {
      return {
      }
    },
    mounted() {
			this.mapFn()

			
    },
    methods: {
			parameters(page){
				this.$http.get('https://restapi.amap.com/v3/place/text?parameters&key=afb9b7e9e98ef9ed4c7c8881176dba46&keywords=美食&types=050000&city=嘉兴&citylimit=true&offset=25&page='+page)
				.then( (res) => {
						this.concatdata= res.data.pois
				})
			},
			mapFn(){
				var position = [121.19761,30.507097]; //简写
				AMapLoader.load({
						"key": "efe78a0f982a542f3361e9719f2fc147",              // 申请好的Web端开发者Key，首次调用 load 时必填
						"version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
						"plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
						"Loca":{                // 是否加载 Loca， 缺省不加载
								"version": '2.0.0'  // Loca 版本，缺省 1.3.2
						},
				}).then((AMap)=>{
					var map = new AMap.Map('container', {
							mapStyle: 'amap://styles/35dfa90d526a7df0f0638b738dcffaa0',
							pitch: 30,
							zoom: 10,
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
						map.add(polygon);
					}
					jiaxing.features.forEach(element => {
						addPolygon(element.geometry.coordinates)
					});

					var style = [{
							url: 'https://webapi.amap.com/images/mass/mass0.png',
							anchor: new AMap.Pixel(6, 6),
							size: new AMap.Size(11, 11),
							zIndex: 3,
					}, {
							url: 'https://webapi.amap.com/images/mass/mass1.png',
							anchor: new AMap.Pixel(4, 4),
							size: new AMap.Size(7, 7),
							zIndex: 2,
					}, {
							url: 'https://webapi.amap.com/images/mass/mass2.png',
							anchor: new AMap.Pixel(3, 3),
							size: new AMap.Size(5, 5),
							zIndex: 1,
					}
					];
					// console.log(citys.ccc.pois)
					// var list = []
					// citys.ccc.pois.forEach(element => {
					// 	list.push({
					// 		'lnglat':[element.location.split(",")[0],element.location.split(",")[1]],
					// 		'name':element.adname,
					// 		'style':2
					// 	})
					// });
					// console.log(list)
					var mass = new AMap.MassMarks(citys.ddd, {
							opacity: 0.8,
							zIndex: 2,
							cursor: 'pointer',
							style: style
					});
					console.log(2)
					var marker = new AMap.Marker({content: ' ', map: map});
					mass.setMap(map);
				}).catch(e => {
						console.log(e);
				})
			},
			tolink(k){
				if(k===1) this.$router.push({path: 'manufacturing1'})
				else if(k===2) this.$router.push({path: 'manufacturing2'})
				else if(k===3) this.$router.push({path: 'manufacturing3'})
				else if(k===4) this.$router.push({path: 'manufacturing4'})
				else if(k===5) this.$router.push({path: 'manufacturing5'})
			}
					
    },
    filters: {

    },
    watch:{

	  }
  }
	
</script>
<style lang='less'>
  .manMap{
		position: relative;
		#container {width:100%; height: 850px; }  
		.tanchuang{
			position: absolute;
			top: 45%;
			width:40%;
			min-width:600px;
			transform: translateY(-50%);
			-webkit-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			right: 30px;
			>img{
				width: 100%;
			}
		}
		.nav-warp{
			position: absolute;
			bottom: 30px;
			left: 50%;
			-webkit-transform: translateX(-50%);
			transform: translateX(-50%);
			width: 100%;
			display: flex;
			justify-content: center;
			.item{
				width: 300px;
				height: 65px;
				line-height: 65px;
				text-align: center;
				color: #fff;
				background-color: rgba(17,92,205,.38);
				cursor: pointer;
				-webkit-box-align: center;
				-ms-flex-align: center;
				align-items: center;
				display: flex;
				justify-content: center;
				.first-icon{
					width: 37px;
					height: 43px;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAArCAYAAAD/lEFzAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJaADAAQAAAABAAAAKwAAAAAv+L9uAAAETUlEQVRYCdWYaYhNYRjH585I9vUDsg2llEzCpMQgkj1ly2TPlkm+iDJCQ5ayf0XDZOcT2SVEowwihJBh7JGiLI2u33/Mnc4599xz3vfcW/LWr/O+z/s8/+e5575neU9WVoZaPB5vBzugYbqS2ekKUEQDWInOfagPDxgPS1c3cjzJp0AlHIVcCXEcAS+gDFpHFrcNJFkfuAa3YaA3Hltj2AIfYLp3PqNjEmjd7IW3MAdiQQmY7w134AJ0DfK1nkNQ66YYPsF6aGIqgm8OLAXFLoN6prEp/RCZDFo3xyA3pWPIhGLhHNyFviHu/tMEBq4b/6hwK7qF8B62Q+PwCDxw1LophTegdZP2bcObGM1WUAqvYJR3vm7MpNbNCtB/vwGa1k0adPAfDla3APyHwDM4Am1caTBMAt1bjkOua9JwQNwg+AhzIfCqdEriq5Ohi6cmtmaOwQBQK3A6R+mjkQflteTZaBDTEx5BgdbQaiixFGhbE+wThD0GOlv65VvB5vaxCv+1iUUc99EPMn1h8iACe6Cl0zEWi8VhN7bu0AIe4zPR6RPQr6kjUVSAX/IUSX9gVdJvoFNe6PXC5xPMwT4Z1uBzFjp7/fzGoUUh1BV0AbheSUj4DZYgOhqWM39evt4k+FzH1gsuwnN82nt9vOPQogjQA3UC3EdwiFeApBXYesN5uImPCnQ9SvCphs3Ml8EYCGwmRUmgBBbDPhLuguYyJhoJf9cmVXGDQQ/hfol5x/GXo5+ya1pUFklPo9IDJPyQpOO9qvhUwkjs60BvBoO8PiZj46IkRsKvUER3Cmwi6TFw34n/+h3hMBV0hq2bVVEJdQq7Rl83xyegtTY7Mec4VtPXVWrdIhWlLBT2E4rpDoUiCtsmeyaa6yqJIkhh9yhIi7qa40nGl6LoOGMinymnCIX8Zqz7UI7THrWfkaKiJk8V918XZfx+lOrX29hNFvplBC+ziM+wdsptxH18T2B752N3mUL/Pgq5QsQ00I3yMHRyKVgM0DoFt8JCQouSAEIHOHSDh6Dn2jow24kQYNuMipIohX2HErq6k+tsPaWwWZBqvT3AZydYNxX1EhYgbvTaSmGvYQYxY2E+3CI26XsCPlVwinnrlk1gKVHn4AniMyHVL3eJE1cB/TFugv3QxeUQbeDe1lFMPtyAClAy44a/tkkLweRqTtIlrhPonf8LNPJzKGSiCg5BxySHDBrQbwYb4TOshuSCEvmYbAh62dduWcfUzokgiyN69WAR6JuCdkTtjMNx7gg6Y9rzFxoHBjiiMwa0A9KbqdWG1SVLcH/QWtPuN981aTggrhdcAr1K65U5/YaQdr66L70BbSCMTjl+7Wv933HUrScjrzeuX4RoE9AHCS3OYmjgcqgdYJffWpCfngDuy90vKF0bSXLhOFRC3bacfjbMhbdQBh3SzWUdT9IC0CfDq6AvOPqOfgW0B/x3jQJ0duaBtuXj0q3kD4h6Y1zo9EDaAAAAAElFTkSuQmCC) no-repeat;
				}
				.second-icon{
					width: 37px;
					height: 43px;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAArCAYAAAD/lEFzAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJaADAAQAAAABAAAAKwAAAAAv+L9uAAAEb0lEQVRYCb2YaYhNYRjH7zWWsRdlyXb54BtpkIxxI5QtSZYoZmJQyif7rsYWEUpZYvDB/kXJEhFZI2MPIWOZwdiyFPkwfv9rzu3cM/ec8565Z7z1u+/yPM//fe573rNGIiGVysrKtrAFGmYqWSdTAZLIhqXoPID68JD+4Ex1axzP5BOgFI5ATELUQ+El7IeWNRYPGshkPeEy3Ib+znjGGsNG+ACTnfZQ+0ygfbMXymEqRL0mwJ4DJXAWunj5BrYhqH2zBD7BGmhiKoJvFswFxc6Huqaxrn6IjAftm6MQc3X0MSgWzsBd6OXjnt5MoOe+SR/lP4ruJHgPm6GxfwQeOGrfFEMZaN9kfNlwToxmCyiG1zDcaU/2MWrfLAYd+7XQNGmspQZzDITncBhap0zDwDjQteUYxFKMtdxhPi2GTp4KKExMRyMPVOJhzf9PLvHbzlQT727wGOJRflYQmBWNRpebCvj5oXkSnxIYD3lov/eLkZ045VDPumZUmgQF9LmC/0+4wGRxEvtoEJ/Iw0rKwD+4C4lor+ip4Rz1QPpfTFRCP92dk5LIMiUFunA2c9rT9UNLigkXwBPBRMOgzJqQxObSvgGnsPveomqUFMJ9rQlt9R7ao6roRCJ3bLYI/dn0H8EJ4nVIXUvgpBDUKlylHmlXZdIKeFLFK7vN1p5BW7bjxDewjac0AyWFkFZiH+gf+x6GlJnokLDOrnz4BnMgbTFOioTGorALhsL9tGpmg9tx0y1sg5u70SWBhCYisAmG8G/v0XfT8xwnTmdib9B164+bs29SCGm518IghHTYVJTVTmyjE73qP3oiPY//DsuE7zTaBZDL+A9rPF3tmRRChQSthAEIPbUJaMOOsPWdTb3VaO8lkkJHvqvB6JbjmhRCsxBZCFrqF9TJQv87nUPJAUeD2FYMVWiYdh+qvTCcuGfUvsU1KSK3QQyhUl8VFwcS6orpOExB56aLW7Vhr7NPG3FMtQjzAR3C07CIhE6Zh0UiXivVGaFL/Fs0ozrzgpRGODeHImKLgwTK1zUpxN6SUBwfK7GNljjjU2l3sfrUH/DfavVpv6StM7BGxevw6Qr8FlW9Ac8ikXmagbof1W74ZeM37dCK60pZM5CY3mry6CdWjFoPb1cZX2X5hF1rpV7BTCZ2vZeRQDk+OpSF4HV9whxSIaF9oBXJB9e9gE3vhCo6rKEXdNdDUVKYTm+4DrcgN2lwNLC1gb6O4Yy66HWEA/AVdOamFgb1Wv0GDkKHVGu4PfSbwTr4DCugekLWlBgbwkrQ27Jqd2crKECNXl3QGa1vCruhrXE4zh1AK6Z3/knGgR6O6IwEvXTqm1V3D1dvE8G5oL12DfQ8FLgQ1wPOwyPQI3XmBSG9TReAzlKdrUZLjl+7Kv931Lr0ZGWejUMB0SawBrQ59XUv2+GS6DIuvyKQ3yqo9a84ut3E4BiUgp7frWTq0C+EctgP7S3bf6uZNA76ZKjbkL7g6Dv6Rcj5b0mkm4gEtDrT4QXoNSyj8hc6AVIlHPVeTgAAAABJRU5ErkJggg==) no-repeat;
				}
				.third-icon{
					width: 42px;
					height: 42px;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAAENUlEQVRYCc2ZT0gUURzHd6UCQ70URUmJWJ66Jf5BJBGK8FAmhKcuEhFUBB282YCePAoGXfUSdYmCPATlwS4dpINCqElotELkQe0U1Pb5Lm+m2d2ZeW82l3zw4b15v+/vz8w4b9+M2UyFLZ/Pt+B6Fc7DyRAMM7kQC4xfZLPZNRnStgNpHCjqGPq7cA2OwEuYha/gF5VlfAJUdCP0wDy+W/TPYYpiv9HvXSN4HXhKApPQASrEqUlrfOSrGB7UOTnbRAQahE2YgSab3mZXDBNLMQdt+lg7zjprD9ahLVZYoUExTWyP3vluFNLhUAvP4B3o764qTbFNDuWqjUpSUzqJUGczDb+gb8//oEMJTew+k2va5A4pIoaIPNCVOxRhrsqUcpmcXmICRHog9DdXtdsaV4BymtzRDw5GLSV6sip+IPC9IOKKsM0rN6iG8iWISQ9mbEGS7Pi/EUkam001QPGtZkKXVwtoxescvt2wZui2FRJnVw2gWgp/ZoX1h4NxHBp4qu7HOdrmifEazVOjGyLWJZtPnJ1Yk9i2ifGwoGFiEdrjHGzz+HbCZzho0LjT5hdnx1c/pYsFO4MWyEG61TwUHd9ZuOVPaaw5/zhtj69+xVRTiwYPCNDK5bztGkgB0J6Cs6DtlnY4Z4jxkz6DXWvoJ5gCbbdW4Qv2PL1TI8ZjhCvabinBqyQvxKex34FWUFHaC34HJRbDfnGMMxrjM8zwOlwG+Rxlbo1e+hV4hG6DPq7NY+jX2c5Bb5zKn0czAdvQB4f9eddePsZ3h37C5oemF+ZU4DLoylgbunFYguNWcYlAPsZXK4a1oW2FZRW4C+Urd0wItKPwEbRjdmrSGp9RJwdE6PXLtquBLnm9q6N06EdgFfSgJDZpjHYkUVhixKcedpTM+RaHY+CnK/k2PBc1lkbaKFvSHD6FW1yDKAfOtysUdJ3xZug4biiNtGmbasr5BTam9UZ/DpYc/KSRNm1TTYUCtZD2pPVGX1Qgt6QGbhh04n6rtEDVtKC/wYp+6vDbgGZVQT8AWn70/is0HjC2ZsZJC7JkRQ198FNXMDChzUJHkSrhAG0D/ICL8B4+QL/vorGZk00aaRt8u61H+3ezIDETY6AtjlND2wW/QSvAEOi3uahpztikkbarSJBwgFYv+GOBhINUG1b0ukI3wfrpRBqjDa5wkDhigLYJgg1rIGHSg5lg4j8NVINqKUvP5D+/NJUFTTlBDW0Q/dKkWBj372unf7IU6cH+fHE3V1FPn76VPAHtjKvalMPkUs6y1SAyOcJ98/EoskBN6mzAg3VoixVWaFBME9ujd7tyUblw1oOjJ0uPf8Uv9n5sxTCxFDP6O4wvdu0JVPoJuJ0557OWFuST+hOwcxKdDAn0OeIeaCPgf0TX21f4IzqHwVd/bZm0K7kCW5D6I3qqAkkQNIrVq2fV/w3xB50pHiFxIlDzAAAAAElFTkSuQmCC) no-repeat;
				}
				.fourth-icon{
					width: 37px;
					height: 43px;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAArCAYAAAD/lEFzAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJaADAAQAAAABAAAAKwAAAAAv+L9uAAADyElEQVRYCb2YS0hUURjHHbXQ1Ba1CClFql0YYUkgJWQRFVKLXiBFYUbRqkBaVGRRVIsC25VgVohRuamdRkIRlVBGmBHRQzMyexEJbaff384M87hz55x5eODneXz/7+G9Z87MvTk5GWrBYLAULkJhuiFz0w1AEQVwjDivYDoMMV+TbtyU/Um+HUbgFlQoEP06GIbrMDvl4K6OJFsKj2AAVsb6s1YEF+Ab7Iy1Z3ROAu2bqzAGjRDwS4C9Cl7APZjvp3W2EVD75ij8hDNQbBsEbR40g3wPQ76tb0IdQbaB9s1tqEgoTGKQL/TAS1iWRO5txtF333h7JV8lbgOMQysUJfdAgVD7pgO+gPZN2sdGbGJizoIOGIUNsfbwHKP2zRHQvT8LJWFjlgbkWAXv4SbMiUrDwlbQ2dINFVHGLE/Ip4uhD893aJpMx2AFqNVmOb9vePJXwhvVEeBPC+q8QCBw3NdrCozUohqmhTZx0CUnziVwEnQwThg01lo6e3GyjlBR1jWRtA7xIJTCftNHjgeNBlNqzel0Nck6SbWD290Xk7KfeT+a1fSd9F6aGBfvqfWVIoluyxXwTUax96WR1vgwdGvWRRG2GXo9rlBcRqPpNT5x9mQLLkVtIlh7soARdmk3Rsythy5FLSDqkHXk/9qFDvqw1KWosFO2By5FvaOYRQ4FSSsf5+ZS1F2i73HIIK18nJvLOXWe6JMHY7JPIEdBHdq1UOlcEQ7WV4pCJtA3gg5GJfVsxtaFsdH4eOr8Fq2LUhBzhUIHYxsFLIdig8ZtyHTAPodDzPPonZtTUYpuCtNtGYPLptf4khnLpjOtAFrBubnsqXBwc1v0k0d4Nq7SZgyP6Q+idyoupaI8q4hZpJA/FLSeZX1Jf2R+J0aScOp8+xJG8jBQyCjL9dBOYdaPVVktSnVS2ABdOfzQ3KapqE+wj//E+qnXJnCkhsL+wnDkmt84F3EHgh54S2G7wPf9gF+wDNhKomJQTDU8hWdQE2XM8oR85dAFv2FGXDoWG+Az3ICyOEEGF4g/E87BL2iB+IJC+TAWwgnQ07L6xOKQk0NPvHw4AOOgT6YePOwa4jLQFdMzf4Odl7+KOPWgh069s1rsr/ax4lwD2mtPoNpHmtCE3xLog9egQzX9RiA9Te8GvY25BlaXHN1co/9Kr6MnpS9p3/+AoPpVoBcS2px6u6cv3rjGunSnQLrTEP1xj/PIwAJJKqAbRmBLKCTjXGiCMdAb4nkh25T1JK0FvTJ8CHqDo/foD6BqyorwSkQBujp74QOk9KwXGfcfGMAB4Jyi0vEAAAAASUVORK5CYII=) no-repeat;
				}
				>span{
					margin: 0 15px 0 10px;
    			font-size: 20px;
				}
				.arrow{
					width: 31px;
					height: 24px;
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAYCAYAAAACqyaBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAGAAAAADCpwnmAAABTElEQVRIDb2WS0rEQBCGZwbFE5iMrzGHcCEuHL2YK5eCqDiID2Y8h+u5gWh8Br1I/H5IQW+Egk53wU8VSXd9XZ2kU4NBD9a2bYle0BNa7yGlPwXAKTJ7Jij8syNHAhuiR6PjtQtlZFr/dGAjNEdmrwQb/gyRI4FpB+6Njq/RZmRa/3RgWsAtMnsn2PJniBwJTAu4MTr+A21HpvVPB6YFzJDZF8GOP0MPIwFeGR3/jXZ7SOtPAfAiWEBDXGm2tmYVv4dWdCGhnZL7sMv/gz8WfElw0F3M6eoRtNQV/1fQUJWvcXc/wyJOYNi2/xIfofRGgWfIrCGo0lMhADo3Kj7fpwbsMgDrkJkkrxiI3qXrAPxJnP547cDhuZ7nx9KB74KK34jT/1KBqJl4CMB5mgmAesaLAKw2apz85RIA0DQAq4HM2r8VAFWtWmd35/oHZT2XeUyoYmAAAAAASUVORK5CYII=) no-repeat;
				}
			}
			.item:first-child{
				border-radius: 60px 0 0 60px;
				
			}
			.item:last-child{
				border-radius: 0 60px 60px 0;
			}
			.item:hover{
				background-color: #002fab;
    		color: #24eaff;
				.first-icon{
					background: url(data:image/png;base64,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) no-repeat;
 				}
				.second-icon{
					background: url(data:image/png;base64,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) no-repeat;
				}
				.third-icon{
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKqADAAQAAAABAAAAKgAAAADUGqULAAAHW0lEQVRYCcVZa2wUVRQ+587sbtllt9vdVmwRxfI0vkD8IWp8pRjEByJqYjQGMSr6QyXEaEzUqNEYjQ+MEpEQjY+Y+EJAwQSMmij84aUxUcSWR6UrtrvbUrvd3Zm513NmmTJt9zWL1JOc3HPPPY9vzty5c2YX4QRpjlK+TDdMNhBaEArMIRVAF7NPQVewCQ7sRDROJBXF9k5zUqr+qAULlIJFgDCPxl6K0i0BkhIhCRJQIMQEQJz0TZQkSuMWRFgX0WDTzhj2ec3qCeiMbtViWfAMVeoWArUrL2BbWocfMgWgJXMHEaINJlzqB7hYU3ABXdwnGsKTe5uwq6TTiIWqgE5Nqgjk5GMAuCyPakPSJz4YQBgYEauqaUhBKG7IO3wSb0DEtyAAL/wRx6OVnCsCnX5EnS9NtdFC2NVTh2v7FfRUClrNehihsTGr7hYKZms63vD7BPypnF9ZoNM61U0S5OqMJl5JBOC7coFqXWvOwZVBSy4XIO7bNwk/LxWnJNAph6wVoNTy3jrt8aQO+0oF+C/0cROmRXPW87S1Xm0/XXu5WMyiQKcdMKmS8Prfddqyfh89xWNAYQPip2TNtwTgg/sm66MqOwro9A51vgXm1t5x+oqk/+RWcuT1x/NU2Yz5soZ62++tw/csHXXHiZ9uS+U38p4ca5CMgnNmfOJVUxkb7JPmODQYBhTS5qMWil2J8eI7l403UYNZwFwjJULiW1PgbkVY3CGGgM44pFqUlPcng/pat0EN8lLyYa6Z0uP0tWipZYzJCTIE1Bw0ns4LXE8PT+3npAbnUuBmmwuyk8fTyBjymthgESbH0X6YWttVPebzhw7H/Iuzem1vHDugBq/RuPVY8Daw4GEnkdexzoRQSyr3KfgDZ3RMwb5CRQcHF1iodp4gyLOpZZpEDclmm1nW4GyvAB17xsL9BBA21tlAUeGNhtC2OUY1jksJ6HvE1jF+j+IsrTGW7WYI3K4IG08E95NKqXnpsP6j56ACJtClXkh8O/m2En/lisFyq71WsJngWqtKTEf8P1Bn28YY9fSe3GSlYTrjt3vK0gEYFMBiatEm2bcYYSKNfTTvJH0nyc8Rm0MBWGYdwlWku4hk3gr1NB62fZTt9xltkyNDPiMExoQS+hijLhT1mNT0jrAZPeWAgtSSKghALR/8QnJutKFLI2EHzZgLJKipU3AOTV4g7iwH8pgHUCP+t04YqctSzVJBylkoO0pYRdX4mHg5gQ6WtS22yD7sCxSDY1VBtC1TjFEoCS2KPx+qJQlrKNk3VJk3aWys1s22Lfh8QyDXVOtHD1OKMQqwqJ6SoHohC94hoF9R8lVU2VMqurIN27IP+3og+vwCxihQiAQaMubBt2Aq4UOKsZn4iYq+bMO27OORNMOKMUZhGVYCJXoHygkREpS88rZhG7atgRgbEkYhhOwS0sNecyeTMIVufbtbVVRmG7atgRibZIwNeuSAtGRDsN+Keo6D9iHf4fJDAj7fZq73ceqgGb8QPBFjkpbVwBjFzguRfuSALfXJ3CWeohSMW+kBKQBFuIwAvk/qhTazzDqmgo1noIwJpdrCGHWOIwz5hR/gHhLdr0BeKk0BOhMNiJDBaQTwWQKlE6A36RZvt50EzCX9faS7k+araYzQcR+kV0SmdNDhK/5BOZe+Tu2jjN81oMLWZmGq2XVZMzTctMzMpFuJUEcWK4g/omNnyRBIdmPArOM1tmFb9qmSGIvIywtU0NjMLkP76Mxve9fk/bp2eGaousOYK8YHvoRNVC16C5chpLe8gAVk1zPsYsq4TPxt4B7dkObBKyL3spl961nwG76nlDT2hPty6/rrA5W7fOcWs3Ml4guxYGMlM2edMDT6c9Z1fjM/y9HZt54ne68OdVGn8nZ9Z36Js/h/jdHO/F1U/dV7r27qcjAMAWUFvQVe1PPWrAn7Bi53DMZ6pNxXaHl5npYzX3LnHgb0jwXxo4hq0bje/EPRP7PT3IZjIXNOyv0gfYEuZizunMOA8sL+ttjPSskHoonsM+Fkjn+IHRPiXJyTc++f3zDql71RQBnVwWsa19EeWRlvz7wR/XPgpFc22pWdyrmoS1pp5y5SmqHjqcganLGxZxECrhps8K08clb4+2I2J6pr+rX/8lDaeIia4wcOXk8FKkFlgbLPmetT5ylU60y/2NM3Zdy7/bEqjq4SydzqcCrXWN8+uITOylnUIS3avzD2s3t9pFwRKDtM3ZSMGIZ6hN5h9xp1+pepmeM/yo7XB0YGq2Ze948Ziv32z22+rHUt2a/x+fClkQ9OsThVAXUcZ6zvbsmBeEpZ6mbLh7uNiL69/9TAtkxjoNexKTYGe3LR8F+5i31HjbmaAbNRw08DIJ/eu/D4OVnMz63zBNRxbP04VS81c75CXEgPXRv9S9IHmuiWOqTo09v+UKQjJkYcp+6nkX65jlKirajgC2HpX3fcGju5f984QN3jnB3Klz7QPZm+upoJcDMobKEegESVIHAJoQe6ohMjB7lVc/t5lf8FBt/kAatc8igAAAAASUVORK5CYII=) no-repeat;
				}
				.fourth-icon{
					background: url(data:image/png;base64,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) no-repeat;
 				}
				.arrow{
					background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAYCAYAAAACqyaBAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAH6ADAAQAAAABAAAAGAAAAADCpwnmAAACLklEQVRIDb2Wz08TQRTHv6+l2pp6okhMRD3sIg3ECxyIB2zBv0JNjBFD9I8wHjyaGJWEoCYQ/hEqCf+AkdS2oNFYI90tHIC0Htjne1MgG+0WDtNOMpOdH/v9vHkzb98SLJSxfR7808CqSFU5ibubF8k7i2zsLItOW9NsYIQZWal30MTqzT2+dNo7Om8FXslgTbRWDJAx2miioN4w/Q6NFTgR8f0BPCRgWVnqBTmGQtbjyx3YkPX2CjPTDR/vA8YjVSVCSXY3XRqgX+0oVuEKUANcH4tgPDZAQiVGyJczVP3XACtuD4vqEcgdmJNdL5pxhhsEKDh1vhJep8/W4SqqBpQzeCIGLGhfikOH+DhW56FWt0etU+O3UlmrW+Ov2V2+1iN0C+P6/DpkwLeRXb6uMzTOnDjYwURwiL7W0u60THghIThl1Anf4wnkSSxal4Fb3UFGq8p9+BKTpqs7jsbLvXSYz8PHpMRiV40Qlz8Luf2HuD3XwTB7U47HL9tdOHuECCXX41chcO9CTeL6TQi8NbrDV8M2Wv+2q7hJMB7mA+Cp9gWyxXHkNvvpp/aPi/VLpuBhHwsMzBmIJBaJqHyl///EYhV+lNHeSUabPQKX40C+lGmfUq0llufMseE6PhyD9SOSAHJRuVyNs3LmxtUelsTVD4wooXguhemNNP02HohorMAljm/LjguGQdhIpjDzOU3bEcyTYStnfiGJovw0FkW1mkri3qc01U4IHR7+AlA54VldcEpmAAAAAElFTkSuQmCC) no-repeat;
				}
			}
		}
		.contTwo{
			width: 100%;
			>img{
				width: 100%;
				display: block;
			}
		}
  }
</style>
