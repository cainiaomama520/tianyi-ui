<template>
	<div>
		<div class="gray" style="font-size:12px;cursor: pointer;" @click="showMore(custom)">
			<i :class="custom.showItem?'el-icon-arrow-down':'el-icon-arrow-right'"></i>
			{{custom.title}}
			<el-checkbox
				style="margin-left:20px;"
				:indeterminate="isIndeterminate"
				v-model="checkAll"
				@change="handleCheckAlldate"
			>全选</el-checkbox>
		</div>
		<el-checkbox-group
			v-model="checkedItem"
			@change="handleCheckedChange"
			style="width:330px;"
			:style="custom.showItem?'dispaly:block':'display: none;'"
		>
			<el-checkbox
				v-if="!i.notFilter"
				v-for="(i,index) in custom.list"
				:label="i.id"
				:key="index"
			>{{i.value}}</el-checkbox>
		</el-checkbox-group>
	</div>
</template>
<script>
export default {
	data () {
		return {
			isIndeterminate: true,
			checkAll: false,
			checkedItem: this.custom.list
				.filter(item => {
					return item.show
				})
				.map(function (a) {
					return a.id;
				})
		};
	},
	name: "customList",
	props: {
		custom: {
			type: Object,
			required: true
		}
	},
	methods: {
		handleCheckAlldate (val) {
			this.custom.list.forEach(element => {
				element.show = val;
			});
			this.checkedItem = val ? this.custom.list.map(a => {
				return a.id;
			}) : [];
			this.isIndeterminate = false;
			// this.$store.commit("UpdateTableHeader", {
			// 	key: this.custom.type,
			// 	list:this.custom.list
			// });
			// this.$store.commit("UpdateTableHeader",this.custom.list)
		},
		handleCheckedChange (value) {
			let vm = this;
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.custom.list.length;
			this.custom.list.forEach(ele => {
				ele.show = vm.checkedItem.indexOf(ele.id) > -1;
			});
			this.isIndeterminate =
				checkedCount > 0 && checkedCount < this.custom.list.length;
			// this.$store.commit("UpdateTableHeader",this.custom.list)
			// this.$store.commit("UpdateTableHeader", {
			// 	key: this.custom.type,
			// 	list:this.custom.list
			// });
			console.log(this.custom.list, 'this.custom.list')
		},
		showMore (item) {
			item.showItem = !item.showItem
		}
	}
};
</script>


