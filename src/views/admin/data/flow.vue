<template>
  <section>
    <!--工具条-->
    <el-col :span="24">
      <el-form :inline="true" :model="form" label-width="100px" style="border:1px solid #ddd;padding:20px 20px 0;margin-bottom:20px">
        <el-form-item label="时间">
          <el-date-picker
            v-model="selectdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期"
						style="width:240px"
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
				<el-form-item label="产品名称">
						<el-select v-model="form.product" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.productDropdown" :key="index" :label="item.name" :value="item.name"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="结算方式">
						<el-select v-model="form.settle" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.settleDropdown" :key="index" :label="item.name" :value="item.name"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="币种">
						<el-select v-model="form.currency" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.currencyDropdown" :key="index" :label="item.name" :value="item.name"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="投放媒体">
						<el-select v-model="form.media" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.mediaDropdown" :key="index" :label="item.name" :value="item.name"></el-option>							
						</el-select>
				</el-form-item>
				<el-form-item label="供应商">
						<el-select v-model="form.supplierFull" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.supplierFullDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
						</el-select>
				</el-form-item>
				<el-form-item label="供应商返点">
					<el-select v-model="form.supplierReturnPoint" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.supplierReturnPointDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
						</el-select>
				</el-form-item>
				<el-form-item label="供应商货/现">
						<el-select v-model="form.surpplierType" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="客户返点">
				<el-select v-model="form.customerReturnPoint" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.customerReturnPointDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
						</el-select>
				</el-form-item>
				<el-form-item label="客户货/现">
						<el-select v-model="form.customerType" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
				</el-form-item>
					<el-form-item label="渠道返点">
					<el-select v-model="form.channelReturnPoint" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.channelReturnPointDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
						</el-select>
				</el-form-item>
				<el-form-item label="渠道货/现" >
						<el-select v-model="form.channelType" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
				</el-form-item>
				<el-form-item label="后返金额" >
					<el-select v-model="form.backReturnAmount" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.backReturnAmountDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
						</el-select>
				</el-form-item>
				<el-form-item label="后返比例" >
					<el-select v-model="form.backReturnRate" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.backReturnRateDropdown" :key="index" :label="item.name" :value="item.name"></el-option>														
						</el-select>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList(1)" size="medium">查询</el-button>
        </el-form-item>        
      </el-form>
    </el-col>
    <el-table
    :data="messageData.list"
    border
		show-summary
		:summary-method="getSummaries"
		height="500px"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="com"
      label="公司">
    </el-table-column>
    <el-table-column
      prop="industry"
      label="行业">
    </el-table-column>
		<el-table-column
      prop="ae"
      label="AE">
    </el-table-column>
		<el-table-column
      prop="sales"
      label="销售">
    </el-table-column>
		<el-table-column
      prop="customerFull"
      label="客户全称">
    </el-table-column>
		<el-table-column
      prop="customerShort"
      label="客户简称">
    </el-table-column>
		<el-table-column
      prop="product"
      label="产品名称">
    </el-table-column>
		<el-table-column
      prop="settle"
      label="结算方式">
    </el-table-column>
		<el-table-column
      prop="currency"
      label="币种">
    </el-table-column>
		<el-table-column
      prop="media"
      label="投放媒体">
    </el-table-column>
		<el-table-column
      prop="supplierFull"
      label="供应商全称（开票主体）">
    </el-table-column>
		<el-table-column
      prop="supplierShort"
      label="供应商简称">
    </el-table-column>
		<el-table-column
      prop="supplierReturnPoint"
			sortable="custom"
      label="供应商返点">
    </el-table-column>
		<el-table-column
      prop="surpplierType"
      label="货/现">
    </el-table-column>
			<el-table-column
      prop="cost"
			sortable="custom"
      label="成本金额">
    </el-table-column>
		<el-table-column
      prop="accountShow"
			sortable="custom"
      label="账显金额">
    </el-table-column>
		<el-table-column
      prop="recharge"
			sortable="custom"
      label="充值金额">
    </el-table-column>
		<el-table-column
      prop="customerReturnPoint"
			sortable="custom"
      label="客户返点">
    </el-table-column>
		<el-table-column
      prop="customerType"
      label="货/现">
    </el-table-column>
			<el-table-column
      prop="channelReturnPoint"
			sortable="custom"
      label="渠道返点">
    </el-table-column>
		<el-table-column
      prop="channelType"
      label="货/现">
    </el-table-column>
	<el-table-column
      prop="accountCost"
			sortable="custom"
      label="账面消耗金额">
    </el-table-column>
			<el-table-column
      prop="customerCostAccountCollect"
			sortable="custom"
      label="实收客户金额">
    </el-table-column>
		<el-table-column
      prop="receiptCost"
			sortable="custom"
      label="消耗收款金额">
    </el-table-column>
		<el-table-column
      prop="amountCost"
			sortable="custom"
      label="消耗金额成本">
    </el-table-column>
		<el-table-column
      prop="financeCost"
			sortable="custom"
      label="财确成本">
    </el-table-column>
			<el-table-column
      prop="backReturnAmount"
			sortable="custom"
      label="后返金额">
    </el-table-column>
		<el-table-column
      prop="backReturnRate"
			sortable="custom"
      label="后返比例">
    </el-table-column>
  </el-table>
    <!--分页-->
    <el-col :span="24">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="currentPage"
        :page-sizes="[20, 20, 100]"
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
import {tmpNativeDropdown,tmpNativeList} from '@/api/admin.js'
import { resolve } from 'path';
export default {
  data() {
    return {      
      dropList:{},
			form:{
				page: 1,
        size: 20,
			},
      selectdate: [],      
      currentPage: 1,
      listLoading: false,
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
			messageData:{},
			total:{}
    };
  },
  methods: {
    selectTime(time) {
			// 自定义时间
			console.log(time)
			if(time){
				this.form.startDate = time[0];
				this.form.endDate = time[1];
			}else{
				delete this.form.startDate;
				delete this.form.endDate;
			}
      
    },
    getDownList(){
			tmpNativeDropdown().then(res=>{
				this.dropList=res;
			})
		},
    handleCurrentChange(val) {
      this.form.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.form.size = val;
      this.getList();
		},
		getList(val){
			if(val){
				this.form.page=1;
				this.currentPage=1;
			}
			tmpNativeList(this.form).then(res=>{
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
  mounted() {
		this.getDownList();
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