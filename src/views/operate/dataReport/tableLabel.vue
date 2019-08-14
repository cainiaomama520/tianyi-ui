<template>
  <div class="group-label">
    <ul>
      <li v-for="item in groupLabels">
        <div class="label-title"  style="font-size:12px;color:#606266">
			<span @click="item.showItem=!item.showItem" class="gray">
				<i :class="item.showItem?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
				{{item.title}}
			</span>
          <span @click="cancelAll(item.list)" v-if="isInAll(item.list)">全部取消</span>
          <span @click="selectAll(item.list)" v-else>全选</span>
        </div>
		<div v-show="item.showItem">
			<el-checkbox-group v-model="cheeckedItem">
				<el-checkbox  @change="changeItem(item1)" v-for="item1 in item.list" :label="item1.id" :key="item.id">{{item1.value}}</el-checkbox>
			</el-checkbox-group>
		</div>
      </li>
    </ul>
  </div>
</template>
<script>
import { initGroupLabels, initModel } from '@/api/dataReport'
export default {
  data () {
    return {
      groupLabels: [],
	  selectGroups: [],
	  cheeckedItem:[],
	  isIndeterminate:false,
	  checkAll:false
    }
  },
  props: {
    pageType: { type: String, default: '1' },
  },
  watch: {
    selectGroups: function (val) {
      this.$emit("changeTableHeader", val);
    }
  },
  created: function () {
    let arr = [], arr1 = initModel('data'), arr3 = initModel('idea'), arr2 = initModel('plan');
    switch (this.pageType) {
      case '1':
        this.groupLabels = arr1.concat(initModel('advgroup'));
        this.selectGroups = arr.concat(initModel('initAdvgroup'));
        break;
      case '2':
        this.groupLabels = arr1.concat(arr3).concat(arr2);
        this.selectGroups = arr.concat(initModel('initPlan'));
        break;
      case '3':
        this.groupLabels = arr1.concat(arr3);
        this.selectGroups = arr.concat(initModel('initIdea'));
		break;		
	}
	this.cheeckedItem=this.selectGroups.map(item=>{
		return item.id;
	})
	console.log(this.selectGroups,'sdsdsl')
  },
  methods: {
    isInAll: function (item) {
      var counter = 0;
      for (var i = 0; i < item.length; i++) {
        if (this.inArray(item[i], this.selectGroups) != -1) {
          counter++;
        }
      }
      if (counter == item.length) {
        return true;
      }
      return false;
    },
    selectAll (item) {
      for (var i = 0; i < item.length; i++) {
        if (this.inArray(item[i], this.selectGroups) == -1) {
          this.selectGroups.push(item[i]);
        }
      }
      this.cheeckedItem=this.selectGroups.map(item=>{
			return item.id;
		})
    },
    cancelAll (item) {
      var index;
      for (var i = 0; i < item.length; i++) {
        index = this.inArray(item[i], this.selectGroups);
        if (index != -1) {
          this.selectGroups.splice(index, 1);
        }
	  }
	  this.cheeckedItem=[]
    },
    changeItem (item) {
      var index = this.inArray(item, this.selectGroups);
      if (index == -1) {
        this.selectGroups.push(item);
      } else {
        this.selectGroups.splice(index, 1);
	  }
	  console.log('item',this.selectGroups)
    },
    inArray (item, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == item.id) {
          return i;
        }
      }
      return -1;
    }
  }
}
</script>