<template>
	<!-- <div class="layOut page-scroll"> -->
	<div class="right-table">
		<el-form ref="searchForm" :model="searchForm" class="tool-box">
			<el-row :gutter="10">
				<el-col :span="2">
					<el-form-item label label-width="0">
						<el-button type="primary" size="medium " @click="newChange">新建转化</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="2">
					<el-dropdown
						@command="changeStatus"
						trigger="click"
						style="padding: 6px 10px;border: 1px solid #ddd;margin-top: 4px;cursor: pointer;"
					>
						<span class="el-dropdown-link">操作
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="AD_CONVERT_OPT_STATUS_ENABLE">启用</el-dropdown-item>
							<el-dropdown-item command="AD_CONVERT_OPT_STATUS_PAUSE">暂停</el-dropdown-item>
							<el-dropdown-item command="AD_CONVERT_OPT_STATUS_DISABLE">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
				<el-col :span="3">
					<el-form-item label="状态筛选" label-width="70px">
						<el-select
							v-model="searchForm.optStatus"
							placeholder="操作"
							size="small"
							@change="getConvertList"
						>
							<el-option label="不限" value></el-option>
							<el-option label="启用" value="AD_CONVERT_OPT_STATUS_ENABLE"></el-option>
							<el-option label="暂停" value="AD_CONVERT_OPT_STATUS_PAUSE"></el-option>
							<el-option label="删除" value="AD_CONVERT_OPT_STATUS_DISABLE"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="5">
					<el-form-item label="转化跟踪方式" label-width="100px">
						<el-select
							v-model="searchForm.convert_source_type"
							placeholder="操作"
							size="small"
							@change="getConvertList"
						>
							<el-option label="全部" value=""></el-option>
							<el-option label="应用下载API" value="AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD"></el-option>
							<el-option label="落地页-API" value="AD_CONVERT_SOURCE_TYPE_H5_API"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3">
					<el-form-item label="转化目标" label-width="70px">
						<el-select v-model="searchForm.convert_type" placeholder="操作" size="small" @change="getConvertList">
							<el-option label="全部" value=""></el-option>
							<el-option label="激活" value="AD_CONVERT_TYPE_ACTIVE"></el-option>
							<el-option label="有效获客" value="AD_CONVERT_TYPE_CUSTOMER_EFFECTIVE"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-form-item label label-width="0px">
						<el-input
							placeholder="请输入转化id或名称"
							size="small"
							v-model="searchForm.convertIdOrName"
							class="input-with-select"
						>
							<el-button slot="append" icon="el-icon-search" @click="getConvertList"></el-button>
						</el-input>
					</el-form-item>
				</el-col>
				<!-- <el-col :span="5">
					<el-form-item>
						<el-date-picker
							size="small"
							v-model="time"
							type="daterange"
							popper-class="myRangePanel"
							unlink-panels
							:clearable="false"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							:picker-options="timeOptions"
							@change="changeTime"
						></el-date-picker>
					</el-form-item>
				</el-col> -->
			</el-row>
		</el-form>
		<el-table
			ref="multipleTable"
			border
			:data="convertList.content"
			tooltip-effect="dark"
			style="width: 100%"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="60"></el-table-column>
			<el-table-column label="序号">
				<template slot-scope="scope">{{scope.$index+1}}</template>
			</el-table-column>
			<el-table-column prop="opt_status" label="操作状态" width="120" :render-header="renderHeader">
				<template slot-scope="scope">
					{{scope.row.opt_status=='AD_CONVERT_OPT_STATUS_ENABLE'?'启用':scope.row.opt_status=='AD_CONVERT_OPT_STATUS_PAUSE'?'暂停':'删除'}}
				</template>
			</el-table-column>
			<el-table-column prop="name" label="名称" width="200" :render-header="nameRender">
				<template slot-scope="scope">
					<div>
						<router-link
							class="link"
							:to="{path:'/operate/toolCase/creat-change',query:{convertId:scope.row.id}}"
						>{{scope.row.name }}</router-link>
						<i class="el-icon-edit" aria-hidden="true" @click="editName(scope.row)"/>
						<span class="edit-part-transition" v-show="scope.row.show">
							<input type="text" v-model="value">
							<button class="btn-success" @click="submit(scope.row)">确认</button>
							<button class="btn-common" @click="close(scope.row)">取消</button>
						</span>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="转化ID"></el-table-column>
			<el-table-column prop="trackType" label="转化跟踪方式">
				<template slot-scope="scope">{{ scope.row.convert_source_type=='AD_CONVERT_SOURCE_TYPE_APP_DOWNLOAD'?'应用下载API':'落地页-API'}}</template>
			</el-table-column>
			<el-table-column prop="trackType" label="转化目标">
				<template slot-scope="scope">{{ scope.row.convert_type=='AD_CONVERT_TYPE_ACTIVE'?'激活':'有效获客'}}</template>
			</el-table-column>
			<el-table-column prop="convert_type" label="转化状态" :render-header="typeRender">
				<template slot-scope="scope">
					{{scope.row.convert_type=='AD_CONVERT_TYPE_ACTIVE'?'活跃':'未激活'}}
				</template>
			</el-table-column>
			<el-table-column prop="address" label="转化次数"></el-table-column>
			<el-table-column prop="createTime" label="创建时间"></el-table-column>
		</el-table>
		<!--分页-->
		<el-col :span="24">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:current-page="currentPage"
				:page-sizes="[20, 50, 100]"
				:page-size="searchForm.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="convertList.totalElements"
				style="float:right;padding:30px 0"
			></el-pagination>
		</el-col>
	</div>
