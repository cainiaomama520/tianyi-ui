<template>
  <div>
    <div class="leftBar dataBar" :style="isCollapse?'width:210px':'width:0;display: none;'">
      <div class="sideBar" :class="auto_fixed.fixed?'fixed':''">
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#000"
          :default-active="$route.path"
          router 
        >
          <template v-for="paths in $router.options.routes">
			  <div v-if="paths.narBar">
            <el-menu-item  :key="index" v-for="(item,index) in paths.children" :index="item.path">{{item.name}}</el-menu-item>
			  </div>
          </template>
        </el-menu>
      </div>
    </div>
	<div style="left:185px"
      @click="closeBar"
      :class="isCollapse?'uncollapsed-switch':'collapsed-switch'"
    >
      <i class="el-icon-d-arrow-left" aria-hidden="true" v-if="isCollapse"></i>
      <i class="el-icon-d-arrow-right" aria-hidden="true" v-else></i>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
	  barList: [{}],
	   isCollapse: true,
      auto_fixed: {
        fixed: false
      },
    }
  },
  mounted: function () {

  },
  methods: {
	closeBar(){
		this.isCollapse=!this.isCollapse;
		this.$emit('closeBar',this.isCollapse)
	}
  }
}
</script>
<style>
.dataBar .el-menu-item.is-active{
background: #e2e2e2;
color: #222
}
.dataBar .el-menu-item{
	height: 46px;
	line-height: 46px
}
.dataBar .el-menu{
background: transparent
}
</style>
