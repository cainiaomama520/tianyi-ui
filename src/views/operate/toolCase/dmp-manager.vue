<template>
	<div class="too-case-box">
		<div class="right-table">
			<search-box @search="search" :personList="personList"></search-box>
			<el-button
				type="primary"
				style="width:100px;padding: 10px;margin-bottom:20px"
				@click="editFormVisible=true"
			>
				<i class="el-icon-upload2"></i>上传人群
			</el-button>
			<el-card class="box-card">
				<el-table
					ref="multipleTable"
					:data="tableList.content"
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange"
					@sort-change="sortChange"
				>
					<el-table-column prop="name" label="名称" width="200">
						<template slot-scope="scope">
							<div>
								<router-link
									:to="{path:'/operate/toolCase/dmpDetail',query:{id:scope.row.custom_audience_id}}"
									class="link"
									target="_blank"
								>{{ scope.row.name }}</router-link>
								<i class="el-icon-edit" aria-hidden="true" @click="editName(scope.row)"/>
								<span class="edit-part-transition" v-show="scope.row.show">
									<input type="text" v-model="value">
									<button class="btn-success" @click="submit(scope.row)">确认</button>
									<button class="btn-common" @click="close(scope.row)">取消</button>
								</span>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="状态">
						<template slot-scope="scope">{{filterStatus(scope.row.status)}}</template>
					</el-table-column>
					<el-table-column prop="cover_num" label="全部覆盖人数" sortable="custom"></el-table-column>
					<el-table-column prop="custom_audience_id" label="人群ID" sortable="custom"></el-table-column>
					<el-table-column prop="source" label="类别">
						<template slot-scope="scope">
							{{filterSource(scope.row.source)}}
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="创建时间" sortable="custom"></el-table-column>
					<el-table-column fixed="right" label="操作" width="220">
						<template slot-scope="scope">
							<el-button @click.native.prevent="extendRow(scope.row)" type="text" :disabled="(scope.row.source=='CUSTOM_AUDIENCE_TYPE_EXTEND'||filterDis(scope.row.status))?true:false" size="small">扩展</el-button>
							<el-button @click.native.prevent="sendRow(scope.row)" type="text" :disabled="filterDis(scope.row.status)" size="small">推送</el-button>							
							<el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
			<!--分页-->
			<el-col :span="24">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					background
					:current-page="currentPage"
					:page-sizes="[20, 50, 100]"
					:page-size="searchForm.offset"
					layout="total, sizes, prev, pager, next, jumper"
					:total="tableList.totalElements"
					style="float:right;padding:30px 0"
				></el-pagination>
			</el-col>
		</div>
		<!-- 上传人群 -->
		<upload-per :editFormVisible.native="editFormVisible" @upload="upload" @cancel="cancel" :personList="personList"></upload-per>
		<!-- 扩展操作 -->
		<extend-modal
			:extendVisible="extendVisible"
			@cancel="cancel"
			@extendSuccess="extendSuccess"
			:personList="personList"
			:expertModal="expertModal"
		></extend-modal>
		<!-- 推送 -->
		<el-dialog title="推送至本账户" :visible.sync="sendVisible" width="600px">
			<div class="row-item margin0" style="margin-left: 50px;">
				<div class="label-item label-size-middle label-size-reset">
					<div class="text-item">推送产品</div>
					<div class="required-item" style="left: 75px;top: 9px;"></div>
				</div>
				<div class="byted-radio-group btn-group">
					<el-radio-group v-model="send">
						<el-radio-button label="1">效果</el-radio-button>
						<el-radio-button label="2">效果+品牌</el-radio-button>
					</el-radio-group>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="sendVisible = false">取消</el-button>
				<el-button type="primary" @click.native="saveMenu">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { dmplist, deleteDmp, getPerGroup, pushDmp, changeDmpName } from '../../../api/admin.js'
