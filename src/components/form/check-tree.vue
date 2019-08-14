<template>
  <div>
    <el-col :span="8">
      <div class="byted-select-panel-moduler-header">
        <span class="byted-select-panel-moduler-header-title">{{name[level]}}</span>
      </div>
      <div class="byted-select-panel-moduler-container">
        <div class="byted-select-panel-item-list">
          <el-checkbox @change="checkedAllChange" v-model="checkAll">全选</el-checkbox>
        </div>
        <div
          v-for="(item,index) in checkboxs"
          :key="index+''+item.value"
          class="byted-select-panel-item-list"
        >
          <el-checkbox
            @change="checkBoxStatusChange(item,index)"
            v-model="item.checked"
          >{{item.label}}</el-checkbox>
          <i v-if="item.subTags&&item.subTags.length>0" class="el-icon-arrow-right"></i>
        </div>
      </div>
    </el-col>
    <check-tree
      ref="childNode"
      v-if="currentItem.subTags&&currentItem.subTags.length>0"
      @childNodeChange="childNodeChange"
      :list.sync="currentItem.subTags"
      :level="levels"
      :name="name"
    ></check-tree>
    <el-col :span="7" v-if="level===0" style="margin-left:30px">
      <div class="byted-select-panel-moduler-header">
        <span class="byted-select-panel-moduler-header-title">已选</span>
        <span @click="removeAll" class="byted-select-panel-moduler-header-clear">清空全部</span>
      </div>
      <div class="byted-select-panel-moduler-container">
        <div
          v-for="(item,index) in checkedNodes"
          :key="item.value+''+index"
          class="byted-select-panel-item-list"
        >
          {{item.label}}
          <i class="el-icon-close fr" style="margin-top: 10px;" @click="remove(item)"></i>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      checkboxs: [],
      currentItem: {},
      checkAll: false,
      levels: this.level + 1
    };
  },
  props: {
    list: {
      type: Array,
      require: false,
      default: () => []
    },
    level: {
      type: Number,
      require: false,
      default: 0
    },
    value: {
      type: Array,
      require: false,
      default: () => []
    },
    name: {
      type: Array,
      require: false,
      default: ""
    }
  },
  methods: {
    removeAll() {
      let self = this;
      this.checkboxs.forEach((item, index) => {
        if (item.subTags && item.subTags.length > 0) {
          item.subTags.forEach((b, subIndex) => {
            b.checked = false;
            item.subTags.splice(subIndex, 1, b);
          });
        }
        item.checked = false;
        self.checkboxs.splice(index, 1, item);
      });
    },
    remove(item) {
      item.checked = false;
      // debugger;
      if (item.subTags && item.subTags.length) {
        item.subTags.forEach((a, index) => {
          a.checked = false;
          item.subTags.splice(index, 1, a);
        });
        this.currentItem = item.subTags;
      }
      let index = this.checkboxs.findIndex(a => a.value == item.value);
      if (index > -1) {
        this.checkboxs.splice(index, 1, item);
      } else {
        index = this.checkboxs.findIndex((a, index) => {
          return a.subTags.findIndex(b => b.value == item.value) > -1;
        });
        let topItem = this.checkboxs[index];
        topItem.checked = false;
        this.checkboxs.splice(index, 1, topItem);
      }
    },
    /**
     *设置子节点的选项是哪个
     */
    checkBoxStatusChange(item, index) {
      if (item.subTags && item.subTags.length > 0) {
        item.subTags.forEach((a, _index) => {
          a.checked = item.checked;
          item.subTags.splice(index, 1, a);
        });
      }
      this.currentItem = item;
      this.checkboxs.splice(index, 1, item);
      this.$emit(
        "childNodeChange",
        this.checkboxs.filter(a => a.checked) === this.checkboxs.length
      );
    },
    /**
     * 全选状态变化。同时更新父节点和子节点。
     */
    checkedAllChange(val) {
      let self = this;
      this.checkboxs.forEach((a, index) => {
        a.checked = val;
        if (a.subTags && a.subTags.length > 0) {
          a.subTags.forEach((d, _index) => {
            d.checked = val;
            a.subTags.splice(_index, 1, d);
          });
        }
        self.checkboxs.splice(index, 1, a);
      });
      if (this.level > 0) {
        this.$emit("childNodeChange", val);
      }
    },
    /**
     * 子节点选中状态变化的时候，把当前节点的数据，传入到下一级组件。并且更新父节点的状态。
     */
    childNodeChange: function(val) {
      let self = this;
      let currentNodeindex = 0;
      this.checkboxs.find((a, index) => {
        currentNodeindex = index;
        return a.value === self.currentItem.value;
      });
      this.currentItem.checked = val;
      this.checkboxs.splice(currentNodeindex, 1, this.currentItem);
      this.$emit("childNodeChange", val);
    },
    initData(arr) {
      let self = this;
      if (arr && arr.length >= 0) {
        arr.forEach((a, index) => {
          // debugger
          a.checked = self.value.indexOf(a.value) > -1;
          if (a.subTags && a.subTags.length > 0) {
            self.initData(a.subTags);
          } else {
            arr.splice(index, 1, a);
          }
        });
      }
    }
  },
  components: {
    checkTree: resolve => require(["./check-tree.vue"], resolve)
  },
  computed: {
    isChekedAll() {
      if (this.checkboxs && this.checkboxs.length > 0) {
        if (this.level == 1) {
          // debugger;
        }
        return (
          this.checkboxs.filter(a => a.checked).length === this.checkboxs.length
        );
      } else {
        return "";
      }
    },
    currentItemChecked() {
      if (this.currentItem && this.currentItem.subTags) {
        return (
          this.currentItem.subTags.filter(a => a.checked).length ===
          this.currentItem.subTags.length
        );
      } else {
        return false;
      }
    },
    checkedNodes() {
      if (this.level === 0) {
        // 选中的顶级节点。
        let checkNodes = [];
        let topCeckedNodes = this.checkboxs.filter(a => a.checked);
        let topUnCheckedNodes = this.checkboxs.filter(a => !a.checked);
        let subCheckedNodes = [];
        // debugger;
        topUnCheckedNodes.forEach(a => {
          subCheckedNodes = subCheckedNodes.concat(
            a.subTags.filter(b => b.checked)
          );
        });
        return topCeckedNodes.concat(subCheckedNodes);
      }
      return [];
    }
  },
  created() {
    if (this.level === 0) {
      this.initData(this.list);
    }
    this.checkboxs = this.list;
  },
  watch: {
    isChekedAll(val) {
      console.log("isChekedAll", val);
      this.checkAll = val;
      this.$emit("childNodeChange", val);
    },
    currentItemChecked(val) {
      this.currentItem.checked = val;
    },
    list(val) {
      this.checkboxs = val;
    },
    checkedNodes(val) {
      let values = val.map(a => {
        return a.value;
      });
      this.$emit("input", values);
    }
  }
};
</script>

