<template>
	<div v-if="yName.length>1" :class="className" :style="{height:height,width:width}" ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'
import { setTimeout } from 'timers';
export default {
	props: {
		className: {
			type: String,
			default: 'chart'
		},
		width: {
			type: String,
			default: '100%'
		},
		height: {
			type: String,
			default: '350px'
		},
		autoResize: {
			type: Boolean,
			default: true
		},
		legendData: { type: Array, default: function () { return [] } },
		chartData: {
			type: Object
		},
	},
	data () {
		return {
			chart: null,
			nowshow: [],
			yName: [],
			hasInited: false 
		}
	},
	beforeDestroy () {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
	methods: {
		initChart () {
			let vm = this
			if (!this.$refs.myEchart) {
				return false
			}
			if (this.chart) {
				this.chart.dispose()
			} // 先销毁之前的echart
			this.chart = echarts.init(this.$refs.myEchart)
			this.chart.setOption({
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: this.yName,
					y: 'bottom'
				},
				xAxis: [
					{
						type: 'category',
						data: vm.chartData ? vm.chartData.categories : '',
						boundaryGap: false,
						axisLabel: {
							color: "#666"
						},
						axisLine: {
							lineStyle: { color: "#ccd6eb" }
						}
					}],
				yAxis: [{
					name: this.yName[0],
					type: 'value',
					nameLocation: 'middle',
					nameGap: 60,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						formatter (value) {
							return vm.formatValue(vm.yName[0], value);
						}
					},
				},
				{
					name: this.yName[1],
					type: 'value',
					nameLocation: 'middle',
					nameGap: 60,
					nameRotate: -90,
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						formatter (value) {
							return vm.formatValue(vm.yName[1], value);
						}
					}
				}],
				series:
					[{
						data: vm.nowshow[0].data,
						name: this.yName[0],
						type: 'line',
						itemStyle: {
							normal: {
								color: "#ff635c",//折线点的颜色
								lineStyle: {
									color: "#ff635c"//折线的颜色
								}
							}						
						},
						smooth:true,
						symbol: 'circle', //设定为实心点
						symbolSize: 10,
					},
					{
						data: vm.nowshow[1].data,
						name: this.yName[1],
						type: 'line',
						yAxisIndex: 1,
						itemStyle: {
							normal: {
								color: "#60a3f5",//折线点的颜色
								lineStyle: {
									color: "#60a3f5"//折线的颜色
								}
							}						
						},
						smooth:true,
						symbol: 'circle', //设定为实心点
						symbolSize: 10,
					}
					]
			})
		},
		formatValue (name, value) {
			if (name.indexOf("率") != -1) {
				return value + "%";
			} else if (name.indexOf("元") != -1) {
				return this.formatNum(value) + "元";;
			} else {
				return this.formatNum(value);
			}
		},
		formatNum (value) {
			if (value >= 1000) {
				value = value / 1000 + 'k';
			} else if (value < 1000) {
				value = value;
			}
			return value
		},
		formateData () {
			let vm = this
			this.nowshow = [];
			this.yName = [];
			let data = JSON.parse(JSON.stringify(this.chartData.series))
			data.forEach(element => {
				this.legendData.forEach(val => {
					if (val.value == element.name) {
						element.name = val.lable
						vm.nowshow.push(element);
						vm.yName.push(element.name)
					}
				});
			})
			vm.$nextTick(() => {
				vm.initChart()
			});
		}
	},
	watch: {
		chartData: function (val) {
			this.chartData = val;
			if (this.chartData) {
				this.formateData()
			}
		},
		legendData: function (val) {
			this.legendData = val
			this.formateData()
		}
	},
}
</script>