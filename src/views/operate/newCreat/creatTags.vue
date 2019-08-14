<template>
  <div class="creatTags" v-show='backData.length > 0'>
    <div class="header">
      <div>已选</div>
      <div @click='clearAllAction' style="position:absolute;right:10px;color:#598fe6">清空全部</div>
    </div>
    <div class="listBox">
      <div class="item" v-for='(item,index) in backData'>
        <span>{{item}}</span>
        <i class="el-icon-close" @click='closeAction(index)'></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['backData'],
  data() {
    return {
    };
  },
  methods: {
    closeAction(index) {
      this.backData.splice(index,1)
    },
    clearAllAction() {
      this.$emit('clearCreatTags')
    }
  }
}
</script>

<style lang="scss" scoped>
.creatTags {
  width: 100%;
  margin-top: 10px;
  height: 126px;
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
    .el-checkbox {
      width: 100%;
      .el-checkbox__label {
        font-size: 14px;
        font-weight: 700;
        color: #333;
      }
    }
  }
  .listBox {
    border: 1px solid #dee4f5;
    overflow-y: auto;
    margin-top: -1px;
    margin-bottom: 5px;
    padding-bottom: 5px;
    padding-left: 12px;
    padding-right: 24px;
    line-height: 0;
    height: 100%;
    .item {
      position: relative;
      display: inline-block;
      width: calc(50% - 10px);
      height: 28px;
      margin-top: 5px;
      margin-left: 10px;
      line-height: 28px;
      background-color: #f8f8f8;
      span {
        display: block;
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        color: #333;
        margin-right: 15px;
        height: 28px;
        line-height: 28px;
      }
      i {
        position: absolute;
        right: 8px;
        top: 13px;
        line-height: 0;
        opacity: 0.3;
        cursor: pointer;
      }
    }
  }
}
</style>
