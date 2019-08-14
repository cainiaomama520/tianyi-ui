<template>
	<section class="userManager">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="filters.value" placeholder="请选择" @change="changeUser">
						<el-option
							v-for="item in selectItem"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-input v-if="filters.value==1" v-model="filters.name" placeholder="请输入运营者"></el-input>
					<el-input v-else-if="filters.value==2" v-model="filters.userId" placeholder="请输入运营者Id"></el-input>
					<el-input v-else v-model="filters.email" placeholder="请输入运营者邮箱"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.type" placeholder="请选择">
						<el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="operator('new')">创建运营者</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table
			:data="users"
			highlight-current-row
			v-loading="listLoading"
			@selection-change="selsChange"
			style="width: 100%;"
		>
			<el-table-column prop="userId" label="运营者id" width="100"></el-table-column>
			<el-table-column prop="username" label="运营者账号"></el-table-column>
			<el-table-column prop="email" label="运营者邮箱"></el-table-column>
			<el-table-column prop="status" label="状态" width="80">
				<template slot-scope="scope">
					<span
						:style="scope.row.status==1?'color:#44C456':'color:#E52D27'"
					>{{scope.row.status==1?'激活':'冻结'}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="assignAdverCnt" label="已分配广告主">
				<template slot-scope="scope">
					<span v-if="scope.row.userType==1">管理员</span>
					<span
						v-else
						@click="hasAdv(scope.row)"
						style="cursor: pointer;color: #409EFF;text-decoration: underline;"
					>{{scope.row.assignAdverCnt}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
			<el-table-column label="操作" width="360px">
				<template slot-scope="scope">
					<el-button size="small" @click="operator(scope.row)" v-if="scope.row.status!=0">编辑</el-button>
					<el-button
						size="small"
						type="primary"
						@click="advAllot(scope.row)"
						v-if="scope.row.status!=0 && scope.row.userType!=1"
					>广告主分配</el-button>
					<el-button
						type="danger"
						size="small"
						@click="handleDel(scope.$index, scope.row)"
					>{{scope.row.status==1?'冻结':'激活'}}</el-button>
					<el-button
						size="small"
						@click="sendding(scope.row)"
						v-if="scope.row.status!=0 && scope.row.userType!=1 &&userType!=3"
					>测试预警</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--分页-->
		<!-- <el-col :span="24">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      ></el-pagination>
		</el-col>-->
		<div class="block">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page="currentPage4"
				:page-sizes="[20, 50, 100]"
				:page-size="filters.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
				style="float:right;padding:30px 0"
			></el-pagination>
		</div>
		<!-- 分页end -->
		<!--创建编辑运营者-->
		<el-dialog
			:title="title"
			:visible.sync="editFormVisible"
			:close-on-click-modal="false"
			width="40%"
		>
			<el-form :model="editForm" label-width="140px" :rules="editFormRules" ref="editForm">
				<el-form-item label="运营者账号" prop="username">
					<el-input v-model="editForm.username" auto-complete="off" placeholder="请输入运营者账号"></el-input>
				</el-form-item>
				<el-form-item label="邮箱(Email)：" prop="email">
					<el-input v-model="editForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="登陆密码：" prop="password">
					<el-input v-model="editForm.password " auto-complete="off" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码：" prop="checkPass">
					<el-input v-model="editForm.checkPass" auto-complete="off" placeholder="请输入确认密码"></el-input>
				</el-form-item>
				<el-form-item label="钉钉账户:" v-if="userType!=3" :prop="userType!=3?dingtalk:''">
					<el-input v-model="editForm.dingtalk" placeholder="请输入钉钉账户"></el-input>
				</el-form-item>
				<el-form-item label="通知方式" v-if="userType!=3">
					<el-checkbox-group v-model="notify" @change="handleCheckAllChange">
						<el-checkbox v-for="item in sendType" :label="item.key" :key="item.key">{{item.label}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>
		<!-- 广告主分配 -->
		<el-dialog :title="advtitle" :visible.sync="advVisible" :close-on-click-modal="false" width="738px">
			<el-transfer
				:titles="allotTitle"
				:filterable="true"
				:filter-method="filterMethod"
				filter-placeholder="搜索检索内容"
				v-model="advValue"
				:data="advData"
				:props="{key: 'id',label: 'name'}"
				:render-content="renderFunc"
			>
			</el-transfer>
			<div style="text-align: right;padding: 20px 10px 0;">
				<el-button type="primary" size="small" @click="saveAdvAdmin">保存</el-button>
			</div>
		</el-dialog>
		<!-- 已分配广告主 -->
		<el-dialog title="已分配广告主" :visible.sync="hasadvVisible" :close-on-click-modal="false" width="32%">
			<ul class="hasAdv" v-for="item in hasAdvList">
				<li>
					<span>{{item.name}}</span>
					<el-button type="danger" size="small" @click="delAdv(item.id)">删除</el-button>
				</li>
			</ul>
		</el-dialog>
	</section>
</template>

<script>
import { getUserList, saveUser, udateUser, advSelect, saveAdv, deleteAdv, chengeUserStatus, sendTalk } from '../../../api/admin';
import { types } from 'util';

export default {
	data () {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				if (this.editForm.checkPass !== '') {
					this.$refs.editForm.validateField('checkPass');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.editForm.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			currentPage4: 1,
			selectItem: [
				{ value: 1, label: '运营者' },
				{ value: 2, label: '运营者id' },
				{ value: 3, label: '运营者邮箱' }
			],
			type: [
				{ value: 0, label: '不限' },
				{ value: 1, label: '激活' },
				{ value: 2, label: '冻结' }
			],
			placeholder: '请输入运营者',
			filters: {
				limit: 20,
				page: 1,
				value: 1
			},
			users: [],
			total: 0,
			page: 1,
			listLoading: false,
			sels: [],//列表选中列
			title: '新增运营者',
			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				username: [
					{ required: true, message: '请输入运营者', trigger: 'blur' },
					{ min: 1, max: 20, message: '用户名的长度不得超过10个字符', trigger: 'blur' }
				],
				email: [
					{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' },
					{ validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, message: '请再次输入密码', trigger: 'blur' },
					{ validator: validatePass2, trigger: 'blur', required: true }
				],
				dingtalk: [
					{ required: true, message: '请输入钉钉账户', trigger: 'blur' }
				]
			},
			//编辑界面数据
			editForm: { userType: 2 },
			addLoading: false,
			advtitle: '',
			advVisible: false,
			advData: [],
			advValue: [],
			allotTitle: ['未分配广告主', '分配广告主'],
			filterMethod (query, item) {
				if (query) {
					return item.name.indexOf(query) > -1
				} else {
					return true
				}
			},
			hasadvVisible: false,
			hasAdvList: [],
			nowStatus: '',
			userId: '',
			notify: [1, 2],
			sendType: [
				{ label: '钉钉消息', key: 1 },
				{ label: '邮件', key: 2 }
			]
		}
	},
	computed: {
		userType: function() {
			return this.$store.state.user.role;
		}
	},
	methods: {
		changeUser (val) {
			console.log(val)
			if (val == 1) {
				this.placeholder = '请输入运营者'
			} else if (val == 2) {
				this.placeholder = '请输入运营者id'
			} else {
				this.placeholder = '请输入运营者邮箱名'
			}
		},
		handleCurrentChange (val) {
			this.filters.page = val;
			this.getUsers();
		},
		handleSizeChange (val) {
			this.filters.limit = val;
			this.getUsers()
		},
		//获取用户列表
		getUsers () {
			this.listLoading = true;
			this.filters.order = 'asc'
			getUserList(this.filters).then((res) => {
				console.log('运营者', res)
				this.total = res.page.total;
				this.users = res.page.records;
				this.listLoading = false;
			});
		},
		//冻结或激活用户
		handleDel: function (index, row) {
			console.log(row)
			chengeUserStatus(row.userId).then(res => {
				console.log('冻结成功', res)
				this.getUsers();
			})
		},
		//显示编辑界面
		operator: function (row) {
			this.editFormVisible = true;
			if (row == 'new') {
				this.notify = [1, 2];
				this.title = '新增运营者'
				this.editForm = {}
				this.nowStatus = 'new'
			} else {
				this.title = '编辑运营者'
				this.nowStatus = ''
				this.editForm = row
				this.editForm.password = '';
				if (row.notify == 1) {
					this.notify = [1]
				} else if (row.notify == 2) {
					this.notify = [2]
				} else if (row.notify == 3) {
					this.notify = [1, 2]
				} else {
					this.notify = []
				}
			}
		},
		handleCheckAllChange (val) {
			console.log(this.notify)
			// if (val.length > 1) {
			// 	this.editForm.notify = 3;
			// } else if (val.length == 1) {
			// 	this.editForm.notify = parseInt(val.join())
			// } else 
			if(this.notify.length==0){
				delete this.editForm.notify
			}
		},
		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					if (this.notify.length > 1) {
						this.editForm.notify = 3;
					} else if (this.notify.length == 1) {
						this.editForm.notify = parseInt(this.notify.join())
					}
					if (!this.editForm.notify) {
						this.$message({
							message: '请至少选择一种通知方式',
							type: 'warning'
						});
					} else {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							this.editForm.userType = this.userType;
							if (this.nowStatus == 'new') {
								saveUser(this.editForm).then((res) => {
									this.commonFun()
								});
							} else {
								udateUser(this.editForm).then(res => {
									this.commonFun()
								})
							}
						});
					}
				}
			});
		},
		commonFun () {
			this.editLoading = false;
			this.$message({
				message: '提交成功',
				type: 'success'
			});
			this.$refs['editForm'].resetFields();
			this.editFormVisible = false;
			this.getUsers();
		},
		advAllot (row) {
			// 广告主分配
			console.log('item', row)
			this.advVisible = true;
			this.userId = row.userId
			this.advList()
		},
		// 广告主分配列表
		advList () {
			let vm = this
			advSelect({ userId: this.userId }).then(res => {
				console.log(res)
				vm.advData = res.unselected;
				this.hasAdvList = res.selected
				console.log('获得得在广告主', vm.advData)
			})
		},
		// 保存广告主分配
		saveAdvAdmin () {
			if (this.advValue == '') {
				this.$message({
					message: '请选择广告主',
					type: 'warning'
				});
				return false
			}
			saveAdv({ userId: this.userId, adverlist: this.advValue }).then(res => {
				console.log('b保存成功', res)
				if (res) {
					this.$message({
						message: '保存成功',
						type: 'success'
					});
					this.advVisible = false;
					this.getUsers();
					this.advValue = []
				}
			})
		},
		// 删除广告主
		delAdv (id) {
			console.log(id)
			let data = []
			data.push(id)
			this.$confirm('确认删除该广告主吗?', '提示', {
				type: 'warning'
			}).then(() => {
				deleteAdv({ userId: this.userId, adverlist: data }).then(res => {
					console.log('删除成功', res)
					if (res) {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.advList()
						// this.hasadvVisible = false
						// this.getUsers();
					}
				})
			}).catch(() => { });
		},
		//已有广告主
		hasAdv (row) {
			this.hasadvVisible = true
			this.userId = row.userId
			this.advList()
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
		sendding (val) {
			sendTalk(val.userId).then(res => {
				if (res == true) {
					this.$message({
						message: '发送成功',
						type: 'success'
					});
				} else {
					this.$message({
						message: '发送失败',
						type: 'warning'
					});
				}
			})
		},
		renderFunc(h, option) {
			return <span title={option.name}>{option.name}</span>
		}
	},
	mounted () {
		this.getUsers();
	}
}

</script>

<style>
.hasAdv {
	padding: 0;
	margin: 0;
}
.hasAdv li {
	list-style: none;
	overflow: hidden;
	padding: 5px 0;
}
.hasAdv .el-button {
	float: right;
}
.userManager .el-transfer-panel {
	width: 300px;
}
</style>