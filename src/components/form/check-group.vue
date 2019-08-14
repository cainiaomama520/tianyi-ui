<template>
  <el-form-item :rule="rule" :prop="prop" :label="label">
    <template solt="label">
      <slot name="label"></slot>
    </template>
    <div class="byted-radio-group btn-group">
      <el-checkbox-group :disabled="disableAll" v-model="checkedValue">
        <el-checkbox-button
          @change="changAll"
          v-if="options.showAll"
          label=""
          :disabled="checkIsDisabled('')"
        >不限</el-checkbox-button>
        <el-checkbox-button
          :disabled="checkIsDisabled(item.id)"
          :label="item.id"
          v-for="(item,index) in options.items"
          class="byted-checkbox-button"
          :key="index"
          @change="optionsChange"
        >{{item.name}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
  </el-form-item>
</template>

<script>
import checkboxs from "./check-group.js";
export default {
  props: {
    attr: {
      type: String,
      required: true
    },
    value: {
      type: String | Number,
      required: true,
      default() {
        return [""];
      }
    },
    showHelp: {
      type: Boolean,
      required: false,
      default: false
    },
    label: {
      type: String,
      required: false
    },
    rule: {
      type: Object | Array,
      required: false,
      default() {
        return [];
      }
    },
    prop: {
      type: String,
      required: false
    },
    disabledItems: {
      type: String | Array,
      required: false
    },
    disableAll: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      checkedValue: this.value
    };
  },
  computed: {
    options() {
      return checkboxs[this.attr];
    },
    checkedOptions() {
      return this.checkedValue.filter(a => a !== "");
    }
  },
  methods: {
    changAll() {
      if (typeof this.value === "string") {
		this.updateValue("");
      } else {
		this.updateValue([""]);
	  }
    },
    optionsChange() {
      if (this.options.showAll) {
        /**如果要和不限联动，就把此代码移除注释 */
        // if (this.checkedOptions.length === this.options.items.length) {
        //   this.updateValue([""]);
        // } else {
        this.updateValue(this.checkedOptions);
        //}
	  }
	  console.log(this.checkedValue,'sele')
    },
    updateValue(val) {
      if (typeof this.value === "string") {
		this.$emit("input", val.join(","));
      } else {
		this.$emit("input", val);
	  }
	  console.log(val)
    },
    checkIsDisabled(id) {
    //   if (this.label === "年龄") {
    //     // debugger;
    //     if (typeof this.disabledItems === "string") {
    //       return this.disabledItems.split(",").indexOf(id) > -1;
    //     }
    //     if (typeof this.disabledItems === "object") {
    //       return this.disabledItems.indexOf(id) > -1;
    //     }
    //   }
    //   return false;
    }
  },
  watch: {
    value(val) {
      this.checkedValue = val;
    }
  }
};
</script>
