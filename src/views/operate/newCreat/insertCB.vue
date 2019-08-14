<template>
  <div class="insertCB">
    <el-dialog
      title="选择动态词包"
      :visible.sync="dialogValue"
      @close='dialogCloseAction'
      width='900px'>
      <div class="dvBox" >
        <div class="titleSpan" style="margin-bottom:20px">词包解释：根据用户特点动态替换标题片段，点击了解详情，同时您也可以在数据报表中查看效果数据。</div>
        <el-table
          :data="tableData"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="词包">
          </el-table-column>
          <el-table-column
            prop="default_word"
            label="默认词">
          </el-table-column>
          <el-table-column
            prop="words"
            label="替换词" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="user_rate"
            label="用户覆盖率">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
             fixed="right"
             label="操作"
             width="100">
             <template slot-scope="scope">
               <el-button @click="handleClick(scope.row)" type="text" size="small">插入</el-button>
             </template>
           </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCBWords } from "../../../api/admin";
export default {
  props:['backData'],
  data() {
    return {
      tableLoading: true
    };
  },
  computed: {
    dialogValue: {
		get () {
			return this.backData
		},
		set (val) {
			console.log(val);
		}
	},
	tableData:function() {
      return this.$store.state.creative.creativeArray;
    }
  },
  methods: {
    getData() {
      this.tableLoading = true;
      let id = this.$store.state.titlemess.advId;
      getCBWords(id).then(res=>{
        res.data.forEach(item=> {
          item.words = item.words.toString()
          if (item.status == 'CREATIVE_WORD_STATUS_APPROVE') {
            item.status = '审核通过'
          } else if (item.status == 'CREATIVE_WORD_STATUS_REJECT') {
            item.status = '审核失败'
          } else if (item.status == 'CREATIVE_WORD_STATUS_AUDIT') {
            item.status = '新建审核中'
          } else if (item.status == 'CREATIVE_WORD_STATUS_REAUDIT') {
            item.status = '修改审核中'
          }
        })
        this.tableData = res.data
        this.tableLoading = false
      })
    },
    dialogCloseAction() {
      this.$emit('insertCloseAction')
    },
    handleClick(val) {
      console.log(val);
      this.$emit('insertData',val)
    }
  }
}
</script>

<style lang="scss" scoped>
.insertCB {
  width: 100%;
  // margin-top: 10px;
  // height: 126px;
  .el-table .cell {
    line-height: 30px !important;
  }
}
</style>
