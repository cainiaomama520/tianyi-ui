<template>
	<div class="dashboard-editor-container admin-table">
		<!-- <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>  -->
		<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
			<div style="overflow: hidden;">
				<div class="adminSelect">
					<i
						@click="showEchart=!showEchart"
						class="fa fa-line-chart fa-lg"
						style="float:left;padding-top:10px;cursor:pointer;margin-right:10px"
					></i>
					<ul style="overflow:hidden">
						<li :class="nowSelect=='1'?'active':''" @click="selectTime('1')">今天</li>
						<li :class="nowSelect=='2'?'active':''" @click="selectTime('2')">昨天</li>
						<li :class="nowSelect=='3'?'active':''" @click="selectTime('3')">过去7天</li>
						<li :class="nowSelect=='4'?'active':''" @click="selectTime('4')">过去30天</li>
					</ul>
				</div>
			</div>
			<!-- <time-option @changeTime="changeTime"></time-option> -->
			<div v-show="showEchart">
				<el-row style="clear:both;text-align:center;">
					<el-button
						size="small"
						:key="index"
						v-for="(item,index) in compares"
						:class="getBtnClass(item.lable,index)"
						@click="activeNow(item)"
					>{{item.lable}}</el-button>
					<!-- <div v-show="showEchart" class="sel_box">
						<el-select v-model="chart_value1">
							<el-option
								v-for="item in compares"
								:key="item.value"
								:value="item.value"
								:label="item.lable"
							></el-option>
						</el-select>
						<span v-show="!compare">对比</span>
						<el-select v-model="chart_value2" v-show="!compare">
							<el-option
								v-for="item in compares"
								:key="item.value"
								:value="item.value"
								:label="item.lable"
							></el-option>
						</el-select>
					</div> -->
				</el-row>
				<echart
					ref="echart"
					:chartData.sync="lineChartData"
					v-if="legendData.length>0"
					:legendData="legendData"
				></echart>
				<!-- <chart
					v-show="showEchart"
					v-if="legendData.length>0"
					:legendData="legendData"
					:chartData="chartData"
					:compare="compare"
				></chart> -->
			</div>

			<el-row>
				<div class="adminsel">
					<el-row :gutter="12">
						<el-col :span="6">
							<el-input v-model="form.nameOrId" placeholder="请输入广告主或ID" clearable size="medium"></el-input>
						</el-col>
						<el-col :span="6">
							<el-select v-model="form.agentid" filterable placeholder="请选择代理商" size="medium">
								<el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-col>
						<el-col :span="2">
							<el-button type="primary" size="medium" @click="getIndexList">搜索</el-button>
						</el-col>
						<el-button type="primary" class="fr" size="medium" @click="showWarn">设置预警</el-button>
						<!-- <el-col :span="1">清除</el-col> -->
						<!-- <el-button style="float:right">导出报表</el-button> -->
					</el-row>
				</div>
				<el-table
					:data="tableData.content"
					border
					style="width: 100%"
					 v-loading="loading"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="adverid" label="ID" width="110"></el-table-column>
					<el-table-column prop="name" label="广告主/代理子账户" width="200">
						<template slot-scope="scope">
							<span class="link" @click="toAdv(scope.row)">{{scope.row.name}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="adverid" label="预警" width="62">
						<template slot-scope="scope">
							<el-popover
								v-show="scope.row.ruleStatus !== 0"
								placement="top-start"
								title="预警"
								width="200"
								trigger="hover"
							>
								<p v-for="rule in scope.row.rules" style="font-size:12px">
									{{rule.desc}}
									<span style="color:red;margin-left:4px">{{rule.alert ? '报警' : ''}}</span>
								</p>
								<span
									slot="reference"
								>{{scope.row.ruleStatus == 0? '~': scope.row.ruleStatus == 1? '报警': scope.row.ruleStatus == 2? '正常': '关闭'}}</span>
							</el-popover>
							<span v-if="scope.row.ruleStatus==0">~</span>
							<i v-else class="el-icon-edit" aria-hidden="true" @click="showAdvRule(scope.row.adverid)"/>
						</template>
					</el-table-column>
					<el-table-column prop="show" label="展示量"></el-table-column>
					<el-table-column prop="click" label="点击量"></el-table-column>
					<el-table-column prop="ctr" label="点击率">
						<template slot-scope="scope">
							<span>{{scope.row.ctr}}%</span>
						</template>
					</el-table-column>
					<el-table-column prop="cost" label="总消耗"></el-table-column>
					<el-table-column prop="cashCost" label="现金消耗"></el-table-column>

					<el-table-column prop="balance" label="余额"></el-table-column>
					<el-table-column prop="validBalance" label="可用余额"></el-table-column>
					<!-- <el-table-column prop="budget" label="日预算">
						<template slot-scope="scope">
							<span>{{scope.row.budget=='无'?"~":scope.row.budget}}</span>
						</template>
					</el-table-column> -->
					<el-table-column prop="convert" label="转化数"></el-table-column>
					<el-table-column prop="convert_cost" label="转化成本"></el-table-column>
					<el-table-column prop="active" label="激活数"></el-table-column>
					<el-table-column prop="active_cost" label="激活成本"></el-table-column>
					<el-table-column prop="register" label="注册数"></el-table-column>
					<el-table-column prop="register_cost" label="注册成本"></el-table-column>
				</el-table>
			</el-row>
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					background
					:current-page="currentPage4"
					:page-sizes="[20, 50, 100]"
					:page-size="form.pagesize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableData.totalElements"
					style="float:right;padding:30px 0"
				></el-pagination>
			</div>
		</el-row>
		<!-- 预警 -->
		<warning-Box
			ref="warningBox"
			:editFormVisible="editFormVisible"
			@close="editFormVisible = false"
			:selectArr="selectArr"
			@changeRuleSucess="changeRuleSucess"
		/>
	</div>
</template>

<script>
import { getAdminIndex, agentSelect, getAdminEchart, lookAdverRules } from '../../api/admin'
import moment from 'moment'
// import { resolve } from 'dns';
export default {
	name: 'dashboard-admin',
	components: {
		PanelGroup: resolve => require(["./main/panelGroup.vue"], resolve),
		echart: resolve => require(["./main/echart.vue"], resolve),
		// chart: resolve => require(["../operate/dataReport/charts.vue"], resolve),
		'warning-Box': resolve => require(["../../components/warningBox.vue"], resolve),
		"time-option": resolve => require(["../operate/dataReport/time.vue"], resolve),
	},
	data () {
		return {
			lineChartData: {},
			nowSelect: '1',
			tableData: [],
			currentPage4: 1,
			form: {
				size: 20,
				page: 1,
				nameOrId:''
			},
			showEchart: true,
			compares: [{
				lable: '展示量',
				value: 'show'
			}, {
				lable: '点击量',
				value: 'click'
			}, {
				lable: '点击率',
				value: 'ctr'
			}, {
				lable: '总消耗(元)',
				value: 'stat_cost'
			}],
			legendData: [
				{ lable: '展示量', value: 'show' },
				{ lable: '点击量', value: 'click' }
			],
			classArr: ['展示量', '点击量'],
			loading: true,
			agentList: [],
			editFormVisible: false,
			selectArr: [],
			ruleList: [],
			isSend: false,
			compare: false,
			time1: [moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')],
			time2: [],
			chartData: {
				xAxisData: [],
				seriesData: []
			},
			chart_value2: 'click',
			chart_value1: 'show',
			advData:this.$route.query.data
		}
	},
	computed: {
		// legendData: function () {
		// 	let val1, val2;
		// 	for (var i = 0; i < this.compares.length; i++) {
		// 		if (this.compares[i].value == this.chart_value1) {
		// 			val1 = this.compares[i].lable;
		// 		}
		// 		if (this.compares[i].value == this.chart_value2) {
		// 			val2 = this.compares[i].lable;
		// 		}
		// 		if (val1 && val2) {
		// 			break;
		// 		}
		// 	}
		// 	if (this.compare) {
		// 		return [val1, this.time1[0] + "到" + this.time1[1], this.time2[0] + "到" + this.time2[1]];
		// 	} else if (this.chart_value1 == this.chart_value2) {

		// 		return [val1];
		// 	} else {
		// 		return [val1, val2];
		// 	}
		// },
	},
	methods: {
		getBtnClass (label, index) {
			if (label) {
				return this.classArr.indexOf(label) > -1 ? 'active_' + index : ''
			} else {
				return ''
			}
		},
		changeTime: function (data) {
			// 时间组件回传
			this.compare = data.compare;
			this.time1 = [moment(data.time[0]).format('YYYY-MM-DD'), moment(data.time[1]).format('YYYY-MM-DD')];
			this.time2 = [moment(data.comTime[0]).format('YYYY-MM-DD'), moment(data.comTime[1]).format('YYYY-MM-DD')];
			this.getIndexList();
		},
		getIndexList () {
			// if (this.compare) {
			// 	this.form.compare = this.compare;
			// 	this.form.compareStartDate = this.time2[0];
			// 	this.form.compareEndDate = this.time2[1]
			// }
			// this.form.startDate = this.time1[0];
			// this.form.endDate = this.time1[1];
			// console.log(this.$route.query.data,'this.$route.query')
			console.log(this.form,'this.formthis.formthis.form')
			this.getChart();
			this.loading = true;
			
			getAdminIndex(this.form).then(res => {
				this.loading = false;
				this.tableData = res.page;
			})
		},
		getChart () {
			// 获取图表信息
			// this.lineChartData = {}
			getAdminEchart(this.form).then(res => {
				// if (this.compare) {
				// 	this.lineChartData.categories = res.compareCategories;
				// 	this.lineChartData.series = res.compareSeries
				// } else {
					this.lineChartData = res;
				// }
				// this.$refs.echart.formateData()
				// this.chartData.xAxisData=res.categories;
				// this.chartData.compareCategories = res.compareCategories;
				// this.chartData.compareSeries = res.compareSeries;
			})
		},
		activeNow (item) {
			// 切换样式
			var checkResult = this.legendData.find(a => {
				return a.value === item.value
			})
			if (checkResult) {
				return false
			}
			this.legendData.push(item);
			this.classArr.push(item.lable)
			if (this.legendData.length > 2) {
				this.legendData.shift()
				this.classArr.shift()
			}
		},
		// handleSetLineChartData (type) {
		// 	this.lineChartData = lineChartData[type]
		// },
		handleSizeChange (val) {
			this.form.size = val;
			this.getIndexList();
		},
		handleCurrentChange (val) {
			this.form.page = val
			this.getIndexList();
		},
		selects () {
			// 筛选代理商
			agentSelect().then(res => {
				this.agentList = res
			})
		},
		toAdv (val) {
			// 点击广告主跳转
			this.$store.commit("changeMes", val);
			this.$store.commit("changeActiveSelect", '2');
			let obj = { adverid: val.adverid, agentName: val.agentName, name: val.name }
			let routeUrl = this.$router.resolve({ path: '/operate/spreadMng/advert', query: { 'data': JSON.stringify(obj) } });
			window.open(routeUrl.href, '_blank');
		},
		handleSelectionChange (row) {
			// 列表全选选择
			let arr = [];
			arr = row.map(v => {
				return v._id;
			});
			this.selectArr = arr;
		},
		showWarn () {
			// 显示预警
			if (this.selectArr.length == 0) {
				this.$message.warning('请选择广告主')
			} else {
				this.editFormVisible = true;
				this.$refs.warningBox.changWarning()
			}
		},
		showAdvRule (id) {
			this.editFormVisible = true;
			this.$refs.warningBox.lookrulue(id)
		},
		selectTime (val) {
			this.nowSelect = val;
			let start = '';
			let end = '';
			switch (val) {
				case '1':
					end = moment();
					start = moment();
					break;
				case '2':
					end = moment().subtract(1, 'days');
					start = moment().subtract(1, 'days');
					break;
				case '3':
					end = moment().subtract(1, 'days', 'YYYY-MM-DD');
					start = moment().subtract(8, 'days', 'YYYY-MM-DD');
					break;
				default:
					end = moment().subtract(1, 'days', 'YYYY-MM-DD');
					start = moment().subtract(31, 'days', 'YYYY-MM-DD');
			}
			this.form.page = 1;
			this.form.startDate = start.format('YYYY-MM-DD');
			this.form.endDate = end.format('YYYY-MM-DD');
			this.getIndexList();

		},
		changeRuleSucess () {
			// 设置规则成功后调用刷新列表
			this.getIndexList();
			this.selectArr = [];
		}
	},
	mounted () {
		// this.getIndexList();
		if(this.advData!=undefined&&JSON.parse(this.$route.query.data).name){
			this.form.nameOrId=JSON.parse(this.$route.query.data).name
		}
		console.log(this.form.nameOrId,'this.form.nameOrId')
		this.selectTime('1');
		this.selects();
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
	padding: 32px;
	background-color: rgb(240, 242, 245);
	.chart-wrapper {
		background: #fff;
		padding: 16px 16px 0;
		margin-bottom: 32px;
	}
}
.adminSelect {
	float: right;
	overflow: hidden;
}
.adminSelect li {
	float: left;
	display: inline-block;
	padding: 5px 20px;
	border: 1px solid #dddddd;
	cursor: pointer;
}
.adminSelect li:first-child {
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
}
.adminSelect li:last-child {
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
}
.adminSelect li.active {
	background: #20a0ff;
	color: #fff;
	border: 1px solid #20a0ff;
}
.adminsel {
	background: #dfe6ec;
	padding: 10px 20px;
	vertical-align: middle;
	margin: 50px 0 0;
	line-height: 36px;
}
.el-table {
	font-size: 12px;
}
.el-table th,
.el-table__header-wrapper thead div {
	background-color: #fff;
}
.active_0 {
	color: #fff;
	background-color: #286090;
	border-color: #204d74;
}
.active_1 {
	color: #fff;
	background-color: #f0ad4e;
	border-color: #f0ad4e;
}
.active_2 {
	color: #fff;
	background-color: #d9534f;
	border-color: #d43f3a;
}
.active_3 {
	color: #fff;
	background-color: #5cb85c;
	border-color: #4cae4c;
}
</style>
