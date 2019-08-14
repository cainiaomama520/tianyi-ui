<template>
  <div :class="{'checked':backData.checked,'adItem':true, 'disabled':backData.disabled}" @click='itemClickAction'>
    <div class="itemWrapper">
      <div class="media">
        <img :src="backData.img" alt="">
      </div>
      <div class="content">
        <div class="title">{{backData.title}}</div>
        <div class="desc">{{backData.desc}}</div>
      </div>
    </div>
    <div class="isCheckBox">
      <el-checkbox :disabled='backData.disabled' v-model="backData.checked"></el-checkbox>
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
    itemClickAction() {
      if (this.backData.disabled) {
        return ;
      }
      this.backData.checked = !this.backData.checked
    }
  }
}
</script>

<style lang="scss">
.adItem {
  position: relative;
  float: left;
  width: 185px;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 2px;
  border: 1px solid #dee4f5;
  cursor: pointer;
}
.checked {
   border-color: #598fe6;
}
.disabled {
  background-color: #f8f8f8;
}
.itemWrapper {
  display: flex;
  padding: 15px;
  .media {
    width: 40px;
    height: 71px;
    margin-right: 15px;
    img {
      vertical-align: middle;
    }
  }
  .media:first-child {
    margin-top: 0;
  }
  .content {
    flex:1;
    .title {
      font-weight: 500;
      margin-bottom: 6px;
    }
    .desc {
      color: #999;
    }
  }
}
.isCheckBox {
  position: absolute;
  top: 3px;
  right: 5px;
}
</style>
