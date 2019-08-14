<template >
  <div v-if="users">
	  <div style="overflow:hidden">
		<el-button type="primary" size="medium" @click="newGroup" v-if="userType!=3&&userType!=5">新建广告组</el-button>
		<el-popover placement="bottom" width="312" trigger="click" >
		<!-- 展示数据 -->
		<search-options @updateheader="updateheader" type="advgroup"></search-options>
		<el-button slot="reference" size="medium" class="fr">自定义列</el-button>
		</el-popover>
		<el-dropdown
		v-if="userType!=3&&userType!=5"
		@command="changeStatus"
		trigger="click"
		style="padding: 7px 10px;border: 1px solid #ddd;margin-right: 10px;cursor: pointer;float:right"
		>
		<span class="el-dropdown-link">
			批量操作
			<i class="el-icon-arrow-down el-icon--right"></i>
		</span>
		<el-dropdown-menu slot="dropdown">
			<el-dropdown-item command="enable">启用</el-dropdown-item>
			<el-dropdown-item command="disable">暂停</el-dropdown-item>
			<el-dropdown-item command="delete">删除</el-dropdown-item>
		</el-dropdown-menu>
		</el-dropdown>
	</div>
    <filter-table
      :type="'group'"
      @changeStatus="changeStatus"
      @changePopurse="changePopurse"
      @searchName="searchName"
      @clearAll="clearAll"
    ></filter-table>
    <table-headers
      :loading="listLoading"
      type="advgroup"
      :data="users"
      @cell-click="switchTr"
      @sortChange="sortChange"
      :sortorder="{prop:'cost',order:'descending'}"
      :total="total"
      @submitChange="submitNameChange"
      @mul-select="selectAll"
      ref="table"
    ></table-headers>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span v-if="operate.campaign_ids">当前选中{{operate.campaign_ids.length}}条广告组，确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteGroup">确 定</el-button>
      </span>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :page-sizes="[20, 50, 100]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      style="float:right;padding:30px 0"
    ></el-pagination>
  </div>
</template>
<script>
import {
  getGroupList,
  getadvGroup,
  changecampaignStatus,
  changeCampaignName
} from "../../../api/admin";
export default {
  data() {
    return {
      listLoading: true,
      form: {
        adverId: this.$store.state.titlemess.advId,
        page: 1,
        size: 20
      },
      users: [],
      total: {},
      value: "",
      dialogVisible: false,
      operate: {},
      totalSize: 0
    };
  },
  computed: {
    startDate: function() {
      return this.$store.state.titlemess.time;
	},
	userType: function() {
		return this.$store.state.user.role;
	}
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
  methods: {
    updateheader() {
      this.$refs.table.updateheader();
    },
    newGroup() {
      //   新建广告组
      let url = this.$router.resolve({ path: "/operate/newGroup/new-group" });
      window.open(url.href, "_blank");
    },
    submitNameChange(data) {
      let self = this;
      let index = self.users.findIndex(a => {
        return a.id === data.campaignId;
      });
      var item = self.users[index];
      if (item.name == data.name) {
        data.callback();
        return false;
      }
      data.adverid = this.$store.state.titlemess.advId;
      changeCampaignName(data).then(res => {
        item.name = data.name;
        if (res.code == 0) {
          self.users.splice(index, 1, item);
          data.callback();
        }
      });
    },
    getUsers() {
      this.listLoading = true;
      this.form.startDate = this.startDate[0];
      this.form.endDate = this.startDate[1];
      getadvGroup(this.form).then(res => {
        this.users = res.page.content;
        this.total = res.totals;
        this.listLoading = false;
        this.totalSize = res.page.totalElements;
      });
    },
    switchTr(row, column, cell, event) {
      if (column.property == "status") {
        let data = [];
        data.push(row.id);
        let param = { advertiser_id: row.adverid, campaign_ids: data };
        // debugger
        if (row.status == "CAMPAIGN_STATUS_ENABLE") {
          // 标识为已经启用
          param.opt_status = "enable";
        } else if (row.status == "CAMPAIGN_STATUS_DISABLE") {
          // 标识为已经禁用
          param.opt_status = "disable";
        }
        this.updateStatus(param);
      }
    },
    selectAll(val) {
      // 全选
      let arr = [];
      arr = val.map(v => {
        return v.id;
      });
      this.operate.campaign_ids = arr;
    },
    changeStatus(status) {
      // 批量修改
      if (!this.operate.campaign_ids || this.operate.campaign_ids.length == 0) {
        this.$message({
          message: "请先选择一个或多个广告组再进行此操作",
          type: "warning"
        });
        return false;
      }
      this.operate.opt_status = status;
      this.operate.advertiser_id = this.$store.state.titlemess.advId;
      if (status == "delete") {
        this.dialogVisible = true;
      } else {
        this.updateStatus(this.operate);
      }
    },
    deleteGroup() {
      // 确认删除广告组
      this.updateStatus(this.operate);
    },
    updateStatus(param) {
      // 更新状态
      changecampaignStatus(param).then(res => {
        if (res.code == 0) {
          this.$message({ message: "更新广告组状态成功", type: "success" });
          this.dialogVisible = false;
          delete this.operate.campaign_ids;
        }
        this.getUsers();
      });
    },
    getIndexById: function(id) {
      var ids = this.users.map(a => {
        return a.id;
      });
      return ids.indexOf(id);
    },
    sortChange(column) {
      console.log(column);
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
    },
    changeStatus(status) {
      this.form.status = status;
      this.form.page = 1;
      this.getUsers();
    },
    changePopurse(landingType) {
      this.form.landingType = landingType;
      this.form.page = 1;
      this.getUsers();
    },
    searchName(idOrName) {
      this.form.page = 1;
      this.form.idOrName = idOrName;
      this.getUsers();
    },
    clearAll() {
      delete this.form.status;
      delete this.form.landingType;
      delete this.form.idOrName;
      this.form.page = 1;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.form.size = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getUsers();
    }
  },
  created() {
    this.getUsers();
  },
  watch: {
    startDate: function() {
      this.getUsers();
    }
  }
};
</script>

