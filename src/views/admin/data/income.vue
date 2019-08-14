<template>
	<section>
		<!--工具条-->
		<el-col :span="24">
			<el-form
				:inline="true"
				:model="form"
				label-width="100px"
				style="border:1px solid #ddd;padding:20px 20px 0;margin-bottom:20px"
			>
				<el-form-item label="日期">
					<el-date-picker
					style="width:240px"
						v-model="selectdate"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						end-placeholder="结束日期"
						@change="selectTime"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="公司">
					<el-select v-model="form.com" style="width:240px" placeholder="请选择公司" filterable clearable>
						<el-option v-for="(item,index) in dropList.comDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
					</el-select>
				</el-form-item>
				<el-form-item label="客户">
					<el-select v-model="form.customerFull" style="width:240px" placeholder="请选择客户" filterable clearable>
						<el-option v-for="(item,index) in dropList.customDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																				
					</el-select>
				</el-form-item>
				<el-form-item label="开票及回款">
					<el-select v-model="form.invoiceMain" style="width:240px" placeholder="请选择" filterable clearable>
						<el-option v-for="(item,index) in dropList.invoiceMainDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																																
						
					</el-select>
				</el-form-item>
				<el-form-item label="投放产品" >
					<el-select v-model="form.product" style="width:240px"  placeholder="请选择" filterable clearable>
						<el-option v-for="(item,index) in dropList.productDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																																
					</el-select>
				</el-form-item>
				<el-form-item label="结算方式">
					<el-select v-model="form.settle" style="width:240px" placeholder="请选择" filterable clearable>
						<el-option v-for="(item,index) in dropList.settleDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																									
					</el-select>
				</el-form-item>
				<el-form-item label="客户返点/现">
					<el-select v-model="form.customerReturnPoint" style="width:240px" placeholder="请选择" filterable clearable>
						<el-option v-for="(item,index) in dropList.customerReturnPointDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																																
						</el-select>
				</el-form-item>
				<el-form-item label="货/现">
					<el-select v-model="form.customerType" style="width:240px" placeholder="请选择" filterable clearable>
						<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList(1)" size="medium">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<el-table :data="messageData.list" border show-summary :summary-method="getSummaries" style="width: 100%">
			<el-table-column prop="date" label="日期"></el-table-column>
			<el-table-column prop="com" label="公司"></el-table-column>
			<el-table-column prop="salesLeader" label="销售leader"></el-table-column>
			<el-table-column prop="sales" label="负责销售"></el-table-column>
			<el-table-column prop="customerFull" label="客户全称"></el-table-column>
			<el-table-column prop="invoiceMain" label="开票主体及回款主体"></el-table-column>
			<el-table-column prop="customerShort" label="客户简称"></el-table-column>

			<el-table-column prop="product" label="投放产品"></el-table-column>
			<el-table-column prop="settle" label="结算方式"></el-table-column>
			<el-table-column prop="accountCostTotal" label="账面总消耗"></el-table-column>
			<el-table-column prop="customerReturnPoint" label="客户返点（返现）"></el-table-column>
			<el-table-column prop="customerType" label="货点现点情况"></el-table-column>
			<el-table-column prop="chargeActual" label="实收客户金额"></el-table-column>
			<el-table-column prop="costCapital" label="项目消耗本金"></el-table-column>
			<el-table-column prop="costTotal" label="总成本（财务成本）"></el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page.sync="currentPage"
				:page-sizes="[20, 50, 100]"
				:page-size="form.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="messageData.totalCount"
				style="float:right;padding:30px 0"
			></el-pagination>
		</el-col>
	</section>
</template>

<script>
import moment from "moment";
import axios from "axios";
import util from "../../../common/js/util";
import {
	tmpGtIncomeDropdown,
	tmpGtIncomeList
} from "../../../api/admin";
export default {
	data () {
		return {
			form: {
				page:1,
				size:20
			},
			dropList:{},			
			totalSize: 10,
			selectdate: [],
			total:{},
			currentPage: 1,
			listLoading: false,
			messageData: {},
			type:[
				{
					value:'货',
					label:'货'
				},
				{
					value:'现',
					label:'现'
				}
			],
		};
	},
	methods: {
		selectTime (time) {
			// 自定义时间
				if(time){
				this.form.startDate = time[0];
				this.form.endDate = time[1];
			}else{
				delete this.form.startDate;
				delete this.form.endDate;
			}
		},
	
		handleCurrentChange (val) {
			this.form.page = val;
			this.getList();
		},
		handleSizeChange (val) {
			this.form.size = val;
			this.getList();
		},
		getDropList(){
			tmpGtIncomeDropdown().then(res=>{
				this.dropList=res;
			})
		},
		//获取用户列表
		getList (val) {
			if(val){
				this.form.page=1;
				this.currentPage=1;
			}
			tmpGtIncomeList(this.form).then(res=>{
				this.messageData=res.pageList;
				this.total=res.total;
			})
		},
		getSummaries(param){
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
		
	},
	mounted () {
		this.getDropList();
		this.getList()
	}
};
</script>

<style>
.el-checkbox {
	margin-right: 20px;
	line-height: 24px;
}
.el-checkbox + .el-checkbox {
	margin-left: 0;
}
.gray .el-checkbox__label {
	font-size: 12px !important;
}
</style>