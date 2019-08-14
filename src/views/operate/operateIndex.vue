<template >
  <div class="operaterIndex common-cotain">
    <p
      class="gray"
      style="font-size:12px;padding:20px 0"
    >数据说明：10分钟更新一次，“今日账户消耗” 和 “账户消耗” ，仅包含竞价广告和品牌广告数据，不包含开展联播数据</p>
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="money-block">
          <span>
            今日账户消耗
            <span>
              <span class="number">{{vital.today_cost}}</span>元
            </span>
          </span>
          <span>
            账户总余额
            <span>
              <span class="number">{{vital.valid_total_balance}}</span>元(可用{{vital.valid_total_balance}}元)
            </span>
          </span>
        </div>
        <div class="money-block m-t">
          <span>
            现金余额
            <span>
              <span class="number">{{vital.valid_cash}}</span>元(可用{{vital.valid_cash}}元)
            </span>
          </span>
          <span>
            赠款
            <span>
              <span class="number">{{vital.valid_grant}}</span>元(可用{{vital.valid_grant}}元)
            </span>
          </span>
        </div>
      </el-col>
      <!-- <el-col :span="10">
        <div id="index-status" class="status-block">
          <div class="status-title">
            广告统计
            <span>不包含已删除及旧平台的广告计划</span>
          </div>
          <div class="status-content">
            <span>
              待审核：
              <span class="number">0</span>
            </span>
            <span>
              未通过：
              <span class="number">1</span>
            </span>
            <span>
              预算不足：
              <span class="number">0</span>
            </span>
          </div>
        </div>
      </el-col> -->
    </el-row>
    <div class="bottom-edge"></div>
    <div class="select-time">
      <label>账户消耗</label>
      <ul class="adminSelect">
        <li :class="nowSelect=='1'?'active':''" @click="selectTime('1')">今天</li>
        <li :class="nowSelect=='2'?'active':''" @click="selectTime('2')">昨天</li>
        <li :class="nowSelect=='3'?'active':''" @click="selectTime('3')">过去7天</li>
        <li :class="nowSelect=='4'?'active':''" @click="selectTime('4')">过去30天</li>
      </ul>
    </div>

    <table class="table-section">
      <thead>
        <tr>
          <th>总花费(元)</th>
          <th>展示数</th>
          <th>点击数</th>
          <th>点击率</th>
          <th>平均点击单价(元)</th>
          <th>平均千次展现费用(元)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{tableData.stat_cost}}</td>
          <td>{{tableData.show}}</td>
          <td>{{tableData.click}}</td>
          <td>{{tableData.ctr}}%</td>
          <td>{{tableData.click_cost}}</td>
          <td>{{tableData.ecpm}}</td>
        </tr>
      </tbody>
    </table>
	<div class="hcharts-graph">
		<div class="btn-group-part">
			<div class="btn-group btn-group-lg">
				<span class="btn btn-default " :class="classArr.indexOf(item.lable)>-1?'active':''"  v-for="(item,index) in compares" @click="activeNow(item,index)">{{item.lable}}</span>
				<!-- <span class="btn btn-default">点击数</span>
				<span class="btn btn-default">点击率</span>
				<span class="btn btn-default">平均点击单价(元)</span>
				<span class="btn btn-default">平均千次展现费用(元)</span>
				<span class="btn btn-default">总花费(元)</span> -->
			</div>
		</div>
		<echart :chartData="lineChartData"  v-if="legendData.length>0" :legendData="legendData"></echart>
	</div>
    
  </div>
