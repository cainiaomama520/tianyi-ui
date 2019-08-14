<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="searchItem">
				<el-form-item>
					<el-select
						v-model="searchItem.value"
						placeholder="请选择"
						@change="selectValue"
						style="width:120px"
					>
						<el-option v-for="item in selectItem" :key="item.id" :label="item.label" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchItem.name" :placeholder="placeholder"></el-input>
				</el-form-item>
				<!-- <el-form-item>
          <el-select v-model="filters.industry" placeholder="请选择行业">
            <el-option v-for="item in industry" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
				</el-form-item>-->
				<el-form-item label="广告主状态">
					<el-select v-model="filters.status" placeholder="请选择行业">
						<el-option v-for="item in status" :key="item.id" :label="item.value" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="代理商">
					<el-select v-model="filters.agentid" filterable placeholder="请选择代理商">
						<el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUsers(1)">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="clearSearch">清除</el-button>
				</el-form-item>
				<el-button @click="getUsers">刷新</el-button>
				<!-- <el-button style="float:right">导出广告主</el-button> -->
			</el-form>
		</el-col>
		<div style="text-align:right;padding: 20px 0;" v-if="userType==1||userType==2"> 
			<el-button type="primary" size="medium">导入账号密码</el-button>
			<input type="file" class="fileLoadAdv" accept=".xlsx,.xls" title=" " name="fileup" id="uploadEventFile" v-on:change="fileChange($event)"  />
			<el-button type="primary" size="medium" @click="dialogVisible=true">添加账号密码</el-button>
		</div>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="广告主ID"></el-table-column>
			<el-table-column prop="name" label="广告主名称" min-width="120">
				<template slot-scope="scope">
					<span class="link" @click="toAdv(scope.row)">{{scope.row.name}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="company" label="公司名称"></el-table-column>
			<el-table-column prop="agentName" label="代理商"></el-table-column>
			<el-table-column prop="industry" label="行业"></el-table-column>
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<!-- <el-table-column prop="addr" label="广告主注册时间" min-width="180">
			</el-table-column>-->
			<el-table-column prop="address" label="地区"></el-table-column>
			<el-table-column prop="statusName" label="状态"></el-table-column>
			<el-table-column prop="balance" label="余额" width="100"></el-table-column>
			<el-table-column prop="balance" label="可用余额">
				<template slot-scope="scope">
					<span v-if="scope.row.balanceData">{{scope.row.balanceData.valid_balance}}</span>
					<span v-else>~</span>
				</template>
			</el-table-column>
			<el-table-column prop="userName" label="账号" v-if="userType!=2"></el-table-column>
			<el-table-column prop="pwd" label="密码" v-if="userType!=2"></el-table-column>
			<el-table-column prop="balance" label="操作">
				<template slot-scope="scope">
					<a v-if="scope.row.userName&&scope.row.pwd" href="https://ad.toutiao.com/"  class="link" target="_blank" @click="toLogin(scope.row)">登录</a>
					<span v-else style="cursor: not-allowed;color: #999;">登录</span>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page="currentPage4"
				:page-sizes="[20, 50, 100]"
				:page-size="filters.page_size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				style="float:right;padding:30px 0"
			></el-pagination>
		</el-col>
		<!-- 弹窗 -->
		<el-dialog title="添加账号密码" :visible.sync="dialogVisible" width="30%" >
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<el-form-item label="广告主ID" prop="adverId">
					<el-input v-model="ruleForm.adverId"></el-input>
				</el-form-item>
				<el-form-item label="账号" prop="userName">
					<el-input v-model="ruleForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pwd">
					<el-input v-model="ruleForm.pwd"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeUser">取 消</el-button>
				<el-button type="primary" @click="saveUser('ruleForm')">保 存</el-button>
			</span>
		</el-dialog>
	</section>
</template>

<script>
import util from '../../../common/js/util'
import { advManager, agentSelect,uploadExcleAdv,addAdvLogin,checkAdverId } from '../../../api/admin';
import { store } from "vuex";

export default {
	data () {
		var checkUser=(rule, value, callback)=>{
			let regTel=/^1[3456789]\d{9}$/;
			let regEmail=/^[A-Za-z0-9_.-\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(!regTel.test(value)&&!regEmail.test(value)){
				return callback(new Error('请输入正确的手机号或邮箱'));
			}else{
				callback();
			}
		}
		return {
			filters: {
				page: 1,
				page_size: 20,
				status: ''
			},
			searchItem: {
				value: 'adverName',
				name: ''
			},
			placeholder: '请输入广告主',
			page: {},
			selectItem: [
				{ id: 'id', label: 'ID', des: '请输入ID' },
				{ id: 'adverName', label: '广告主', des: '请输入广告主' },
				{ id: 'companyName', label: '公司名称', des: '请输入公司名称' },
				{ id: 'email', label: '注册邮箱', des: '请输入注册邮箱' }
			],
			industry: [
				{ id: 1, value: '一级行业' }
			],
			status: [
				{ id: '', value: '不限' },
				{ id: 'STATUS_DISABLE', value: '已禁用' },
				{ id: 'STATUS_PENDING_CONFIRM', value: '申请待审核' },
				{ id: 'STATUS_PENDING_VERIFIED', value: '待验证' },
				{ id: 'STATUS_CONFIRM_FAIL', value: '审核不通过' },
				{ id: 'STATUS_ENABLE', value: '已审核' },
				{ id: 'STATUS_CONFIRM_FAIL_END', value: 'CRM审核不通过' },
				{ id: 'STATUS_PENDING_CONFIRM_MODIFY', value: '修改待审核' },
				{ id: 'STATUS_CONFIRM_MODIFY_FAIL', value: '修改审核不通过' },
				{ id: 'STATUS_LIMIT', value: '限制' },
				{ id: 'STATUS_WAIT_FOR_BPM_AUDIT', value: ' 等待CRM审核 ' },
				{ id: 'STATUS_WAIT_FOR_PUBLIC_AUTH', value: '待对公验证 ' }
			],
			currentPage4: 1,
			users: [],
			total: 0,
			page: 1,
			pageSizes: 20,
			listLoading: false,
			agentList: [],
			dialogVisible: false,
			ruleForm: {
				adverId: '',
				userName: '',
				pwd: ''
			},
			rules: {
				adverId: [
					{ required: true, message: '请输入广告主ID', trigger: 'blur' }
				],
				userName:[
					{ required: true, message: '请输入账号', trigger: 'blur' },
					{validator:checkUser,trigger: 'blur'}
				],
				pwd:[
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 8, message: '密码至少8位', trigger: 'blur' }
				]
			}
		}
	},
	computed: {
		userType: function() {
			return this.$store.state.user.role;
		}
	},
	methods: {
		toAdv (val) {
			this.$store.commit("changeMes", val);
			this.$store.commit("changeActiveSelect", '2');
			let obj = { adverid: val.adverid, agentName: val.agentName, name: val.name }
			let routeUrl = this.$router.resolve({ path: '/operate/spreadMng/advert', query: { 'data': JSON.stringify(obj) } });
			window.open(routeUrl.href, '_blank');
		},
		selectValue (val) {
			if (val == 'id') {
				this.placeholder = "请输入ID"
			} else if (val == 'adverName') {
				this.placeholder = "请输入广告主"
			} else if (val == 'companyName') {
				this.placeholder = "请输入公司名称"
			} else {
				this.placeholder = "请输入注册邮箱"
			}
		},
		handleCurrentChange (val) {
			this.filters.page = val;
			this.getUsers();
		},
		handleSizeChange (val) {
			this.filters.page_size = val;
			this.getUsers();
		},
		//获取用户列表
		getUsers (page) {
			if(page){
				this.filters.page=1;
				console.log(this.filters.page,'page121')
			}
			
			this.listLoading = true;
			let param = {
				page: this.filters.page,
				page_size: this.filters.page_size,
				status: this.filters.status,
				agentid: this.filters.agentid
			}
			param[this.searchItem.value] = this.searchItem.name;
			advManager(param).then((res) => {
				this.total = res.totalElements;
				this.users = res.content;
				this.listLoading = false;
				this.pageSizes = res.totalPages
			});
		},
		clearSearch () {
			// 清除搜索项
			Object.assign(this.$data, this.$options.data())
			this.getUsers()
			this.selects()
		},
		selects () {
			// 筛选代理商
			agentSelect().then(res => {
				this.agentList = res
			})
		},
		saveUser(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// checkAdverId({adverId:this.ruleForm.adverId}).then(res=>{
					// 	if(res.data){
							addAdvLogin(this.ruleForm).then(res=>{
								if(res.code==0){
									this.$message.success('上传成功');
									this.closeUser()
									this.getUsers();
								}
							})
						// }else{
						// 	this.$message.warning('输入广告主ID不正确')
						// }
					// })					
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		closeUser(){
			this.dialogVisible=false;
			this.resetForm()
		},
		resetForm(){
			this.$refs['ruleForm'].resetFields();
		},
		fileChange: function (el) {
			let formData = new FormData();
			formData.append('file',el.target.files[0]);
			if(formData){
				uploadExcleAdv(formData).then(res=>{
					if(res.code==0){
						this.$message.success('上传成功');
						this.getUsers();
					}
				})
			}
		},
		toLogin(val){
			var eventFromChrome = document.createEvent('Event');
			eventFromChrome.initEvent('EventFromFly', true, true);
			installNode.innerText = JSON.stringify({
				type: 'account',
				msg: JSON.stringify({
					email: val.userName,
					password: val.pwd
				})
			});
			installNode.dispatchEvent(eventFromChrome);
		}
	},
	mounted () {
		this.getUsers();
		this.selects()
	}
}

</script>

<style scoped>
.fileLoadAdv{
    width: 120px;
    display: inline-block;
    position: absolute;
    right: 168px;
    font-size: 0;
	opacity: 0;
	cursor: pointer;
	height: 36px;
}
</style>