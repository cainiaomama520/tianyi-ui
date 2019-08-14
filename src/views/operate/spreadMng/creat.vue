<template>
	<div v-if="users">
		<div style="overflow:hidden">
			<el-button type="primary" size="medium" v-if="userType!=3&&userType!=5"  @click="newCreat">新建创意</el-button>
			<el-popover placement="bottom" width="312" trigger="click">
				<!-- 展示数据 -->
				<search-options @updateheader="updateheader" type="creat"></search-options>
				<el-button slot="reference" class="fr" size="medium">自定义列</el-button>
			</el-popover>
		</div>
		<filter-table
			:type="'creat'"
			@changeStatus="changeStatus"
			@changePopurse="changePopurse"
			@searchName="searchName"
			@clearAll="clearAll"
			@changeFormat="changeFormat"
		/>
		<table-headers
			:loading="listLoading"
			type="creat"
			:data="users"
			:total="totals"
			@cell-click="switchTr"
			@sortChange="sortChange"
			:sortorder="{prop:'cost',order:'descending'}"
			ref="table"
		></table-headers>
		<el-col :span="24">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				background
				:page-sizes="[10, 20, 50]"
				:page-size="form.size"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totalSize"
				:current-page.sync="form.page"
				style="float:right;padding:30px 0"
			></el-pagination>
		</el-col>
	</div>
</template>
<script>
import {
	getGroupList,
	getadvCreat,
	changecreativeStatus
} from "../../../api/admin";
export default {
	data () {
		return {
			listLoading: true,
			form: {
				adverId: this.$store.state.titlemess.advId,
				campId: this.$store.state.titlemess.campaign_id || "",
				adId: "",
				size: 10,
				page: 1
			},
			total: 0,
			users: [],
			currentPage: 1,
			tableHeight: 50,
			totals: {},
			totalSize: 0
		};
	},
	name: "group",
	components: {
		searchOptions: resolve =>
			require(["@/components/ds-table/searchOptions.vue"], resolve),
		tableHeaders: resolve =>
			require(["@/components/ds-table/index.vue"], resolve),
		filterTable: resolve =>
			require(["@/components/tableSelect/advGroup.vue"], resolve)
	},
	computed: {
		creative_id: function () {
			return this.$store.state.titlemess.creative_id;
		},
		startDate: function () {
			return this.$store.state.titlemess.time;
		},
		userType: function () {
			return this.$store.state.user.role;
		}
	},
	methods: {
		updateheader () {
			this.$refs.table.updateheader();
		},
		newCreat () {
			// 创建广告计划
			let str = window.location.origin + "/#/operate/newCreat/choicePlan";
			window.open(str);
			// this.$router.push({path:'/operate/newCreat/choicePlan'})
		},
		getUsers () {
			this.listLoading = true;
			this.form.startDate = this.startDate[0];
			this.form.endDate = this.startDate[1];
			this.form.adId = this.creative_id || "";
			getadvCreat(this.form).then(res => {
				this.users = res.page.content;
				this.totals = res.totals;
				this.listLoading = false;
				this.totalSize = res.page.totalElements;
			});
		},
		switchTr (row, column, cell, event) {
			if (column.property == "opt_status") {
				let data = [];
				data.push(row.id);
				let param = { advertiser_id: row.adverid, creative_ids: data };
				if (row.opt_status == "CREATIVE_STATUS_DISABLE") {
					param.opt_status = "disable";
				} else if (row.opt_status == "CREATIVE_STATUS_ENABLE") {
					param.opt_status = "enable";
				}
				changecreativeStatus(param).then(res => {
					if (res) {
						this.$message({ message: "更新成功", type: "success" });
					} else {
						this.$message({ message: "跟新失败", type: "warning" });
					}
					this.getUsers();
				});
			}
		},
		getIndexById: function (id) {
			var ids = this.users.map(a => {
				return a.id;
			});
			return ids.indexOf(id);
		},
		changeStatus (status) {
			this.form.status = status;
			this.form.page = 1;
			this.getUsers();
		},
		changePopurse (landingType) {
			this.form.landingType = landingType;
			this.form.page = 1;
			this.getUsers();
		},
		searchName (idOrName) {
			this.form.page = 1;
			this.form.idOrName = idOrName;
			this.getUsers();
		},
		changeFormat (format) {
			this.form.page = 1;
			this.form.format = format;
			this.getUsers();
		},
		clearAll () {
			delete this.form.status;
			delete this.form.landingType;
			delete this.form.idOrName;
			this.form.page = 1;
			this.getUsers();
		},
		handleSizeChange (val) {
			this.form.size = val;
			this.getUsers();
		},
		handleCurrentChange (val) {
			this.form.page = val;
			this.getUsers();
		},
		sortChange (column) {
			let arr = [];
			let direction = "";
			if (column.order == "ascending") {
				direction = "asc";
			} else if (column.order == "descending") {
				direction = "desc";
			}
			arr.push(column.prop, direction);
			this.form.sort = arr.join(",");
			this.getUsers();
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.getUsers();
			// let self = this;
			// console.log('adadaa',this.$refs.table)
			// this.tableHeight = this.$refs.table.$el.offsetHeight;

			//     // 通过捕获系统的onresize事件触发去改变原有的高度
			// window.onresize = function() {
			//     self.tableHeight = self.$refs.table.$el.offsetHeight
			// }
		});
	},
	watch: {
		creative_id: function () {
			this.getUsers();
		},
		startDate: function () {
			this.getUsers();
		}
	}
};
</script>
