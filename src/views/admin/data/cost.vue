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
				
				<el-form-item label="客户">
					<el-select v-model="form.com" style="width:240px" placeholder="请选择客户" filterable clearable>
						<el-option v-for="(item,index) in dropList.customDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																				
					</el-select>
				</el-form-item>
				
				<el-form-item label="投放产品">
					<el-select v-model="form.product" style="width:240px" placeholder="请选择" filterable clearable>
						<el-option v-for="(item,index) in dropList.productDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																																						
					</el-select>
				</el-form-item>
				<el-form-item label="供应商">
						<el-select v-model="form.supplierFull" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.supplierFullDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																																													
						</el-select>
				</el-form-item>
				<el-form-item label="投放媒体">
					<el-select v-model="form.media" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.mediaDropdown" :key="index" :label="item.name" :value="item.name"></el-option>												
					</el-select>
				</el-form-item>
				<el-form-item label="媒体返点">
					<el-select v-model="form.mediaReturnPoint" style="width:240px" placeholder="请选择" filterable clearable>
							<el-option v-for="(item,index) in dropList.mediaReturnPointDropdown" :key="index" :label="item.name" :value="item.name"></el-option>																																													
						</el-select>
				</el-form-item>
				<el-form-item label="货/现">
					<el-select v-model="form.mediaType" style="width:240px" placeholder="请选择"filterable clearable >
						<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期">
    </el-table-column>
    <el-table-column
      prop="salesLeader"
      label="销售leader">
    </el-table-column>
		<el-table-column
      prop="sales"
      label="负责销售">
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
      label="投放产品">
    </el-table-column>
		<el-table-column
      prop="supplierFull"
      label="供应商全称">
    </el-table-column>
		<el-table-column
      prop="supplierShort"
      label="供应商简称">
    </el-table-column>
		<el-table-column
      prop="media"
      label="投放媒体">
    </el-table-column>
		<el-table-column
      prop="mediaReturnPoint"
      label="媒体返点">
    </el-table-column>
		<el-table-column
      prop="mediaType"
      label="货/现">
    </el-table-column>
			<el-table-column
      prop="optimizer"
      label="优化师">
    </el-table-column>
		<el-table-column
      prop="costTotal"
      label="账面总消耗">
    </el-table-column>
		<el-table-column
      prop="actualPay"
      label="实付金额">
    </el-table-column>
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
import util from "../../../common/js/util";
import {tmpGtCostdropDown,tmpGtCostList} from "@/api/admin";
export default {
  data() {
    return {
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
			form:{
				 page: 1,
        size: 20,
			},
			currentPage:1,
      selectdate: [],
      listLoading: false,
			messageData:{},
			dropList:{},
			total:{}
    };
  },
  methods: {
    getDownList(){
			tmpGtCostdropDown().then(res=>{
				this.dropList=res;
			})
		},
		getList(val){
				if(val){
				this.form.page=1;
				this.currentPage=1;
			}
			tmpGtCostList(this.form).then(res=>{
				this.messageData=res.pageList;
				this.total=res.total;
			})
		},
    selectTime(time) {
      // 自定义时间
			if(time){
				this.form.startDate = time[0];
				this.form.endDate = time[1];
			}else{
				delete this.form.startDate;
				delete this.form.endDate;
			}
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.form.size = val;
      this.getList();
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
		}
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