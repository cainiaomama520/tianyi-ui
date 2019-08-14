<template>
  <div class="choicePlan">
    <div class="choiceLeft">
      <div class="contentLeft">
        <span class="title">新建创意</span>
        <ul>
          <li>设置投放位置</li>
          <li>添加创意素材</li>
          <li>设置创意分类和标签</li>
        </ul>
      </div>
    </div>
    <div class="choiceRight">
      <div class="contentRight">
        <div class="title">请选择广告计划</div>
        <div class="selectBox">
          <el-input style="width: 33%"
           placeholder="请输入广告计划ID活关键字"
           v-model="searchValue">
           <i slot="suffix" class="el-input__icon el-icon-search"></i>
         </el-input>
         <div class="titleMiddle">
           <div class="titlePlan">广告组-广告计划</div>
           <span class="numberSpan">{{groupNum}}&nbsp;-&nbsp;{{planNum}}</span>
         </div>
         <el-tree
          class="filter-tree"
          :data="treeData"
          :props="defaultProps"
          @node-click='treeClickAction'
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size='pageSize' layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdverPlan_group } from "../../../api/admin";
export default {
  data() {
    return  {
      searchValue: '',
      treeData:[],
      groupNum: 0,
      planNum: 0,
      defaultProps: {
          children: 'children',
          label: 'name'
      },
      currentPage: 1,
			pageSize: 10,
			total: 3,
    }
  },
  watch: {
    searchValue(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let id = this.$store.state.titlemess.advId;
      let size = this.pageSize;
      let page = this.currentPage;
      let str = '?advertiser_id='+id+'&size='+size+'&page='+page;
      getAdverPlan_group(str).then(res => {
        console.log(res);
        this.treeData = res.data.content[0].tree.node
        this.groupNum = res.data.content[0].countOverview.campCount
        this.planNum = res.data.content[0].countOverview.adCount
        this.total = res.data.totalElements
      });
    },
    filterNode(value,data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    treeClickAction(val) {
      if (val.children == undefined) {
        console.log(val);
        this.$store.commit('setSelfCreativeArray',[[],[],[],[],[],[]]);
        this.$store.commit('setProgCreativeArray',[[],[],[],[],[],[]]);
        this.$store.commit('setHasReflash',false);
        this.$router.push({path:'/operate/newCreat/new-creat',query:{id:val.id,landing_type:val.landing_type,planName:val.name,APPType:val.downlaod_os}})
      }
    },
    handleSizeChange(val) {
				this.pageSize = val;
				this.getData()
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getData()
				console.log(`当前页: ${val}`);
			},
  }
}
</script>

<style lang="scss" scoped>
.choicePlan {
  width: 100%;
  // height: 100vh;
  // padding-top: 120px;
  // background-color: red;
  .choiceLeft {
    width: 200px;
    float: left;
    position: relative;
    top: 0;
    background: #eff4f7;
    border-right: 1px solid #ebebeb;
    z-index: 10;
    height: 100vh;
    .contentLeft {
      background: #dee2e7;
      padding-left: 25px;
      border-left: 5px solid #57a6f1;
      padding: 30px;
      border-bottom: 1px solid #ebebeb;
      color: #999;
      cursor: pointer;
      .title {
        font-weight: 700;
        display: inline-block;
        position: relative;
        width: 100%;
        color: #4c4c4c;
      }
      ul {
        padding: 0;
        margin: 5px 0 0;
        li {
          list-style: none;
          font-size: 12px;
          padding: 5px 0;
          color: #70a4ef;
        }
      }
    }
  }
  .choiceRight {
    margin-left: 200px;
    min-height: 960px;
    .contentRight {
      padding: 30px 17%;
      .title {
        color: #4c4c4c;
        font-weight: 700;
        padding: 15px 0;
      }
      .selectBox {
        border: 1px solid #ededed;
        padding: 30px 50px;
        .titleMiddle {
          margin: 20px 0 10px;
          position: relative;
          display: flex;
          align-items: center;
          .titlePlan {
            color: #4c4c4c;
            font-weight: 700;
            margin: 0 5px;
          }
          .numberSpan {
            background: #d2d2d2;
            color: #fff;
            display: inline-block;
            height: 20px;
            border-radius: 10px;
            min-width: 20px;
            text-align: center;
            padding: 0 5px;
            line-height: 20px;
          }
        }
      }
    }
    .block {
      height:30px;
      padding-top: 20px;
      overflow: hidden;
      .el-pagination {
        float: right;
      }
    }
  }
}
</style>
