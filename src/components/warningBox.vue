<template>
	<div>
		<el-dialog
			:title="title"
			:visible.sync="editFormVisible"
			:close-on-click-modal="false"
			width="66%"
			:before-close="close"
		>
			<el-form :model="editForm" ref="editForm" :rules="rulesForm">
				<el-row :gutter="10" :key="index" v-for="(rule,index) in editForm.adverRuleList">
					<el-col :span="5">
						<el-form-item :label="'规则'+(index+1)" label-width="60px">
							<el-select v-model="rule.k1" placeholder="请选择" size="medium">
								<el-option v-for="item in rules1" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item>
							<el-select v-model="rule.op1" placeholder="请选择" size="medium">
								<el-option
									:key="index"
									v-for="(item,index) in condition"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item label-width="0" :prop="'adverRuleList.'+index+'.v1'" :rules="rulesForm.v1">
							<el-input v-model.number="rule.v1" size="medium"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" label-width="10px">
						<el-form-item label="时"></el-form-item>
					</el-col>
					<el-col :span="3">
						<el-form-item>
							<el-select v-model="rule.k2" placeholder="请选择" @change="changSelect(rule)" size="medium">
								<el-option v-for="item in rules" :key="item.k2" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3" v-if="rule.k2!==''&&!rule.isShow">
						<el-form-item label style="with:100">
							<el-select v-model="rule.op2" placeholder="请选择" size="medium">
								<el-option
									:key="index"
									v-for="(item,index) in condition"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="3" v-if="rule.k2!==''&&!rule.isShow">
						<el-form-item
							label
							label-width="0px"
							:prop="'adverRuleList.'+index+'.v2'"
							:rules="rulesForm.v2"
						>
							<el-input v-model.number="rule.v2" size="medium"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="1" style="color:red" v-if="rule.alert">报警</el-col>
					<el-col :span="3">
						<img
							src="../../static/images/reduce.png"
							class="ruleImg"
							v-show="rule.reduce"
							@click="remove(rule)"
						>
						<img
							src="../../static/images/add.png"
							class="ruleImg"
							style="margin-left:10px"
							v-show="rule.add"
							@click="moreRule(rule)"
						>
					</el-col>
					<el-col :span="4" style="clear:both">
						<el-form-item label="状态" label-width="60px">
							<el-switch v-model="rule.status" :active-value="1" :inactive-value="0"></el-switch>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div class="ealy-warning">
				<p>说明</p>
				<p>1、可用余额 小于等于 1000</p>
				<p>2、总消耗 大于等于 10000 时 点击数 小于等于 200</p>
				<p>3、该指标达到预警设置时，您将收到钉钉消息通知与邮件通知</p>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="close">取消</el-button>
				<!-- <el-button @click="resetForm('editForm')">重置</el-button> -->
				<el-button type="primary" @click.native="editSubmit('editForm')" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import { adverRuleSave, lookAdverRules,deleteAdverRule,seeAdverRules } from "@/api/admin";
