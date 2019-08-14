<template>
	<!-- 弹窗选择转化目标 -->
	<el-dialog
		:show-close="false"
		title="扩展人群"
		:visible.sync="extendVisible"
		:close-on-click-modal="false"
		width="700px"
		@open="open"
	>
		<el-form
			ref="ruleForm"
			:rules="rules"
			:model="ruleForm"
			label-width="120px"
			class="extendModal"
		>
			<!-- <div class="row-item" :style="isShow?'margin-bottom:0':''">
				<el-form-item label="人群分布">
					<div class="byted-radio-group btn-group">
						<div>原始人数：5,556
							<el-button
								type="text"
								style="width:100px"
								@click="isShow=!isShow"
							>{{!isShow?'显示':'隐藏'}}分平台覆盖人数</el-button>
						</div>
					</div>
				</el-form-item>
			</div> -->
			<!-- <div class="row-item" v-show="isShow">
				<el-form-item>
					<div class="byted-radio-group btn-group">
						<p>今日头条：285人</p>
						<p>西瓜视频：70人</p>
						<p>火山小视频：62人</p>
						<p>抖音短视频：1,824人</p>
					</div>
				</el-form-item>
			</div> -->
			<div class="row-item">
				<el-form-item label="扩展类型">
					<div class="byted-radio-group btn-group" style="width:500px">
						<el-radio-group v-model="ruleForm.mode">
							<el-radio-button :key="index" :label="item.value" v-for="(item,index) in type">
								{{item.label}}
								<el-popover placement="top-start" width="380" trigger="hover" :content="item.tip">
									<i class="el-icon-question" slot="reference"></i>
								</el-popover>
							</el-radio-button>
						</el-radio-group>
					</div>
				</el-form-item>
			</div>
			<div class="row-item">
				<el-form-item label="扩展设备" prop="platform">
					<div class="byted-radio-group btn-group" style="width:500px">
						<el-radio-group v-model="ruleForm.platform">
							<el-radio-button
								:key="index"
								:label="item.value"
								v-for="(item,index) in devices"
							>{{item.label}}</el-radio-button>
						</el-radio-group>
					</div>
				</el-form-item>
			</div>
			<!-- 转化跟踪方式为相似人群start -->
			<div>
				<div class="row-item">
					<!-- <el-form-item label="扩展流量平台" prop="type">
            <div class="byted-radio-group btn-group" style="width:550px">
              <el-checkbox-group v-model="ruleForm.platform">
                <el-checkbox-button
                  :label="item.value"
                  @change="changePlatform(item.value)"
                  :class="item.value!=''?'byted-checkbox-button':''"
									:key="index"
                  v-for="(item,index) in platform"
                >{{item.label}}</el-checkbox-button>
              </el-checkbox-group>
              <p style="width:510px;font-size: 12px;line-height: 20px;color: #999;">已选择
                <span :key="index" v-for="(word,index) in word">{{word.label}}，</span>可扩展上限为5000万人，将按照人群相似度最大值进行组合扩展
              </p>
            </div>
					</el-form-item>-->
				</div>
				<div class="row-item">
					<el-form-item label="扩展数量" prop="type">
						<div class="byted-radio-group btn-group" style="width:500px">
							<el-slider
								v-model="ruleForm.lookalike"
								:show-input-controls="false"
								input-size="mini"
								:max="5000"
								:min="100"
								:step="10"
								show-input
							></el-slider>
							<span style="position: absolute;right: -10px;top: 0px;">万人</span>
							<span class="extendNumber">100</span>
							<span class="extendNumber rightN">5000</span>
						</div>
					</el-form-item>
				</div>
				<!-- <div class="row-item">
          <el-form-item label="保留种子人群" prop="type">
            <div class="byted-radio-group btn-group" style="width:500px">
              <el-radio-group v-model="ruleForm.device">
                <el-radio-button label="1">保留</el-radio-button>
                <el-radio-button label="1">删除</el-radio-button>
              </el-radio-group>
            </div>
          </el-form-item>
				</div>-->
			</div>
			<!-- 转化跟踪方式为相似人群end -->
			<!-- 转化跟踪方式为好友人群start -->
			<!-- <div v-else>
        <div class="row-item">
          <el-form-item label="扩展倍数" prop="lookalike_num">
            <div class="byted-radio-group btn-group" style="width:460px">
              <el-slider v-model="ruleForm.lookalike_num" :max="16" :min="1"></el-slider>
              <span class="extendNumber">1</span>
              <span class="extendNumber">16</span>
            </div>
          </el-form-item>
        </div>
        <div class="row-item">
          <el-form-item label="预期人数" prop="type">
            <div class="byted-radio-group btn-group">277,800</div>
          </el-form-item>
        </div>
			</div>-->
			<!-- 转化跟踪方式为好友人群end -->
			<div class="row-item">
				<div class="required-item"></div>
				<el-form-item label="名称" prop="name">
					<div class="byted-radio-group btn-group" style="width:470px">
						<el-input v-model="ruleForm.name" placeholder="请输入人群包名称"></el-input>
					</div>
				</el-form-item>
			</div>
			<div class="row-item">
				<div class="required-item"></div>
				<el-form-item label="人群分组" prop="tag">
					<div class="byted-radio-group btn-group">
						<el-select v-model="ruleForm.tag" allow-create filterable placeholder="请输入或选择人群分组" style="width:470px">
							<el-option v-for="item in personList" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</el-form-item>
			</div>
			<div class="row-item" style="margin-left: 460px;">
				<el-button @click.native="resetForm('ruleForm')">取消</el-button>
				<el-button type="primary" @click.native="saveMenu('ruleForm')">确定</el-button>
			</div>
		</el-form>
	</el-dialog>
