<template>
	<div>
		<div class="creativeTilte">
			<div class="labelItem">
				<div class="left" style="min-width:80px">
					<div class="startNone"></div>
					<div class="labelContent">
						<div>创意标题</div>
						<div class="radiusSpot"></div>
					</div>
				</div>
				<div class="right">
					<el-input placeholder="请输入内容" v-model="currentModel.title" :id="titleId">
						<template slot="append">{{currentModel.titleLength||titleLength}}/25</template>
					</el-input>
					<div class="cibaoClass">
						<div v-if="currentModel.hasWarning" class="warningT">标题为6~25个字</div>
						<span style="color: #999;">插入动态词包</span>
						<a href="javascript:void(0);" v-for="item in cibaoArray" @click="cibaoAction(titleId,item)">+{{item}}</a>
						<a href="javascript:void(0);" @click="showInsertCB" style="margin-left:50px">更多</a>
					</div>
				</div>
			</div>
		</div>
		<insertCB
			:backData="insertCBValue"
			@insertCloseAction="insertCloseAction"
			@insertData="insertBackData"
		></insertCB>
	</div>
</template>
<script>
import { getCBWordsLength } from "../../../api/admin";
export default {
	data () {
		return {
			currentModel: {
				title: this.value,
				titleLength: 0,
				hasWarning: false,
			},
			insertCBValue: false,
			cibaoArray: ['地点', '日期', '星期', '年龄'],
		}
	},
	props: {
		value: {
			type: String | Number,
			required: true,
			default () {
				return [""];
			}
		},
		titleLength:{
			type: Number|undefined,
			required: true,
		},
		titleId:{
			type: String,
			required: false
		}
	},
	methods: {
		showInsertCB () {
			this.insertCBValue = true
		},
		insertCloseAction () {
			this.insertCBValue = false
		},
		insertBackData (val) {
			this.insertCBValue = false
			this.cibaoAction(this.titleId,val.name)
		},
		cibaoAction (id,val) {
			// 插入动态词包
			console.log(this.titleId,'this.titleId',id)
			if (this.currentModel.title.includes(val)) {
				return;
			}
			var elInput = document.getElementById(id);
			var startPos = elInput.selectionStart;
			var endPos = elInput.selectionEnd;
			if (startPos === undefined || endPos === undefined) return;
			var txt=elInput.value;
			var result = txt.substring(0, startPos) + '{' + `${val}` + '}' + txt.substring(endPos);
			let str = eval("/" + '}' + "/ig");
			let mac = this.currentModel.title.match(str);
			if (mac != null && mac.length >= 2) {
				this.$message.error('最多插入两个词包');
				return;
			}
			// elInput.focus();
			// elInput.selectionStart = startPos + val.length;
			// elInput.selectionEnd = startPos + val.length;
			this.currentModel.title=result;
		}
	},
	components: {
		insertCB: resolve => require(["./insertCB.vue"], resolve),
	},
	watch: {
		'currentModel.title': function (val) {
			this.$emit("input",val)
			let str = '?advertiserId=' + this.$store.state.titlemess.advId + '&title=' + encodeURI(val)
			getCBWordsLength(str).then(res => {
				this.$emit("getWordIds",res.data);
				this.currentModel.titleLength = res.data.length || 0;
			})
		},
		'currentModel.titleLength': function (val) {
			if (val < 6 || val > 25) {
				this.currentModel.hasWarning = true
				this.$emit('wordsLengthWarning', this.backData, true)
			} else {
				this.currentModel.hasWarning = false
				this.$emit('wordsLengthWarning', this.backData, false)
			}
		},
		value(val) {
			this.currentModel.title = val;
		}
	}
}
</script>

