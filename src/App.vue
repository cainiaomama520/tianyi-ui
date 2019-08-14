<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import route from "@/router";
export default {
  name: "app",
  computed: {
    ...mapGetters(["permission_routers"])
  },
  watch: {
    permission_routers(val) {
      debugger;
      route.addRoutes(val);
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}

#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}

.el-submenu [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.el-menu-item [class^="fa"] {
  vertical-align: baseline;
  margin-right: 10px;
}

.toolbar {
  background: #f2f2f2;
  padding: 10px;
  //border:1px solid #dfe6ec;
  margin: 10px 0px;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.gray {
  color: #949494;
}
.el-table__body {
  font-size: 12px;
}
.el-table td,
.el-table th {
  padding: 4px 0 !important;
}
.el-table .cell {
  line-height: 16px !important;
}
.el-button--small {
  padding: 6px 10px !important;
}
.common-cotain {
  padding: 10px 110px 40px;
}
</style>