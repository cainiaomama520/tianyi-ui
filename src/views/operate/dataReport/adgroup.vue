<template>
  <div class="data_box">
    <data-bar class="data_bar" @closeBar="barStatus"></data-bar>
    <div class="data_main" :style="leftBarstatus?'margin-left: 210px;':'margin-left:0'">
      <custom
        :title="customTitle"
        :lists="adgroups"
        :showCustom="showCustom"
        v-show="showCustom"
        @changeAdgroups="changeAdgroups"
      ></custom>
      <el-row>
        <el-col :span="24">
          <time-option @changeTime="changeTime"></time-option>
          <el-form ref="form" :model="form" label-width :inline="true" class="demo-form-inline">
            <el-form-item label="汇总方式">
              <el-select v-model="form.summarizeType" placeholder="汇总方式" @change="getAdgroupData" size="medium">
                <el-option
                  v-for="item in summarizeTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="目的">
              <el-select v-model="form.landing_type" placeholder="目的" @change="getAdgroupData" size="medium">
                <el-option
                  v-for="item in landing_types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广告组">
              <el-radio v-model="isAll" label="1">全部</el-radio>
              <label @click="showCustom=true">
                <el-radio v-model="isAll" label="2">自定义</el-radio>
              </label>
              <template v-if="isAll=='2'">已选择{{form.selectidList.length}}广告组</template>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="chart_box">
        <el-col :span="24">
          <div class="chart_title">
            数据趋势
            <i
              @click="showChart=!showChart"
              :class="[showChart?'el-icon-arrow-up':'el-icon-arrow-down']"
            ></i>
          </div>
          <div v-show="showChart" class="sel_box">
            <el-select v-model="chart_value1">
              <el-option
                v-for="item in chart_sele1"
                :key="item.id"
                :value="item.id"
                :label="item.value"
              ></el-option>
            </el-select>
            <span v-show="!compare">对比</span>
            <el-select v-model="chart_value2" v-show="!compare">
              <el-option
                v-for="item in chart_sele2"
                :key="item.id"
                :value="item.id"
                :label="item.value"
              ></el-option>
            </el-select>
          </div>
          <chart
            v-show="showChart"
            v-if="legendData.length>0"
            :legendData="legendData"
            :chartData="chartData"
            :compare="compare"
          ></chart>
        </el-col>
      </el-row>
      <el-row class="table-top">
        <el-col>
          <el-button @click="showLabels=!showLabels">
            自定义列
            <i class="el-icon-arrow-down"></i>
          </el-button>
		  <!-- <a href="">下载报表</a> -->
          <el-button @click="download">下载报表</el-button>
          <!-- <el-button>分时段下载报表</el-button> -->
          <table-option v-show="showLabels" @changeTableHeader="changeTableHeader" pageType="1"></table-option>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table border :data="tableData" style="width: 100%" max-height="250">
            <el-table-column
              v-for="(item,index) in tableLabel"
              :key="index"
              :prop="item.id"
              :label="item.value"
              :min-width="item.width"
              :sortable="item.sortable"
            >
              <template slot-scope="scope"> 
                <template v-if="scope.$index==0&&item.id=='date'">合计</template>
                <template v-else>
                  <template v-if="item.expand">
                    <p>{{scope.row[item.id]}}</p>
                    <p v-show="compare">{{getCompareRowData(scope.$index,item.id)}}</p>
                  </template>
                  <template v-else>
                    <p>{{scope.row[item.id]}}</p>
                    <p v-show="compare">{{getCompareRowData(scope.$index,item.id)}}</p>
                  </template>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="toolbar"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.currentPage"
            :page-sizes="pager.pageSizes"
            :page-size="pager.pagesize"
            :layout="pager.layout"
            :total="pager.total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import dataBar from './dataBar'
