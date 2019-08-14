<template>
	<div>
		<el-button type="primary" size="medium" icon="el-icon-plus" @click="dialogVisible=true;title='创建订阅';detailId=''" style="margin:20px 0">创建</el-button>
		<el-table :data="tableData.records" border style="width: 100%">
			<el-table-column prop="email" label="订阅者Email"></el-table-column>
			<el-table-column prop="pushTime" label="邮件推送时间"></el-table-column>
			<el-table-column prop="subType" label="订阅广告主账号"></el-table-column>
			<el-table-column prop="metrics" label="指标"></el-table-column>
			<el-table-column prop="reportDate" label="时间"></el-table-column>
			<el-table-column prop="groupBy" label="时间聚合维度"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" @click="openDelete(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:page-sizes="[10, 20, 50]"
				:page-size="searchForm.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
				style="float:right;padding:30px 0"
			></el-pagination>
		</div>
		<!-- 弹窗 -->
		<el-dialog :title="title" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="120px"
				class="demo-ruleForm"
			>
				<el-form-item label="订阅者Email" prop="email" style="margin-bottom:10px">
					<el-input v-model="ruleForm.email" size="medium" style="width:300px" placeholder="输入订阅Email，多个以分号(英文)隔开 ）"></el-input>
				</el-form-item>
				<el-form-item label="" prop="">
					<p style="font-size:12px">（ 注：输入订阅Email，多个以分号(英文)隔开 ）</p>
				</el-form-item>
				<el-form-item label="邮件推送时间" prop="pushTime">
					<el-select v-model="ruleForm.pushTime" size="medium" style="width:300px" @change="changeTime" placeholder="请选择邮件推送时间">
						<el-option v-for="item in sendTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报表时间段" prop="reportDate">
					<el-select v-model="ruleForm.reportDate" disabled size="medium" style="width:300px" placeholder="请选择时间">
						<el-option v-for="item in timeSelect" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订阅账号" prop="subType">
					<el-radio-group v-model="ruleForm.subType">
						<el-radio label="all">全部</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="指标" prop="metrics" >
					<el-checkbox-group v-model="ruleForm.metrics" disabled>
						<el-checkbox v-for="item in target" :key="item.value" :label="item.value">{{item.label}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				
				<el-form-item label="时间聚合维度" prop="groupBy" style="margin-bottom: 0;">
					<el-radio-group v-model="ruleForm.groupBy">
						<el-radio v-for="item in timeType" :key="item.value" :label="item.value">{{item.label}}</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="handleClose('ruleForm')">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import {reportList,saveReport,reportDetail,deleteReport} from '@/api/admin'
export default {
	data () {
		return {
			tableData:{},
			sendTime: [
				{ label: '每周五11:00', value: 'weekly' },
				{ label: '每月1号11:00', value: 'monthly' }
			],
			timeSelect: [
				{ label: '每周五至下周四', value: 'weekly' },
				{ label: '上月1号至月底', value: 'monthly' }
			],
			timeType: [
				{ label: '天', value: 'daily' },
				{ label: '汇总', value: 'total' }
			],
			target:[
				{ label: '总支出', value: 'totalCost' },
				{ label: '现金支出', value: 'cashCost' },
				{ label: '赠款支出', value: 'grantCost' }
			],
			title: '创建订阅',
			dialogVisible: false,
			ruleForm: {
				email:'',
				groupBy :'daily',
				metrics:['totalCost','cashCost','grantCost'],
				pushTime :'weekly',
				reportDate:'weekly',
				subType:'all'
				},
			rules: {
				email:[
					{ required: true, message: '输入订阅Email', trigger: 'change' }
				],
				pushTime : [
					{ required: true, message: '请选择推送时间', trigger: 'change' }
				],
				reportDate: [
					{required: true, message: '请选择时间', trigger: 'change' }
				],
				metrics : [
					{type: 'array', required: true, message: '请至少选择一个指标', trigger: 'change' }
				],
				groupBy: [
					{  required: true, message: '请选择时间聚合维度', trigger: 'change' }
				],
				subType:[
					{  required: true, message: '请选择订阅账号', trigger: 'change' }
				]
			},
			detailId:'',
			searchForm:{
				page:1,
				pageSize:10
			}
		}
	},
	mounted(){
		this.getReportList()
	},
	methods: {
		getReportList(){
			reportList(this.searchForm).then(res=>{
				res.records.forEach(ele => {
					if(ele.groupBy=='daily'){
						ele.groupBy='天'
					}else{
						ele.groupBy='汇总'
					}
					if(ele.pushTime =='weekly'){
						ele.pushTime='每周五11:00'
					}else{
						ele.pushTime='每月1号11:00'
					}
					if(ele.reportDate=='weekly'){
						ele.reportDate="每周五至下周四"
					}else{
						ele.reportDate="上月1号至月底"
					}
					ele.subType='全部';
					ele.metrics=this.target.map(item=> {
						if (ele.metrics.indexOf(item.value) >= 0) {
							return item.label+'、';
						}						
					});	
				});
				this.tableData=res;

			})
		},
		handleClick (row) {
			this.dialogVisible=true;
			this.title="编辑订阅"
			this.detailId=row.id;
			reportDetail(row.id).then(res=>{
				this.ruleForm=res
			})
		},
		changeTime(val){
			if(val=='weekly'){
				this.ruleForm.reportDate='weekly'
			}else{
				this.ruleForm.reportDate='monthly'
			}
		},
		handleClose(){
			 this.$refs['ruleForm'].resetFields();
			this.dialogVisible=false;
		},
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					saveReport(this.ruleForm).then(res=>{
						if(res){
							if(this.detailId){
								this.$message.success('修改成功');
							}else{
								this.$message.success('上传成功');
							}
							this.dialogVisible=false;
							this.getReportList()
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		openDelete(id){
			this.$confirm('确认删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
					this.deleteItem(id)
				}).catch(() => {
				});
		},
		deleteItem(id){
			deleteReport(id).then(res=>{
				this.$message.success('删除成功!');	
				this.getReportList()			
			})
		},
		handleSizeChange(size){
			this.searchForm.pageSize=size;
			this.getReportList()
		},
		handleCurrentChange(page){
			this.searchForm.page=page;
			this.getReportList()
		}
	}
}
</script>

