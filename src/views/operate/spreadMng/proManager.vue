<template>
  <div>
    <div class="right-header">
      <div style="padding-bottom:6px">
        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        <span>{{advName}}</span>
      </div>
      <ul>
        <li>
          今日账户消耗：
          <b>{{baseData.today_cost}}</b> 元
        </li>
        <li>
          账户余额：
          <b>{{baseData.balance}}</b> 元
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">账户余额实时更新，仅供参考。今
              <br>日账号消耗不包含开屏联播数据，
              <br>仅包含品牌广告和竞价广告数据，
              <br>其中竞价广告包含新平台和旧平台
              <br>数据，数据每10分钟更新一次。
            </div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </li>
		<li class="today_cost" v-if="baseData.budget">
          账户日预算： 
          <b class="b">{{baseData.budget.budget}}</b> <span v-if="baseData.budget.budgetMode!='BUDGET_MODE_INFINITE'">元</span>
		  <span class="changeCost" @click="dialogVisible=true" v-if="userType!=3&&userType!=5">
			<i class="el-icon-edit" />
		</span>
        </li>
      </ul>
    </div>
    <div style="position:relative">
      <time-select class="time-select" @changeTime="getTime"></time-select>
      <el-tabs v-model="activeName" class="layout-detail" @tab-click="handleClick">
        <el-tab-pane label="广告组" name="group">
          <group v-if="activeName=='group'"></group>
        </el-tab-pane>
        <el-tab-pane label="广告计划" name="plan">
          <advplan v-if="activeName=='plan'"></advplan>
        </el-tab-pane>
        <el-tab-pane label="创意" name="creative">
          <creat v-if="activeName=='creative'"></creat>
        </el-tab-pane>
      </el-tabs>
    </div>
	<!-- 弹窗 -->
	<el-dialog
		title="修改日预算"
		:visible.sync="dialogVisible"
		width="30%">
		<el-form :model="downloadForm" ref="downloadForm"  :rules="ruleForm">
			<el-form-item label="账户日预算" >
				<el-radio-group v-model="downloadForm.budget_mode" size="medium" >
					<el-radio-button label="BUDGET_MODE_INFINITE" >不限</el-radio-button>
					<el-radio-button label="BUDGET_MODE_DAY">指定预算</el-radio-button>
				</el-radio-group>
			</el-form-item>
			<el-form-item label-width="82px" v-show="downloadForm.budget_mode!='BUDGET_MODE_INFINITE'" prop="budget">
				<el-input :rules="downloadForm.budget_mode!='BUDGET_MODE_INFINITE'?ruleForm.budget:[]" v-model="downloadForm.budget" placeholder="RMB"><span slot="append">元</span></el-input>
			</el-form-item>
		</el-form>
		
			
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" @click="submitBurget('downloadForm')">确 定</el-button>
		</span>
		</el-dialog>
  </div>
</template>
<script>
import { store } from "vuex";
import { getbaseInfo, chengeAdvStatus,updateTodayBudget } from "../../../api/admin";
export default {
  name: "rightcont",
  data() {
	 var checknumber = (rule, value, callback) => {
			console.log(value)
			// debugger
			if (!value) {
				return callback(new Error('请输入日预算'));
			}
			var reg = /^[0-9]+.?[0-9]*/;//判断字符串是否为数字//判断正整数/[1−9]+[0−9]∗]∗/ 
			if (!reg.test(value)) {
				return callback(new Error('数据格式不正确'));
			} else 
			{
				if (value < 1000) {
					return callback(new Error('您的预算设置，不能低于1000元'));
				} else if (value > 9999999.99) {
					return callback(new Error('您的预算设置，不能高于9999999.99元'));
				} else {
					callback();
				}
			}
		}
    return {
      groupList: [],
      listform: {
        adverid: "103780292228",
        date: "2018-11-29",
        operation: "ad-report"
      },
      advId: this.$store.state.titlemess.advId,
	  baseData: {},
	  dialogVisible:false,
	  downloadForm:{
		  budget_mode:'BUDGET_MODE_INFINITE',
		  budget:''
	  },
	  ruleForm:{
		  budget: [{ validator: checknumber, trigger: "blur" }]
	  }
    };
  },
  computed: {
    advName() {
      return this.$store.state.titlemess.advName;
    },
    isGroup() {
      return this.$store.state.titlemess.isGroup;
    },
    isCreat() {
      return this.$store.state.titlemess.isCreat;
    },
    activeName: {
      get: function() {
        return this.$store.state.titlemess.activeName;
      },
      set: function() {}
	},
	userType: function () {
		return this.$store.state.user.role;
	}
  },
  components: {
    group: resolve => require(["./group.vue"], resolve),
    advplan: resolve => require(["./advplan.vue"], resolve),
    creat: resolve => require(["./creat.vue"], resolve),
    timeSelect: resolve => require(["./timeselect.vue"], resolve)
  },
  mounted() {
    this.baseInfor();
  },
  methods: {
    baseInfor() {
      getbaseInfo(this.advId).then(res => {
		this.baseData = res;
		this.downloadForm.budget_mode=res.budget.budgetMode;
		if(res.budget.budget!='不限'){
			this.downloadForm.budget=res.budget.budget
		}
		
      });
    },
    handleClick(tab) {
      this.$store.commit("changeActive", tab.name);
      if (tab.name == "group") {
        this.$store.commit("getCreativeId", "");
        this.$store.commit("getCampaignId", "");
      } else if (tab.name == "plan") {
        // this.$store.commit("getCreativeId", "");
      }
    },
    getTime(val) {
      this.$store.commit("changeDate", val);
	},
	submitBurget(formName){
		 this.$refs[formName].validate((valid) => {
			if (valid) {
				this.downloadForm.advertiser_id=this.advId;
				updateTodayBudget(this.downloadForm).then(res=>{
					if(res.code==0){
						this.$message.success('修改成功');
						this.dialogVisible=false;
						this.baseInfor();
					}
				}).catch(rea=>{})
			} else {
				return false;
			}
        });
	}
  }
};
</script>
<style>
.layOut-right {
  margin-left: 212px;
  /* padding: 20px 40px; */
  box-sizing: border-box;
}
.time-select {
  position: absolute;
  z-index: 99;
  right: 40px;
  top: 10px;
}
.el-radio-button__inner{
	width: 90px;
}
</style>
