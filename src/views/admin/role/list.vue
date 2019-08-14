<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="角色名称:">
            <el-input v-model="searchItem.roleName" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item> <el-button @click="getRoleList">查询<i class="fa fa-search"></i></el-button></el-form-item>
          <el-form-item>
            <router-link to="/role/form" class="el-button el-button--primary">新增<i class="fa fa-plus"></i></router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" ref="singleTable" borderhighlight-current-row
                @sort-change="getRoleList">
        <el-table-column prop="roleId" label="角色ID" column-key="role_id" min-width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" column-key="role_name" min-width="160"></el-table-column>
        <el-table-column prop="remark" label="备注" column-key="remark" min-width="160" :show-overflow-tooltip="isTrue"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" column-key="create_time" min-width="200"></el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRole(scope)"
          type="text"
          size="small">
          移除
        </el-button>
        <el-button
          @click.native.prevent="updateRole(scope)"
          type="text"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                    :page-sizes="pageSizes" :page-size="currentPageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalnNum">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
import { roleListUrl,roleDelete } from '@/api/menu'
export default {
  data() {
    return {
      isTrue: true,
      tableData: [],
      roleId: '',
      currentPage: 1,
      pageSizes: [20, 50, 100],
      currentPageSize: 20,
      totalnNum: 0,
      currentSidx: 'role_id',
      order: 'asc',
      currentRow: '',
      searchItem: {
        page: 1,
        limit: 20
      }
    }
  },
  mounted: function() {
    this.getRoleList()
    this.$emit('setTitle', '')
  },
  methods: {
    updateRole: function(data) {
      this.$router.push({ path: '/role/form', query: { roleId: data.row.roleId }})
    },
    deleteRole: function(data) {
      this.$confirm('确定要删除选中的记录?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roleDelete(data.row.roleId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      })
    },
    getRoleList: function(rowObj) {
      roleListUrl(this.searchItem).then(res => {
        this.tableData = res.page.records
        this.totalnNum = res.page.pages
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(val) {
      this.searchItem.limit = val
      this.getRoleList()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.searchItem.page = val
      this.getRoleList()
      console.log(`当前页: ${val}`)
	}
  }

}
</script>
