<template>
	<div class="app-container">
		<el-row>
			<el-col :span="24">
				<el-form :inline="true"  class="demo-form-inline">
					<el-form-item>
						<el-button type="primary"  @click="updateMenuInfo('new')">新增<i class="fa fa-plus"></i></el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"  @click="updateMenuInfo('updata')">修改<i class="fa fa-pencil"></i></el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="danger"  @click="deleteMenu">删除<i class="fa fa-trash"></i></el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
		<div class="treeTable">
			<div class="row title">
				<span class="width80"></span>
				<span class="width80">菜单ID</span><span class="width120">菜单名称</span><span class="width100">上级菜单</span><span class="width80">图标</span>
				<span class="width100">类型</span><span class="width100">排序号</span><span class="width200">菜单URL</span><span class="width200">授权标识</span>
			</div>
			<div class="menuList">
				<div v-for="menu in menuData" :key="menu.menuId">
					<div class="row">
						<span class="width80"><el-radio class="radio" v-model="check" :label="menu.menuId"></el-radio></span>
						<span class="width80">{{menu.menuId}}</span>
						<span class="width120 t-l" @click="menu.isSecond=!menu.isSecond"><i :class="!menu.isSecond?'el-icon-arrow-right':'el-icon-arrow-down'" v-if="menu.children&&menu.children.length>0"></i>{{menu.name}}</span>
						<span class="width100">{{menu.parentName}}</span><span class="width80"><i class="fa":class="menu.icon"></i></span></span>
						<span class="width100">
							<el-button type="primary" v-if="menu.type==0" size="mini">目录</el-button>
							<el-button type="success" v-if="menu.type==1" size="mini">菜单</el-button>
							<el-button type="warning" v-if="menu.type==2" size="mini">按钮</el-button>
						</span><span class="width100">{{menu.orderNum}}</span><span class="width200">{{menu.url}}</span>
						<span class="width200">{{menu.perms}}</span>
					</div>
					<!-- v-if="menu.children&&menu.children.length>0&&menu.isSecond" -->
					<div v-for="item in menu.children" :key="item.menuId" class="table" :class="menu.isSecond?'active':''">
						<div class="row">
							<span class="width80"><el-radio class="radio" v-model="check" :label="item.menuId" ></el-radio></span>
							<span class="width80">{{item.menuId}}</span>
							<span   class="width120 t-l"><i class="el-icon-arrow-right" v-if="item.children&&item.children.length>0"></i>{{item.name}}</span>
							<span class="width100">{{item.parentName}}</span><span class="width80"><i class="fa":class="item.icon"></i></span></span>
							<span class="width100">
								<el-button type="primary" v-if="item.type==0" size="mini">目录</el-button>
								<el-button type="success" v-if="item.type==1" size="mini">菜单</el-button>
								<el-button type="warning" v-if="item.type==2" size="mini">按钮</el-button>
							</span><span class="width100">{{item.orderNum}}</span><span class="width200">{{item.url}}</span>
							<span class="width200">{{item.perms}}</span>
						</div>
						<!-- <div v-for="item2 in item.children" :key="item2.menuId" class="table" v-if="item.children&&item.children.length>0">
							<div class="row">
								<span class="width80"><el-radio class="radio" v-model="check" :label="item2.menuId"></el-radio></span>
								<span class="width80">{{item2.menuId}}</span>
								<span class="width120 t-l">{{item2.name}}</span>
								<span class="width100">{{item2.parentName}}</span><span class="width80"><i class="fa":class="item2.icon"></i></span>
								<span class="width100">
									<el-button type="primary" v-if="item2.type==0" size="mini">目录</el-button>
									<el-button type="success" v-if="item2.type==1" size="mini">菜单</el-button>
									<el-button type="warning" v-if="item2.type==2" size="mini">按钮</el-button>
								</span><span class="width100">{{item2.orderNum}}</span><span class="width200">{{item2.url}}</span><span class="width200">{{item2.perms}}</span>
							</div>

						</div> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { menuDelete, menuList } from '@/api/menu'
export default {
  data() {
    return {
      menuData: [],
      check: '',
	  menuId: ''
    }
  },
  // props: ['permissions'],
  mounted: function() {
    this.getMenuList()
    // this.$emit('setTitle', '')
  },
  watch: {
    check: function(val) {
      this.menuId = val
    }
  },
  methods: {
    updateMenuInfo: function(item) {
      if (item === 'updata' && this.menuId === '') {
        this.$message({
          message: '请选择一条数据进行修改！',
          type: 'warning'
        })
      } else {
        this.$router.push({ path: '/nav/menu', query: { menuId: this.menuId }})
      }
	},
	handleClick(){},
    deleteMenu: function() {
        if (this.menuId != '') {
        this.$confirm('确定要删除选中的记录?', '信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          menuDelete(this.menuId).then(res => {
            if (res.code === 0) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMenuList()
            }
          }).catch(err => {
            console.log(err)
          })
        })
      } else {
        this.$message({
          message: '请选择一条数据进行删除！',
          type: 'warning'
        })
      }
    },
    getMenuList: function() {
      menuList().then((res) => {
		  res.menuList.forEach(item=>{
			  item.isSecond=false
		  })
        this.menuData = res.menuList
      })
    }
  }
}
</script>
<style scoped>
.treeTable .table {
  opacity: 0;
  max-height: 0px;
  position: absolute;
  left: 0px;
  width: 0px;
  z-index: -9999;
  overflow: hidden;
  transition: opacity ease-out 0.6s;
  transition: max-height ease-out 0.8s;
}

.table.active {
  opacity: 1;
  width: 100%;
  position: static;
  overflow: visible;
  max-height: 500px;
  transition: opacity ease-in 0.6s;
  transition: max-height ease-in 1s;
  /*display: block;*/
  /*height:auto;*/
  /*transition: max-height ease-in 1s;*/
}
.treeTable {
  font-size: 14px;
  border: 1px solid #dfe6ec;
  border-bottom: none;
  border-right: none;
  overflow-y: auto;
  color: #1f2d3d;
}

.width80 {
  width: 60px;
}
.width100 {
  width: 100px;
}
.width120 {
  width: 140px;
}
.width200 {
  width: 220px;
}

.t-l {
  text-align: left !important;
}
.treeTable .row.title {
  background-color: #eef1f6;
  text-align: center;
  font-weight: bold;
}
.treeTable .row {
  display: table;
  border-bottom: 1px solid #dfe6ec;
  width: 100%;
  table-layout: fixed;
}
.treeTable .row:hover > span {
  background-color: #eef1f6;
  background-clip: padding-box;
}
.treeTable .row:nth-of-type(odd) {
}
.treeTable .row:nth-of-type(even) {
}
.treeTable .row span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px;
  border-right: 1px solid #ddd;
  display: table-cell;
  text-align: center;
}
.treeTable .row span i {
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
