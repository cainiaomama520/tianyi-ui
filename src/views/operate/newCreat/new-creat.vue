<template>
	<div class="layOut layout-body" v-loading="tableLoading">
		<left-bar></left-bar>
		<el-form :model="form" :rules="rulesForm" ref="form" label-width="80px" class="demo-ruleForm">
			<div class="ad-con-right">
				<div class="newCreatContent">
					<div class="ownPlan">
						<div style="display:flex">
							<div class="planLabel">所属广告计划:</div>
							<div class="planName">{{adverPlanName}}</div>
						</div>
					</div>
					<div class="throw_in_location">
						<div class="throw_in_label">设置投放位置</div>
						<div style="position:relative">
							<el-form-item label="广告位置" prop="adverLocation" class="currentWidth">
								<el-radio-group v-model="form.adverLocation" size="medium">
									<el-radio-button label="1">优化广告位</el-radio-button>
									<el-radio-button label="2">按媒体指定位置</el-radio-button>
									<el-radio-button disabled label="3">按场景指定位置</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</div>
						<div class="tipDiv">
							<div v-show="form.adverLocation=='1'" class="first">
								<div class="tipLabel">系统将根据您设置的定向，选择预估效果最好的广告位进行投放，并触达尽可能多的目标用户</div>
							</div>
							<div v-show="form.adverLocation=='2'" class="second">
								<div class="tipLabel">建议您选择所有可选广告位，否则会减少覆盖人数，导致广告失去部分优质展示机会</div>
								<div style="width:100%">
									<creatCheckbox :backData="selectedAppNameId" @callBackAction="checkBoxChangAction"></creatCheckbox>
								</div>
							</div>
							<div v-show="form.adverLocation=='3'" class="third">
								<div class="tipLabel">系统将结合用户使用场景，智能选择与目标用户场景契合的广告素材进行投放，并获得尽可能优的转化效果</div>
								<div style="width:100%">
									<creatRadio @callBackAction="loactionRadioChangeAction"></creatRadio>
								</div>
							</div>
						</div>
					</div>
					<div class="throw_in_location">
						<div class="throw_in_label">制作创意</div>
						<div style="position:relative">
							<el-form-item label="创意方式" prop="creatStyle" class="currentWidth">
								<el-radio-group
									v-model="form.creatStyle"
									size="medium"
									:disabled="this.adId!=undefined&&!this.copyadId"
								>
									<el-radio-button label="1">自定义创意</el-radio-button>
									<el-radio-button label="2">程序化创意</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</div>
						<div style="position:relative">
							<el-form-item label="创意内容" prop="creatStyle" class="currentWidth">
								<div class="inputBox">
									<div
										class="choicedAdver"
									>已选广告位:{{form.adverLocation==1?'优选广告位':form.adverLocation==2?selectedAppName.toString():'场景广告位-'+locationSelectName}}</div>
									<el-button
										type="primary"
										@click="addCreatDialogVisible = true"
										icon="el-icon-circle-plus"
									>添加创意类型</el-button>
									<div class="creativeNum" v-if="form.creatStyle == 1">创意个数:
										<div class="num">{{selfCreativeNumber}}/10</div>
									</div>
									<div class="creativeNum" v-else>图片创意个数:
										<div class="num" style="margin-right:10px">{{progImgCreativeNumber}}/12</div>视频创意个数:
										<div class="num" style="margin-right:10px">{{progVideoCreativeNumber}}/6</div>
									</div>
									<div class="creativeTypeBox">
										<div class="ltt-itemList">
											<littleCreativItem
												v-for="item in littleCreativeData"
												:key="item.id"
												:backData="item"
												@callbackItem="clickLittleCreative"
												@closeItem="clickLittleCloseItem"
											></littleCreativItem>
										</div>
									</div>
									<div class="creativeListBigBox" v-show="form.creatStyle==1">
										<selfBigImgH
											v-if="hasData"
											v-show="littleCreativeData[0].currentShow"
											@wordsLengthWarning="wordsLengthWarning"
											:backData="makeSeftCreativeArray[0]"
										></selfBigImgH>

										<selfVideoH
											v-if="hasData"
											v-show="littleCreativeData[1].currentShow"
											@wordsLengthWarning="wordsLengthWarning"
											:backData="makeSeftCreativeArray[1]"
										></selfVideoH>
										<selfVideoS
											v-if="hasData"
											v-show="littleCreativeData[2].currentShow"
											@wordsLengthWarning="wordsLengthWarning"
											:backData="makeSeftCreativeArray[2]"
										></selfVideoS>
										<selfImgGroup
											v-if="hasData"
											v-show="littleCreativeData[3].currentShow"
											@wordsLengthWarning="wordsLengthWarning"
											:backData="makeSeftCreativeArray[3]"
										></selfImgGroup>
										<selfLittleImg
											v-if="hasData"
											v-show="littleCreativeData[4].currentShow"
											@wordsLengthWarning="wordsLengthWarning"
											:backData="makeSeftCreativeArray[4]"
										></selfLittleImg>
										<selfBigImgS
											v-if="hasData"
											v-show="littleCreativeData[5].currentShow"
											@wordsLengthWarning="wordsLengthWarning"
											:backData="makeSeftCreativeArray[5]"
										></selfBigImgS>
									</div>
									<div class="creativeListBigBox" v-show="form.creatStyle==2">
										<progBigImgH
											v-if="hasData"
											v-show="littleCreativeData[0].currentShow"
											:backData="progCreativeArray[0]"
										></progBigImgH>
										<progVideoH
											v-if="hasData"
											v-show="littleCreativeData[1].currentShow"
											:backData="progCreativeArray[1]"
										></progVideoH>
										<progVideoS
											v-if="hasData"
											v-show="littleCreativeData[2].currentShow"
											:backData="progCreativeArray[2]"
										></progVideoS>
										<progLittleImg
											v-if="hasData"
											v-show="littleCreativeData[4].currentShow"
											:backData="progCreativeArray[4]"
										></progLittleImg>
										<progBigImgS
											v-if="hasData"
											v-show="littleCreativeData[5].currentShow"
											:backData="progCreativeArray[5]"
										></progBigImgS>
									</div>
								</div>
							</el-form-item>
						</div>
						<div style="position:relative;max-width:600px" v-if="form.creatStyle==2">
							<el-form-item
								v-for="(items, index) in form.cibaoArray"
								:label="index==0?'创意标题':''"
								:key="index"
								:prop="'cibaoArray.' + index + '.title'"
								:rules="rulesForm.sskk"
							>
								<div v-if="index == 0">
									<el-button type="primary" @click="addCreativeTitle" icon="el-icon-circle-plus">创意标题</el-button>
								</div>
								<div class="right" style="padding-top:20px;">
									<div class style="display:flex">
										<el-input
											placeholder="请输入内容"
											@input="wordsChangeAction(items.title,index)"
											:id="'word'+index"
											v-model="items.title"
										>
											<template slot="append">{{items.titleLength}}/25</template>
										</el-input>
										<i class="el-icon-delete deleteIClass" @click="deleteCreativeTitle(index)"></i>
									</div>
									<div class="cibaoClass" style="margin-top:0px">
										<span style="color: #999;">插入动态词包</span>
										<a	href="javascript:void(0);" v-for="item in cibaoArray" @click="cibaoAction('word'+index,item,index)">+{{item}}</a>
										<a
											href="javascript:void(0);"
											@click="showInsertCB('word'+index,items,index)"
											style="margin-left:50px"
										>更多</a>
									</div>
								</div>
							</el-form-item>
						</div>
						<div v-if="landing_type=='APP'" style="position:relative" class="height20">
							<el-form-item v-if="appType == 'APP_ANDROID'" label="应用下载详情页" prop="web_url">
								<div class="required-item"></div>
								<div class="byted-radio-group btn-group" style="width:500px">
									<el-input disabled placeholder="请输入网址或从之前网站选择" v-model="form.web_url">
										<el-button slot="append" @click="selectUrl">
											选择已有
											<i class="el-icon-arrow-down" :class="rotate?'rotate':'aa'"></i>
										</el-button>
									</el-input>
									<div v-show="rotate">
										<div class="bui-popper">
											<p class="dropdown-tab">
												<span class="active">网站</span>
											</p>
											<ul class="dropdown-menu">
												<li :key="index" v-for="(item,index) in urlList">
													<span @click="selectLoadUrl(item)">{{item.name}}</span>
													<span class="fr" @click="showImg(item)">预览</span>
												</li>
											</ul>
										</div>
										<div class="preview-container" style="height:300px;width:165px">
											<div class="downloadBox" style="overflow:Scroll;height:100%">
												<img :src="img" style="width:100%">
											</div>
										</div>
									</div>
								</div>
							</el-form-item>
						</div>
						<div v-if="landing_type=='APP'" style="position:relative">
							<el-form-item label="应用名" prop="app_name" class="currentWidth">
								<el-input v-model="form.app_name" placeholder="请输入应用名"></el-input>
							</el-form-item>
						</div>
						<div v-if="landing_type=='APP'" style="position:relative">
							<el-form-item label="副标题" prop="advanced_creative_title" class="currentWidth">
								<el-input v-model="form.advanced_creative_title" placeholder="请输入副标题"></el-input>
							</el-form-item>
						</div>
						<div style="position:relative" v-if="landing_type=='LINK'">
							<el-tooltip class="tooltip" placement="top" effect="light">
								<div slot="content">来源即广告来源，展示在广告左下角，
									<br>来源需与公司名称或公司名称简称保持一致
								</div>
								<i class="el-icon-question"></i>
							</el-tooltip>
							<el-form-item label="来源" prop="source" class="currentWidth">
								<el-input v-model="form.source" placeholder="请输入来源"></el-input>
							</el-form-item>
						</div>
						<div class="height20" v-if="landing_type=='LINK'">
							<el-form-item
								style="line-height:20px"
								prop="subjoinCreatStyle"
								label="附加创意类型"
								class="currentWidth"
							>
								<el-radio-group v-model="form.subjoinCreatStyle" size="medium">
									<el-radio-button label="1">不设置</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</div>
						<div class="height20" v-if="form.creatStyle==2">
							<el-form-item
								style="line-height:20px"
								prop="subjoinCreatStyle"
								label="图片生成视频"
								class="currentWidth"
							>
								<el-radio-group v-model="form.subjoinCreatStyle" size="medium">
									<el-radio-button label="0">不启用</el-radio-button>
									<el-radio-button label="1">启用</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</div>
						<div class="height20" v-if="form.creatStyle==2">
							<el-form-item
								style="line-height:20px"
								prop="subjoinCreatStyle"
								label="最优创意衍生计划"
								class="currentWidth"
							>
								<el-radio-group v-model="form.subjoinCreatStyle" size="medium">
									<el-radio-button label="0">不启用</el-radio-button>
									<el-radio-button label="1">启用</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</div>
						<div>
							<el-form-item
								style="line-height:20px"
								prop="is_comment_disable"
								label="广告评论"
								class="currentWidth"
							>
								<el-radio-group v-model="form.is_comment_disable" size="medium">
									<el-radio-button label="0">不启用</el-radio-button>
									<el-radio-button label="1">启用</el-radio-button>
								</el-radio-group>
							</el-form-item>
						</div>
						<div>
							<el-form-item
								style="line-height:20px"
								prop="creative_display_mode"
								label="创意展现"
								class="currentWidth"
							>
								<el-radio-group v-model="form.creative_display_mode" size="medium">
									<el-radio-button label="CREATIVE_DISPLAY_MODE_CTR">优选模式</el-radio-button>
								</el-radio-group>
								<p
									style="margin-top:5px;line-height:20px;color: #999;"
								>选择优选模式，系统会自动对效果好的创意进行展示量倾斜，创意效果越好展示量越高</p>
							</el-form-item>
						</div>
					</div>
					<!-- <div class="throw_in_location">
						<div class="throw_in_label">账户品牌设置</div>
						<div class="labelItem" style="display:block">
							<div class="row-item err">
								<div class="hint-item">
									<el-popover
										placement="top-start"
										width="380"
										trigger="hover"
										content="该头像用于广告展示，请使用清晰、健康、代表品牌形象的图片"
									>
										<i class="el-icon-question" slot="reference"></i>
									</el-popover>
								</div>
								<div class="label-item label-size-middle label-size-reset">
									<div class="text-item">账户头像</div>
								</div>
								<div class="byted-radio-group btn-group">
									<img src="../../../../static/images/per.png" style="width:100px">
									<span class="link">上传<i class="el-icon-edit-outline"></i></span>
									<el-alert
										title="头像未上传，请上传"
										show-icon
										:closable="false"
										type="error">
									</el-alert>
								</div>
							</div>
							<div class="row-item err">
								<div class="hint-item">
									<el-popover
										placement="top-start"
										width="380"
										trigger="hover"
										content="该名称用于广告展示，请使用能够准确代表所推广产品的品牌名称"
									>
										<i class="el-icon-question" slot="reference"></i>
									</el-popover>
								</div>
								<div class="label-item label-size-middle label-size-reset">
									<div class="text-item">品牌名称</div>
								</div>
								<div class="byted-radio-group btn-group">
									<span class="link">输入品牌名称 <i class="el-icon-edit-outline"></i></span>
									<el-alert
										title="名称未填写，请输入"
										show-icon
										:closable="false"
										type="error">
									</el-alert>
								</div>
							</div>
						</div>
					</div> -->
					<div class="throw_in_location">
						<div class="throw_in_label">设置创意分类和标签</div>
						<div class="labelItem" style="display:block">
							<div>
								<el-form-item label="创意分类" prop="ad_category" class="currentWidth">
									<el-cascader
										width="420"
										expand-trigger="hover"
										:options="options"
										v-model="form.ad_category"
										@change="cascaderChange"
									></el-cascader>
								</el-form-item>
							</div>
							<div>
								<el-form-item label="创意标签" prop="ad_keywords" class="currentWidth">
									<el-input
										maxlength="10"
										placeholder="请输入内容"
										@keyup.enter.native="addCreativeTag"
										v-model="form.creativetag"
									>
										<template slot="append">按回车键添加</template>
									</el-input>
									<creatTags :backData="form.ad_keywords" @clearCreatTags="clearCreatTags"></creatTags>
								</el-form-item>
								<div></div>
							</div>
						</div>
					</div>
					<div class="throw_in_location">
						<div class="throw_in_label">第三方监测链接</div>
						<div class="labelItem" style="display:block">
							<el-form-item
								label="展示"
								prop="track_url"
								class="currentWidth"
								:rules="rulesForm.isTureUrlInput"
							>
								<el-input v-model="form.track_url" placeholder="请输入展示链接"></el-input>
							</el-form-item>
							<el-form-item
								label="点击"
								prop="action_track_url"
								class="currentWidth"
								:rules="rulesForm.isTureUrlInput"
							>
								<el-input
									:disabled="hasAction_track_url"
									v-model="form.action_track_url"
									placeholder="请输入点击链接"
								></el-input>
							</el-form-item>
							<el-form-item
								label="视频播放"
								prop="video_play_track_url"
								class="currentWidth"
								:rules="rulesForm.isTureUrlInput"
							>
								<el-input v-model="form.video_play_track_url" placeholder="请输入视频播放链接"></el-input>
							</el-form-item>
							<el-form-item
								label="视频播完"
								prop="video_play_done_track_url"
								class="currentWidth"
								:rules="rulesForm.isTureUrlInput"
							>
								<el-input v-model="form.video_play_done_track_url" placeholder="请输入视频播完链接"></el-input>
							</el-form-item>
							<div class="height20">
								<el-form-item
									style="line-height:20px"
									prop="video_play_effective_track_url"
									label="视频有效播放"
									class="currentWidth"
									:rules="rulesForm.isTureUrlInput"
								>
									<el-input v-model="form.video_play_effective_track_url" placeholder="请输入视频有效播放链接"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
					<div class="throw_in_location">
						<div style="position:absolute;right:10px;top:20px">
							<el-button v-if="this.adId == undefined" @click="cancelAction('new')">取消</el-button>
							<el-button v-if="this.adId != undefined" @click="cancelAction('edit')">取消</el-button>
							<el-button
								type="primary"
								@click="submitAction('form')"
							>{{this.adId&&!this.copyadId?'修改并关闭':'新建并关闭'}}</el-button>
						</div>
					</div>
				</div>
			</div>
		</el-form>
		<el-dialog
			title="添加创意"
			:visible.sync="addCreatDialogVisible"
			@close="dialogCloseAction"
			:width="addCreatDVWidth"
		>
			<div class="dvBox">
				<div class="titleSpan">视频创意</div>
				<div class="adList">
					<addCreatType :backData="addCreativeDic[1]"></addCreatType>
					<addCreatType :backData="addCreativeDic[2]"></addCreatType>
				</div>
				<div class="titleSpan">图片创意</div>
				<div class="adList">
					<addCreatType :backData="addCreativeDic[0]"></addCreatType>
					<addCreatType :backData="addCreativeDic[3]"></addCreatType>
					<addCreatType :backData="addCreativeDic[4]"></addCreatType>
					<addCreatType :backData="addCreativeDic[5]"></addCreatType>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addCreatDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogSureAction">确 定</el-button>
			</span>
		</el-dialog>
		<insertCB
			:backData="insertCBValue"
			@insertCloseAction="insertCloseAction"
			@insertData="insertBackData"
		></insertCB>
		<!-- 上传头像和名称start -->
		<!-- <el-dialog
			title="头像和名称"
			:visible.sync="isHeaderPic"
			width="30%">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog> -->
		<!-- 上传头像和名称end -->
	</div>
