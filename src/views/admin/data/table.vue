<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="时间段：">
          <el-select v-model="filters.value" placeholder="请选择" @change="changeTime">
            <el-option
              v-for="item in selectItem"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="selectdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :disabled="disabled"
            end-placeholder="结束日期"
            @change="selectTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="代理商">
          <el-select v-model="searchForm.agentid" filterable placeholder="请选择代理商">
            <el-option v-for="item in agentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
		<el-form-item label="广告主：">
			<el-input placeholder="请输入广告主ID或名称" v-model="searchForm.nameOrId" clearable></el-input>
		</el-form-item>
        <el-form-item label="总消耗：">
          <span>{{allCost}}元</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers" size="medium">查询</el-button>
        </el-form-item>
        <el-col :span="24" style="text-align: right;">
          <el-button size="medium" class="fr" @click="dialogVisible=true">导出报表</el-button>
          <el-popover placement="bottom" width="312" trigger="click" style="overflow:hidden">
            <!-- 展示数据 -->
            <search-options @updateheader="updateheader" type="operator"></search-options>
            <el-button slot="reference" size="medium" style="margin-bottom:20px;" class="fr">自定义列</el-button>
          </el-popover>
        </el-col>
      </el-form>
    </el-col>
    <table-headers
      :showCheckBox="false"
      :showSummary="false"
      :loading="listLoading"
      type="operator"
      :data="users"
      :total="totals"
      :sortorder="{prop:'cost',order:'descending'}"
      ref="table"
    ></table-headers>
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
        :total="totalSize"
        style="float:right;padding:30px 0"
      ></el-pagination>
    </el-col>
    <!-- 弹窗 -->
    <el-dialog title="导出方式" :visible.sync="dialogVisible" width="30%">
      <el-radio-group v-model="searchForm.exportType">
        <el-radio :label="1">分日导出</el-radio>
        <el-radio :label="2">汇总导出</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="downloadFile">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import moment from "moment";
import axios from "axios";
import util from "../../../common/js/util";
import {
  dataTotal,
  totalCost,
  agentSelect,
  downloadAdvExport
} from "../../../api/admin";
export default {
  data() {
    return {
      totals: {},
      filters: {
        name: "",
        value: 1
      },
      searchForm: {
        page: 1,
        size: 20,
        exportType: 1,
        agentid: ""
      },
      allCost: 0,
      totalPages: 1,
      totalSize: 10,
      selectdate: [
        util.formatDate.format(new Date(), "yyyy-MM-dd"),
        util.formatDate.format(new Date(), "yyyy-MM-dd")
      ],
      selectItem: [
        { id: 1, label: "过去7天" },
        { id: 2, label: "今日" },
        { id: 3, label: "昨日" },
        { id: 4, label: "过去30日" },
        { id: 5, label: "上个自然月" },
        { id: 6, label: "上个季度" },
        { id: 7, label: "自定义" }
      ],
      currentPage: 1,
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      disabled: true,
      isIndeterminate: true,
      agentList: [],
      pickerOptions: {
        disabledDate(time) {}
      },
      dialogVisible: false,
      downloadForm: {},
      serverUrl: process.env.BASE_API,
      token: this.$store.state.user.token
    };
  },
  components: {
    searchOptions: resolve =>
      require(["@/components/ds-table/searchOptions.vue"], resolve),
    tableHeaders: resolve =>
      require(["@/components/ds-table/index.vue"], resolve)
  },
  methods: {
    updateheader() {
      this.$refs.table.updateheader();
    },
    changeTime(val) {
      const date = new Date();
      let d1 = "";
      let d2 = "";
      //转换时间
      function commonFun(i) {
        return date.setTime(date.getTime() + 3600 * 1000 * 24 * i);
      }
      //格式化时间
      function formatTime(date) {
        return util.formatDate.format(new Date(date), "yyyy-MM-dd");
      }
      //1代表过去7天，2代表今天，3代表昨日，4代表过去30天，5代表上个自然月，6代表上个季度，7代表自定义
      switch (val) {
        case 1:
          d1 = formatTime(commonFun(-1));
          d2 = formatTime(commonFun(-6));
          this.disabled = true;
          break;
        case 2:
          d1 = formatTime(commonFun(0));
          d2 = formatTime(commonFun(0));
          this.disabled = true;
          break;
        case 3:
          d1 = formatTime(commonFun(-1));
          d2 = formatTime(commonFun(0));
          this.disabled = true;
          break;
        case 4:
          d1 = formatTime(commonFun(-1));
          d2 = formatTime(commonFun(-29));
          this.disabled = true;
          break;
        case 5:
          d1 = moment()
            .subtract("month", 1)
            .endOf("month")
            .format("YYYY-MM-DD");
          d2 = moment()
            .subtract("month", 1)
            .startOf("month")
            .format("YYYY-MM-DD");
          this.disabled = true;
          break;
        case 6:
          d2 = moment()
            .quarter(moment().quarter() - 1)
            .startOf("quarter")
            .format("YYYY-MM-DD");
          d1 = moment()
            .quarter(moment().quarter() - 1)
            .endOf("quarter")
            .format("YYYY-MM-DD");
          this.disabled = true;
          break;
        default:
          this.disabled = false;
      }
      this.selectdate = [];
      if (val != 7) {
        this.selectdate.push(d2, d1);
        this.searchForm.startDate = this.selectdate[0];
        this.searchForm.endDate = this.selectdate[1];
        this.gettotalCost();
        this.getUsers();
      }
    },
    selectTime(time) {
      // 自定义时间
      this.searchForm.startDate = time[0];
      this.searchForm.endDate = time[1];
    },
    buidSearchArray: function(val) {
      console.log("父级取值", val);
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getUsers();
    },
    handleSizeChange(val) {
      this.searchForm.size = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers() {
      this.listLoading = true;
      dataTotal(this.searchForm).then(res => {
        this.listLoading = false;
        this.users = res.content;
        this.totalPages = res.totalPages;
        this.totalSize = res.totalElements;
        this.gettotalCost();
      });
    },
    gettotalCost() {
      totalCost(this.searchForm).then(res => {
        console.log("总消耗", res);
        this.allCost = res;
      });
    },
    selects() {
      // 筛选代理商
      agentSelect().then(res => {
        this.agentList = res;
      });
    },
    downloadFile() {
      // 下载报表 
      // downloadAdvExport().then()
      axios.defaults.headers.get["Content-Type"] = "application/csv";

      let url =
        this.serverUrl +
        "/biz/export/advertiser?agentid=" +
        this.searchForm.agentid +
        "&startDate=" +
        this.searchForm.startDate +
        "&endDate=" +
        this.searchForm.endDate +
        "&exportType=" +
        this.searchForm.exportType +
        "&token=" +
        this.token;
		console.log(url)
      downloadAdvExport(this.searchForm, { responseType: "arraybuffer" }).then(
        res => {
          if (res) {
            window.open(url, "_blank");
          }
        }
      );
    }
  },
  mounted() {
    this.changeTime(1);
    this.selects();
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