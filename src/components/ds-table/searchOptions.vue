<template>
  <div class="options">
    <custom-list
      v-if="checkFilterFileds(item.list)"
      v-for="(item,index) in groups.values"
      :key="index"
      :custom="item"
    ></custom-list>
    <div style="float:right">
      <el-button type="primary" @click="setTableHeader" size="small">确定</el-button>
    </div>
  </div>
</template>
<script>
import colfactoty from "../ds-table/columnfactory";
export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  watch: {
    type: function(val) {
      this.groups = new colfactoty(val).cols;
    }
  },
  data: function() {
    return {
      groups: new colfactoty(this.type).cols
    };
  },
  components: {
    customList: resolve => require(["../customlist"], resolve)
  },
  methods: {
    setTableHeader: function() {
	  new colfactoty(this.type).cols.save(this.groups.values);
	  this.$emit("updateheader",null);
	  document.querySelector("#app").click();
    },
    checkFilterFileds: function(values) {
      return values.filter(a => a.notFilter).length !== values.length;
    }
  },
  created: function() {
    this.groups = new colfactoty(this.type).cols;
  }
};
</script>

<style>
.options {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