</template>
<script>
import { getIndexTop, getIndexEchart,getIndexList} from '../../api/admin'
import moment from 'moment'
import { store } from 'vuex';
export default {
  data () {
    return {
      nowSelect: '1',
      tableData: {},
      lineChartData: {},
      form: {},
      advId: this.$store.state.titlemess.advId,
	  vital: {},
	  compares:[{
		  lable:'展示数',
		  value:'show'
	  },{
		  lable:'点击数',
		  value:'click'
	  },{
		  lable:'点击率',
		  value:'ctr'
	  },{
		  lable:'平均点击单价(元)',
		  value:'click_cost'
	  },{
		  lable:'平均千次展现费用(元)',
		  value:'ecpm'
	  },{
		  lable:'总花费(元)',
		  value:'stat_cost'
	  }],
	  legendData:[
		  { lable:'展示数',value:'show'},{
		  lable:'点击数',
		  value:'click'
	  }],
	  classArr:['展示数','点击数']  
    }
  },
  components: {
    echart: resolve => require(["../admin/main/echart.vue"], resolve)
  },
  mounted () {
    this.getTop()
	this.selectTime('1')
  },
  methods: {
    getTop () {
      getIndexTop(this.advId).then(res => {
        console.log(res, '数据')
        this.vital = res
      })
	},
	activeNow(item,index){
		var checkResult= this.legendData.find(a=>{
			return a.value===item.value
		})
		if(checkResult){
			return false
		}
		this.legendData.push(item);
		this.classArr.push(item.lable)
		if(this.legendData.length>2){
			this.legendData.shift()
			this.classArr.shift()
		}
	},
    getEachart () {
      getIndexEchart(this.advId, this.form.startDate, this.form.endDate).then(res => { 
		this.getList();
		this.lineChartData = res.chart;
        
      })
	},
	getList(){
		getIndexList(this.advId, this.form.startDate, this.form.endDate).then(res=>{
			this.tableData = res.table
		})
	},
    selectTime (val) {
      this.nowSelect = val;
      let start = '';
      let end = '';
      switch (val) {
        case '1':
          console.log(moment())
          end = moment();
          start = moment();
          break;
        case '2':
          end = moment().subtract(1, 'days');
          start = moment().subtract(1, 'days');
          break;
        case '3':
          end = moment().subtract(1, 'days');
          start = moment().subtract(8, 'days');
          break;
        default:
          end = moment().subtract(1, 'days');
          start = moment().subtract(31, 'days');
      }
      this.form.startDate = start.format('YYYY-MM-DD');
      this.form.endDate = end.format('YYYY-MM-DD');
      this.getEachart()
    }

  },
  watch:{
	  legendData:function(val){
	  console.log(this.legendData)
			// this.setChartData();
		}
  }
}
</script>

<style>
.data-tip {
  width: 100%;
  color: #777;
  font-size: 12px;
  margin-bottom: 30px;
}
.money-block {
  border: 1px solid #ececec;
  position: relative;
  display: -webkit-inline-flex;
  display: -moz-inline-flex;
  display: -ms-inline-flex;
  display: -o-inline-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: flex-start;
  -moz-justify-content: flex-start;
  -ms-justify-content: flex-start;
  -o-justify-content: flex-start;
  justify-content: flex-start;
  padding: 15px 0;
  height: 90px;
}
.money-block > span {
  width: 40%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: flex-start;
  -moz-align-items: flex-start;
  -ms-align-items: flex-start;
  -o-align-items: flex-start;
  align-items: flex-start;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
  line-height: 24px;
  padding-left: 20px;
  border-right: 1px solid #ececec;
}
.money-block > span:last-of-type,
.status-block .status-content > span:last-child {
  border: 0;
}
.number {
  font-size: 17px;
  line-height: 17px;
  color: #406599;
}
.m-t {
  margin-top: 15px;
}
.status-block {
  border: 1px solid #ececec;
  height: 90px;
}
.status-block .status-title {
  height: 30px;
  background: #fafafa;
  border-bottom: 1px solid #ececec;
  line-height: 30px;
  padding-left: 20px;
}
.status-block .status-title span {
  font-size: 12px;
  margin: 5px 0;
  color: #777;
}
.status-block .status-content {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-direction: row;
  -moz-flex-direction: row;
  -ms-flex-direction: row;
  -o-flex-direction: row;
  flex-direction: row;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
  padding: 20px 0;
}
.status-block .status-content > span {
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  -o-flex: 1;
  flex: 1;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  -o-justify-content: center;
  justify-content: center;
  border-right: 1px solid #ececec;
  cursor: pointer;
}
.bottom-edge {
  border-bottom: 10px solid #fafafa;
  padding-bottom: 15px;
  margin-left: -110px;
  margin-right: -110px;
}

.adminSelect {
  float: right;
  overflow: hidden;
  margin: 30px 0;
}
.adminSelect li {
  float: left;
  display: inline-block;
  padding: 5px 20px;
  border: 1px solid #dddddd;
  cursor: pointer;
}
.adminSelect li:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.adminSelect li:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.adminSelect li.active {
  background: #20a0ff;
  color: #fff;
  border: 1px solid #20a0ff;
}
.operaterIndex .el-table td,
.operaterIndex .el-table th {
  padding: 10px 0 !important;
}
.table-section {
  position: relative;
  width: 100%;
  border: 1px solid #ececec;
  text-align: center;
  font-size: 12px;
  transition: all 0.3s ease;
  border-collapse: collapse;
  border-spacing: 0;
  line-height: 40px;
}
table.table-section thead {
  background: #fafafa;
}
table.table-section thead th,
table.table-section td {
  text-align: center;
  font-weight: 400;
  border: 1px solid #ececec;
}
.select-time {
  position: relative;
}
.select-time label {
  position: absolute;
  top: 30px;
}
</style>

