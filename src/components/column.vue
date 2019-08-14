<template>
	<div>
		<el-row>
			<el-col :span="8">
				<div class="byted-select-panel-moduler-header">
					<span class="byted-select-panel-moduler-header-title">手机品牌</span>
				</div>
				<div class="byted-select-panel-moduler-container">
					<div class="byted-select-panel-item-list">
						<el-checkbox
							:indeterminate="isIndeterminate"
							v-model="checkAll"
							@change="handleCheckAllChange"
						>全选</el-checkbox>
					</div>
					<div v-for="item in list" :key="item.value" class="byted-select-panel-item-list">
						<el-checkbox-group
							v-model="checkedCities"
							@change="handleCheckedCitiesChange(checkedCities,item)"
						>
							<el-checkbox :label="item.value">{{item.label}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
			</el-col>

			<el-col :span="7" v-if="hasSelect.length>0" style="margin-left:30px">
				<div class="byted-select-panel-moduler-header">
					<span class="byted-select-panel-moduler-header-title">已选</span>
					<span class="byted-select-panel-moduler-header-clear" @click="clearAll">清空全部</span>
				</div>
				<div class="byted-select-panel-moduler-container">
					<div v-for="item in hasSelect" :key="item.label" class="byted-select-panel-item-list">
						{{item.label}}
						<i class="el-icon-close fr" style="margin-top: 10px;" @click="remove(item)"></i>
					</div>
				</div>
			</el-col>
		</el-row>
		<div></div>
	</div>
</template>
<script>
export default {
	props: {
		list: {
			type: Array,
			require: false,
			default: () => []
		},
		value: {
			type: Array,
			require: false,
			default: () => []
		}
	},
	data: function () {
		return {
			isIndeterminate: false,
			checkAll: false,
			hasSelect: [],
			checkedCities: this.value
		}
	},
	methods: {
		handleCheckedCitiesChange (arr, val) {
			let arr1 = []
			this.list.map(item => {
				arr.filter(value => {
					if (item.value == value) {
						arr1.push(item)
					}
				})
			})
			this.hasSelect = arr1;
			//  判断是否是全选
			let checkedCount = arr.length;
			this.checkAll = checkedCount === this.list.length;
		},
		handleCheckAllChange (val) {
			//一级判断是否全选
			let allList = JSON.parse(JSON.stringify(this.list))
			let arr = [];
			arr = this.list.map(v => { return v.value });
			this.checkedCities = val ? arr : [];
			this.hasSelect = val ? allList : [];
		},
		remove (item) {
			var index = this.hasSelect.indexOf(item)
			if (index !== -1) {
				this.hasSelect.splice(index, 1);
			}
			this.checkedCities.splice(this.checkedCities.findIndex(v => v === item.value), 1)
		},
		clearAll () {
			this.checkedCities = [];
			this.hasSelect = []
			this.checkAll = false;
		},
	},
	mounted(){
		this.checkedCities=this.value;
		if (this.value.length == this.list.length) {
				this.checkAll = true
			}
	},
	watch: {
		checkedCities (n) {
			if (n.length == this.list.length) {
				this.checkAll = true
			} else {
				this.checkAll = false
			}
			this.$emit('input', n)
		}
	}
}
</script>

