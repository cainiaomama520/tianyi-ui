<template>
  <!-- 弹窗选择转化目标 -->
  <el-dialog title="广告计划复制" :visible.sync="extendVisible" width="700px" @close="close" @open="open">
    <div class="copyPlan">
      <h4 v-if="extendVisible">复制广告计划：{{transmitInfor.name}}</h4>
      <div class="row-item">
        <div class="label-item label-size-middle">
          <div class="text-item">复制到广告组:</div>
        </div>
        <div class="byted-radio-group btn-group">
          <el-select v-model="value1" placeholder="请选择" size="medium">
            <el-option
              v-for="item in landingList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <span style="margin-left:20px" v-if="extendVisible">推广目的:{{transmitInfor.landing_type=='LINK'?'落地页':'App应用'}}</span>
        </div>
      </div>
    </div>
    <div slot="footer" style="margin-left: 460px;">
      <el-button @click.native="close">取消</el-button>
      <el-button type="primary" @click.native="copy">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {copyPlan} from '@/api/admin.js'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      extendVisible: this.value,
	  value1:'',
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false,
      required: false
	},
	transmitInfor:{
		type: Object
	},
	landingList:{
		type:Array,
		required:false
	}
  },
  mounted(){
  },
  methods: {
    sure() {},
    close() {
      this.$emit("input", false);
	},
	open(){
		this.value1=this.transmitInfor.campaignId;
	},
	copy(){
		this.close();
		let url = this.$router.resolve({path: '/operate/newPlan/new-plan',query:{campaignId:this.value1,adId:this.transmitInfor.id,landing_type:this.transmitInfor.landing_type,campaign_name:this.transmitInfor.campaignName}});
		setTimeout(()=>{
			window.open(url.href,'_blank')
		},1000)
	}
  },
  watch: {
    value: function(val) {
	  this.extendVisible = val;
    }
  }
};
</script>
<style>
.copyPlan h4 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #000;
}
.copyPlan .row-item {
  font-size: 12px;
}
</style>

