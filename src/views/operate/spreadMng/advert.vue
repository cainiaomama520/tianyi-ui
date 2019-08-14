<template>
  <div class="layOut page-scroll">
    <div class="leftBar" :style="isCollapse?'width:210px':'width:0;display: none;'">
      <div class="sideBar" :class="auto_fixed.fixed?'fixed':''">
        <el-menu
          :default-openeds="['1']"
          default-active="1"
          class="layOut-header"
          unique-opened
          @open="handleOpens"
          @close="handleCloses"
        >
          <el-submenu index="1">
            <template slot="title" class="group-title">
              <span slot="title">所有广告内容</span>
            </template>
            <el-menu-item-group class="title-box">
              <el-submenu
                :key="`item_${index}`"
                :index="index+'-'+index"
                v-for="(item,index) in leftBarData"
              >
                <template slot="title">
                  <div
                    @click="toAdvGroup(item)"
                    class="titil-item"
                    :title="item.name+'('+item.count+')'"
                  >{{item.name}}
				  <span v-if="item.count>0">({{item.count}})</span>
				  </div>
                </template>
                <el-menu-item
                  @click="toAdv(i)"
                  :index="index+'-'+index+'-'+n"
                  v-for="(i,n) in item.ad_info"
                  :key="n"
                  style="padding-left:50px"
                >
                  <div
                    :title="i.name"
                    class="titil-item"
                    style="width:100px;font-size:12px"
                  >{{i.name}}</div>
                </el-menu-item>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <!-- <div class="old-platform-part fix-bottom">
        <a class="advertiser-title" href="/overture/data/old_advertiser/campaign/">
          <span class="overflow-wrap">历史广告内容</span>
        </a>
      </div>-->
    </div>
    <div
      @click="isCollapse=!isCollapse"
      :class="isCollapse?'uncollapsed-switch':'collapsed-switch'"
    >
      <i class="el-icon-d-arrow-left" aria-hidden="true" v-if="isCollapse"></i>
      <i class="el-icon-d-arrow-right" aria-hidden="true" v-else></i>
    </div>
    <right-cont
      ref="rightCont"
      class="layOut-right"
      :style="isCollapse?'margin-left:212px':'margin-left:0'"
    ></right-cont>
    <!-- :isShow.syns="isGroup" -->
  </div>
</template>
<script>
import { getLeftBar } from "../../../api/admin";
export default {
  data() {
    return {
      isCollapse: true,
      auto_fixed: {
        fixed: false
      },
      adverid: this.$store.state.titlemess.advId,
      leftBarData: [],
      type: "" || this.$route.query.type,
      datas: this.$route.query.data
    };
  },
  computed: {
    nowheight() {
      console.log(this.$refs);
    }
  },
  components: {
    "right-cont": resolve => require(["./proManager.vue"], resolve)
  },
  methods: {
    handleOpens(key, keyPath) {
      if (key.indexOf("-") != -1) {
        this.isGroup = false;
        this.$store.commit("changeActive", "plan");
        this.$store.commit("getadId", "");
      } else {
        this.isGroup = true;
      }
      this.$store.commit("changeStatus", this.isGroup);
    },
    handleCloses(key, keyPath) {
      if (key.indexOf("-") != -1) {
        this.isGroup = false;
      } else {
        this.isGroup = true;
        this.$store.commit("changeActive", "group");
        this.$store.commit("changeCreat", true);
        this.$store.commit("getCampaignId", "");
        this.$store.commit("getCreativeId", "");
      }
      this.$store.commit("changeStatus", this.isGroup);
    },
    showBar() {
      this.isCollapse = true;
      this.$store.commit("changeStatus", this.isGroup);
    },
    onScroll() {
      let scrolled =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrolled > 120) {
        this.auto_fixed.fixed = true;
      } else {
        this.auto_fixed.fixed = false;
      }
    },
    leftBar() {
		if(this.datas){
			console.log(JSON.parse(this.datas).adverid,'this.datas')
			this.adverid=JSON.parse(this.datas).adverid;			
		}
		if(this.adverid){
			getLeftBar(this.adverid).then(res => {
				this.leftBarData = res.camp_info;
			});
		}
		
      
    },
    toAdvGroup(val) {
      this.$store.commit("changeActive", "plan");
      this.$store.commit("changeCreat", true);
      this.$store.commit("getCampaignId", val.id);
      this.$store.commit("getCreativeId", "");

      //   this.$router.push({path:'/operate/spreadMng/advert',query:{adv_id:val.campaign_id}})
    },
    toAdv(val) {
      console.log(val, "创意");
      this.$store.commit("changeCreat", false);
      this.$store.commit("changeActive", "creative");
      this.$store.commit("getCreativeId", val.id);
      this.$store.commit("getCampaignId", "");
    }
  },
  mounted() {
    this.$nextTick(function() {
		 this.leftBar();
      //   window.addEventListener('scroll', this.onScroll)
    });
   
    
    // 	sessionStorage.setItem('nowdata',this.datas)
    // 	this.$store.commit("changeMes", JSON.parse(this.datas));
    // }else{
    // 	let data=sessionStorage.getItem('nowdata');
    // 	this.$store.commit("changeMes", JSON.parse(data));
    // }

    // this.$store.commit("getCampaignId", "");
    // this.$store.commit("getCreativeId", "");
  },
  destroyed() {
	// window.removeEventListener("scroll", this.onScroll);
		this.$store.commit("changeActive", 'group');
  }
};
</script>
<style>
.titil-item {
  width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
  -moz-text-overflow: ellipsis;
  white-space: nowrap;
}
.title-box {
  max-height: 700px;
  overflow-y: scroll;
}
.title-box::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.title-box::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.title-box::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
li > div.el-submenu__title {
  /* box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1); */
}
.leftBar .el-submenu__title {
  height: 46px;
  line-height: 46px;
}
.layOut .el-menu-item-group__title {
  padding: 0;
}
.el-submenu__title .titil-item{
	font-size: 12px
}
</style>



