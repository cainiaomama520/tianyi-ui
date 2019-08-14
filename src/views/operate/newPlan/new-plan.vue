<template>
	<div class="layOut layout-body new-planBox">
		<left-bar></left-bar>
		<div class="ad-con-right new-planbox">
			<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
			>
				<div class="moduler">
					所属广告组：
					<strong>{{campaign_name}}（{{ruleForm.campaign_id}}）</strong>
				</div>
				<div class="moduler">
					<div class="ad-row-title">投放范围</div>
					<div class="row-item margin0">
						<v-radio-group
							label="投放范围"
							:disabled="disabled"
							v-model="ruleForm.delivery_range"
							attr="deliveryRange"
						></v-radio-group>
						<div class="required-item" style="left:100px"></div>
					</div>
				</div>
				<div class="moduler">
					<div class="ad-row-title">投放目标</div>
					<div class="row-item">
						<v-radio-group
							label="投放目标"
							:disabled="disabled"
							v-model="ruleForm.delivery_range"
							attr="deliveryMenu"
						></v-radio-group>
						<div class="required-item" style="left:100px"></div>
					</div>
					<div class="row-item">
						<v-radio-group label="下载方式" :disabled="disabled" v-model="ruleForm.landing_type" attr="landingType"></v-radio-group>
						<div class="required-item" style="left:100px"></div>
					</div>
					<!-- 落地页 -->
					<div v-if="ruleForm.landing_type=='LINK'">
						<div class="row-item link-sel">
							<el-form-item label="链接地址" prop="external_url" :rules="rules.external_url">
								<div class="required-item"></div>
								<div class="byted-radio-group btn-group" style="width:500px">
									<el-input
										size="medium"
										:disabled="disabled"
										placeholder="请输入网址或从之前网站选择"
										v-model="ruleForm.external_url"
									>
										<el-button slot="append" @click="selectUrl" :disabled="disabled">
											选择已有
											<i class="el-icon-arrow-down" :class="rotate?'rotate':'aa'"></i>
										</el-button>
									</el-input>
									<a
										class="link"
										href="https://h5.toutiao.com/marketing/home"
										target="_blank"
										style="position:absolute;right:-120px;top:2px"
									>快速创建新网站</a>
									<div v-show="rotate">
										<div class="bui-popper">
											<p class="dropdown-tab">
												<span class="active">网站</span>
											</p>
											<ul class="dropdown-menu">
												<li :key="index" v-for="(item,index) in urlList">
													<span @click="selectLoadUrl(item)" class="click">{{item.name}}</span>
													<span class="fr" @click="showImg(item)">预览</span>
												</li>
											</ul>
										</div>
										<div class="preview-container">
											<div class="downloadBox">
												<img :src="img">
											</div>
										</div>
									</div>
								</div>
							</el-form-item>
						</div>
						<div class="row-item">
							<el-form-item label="转化目标">
								<div class="required-item"></div>
								<div class="byted-radio-group btn-group">
									<p v-if="!linkTargetName&&!ruleForm.convert_name">
										<el-button size="medium" type="primary" :disabled="covertBtn" @click="target">选择转化目标</el-button>
										<span style="color: #c1c1c1;" v-show="covertBtn">请先正确填写上方广告链接地址</span>
									</p>
									<ul class="row-normal" v-else-if="linkTargetName||ruleForm.convert_name">
										<li>
											<i class="el-icon-success" style="color:#87d006;margin-right:10px"></i>已选
										</li>
										<li>{{ruleForm.landing_type=='LINK'?'落地页API：':''}}{{linkTargetName||ruleForm.convert_name}}-{{linkConvert_id||ruleForm.convert_id}}</li>
										<li style="color:#409eff;cursor: pointer;" v-if="!disabled" @click="target">更改</li>
									</ul>
								</div>
							</el-form-item>
						</div>
						<div class="row-item margin0">
							<el-form-item label="高级功能">
								<div class="byted-radio-group btn-group">
									<el-button plain size="medium" class="btnActive">不启用</el-button>
									<el-button plain size="medium" disabled>沉浸式</el-button>
								</div>
							</el-form-item>
						</div>
					</div>
					<!-- app应用 -->
					<div v-else>
						<div class="row-item margin0">
							<el-form-item
								prop="download_url"
								label="下载链接"
								:rules="ruleForm.landing_type!='LINK'?rules.download_url:[]"
							>
								<div class="required-item"></div>
								<div class="byted-radio-group btn-group" style="width:500px">
									<el-input
										size="medium"
										placeholder="请填写应用下载链接"
										v-model="ruleForm.download_url"
										@blur="package"
										:disabled="disabled"
									></el-input>
								</div>
							</el-form-item>
						</div>
						<div style="padding-left: 20px;">
							<el-form-item>
								<div v-if="app_name" style="font-size: 12px;">
									<i class="el-icon-success" style="color:#87d006;margin-right:5px"></i>
									{{app_name}}
								</div>
								<div style="font-size: 12px;" v-else-if="ruleForm.download_url&&!adId && isloading">
									<i class="el-icon-loading"></i>正在获取应用信息，请稍等
								</div>
							</el-form-item>
						</div>
						<div class="row-item">
							<div class="hint-item">
								<el-popover
									placement="top-start"
									width="380"
									trigger="hover"
									content="转化用于追踪广告投放效果，用户完成广告主设定的转化事件即纪录一次转化，您可以在“工具箱-转化跟踪”创建和查看转化"
								>
									<i class="el-icon-question" slot="reference"></i>
								</el-popover>
							</div>
							<div class="label-item label-size-middle label-size-reset">
								<div class="text-item">转化目标</div>
								<div class="required-item" style="left: 75px;top: 9px;"></div>
							</div>
							<div class="byted-radio-group btn-group">
								<el-button
									size="medium"
									v-if="!targetName&&!ruleForm.convert_name"
									type="primary"
									:disabled="appCovertBtn"
									@click="target"									
								>选择转化目标</el-button>
								<ul class="row-normal" v-else>
									<li>
										<i class="el-icon-success" style="color:#87d006;margin-right:10px"></i>已选
									</li>
									<li>{{ruleForm.mode==1?'普通应用下载：':'应用下载API：'}}{{targetName||ruleForm.convert_name}}{{(ruleForm.convert_id==4||ruleForm.convert_id==15)?'':'-'+(ruleForm.convert_id||convert_id)}}</li>
									<li style="color:#409eff;cursor: pointer;" @click="target" v-if="!disabled">更改</li>
								</ul>
							</div>
						</div>
						<div class="row-item margin0">
							<div class="hint-item">
								<el-popover
									placement="top-start"
									width="380"
									trigger="hover"
									content="如果自动获取包名失败，请咨询app开发人员后手动输入"
								>
									<i class="el-icon-question" slot="reference"></i>
								</el-popover>
							</div>
							<div class="label-item label-size-middle label-size-reset">
								<div class="text-item">应用包名</div>
								<div class="required-item" style="left: 75px;top: 9px;"></div>
							</div>
							<el-form-item label-width="0">
								<div class="byted-radio-group btn-group" style="width:500px">
									<el-input
										size="medium"
										prop="package"
										:disabled="disabled"
										:rules="ruleForm.landing_type!='LINK'?[{required: true, message: '应用包名不能为空', trigger: 'blur'}]:[]"
										v-model="ruleForm.package"
									></el-input>
								</div>
							</el-form-item>
						</div>
					</div>
				</div>

				<div class="moduler">
					<div class="ad-row-title">用户定向</div>
					<div class="row-item">
						<v-radio-group label="地域" v-model="ruleForm.district" attr="area"></v-radio-group>
					</div>
					<div class="row-item" v-show="ruleForm.district=='CITY'">
						<el-form-item label>
							<div class="byted-radio-group btn-group" style="width: 800px;">
								<check-tree
									v-if="isDetail"
									v-model="ruleForm.city"
									:list.sync="cityList"
									:name="['省份','城市']"
								></check-tree>
							</div>
						</el-form-item>
					</div>
					<div class="row-item">
						<v-radio-group label="性别" v-model="ruleForm.gender" attr="gender"></v-radio-group>
					</div>
					<div class="row-item">
						<v-check-group :disabledItems="['',1,4]" label="年龄" v-model="ruleForm.age" attr="age"></v-check-group>
					</div>
					<div class="row-item">
						<v-radio-group label="人群包" v-model="ruleForm.retargeting_type" attr="people">
							<template slot="label">
								<div class="hint-item" style="margin-left:20px;position:absolute;top:5px;left:-100px;">
									<el-popover
										placement="top-start"
										width="380"
										trigger="hover"
										content="接入您的应用或网站的数据, 选定或排除特定的用户。您可以在工具箱-头条DMP中管理人群包"
									>
										<i class="el-icon-question" slot="reference"></i>
									</el-popover>
								</div>
							</template>
						</v-radio-group>
					</div>
					<div class="row-item" v-show="ruleForm.retargeting_type!='NONE'">
						<el-form-item style="width:800px;padding-left:20px">
							<serve-list
								v-if="isDetail"
								:advId="ruleForm.advertiser_id"
								@changeInclude="changeInclude"
								@changeExclude="changeExclude"
								:checkedIncludesP.sync="ruleForm.retargeting_tags_include"
								:checkedExportP.sync="ruleForm.retargeting_tags_exclude"
							></serve-list>
						</el-form-item>
					</div>
					<div class="row-item">
						<v-radio-group label="兴趣定向" v-model="ruleForm.interest_type" attr="interesting"></v-radio-group>
					</div>

					<div class="row-item" v-show="ruleForm.interest_type==3">
						<el-form-item label="兴趣分类">
							<div class="byted-radio-group btn-group" style="width: 800px;">
								<check-tree
									v-if="isDetail"
									v-model="ruleForm.ad_tag"
									:list.sync="interestType"
									:name="['兴趣分类','兴趣']"
								></check-tree>
							</div>
						</el-form-item>
					</div>
					<div class="row-item">
						<v-check-group label="平台" v-model="ruleForm.platform" attr="platform"></v-check-group>
					</div>
					<div class="row-item">
						<v-radio-group label="APP行为" v-model="ruleForm.app_behavior_target" attr="appBehavior"></v-radio-group>
					</div>
					<!-- app应用下载 -->
					<div v-if="ruleForm.landing_type=='APP'">
						<div class="row-item" :style="ruleForm.hide_if_exists==0?'':'margin-bottom:10px'">
							<v-radio-group label="过滤已安装" v-model="ruleForm.hide_if_exists" attr="filter"></v-radio-group>
						</div>
						<div class="row-item" v-show="ruleForm.hide_if_exists==1">
							<el-form-item label>
								<div class="byted-radio-group btn-group" style="line-height: 10px;width:400px">
									<el-alert :closable="false" title="过滤已安装暂不支持对覆盖人群的预估" type="warning" show-icon></el-alert>
								</div>
							</el-form-item>
						</div>
						<div class="row-item" v-show="ruleForm.landing_type=='APP'">
							<el-form-item :label="appType=='android'?'安卓版本':'IOS版本'">
								<div class="byted-radio-group btn-group" style="line-height: 10px;width:400px">
									<div
										class="byted-select-panel-moduler-header byted-select-panel-moduler-header-title"
									>{{appType=='android'?'安卓':'IOS'}}版本</div>
									<div class="convert-factors-other-type" style="width: 398px;border-top: 0;">
										<div class="byted-radio-group">
											<el-radio-group v-if="appType=='android'" v-model="ruleForm.android_osv">
												<p class="convert-factors-lists" v-for="(item,index) in AndrionList" :key="index">
													<el-radio :label="item.value">{{item.label}}</el-radio>
												</p>
											</el-radio-group>
											<el-radio-group v-else v-model="ruleForm.ios_osv">
												<p class="convert-factors-lists" v-for="(item,index) in AndrionList" :key="index">
													<el-radio :label="item.value">{{item.label}}</el-radio>
												</p>
											</el-radio-group>
										</div>
									</div>
								</div>
							</el-form-item>
						</div>
					</div>
					<!-- app应用下载end -->
					<div class="row-item">
						<span class="blueshow" @click="isShowMore=!isShowMore">{{isShowMore?'隐藏':'显示'}}高级选项</span>
					</div>
					<div v-show="isShowMore">
						<div class="row-item">
							<v-check-group attr="network" label="网络" v-model="ruleForm.ac"></v-check-group>
						</div>
						<div class="row-item">
							<v-check-group attr="operator" label="运营商" v-model="ruleForm.carrier"></v-check-group>
						</div>
						<div class="row-item">
							<v-check-group attr="newuser" label="新用户" v-model="ruleForm.newuser">
								<template slot="label">
									<div
										class="hint-item"
										style="margin-left: 20px; position: absolute; top: 5px; left: -100px;"
									>
										<el-popover placement="top-start" width="380" trigger="hover" content="新用户使用头条的时间">
											<i class="el-icon-question" slot="reference"></i>
										</el-popover>
									</div>
								</template>
							</v-check-group>
						</div>
						<div
							class="row-item"
							v-show="!(ruleForm.platform.length==1&&ruleForm.platform.indexOf('IOS')>-1)"
						>
							<v-radio-group label="手机品牌" v-model="device_brand" attr="phoneBrand"></v-radio-group>
						</div>
						<div class="row-item" v-show="ruleForm.platform.indexOf('')&&device_brand==1">
							<el-form-item label>
								<div class="byted-radio-group btn-group" style="width: 800px;">
									<select-phone
										v-if="isDetail"
										:list="phoneType"
										v-model="ruleForm.device_brand"
									></select-phone>
								</div>
							</el-form-item>
						</div>
						<div class="row-item">
							<el-form-item label style="width: 800px;">
								<div class="btn-group" style="display:block"></div>
							</el-form-item>
						</div>
					</div>
				</div>
				<div class="moduler">
					<div class="ad-row-title">预算与出价</div>
					<div class="row-item">
						<el-form-item label="预算" prop="budget">
							<div class="required-item"></div>
							<div class="byted-radio-group btn-group">
								<el-input placeholder="请输入内容" v-model.number="ruleForm.budget" class="input-with-select">
									<el-select
										v-model="ruleForm.budget_mode"
										slot="prepend"
										placeholder="请选择"
										style="width: 94px;"
										:disabled="disabled"
									>
										<el-option label="日预算" value="BUDGET_MODE_DAY"></el-option>
										<el-option label="总预算" value="BUDGET_MODE_TOTAL"></el-option>
									</el-select>
									<div>元</div>
								</el-input>
							</div>
						</el-form-item>
					</div>
					<div class="row-item">
						<el-form-item label="投放时间">
							<div class="byted-radio-group btn-group">
								<el-radio-group v-model="ruleForm.schedule_type">
									<el-radio-button label="SCHEDULE_FROM_NOW">从今天起长期投放</el-radio-button>
									<el-radio-button label="SCHEDULE_START_END">设置开始和结束日期</el-radio-button>
								</el-radio-group>
							</div>
						</el-form-item>
					</div>
					<div class="row-item" v-show="ruleForm.schedule_type=='SCHEDULE_START_END'">
						<el-form-item>
							<div class="byted-radio-group btn-group">
								<el-date-picker
									v-model="time"
									type="daterange"
									range-separator="至"
									start-placeholder="开始日期"
									end-placeholder="结束日期"
									value-format="yyyy-MM-dd"
								></el-date-picker>
							</div>
						</el-form-item>
					</div>
					<div class="row-item">
						<el-form-item label="投放时段">
							<div class="byted-radio-group btn-group">
								<schDatePicker
									type="week"
									:rd="timeChangeCtr.periodTime"
									:value="timeChangeCtr.times"
									v-on:input="updateScheduleInfo"
									v-on:show="updateScheduleType"
								></schDatePicker>
							</div>
						</el-form-item>
					</div>
					<div class="row-item">
						<div class="required-item" style="left: 99px;top: 17px;"></div>
						<v-radio-group label="投放方式" v-model="ruleForm.flow_control_mode" attr="putInType">
							<template slot="label">
								<div class="hint-item" style="margin-left:12px;position:absolute;top:5px;left:-100px;">
									<el-popover
										placement="top-start"
										width="380"
										trigger="hover"
										content="计划投放初期可能有一定的波动性，在积累适当转化数后效果将会逐渐稳定。"
									>
										<i class="el-icon-question" slot="reference"></i>
									</el-popover>
								</div>
							</template>
						</v-radio-group>
					</div>
					<div class="row-item margin0">
						<el-form-item label>
							<div class="byted-radio-group btn-group">
								<div class="delivery-type-intro">
									<div :key="index" v-for="(item,index) in patOntype">
										<div class="intro-title">{{item.title}}</div>
										<div class="intro-content">{{item.des}}</div>
									</div>
								</div>
							</div>
						</el-form-item>
					</div>
					<div class="row-item">
						<el-form-item label="付费方式">
							<div class="required-item"></div>
							<div class="byted-radio-group btn-group">
								<el-radio-group v-model="ruleForm.pricing" :disabled="disabled">
									<el-radio-button label="PRICING_OCPM">按展示付费(oCPM)</el-radio-button>
									<!-- <el-radio-button label="PRICING_CPV">按转化付费(CPA)</el-radio-button> -->
								</el-radio-group>
							</div>
						</el-form-item>
					</div>
					<div class="row-item margin0 err">
						<div class="hint-item">
							<el-popover
								placement="top-start"
								width="380"
								trigger="hover"
								content="目标转化价格是指您愿意为每次转化支付的目标价格。价格的高低会影响您获得的转化次数。例如，如果设置的目标价格过低，您可能会错失一部分转化。目标转化价格仅作为智能优化投放的成本参考，实际仍按照展示付费"
							>
								<i class="el-icon-question" slot="reference"></i>
							</el-popover>
						</div>
						<div class="label-item label-size-middle label-size-reset">
							<div class="text-item">目标转化出价</div>
							<div class="required-item" style="left: 75px;top: 8px;"></div>
						</div>
						<div class="byted-radio-group btn-group" style="width:500px">
							<el-form-item prop="cpa_bid" label-width="0">
								<el-input
									v-model.number="ruleForm.cpa_bid"
									placeholder="请输入内容"
									style="width:300px;margin-right:10px"
								></el-input>元
								<span style="margin-left:40px">建议出价待获取</span>
								<el-popover
									placement="top-start"
									width="380"
									trigger="hover"
									title="什么是建议出价："
									content="请填入本页面所有必填信息（除出价外），系统将自动为您获取建议出价"
								>
									<i class="el-icon-question" slot="reference"></i>
								</el-popover>
							</el-form-item>
						</div>
					</div>
					<div class="row-item" v-show="ruleForm.payment==2">
						<el-form-item>
							<div class="byted-radio-group btn-group">计划首次投放及其之后三个自然日内将获得超成本赔付保障，您可放心新建计划并投放</div>
						</el-form-item>
					</div>
					<div style="margin-top:30px" class="row-item">
						<span class="blueshow" @click="isShowfilter=!isShowfilter">{{isShowfilter?'隐藏':'展开'}}高级选项</span>
					</div>
					<div class="row-item margin0" v-show="isShowfilter">
						<div class="hint-item">
							<el-popover
								placement="top-start"
								width="380"
								trigger="hover"
								content="选择过滤已转化用户之后，可以避免该广告再次投放给已经转化过的用户，可以选择过滤三个广告层级的已转化用户（广告计划/广告组/广告账户）"
							>
								<i class="el-icon-question" slot="reference"></i>
							</el-popover>
						</div>
						<div class="label-item label-size-middle label-size-reset">
							<div class="text-item">过滤已转化用户</div>
						</div>

						<div class="byted-radio-group btn-group" style="width:500px">
							<el-radio-group v-model="ruleForm.hide_if_converted">
								<el-radio-button label="AD">广告计划</el-radio-button>
								<el-radio-button label="CAMPAIGN">广告组</el-radio-button>
								<el-radio-button label="ADVERTISER">广告账户</el-radio-button>
								<el-radio-button label="NO_EXCLUDE">不过滤</el-radio-button>
							</el-radio-group>
						</div>
					</div>
				</div>
				<div class="moduler">
					<div class="ad-row-title">计划名称</div>
					<div class="row-item">
						<el-form-item label="计划名称" prop="name">
							<div class="required-item"></div>
							<div class="byted-radio-group btn-group" style="width:500px">
								<el-input placeholder="请输入计划名称" v-model="ruleForm.name"></el-input>
							</div>
						</el-form-item>
					</div>
				</div>
				<div class="moduler save-ad-panel">
					<div class="ad-d-flex ad-d-flex-between">
						<div class="save-ad-action" style="margin-left: auto;">
							<el-button size="medium " @click="closeWindow">取消</el-button>
							<el-button type="primary" size="medium" @click="saveClose(1)">保存并关闭</el-button>
							<el-button type="primary" size="medium" @click="saveClose(2)">保存并新建创意</el-button>
						</div>
					</div>
				</div>
				<convertWin ref="covert" :linkConvert_id="linkConvert_id" :convert_id="convert_id"  :form="ruleForm" @saveCovert="saveCovert"/>
			</el-form>
		</div>
	</div>
