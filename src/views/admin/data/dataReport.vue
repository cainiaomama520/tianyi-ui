<template>
  <section>
    <!--工具条-->
		<el-radio-group v-model="nowTable" style="margin: 20px 0;">
			<el-radio-button label="flow">信息流</el-radio-button>
			<el-radio-button label="income">GT收入</el-radio-button>
			<el-radio-button label="cost">GT成本</el-radio-button>
		</el-radio-group>
		<flow v-if="nowTable=='flow'"/>
		<income v-else-if="nowTable=='income'"/>
		<cost v-else/>
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
import { resolve } from 'path';
export default {
  data() {
    return {
			nowTable:'flow' 
    };
  },
  components: {
    income: resolve =>
      require(["./income.vue"], resolve),
    cost: resolve =>
			require(["./cost.vue"], resolve),
			flow:resolve=>{
				require(["./flow.vue"], resolve)
			}
  },
  methods: {   
   
  },
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