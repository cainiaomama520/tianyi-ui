<template>
	<div class="dashboard-editor-container admin-table">
		
		<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
			<!-- 数据 -->
			<el-row class="index-moneybox">
				<el-col :span="5">
					<p>账户总余额</p>
					<p><span class="number">{{headerData.balance}}</span>元</p>
					<p>(可用{{headerData.validBalance}}元)</p>
				</el-col>
				<el-col :span="5">
					<p>非赠款余额</p>
					<p><span class="number">{{headerData.noneGrant}}</span>元</p>
					<p>(可用{{headerData.validNoneGrant}}元)</p>
				</el-col>
				<el-col :span="5">
					<p>赠款余额</p>
					<p><span class="number">{{headerData.grant}}</span>元</p>
					<p>(可用{{headerData.validGrant}}元)</p>
				</el-col>
				<el-col :span="5">
					<p>今天实时消耗</p>
					<p><span class="number">{{headerData.todayCost}}</span>元</p>
					<p>  &nbsp;</p>
				</el-col>
				<el-col :span="4">
					<p>昨天消耗</p>
					<p><span class="number">{{headerData.yesterdayCost}}</span>元</p>
					<p> &nbsp;</p>
				</el-col>
			</el-row>
			<time-option @changeTime="changeTime" :nowTime="time1"></time-option>
			<div v-show="showEchart">
				<el-row style="top: 118px;right: 10px;position: absolute;">
					<div v-show="showEchart" class="sel_box">
						<el-select v-model="chart_value1" size="medium" style="width:130px">
							<el-option
								v-for="item in compares"
								:key="item.value"
								:value="item.value"
								:label="item.lable"
							></el-option>
						</el-select>
						<span v-show="!compare">对比</span>
						<el-select v-model="chart_value2" v-show="!compare" size="medium" style="width:130px">
							<el-option
								v-for="item in compares"
								:key="item.value"
								:value="item.value"
								:label="item.lable"
							></el-option>
						</el-select>
					</div>
				</el-row>
				<chart
					v-show="showEchart"
					v-if="legendData.length>0"
					:legendData="legendData"
					:chartData="chartData"
					:compare="compare"
				></chart>
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
					<el-table-column prop="budget" label="日预算">
						<template slot-scope="scope">
							<span>{{scope.row.budget=='无'?"~":scope.row.budget}}</span>
						</template>
					</el-table-column>
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
import { getAdminIndex, agentSelect, getAdminEchart, lookAdverRules,indexHeaderData } from '../../api/admin'
import moment from 'moment'
// import { resolve } from 'dns';
export default {
	name: 'dashboard-admin',
	components: {
		PanelGroup: resolve => require(["./main/panelGroup.vue"], resolve),
		chart: resolve => require(["../operate/dataReport/charts.vue"], resolve),
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
				nameOrId: ''
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
			loading: true,
			agentList: [],
			editFormVisible: false,
			selectArr: [],
			ruleList: [],
			isSend: false,
			compare: false,
			time1: [moment().subtract(0, 'days').format('YYYY-MM-DD'), moment().subtract(0, 'days').format('YYYY-MM-DD')],
			time2: [],
			chartData: {
				xAxisData: [],
				seriesData: []
			},
			chart_value2: 'click',
			chart_value1: 'show',
			advData: this.$route.query.data,
			tempNoChartData: [],
			tempCampareChartData: [],
			headerData:{}
		}
	},
	computed: {
		legendData: function () {
			let val1, val2;
			for (var i = 0; i < this.compares.length; i++) {
				if (this.compares[i].value == this.chart_value1) {
					val1 = this.compares[i].lable;
				}
				if (this.compares[i].value == this.chart_value2) {
					val2 = this.compares[i].lable;
				}
				if (val1 && val2) {
					break;
				}
			}
			if (this.compare) {
				return [val1, this.time1[0] + "到" + this.time1[1], this.time2[0] + "到" + this.time2[1]];
			} else if (this.chart_value1 == this.chart_value2) {
				return [val1];
			} else {
				return [val1, val2];
			}
		},
	},
	methods: {
		changeTime: function (data) {
			// 时间组件回传
			this.compare = data.compare;
			this.time1 = [moment(data.time[0]).format('YYYY-MM-DD'), moment(data.time[1]).format('YYYY-MM-DD')];
			this.time2 = [moment(data.comTime[0]).format('YYYY-MM-DD'), moment(data.comTime[1]).format('YYYY-MM-DD')];
			this.getIndexList();
		},
		getIndexList () {
			if (this.compare) {
				this.form.compare = this.compare;
				this.form.compareStartDate = this.time2[0];
				this.form.compareEndDate = this.time2[1]
			}
			this.form.startDate = this.time1[0];
			this.form.endDate = this.time1[1];
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
				 this.chartData.xAxisData = res.categories;
				this.tempNoChartData = res.series;
				
				if (this.compare) {
					if (res.compareSeries.length == 0) {
						this.tableData = [];
						this.compareTableData = [];
						this.chartData = { xAxisData: [], seriesData: [[], []] };
						this.$message({
						message: '没有对比数据,请重新选择',
						type: 'warning'
						});
						return;
					}					
					this.tempCampareChartData = res.compareSeries;
					this.chartData.compareCategories = res.compareCategories;
					this.chartData.compareSeries = res.compareSeries;
				}
				this.setChartData();
			})
		},
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
		changeRuleSucess () {
			// 设置规则成功后调用刷新列表
			this.getIndexList();
			this.selectArr = [];
		},
		setCompareData: function () {/*柱图*/
			let arr = this.tempCampareChartData;
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == this.chart_value1) {
					return arr[i].data;
				}
			}
		},
		setNoCampareData: function () {/*柱图*/
			let noCampareSeriesData = [];
			let arr = this.tempNoChartData;
			arr.find=(val)=>({
				
			})
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == this.chart_value1 ) {
					noCampareSeriesData[0]=arr[i].data;
				}
				if(arr[i].name == this.chart_value2){
					noCampareSeriesData[1]=arr[i].data;
				}
				// if (noCampareSeriesData[0]==noCampareSeriesData[1]) {
				// 	break;
				// }
			}
			return noCampareSeriesData;
		},
		setChartData: function () {/*柱图*/
			let noCampareSeriesData = this.setNoCampareData();
			if (this.compare) {
				let campareSeriesData = [];
				campareSeriesData.push(noCampareSeriesData[0]);
				campareSeriesData.push(this.setCompareData());
				this.chartData.seriesData = [campareSeriesData[0], campareSeriesData[1]];
			} else {
				this.chartData.seriesData = [noCampareSeriesData[0], noCampareSeriesData[1]];;
			}
		},
	},
	mounted () {
		// this.getIndexList();
		if (this.advData != undefined && JSON.parse(this.$route.query.data).name) {
			this.form.nameOrId = JSON.parse(this.$route.query.data).name
		}
		this.selects();
		indexHeaderData().then(res=>{
			this.headerData=res
		})
	},
	watch:{
		 legendData: function (val) {
			this.setChartData();
		}
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
.index-moneybox{
	border: 1px solid #ececec;
	text-align: center;
	margin-bottom: 20px;
}
.index-moneybox .el-col{
padding: 10px;
margin: 5px 0;
border-left: 1px solid #ececec
}
.index-moneybox .el-col:first-child{
	border-left:0
}
.index-moneybox .el-col .number{
	color: #406599;
	font-size:16px;
}
</style>
