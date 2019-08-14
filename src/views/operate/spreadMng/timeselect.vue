<template>
  <div>
    <el-date-picker
      v-model="time"
      type="daterange"
      popper-class="myRangePanel"
      unlink-panels
      :clearable="false"
      format="yyyy-MM-dd"
      @change="changeTime"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="timeOptions"
	  size="small"
    ></el-date-picker>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      form: {},
      time: [moment().subtract(), moment().subtract()],
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
            const end = moment().subtract('month', 1).endOf("month").format('YYYY-MM-DD');;
            const start = moment().subtract('month', 1).startOf("month").format('YYYY-MM-DD');
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  name: 'timeSelect',
  methods: {
    changeTime (val) {
	  this.time=[moment(this.time[0]).format('YYYY-MM-DD'),moment(this.time[1]).format('YYYY-MM-DD')]
	  this.$store.commit("changeDate", this.time);
	  this.$emit('changeTime', this.time)
	  console.log('时间', this.time)
    }
  },
  mounted () {
	  this.changeTime(this.time)
	
  }
}
</script>

