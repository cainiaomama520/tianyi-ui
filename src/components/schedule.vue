<template>
	<div class="schedule">
		<el-radio-group v-model="show">
			<el-radio-button label="all">不限</el-radio-button>
			<el-radio-button label="select">指定时间段</el-radio-button>
		</el-radio-group>
		<!-- <el-radio-group v-model="show">
			<el-radio label="all" name="show">全时段</el-radio>
			<el-radio label="select" name="show">选择时段</el-radio>
		</el-radio-group> -->
		<transition name="fade-top">
			<div v-show="show=='select'" style="margin-top:32px">
				<table class="calendar-table">
					<thead class="calendar-head">
						<tr>
							<th  class="week-td">星期/时间</th>
							 <th colspan="12">00:00 - 12:00</th> 
							 <th colspan="12">12:00 - 24:00</th>
						</tr>
						<tr>
							<th class="week">
								<label for="checkout_all">
									<!-- <el-checkbox v-model="checkedAll" @click="checkoutAll">全选</el-checkbox> -->
									<input type="checkbox" id="checkout_all" v-model="checkedAll" @click="checkoutAll"> 全选
								</label>
							</th>
							<th v-for="i in 24" @click="clickHead(i-1)">{{i-1}}</th>
						</tr>
					</thead>
				<!-- </table> -->
				<!-- <div class="tbody"> -->
					<!-- <table class="calendar-table"> -->
						<tbody @click="clickTbody">
							<tr v-for="d in (type=='week'?weekOptions:dateList)">
								<td class="week">
									<label v-if="type=='week'" for @click="clickDate(d.value)">{{d.name}}</label>
									<label v-else for @click="clickDate(d)">{{`${d}(${getWeek(d)})`}}</label>
								</td>
								<td
									v-if="type=='week'"
									:class="{item: true, active: active(d.value, h)}"
									v-for="h in 24"
									:data="d.value.replace(/\//g,'') + ('0' + (h -1)).slice(-2)"
								></td>
								<td
									v-else
									:class="{item: true, active: active(d, h)}"
									v-for="h in 24"
									:data="d.replace(/\//g,'') + ('0' + (h -1)).slice(-2)"
								></td>
							</tr>
						</tbody>
					</table>
				<!-- </div> -->
			</div>
		</transition>
	</div>
</template>
<script>
import moment from 'moment';
export default {
	props: {
		value: {
			type: Array,
			required: true,
			default: () => []
		},
		rd: {
			type: String,
			required: true,
			default: "all",
		},
		start: {
			type: [String, Date]
		},
		end: {
			type: [String, Date]
		},
		type: String,
	},
	data () {
		return {
			data: this.value,
			show: this.rd,
			all: [],
			checkedAll: false,
			weekOptions: [{ name: "星期日", value: "0" }, { name: "星期一", value: "1" }, { name: "星期二", value: "2" }, { name: "星期三", value: "3" }, { name: "星期四", value: "4" }, { name: "星期五", value: "5" }, { name: "星期六", value: "6" }]
		};
	},
	methods: {
		checkoutAll (event) {
			this.checkedAll = event.target.checked;
			if (this.checkedAll) {
				this.data = this.all;
			} else {
				this.data = [];
			}
		},
		clickHead (i) {
			this.checkedAll = false;
			let h = ('0' + i).slice(-2);
			let str = JSON.stringify(this.data);
			let reg = this.type == "week" ? new RegExp("[0-6]{1}" + h) : new RegExp('\\d{8}' + h);
			if (reg.test(str)) {
				this.data = this.data.filter(item => {
					return !reg.test(item);
				});
			} else {
				if (this.type == "week") {
					this.weekOptions.forEach(o => this.data.push(o.value + h))
				} else {
					this.data = this.data.concat(this.dateList.map(item => item.replace(/\//g, '') + h));
				}
			}
		},
		clickDate (d) {
			this.checkedAll = false;
			let str = JSON.stringify(this.data);
			let date = d.replace(/\//g, '');
			let reg = new RegExp(date + '\\d{2}');
			if (reg.test(str)) {
				this.data = this.data.filter(item => {
					return !reg.test(item);
				});
			} else {
				let hl = [];
				for (var i = 0; i < 24; i++) {
					hl.push(date + ('0' + i).slice(-2));
				}
				this.data = this.data.concat(hl);
			}
		},
		clickTbody (event) {
			let target = event.target;
			if (target.tagName === 'TD') {
				this.checkedAll = false;
				let v = target.getAttribute('data');
				if (this.data.indexOf(v) !== -1) {
					this.data = this.data.filter(i => i !== v);
				} else {
					this.data.push(v);
				}
			}
		},
		active (d, h) {
			let str = d.replace(/\//g, '') + ('0' + (h - 1)).slice(-2);
			return this.checkedAll || this.data.indexOf(str) !== -1;
		},
		getWeek (d) {
			let w = moment(new Date(d)).weekday();
			return ['日', '一', '二', '三', '四', '五', '六'][w];
		},
	},
	computed: {
		dateList () {
			let list = [];
			let all = [];
			let start = moment(this.start).startOf('day').valueOf();
			let end = moment(this.end).startOf('day').valueOf();
			for (start; start <= end; start += 86400000) {
				let y = moment(start).format('YYYY/MM/DD');
				list.push(y);
				for (let i = 0; i < 24; i++) {
					all.push(y.replace(/\//g, '') + ('0' + i).slice(-2));
				}
			}
			this.all = all;
			return list;
		}
	},
	watch: {
		data (n) {
			if (n.length === 168) {
				this.checkedAll = true;
			}
			this.$emit('input', n);
		},
		show (n) {
			if (n) {
				// this.checkedAll = true;
				if (n == 'all') this.data = [];
				this.$emit('show', n);
			}
		},
		value (v) {
			if (v.length) {
				this.show = "select";
			}
			this.data = v;
		},
		start () {
			this.data = [];
		},
		end () {
			this.data = [];
		}
	},
	mounted () {
		if (this.type == "week") {
			for (let i = 0; i < 23; i++) {
				let t = ('0' + i).slice(-2);
				this.weekOptions.forEach(d => {
					this.all.push(d.value + t);
				})
			}
		}
	}
};
</script>
<style rel="stylesheet/scss" lang='scss' scoped>
.schedule {
	.tbody {
		max-height: 200px;
		width: 620px;
		overflow: auto;
	}
	table {
		user-select: none;
		width: 620px;
		font-size: 12px;
		thead > tr > th {
			width: 20px;
			height: 20px;
			line-height: 20px;
			cursor: pointer;
		}
		tbody {
			td {
				// border: 2px solid #fff;
				line-height: 20px;
				padding: 0;
				text-align: center;
				background: #f5f5f5;
				transition: all 0.2s ease-in-out;
				cursor: pointer;
			}
			.active {
				background: #20a0ff;
			}
		}
		.week {
			background: #fff;
			width: 85px;
		}
	}
}
.calendar-table {
    border-collapse: collapse;
}
 .calendar-table tr .calendar-atom-time {
    background: #f5f5f5;
}
.calendar-table td,  .calendar-table th, .calendar-table tr {
    border: 1px solid #dee4f5;
    font-size: 12px;
    text-align: center;
    min-width: 12px;
    line-height: 1.8em;
    -webkit-transition: background .2s ease;
    -moz-transition: background .2s ease;
    -ms-transition: background .2s ease;
    transition: background .2s ease;
}
</style>