</template>
<script>
import newData from './newCreative.js'
import { getCreatCreative, getCreativeClickUrl, changeCreatCreative, getCreativeTypeList, getWebsites, creatCreative, getCBWordsLength, getCBWords } from "../../../api/admin";
export default {
	components: {
		insertCB: resolve => require(["./insertCB.vue"], resolve),
		creatCheckbox: resolve => require(["./creatCheckbox.vue"], resolve),
		creatRadio: resolve => require(["./creatRadio.vue"], resolve),
		addCreatType: resolve => require(["./addCreatType.vue"], resolve),
		littleCreativItem: resolve => require(["./littleCreativItem.vue"], resolve),
		selfBigImgH: resolve => require(["./creativeComp/selfBigImgH.vue"], resolve),
		selfBigImgS: resolve => require(["./creativeComp/selfBigImgS.vue"], resolve),
		selfLittleImg: resolve => require(["./creativeComp/selfLittleImg.vue"], resolve),
		selfImgGroup: resolve => require(["./creativeComp/selfImgGroup.vue"], resolve),
		selfVideoH: resolve => require(["./creativeComp/selfVideoH.vue"], resolve),
		selfVideoS: resolve => require(["./creativeComp/selfVideoS.vue"], resolve),
		progVideoH: resolve => require(["./creativeComp/progVideoH.vue"], resolve),
		progVideoS: resolve => require(["./creativeComp/progVideoS.vue"], resolve),
		progBigImgH: resolve => require(["./creativeComp/progBigImgH.vue"], resolve),
		progBigImgS: resolve => require(["./creativeComp/progBigImgS.vue"], resolve),
		progLittleImg: resolve => require(["./creativeComp/progLittleImg.vue"], resolve),
		creatTags: resolve => require(["./creatTags.vue"], resolve),
		leftBar: resolve => require(["@/components/leftBar.vue"], resolve),
	},
	data: function () {
		var validateSource = (rule, value, callback) => {
			if (!value) {
				callback(new Error('来源不能为空'));
				return;
			}
			let len = this.getStringLen(value)
			if (len < 4 || len > 20) {
				callback(new Error('4至20个字符, 汉字占两个字符'));
			} else {
				callback();
			}
		};
		var validateAppName = (rule, value, callback) => {
			if (!value) {
				callback(new Error('应用名不能为空'));
				return;
			}
			let len = this.getStringLen(value)
			if (len < 4 || len > 40) {
				callback(new Error('4至40个字符, 汉字占两个字符'));
			} else {
				callback();
			}
		};
		var isTureUrl = (rule, value, callback) => {
			var reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
			var isUrl = value.match(reg);
			if (value == '') {
				callback();
			} else if (!isUrl) {
				callback(new Error('链接地址无法访问, 请确认是否正确'));
			} else {
				callback();
			}
		}
		var validateCBName = (rule, value, callback) => {
			if (!value) {
				callback(new Error('创意标题不能为空'));
				return;
			}
			let index = JSON.parse(rule.field.split('.')[1])
			let item = this.form.cibaoArray[index]
			let len = item.titleLength
			if (len < 6 || len > 25) {
				callback(new Error('标题为6～25个字'));
			} else {
				callback();
			}
		};
		var validateAdTitle = (rule, value, callback) => {
			if (value == '' || value == null) {
				callback();
				return;
			}
			let len = this.getStringLen(value)
			if (len > 24) {
				callback(new Error('不超过24个字符，汉字占两个字符'));
			} else {
				callback();
			}
		};
		return {
			adId: this.$route.query.adId || this.$route.query.copyadId,
			copyadId: this.$route.query.copyadId,
			insertCBValue: false,
			insertCBIndex: 0,
			tableLoading: false,
			hasAction_track_url: false,
			appType: this.$route.query.APPType,
			hasReflash: this.$store.state.creative.hasReflash,
			addCreatDialogVisible: false,
			adverPlanName: this.$route.query.planName,
			landing_type: this.$route.query.landing_type,
			adverPlanId: this.$route.query.id,
			screenWidth: '',
			rotate: false,
			urlList: [],
			img: "",
			// creatStyle: 1,
			addCreatDVWidth: '',
			selectedAppNameId: ['INVENTORY_FEED', 'INVENTORY_TEXT_LINK', 'INVENTORY_VIDEO_FEED', 'INVENTORY_HOTSOON_FEED', 'INVENTORY_AWEME_FEED', 'INVENTORY_UNION_SLOT'],
			selectedAppName: ['头条信息流', '头条文章详', '西瓜信息流', '火山小视频', '抖音信息流', '穿山甲'],
			cities: [
				{ label: '头条信息流', id: 'INVENTORY_FEED' },
				{ label: '头条文章详', id: 'INVENTORY_TEXT_LINK' },
				{ label: '西瓜信息流', id: 'INVENTORY_VIDEO_FEED' },
				{ label: '火山小视频', id: 'INVENTORY_HOTSOON_FEED' },
				{ label: '抖音信息流', id: 'INVENTORY_AWEME_FEED' },
				{ label: '穿山甲', id: 'INVENTORY_UNION_SLOT' }
			],
			locationSelectName: '信息流场景',
			addCreativeDic: newData.addCreativeDic,
			littleCreativeData: newData.littleCreativeData,
			isSureClose: false,
			options: [],
			cibaoArray: ['地点', '日期', '星期', '年龄'],
			form: {
				creatStyle: this.$store.state.creative.creatStyle,
				adverLocation: '1',
				subjoinCreatStyle: 1,
				is_comment_disable: 1,
				creative_display_mode: 'CREATIVE_DISPLAY_MODE_CTR',
				ad_category: [],
				ad_keywords: [],
				creativetag: '',
				web_url: '', // 应用下载详情页
				app_name: '',
				source: '',
				advanced_creative_title: '',
				track_url: '',
				action_track_url: '',
				video_play_track_url: '',
				video_play_done_track_url: '',
				video_play_effective_track_url: '',
				cibaoArray: [{ title: '', wordIds: [], titleLength: 0 }]
			},
			rulesForm: {
				creative_display_mode: [{
					required: true,
					message: '创意展现不能为空',
					trigger: 'blur'
				}],
				is_comment_disable: [{
					required: true,
					message: '评论不能为空',
					trigger: 'blur'
				}],
				subjoinCreatStyle: [{
					required: true,
					message: '不能为空',
					trigger: 'blur'
				}],
				adverLocation: [{
					required: true,
					message: '广告位置不能为空',
					trigger: 'blur'
				}],
				creatStyle: [{
					required: true,
					message: '创意方式置不能为空',
					trigger: 'blur'
				}],
				source: [{
					required: true,
					validator: validateSource,
					trigger: 'change'
				}],
				ad_category: [{
					required: true,
					message: '创意分类不能为空',
					trigger: 'blur'
				}],
				web_url: [{
					required: true,
					message: '应用下载链接不能为空',
					trigger: 'blur'
				}],
				advanced_creative_title: [{
					required: false,
					validator: validateAdTitle,
					trigger: 'change'
				}],
				isTureUrlInput: [
					{
						required: false,
						validator: isTureUrl,
						trigger: 'blue'
					}
				],
				app_name: [{
					required: true,
					validator: validateAppName,
					trigger: 'blur'
				}],
				ad_keywords: [{
					required: true,
					message: '创意标签不能为空',
					trigger: 'blur'
				}],
				sskk: [{
					required: true,
					message: '创意标题不能为空',
					trigger: 'blur'
				}, {
					required: true,
					validator: validateCBName,
					trigger: 'blur'
				}],
				// cibaoArray:[{
				// 	required: true,
				// 	message: '词包不能为空',
				// 	trigger: 'blur'
				// }],
				// cibaoArray: [{
				// 		required: true,
				// 		validator: validateWords,
				// 		trigger: 'change'
				// 	}],

			},
			wordNowId: '',
			hasData: false
		}
	},
	computed: {
		selfCreativeNumber: {
			get () {
				let arr = this.$store.state.creative.selfCreativeArray;
				let allNumber = 0;
				for (var i = 0; i < arr.length; i++) {
					let arrItem = arr[i];
					allNumber += arrItem.length;
				}
				return allNumber
			}
		},
		progImgCreativeNumber: {
			get () {
				let arr1 = this.$store.state.creative.progCreativeArray;
				let arr = [arr1[0], arr1[4], arr1[5],]
				let allNumber = 0;
				for (var i = 0; i < arr.length; i++) {
					let arrItem = arr[i];
					allNumber += arrItem.length;
				}
				return allNumber
			}
		},
		progVideoCreativeNumber: {
			get () {
				let arr1 = this.$store.state.creative.progCreativeArray;
				let arr = [arr1[1], arr1[2]]
				let allNumber = 0;
				for (var i = 0; i < arr.length; i++) {
					let arrItem = arr[i];
					allNumber += arrItem.length;
				}
				return allNumber
			}
		},
		makeSeftCreativeArray: {
			get () {
				return this.$store.state.creative.selfCreativeArray
			},
			set (val) {
				this.$store.commit('setSelfCreativeArray', val);
			}
		},
		progCreativeArray: {
			get () {
				return this.$store.state.creative.progCreativeArray
			},
			set (val) {
				this.$store.commit('setProgCreativeArray', val);
			}
		},
	},
	watch: {
		screenWidth: function (val) {
			if (val >= 992) {
				this.addCreatDVWidth = '900px'
			} else if (val >= 768) {
				this.addCreatDVWidth = '600px'
			}
		},
		addCreativeDic: function (val) {
			console.log(val);
		},
		'form.cibaoArray': {
			handler (newValue, oldValue) {
				console.log('------', newValue, oldValue);
			},
			deep: true
		},
		littleCreativeData: function (val) {
			console.log(val);
		},
		makeSeftCreativeArray: function (val) {
			console.log(val);
			this.$store.commit('setSelfCreativeArray', val);
		},
		progCreativeArray: function (val) {
			console.log(val);
			this.$store.commit('setProgCreativeArray', val);
		},
		'form.creatStyle': function (val) {
			this.$store.commit('setCreatStyle', val)
			this.creatStyleChangeAction(val)
			this.addCreativeDic.forEach(item => item.hasWarning = false)
			this.littleCreativeData.forEach(item => item.hasWarning = false)
			this.$refs['form'].clearValidate()
		},
		'form.adverLocation': function (val) {
			if (val == 3) {
				if (this.locationSelectName != '视频后贴和尾帧场景' && this.form.creatStyle == 2) {
					this.disableIdAction([4])
				} else if (this.locationSelectName == '视频后贴和尾帧场景' && this.form.creatStyle != 2) {
					this.disableIdAction([3])
				} else if (this.locationSelectName == '视频后贴和尾帧场景' && this.form.creatStyle == 2) {
					this.disableIdAction([3, 4])
				} else {
					this.addCreativeDic.forEach(item => {
						item.checked = true
						item.disabled = false
					})
				}
			} else {
				if (this.form.creatStyle == 2) {
					this.disableIdAction([4])
				} else {
					this.addCreativeDic.forEach(item => {
						item.checked = true
						item.disabled = false
					})
				}
			}
			let obj = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.littleCreativeData = obj
			this.initCurrentShowCreative();
		},
	},
	mounted () {
		this.initWidth();
		this.getCreatWords();
		this.creatStyleChangeAction(this.form.creatStyle)
		let _this = this;
		getCreativeTypeList().then(data => {
			_this.options = data.data
		})
		let urlStr = '?advertiser_id=' + this.$store.state.titlemess.advId + '&ad_id=' + this.adverPlanId;
		if (this.adId) {
			urlStr = '?advertiser_id=' + this.$store.state.titlemess.advId + '&ad_id=' + this.adId;
		}
		getCreativeClickUrl(urlStr).then(data => {
			console.log(data);
			if (data.data.action_track_url) {
				this.hasAction_track_url = true
				this.form.action_track_url = data.data.action_track_url
			}
		})
		if (this.adId) {
			this.tableLoading = true;
			let str = '?adverid=' + this.$store.state.titlemess.advId + '&adId=' + this.adId
			getCreatCreative(str).then(res => {
				this.tableLoading = false;
				this.hasData = true;
				let item = res.data;
				this.adverPlanId = item.ad_id;
				this.form.track_url = item.track_url;
				if (item.action_track_url) {
					this.hasAction_track_url = true
					this.form.action_track_url = item.action_track_url;
				}
				this.form.video_play_effective_track_url = item.video_play_effective_track_url;
				this.form.video_play_track_url = item.video_play_track_url;
				this.form.video_play_done_track_url = item.video_play_done_track_url;
				this.form.is_comment_disable = item.is_comment_disable;
				this.form.creative_display_mode = item.creative_display_mode;
				this.selectedAppNameId = item.inventory_type;
				this.form.source = item.source;
				this.form.app_name = item.app_name;
				this.form.web_url = item.web_url;
				this.form.ad_keywords = item.ad_keywords;
				this.form.ad_category = item.ad_categorys || [];
				this.form.advanced_creative_title = item.advanced_creative_title;
				this.progCreativeArray = [[], [], [], [], [], []]
				if (!item.creative_material_mode) {
					this.form.creatStyle = 1
					if (this.hasReflash) {
						return;
					}
					this.makeSeftCreativeArray = [[], [], [], [], [], []]
					let objArr = item.creatives;
					objArr.forEach(val => {
						let obj = {};
						switch (val.image_mode) {
							case 'CREATIVE_IMAGE_MODE_LARGE':
								obj.url = val.image_urls[0]
								obj.id = val.image_ids[0]
								obj.title = val.title
								obj.creative_id = val.creative_id
								obj.wordIds = val.creative_word_ids
								this.makeSeftCreativeArray[0].push(obj)
								break;
							case 'CREATIVE_IMAGE_MODE_VIDEO':
								obj.url = val.image_url
								obj.urlId = val.image_id
								obj.video = val.video_url
								obj.videoId = val.video_id
								obj.title = val.title
								obj.creative_id = val.creative_id
								obj.wordIds = val.creative_word_ids
								this.makeSeftCreativeArray[1].push(obj)
								// this.selfCreatCBlength(obj,this.makeSeftCreativeArray[1])
								break;
							case 'CREATIVE_IMAGE_MODE_VIDEO_VERTICAL':
								obj.url = val.image_url
								obj.urlId = val.image_id
								obj.video = val.video_url
								obj.videoId = val.video_id
								obj.title = val.title
								obj.creative_id = val.creative_id
								obj.wordIds = val.creative_word_ids
								this.makeSeftCreativeArray[2].push(obj)
								// this.selfCreatCBlength(obj,this.makeSeftCreativeArray[2])
								break;
							case 'CREATIVE_IMAGE_MODE_GROUP':
								obj.url = val.image_urls
								obj.id = val.image_ids
								obj.title = val.title
								obj.creative_id = val.creative_id
								obj.wordIds = val.creative_word_ids
								this.makeSeftCreativeArray[3].push(obj)
								// this.selfCreatCBlength(obj,this.makeSeftCreativeArray[3])
								break;
							case 'CREATIVE_IMAGE_MODE_SMALL':
								obj.url = val.image_urls[0]
								obj.id = val.image_ids[0]
								obj.title = val.title
								obj.creative_id = val.creative_id
								obj.wordIds = val.creative_word_ids
								this.makeSeftCreativeArray[4].push(obj)
								// this.selfCreatCBlength(obj,this.makeSeftCreativeArray[4])
								break;
							case 'CREATIVE_IMAGE_MODE_LARGE_VERTICAL':
								obj.url = val.image_urls[0]
								obj.id = val.image_ids[0]
								obj.title = val.title
								obj.creative_id = val.creative_id
								obj.wordIds = val.creative_word_ids
								this.makeSeftCreativeArray[5].push(obj)
								// this.selfCreatCBlength(obj,this.makeSeftCreativeArray[5])
								break;
						}
					})
					console.log(this.makeSeftCreativeArray);
					for (var i = 0; i < this.makeSeftCreativeArray.length; i++) {
						let item = this.makeSeftCreativeArray[i];
						if (item.length > 0) {
							item[0].active = true
						}
					}
				} else {
					this.form.creatStyle = 2
					if (item.title_list.length > 0) {
						this.form.cibaoArray = []
						item.title_list.forEach((littleItem, index) => {
							let obj = { title: '', creative_word_ids: [] }
							obj.title = littleItem.title;
							obj.wordIds = littleItem.creative_word_ids
							this.form.cibaoArray.push(obj)
							let str = '?advertiserId=' + this.$store.state.titlemess.advId + '&title=' + encodeURI(obj.title)
							getCBWordsLength(str).then(res => {
								obj.titleLength = res.data.length || 0
								this.$set(this.form.cibaoArray, index, obj)
								console.log(index, obj);
							})
						})
					}
					let objArr = item.image_list
					objArr.forEach(val => {
						let obj = {};
						switch (val.image_mode) {
							case 'CREATIVE_IMAGE_MODE_LARGE':
								obj.url = val.image_urls[0]
								obj.id = val.image_ids[0]
								obj.creative_id = val.creative_id
								this.progCreativeArray[0].push(obj)
								break;
							case 'CREATIVE_IMAGE_MODE_VIDEO':
								obj.url = val.image_url
								obj.urlId = val.image_id
								obj.video = val.video_url
								obj.videoId = val.video_id
								obj.creative_id = val.creative_id
								this.progCreativeArray[1].push(obj)
								break;
							case 'CREATIVE_IMAGE_MODE_VIDEO_VERTICAL':
								obj.url = val.image_url
								obj.urlId = val.image_id
								obj.video = val.video_url
								obj.videoId = val.video_id
								obj.creative_id = val.creative_id
								this.progCreativeArray[2].push(obj)
								break;
							case 'CREATIVE_IMAGE_MODE_GROUP':
								break;
							case 'CREATIVE_IMAGE_MODE_SMALL':
								obj.url = val.image_urls[0]
								obj.id = val.image_ids[0]
								obj.creative_id = val.creative_id
								this.progCreativeArray[4].push(obj)
								break;
							case 'CREATIVE_IMAGE_MODE_LARGE_VERTICAL':
								obj.url = val.image_urls[0]
								obj.id = val.image_ids[0]
								obj.creative_id = val.creative_id
								this.progCreativeArray[5].push(obj)
								break;
						}
					})
					for (var i = 0; i < this.progCreativeArray.length; i++) {
						let item = this.progCreativeArray[i];
						if (item.length > 0) {
							item[0].active = true
							break;
						}
					}
				}
				// if (!this.hasReflash && this.form.creatStyle==1) {
				// 	this.$store.commit('setHasReflash',true);
				// 	let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
				// 	this.$router.push(NewPage);
				// 	this.$router.go(-1);
				// }
			})
		}else{
			this.hasData = true;
		}

	},
	methods: {
		initWidth () {  //获取高度
			//获取浏览器可视区域高度
			this.screenWidth = document.documentElement.clientWidth;
			// console.log($(document).height());//浏览器可视区域对象宽度
			window.onresize = () => {  //当窗口或框架发生改变时触发
				//console.log("onresize进来了");
				this.screenWidth = document.documentElement.clientWidth;
			};
		},
		// selfCreatCBlength(item,arr) {
		// 	let str = '?advertiserId='+this.$store.state.titlemess.advId+'&title='+encodeURI(item.title)
		// 	getCBWordsLength(str).then(res=> {
		// 	  item.wordIds = res.data.creative_word_ids;
		// 	  item.titleLength = res.data.length || 0
		// 		arr.push(item)
		// 	})
		// },
		wordsLengthWarning (val, isTure) {
			let index = this.makeSeftCreativeArray.findIndex((value, index, arr) => {
				return val === value;
			})
			if (index != -1) {
				this.littleCreativeData[index].hasWarning = isTure
			}
		},
		wordsChangeAction (value, index) {
			let str = '?advertiserId=' + this.$store.state.titlemess.advId + '&title=' + encodeURI(value)
			getCBWordsLength(str).then(res => {
				let item = this.form.cibaoArray[index];
				item.wordIds = res.data.creative_word_ids;
				item.titleLength = res.data.length || 0
				let str = 'cibaoArray.' + index + '.title';
				this.$refs['form'].validateField([str], (validMessage) => {
					console.log(validMessage);
				})
			})
		},
		showInsertCB (id, item, index) {
			this.wordNowId = id;
			this.insertCBIndex = index
			this.insertCBValue = true
		},
		insertCloseAction () {
			this.insertCBValue = false
		},
		insertBackData (val) {
			console.log(val);
			this.insertCBValue = false
			this.cibaoAction(this.wordNowId, val.name, this.insertCBIndex)
		},
		selectLoadUrl (url) {
			// 回传链接
			this.form.web_url =
				"https://www.chengzijianzhan.com/tetris/page/" + url.siteId;
			this.rotate = false;
		},
		showImg (item) {
			// 预览图片
			this.img = item.thumbnail;
		},
		selectUrl () {
			// 选择已有按钮
			this.rotate = !this.rotate;
			this.getWeblist();
		},
		getWeblist () {
			// 获取下载列表
			getWebsites({ adverid: this.$store.state.titlemess.advId }).then(res => {
				this.urlList = res.data;
			});
		},
		// 添加创意标题按钮
		addCreativeTitle (index) {

			if (this.form.cibaoArray.length >= 10) {
				this.$message.error('创意标题不能超过10个')
				return;
			}
			let obj = { title: '', wordIds: [], titleLength: 0 }
			this.form.cibaoArray.push(obj)
		},
		// 删除创意标题
		deleteCreativeTitle (index) {
			if (this.form.cibaoArray.length <= 1) {
				return;
			}
			this.form.cibaoArray.splice(index, 1)
		},
		getCreatWords () {
			// 获取创意标题动态词包
			getCBWords(this.$store.state.titlemess.advId).then(res => {
				res.data.forEach(item => {
					item.words = item.words.toString()
					if (item.status == 'CREATIVE_WORD_STATUS_APPROVE') {
						item.status = '审核通过'
					} else if (item.status == 'CREATIVE_WORD_STATUS_REJECT') {
						item.status = '审核失败'
					} else if (item.status == 'CREATIVE_WORD_STATUS_AUDIT') {
						item.status = '新建审核中'
					} else if (item.status == 'CREATIVE_WORD_STATUS_REAUDIT') {
						item.status = '修改审核中'
					}
				})
				this.$store.commit("getCreativeWord", res.data);
				console.log(this.$store.state.creative.creativeArray, 'this.$store.state')
			})
		},
		cibaoAction (id, val, index) {
			let obj = this.form.cibaoArray[index];
			if (obj.title.includes(val)) {
				return;
			}
			var elInput = document.getElementById(id);
			var startPos = elInput.selectionStart;
			var endPos = elInput.selectionEnd;
			if (startPos === undefined || endPos === undefined) return;
			var txt = elInput.value;
			let str = eval("/" + '}' + "/ig")
			let mac = obj.title.match(str);
			if (mac != null && mac.length >= 2) {
				this.$message.error('最多插入两个词包');
				return;
			}
			var result = txt.substring(0, startPos) + '{' + `${val}` + '}' + txt.substring(endPos);
			obj.title = result
			this.wordsChangeAction(obj.title, index);
		},
		creatStyleChangeAction (val) {
			if (val == 2 && this.locationSelectName != '视频后贴和尾帧场景') {
				this.disableIdAction([4])
			} else if (val == 2 && this.locationSelectName == '视频后贴和尾帧场景') {
				this.disableIdAction([3, 4])
			} else {
				if (this.locationSelectName == '视频后贴和尾帧场景') {
					this.disableIdAction([3])
				} else {
					this.addCreativeDic.forEach(item => {
						item.checked = true
						item.disabled = false
					})
				}
			}
			let obj = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.littleCreativeData = obj
			this.initCurrentShowCreative();
		},
		getStringLen (str) {
			var len = 0;
			for (var i = 0; i < str.length; i++) {
				str.charCodeAt(i) > 255 ? len += 2 : len += 1;
			}
			return len;
		},
		// app名称多选框change事件
		checkBoxChangAction (val) {
			console.log(val);
			let _this = this;
			let arr = [];
			val.forEach(ids => {
				_this.cities.forEach(item => {
					if (item.id == ids) {
						arr.push(item.label)
					}
				})
			})
			this.selectedAppNameId = val
			this.selectedAppName = arr
		},
		// 单选框位置选择change事件
		loactionRadioChangeAction (val) {
			this.locationSelectName = val.label
			if (val.id == 3 && this.form.creatStyle != 2) {
				this.disableIdAction([3])
			} else if (val.id == 3 && this.form.creatStyle == 2) {
				this.disableIdAction([3, 4])
			} else {
				if (this.form.creatStyle == 2) {
					this.disableIdAction([4])
				} else {
					this.addCreativeDic.forEach(item => {
						item.checked = true
						item.disabled = false
					})
				}
			}
			let obj = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.littleCreativeData = obj
		},
		disableIdAction (ids) {
			let _this = this
			this.addCreativeDic.forEach(item => {
				if (ids.includes(item.id)) {
					item.checked = false
					item.disabled = true
					if (item.currentShow) {
						_this.clickLittleCloseItem(item)
					}
				} else {
					item.checked = true
					item.disabled = false
				}
			})
		},
		// 点击小图切换创意
		clickLittleCreative (val) {
			let obj = this.littleCreativeData
			for (let model of obj) {
				model.hasWarning = false
				model.currentShow = false
			}
			val.currentShow = true
		},
		// 点击小图关闭按钮
		clickLittleCloseItem (val) {
			if (val.currentShow) {
				let obj = this.littleCreativeData
				let ids = [];
				for (let model of obj) {
					if (!model.currentShow && model.checked) {
						ids.push(model.id);
					}
				}
				let minId = Math.min(...ids)
				let _this = this
				for (var i = 0; i < obj.length; i++) {
					let item = obj[i]
					if (item.id === minId) {
						_this.$nextTick(function () {
							item.currentShow = true
							let obj = JSON.parse(JSON.stringify(_this.littleCreativeData))
							_this.addCreativeDic = obj
						})
					}
				}
				val.currentShow = false
			} else {
				let obj = JSON.parse(JSON.stringify(this.littleCreativeData))
				this.addCreativeDic = obj
			}
		},
		// 弹框关闭事件
		dialogCloseAction () {
			if (this.isSureClose) {
				this.isSureClose = false
				return;
			}
			let obj = JSON.parse(JSON.stringify(this.littleCreativeData))
			this.addCreativeDic = obj
		},
		// 弹框确定按钮方法
		dialogSureAction () {
			this.addCreatDialogVisible = false
			this.isSureClose = true
			this.littleCreativeData = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.initCurrentShowCreative();
		},
		// 重置当前显示创意
		initCurrentShowCreative () {
			let obj = this.littleCreativeData
			let ids = [];
			for (let model of obj) {
				model.currentShow = false
				if (model.checked) {
					ids.push(model.id);
				}
			}
			let minId = Math.min(...ids)
			let _this = this
			for (var i = 0; i < obj.length; i++) {
				let item = obj[i]
				if (item.id === minId) {
					_this.$nextTick(function () {
						item.currentShow = true
						let obj = JSON.parse(JSON.stringify(_this.littleCreativeData))
						_this.addCreativeDic = obj
					})
				}
			}
		},
		cascaderChange (val) {
			console.log(val);
		},
		addCreativeTag (val) {
			if (this.form.creativetag == '' || this.form.ad_keywords.includes(this.form.creativetag) || this.form.ad_keywords.length >= 20) {
				this.form.creativetag = ''
				return;
			}
			this.form.ad_keywords.push(this.form.creativetag)
			this.form.creativetag = ''
		},
		clearCreatTags () {
			this.form.ad_keywords = []
		},
		closeWindow () {
			window.opener = null; window.open('', '_self'); window.close();
		},
		cancelAction (val) {
			if (val == 'new') {
				this.$confirm('是否在离开修改页面？', '确认信息', {
					distinguishCancelAndClose: true,
					confirmButtonText: '继续',
					cancelButtonText: '放弃创建'
				})
					.then(() => {
						console.log(1);
					})
					.catch(action => {
						this.$router.go(-1)
					});
			} else if (val == 'edit') {
				this.$confirm('是否在离开修改页面？', '确认信息', {
					distinguishCancelAndClose: true,
					confirmButtonText: '继续',
					cancelButtonText: '放弃修改'
				})
					.then(() => {
						console.log(1);
					})
					.catch(action => {
						this.closeWindow()
					});
			}
		},
		submitAction (formName) {
			let _this = this;
			let dialogObj = {
				creatStyle: this.form.creatStyle,
				makeSeftCreativeArray: this.makeSeftCreativeArray,
				progCreativeArray: this.progCreativeArray,
				addCreativeDic: this.addCreativeDic,
				littleCreativeData: this.littleCreativeData,
			}
			let diaIsOk = this.submitCreative(dialogObj);
			_this.$refs[formName].validate((valid) => {
				if (valid) {
					if (!diaIsOk) {
						this.tableLoading = true;
						let sumObj = JSON.parse(JSON.stringify(newData.submitObj))
						// if (_this.form.adverLocation == 1) {
						// 	sumObj.smart_inventory = 1
						// } else if (_this.form.adverLocation == 2){
						sumObj.smart_inventory = 1
						sumObj.inventory_type = _this.selectedAppNameId
						// }
						if (_this.form.creatStyle == 1) {
							delete sumObj.image_list
							delete sumObj.title_list
							sumObj.creative_material_mode = '';
							_this.makeSeftCreativeArray[0].forEach(item => {
								let obj = Object.assign({}, newData.selfSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_LARGE';
								obj.image_urls = [item.url];
								obj.image_ids = [item.id];
								obj.creative_id = item.creative_id
								obj.title = item.title;
								obj.creative_word_ids = item.wordIds
								sumObj.creatives.push(obj)
							})
							_this.makeSeftCreativeArray[1].forEach(item => {
								let obj = Object.assign({}, newData.selfSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_VIDEO';
								obj.image_url = item.url;
								obj.creative_id = item.creative_id
								obj.image_id = item.urlId;
								obj.video_url = item.video;
								obj.video_id = item.videoId;
								obj.title = item.title;
								obj.creative_word_ids = item.wordIds
								sumObj.creatives.push(obj)
							})
							_this.makeSeftCreativeArray[2].forEach(item => {
								let obj = Object.assign({}, newData.selfSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_VIDEO_VERTICAL';
								obj.image_url = item.url;
								obj.image_id = item.urlId;
								obj.video_url = item.video;
								obj.video_id = item.videoId;
								obj.creative_id = item.creative_id
								obj.title = item.title;
								obj.creative_word_ids = item.wordIds
								sumObj.creatives.push(obj)
							})
							_this.makeSeftCreativeArray[3].forEach(item => {
								let obj = Object.assign({}, newData.selfSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_GROUP';
								obj.image_urls = item.url;
								obj.image_ids = item.id;
								obj.title = item.title;
								obj.creative_id = item.creative_id
								obj.creative_word_ids = item.wordIds
								sumObj.creatives.push(obj)
							})
							_this.makeSeftCreativeArray[4].forEach(item => {
								let obj = Object.assign({}, newData.selfSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_SMALL';
								obj.image_urls = [item.url];
								obj.image_ids = [item.id];
								obj.title = item.title;
								obj.creative_id = item.creative_id
								obj.creative_word_ids = item.wordIds
								sumObj.creatives.push(obj)
							})
							_this.makeSeftCreativeArray[5].forEach(item => {
								let obj = Object.assign({}, newData.selfSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_LARGE_VERTICAL';
								obj.image_urls = [item.url];
								obj.image_ids = [item.id];
								obj.title = item.title;
								obj.creative_id = item.creative_id
								obj.creative_word_ids = item.wordIds
								sumObj.creatives.push(obj)
							})
							if (sumObj.creatives.length == 0) {
								this.$message.error('请填写创意内容')
								this.tableLoading = false;
								return;
							}
							for (var i = 0; i < sumObj.creatives.length; i++) {
								let item = sumObj.creatives[i]
								for (let [key, value] of Object.entries(item)) {
									if (value == '' || value == []) {
										delete item[key]
									}
								}
							}
						} else if (_this.form.creatStyle == 2) {
							delete sumObj.creatives
							sumObj.creative_material_mode = 'STATIC_ASSEMBLE';
							_this.progCreativeArray[0].forEach(item => {
								let obj = Object.assign({}, newData.progSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_LARGE';
								obj.image_urls = [item.url];
								obj.image_ids = [item.id];
								obj.creative_id = item.creative_id
								sumObj.image_list.push(obj)
							})
							_this.progCreativeArray[1].forEach(item => {
								let obj = Object.assign({}, newData.progSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_VIDEO';
								obj.image_url = item.url;
								obj.image_id = item.urlId;
								obj.video_url = item.video;
								obj.video_id = item.videoId;
								obj.creative_id = item.creative_id
								sumObj.image_list.push(obj)
							})
							_this.progCreativeArray[2].forEach(item => {
								let obj = Object.assign({}, newData.progSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_VIDEO_VERTICAL';
								obj.image_url = item.url;
								obj.image_id = item.urlId;
								obj.video_url = item.video;
								obj.video_id = item.videoId;
								obj.creative_id = item.creative_id
								sumObj.image_list.push(obj)
							})
							_this.progCreativeArray[4].forEach(item => {
								let obj = Object.assign({}, newData.progSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_SMALL';
								obj.image_urls = [item.url];
								obj.image_ids = [item.id];
								obj.creative_id = item.creative_id
								sumObj.image_list.push(obj)
							})
							_this.progCreativeArray[5].forEach(item => {
								let obj = Object.assign({}, newData.progSubmitC);
								obj.image_mode = 'CREATIVE_IMAGE_MODE_LARGE_VERTICAL';
								obj.image_urls = [item.url];
								obj.image_ids = [item.id];
								obj.creative_id = item.creative_id
								sumObj.image_list.push(obj)
							})
							if (sumObj.image_list.length == 0) {
								this.$message.error('请填写创意内容')
								this.tableLoading = false;
								return;
							}
							_this.form.cibaoArray.forEach(item => {
								let obj = { title: '', creative_word_ids: [] }
								obj.title = item.title;
								obj.creative_word_ids = item.wordIds
								obj.creative_id = item.creative_id
								sumObj.title_list.push(obj)
							})
							for (var i = 0; i < sumObj.image_list.length; i++) {
								let item = sumObj.image_list[i]
								for (let [key, value] of Object.entries(item)) {
									if (value == '' || value == []) {
										delete item[key]
									}
								}
							}
						}
						sumObj.advertiser_id = _this.$store.state.titlemess.advId;
						sumObj.landing_type = _this.landing_type;
						sumObj.ad_id = _this.adverPlanId;
						sumObj.web_url = _this.form.web_url;
						sumObj.app_name = _this.form.app_name;
						sumObj.advanced_creative_title = _this.form.advanced_creative_title;
						sumObj.is_comment_disable = _this.form.is_comment_disable;
						sumObj.creative_display_mode = _this.form.creative_display_mode;
						sumObj.source = _this.form.source;
						sumObj.ad_category = _this.form.ad_category[_this.form.ad_category.length - 1];
						sumObj.ad_categorys = _this.form.ad_category;
						sumObj.ad_keywords = _this.form.ad_keywords;
						sumObj.track_url = _this.form.track_url;
						sumObj.action_track_url = _this.form.action_track_url;
						sumObj.video_play_track_url = _this.form.video_play_track_url;
						sumObj.video_play_done_track_url = _this.form.video_play_done_track_url;
						sumObj.video_play_effective_track_url = _this.form.video_play_effective_track_url;
						for (let [key, value] of Object.entries(sumObj)) {
							if (value == '' || value == []) {
								delete sumObj[key]
							}
						}

						if (this.adId && !this.copyadId) {
							changeCreatCreative(sumObj).then(res => {
								this.clearCreativeArray()
							}).catch(() => {
								this.tableLoading = false;
							})
						} else {
							sumObj.ad_id = this.$route.query.id;
							creatCreative(sumObj).then(res => {
								this.clearCreativeArray()
							}).catch(() => {
								this.tableLoading = false;
							})
						}

					}
				}
			})

		},
		clearCreativeArray () {
			this.$store.commit('setSelfCreativeArray', [[], [], [], [], [], []]);
			this.$store.commit('setProgCreativeArray', [[], [], [], [], [], []]);
			this.$store.commit('setHasReflash', false);
			this.tableLoading = false;
			window.opener = null; window.open('', '_self'); window.close();
		}
	}
}
</script>
<style lang="scss" scoped>
.ad-con-right {
	width: calc(100% - 230px);
	// overflow:-Scroll;overflow-y:hidden;
}
.ownPlan {
	background: #fff;
	margin-bottom: 12px;
	position: relative;
	padding: 32px 24px 48px 32px;
	border-radius: 2px;
	box-shadow: 0 2px 4px 0 #eff1fa;
	padding: 14px 32px;
	.planLabel {
		margin-right: 10px;
		color: #333;
	}
	.planName {
		font-weight: 700;
		color: #333;
	}
}
.throw_in_location {
	background: #fff;
	margin-bottom: 12px;
	position: relative;
	// min-width: 1130px;
	padding: 32px 24px 48px 32px;
	border-radius: 2px;
	box-shadow: 0 2px 4px 0 #eff1fa;
	.throw_in_label {
		font-size: 22px;
		margin-bottom: 36px;
		line-height: 30px;
	}
	.tipDiv {
		margin-left: 104px;
		margin-top: 16px;
		width: 350px;
		.tipLabel {
			font-size: 12px;
			color: #999;
			margin-bottom: 16px;
		}
	}
}

.inputBox {
	.choicedAdver {
		padding: 6px 0;
		line-height: 30px;
		margin-bottom: 18px;
	}
	.creativeNum {
		display: inline-block;
		margin-left: 6px;
		.num {
			display: inline-block;
			font-weight: 700;
		}
	}
	.creativeTypeBox {
		margin-top: 32px;
		.ltt-itemList {
			display: flex;
			width: 950px;
			margin-bottom: 22px;
		}
	}
	.creativeListBigBox {
		width: 930px;
		border-radius: 2px;
		border: 1px solid #dee4f5;
	}
}
.dvBox {
	.titleSpan {
		color: #666;
		margin-bottom: 15px;
	}
	.adList {
		margin-right: -15px;
		margin-bottom: 16px;
		overflow: hidden;
	}
}
.deleteIClass {
	padding-left: 10px;
	padding-top: 15px;
}
</style>
