<template>
  <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
    <el-form-item label="时间范围" >
      <el-date-picker
        v-model="form.time"
        type="daterange"
        popper-class="myRangePanel"
        unlink-panels
        :clearable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="timeOptions"
		size="medium"
		style="width:250px"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="比较">
      <el-checkbox v-model="form.compare" @change="changeCompare"></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-date-picker
        v-model="form.comTime"
        type="daterange"
        popper-class="myRangePanel"
        unlink-panels
        :disabled="!form.compare"
        :clearable="false"
        @change="changeComtime"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="timeOptions"
		size="medium"
		style="width:250px"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="共">{{time_len}}天</el-form-item>
  </el-form>
</template>
<script>
import moment from 'moment'
import { timeOptions } from 'api/dataReport'
export default {
  data () {
    return {
      form: {
        time:[moment().subtract(7, 'days'), moment().subtract(1, 'days')],
        comTime: [moment().subtract(14, 'days'), moment().subtract(8, 'days')],
        compare: false
      },
      timeOptions: timeOptions
    }
  },
  props:["nowTime"],
  mounted(){
	  if(this.nowTime){
		this.form.time=this.nowTime
	  }
  },
  watch: {
    "form.time": function (time) {
      this.form.comTime = [moment(time[0]).subtract(this.time_len, "days"), moment(time[1]).subtract(this.time_len, "days")];
      this.$emit("changeTime", this.form);
    }
  },
  methods: {
	  changeCompare(){
		this.$emit("changeTime", this.form);
	  },
    changeComtime () {		
	  let tempTime = this.form.comTime[0];	  
      if (this.form.compare) {
        if (this.time_len == 1) {
          this.form.comTime[1] = moment(tempTime);
        } else {
          this.form.comTime[1] = moment(tempTime).add(this.time_len - 1, "days");
        }
        this.$emit("changeTime", this.form);
	  }	  
	}
  },
  computed: {
    time_len: function () {
      return moment(this.form.time[1]).diff(this.form.time[0], "days") + 1
    }
  }

}
</script>