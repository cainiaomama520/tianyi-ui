<template>
	<div class="toutiao">
		<!--工具条-->
		<el-row :gutter="20">
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="时间段：">
					<el-select v-model="filters.value" placeholder="请选择" @change="changeTime">
						<el-option v-for="item in selectItem" :key="item.id" :label="item.label" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
						v-model="selectdate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						:disabled="disabled"
						end-placeholder="结束日期"
						@change="selectTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="代理商">
					<el-select v-model="filters.agentid" filterable placeholder="请选择代理商" clearable>
						<el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类型：">
					<el-select v-model="filters.type" placeholder="请选择">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="广告主：">
					<el-input placeholder="请输入广告主ID或名称" v-model="filters.nameOrId" clearable></el-input>
				</el-form-item>
				<el-form-item label="付款主体：">
					<el-input placeholder="请输入付款主体" v-model="filters.paymentSubject" clearable></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="medium" @click="getList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		</el-row>
		<el-row :gutter="0" style="margin-bottom:20px">
		<el-col :span="4">
			<el-dropdown
				@command="changeStatus"
				trigger="click"
				style="padding: 7px 10px;border: 1px solid #ddd;margin-right: 10px;cursor: pointer;"
			>
				<span class="el-dropdown-link">
					批量操作
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="type">类型</el-dropdown-item>
					<el-dropdown-item command="disable">优化师</el-dropdown-item>
					<el-dropdown-item command="zgut">付款主体</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</el-col>
		
		<el-col :span="2" style="position:relative">
			<el-button type="primary" size="medium">批量导入</el-button>
			<input type="file" class="fileLoadAdvs" accept=".xlsx,.xls" title=" " name="fileup" id="uploadEventFile" @change="fileChange($event)"/>
		</el-col>
		<el-col :span="2">
			<el-button size="medium" type="text" @click="downloadM">下载模板</el-button>
		</el-col>
		<el-col :span="4" class="fr" style="text-align: right;">
			<el-button size="medium" @click="dialogVisible=true">导出报表</el-button>
		</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table
			ref="multipleTable"
			:data="tableData.content"
			border
			max-height="500"
			tooltip-effect="dark"
			style="width: 100%;"
			show-summary 
			:summary-method="getSummaries"			
			@sort-change="sortChange"
			@selection-change="handleSelectionChange">
			<el-table-column
			type="selection"
			width="55">
			</el-table-column>
			<el-table-column
			prop="adverid"
			label="ID"></el-table-column>
			<el-table-column
			prop="adverName"
			label="广告主/代理子账户"
			width="120">
			</el-table-column>
			<el-table-column
			prop="companyName"
			label="公司名称">
			</el-table-column>
			<el-table-column
			prop="agentName"
			label="代理商">
			</el-table-column>
			<el-table-column
			prop="paymentSubject"
			label="付款主体">
			</el-table-column>
			<el-table-column
			label="类型">
			<template slot-scope="scope">
				{{scope.row.adverType==1?"充值结算":scope.row.adverType==2?"消耗结算":scope.row.adverType==3?"服务费":"--"}}
			</template>
			</el-table-column>
			<el-table-column
			prop="optimizer"
			label="优化师">
			</el-table-column>
			<el-table-column
			prop="cost"
			sortable="custom"
			label="总支出">
			</el-table-column>
			<el-table-column
			prop="cash_cost"
			sortable="custom"
			label="现金支出">
			</el-table-column>
			<el-table-column
			prop="reward_cost"
			sortable="custom"
			label="赠款支出">
			</el-table-column>
			<el-table-column
			prop="income"
			sortable="custom"
			label="总存入">
			</el-table-column>
			<el-table-column
			prop="transfer_in"
			sortable="custom"
			label="总转入">
			</el-table-column>
			<el-table-column
			prop="transfer_out"
			sortable="custom"
			label="总转出">
			</el-table-column>
			<el-table-column
			prop="balance"
			sortable="custom"
			label="日终结余">
			</el-table-column>
			<el-table-column
			prop="currentBalance"
			label="总余额">
			</el-table-column>
			<el-table-column
			prop="currentNoneGrant"
			label="非赠款余额">
			</el-table-column>
			<el-table-column
			prop="currentGrant"
			label="赠款余额">
			</el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24">
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			background
			:page-sizes="[20, 50, 100]"
			:page-size="filters.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="tableData.totalElements"
			style="float:right;padding:30px 0"
		></el-pagination>
		</el-col>
		<!-- 弹窗 -->
		<el-dialog title="导出方式" :visible.sync="dialogVisible" width="30%">
			<el-radio-group v-model="filters.exportType">
				<el-radio :label="1">分日导出</el-radio>
				<el-radio :label="2">汇总导出</el-radio>
			</el-radio-group>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">关闭</el-button>
				<el-button type="primary" @click="downloadFile">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 批量修改 -->
		<el-dialog title="批量修改" :visible.sync="visibleChang" width="40%">
			<el-form :model="changeTable" :rules="changeTable.rules" ref="dynamicValidateForm" >
				<el-form-item label="修改规则：" label-width="100px">
					<el-radio-group v-model="changeRule" size="mini">
						<el-radio-button label="1">统一修改</el-radio-button>
						<el-radio-button label="2">分别修改</el-radio-button>
					</el-radio-group>
				</el-form-item>					
			<el-table
				ref="singleTable"
				:data="changeTable.tableData"
				highlight-current-row
				:span-method="objectSpanMethod"
				border
				style="width: 100%;margin-top:20px">
				<el-table-column
					property="adverName"
					label="广告主/代理子账户">
				</el-table-column>
				<el-table-column
					:label="nowType">
					<template slot-scope="scope">
						<span v-if="nowType=='当前类型'">
							{{scope.row.adverType==1?"充值结算":scope.row.adverType==2?"消耗结算":scope.row.adverType==3?"服务费":"--"}}
						</span>
						<span v-else-if="nowType=='当前优化师'">{{scope.row.optimizer2}}</span>
						<span v-else>{{scope.row.paymentSubject2}}</span>
					</template>
				</el-table-column>
				<el-table-column
					v-if="nowType=='当前类型'"
					:label="(changeRule==1?'统一':'分别')+'修改类型'">
					<template slot-scope="scope">
						<el-form-item :prop="'tableData.' + scope.$index + '.adverType'" :rules='nowType=="当前类型"?changeTable.rules.adverType:[]'>                
							<el-select v-model="scope.row.adverType" placeholder="请选择" size="mini">
								<el-option
								v-for="item in types"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</template>
				</el-table-column>
				
				<el-table-column v-else-if="nowType=='当前优化师'" key="tableData" 	:label="(changeRule==1?'统一':'分别')+'修改优化师'">
					<template slot-scope="scope">
						<el-form-item :prop="'tableData.' + scope.$index + '.optimizer'"  :rules='nowType=="当前优化师"?changeTable.rules.optimizer:[]'>                
							<el-input  placeholder="请输入优化师" size="small" v-model="scope.row.optimizer"  clearable></el-input>
						</el-form-item>
					</template>
				</el-table-column>
				<el-table-column v-else key="tableData1" :label="(changeRule==1?'统一':'分别')+'修改付款主体'">
					<template slot-scope="scope" >
						<el-form-item :prop="'tableData.' + scope.$index + '.paymentSubject'" :rules='nowType=="当前付款主体"?changeTable.rules.paymentSubject:[]'>                
							<el-input  placeholder="请输入付款主体" size="small" v-model="scope.row.paymentSubject"  clearable></el-input>
						</el-form-item>
					</template>
				</el-table-column>
			</el-table>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="resetForm">关闭</el-button>
				<el-button type="primary" @click="saveChange">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import moment from "moment";
