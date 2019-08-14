<template>
	<el-table
		:show-summary="showSummary"
		:data="data"
		:default-sort="sortorder"
		highlight-current-row
		v-loading="loading"
		style="width: 100%;"
		height="500"
		border
		@cell-click="cellClick"
		@selection-change="handleSelectionChange"
		:summary-method="getSummaries"
		@sort-change="sortChange"
	>
		<el-table-column v-if="expandCols&&expandCols.length" type="expand">
			<template slot-scope="props">
				<el-form label-position="left" inline class="demo-table-expand">
					<el-form-item v-for="(item,index) in expandCols" :key="'expendCol'+index" :label="item.value">
						<span v-if="!item.formatter">{{ props.row[item.id] }}</span>
						<table-cell
							v-else
							:index="props.$index"
							@emit="emit"
							:item="props.row"
							:renderd="item.formatter"
							:col="item.id"
						></table-cell>
					</el-form-item>
				</el-form>
			</template>
		</el-table-column>
		<!-- 全选 -->
		<el-table-column v-if="showCheckBox" type="selection" width="63"></el-table-column>

		<el-table-column
			v-for="(item,index) in normalCols"
			:key="index"
			:prop="item.id"
			:label="item.value"
			:width="item.width"
			:min-width="item.minWidth"
			:sortable="item.sortable"
			:fixed="item.fixed"
		>
			<template slot-scope="scope" v-if="item">
				<!-- <template v-if="scope.$index==0&&(item.id==''||item.id=='title')">合计</template>
				<table-cell v-if="scope.$index==0" :item="scope.row" :col="item.id"></table-cell>-->
				<table-cell
					:index="scope.$index"
					@emit="emit"
					:item="scope.row"
					:renderd="item.formatter"
					:col="item.id"
				></table-cell>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import factory from "../ds-table/columnfactory";
import { mapGetters } from "vuex";
import "./tableCell.js";
export default {
	props: {
		type: {
			type: String,
			required: true
		},
		data: {
			type: Array,
			required: true
		},
		total: {
			type: Object,
			required: true
		},
		loading: {
			type: Boolean,
			required: false,
			default: false
		},
		selection: {
			type: Boolean,
			required: false,
			default: true
		},
		showSummary: {
			type: Boolean,
			required: false,
			default: true
		},
		showCheckBox: {
			type: Boolean,
			required: false,
			default: true
		},
		sortorder: {
			type: Object,
			required: false,
			default: false
		},
		showPlan: {
			type: Boolean,
			required: false,
			default: false
		}
		// tableHeight:{
		// 	type: Number,
		//   required: false
		// }
	},
	data () {
		return {
			multipleSelection: [],
			isswitch: true,
			columns: new factory(this.type).cols.cols(),
			isFinance:true
		};
	},
	computed: {
		cols: function () {
			return this.columns;
		},
		expandCols: function () {
			return this.cols.filter(a => {
				return a.expand;
			});
		},
		normalCols: function () {
			return this.cols.filter(a => a.expand === false);
		},
		userType: function () {
			return this.$store.state.user.role;
		}
	},
	methods: {
		updateheader () {
			this.columns = new factory(this.type).cols.cols();
		},
		emit () {
			this.$emit(arguments[0], arguments[1]);
		},
		handleSelectionChange (val) {
			this.multipleSelection = val;
			this.$emit("mul-select", this.multipleSelection);
		},
		cellClick: function (row, column, cell, event) {
			this.$emit("cell-click", row, column);
		},
		sortChange: function (column) {
			this.$emit("sortChange", column);
		},
		del (val) { },
		getSummaries (param) {
			let vm = this;
			let sums = [];
			if (this.showSummary) {
				var selectedColm = param.columns;
				let newArray = [];
				selectedColm.forEach(a => {
					if (vm.total[a.property]) {
						newArray.push(vm.total[a.property]);
					} else {
						newArray.push("");
					}
				});
				sums = newArray;
				sums[0] = "合计";
				return sums;
			}
		}
	}
};
</script>

<style>
</style>
