<template>
  <div class="creatRadio">
    <div class="header">
      <div class="">位置选择</div>
    </div>
    <div class="listBox">
      <el-radio-group v-model="currentValue" @change='changeAction'>
       <el-radio :label="1">沉浸式竖版视频场景</el-radio>
       <el-radio :label="2">信息流场景</el-radio>
       <el-radio :label="3">视频后贴和尾帧场景</el-radio>
     </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 2
    };
  },
  methods: {
    changeAction(val) {
      let obj = {};
      if (val == 1) {
        obj.id = 1;
        obj.label = '沉浸式竖版视频场景'
      } else if(val == 2) {
        obj.id = 2;
        obj.label = '信息流场景'
      } else if(val == 3) {
        obj.id = 3;
        obj.label = '视频后贴和尾帧场景'
      }
      this.$emit('callBackAction',obj)
    }
   }
}
</script>

<style lang="scss">
.creatRadio {
  width: 100%;
  .header {
    background-color: #fafbfe;
    border: 1px solid #dee4f5;
    height: 36px;
    line-height: 36px;
    padding-left: 12px;
    padding-right: 24px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
  }
  .listBox {
    max-height: 200px;
    border: 1px solid #dee4f5;
    overflow-y: auto;
    margin-top: -1px;
    padding-left: 12px;
    padding-right: 24px;
    .el-radio-group {
      width: 100%;
      .el-radio {
        display: flex;
        width: 100%;
        align-items: center;
        margin-left: 0;
        height: 36px;
      }
    }
  }
}
</style>