import util from "../../../common/js/util";
import axios from "axios";
import {
	finacialList,agentSelect,adverFinacial,saveFinacial,multiGet,downloadAdverFund
} from "../../../api/admin";
// import { fail } from 'assert';
export default {
	data () {
		return {
			filters: {
				value:3,
				page:1,
				size:20,
				type:'',
				exportType: 1,
				agentid:'',
				sort:'cost,DESC'
			},
			types:[
				{label:'充值结算',value:'1'},
				{label:'消耗结算',value:'2'},	
				{label:'服务费',value:'3'}
			],
			selectItem: [
				{ id: 1, label: "过去7天" },
				{ id: 2, label: "今日" },
				{ id: 3, label: "昨日" },
				{ id: 4, label: "过去30日" },
				{ id: 5, label: "上个自然月" },
				{ id: 6, label: "上个季度" },
				{ id: 7, label: "自定义" }
			],
			time: [],
			agentList: [],
			disabled: false,
			selectdate: [
				util.formatDate.format(new Date(), "yyyy-MM-dd"),
				util.formatDate.format(new Date(), "yyyy-MM-dd")
			],
			dialogVisible: false,
			tableData:{},
			hasSelection:[],
			visibleChang:false,
			nowType:'当前类型',
			changeRule:'1',
			totalNowType:'统一修改类型',
			changeTable:{
				tableData:[
					{adverType:''}
				],
				rules:{
					adverType:{
						type:"string",
						required:true,
						message:"请选择类型",
						trigger:"change"
					},
					optimizer:{
						type:"string",
						required:true,
						message:"必填写优化师",
						trigger:"blur"
					},
					paymentSubject:{
						type:"string",
						required:true,
						message:"请填写付款主体",
						trigger:"blur"
					}
				}
			},
			serverUrl: process.env.BASE_API,
			token: this.$store.state.user.token,
			total:{}
		}
	},
	mounted () {
		this.selects();		
		this.changeTime(3)
	},
	methods: {
		getList(){
			finacialList(this.filters).then(res=>{
				this.tableData=res.page;
				this.total=res.total
			})
		},
		getSummaries(param){
			console.log(param,'param')
			let vm = this;
			let sums = [];
				var selectedColm = param.columns;
				let newArray = [];
				selectedColm.forEach(a => {
					if (vm.total[a.property]) {
						newArray.push(vm.total[a.property]);
					} else {
						newArray.push("");
					}
				});
				sums = newArray;
				sums[0] = "合计";
				return sums;
		},
		changeTime (val) {
			const date = new Date();
			let d1 = "";
			let d2 = "";
			//转换时间
			function commonFun (i) {
				return date.setTime(date.getTime() + 3600 * 1000 * 24 * i);
			}
			//格式化时间
			function formatTime (date) {
				return util.formatDate.format(new Date(date), "yyyy-MM-dd");
			}
			//1代表过去7天，2代表今天，3代表昨日，4代表过去30天，5代表上个自然月，6代表上个季度，7代表自定义
			switch (val) {
				case 1:
					d1 = formatTime(commonFun(-1));
					d2 = formatTime(commonFun(-6));
					this.disabled = true;
					break;
				case 2:
					d1 = formatTime(commonFun(0));
					d2 = formatTime(commonFun(0));
					this.disabled = true;
					break;
				case 3:
					d1 = formatTime(commonFun(-1));
					d2 = formatTime(commonFun(0));
					this.disabled = true;
					break;
				case 4:
					d1 = formatTime(commonFun(-1));
					d2 = formatTime(commonFun(-29));
					this.disabled = true;
					break;
				case 5:
					d1 = moment()
						.subtract("month", 1)
						.endOf("month")
						.format("YYYY-MM-DD");
					d2 = moment()
						.subtract("month", 1)
						.startOf("month")
						.format("YYYY-MM-DD");
					this.disabled = true;
					break;
				case 6:
					d2 = moment()
						.quarter(moment().quarter() - 1)
						.startOf("quarter")
						.format("YYYY-MM-DD");
					d1 = moment()
						.quarter(moment().quarter() - 1)
						.endOf("quarter")
						.format("YYYY-MM-DD");
					this.disabled = true;
					break;
				default:
					this.disabled = false;
			}
			this.selectdate = [];
			if (val != 7) {
				this.selectdate.push(d2, d1);
				this.filters.startDate = this.selectdate[0];
				this.filters.endDate = this.selectdate[1];
			}
			this.getList();
		},
		selectTime (time) {
			// 自定义时间
			this.filters.startDate = time[0];
			this.filters.endDate = time[1];
		},
		selects () {
			// 筛选代理商
			agentSelect().then(res => {
				this.agentList = res;
			});
		},
		changeStatus (status) {
			if(this.hasSelection.length==0){
				this.$message.warning('请选择广告主');
				return false
			}
			if(status=='type'){
				this.nowType="当前类型"
			}else if(status=='disable'){
				this.nowType="当前优化师"
			}else{
				this.nowType="当前付款主体"
			}
			console.log(this.nowType)
			this.visibleChang=true;
			let param=this.hasSelection.toString(',')
			multiGet({ids:param}).then(res=>{
				this.changeTable.tableData=res.data;
			})
		},
		handleSelectionChange(val) {
			this.hasSelection = val.map((item)=>{
				return item.adverid
			});			
		},
		objectSpanMethod({ row, column, rowIndex, columnIndex }){
			if (columnIndex === 2) {
				if(this.changeRule==1){
					return {
						rowspan:this.hasSelection.length+1,
						colspan: 1
					};
				}else{
					return {
						rowspan:1,
						colspan: 1
					};
				}
			}
		},
		sortChange(row){
			console.log(row)
			var order=row.order;
			var sort=""
			if(order=='ascending'){
				order='ASC'
			}else if(order=='descending'){
				order='DESC'
			}
			sort=row.prop+","+order
			if(order!=null){
				this.filters.sort=sort;
			}
			this.getList();
		},
		handleSizeChange(size){
			this.filters.size=size;
			this.getList()
		},
		handleCurrentChange(page){
			this.filters.page=page;
			this.getList()
		},
		fileChange: function (el) {
			// 批量导入			
			let formData = new FormData();
			formData.append('file',el.target.files[0]);
			if(formData){
				adverFinacial(formData).then(res=>{
					if(res.code==0){
						this.$message.success('上传成功');
						this.getList()
					}
				})
			}
		},
		saveChange(){
			if(this.changeRule==1){
				if(this.nowType=="当前类型"){
					this.changeTable.tableData.forEach(item=>{
						item.adverType=this.changeTable.tableData[0].adverType
					})
				}else if(this.nowType=="当前优化师"){
					this.changeTable.tableData.forEach(item=>{
						item.optimizer=this.changeTable.tableData[0].optimizer
					})
				}else{
					this.changeTable.tableData.forEach(item=>{
						item.paymentSubject=this.changeTable.tableData[0].paymentSubject
					})
				}				
			}
			this.$refs['dynamicValidateForm'].validate((valid,model) => {
				if (valid) {
					saveFinacial({items:this.changeTable.tableData}).then(res=>{
						if(res.code==0){
							this.$message.success('更新成功');
							this.resetForm()
							this.getList()
						}
					})
				} else {
					return false;
				}
			})			
		},
		resetForm() {
			this.visibleChang=false;
			this.changeRule=1;
			this.$refs['dynamicValidateForm'].resetFields();
		},
		downloadM(){
			let url="../../../static/template.xlsx"
			window.open(url, "_blank");
		},
		downloadFile() {
			// 下载报表 
			axios.defaults.headers.get["Content-Type"] = "application/csv";
			let url =this.serverUrl +
				"/biz/export/adver-fund?agentid=" +
				this.filters.agentid +
				"&page="+this.filters.page +
				"&pageSize="+this.filters.pageSize +
				"&startDate=" +
				this.filters.startDate +
				"&endDate=" +
				this.filters.endDate +
				"&exportType=" +
				this.filters.exportType +
				"&type="+this.filters.type+"&nameOrId="+(this.filters.nameOrId?this.filters.nameOrId:'')+"&token=" +this.token;
				window.open(url)			
		}
	}
}
</script>
<style>
.fileLoadAdvs{
    width: 120px;
    display: inline-block;
    position: absolute;
    left: 0;
    font-size: 0;
	opacity: 0;
	cursor: pointer;
	height: 36px;
	top:0
}
.toutiao .el-table .caret-wrapper{
	/* width: 0;	 */
}
</style>