</template>
<script>
import moment from 'moment'
import util from '../../../common/js/util'
import { convertList, changeConvertName, changeConvertStatus } from "@/api/admin"
export default {
	data () {
		return {
			value: '',
			convertList:{},
			convertIds: [],
			currentPage: 1,
			totalSize: 0,
			searchForm: {
				adverid: this.$store.state.titlemess.advId,
				page: 1,
				size: 20
			},
			time: [moment().subtract(30, 'days').format('YYYY-MM-DD'), moment().subtract(0, 'days').format('YYYY-MM-DD')],
			timeOptions: {
				shortcuts: [{
					text: '今天',
					onClick (picker) {
						const end = moment().format('YYYY-MM-DD');
						const start = moment().format('YYYY-MM-DD');
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '昨天',
					onClick (picker) {
						const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
						const start = moment().subtract(1, 'days').format('YYYY-MM-DD');
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '过去7天',
					onClick (picker) {
						const end = moment().subtract(1, 'days').format('YYYY-MM-DD');
						const start = moment().subtract(8, 'days').format('YYYY-MM-DD');
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '本月',
					onClick (picker) {
						const end = moment().format('YYYY-MM-DD');
						const start = moment().startOf("month").format('YYYY-MM-DD');
						picker.$emit('pick', [start, end]);
					}
				}, {
					text: '上个月',
					onClick (picker) {
						const end = moment().subtract('month', 1).endOf("month").format('YYYY-MM-DD');
						const start = moment().subtract('month', 1).startOf("month").format('YYYY-MM-DD');
						picker.$emit('pick', [start, end]);
					}
				}]
			},
		}
	},
	mounted () {
		this.getConvertList()
	},
	methods: {
		getConvertList () {
			// 获取转化列表
			// this.searchForm.startTime=this.time[0];
			// this.searchForm.endTime=this.time[1]
			convertList(this.searchForm).then(res => {
				this.convertList = res.data
			})
		},
		changeStatus (command) {
			// 改变列表状态
			if (this.convertIds.length < 1) {
				this.$message({
					message: '请选择需转化列',
					type: 'warning'
				});
			} else {
				changeConvertStatus({ adverid: this.$store.state.titlemess.advId, convertIds: this.convertIds, optStatus: command }).then(res => {
					if (res.code == 0) {
						this.alertSuccess('修改成功')
						this.getConvertList()
					}
				})
			}
		},
		handleSelectionChange (rows) {
			// checkbox
			this.convertIds = rows.map((item) => {
				return item.id
			})
		},
		renderHeader (h, { column, $index }) {
			return (
				<div>
					<span>操作状态 </span>
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">操作状态分为启用、暂停、删除。<br />
							启用表示数据可用,暂停表示数<br />
							据暂时不做同步且不能用于计划创<br />
							建时转化目标选择，删除则删除<br />该转化，不可以找回关系</div>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</div>
			)
		},
		nameRender (h, { column, $index }) {
			return (
				<div>
					<span>名称 </span>
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">唯一标注，用于创建广告计划时候<br />的转化目标选择</div>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</div>
			)
		},
		typeRender (h, { column, $index }) {
			return (
				<div>
					<span>转化状态 </span>
					<el-tooltip class="item" effect="dark" placement="top">
						<div slot="content">校验转化设置是否成功，分为未激<br />活和活跃两种状态。未激
						活表示<br />该转化未生成转化数据；活跃表示<br />该转化激活过，并将永久保持活跃<br />状态</div>
						<i class="el-icon-question"></i>
					</el-tooltip>
				</div>
			)
		},
		editName (val) {
			this.$set(val, 'show', true)
			this.value = val.name
		},
		close (val) {
			this.$set(val, 'show', false)
		},
		submit (val) {
			// 修改名称
			let param = {
				adverid: this.searchForm.adverId,
				convertId: val.id,
				name: this.value
			}
			changeConvertName(param).then(res => {
				if (res.code == 0) {
					this.alertSuccess('修改成功')
					this.close(val)
					this.getConvertList()
				} else {
					this.$message.error('修改失败');
				}
			})
		},
		handleCurrentChange (val) {
			this.searchForm.page = val;
			this.getConvertList()
		},
		handleSizeChange (val) {
			this.searchForm.size = val;
			this.getConvertList()
		},
		newChange () {
			this.$router.push({ path: '/operate/toolCase/new-change' })
		},
		alertSuccess (val) {
			this.$message({
				message: val,
				type: 'success'
			});
		},
		changeTime () {
			this.time = [moment(this.time[0]).format('YYYY-MM-DD'), moment(this.time[1]).format('YYYY-MM-DD')]
			this.getConvertList()
		}
	}
}
</script>

<style>
.tool-box {
	overflow: hidden;
}
.side-nav {
	padding: 10px;
	text-align: center;
	background: #fff;
}
.right-table {
	margin-left: 212px;
	padding: 20px 40px;
}
.right-table .el-table tr:hover i.el-icon-edit {
	visibility: visible;
}
.right-table .edit-part-transition {
	position: absolute;
}
.right-table .el-input-group__append {
	padding: 0 12px;
}

.right-table .el-date-editor--daterange.el-input__inner {
	width: 248px;
}
.right-table .el-button--medium {
	padding: 8px 12px;
}
</style>

	  