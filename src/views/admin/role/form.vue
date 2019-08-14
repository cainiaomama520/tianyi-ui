<template>
	<div class="app-container">
		<el-form ref="form" :model="form" :rules="rules" label-width="100px" >
			<el-form-item label="角色名称:" prop="roleName">
				<el-col :xs="12" :sm="12" :md="10" :lg="6"><el-input v-model="form.roleName" placeholder="角色名称"></el-input></el-col>
			</el-form-item>
			<el-form-item label="备注:" prop="remark">
				<el-col :xs="12" :sm="12" :md="10" :lg="6"><el-input v-model="form.remark"></el-input></el-col>
			</el-form-item>
			<el-form-item label="授权:">
				<el-col :xs="12" :sm="12" :md="10" :lg="6">
					<el-tree :data="menuData" show-checkbox="" :default-checked-keys="checkedList" node-key="menuId" ref="tree" @check-change="handleCheckChange" highlight-current :props="defaultProps">
					</el-tree>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">确定</el-button>
				<router-link to="/sys/role" type="button" class="el-button el-button--warning">返回</router-link>
			</el-form-item>
		</el-form>
	</div>
</template>
<script type="text/javascript">
// roleSave, roleSelectUrl,
import { roleFormUrl, menuList ,roleDetail,roleChange,roleSave} from '@/api/menu'
export default {
  data() {
    return {
      roleId: this.$route.query.roleId,
      menuData: [],
      defaultProps: { children: 'children', label: 'name' },
      checkedList: [],
      form: {
        roleName: '',
        remark: '',
        menuIdList: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function() {
    this.getMenuList()
    if (this.roleId) {
      this.getRoleForm()
    }
  },
  methods: {
    getMenuList: function() {
      menuList().then((res) => {
        this.menuData = res.menuList
      })
    },
    getRoleForm: function() {
      roleDetail(this.roleId).then(res => {
        if (res.code === 0) {
          this.form = res.role
          this.checkedList = res.role.menuIdList
        }
      }).catch(err => {
        console.log(err)
      })
	},
	handleCheckChange(node){
		console.log(node,this.checkedList)
	},
    onSubmit(formName) {
      this.form.menuIdList = this.$refs.tree.getCheckedKeys()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.roleId) {
				this.form.roleId = this.roleId;
				 roleChange(this.form, this.roleId).then(res => {
					if (res.code === 0) {
					this.$router.push('/role/list')
					}
				})
          }else{				
				roleSave(this.form, this.roleId).then(res=>{
					if (res.code === 0) {
						this.$router.push('/role/list')
					}
				})
		  }
         
        }
      })
    }
  }

}
</script>
<style scoped>
.el-tree {
  border: none;
}
</style>