</template>
<script>
import { lookalikeDmp } from '@/api/admin.js'
export default {
	data () {
		return {
			ruleForm: {
				platform: 'NONE',
				mode:'1',
				tag:'',
				name:'',
				lookalike:100
			},
			isShow: false,
			groups: [
				{
					value: "user",
					label: "可用"
				},
				{
					value: "user1",
					label: "不可用",
					children: [
						{
							value: "all",
							label: "全部"
						}
					]
				}
			],
			type: [
				{
					label: "相似人群",
					value: "1",
					tip: "以现有人群特征数据为基础扩展相似人群，建议扩展3~8倍"
				},
				// {
				//   label: "好友人群",
				//   value: "2",
				//   tip:
				//     "基于种子人群的社交、地理位置等数据综合计算得出的好友关系人群;扩展倍数越小好友亲密度越高，人数越少;扩展后的人群不一定包含原始人群"
				// }
			],
			devices: [
				{
					label: "不限",
					value: "NONE"
				},
				{
					label: "IOS",
					value: "IOS"
				},
				{
					label: "Android",
					value: "ANDROID"
				}
			],
			platform: [
				{
					label: "不限",
					value: ""
				},
				{
					label: "今日头条",
					value: "1"
				},
				{
					label: "西瓜视频",
					value: "2"
				},
				{
					label: "火山小视频",
					value: "3"
				},
				{
					label: "抖音短视频",
					value: "4"
				}
			],
			word: [
				{
					label: "全部平台",
					value: ""
				}
			],
			rules: {
				name: [
					{ required: true, message: "人群包名称不能为空", trigger: "blur" },
					{
						min: 1,
						max: 25,
						message: "人群包名称不能超过25个字符",
						trigger: "blur"
					}
				],
				group: [
					{ required: true, message: "人群分组不能为空", trigger: "change" }
				]
			}
		};
	},
	props: ["extendVisible", "personList", 'expertModal'],
	methods: {
		// changePlatform(val) {
		//   if (val == "") {
		//     this.ruleForm.platform = [""];
		//   } else {
		//     if (this.ruleForm.platform.includes("")) {
		//       this.ruleForm.platform.splice(
		//         this.ruleForm.platform.findIndex(item => item == ""), 1);
		//     }
		//   }
		//   let arr = [];
		//   this.platform.forEach(element => {
		//     if (this.ruleForm.platform.includes(element.value)) {
		//       if (element.value == "") {
		//         arr = [
		//           {
		//             label: "全部平台",
		//             value: ""
		//           }
		//         ];
		//       } else {
		//         arr.push(element);
		//       }
		//     }
		//   });
		//   this.word = arr;
		// },
		saveMenu (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					
					this.ruleForm.lookalike_num = this.ruleForm.lookalike * 1000
					lookalikeDmp(this.ruleForm).then(res => {
						this.$message.success('扩展成功');
						this.$emit('extendSuccess',true)
						this.resetForm(formName)
					})
				} else {
					return false;
				}
			});
		},
		resetForm (formName) {
			// 重置表单
			this.$refs[formName].resetFields();
			this.$emit("cancel", false);
			this.ruleForm.lookalike=100
		},
		open(){
			this.ruleForm.advertiser_id=this.expertModal.adverid;
			this.ruleForm.custom_audience_id = this.expertModal.custom_audience_id;
			this.ruleForm.name=this.expertModal.name+'-扩展';
			this.ruleForm.tag=this.expertModal.tag
		}
	}
};
</script>
<style>
.extendModal .row-item {
	margin-bottom: 28px;
}
.extendModal
	.el-form-item.is-required:not(.is-no-asterisk)
	> .el-form-item__label:before {
	color: #fff;
}
.extendModal .extendNumber {
	position: absolute;
	top: 22px;
}
.extendModal .extendNumber:first-child {
	left: -5px;
}
.extendModal .extendNumber:last-child {
	right: -8px;
}
.extendModal .extendNumber.rightN {
	right: 150px;
}
.extendModal .el-form-item__error {
	margin-left: 20px;
}
.extendModal .el-input-number.is-without-controls .el-input__inner {
	width: 100px;
}
</style>

