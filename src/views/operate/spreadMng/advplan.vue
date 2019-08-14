<template>
  <div>
	  <div style="overflow:hidden">
			<el-button type="primary" v-if="userType!=3&&userType!=5" size="medium" @click="newPlan" >新建广告计划</el-button>
			<el-popover placement="bottom" width="312" trigger="click" style="overflow:hidden">
			<!-- 展示数据 -->
			<search-options @updateheader="updateheader" type="plan"></search-options>
			<el-button
				slot="reference"
				size="medium"
				style="margin-left:20px"
				class="fr"
			>自定义列</el-button>
			</el-popover>
			<!-- <el-button size="medium" style="margin-bottom:20px;" @click="changWarning">批量修改预警</el-button> -->
			<el-button size="medium"  v-if="userType!=3&&userType!=5" class="fr" @click="changWarning">设置预警</el-button>
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
      :type="'plan'"
      @changeStatus="changePlanStatus"
      @changePopurse="changePopurse"
      @searchName="searchName"
      @clearAll="clearAll"
    />
    <table-headers
      :loading="listLoading"
      type="plan"
      :data="users"
      :total="total"
      @cell-click="switchTr"
      :sortorder="{prop:'cost',order:'descending'}"
      @mul-select="selectAll"
      @sortChange="sortChange"
      @showCopyDialog="showCopyDialog"
      @showCopyCreatDialog="showCopyCreatDialog"
      @showShowNameDialog="showShowNameDialog"
      @submitChange="submitNameChange"
      ref="table"
    ></table-headers>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      :page-sizes="[20, 50, 100]"
      :page-size="form.size"
      :current-page.sync="form.page"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize"
      style="float:right;padding:30px 0"
    ></el-pagination>
    <span class="edit-part-transition" v-show="show">
      <input type="text" v-model="value">
      <button class="btn-success" @click="submit">确认</button>
      <button class="btn-common" @click="close">取消</button>
    </span>
    <!-- 创建预警 -->
    <el-dialog
      :title="title"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      width="56%"
      :before-close="clearRule"
    >
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rulesForm"
        style="max-height: 310px;overflow-y: scroll;overflow-x: hidden;"
      >
        <el-row :gutter="10" :key="index" v-for="(rule,index) in editForm.ruleList">
          <el-col :span="5">
            <el-form-item :label="'规则'+(index+1)" label-width="70px">
              <el-select v-model="rule.k1" placeholder="请选择">
                <el-option
                  v-for="item in rules1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="达到"
              label-width="50px"
              :prop="'ruleList.'+index+'.v1'"
              :rules="(!editForm.ruleList[0].k2&&statusType=='own')?[]:rulesForm.v1"
            >
              <el-input v-model.number="rule.v1"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" label-width="10px">
            <el-form-item label="时"></el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label>
              <el-select v-model="rule.k2" placeholder="请选择" @change="changSelect(rule)">
                <el-option
                  v-for="item in rules"
                  :key="item.k2"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-if="rule.k2!==''&&!rule.isShow">
            <el-form-item label style="with:100">
              <el-select v-model="rule.op2" placeholder="请选择">
                <el-option
                  :key="index"
                  v-for="(item,index) in condition"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3" v-if="rule.k2!==''&&!rule.isShow">
            <el-form-item
              label
              label-width="0px"
              :prop="'ruleList.'+index+'.v2'"
              :rules="rulesForm.v2"
            >
              <el-input v-model.number="rule.v2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1" style="color:red" v-if="rule.alert">报警</el-col>
          <el-col :span="3">
            <img
              src="../../../../static/images/reduce.png"
              class="ruleImg"
              v-show="rule.reduce"
              @click="remove(rule)"
            >
            <img
              src="../../../../static/images/add.png"
              class="ruleImg"
              style="margin-left:10px"
              v-show="rule.add"
              @click="moreRule(rule)"
            >
          </el-col>
          <el-col :span="4" style="clear:both">
            <el-form-item label="状态" label-width="70px">
              <el-switch v-model="rule.status" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="计划状态" label-width="70px">
          <el-radio-group v-model="statusType">
            <el-radio label="none">不设置</el-radio>
            <el-radio label="own">自定义</el-radio>
          </el-radio-group>
          <el-transfer
            v-show="statusType=='own'"
            v-model="slectStatus"
            :titles="['状态', '已选状态']"
            :data="advStatus"
          ></el-transfer>
        </el-form-item>
      </el-form>
      <div class="ealy-warning">
        <p>说明</p>
        <p>1、展示数 达到 10000</p>
        <p>2、展示数 达到 10000 时 点击数 小于等于 200</p>
        <p>3、该指标达到预警设置时，您将收到钉钉消息通知与邮件通知</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="clearRule">取消</el-button>
        <!-- <el-button @click="resetForm('editForm')">重置</el-button> -->
        <el-button type="primary" @click.native="editSubmit('editForm')" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>
    <!-- 创意弹窗 -->
    <show-creat v-model="creatShow" :creatDetail="creatDetail"></show-creat>
    <copy-plan v-model="copyShow" :landingList="landingList" :transmitInfor="transmitInfor"></copy-plan>
    <!-- 批量操作 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span v-if="operate.ad_ids">当前选中{{operate.ad_ids.length}}条广告计划，确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="deleteGroup">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getadvPlan,
  chengeAdvStatus,
  chengePlanPrice,
  updatePlanPrice,
  addRules,
  seeRules,
  batchRules,
  deleteRule,
  copyPlan,
  landingtype,
  changePlanName,
  planCreative
} from "../../../api/admin";
export default {
  data() {
    var checknumber1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写"));
      }
      if (!Number.isInteger(value)) {
        return callback(new Error("请输入数字值"));
      } else {
        callback();
      }
    };
    return {
      listLoading: true,
      form: {
        adverId: this.$store.state.titlemess.advId,
        campId: "",
        size: 20,
        page: 1
      },
      users: [],
      value: 0,
      show: false,
      changeItem: {},
      type: "",
      editForm: {
        ruleList: [
          {
            k1: "show",
            op1: "ge",
            k2: "",
            status: 1,
            isShow: true,
            add: true,
            reduce: false
          }
        ],
        statusRule: {
          status: 1
        }
      },
      statusType: "none",
      rules: [
        { value: "", label: "不限" },
        // { value: 'buget', label: '预算' },
        { value: "show", label: "展示数" },
        { value: "click", label: "点击数" },
        { value: "cost", label: "总花费" },
        { value: "convert", label: "转化数" },
        { value: "convert_cost", label: "转化成本" }
      ],
      rules1: [
        { value: "show", label: "展示数" },
        { value: "click", label: "点击数" },
        { value: "cost", label: "总花费" },
        { value: "convert", label: "转化数" },
        { value: "convert_cost", label: "转化成本" }
      ],
      condition: [
        { label: "小于等于", value: "le" },
        { label: "大于等于", value: "ge" }
      ],
      total: {},
      editFormVisible: false,
      editLoading: false,
      ruleForm: {
        k1: "show",
        op1: "ge",
        k2: "",
        status: 1,
        isShow: true,
        add: true,
        reduce: true
      },
      warningList: [],
      title: "新建预警规则",
      rulesForm: {
        v1: [{ required: true, validator: checknumber1, trigger: "blur" }],
        v2: [{ required: true, validator: checknumber1, trigger: "blur" }]
      },
      ruleidList: [],
      datas: this.$route.query.data,
      copyShow: false,
      creatShow: false,
      transmitInfor: {},
      landingList: [],
      nameShow: false,
      creatDetail: {},
      dialogVisible: false,
      operate: {},
      totalSize: 0,
      currentPage: 1,
      advStatus: [
        { label: "投放中", key: "AD_STATUS_DELIVERY_OK" },
        { label: "部分投放中", key: "AD_STATUS_SOME_DELIVERY_OK" },
        { label: "计划新建", key: "AD_STATUS_CREATE" },
        { label: "审核不通过", key: "AD_STATUS_AUDIT_DENY" },
        { label: "新建审核中", key: "AD_STATUS_AUDIT" },
        { label: "修改审核中", key: "AD_STATUS_REAUDIT" },
        { label: "已暂停", key: "AD_STATUS_DISABLE" },
        { label: "已被广告组暂停", key: "AD_STATUS_CAMPAIGN_DISABLE" },
        { label: "未达到投放时间", key: "AD_STATUS_NOT_START" },
        { label: "广告计划超出预算", key: "AD_STATUS_BUDGET_EXCEED" },
        { label: "广告组超出预算", key: "AD_STATUS_CAMPAIGN_EXCEED" },
        { label: "账户余额不足", key: "AD_STATUS_BALANCE_EXCEED" },
        { label: "不在投放时段", key: "AD_STATUS_NO_SCHEDULE" },
        { label: "已完成", key: "AD_STATUS_DONE" }
      ],
      slectStatus: [],
      adsList: []
    };
  },
  name: "group",
  components: {
    searchOptions: resolve =>
      require(["@/components/ds-table/searchOptions.vue"], resolve),
    tableHeaders: resolve =>
      require(["@/components/ds-table/index.vue"], resolve),
    showCreat: resolve => require(["@/components/showCreat.vue"], resolve),
    filterTable: resolve =>
      require(["@/components/tableSelect/advGroup.vue"], resolve)
  },
  computed: {
    playId: function() {
      return this.$store.state.titlemess.campaign_id;
    },
    startDate: function() {
      return this.$store.state.titlemess.time;
    },
    adId: function() {
      return this.$store.state.titlemess.adId;
	},
	userType: function() {
		return this.$store.state.user.role;
	}
  },
  mounted() {
    if (this.adId) {
      this.form.adId = this.adId;
    }
    this.getUsers();
  },
  destroyed() {
    if (this.adId) {
      this.$store.commit("getadId", "");
    }
  },
  methods: {
    updateheader() {
      this.$refs.table.updateheader();
    },
    submitNameChange(data) {
      let self = this;
      let index = self.users.findIndex(a => {
        return a.id === data.adId;
      });
      var item = self.users[index];
      if (item.name == data.name) {
        data.callback();
        return false;
      }
      data.adverid = this.$store.state.titlemess.advId;
      changePlanName(data).then(res => {
        item.name = data.name;
        if (res.code == 0) {
          self.users.splice(index, 1, item);
          data.callback();
        }
      });
    },
    showCopyDialog(data) {
      this.transmitInfor = data;
      this.copyShow = true;
      this.copy();
    },
    copy() {
      landingtype({
        adverId: this.form.adverId,
        landingType: this.transmitInfor.landing_type
      }).then(res => {
        this.landingList = res.data;
      });
    },
    showCopyCreatDialog(data) {
      this.creatShow = true;
      this.creatDetail = data;
    },
    showShowNameDialog(data) {
      this.nameShow = true;
    },
    changeBid(data) {
      // this.nameShow = true;
    },
    close() {
      this.show = false;
    },
    getUsers() {
      this.listLoading = true;
      this.form.startDate = this.startDate[0];
      this.form.endDate = this.startDate[1];
      this.form.campId = this.playId || "";
      getadvPlan(this.form).then(res => {
        this.users = res.page.content;
        this.total = res.totals;
        this.totalSize = res.page.totalElements;
        this.listLoading = false;
      });
    },
    changePlanStatus(status) {
      this.form.page = 1;
      this.form.status = status;
      this.getUsers();
    },
    changePopurse(landingType) {
      this.form.page = 1;
      this.form.landingType = landingType;
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
    },
    sortChange(column) {
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
    submit() {
      if (this.type == "budget") {
        this.changeItem.budget = this.value;
        updatePlanPrice(this.changeItem).then(res => {
          if (res.code == 0) {
            this.$message({ message: "更新成功", type: "success" });
            this.show = false;
            this.getUsers();
            delete this.changeItem.budget;
            delete this.changeItem.ad_id;
          }
        });
      } else {
        this.changeItem.bid = this.value;
        chengePlanPrice(this.changeItem).then(res => {
          if (res.code == 0) {
            this.$message({ message: "更新成功", type: "success" });
            this.show = false;
            this.getUsers();
            delete this.changeItem.bid;
            delete this.changeItem.ad_ids;
          }
        });
      }
    },
    switchTr(row, column, cell, event) {
      let param = {};
      if (column.property == "opt_status") {
        let data = [];
        data.push(row.id);
        param = { ad_ids: data, advertiser_id: row.adverid };
        // debugger
        if (row.opt_status == "AD_STATUS_ENABLE") {
          param.opt_status = "enable";
        } else if (row.opt_status == "AD_STATUS_DISABLE") {
          param.opt_status = "disable";
        }
        this.updateStatus(param);
      } else if (column.property == "budget" || column.property == "cpa_bid") {
        this.type = column.property;
        let data = [];
        this.show = true;
        if (column.property == "budget") {
          this.value = row.budget;
          this.changeItem.ad_id = row.id;
        } else {
          this.value = row.cpa_bid;
          data.push(row.id);
          this.changeItem.ad_ids = data;
        }
        this.changeItem.advertiser_id = row.adverid;
      } else if (column.property == "ruleStatus" && row.ruleStatus != 0) {
        console.log(row);
        let arr = [];
        arr.push(row.id);
        this.ruleidList = arr;
        // 查看规则
        // this.lookrulue(row.id);
        this.changWarning(row.id);
      }
    },
    getIndexById: function(id) {
      var ids = this.users.map(a => {
        return a.id;
      });
      return ids.indexOf(id);
    },
    selectAll(val) {
      // 全选
      let arr = [];
      arr = val.map(v => {
        return v.id;
      });
      this.editForm.adList = arr;
      this.operate.ad_ids = arr;
    },
    changeStatus(status) {
      // 批量修改
      if (!this.operate.ad_ids || this.operate.ad_ids.length == 0) {
        this.$message({
          message: "请先选择一个或多个广告计划再进行此操作",
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
      chengeAdvStatus(param).then(res => {
        if (res.code == 0) {
          this.$message({ message: "更新成功", type: "success" });
        }
        this.dialogVisible = false;
        this.getUsers();
      });
    },
    changWarning(id) {
      // 批量修改
      this.adsList = id;
      if (id != "" && typeof id == "number") {
        this.editForm.adList = [];
        this.editForm.adList.push(id);
      }
      if (!this.editForm.adList || this.editForm.adList.length == 0) {
        this.$message({ message: "请选择广告计划", type: "warning" });
        return false;
      }
      this.title = "设置预警规则";
      this.editFormVisible = true;
      let param = this.editForm.adList.join(",");
      batchRules({ adids: param }).then(res => {
        if (res.ruleList) {
          let array = [];
          res.ruleList.map((item, index) => {
            array.push(
              Object.assign({}, item, { add: false }, { reduce: true })
            );
          });
          if (array[array.length - 1]) {
            array[array.length - 1].add = true;
            array[0].reduce = false;
          }
          this.editForm.ruleList = array;
        }
        this.editForm.statusRule = res.statusRule;
        if (res.statusRule.adStatus) {
          this.slectStatus = res.statusRule.adStatus.split(",");
          this.statusType = "own";
        }
      });
    },
    changSelect(term) {
      // 修改预警条件
      if (term.k2) {
        term.isShow = false;
        term.op2 = "le";
      } else {
        term.isShow = true;
        term.op2 = "";
      }
    },
    moreRule(rule) {
      // 新增规则
      console.log(this.editForm.ruleList[this.editForm.ruleList.length - 1].v1);
      if (
        this.editForm.ruleList[this.editForm.ruleList.length - 1].v1 ==
        undefined
      ) {
        this.$message.warning("请填写此条规则！");
        return false;
      }
      let newRule = JSON.parse(JSON.stringify(this.ruleForm));
      this.editForm.ruleList.push(newRule);
      rule.add = false;
      rule.reduce = true;
      this.warningList.push(rule);
      this.editForm.ruleList[0].reduce = false;
    },
    remove(relu) {
      // 删除规则
      if (relu.id) {
        deleteRule(relu.id).then(res => {
          console.log(res);
        });
      }
      var index = this.editForm.ruleList.indexOf(relu);
      if (index !== -1) {
        this.editForm.ruleList.splice(index, 1);
      }
      if (this.editForm.ruleList.length == 1) {
        this.editForm.ruleList[0].add = true;
      }
    },
    editSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.editLoading = true;

          if (this.slectStatus.length == 0 && !this.editForm.ruleList[0].v1) {
            this.$message.warning("请至少选择一种规则");
            return false;
          }
          console.log(this.editForm);
          if (this.slectStatus.length > 0) {
            this.editForm.statusRule.adStatus = this.slectStatus.join(",");
          }
          if (!this.editForm.ruleList[0].v1) {
            this.editForm.ruleList = [];
          }

          addRules(this.editForm).then(res => {
            if (res.status) {
              this.editLoading = false;
              this.$message({ message: "添加成功", type: "success" });
              this.getUsers();
              // this.clearRule();
              this.resetForm();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["editForm"].resetFields();
      this.clearRule();
      this.editForm.adList = [];
    },
    clearRule() {
      this.editFormVisible = false;
      this.editForm.ruleList = [
        {
          k1: "show",
          op1: "ge",
          k2: "",
          status: 1,
          isShow: true,
          add: true,
          reduce: false
        }
      ];
      this.slectStatus = [];
      this.statusType = "none";
      if (this.adsList != "" && typeof this.adsList == "number") {
        this.editForm.adList = [];
      }
    },
    newPlan() {
      // 创建广告计划
      let url = this.$router.resolve({ path: "/operate/newGroup/new-group" });
      window.open(url.href, "_blank");
    }
  },
  watch: {
    playId: function() {
      this.getUsers();
    },
    startDate: function() {
      this.getUsers();
    },
    statusType(val) {
      // debugger;
      if (val == "none") {
        this.slectStatus = [];
        if (this.editForm.statusRule) {
          this.editForm.statusRule.adStatus = "";
        }
      }
    }
  }
};
</script>
<style>
.ealy-warning {
  padding: 20px 30px 0;
  line-height: 24px;
}
.ruleImg {
  width: 20px;
  margin-top: 5px;
  cursor: pointer;
}
</style>


