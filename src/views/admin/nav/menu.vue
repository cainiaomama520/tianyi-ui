<template>
	<div class="app-container">
		<el-form  :model="menu"  :rules="menuRules" ref="menu" label-width="100px">
			<el-form-item label="类型:">
				<el-col :span="24">
					<el-radio class="radio" v-model="menu.type" :label="0">目录</el-radio>
					<el-radio class="radio" v-model="menu.type" :label="1">菜单</el-radio>
					<el-radio class="radio" v-model="menu.type" :label="2">按钮</el-radio>
				</el-col>
			</el-form-item>
			<el-form-item label="菜单名称:"  prop="name" >
				<el-col :xs="12" :sm="12" :md="10" :lg="6">
					<el-input v-model="menu.name" placeholder="菜单名称或按钮名称"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="上级菜单:">
				<el-col :xs="12" :sm="12" :md="10" :lg="6">
          <div @click="choiceParentMenu">
            <el-input v-model="menu.parentName" placeholder="一级菜单" readonly="readonly" ></el-input>
          </div>
				</el-col>
			</el-form-item>
			<el-form-item label="菜单URL:"  prop="url">
				<el-col :xs="12" :sm="12" :md="10" :lg="6"><el-input v-model="menu.url" placeholder="菜单URL"></el-input></el-col>
			</el-form-item>
			<el-form-item label="授权标识:">
				<el-col :xs="12" :sm="12" :md="10" :lg="6">
				<el-input v-model="menu.perms" placeholder="多个用逗号分隔，如：user:list,user:create"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="是否隐藏:">
				<el-col :xs="12" :sm="12" :md="10" :lg="6">
					<el-radio class="radio" v-model="menu.isShow" :label="1">显示</el-radio>
					<el-radio class="radio" v-model="menu.isShow" :label="0">隐藏</el-radio>
				</el-col>
			</el-form-item>
			<el-form-item label="排序号:" >
				<el-col :xs="12" :sm="12" :md="10" :lg="6"><el-input v-model="menu.orderNum" placeholder="排序号"></el-input></el-col>
			</el-form-item>
			<el-form-item label="图标:" v-if="menu.type != 2">
				<el-col :xs="12" :sm="12" :md="10" :lg="6">
					<el-input v-model="menu.icon"  placeholder="菜单图标"></el-input>
					<code>获取图标：http://fontawesome.io/icons/</code>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('menu')">确定</el-button>
				<router-link to="/sys/menu" class="el-button el-button--warning">返回</router-link>
			</el-form-item>
		</el-form>
		<div class="choiceParentMenu" v-show="showMenus">
			<h4>选择菜单<i class="fa fa-close" @click="showMenus=false"></i></h4>
			<el-tree :data="menuData" show-checkbox :check-strictly="isTrue":default-expanded-keys='checkedList' :default-checked-keys="checkedList" node-key="id" ref="tree" highlight-current :props="defaultProps" @check-change="setCheckedList">
			</el-tree>
			<div class="oper">
				<el-button type="primary" @click="setParentId">确定</el-button>
				<el-button @click="showMenus=false">取消</el-button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
// menuChange, menuDetail
import { menuAdd, menuUpdate,menuSelect ,menuList,menuDetail} from '@/api/menu'
export default {
  name: 'menuForm',
  data() {
    return {
      showMenus: false,
      isTrue: true,
      menuId: this.$route.query.menuId,
      menuData: [{
        name: '一级菜单',
        id: 0,
		children: [],		
      }],
      checkedList: [1],
      defaultProps: { children: 'children', label: 'name' },
      tempParentId: '',
      tempParentName: '',
      menu: {
        parentName: '一级菜单',
        parentId: 0,
        type: 1,
        orderNum: 0,
        isShow: 1
      },
      menuRules: {
        name: [{ required: true, message: '请输入菜单或按钮名称', trigger: 'blur' }],
        url: [{ required: true, message: '菜单url不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted: function() {
    // console.log(this.menuId)
    // if (this.menuId) {
      this.getMenuList()
    // } else {
      this.getAllmenu()
    // }
  },
  methods: {
    setCheckedList: function(data, isChecked, otherChecked) {
      this.tempParentName = data.name;
	  this.tempParentId = data.menuId;
    },
    setParentId: function() {
      this.menu.parentName = this.tempParentName
      this.menu.parentId = this.tempParentId
	  this.showMenus = false;
    },
    choiceParentMenu: function() {
      this.showMenus = true
      this.$refs.tree.setCheckedKeys([this.menu.parentId])
    },
    getMenuList: function() {
      menuDetail(this.menuId).then(response => {
        this.menu = response.menu
      })
    },
    getAllmenu() {
      menuList().then(res => {
        this.menuData = res.menuList
      })
    },
    onSubmit: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.menuId) {
            menuAdd(this.menu).then(res => {
              if (res.code == 0) {
                this.$router.push('/sys/menu')
              }
            }).catch(err => {
              console.log(err)
            })
          } else {
            menuUpdate(this.menu).then(res => {
              console.log(res)
              if (res.code == 0) {
                this.$router.push('/sys/menu')
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    }
  }

}
</script>
<style scoped>
.choiceParentMenu {
  position: absolute;
  top: 20%;
  left: 50%;
  min-width: 300px;
  border: 1px solid #d1dbe5;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
}
.choiceParentMenu h4 {
  background: #009f95;
  color: #fff;
  position: relative;
  padding: 10px;
  margin: 0px;
  font-weight: normal;
}
.choiceParentMenu h4 i {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
}
.choiceParentMenu .el-tree {
  padding: 20px;
  border: none;
}
.choiceParentMenu .oper {
  padding: 20px;
  text-align: right;
}
code {
  display: block;
  margin-top: 4px;
  font-size: 90%;
  color: rgb(199, 37, 78);
  background-color: rgb(249, 242, 244);
  padding: 2px 4px;
  border-radius: 4px;
}
</style>
