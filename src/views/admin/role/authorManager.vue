<template>
	<section>
    <el-tabs v-model="activeName">
    <el-tab-pane label="代理商账户" name="first">
    <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-select v-model="filters.value" placeholder="请选择" @change="changeUser">
                <el-option
                  v-for="item in selectItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="filters.name" :placeholder="placeholder"></el-input>
            </el-form-item>
              <el-form-item label="状态">
              <el-select v-model="filters.status" placeholder="请选择">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="getUsers">查询</el-button>
            </el-form-item>
            <el-form-item>
					<el-button  @click="operator('new')">创建代理商</el-button>
				</el-form-item>
            <el-form-item style="float:right">
              <el-button  @click="getUsers">刷新</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
          <el-table-column prop="id" label="代理商id">
          </el-table-column>
          <el-table-column prop="name" label="代理商名称" >
          </el-table-column>
          <el-table-column prop="email" label="代理商邮箱" >
			  <template slot-scope="scope">
              <span >{{scope.row.email}}</span>
            </template>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >
          </el-table-column>
					<el-table-column prop="accountId" label="accountId" >
          </el-table-column>
					 <el-table-column prop="type" label="代理商类型" >
						<template slot-scope="scope">
              <span >{{scope.row.type=='toutiao'?'头条':'腾讯'}}</span>
            </template>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          >
          </el-table-column>
          <el-table-column prop="status" label="授权状态"  >
            <template slot-scope="scope">
              <span v-if="scope.row.status==0" class="gray">未授权</span>
              <span v-else style="color:#44C456">已授权</span>
            </template>
          </el-table-column>
          
            <el-table-column prop="createTime" label="创建时间" sortable>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="operator(scope.row)">编辑</el-button>
              <a style="margin:0 20px" :href="scope.row.authUrl" v-if="scope.row.status!=1" target="_blank">授权</a>
            </template>
          </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col>
    </el-tab-pane>
    <!-- <el-tab-pane label="广告主账户" name="second">配置管理</el-tab-pane> -->
  </el-tabs>
		
<!--创建编辑运营者-->
		<el-dialog :title="title" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="代理商名称" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="accountId:" prop="accountId">
					<el-input v-model="editForm.accountId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="代理商等级" prop="topAgent">
              <el-select v-model="editForm.topAgent" placeholder="请选择">
                <el-option
                  v-for="item in topAgent"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
						<el-form-item label="代理商类型" prop="type">
              <el-select v-model="editForm.type" placeholder="请选择">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
				<el-form-item label="邮箱：" prop="email">
					<el-input v-model="editForm.email" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from '../../../common/js/util'
//import NProgress from 'nprogress'
import { getAgentList, saveAgent, updateAgent } from '../../../api/admin';


export default {
  data () {
    return {
      activeName: 'first',
      selectItem: [
        { value: 'name', label: '代理商名称' },
        { value: 'id', label: '代理商id' },
        { value: 'email', label: '代理商邮箱' }
      ],
      status: [
        { value:'', label: '不限' },
        { value: 1, label: '已授权' },
        { value: 0, label: '未授权' }
      ],
      placeholder: '请输入代理商',
      filters: {
				value: 'name',
				status:''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [],//列表选中列
      title: '新增代理商',
      editFormVisible: false,//编辑界面是否显示
      editLoading: false,

      //编辑界面数据
      editForm: {},
      addLoading: false,
      advtitle: '',
      advVisible: false,
			editStatus: '',
			topAgent:[
				{label:'一代',value:true},
				{label:'其他',value:false}
			],
			types:[
				{label:'腾讯',value:'tencent'},
				{label:'头条',value:'toutiao'}
			],
      editFormRules: {
        name: [
          { required: true, message: '请输入代理商', trigger: 'blur' },
          { min: 1, max: 20, message: '用户名的长度不得超过10个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
				],
				topAgent:[
					{ required: true, message: '请选择代理商等级', trigger: 'change' }
				],
				accountId:[
					{ required: true, message: '请输入accountId', trigger: 'blur' },
				],
				type:{ required: true, message: '请选择代理商类型', trigger: 'change' }
      },
    }
  },
  methods: {
    changeUser (val) {
      console.log(val)
      if (val == 'name') {
        this.placeholder = '请输入代理商'
      } else if (val == 'id') {
        this.placeholder = '请输入代理商id'
      } else {
        this.placeholder = '请输入代理商邮箱'
      }
    },
    authorize (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      this.page = val;
      this.getUsers();
    },
    //获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        status: this.filters.status
	  };
	  para[this.filters.value]=this.filters.name
      this.listLoading = true;
      getAgentList(para).then((res) => {
        console.log('res', res)
        this.total = res.total;
        this.users = res.records;
        this.listLoading = false;
      });
    },
    //显示编辑界面
    operator: function (row) {

      this.editFormVisible = true;
      if (row == 'new') {
        this.title = '新增代理商'
        this.editStatus = 'new'
        this.editForm = {}
      } else {
        this.editStatus = ''
        this.title = '编辑代理商'
        this.editForm = row
      }
      // this.editForm = Object.assign({}, row);
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            if (this.editStatus == 'new') {
              saveAgent(this.editForm).then(res => {
                console.log('新增成功', res)
                this.resetForm()
              })
            } else {
              updateAgent(this.editForm).then(res => {
                this.resetForm()
              })
            }
          });
        }
      });
    },
    resetForm () {
      this.editLoading = false;
      this.$message({
        message: '提交成功',
        type: 'success'
      });
      this.$refs['editForm'].resetFields();
      this.editFormVisible = false;
      this.getUsers();
    },
    advAllot () {
      // 广告主分配
      this.advVisible = true
    },
    selsChange: function (sels) {
      this.sels = sels;
    }
  },
  mounted () {
    this.getUsers();
  }
}
</script>

<style scoped>
.hasAdv {
  padding: 0;
  margin: 0;
}
.hasAdv li {
  list-style: none;
  overflow: hidden;
  padding: 5px 0;
}
.hasAdv .el-button {
  float: right;
}
</style>