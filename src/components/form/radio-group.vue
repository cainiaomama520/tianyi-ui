<template>
  <el-form-item :rule="rule" :label="label">
    <template solt="label">
      <slot name="label"></slot>
    </template>
    <div class="byted-radio-group btn-group">
      <el-radio-group @change="valueChange" v-model="checkValue" :disabled="disabled">
        <el-radio-button size="medium" :label="item.id" :key="index" v-for="(item,index) in options">{{item.text}}</el-radio-button>
      </el-radio-group>
    </div>
  </el-form-item>
</template>

<script>
import options from "./radio-group.js";
export default {
  props: {
    value: {
      type: String | Number,
      required: true
    },
    attr: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    rule: {
      required: false
    },
	disabled:{
		type: Boolean,
		required: false
	}
  },
  data() {
    return {
      // 如果要修改默认值可以改这个地方。
      checkValue: this.value || 0
    };
  },
  watch: {
    value(val) {
      this.checkValue = val;
    }
  },
  computed: {
    options() {
      return options[this.attr];
    }
  },
  methods: {
    valueChange(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style>
</style>
