<template>
  <div v-if='backData.checked' @click='clickAction' :class="backData.currentShow?'active itemBox':'itemBox'">
    <div class="badgeNum" v-show='badgeNum>0'>{{badgeNum}}</div>
    <div class="img-box">
      <img :src="backData.img" alt="">
    </div>
    <div class="title">{{backData.title}}</div>
    <div class="icon-box">
      <i class="el-icon-circle-close" @click.stop='closeAction'></i>
    </div>
    <div class="warning-Box" v-show='backData.hasWarning && badgeNum>0'>
      <i class="el-icon-warning" @click.stop='closeAction'></i>
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
  mounted() {
  },
  computed: {
    badgeNum: {
      get () {
        if (this.$store.state.creative.creatStyle==1) {
          console.log(1);
          if (!this.$store.state.creative.selfCreativeArray[this.backData.id-1]) {
            return 0;
          }
          return this.$store.state.creative.selfCreativeArray[this.backData.id-1].length;
        } else {
          if (!this.$store.state.creative.progCreativeArray[this.backData.id-1]) {
            return 0;
          }
          return this.$store.state.creative.progCreativeArray[this.backData.id-1].length;
        }
		  },
    }
  },
  methods: {
    clickAction() {
      this.$emit('callbackItem',this.backData);
    },
    closeAction() {
      this.backData.checked = false
      this.$emit('closeItem',this.backData);
    }
  }
}
</script>

<style lang="scss" scoped>
  .itemBox {
    display: flex;
    position: relative;
    background: #fff;
    box-shadow: 0 2px 4px 0 #eff1fa;
    border-radius: 2px;
    border: 1px solid #dee4f5;
    padding: 10px 12px;
    margin-left: 8px;
    cursor: pointer;
    .badgeNum {
      position: absolute;
      top: 3px;
      left: -3px;
      width: 24px;
      height: 16px;
      line-height: 16px;
      background: #598fe6;
      text-align: center;
      border-radius: 2px;
      color: #fff;
    }
    .img-box {
      width: 36px;
      height: 64px;
      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }
    .title {
      width: 56px;
      margin: auto 0 auto 12px;
      font-weight: 700;
    }
    .icon-box {
      position: absolute;
      background-color: #fff;
      right: -7px;
      top: -7px;
      line-height: 0;
      font-size: 16px;
      opacity: 0;
    }
    .warning-Box {
      position: absolute;
      color: red;
      right: 7px;
      bottom: 7px;
      line-height: 0;
      font-size: 16px;
    }
  }
  .active {
    border-color: #598fe6;
  }
  .itemBox:first-child {
    margin-left: 0;
  }
  .itemBox:hover {
    .icon-box {
      opacity: 0.4;
    }
  }
  .active::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    bottom: -5px;
    right: 20px;
    position: absolute;
    background-color: #fff;
    border: 1px solid #598fe6;
    border-top-width: 0;
    border-left-width: 0;
    transform: rotate(45deg);
    box-shadow: 0 2px 4px 0 #eff1fa;
  }
</style>