import charts from './charts'
import custom from './custom'
import time from './time'
import tableOption from './tableLabel'
import axios from 'axios'
import { getAdgroupData, getAdgroupList, initModel, selects,adgroupdown } from 'api/dataReport'
export default {
  data () {
    return {
		token:this.$store.state.user.token,
      pageType: 'advgroup',
      showChart: true,
      showCustom: false,
      showLabels: false,
      adverId: this.$store.state.titlemess.advId,
      isAll: "1",
      compare: false,
      time1: [moment().subtract(7, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')], 
      time2: [],
      summarizeTypes: selects.summarizeTypes,
      landing_types: selects.landing_types,
      form: {
        summarizeType: 2,
        landing_type: 0,
        selectidList: []

      },
      chart_value2: '',
      chart_value1: '',
      chartData: {
        xAxisData: [],
        seriesData: []
      },
      tempNoChartData: [],
      tempCampareChartData: [],
      customTitle: '选择广告组',
      adgroups: [],
      tableData: [],
      compareTableData: [],
      groupLabels: [],
      tableLabel: initModel('staticLabel').concat(initModel('staticGroup')),
      tempTableLabel: [],
      seriesData: [],
      pager: {
        currentPage: 1,
        pageSizes: [100, 200, 300, 400],
        pagesize: 100,
        layout: 'total, sizes, prev, pager, next, jumper', 
        total: 100
      },
	  leftBarstatus: true,
	  serverUrl: process.env.BASE_API
    }
  },
  components: { "data-bar": dataBar, "chart": charts, "custom": custom, "time-option": time, "table-option": tableOption },
  watch: {
    "compare": function (val) {
      this.chart_value2 = 'show';
      this.chart_value1 = 'show';
      if (val) {
        let arr = [initModel('staticLabel')[0]];
        this.tableLabel = [].concat(arr).concat(this.tempTableLabel);
      } else {
        this.tableLabel = initModel('staticLabel').concat(this.tempTableLabel);
      }
    },
    isAll: function (val) {
      if (val == '2') {
        this.showCustom = true;
      }
    },
    legendData: function (val) {
      this.setChartData();
    }
  },
  created: function () {
    this.groupLabels = initModel('data').concat(initModel('advgroup'));
    this.chart_value2 = 'show';
    this.chart_value1 = 'show';
  },
  mounted: function () {
    this.getAdgroupList();
    this.getAdgroupData();
  },
  computed: {
    legendData: function () {
      let val1, val2;
      for (var i = 0; i < this.chart_sele1.length; i++) {
        if (this.chart_sele1[i].id == this.chart_value1) {
          val1 = this.chart_sele1[i].value;
        }
        if (this.chart_sele1[i].id == this.chart_value2) {
          val2 = this.chart_sele1[i].value;
        }
        if (val1 && val2) {
          break;
        }
      }
      if (this.compare) {
        return [val1, this.time1[0] + "到" + this.time1[1], this.time2[0] + "到" + this.time2[1]];
      } else if (this.chart_value1 == this.chart_value2) {

        return [val1];
      } else {
        return [val1, val2];
      }
    },
    chart_sele1: function () {
      var arr = [];
      for (var i = 0; i < this.groupLabels.length; i++) {
        arr = arr.concat(this.groupLabels[i].list);
      }
      return arr;
    },
    chart_sele2: function () {
      return this.chart_sele1;
    }
  },
  methods: {
    getCompareRowData: function (index, value) {
      if (this.compare) {
        if (this.compareTableData.length = 0 || this.compareTableData[index] == undefined) {
          return '';
		}		
        return this.compareTableData[index][value];
      } else {
        return '';
      }
    },
    getAdgroupList: function () {
      getAdgroupList({ adverId: this.adverId }).then(res => {
        this.adgroups = res;
      });
    },
    getAdgroupData: function () {
      let chartSearch = {
        adverId: this.adverId,
        startDate: this.time1[0],
        endDate: this.time1[1],
        selectidList: this.form.selectidList.join(","),/*选择业务的ID列表*/
        summarizeType: this.form.summarizeType,/*汇总方式*/
        landingType: this.form.landing_type,
        page: this.pager.currentPage,
        size: this.pager.pagesize
      }
      if (this.compare) {
        chartSearch.compare = this.compare;
        chartSearch.compareStartDate = this.time2[0];
        chartSearch.compareEndDate = this.time2[1];
      }
      getAdgroupData(chartSearch).then(res => {
        this.chartData.xAxisData = res.chart.categories;
        this.tempNoChartData = res.chart.series;
        if (this.compare) {
          if (res.chart.compareSeries.length == 0) {
            this.tableData = [];
            this.compareTableData = [];
            this.chartData = { xAxisData: [], seriesData: [[], []] };
            this.$message({
              message: '没有对比数据,请重新选择',
              type: 'warning'
            });
            return;
          }
          this.compareTableData = res.comparePage.content;
          this.compareTableData.unshift(res.compare_total_stat);
          this.tempCampareChartData = res.chart.compareSeries;
          this.chartData.compareCategories = res.chart.compareCategories;
          this.chartData.compareSeries = res.chart.compareSeries;
        }
        this.setTableData(res);
        this.setChartData();

      })
    },
    setTableData: function (res) {
      this.tableData = res.page.content;
      this.tableData.unshift(res.total_stat);
      this.pager.total = res.page.totalElements;
    },
    setCompareData: function () {/*柱图*/
      let arr = this.tempCampareChartData;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].name == this.chart_value1) {

          return arr[i].data;
        }
      }
    },
    setNoCampareData: function () {/*柱图*/
      let noCampareSeriesData = [];
      let arr = this.tempNoChartData;
      for (var i = 0; i < arr.length; i++) {
		  if (arr[i].name == this.chart_value1 ) {
					noCampareSeriesData[0]=arr[i].data;
				}
				if(arr[i].name == this.chart_value2){
					noCampareSeriesData[1]=arr[i].data;
				}
        // if (arr[i].name == this.chart_value1 || arr[i].name == this.chart_value2) {
        //   noCampareSeriesData.push(arr[i].data);
        // }
        // if (noCampareSeriesData.length > 1) {
        //   break;
        // }
      }
      return noCampareSeriesData;
    },
    setChartData: function () {/*柱图*/
      let noCampareSeriesData = this.setNoCampareData();
      if (this.compare) {
        let campareSeriesData = [];
        campareSeriesData.push(noCampareSeriesData[0]);
        campareSeriesData.push(this.setCompareData());
        this.chartData.seriesData = [campareSeriesData[0], campareSeriesData[1]];
      } else {
        this.chartData.seriesData = [noCampareSeriesData[0], noCampareSeriesData[1]];;
      }
    },
    changeTime: function (data) {
      this.compare = data.compare;
      this.time1 = [moment(data.time[0]).format('YYYY-MM-DD'), moment(data.time[1]).format('YYYY-MM-DD')];
      this.time2 = [moment(data.comTime[0]).format('YYYY-MM-DD'), moment(data.comTime[1]).format('YYYY-MM-DD')];
      this.getAdgroupData();
    },

    changeAdgroups: function (flag, data) {
      if (flag) {
        this.form.selectidList = data;
      } else {
        this.form.selectidList = [];
      }
      if (this.form.selectidList.length == 0) {
        this.isAll = '1';
      }
      this.getAdgroupData();
      this.showCustom = false;
    },
    changeTableHeader: function (arr) {
      this.tempTableLabel = [].concat(initModel('staticGroup')).concat(arr);
      if (this.compare) {		  
        this.tableLabel = [initModel('staticLabel')[0]].concat(arr);
      } else {
        this.tableLabel = initModel('staticLabel').concat(initModel('staticGroup')).concat(arr);
      }

    },
    handleSizeChange (val) {
	  this.pager.pagesize = val;
	  this.getAdgroupData()
    },
    handleCurrentChange (val) {
	  this.pager.currentPage = val;
	  this.getAdgroupData()
    },
    barStatus (val) {
	  this.leftBarstatus = val
	  console.log('leftbar',val)
	},
	download(){
		// debugger;
		axios.defaults.headers.get['Content-Type'] = 'application/csv';
		let chartSearch = {
        adverId: this.adverId,
        startDate: this.time1[0],
        endDate: this.time1[1],
        selectidList: this.form.selectidList.join(","),/*选择业务的ID列表*/
        summarizeType: this.form.summarizeType,/*汇总方式*/
        landingType: this.form.landing_type
	  }
	  let url=this.serverUrl+'/biz/export/adgroup?adverId='+this.adverId+'&startDate='+this.time1[0]+'&endDate='+this.time1[1]+'&selectidList='+this.form.selectidList.join(",")+'&summarizeType='+this.form.summarizeType+'&landingType='+this.form.landing_type+'&token='+this.token
	
		adgroupdown(chartSearch,{responseType: 'arraybuffer'}).then(res=>{
		 if(res){
			 window.open(url,'_blank');
		 }
		})
	
	}
  }
}
</script>