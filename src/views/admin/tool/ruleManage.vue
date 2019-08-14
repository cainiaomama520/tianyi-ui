<template>
	<div>
		<el-row :gutter="20" class="toolbar" style="padding-bottom: 0px;">
			<el-form ref="searchForm" :model="searchForm" label-width="100px">
				<el-col :span="6">
					<el-form-item label="广告主名称">
						<el-input v-model="searchForm.idOrName" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item label="状态">
						<el-select v-model="searchForm.status" placeholder="请选择广告主">
							<el-option :label="item.value" :value="item.id" v-for="item in status" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4"> <el-button type="primary" @click="getList">查询</el-button></el-col>
				<el-col :span="4"><el-button type="primary" @click="handleClick('new')">添加规则</el-button></el-col>
			</el-form>
		</el-row>
		<!-- 表格start -->
		<el-table
			:data="ruleData.records"
			border
			style="width: 100%">
			<el-table-column
			type="index"
			label="序号">
			</el-table-column>
			<el-table-column
			prop="name"
			width="80"
			label="开关">
			<template slot-scope="scope">
				<el-switch v-model="scope.row.status" active-value="on" inactive-value="off" @change="changeStatus(scope.row)">
				</el-switch>
			</template>
			</el-table-column>
			<el-table-column
			prop="adverNames"
			label="广告主名称">
			</el-table-column>
			<el-table-column
			prop="desc"
			label="规则">
			</el-table-column>
			<el-table-column
			prop="runStatus"
			label="运行状态"
			width="80"
			>
			<template slot-scope="scope">
			{{scope.row.runStatus=='init'?'未运行':scope.row.runStatus=='done'?'运行完成':'失败'}}
			</template>
			</el-table-column>
			<el-table-column
			prop="userName"
			width="80"
			label="操作人">
			</el-table-column>
			<el-table-column
			prop="updateTime"
			width="140"
			label="操作时间">
			</el-table-column>
			<el-table-column
			width="128"
				label="操作">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" @click="deleteRule(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page="currentPage"
				:page-sizes="[10, 20, 50]"
				:page-size="searchForm.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="ruleData.total"
				style="float:right;padding:30px 0"
			></el-pagination>
		</div>
		<!-- 表格end -->
		<!-- 弹窗 -->
		<el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="resetForm">
			<el-form ref="form" :model="form" label-width="100px" :rules="rules">
				<el-form-item label="广告主:" prop="adverList" >
					<el-select v-model="form.adverList" filterable  placeholder="请选择广告主" multiple collapse-tags style="width:334px">
						<el-option :label="item.name" :value="item.id" v-for="item in advList" :key="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="指标:" prop="action">
					<el-select v-model="form.action" placeholder="请选择指标" style="width:334px">
						<el-option label="日预算" value="daily_budget"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="值:" style="width:434px" prop="value">
					<el-input v-model="form.value" placeholder="请输入值"></el-input>
				</el-form-item>
				<el-form-item label="设置时间:" prop="runTime">
					<el-time-picker		
						format="HH:mm"			
						v-model="form.runTime"
						placeholder="选择时间范围" value-format="HH:mm"
						style="width:334px"
						>
					</el-time-picker>
				</el-form-item>
				<el-form-item label="执行频率:" prop="freqType">
					 <el-radio-group v-model="form.freqType">
						 <el-radio label="today">今日</el-radio>
						<el-radio label="next_day">次日</el-radio>
						<el-radio label="every_day">每日</el-radio>
						<el-radio label="diy">自定义</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="" v-show="form.freqType=='diy'">
					 <el-date-picker
					 style="width:334px"
						v-model="date"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期" value-format="yyyy-MM-dd">
						</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm()">取 消</el-button>
				<el-button type="primary" @click="saveRule('form')">保 存</el-button>
			</div>
		</el-dialog>
		<!-- 删除 -->
		<el-dialog
			title="提示"
			:visible.sync="deleteVisible"
			width="30%"
			>
			<span>确定删除这些规则吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="deleteVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteBtn">确 定</el-button>
			</span>
			</el-dialog>
	</div>
</template>
<script>
import {autoactionList,myAdver,autoactionSave,autoactionDelete,autoactionInfo,autoactionStatus} from '@/api/admin'
export default {
	data(){
		var checknumber = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请输入值'));
			}
			var reg = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
			if (!reg.test(value)) {
				return callback(new Error('数据格式不正确'));
			} else {
				if (value < 1000) {
					return callback(new Error('不能低于1000元'));
				} else if (value > 9999999.99) {
					return callback(new Error('不能高于9999999.99元'));
				} else {
					callback();
				}
			}
		}
		return{
			searchForm:{
				status:'',
				page:1,
				limit:10
			},
			deleteVisible:false,
			dialogFormVisible:false,
			date:[],
			form:{
				adverList:[],
				action:'daily_budget',
				value :'',
				freqType:'today',
				runTime:''
			},
			currentPage:1,
			title:"添加规则",
			selectableRange:['00:00','23:59'],
			ruleData:{},
			rules: {
				adverList:[{ required: true, message: '请选择广告主', trigger: 'change' }],
				value:[{ validator: checknumber, trigger: 'blur' }],
				runTime:[{ type: 'string', required: true, message: '请选择时间', trigger: 'change' }],
				freqType: [
					{required: true, message: '请选择执行频率', trigger: 'change' }
				],
				action:[
					{required: true, message: '请选择指标', trigger: 'change' }
				]
			},
			status: [
				{ id: '', value: '不限' },
				{ id: 'on', value: '开启' },
				{ id: 'off', value: '关闭' },
			],
			advList:[],
			ruleId:''
		}
	},
	mounted(){
		this.getList();
		this.getAdverList();
	},
	methods:{
		handleClick(value){			
			this.dialogFormVisible=true;
			if(value=='new'){
				this.title="添加规则";
				delete this.form.id
			}else{
				// 查看详情
				this.title="编辑规则"
				autoactionInfo(value.id).then(res=>{
					this.form=res;
					if(res.startTime&&res.endTime){
						this.date=[res.startTime,res.endTime];						
					}
				})				
			}
		},
		saveRule(formName){
			// 保存规则
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if(this.form.freqType=='diy'&&this.date.length==0){
						this.$message.warning('请选择时间');
						return false;
					}
					if(this.date){
						this.form.startTime=this.date[0];
						this.form.endTime=this.date[1]
					}
					if(!this.form.id){
						this.form.runTime=this.form.runTime+':00'
					}				
					autoactionSave(this.form).then(res=>{
						if(res){
							this.resetForm();
							this.getList();
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm() {
			// 重置规则表单
			this.dialogFormVisible=false;
			this.$refs['form'].resetFields();
			this.date=[];
		},
		deleteRule(value){
			// 删除规则
			this.deleteVisible=true;
			this.ruleId=value.id
		},
		deleteBtn(){
			autoactionDelete(this.ruleId).then(res=>{
				if(res.status){
					this.$message.success('删除成功');
					this.deleteVisible=false;
					this.getList();
				}				
			})
		},
		getList(){
			autoactionList(this.searchForm).then(res=>{
				this.ruleData=res;
			})
		},
		getAdverList(){
			myAdver().then(res=>{
				this.advList=res;
			})
		},
		changeStatus(value){
			autoactionStatus({id:value.id,status:value.status}).then(res=>{
				if(res.status){
					this.$message.success('修改成功');
				}
			})
		},
		handleSizeChange(size){
			this.searchForm.limit=size
			this.getList()
		},
		handleCurrentChange(page){
			console.log(page)
			this.searchForm.page=page
			this.getList()
		}
	}
}
</script>