</template>
<script>
import {
	getWebsites,
	getCity,
	servingList,
	getPackage,
	convertDmpList,
	creatNewPlan,
	planDetail,
	updatePlan
} from "@/api/admin.js";
import { resolve } from "url";
var interestTypes = require("@/common/json/ad_tag.json");
export default {
	data: function () {
		var checknumber = (rule, value, callback) => {
			if (!value) {
				callback(new Error("请填写出价"));
			}
			if (!Number.isFinite(value)) {
				return callback(new Error("数据格式不正确"));
			} else {
				if (value < 1) {
					return callback(new Error("最低出价不能低于1元"));
				} else if (value > 1000) {
					return callback(new Error("最低出价不能高于1000元"));
				} else {
					callback();
				}
			}
		};
		var checkbuget = (rule, value, callback) => {
			if (!value) {
				callback(new Error("请填写预算"));
			}
			if (!Number.isFinite(value)) {
				return callback(new Error("数据格式不正确"));
			} else {
				// if (value < 100 && this.ruleForm.budget_mode == 'BUDGET_MODE_DAY') {
				//   return callback(new Error("预算设置不能低于100元"));
				// }
				if (value < 300) {
					return callback(new Error("预算设置不能低于300元"));
				} else if (value > 9999999.99) {
					return callback(new Error("预算设置不能超过9999999.99元"));
				} else {
					callback();
				}
			}
		};
		var validateUrl = (rule, value, callback) => {
			if (value == '') {
				callback(new Error('请输入链接'));
			} else {
				let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
				if (!reg.test(value)) {
					callback(new Error('请输入正确的链接'));
				} else {
					callback()
				}
			}
		};
		return {
			campaign_name: this.$route.query.campaign_name,
			ruleForm: {
				name: "",
				advertiser_id: this.$store.state.titlemess.advId,
				campaign_id: this.$route.query.id,
				delivery_range: "DEFAULT",
				district: "NONE",
				gender: "NONE",
				retargeting_type: "NONE",
				age: [""],
				platform: [""],
				ac: [""],
				app_behavior_target: "NONE",
				pricing: "PRICING_OCPM",
				budget_mode: "BUDGET_MODE_DAY",
				schedule_type: "SCHEDULE_FROM_NOW",
				flow_control_mode: "FLOW_CONTROL_MODE_FAST",
				hide_if_converted: "AD",
				test: [1, 2],
				ad_tag: [],
				retargeting_tags_include: [], //定向人群包
				city: [],
				device_brand: [],
				android_osv: "NONE",
				ios_osv: "NONE",
				mode: this.$route.query.landing_type == 'LINK' ? 3 : 1,
				convert_id: "",
				cpa_bid: null,
				budget: "",
				external_url: null,
				download_url: null,
				interest_type: 1,
				landing_type: 'APP'
			},
			time: "",
			landing_type: this.$route.query.landing_type,
			device_brand: 0,
			cityList: [],
			rules: {
				name: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{
						min: 1,
						max: 100,
						message: "计划名称应在1-100字符",
						trigger: "blur"
					}
				],
				cpa_bid: [{ validator: checknumber, trigger: "blur" }],
				budget: [{ validator: checkbuget, trigger: "blur" }],
				download_url: [{ validator: validateUrl, trigger: "blur" }],
				external_url: [{ required: true, message: "请输入链接", trigger: "blur" }]
			},
			rotate: false,
			urlList: [],
			img: "",
			editFormVisible: false,
			convert_id:'',			
			targetName: "",//app临时名字
			linkTargetName:'',//落地页临时名字
			linkConvert_id:'',
			interestType: interestTypes.adtags,
			phoneType: interestTypes.phoneType,
			isShowMore: false,
			isShowfilter: false,
			patOntype: this.patOntype1,
			patOntype1: [
				{
					title: "跑量快",
					des:
						"系统将会在现有的流量中为您尽快获取转化，以尽可能快的速度消耗预算。"
				},
				{
					title: "成本接近出价",
					des:
						"系统将会以不同的成本为您获取转化，尽可能控制平均成本接近您设置的出价。"
				}
			],
			patOntype2: [
				{
					title: "跑量均匀",
					des:
						"系统将在一定的时间内，根据实际流量分布，为您均匀地消耗预算，获取转化。"
				},
				{
					title: "成本接近出价",
					des:
						"系统将会以不同的成本为您获取转化，同时控制平均成本接近您设置的出价。"
				}
			],
			patOntype3: [
				{
					title: "跑量偏慢",
					des: "系统将在您所选投放时间段内，为您精选低成本流量获取转化。"
				},
				{
					title: "成本尽可能小",
					des: "系统将会尽量以低于您出价的成本为您获取转化。"
				}
			],
			timeChangeCtr: {
				periodTime: "all",
				times: []
			},
			app_name: "",
			appType: "",
			covertBtn: true,
			appCovertBtn:true,
			interest: 0,
			AndrionList: interestTypes.adrionList,
			adId: this.$route.query.adId,
			disabled: false,
			campaignId: this.$route.query.campaignId,
			showCity: false,
			showPerBox: false,
			showInterest: false,
			isloading: false,
			copyadId: this.$route.query.adId,
			isDetail:false
		};
	},
	components: {
		leftBar: resolve => require(["@/components/leftBar.vue"], resolve),
		checkTree: resolve =>
			require(["@/components/form/check-tree.vue"], resolve),
		schDatePicker: resolve => require(["@/components/schedule"], resolve),
		selectPhone: resolve => require(["@/components/column"], resolve),
		serveList: resolve => require(["@/components/column-new"], resolve),
		convertWin:resolve=>require(["./covertWin"],resolve)
	},
	computed: {
		'ruleForm.download_url' (val) {
			if (!val) {
				this.appCovertBtn = false;
			}
		}
	},
	mounted () {
		this.patOntype = this.patOntype1;
		this.getCityList();
		this.dmpList();
		if (this.adId) {
			this.getDetail();
		} else {
			this.selectTab();
			this.isDetail=true;
		}
	},
	methods: {
		changeInclude (val) {
			this.ruleForm.retargeting_tags_include = val;
		},
		changeExclude (val) {
			this.ruleForm.retargeting_tags_exclude = val;
		},
		getWeblist () {
			// 获取下载列表
			getWebsites({ adverid: this.ruleForm.advertiser_id }).then(res => {
				this.urlList = res.data;
			});
		},
		phoneTypes () {
			if (this.appType == "android") {
				this.AndrionList = interestTypes.adrionList;
			} else {
				this.AndrionList = interestTypes.IOSList;
			}
		},
		selectUrl () {
			// 选择已有按钮
			this.rotate = !this.rotate;
			this.getWeblist();
		},
		selectLoadUrl (url) {
			// 回传链接
			this.ruleForm.external_url =
				"https://www.chengzijianzhan.com/tetris/page/" + url.siteId;
			this.rotate = false;
			this.covertBtn = false;
		},
		showImg (item) {
			// 预览图片
			this.img = item.thumbnail;
		},
		getCityList () {
			getCity().then(res => {
				this.cityList = res.data.adtags;
			});
		},
		package () {
			this.$refs['ruleForm'].validateField(['download_url'], (validMessage) => {
				if (validMessage != "") {
					return false;
				} else {
					this.isloading = true
					getPackage({ downloadUrl: this.ruleForm.download_url }).then(res => {
						this.app_name = res.data.app_name;
						this.ruleForm.package = res.data.bundle;
						this.appCovertBtn = false;
						this.appType = res.data.appType;
						this.isloading = false
						this.phoneTypes();
					});
				}
			})
		},
		saveCovert(data){
			// 转化跟踪
			if(this.ruleForm.landing_type=='LINK'){
				this.linkTargetName=data.covertName
				this.linkConvert_id=data.convert_id
			}else{
				this.targetName=data.covertName;
				this.convert_id=data.convert_id;
			}	
					
		},
		dmpList () {
			// 获取人群包列表
			convertDmpList({ adverId: this.ruleForm.advertiser_id }).then(res => { });
		},
		funType (type, word) {
			this.$message({
				message: word,
				type: "success"
			});
			if (type == 1) {
				setTimeout(() => {
					window.close();
				}, 3000);
			} else {
				let creatData = {
					"landing_type": this.ruleForm.landing_type,
					id: this.adId,
					planName: this.ruleForm.name,
					APPType: this.appType == 'ios' ? 'APP_IOS' : this.appType == 'android' ? 'APP_ANDROID' : ''
				}
				if (this.campaignId) {
					creatData.copyadId = this.copyadId;
				}
				this.$router.push({
					path: "/operate/newCreat/new-creat",
					query: creatData
				});
			}
		},
		closeWindow () {
			// 点击取消按钮触发
			this.$confirm('确定要取消吗?')
				.then(_ => {
					window.close();
				})
				.catch(_ => { });
		},
		saveClose (type) {
			if (this.time) {
				this.ruleForm.start_time = this.time[0];
				this.ruleForm.end_time = this.time[1];
			}
			if (this.ruleForm.landing_type == 'APP') {
				this.ruleForm.download_type = 'DOWNLOAD_URL'; //默认
				this.ruleForm.convert_id=this.convert_id;
			}else{
				this.ruleForm.convert_id=this.linkConvert_id;
			}
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					if (this.adId && !this.campaignId) {
						this.ruleForm.ad_id = this.adId;
						updatePlan(this.ruleForm).then(res => {
							if (res.code == 0) {
								this.funType(type, "更新成功");
							}
						});
					} else {
						if (!this.ruleForm.convert_id) {
							this.$message.warning( '请选择转化目标')
							return false;
						}
						creatNewPlan(this.ruleForm).then(res => {
							if (res.code == 0) {
								this.adId = res.data.adId;
								this.funType(type, "创建成功");
							}
						});
					}
				}
			})
		},
		target () {
			// 转化目标
			this.$refs.covert.covertList();
		},
		selectPutOnType (val) {
			if (val == 1) {
				this.patOntype = this.patOntype1;
			} else if (val == 2) {
				this.patOntype = this.patOntype2;
			} else {
				this.patOntype = this.patOntype3;
			}
		},
		updateScheduleType (t) {
			this.timeChangeCtr.periodTime = t;
		},
		updateScheduleInfo (i) {
			this.ruleForm.schedule_time = JSON.stringify(i) || [];
		},
		getDetail () {
			// 详情
			planDetail({
				adverid: this.ruleForm.advertiser_id,
				adId: this.adId
			}).then(res => {
				let result = res.data.audience;
				// this.ruleForm = res.data;
				if (!this.campaignId) {
					this.disabled = true;
				}
				this.ruleForm.name = res.data.name;
				this.ruleForm.schedule_time = res.data.schedule_time;
				this.ruleForm.schedule_type = res.data.schedule_type;
				this.ruleForm.bid = res.data.bid;
				this.ruleForm.budget = res.data.budget;
				this.ruleForm.budget_mode = res.data.budget_mode;
				this.ruleForm.campaign_id = res.data.campaign_id;
				this.ruleForm.convert_id = res.data.convert_id;
				this.ruleForm.convert_name = res.data.convert_name;
				this.ruleForm.cpa_bid = res.data.cpa_bid;
				this.ruleForm.delivery_range = res.data.delivery_range;
				this.ruleForm.download_url = res.data.download_url;
				this.ruleForm.external_url = res.data.external_url;
				this.ruleForm.flow_control_mode = res.data.flow_control_mode;
				this.ruleForm.hide_if_converted = res.data.hide_if_converted;
				this.ruleForm.hide_if_exists = res.data.hide_if_exists;
				this.ruleForm.id = res.data.id;
				this.ruleForm.package = res.data.package;
				this.ruleForm.pricing = res.data.pricing;
				this.ruleForm.interest_type = res.data.interest_type;
				this.ruleForm.ac = result.ac;
				this.ruleForm.age = result.age;
				this.ruleForm.android_osv = result.android_osv;
				this.ruleForm.ios_osv = result.ios_osv;
				this.ruleForm.app_behavior_target = result.app_behavior_target;
				this.ruleForm.gender = result.gender;
				this.ruleForm.platform = result.platform;
				this.timeChangeCtr.times = JSON.parse(res.data.schedule_time);
				this.ruleForm.ad_tag = result.ad_tag;
				this.showInterest = true;
				this.time = [
					res.data.start_time.slice(0, 10),
					res.data.end_time.slice(0, 10)
				];
				this.ruleForm.city = result.city;
				this.showCity = true;
				this.ruleForm.device_brand = result.device_brand;
				this.ruleForm.retargeting_tags_exclude =
					result.retargeting_tags_exclude;
				this.ruleForm.retargeting_tags_include =
					result.retargeting_tags_include;
				this.ruleForm.retargeting_type = result.retargeting_type;
				this.showPerBox = true;
				this.ruleForm.district = result.district;
				if (this.ruleForm.download_url) {
					this.appType = "android";
					this.phoneTypes();
				}
				this.isDetail=true;
			});
		},
		selectTab () {
			// 新建计划名称
			let time = new Date();
			let month = this.filterDate(time.getMonth() + 1);
			let day = this.filterDate(time.getDate());
			this.ruleForm.name ="oCPM" +"_" +month +"_" +day +"_" +this.filterDate(time.getHours()) +
				":" +
				this.filterDate(time.getMinutes());
		},
		filterDate (time) {
			if (time < 10) {
				return "0" + time;
			} else {
				return time;
			}
		}
	},
	watch: {
		"ruleForm.flow_control_mode" (val) {
			if (val == "FLOW_CONTROL_MODE_BALANCE") {
				this.patOntype = this.patOntype2;
			} else if ((val == "FLOW_CONTROL_MODE_SMOOTH")) {
				this.patOntype = this.patOntype3;
			} else {
				this.patOntype = this.patOntype1;
			}
		}
	}
};
</script>
<style>
.row-normal {
	line-height: 30px;
}
.row-item .label-item.label-size-reset {
	min-width: 76px;
	width: 76px;
	color: #606266;
}
.ad-d-flex {
	display: flex;
	align-items: center;
}
.save-ad-panel {
	padding-top: 16px !important;
	padding-bottom: 16px !important;
}
.blueshow {
	color: #409eff;
	cursor: pointer;
	margin-left: 40px;
}
.blueshow1 {
	color: #409eff;
	cursor: pointer;
}
.downloadBox {
	width: 162px;
	height: 285px;
	overflow-y: scroll;
	padding: 5px 2px;
}
.downloadBox img {
	display: block;
	width: 100%;
}
.new-planBox .el-form-item__error {
	padding-left: 20px;
}
.new-planBox .err .el-form-item__error {
	padding-left: 0;
}
</style>
