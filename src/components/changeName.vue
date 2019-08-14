<template>
  <el-row class="name-change">
    <el-col>
      <input type="text" v-model="name">
	  <!-- <el-input v-model="text" size="small"></el-input> -->
      <el-button type="primary" @click="submitChange" size="mini">确定</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data: function() {
    return {
      name: this.value
    };
  },
  props: {
    value: {
      type: String,
      default: false,
      required: false
    },
    index: {
      type: Number,
      required: false,
      default: 0
    }
  },
  methods: {
    submitChange() {
      this.$emit("emit", {
        callName: "submitChange",
        data: {
          name: this.name,
          index: this.index
        }
      });
    }
  },
  watch: {
    value: function(val) {
      this.name = val;
    }
  }
};
</script>
<style>
.name-change input[type="text"]{
-webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	width: 75%;;
	font-size: 12px;
}
</style>