export default {
	data () {
		var checknumber1 = (rule, value, callback) => {
			if (!value) {
				callback(new Error("请填写"));
			}
			if (!Number.isInteger(value)) {
				return callback(new Error("请输入数字值"));
			} else {
				callback();
			}
		};
		return {
			editForm: {
				adverRuleList: [
					{
						k1: "balance",
						op1: "le",
						k2: "",
						status: 1,
						isShow: true,
						add: true,
						reduce: false
					}
				]
			},
			rules: [
				{ value: "", label: "不限" },
				{ value: 'balance', label: '余额' },
				{ value: 'validBalance', label: '可用余额' },
				{ value: 'cost', label: '总消耗' },
				{ value: 'cashCost', label: '现金消耗' },
				{ value: "show", label: "展示数" },
				{ value: "click", label: "点击数" },
				{ value: "convert", label: "转化数" },
				{ value: "convert_cost", label: "转化成本" }
			],
			rules1: [
				{ value: 'balance', label: '余额' },
				{ value: 'validBalance', label: '可用余额' },
				{ value: 'cost', label: '总消耗' },
				{ value: 'cashCost', label: '现金消耗' },
				{ value: "show", label: "展示数" },
				{ value: "click", label: "点击数" },
				{ value: "convert", label: "转化数" },
				{ value: "convert_cost", label: "转化成本" }
			],
			condition: [
				{ label: "小于等于", value: "le" },
				{ label: "大于等于", value: "ge" }
			],
			ruleForm: {
				k1: "balance",
				op1: "ge",
				k2: "",
				status: 1,
				isShow: true,
				add: true,
				reduce: true
			},
			warningList: [],
			title: "新建预警规则",
			rulesForm: {
				v1: [{ required: true, validator: checknumber1, trigger: "blur" }],
				v2: [{ required: true, validator: checknumber1, trigger: "blur" }]
			},
			windowShow: false,
			editLoading: false,
			ids:[]
		}
	},
	props: ['editFormVisible', "selectArr"],
	methods: {
		close () {
			// 关闭弹窗
			this.$emit("close", false);
			this.clearRule()
		},
		changSelect (term) {
			// 修改预警条件
			if (term.k2) {
				term.isShow = false;
				term.op2 = "le";
			} else {
				term.isShow = true;
				term.op2 = "";
			}
		},
		moreRule (rule) {
			// 新增规则
			let newRule = JSON.parse(JSON.stringify(this.ruleForm));
			this.editForm.adverRuleList.push(newRule);
			rule.add = false;
			rule.reduce = true;
			this.warningList.push(rule);
			this.editForm.adverRuleList[0].reduce = false;
		},
		remove (relu) {
			// 删除规则
			if (relu.id) {
				deleteAdverRule(relu.id).then(res => {
					console.log(res);
				});
			}
			var index = this.editForm.adverRuleList.indexOf(relu);
			if (index !== -1) {
				this.editForm.adverRuleList.splice(index, 1);
			}
			if (this.editForm.adverRuleList.length == 1) {
				this.editForm.adverRuleList[0].add = true;
			}
		},
		editSubmit (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					// this.editLoading = true;
					if(this.ids.length>0){
						this.editForm.adverIdList=this.ids
					}else{
						this.editForm.adverIdList = this.selectArr;
					}
					adverRuleSave(this.editForm).then(res => {
						if (res.status) {
							// this.editLoading = false;
							this.close()
							this.editForm.adverIdList=[];
							this.ids=[];
							this.$emit('changeRuleSucess',true)
							this.$message({ message: "添加成功", type: "success" });
							
						}
					});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm (formName) {
			this.$refs[formName].resetFields();
			this.clearRule();
		},
		clearRule () {
			this.editForm.adverRuleList = [
				{
					k1: "balance",
					op1: "le",
					k2: "",
					status: 1,
					isShow: true,
					add: true,
					reduce: false
				}
			]
		},
		lookrulue (id) {
			this.ids=[];
			seeAdverRules(id).then(res => {
				this.title = "修改预警规则";
				let array = [];
				res.map((item, index) => {
					array.push(Object.assign({}, item, { add: false }, { reduce: true }));
				});
				if (array[array.length - 1]) {
					array[array.length - 1].add = true;
					array[0].reduce = false;
				}
				this.editForm.adverRuleList = array;
				this.ids.push(id);
			});
		},
		changWarning () {
			// 查看多条规则
			this.title = "设置预警规则";
			let param = this.selectArr.join(",");
			lookAdverRules({ adverIds: param }).then(res => {
				if (res.length > 0) {
					let array = [];
					res.map((item, index) => {
						array.push(
							Object.assign({}, item, { add: false }, { reduce: true })
						);
					});
					if (array[array.length - 1]) {
						array[array.length - 1].add = true;
						array[0].reduce = false;
					}
					this.editForm.adverRuleList= array;
				}
			});
		}
	}
}
</script>

