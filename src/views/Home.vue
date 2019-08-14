<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col
        :span="10"
        class="logo"
        :class="collapsed?'logo-collapse-width':'logo-width'"
      >{{collapsed?'':sysName}}</el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">设置</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changepass">修改密码</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          unique-opened
          router
          v-show="!collapsed"
        >
          <template v-if="checkMenu(item)" v-for="(item,index) in $router.options.routes"> 
            <el-submenu :index="index+''" :key="'parent'+index" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>
                {{item.name}}
              </template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.path"
                :key="child.path"
                v-if="!child.hidden"
              >{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item
              :key="'children'+index"
              v-if="item.leaf&&item.children&&item.children.length>0"
              :index="item.children[0].path"
            >
              <i :class="item.iconCls"></i>
              {{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
          <li
            v-for="(item,index) in $router.options.routes"
            :key="'parent2'+index"
            v-if="checkMenu(item)"
            class="el-submenu item"
          >
            <template v-if="!item.leaf">
              <div
                class="el-submenu__title"
                style="padding-left: 20px;"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <i :class="item.iconCls"></i>
              </div>
              <ul
                class="el-menu submenu"
                :class="'submenu-hook-'+index"
                @mouseover="showMenu(index,true)"
                @mouseout="showMenu(index,false)"
              >
                <li
                  v-for="child in item.children"
                  v-if="!child.hidden"
                  :key="child.path"
                  class="el-menu-item"
                  style="padding-left: 40px;"
                  :class="$route.path==child.path?'is-active':''"
                  @click="$router.push(child.path)"
                >{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div
                  class="el-submenu__title el-menu-item"
                  style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                  :class="$route.path==item.children[0].path?'is-active':''"
                  @click="$router.push(item.children[0].path)"
                >
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      sysName: "天翼M系统",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    //退出登录
    logout: function() {
      var _this = this;
      // this.$confirm('确认退出吗?', '提示', {
      //     //type: 'warning'
      // }).then(() => {
      sessionStorage.removeItem("token");
      _this.$router.push("/login");
      // }).catch(() => {

      // });
    },
    changepass() {
      console.log(121);
      this.$router.push({ path: "/changpassword" });
    },
    checkMenu(item) {
      if (this.userType ==1) {
		//   管理员
        return !item.hidden && !item.sec;
      } else if(this.userType ==2) {
		//   运营管理		
        if (item.meta && item.meta.hidden&&!item.meta.isFinance) {
          return false;
        } else {
					if(item.name!='财务管理'){
						return !item.hidden && !item.sec &&!item.isCaiwu;				
					}
        }
      }else if(this.userType ==3){
		//   财务管理
		  if (item.meta && !item.meta.isFinance) {
          return false;
        } else {
          return !item.hidden && !item.sec &&!item.isCaiwu;
        }
	  }else if(this.userType ==4){
		//   运营
		if (item.meta && item.meta.hidden) {
			return false;
		} else {			
			return !item.hidden && !item.sec &&!item.isCaiwu;
        }
	  }else if(this.userType ==5){
			console.log('------------')
		//   财务运营
		 if (item.meta && !item.meta.isFinance) {
			    return false;          
        } else {
						if(item.name!='角色&权限'){
							return !item.hidden && !item.sec &&!item.isCaiwu;				
						}			        
        }
	  }else{
			return  item.isCaiwu;
			}
    },
    //折叠导航栏
    // collapse: function () {
    // 	this.collapsed = !this.collapsed;
    // },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.name || "";
      this.sysUserAvatar = user.avatar || "";
    }
  },
  computed: {
    userType: function() {
      return this.$store.state.user.role;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~scss_vars";

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 190px;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 190px;
      width: 190px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 190px;
      width: 190px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
  .el-submenu .el-menu-item {
    min-width: 190px;
  }
}
.el-menu-item.is-active {
  color: #3b6998;
}
</style>