export default {
	data: function () {
		return {
			value: '',
			searchForm: {
				advertiser_id: this.$store.state.titlemess.advId,
				select_type: 0,
				page: 1,
				size: 20
			},
			tableList: {},
			currentPage: 1,
			totalSize: 0,
			editFormVisible: false,
			extendVisible: false,
			sendVisible: false,
			send: '',
			personList: [],
			expertModal: {},
			disabled:false
		}
	},
	components: {
		'search-box': resolve => require(["../toolCase/templete/searchBox.vue"], resolve),
		uploadPer: resolve => require(["../toolCase/templete/uploadPer.vue"], resolve),
		extendModal: resolve => require(["../toolCase/templete/extendModal.vue"], resolve)
	},
	mounted () {
		this.getDmpList();
		this.getPerson()
	},
	methods: {
		search (val) {
			console.log('传回的值',val)
			this.searchForm=val
			this.searchForm.select_type= 0
			this.searchForm.page= 1
			this.searchForm.size= 20
			// Object.assign(this.searchForm, val);
			this.getDmpList()
		},
		filterDis(val){
			if(val==-1||val==8||val==9||val==13||val==3||val==4||val==12){
				return true
			}else{
				return false
			}
		},
		cancel (isshow) {
			// 关闭弹窗
			this.editFormVisible = isshow;
			this.extendVisible = isshow
		},
		upload(val){
			console.log(val,121333)
			this.getDmpList()
		},
		extendSuccess(){
			this.getDmpList()
		},
		handleSelectionChange () { },
		editName (val) {
			this.$set(val, 'show', true);
			this.value = val.name;
		},
		sortChange(row,column){
			this.searchForm.properties=row.prop;
			if(row.order=='ascending'){
				this.searchForm.direction='ASC'
			}else if(row.order=='descending'){
				this.searchForm.direction='DESC'
			}
			this.getDmpList()
		},
		close (val) {
			this.$set(val, 'show', false)
		},
		submit (val) {
			let param = {
				adverid: this.searchForm.advertiser_id,
				audienceId: val.custom_audience_id,
				name: this.value
			}
			changeDmpName(param).then(res => {
				if (res.code == 0) {
					this.$message({
						message: '修改成功',
						type: 'success'
					});
				}
				this.getDmpList();
				this.close(val)
			})
		},
		filterSource(val){
			switch(val){
				case 'CUSTOM_AUDIENCE_TYPE_UPLOAD':
				return '上传';
				break;
				case'CUSTOM_AUDIENCE_TYPE_EXTEND':
				return '扩展'
				break;
				case'CUSTOM_AUDIENCE_TYPE_RULE':
				return '运算'
				break;
				case'CUSTOM_AUDIENCE_TYPE_PACK_RULE':
				return '规则'
				break;
				case 'CUSTOM_AUDIENCE_TYPE_DATA_SOURCE':
				return 'API';
				break;
				case 'CUSTOM_AUDIENCE_TYPE_THEME':
				return '主题人群';
				break;
				default:
				return 'API' 
			}
		},
		filterStatus(val){
			switch(val){
				case -1:
				return '可用 全部';
				break;
				case 0:
				return '校验中';
				break;
				case 1:
				return '覆盖校验中'
				break;
				case 2:
				return '可用 已生效';
				break;
				case 3:
				return '校验失败';
				break;
				case 4:
				return '覆盖人数过少';
				break;
				case 5:
				return '待预估';
				break;
				case 6:
				return '扩展中';
				break;
				case 7:
				return '扩展失败';
				break;
				case 8:
				return '不可用 计算中';
				break;
				case 9:
				return '运算失败';
				break;
				case 10:
				return '可用 推送完成';
				break;
				case 11:
				return '已过期';
				break;
				case 12:
				return '等待拓展';
				break;
				case 13:
				return '不可用 等待计算';
				break;
				case 14:
				return '可用 推送中';
				break;
				case 15:
				return '推送失败';
				break;
				case 16:
				return '等待二次检查';
				break;
				case 17:
				return '等待重新刷新';
				break;
				case 18:
				return '历史包looklike拓展';
				break;
				case 19:
				return '历史包BI覆盖校验';
				break;
				case 20:
				return '任务处理中';
				break;
				case 21:
				return '等待外部系统处理';
				break;
				case 22:
				return '被用户删除';
				break;
				case 23:
				return '已从abase删除';
				break;
				case -2:
				return '不可用 全部';
				break;
				default:
				return '不可用 计算失败'
			}
		},
		handleCurrentChange (val) {
			this.searchForm.page = val;
			this.getDmpList()
		},
		handleSizeChange (val) {
			this.searchForm.page = val;
			this.getDmpList()
		},
		extendRow (item) {
			this.extendVisible = true;
			this.expertModal = item;
			console.log(item)
		},
		sendRow (item) {
			let arr = [];
			arr.push(this.searchForm.advertiser_id)
			let param = {
				advertiser_id: this.searchForm.advertiser_id,
				custom_audience_id: item.custom_audience_id,
				// target_advertiser_ids: arr
			}
			pushDmp(param).then(res => {
				if (res.code == 0) {
					this.$message({
						message: '推送成功',
						type: 'success'
					});
				}
			})
			// this.sendVisible = true
		},
		deleteRow (item) {
			console.log(item)
			const h = this.$createElement;
			this.$msgbox({
				title: '确认要删除所选人群包？',
				message: h('div', null, [
					h('p', null, '1.投放管理平台-定向-自定义人群列表中也将同步该人群包。 '),
					h('p', null,'2.删除后不可恢复。')
				]),
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				beforeClose: (action, instance, done) => {
					if (action === 'confirm') {
						this.delete(item)
						done();
					} else {
						done();
					}
				}
			}).then(action => {
			});
		},
		getDmpList () {
			// 列表
			dmplist(this.searchForm).then(res => {
				this.tableList = res.data
			})
		},
		delete (item) {
			deleteDmp({ advertiser_id: this.searchForm.advertiser_id, custom_audience_id: item.custom_audience_id }).then(res => {
				if (res.code == 0) {
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getDmpList();
				}
			})
		},
		getPerson () {
			// 获取人群包
			getPerGroup({ adverid: this.searchForm.advertiser_id }).then(res => {
				this.personList = res.data;
			})
		}
	}
}
</script>
<style>
.too-case-box .btn-group {
	margin-left: 20px;
}
.too-case-box .required-item {
	left: 120px;
}
.too-case-box .row-item {
	position: relative;
}
</style>




