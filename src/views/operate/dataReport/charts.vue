<template>
	<div :class="className" :style="{height:height,width:width}" ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
	props: {
		className: { type: String, default: 'chart' },
		width: { type: String, default: '100%' },
		height: { type: String, default: '350px' },
		compare: { type: Boolean, default: false },
		autoResize: { type: Boolean, default: true },
		legendData: { type: Array, default: function () { return [] } },
		chartData: { type: Object },
	},
	data () {
		return {
			chart: null
		}
	},
	mounted () {
		if (this.chart == null) {
			this.initChart();
		}
	},
	computed: {
		option: function () {
			let _this = this;
			let arr = [];
			let yAxisName = this.legendData[0];
			if (this.legendData.length > 2) {
				arr = [this.legendData[1], this.legendData[2]];
			} else {
				arr = this.legendData;
			}

			let option = {
				color: ['#ff635c', '#60a3f5'],
				tooltip: {
					trigger: 'axis',
					formatter: function (params) {
						if (_this.compare) {
							return params[0].axisValue + ":" + params[0].data + "<br/>" +
								_this.chartData.compareCategories[params[0].dataIndex] + ":" + params[1].data
						} else if (arr.length > 1) {
							var data1, data2;
							data1 = _this.formatValue(params[0].seriesName, params[0].value);
							data2 = _this.formatValue(params[1].seriesName, params[1].value);
							return params[0].seriesName + ":" + data1 + "<br/>" +
								params[1].seriesName + ":" + data2
						} else {
							var data = _this.formatValue(params[0].seriesName, params[0].data);
							return params[0].seriesName + ":" + data
						}
					}
				},
				toolbox: {
					feature: {
						dataView: { show: false, readOnly: false },
						magicType: { show: false, type: ['line', 'bar'] },
						restore: { show: false },
						saveAsImage: { show: false }
					}
				},
				legend: {
					data: arr,
					y: 'bottom'
				},
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						axisLabel: {
							color: "#666"
						},
						axisLine: {
							lineStyle: { color: "#ccd6eb" }
						},
						data: this.chartData.xAxisData
					}],
				yAxis: [
					{
						name: yAxisName,
						nameLocation: 'middel',
						type: 'value',
						nameRotate: 90,
						axisLine: {
							show: false
						},
						min: 0,
						axisTick: {
							show: false
						},
						nameTextStyle: {
							padding: [-120, 0, 0, 0],
							verticalAlign: 'middle'
						},
						axisLabel: {
							formatter (value) {
								return _this.formatValue(_this.legendData[0], value);
							}
						}
					}
				],
				series: [
					{
						name: arr[0],
						type: 'line',
						data: this.chartData.seriesData[0],
						smooth:true,
						symbol: 'circle', //设定为实心点
						symbolSize: 10,
					}]
			};
			if (this.compare) {
				option.series.push({
					name: arr[1],
					type: 'line',
					data: this.chartData.seriesData[1]
				});

			} else {
				if (arr.length > 1) {
					option.yAxis.push({
						name: arr[1],
						type: 'value',
						nameLocation: 'middel',
						axisLine: {
							show: false
						},
						min: 0,
						nameRotate: -90,
						axisTick: {
							show: false
						},
						nameTextStyle: {
							padding: [-120, 0, 0, 0],
							verticalAlign: 'middle'
						},
						axisLabel: {
							formatter (value) {
								return _this.formatValue(arr[1], value);
							}
						}
					});
					option.series.push({
						name: arr[1],
						type: 'line',
						yAxisIndex: 1,
						data: this.chartData.seriesData[1],
						smooth:true,						
						symbol: 'circle', //设定为实心点
						symbolSize: 10,
					});
				}
			}
			return option;
		}
	},
	methods: {
		formatValue (name, value) {
			if (value == undefined) {
				return ''
			} else {
				if (name.indexOf("率") != -1) {
					return value + "%";
				} else if (name.indexOf("元") != -1) {
					return this.formatNum(value) + "元";;
				} else {
					return this.formatNum(value);
				}
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
		initChart () {
			if (this.chart) {
				this.chart.dispose()
			} // 先销毁之前的echart
			this.chart = echarts.init(this.$refs.myEchart)
			this.chart.setOption(this.option);
		}
	},
	watch: {
		option: function () {
			this.chart.clear();
			this.chart.setOption(this.option);
			// this.initChart()
		}
	},	
	beforeDestroy () {
		if (!this.chart) {
			return
		}
		this.chart.dispose()
		this.chart = null
	},
}
</script>
