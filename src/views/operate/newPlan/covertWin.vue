<template>
	<!-- 弹窗选择转化目标 -->
	<el-dialog
		title="选择转化目标"
		:visible.sync="editFormVisible"
		:close-on-click-modal="false"
		width="600px"
	>
		<div>
			<!-- 应用下载 -->
			<div class="row-item" style="padding-left:20px">
				<div class="required-item" style="left:120px"></div>
				<v-radio-group
					v-show="form.landing_type == 'LINK'"
					label="转化跟踪方式"
					v-model="ruleForm.mode"
					attr="covertType"
				></v-radio-group>
				<v-radio-group
					v-show="form.landing_type == 'APP'"
					label="转化跟踪方式"
					v-model="ruleForm.mode"
					attr="trackingMode"
				></v-radio-group>
			</div>
			<!-- <div class="row-item">
				<el-form-item label="选择转化目标" label-width="120px">
					<div class="required-item"></div>
					<div class="byted-radio-group btn-group">
						<div v-if="ruleForm.target==1">
							<el-radio v-model="ruleForm.radio" label="1">按钮</el-radio>
							<el-button
								plain
								size="medium"
								class="btnActive"
								style="float: unset;margin-left:50px"
							>按钮button</el-button>
						</div>
						<div class="convert-factors-other-type" v-else>
							<div class="byted-radio-group">
								<el-radio-group v-model="ruleForm.convert_id">
									<p
										class="convert-factors-lists"
										:key="index"
										v-for="(item,index) in radioList"
										@click="selectMenuItem(item)"
									>
										<el-radio :label="item.id">{{item.name}}</el-radio>
									</p>
								</el-radio-group>
							</div>
						</div>
					</div>
				</el-form-item>
			</div>-->

			<div class="row-item" v-show="ruleForm.target==1">
				<div class="hint-item">
					<el-popover
						v-show="form.landing_type == 'APP'"
						placement="top-start"
						width="380"
						trigger="hover"
						content="多转化事件发生时都会记为计划的一次有效转化，一个用户同时产生多个转化，仅记为一次。"
					>
						<i class="el-icon-question" slot="reference"></i>
					</el-popover>
				</div>
				<div class="label-item label-size-middle">
					<div class="text-item">选择多转化目标</div>
					<div class="required-item" style="left: 92px;top: 8px;"></div>
				</div>
				<div class="byted-radio-group btn-group" style="color: #999;">您当前可用转化过少，无法使用多转化</div>
			</div>
		</div>
		<!-- app下载 -->

		<div class="row-item margin0">
			<div class="hint-item">
				<el-popover
					placement="top-start"
					width="380"
					trigger="hover"
					content="对接激活数据后，系统支持激活转化；未对接的情况，安卓应用默认的转化目标为下载完成"
				>
					<i class="el-icon-question" slot="reference"></i>
				</el-popover>
			</div>
			<div class="label-item label-size-middle label-size-reset" style="width:96px">
				<div class="text-item">选择转化目标</div>
				<div class="required-item" style="left: 97px;top: 9px;"></div>
			</div>

			<div class="byted-radio-group btn-group">
				<el-radio-group
					v-model="ruleForm.convert_id"
					v-if="ruleForm.mode==1&&form.landing_type != 'LINK'"
					@change="changeCovert"
				>
					<el-radio-button label="4">安装完成</el-radio-button>
					<el-radio-button label="15">下载完成</el-radio-button>
				</el-radio-group>
				<div class="convert-factors-other-type" v-else-if="ruleForm.mode!=1">
					<div class="byted-radio-group">
						<el-radio-group v-model="ruleForm.convert_id">
							<p
								class="convert-factors-lists"
								:key="index"
								v-for="(item,index) in radioList"
								@change="selectMenuItem(item)"
							>
								<el-radio :label="item.id">{{item.name}}</el-radio>
							</p>
						</el-radio-group>
					</div>
				</div>
			</div>
		</div>
		<div slot="footer" class="dialog-footer">
			<a
				style="float:left"
				href="#/operate/toolCase/tool-case"
				target="_blank"
				class="blueshow1"
			>前往转化跟踪管理</a>
			<el-button @click.native="editFormVisible = false">取消</el-button>
			<el-button type="primary" @click.native="saveMenu">保存</el-button>
		</div>
	</el-dialog>
</template>
<script>
import { servingList } from "@/api/admin.js";
export default {
	data () {
		return {
			editFormVisible: false,
			radioList: [],
			ruleForm: {
				mode:1,
				convert_id:''
			}
		}
	},
	props: ['form','linkConvert_id','convert_id'],
	methods: {
		covertList () {
			this.editFormVisible = true;
			if (this.ruleForm.mode == 1 && !this.ruleForm.convert_id && this.form.landing_type != 'LINK') {
				this.ruleForm.convert_id = 4;
				this.targetName = "安装完成";
			}
			this.editFormVisible = true;
			let param = {
				adverId: this.form.advertiser_id,
				value: this.form.landing_type == "LINK"
					? this.form.external_url
					: this.form.download_url,
				type: this.form.landing_type == "LINK" ? 1 : 2,
				pkg: this.form.landing_type == "LINK" ? "" : this.form.package
			};
			servingList(param).then(res => {
				this.radioList = res.data;
			});
		},
		saveMenu () {
			// if (this.ruleForm.mode != 1) {
			// 	this.targetName = this.covertName;
			// }
			this.$emit('saveCovert', this.ruleForm)
			this.editFormVisible = false;
		},
		selectMenuItem (item) {
			// 选择落地页转化目标
			this.ruleForm.radio = item.id;
			this.ruleForm.covertName = item.name;
		},
		changeCovert (val) {
			if (this.ruleForm.mode == 1 && val == 4) {
				this.targetName = "安装完成";
			} else if (this.ruleForm.mode == 1 && val == 15) {
				this.targetName = "下载完成";
			}
		},
	},
	watch:{
		'form.landing_type'(){
			if(!this.ruleForm.convert_id){
				this.ruleForm.mode=this.form.landing_type == "LINK" ? 5 : 1				
			}
			if(this.linkConvert_id&&this.form.landing_type == "LINK"){
				this.ruleForm.convert_id=this.linkConvert_id
			}else if(this.convert_id&&this.form.landing_type == "APP"){
				this.ruleForm.convert_id=this.convert_id
			}
			console.log(this.ruleForm.mode,this.form.landing_type,this.ruleForm.convert_id)
		}
	}
}
</script>

