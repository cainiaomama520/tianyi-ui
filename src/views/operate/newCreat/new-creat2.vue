<template>
	<div class="layOut layout-body">
		<left-bar></left-bar>
		<el-form :model="form" :rules='rulesForm' ref='form' label-width="80px" class="demo-ruleForm">
			<div class="ad-con-right">
				<div class="newCreatContent">
					<div class="ownPlan">
						<div style="display:flex">
							<div class="planLabel">所属广告计划:</div>
							<div class="planName">oCPM_12_20_14:42(1620352000406541)</div>
						</div>
					</div>
					<div class="throw_in_location">
						<div class="throw_in_label">设置投放位置</div>
						<div class="labelItem" style="margin-bottom:16px">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent">
									<div>广告位置</div>
									<div class="radiusSpot"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="adverLocation" size="medium">
								 <el-radio-button label="1" >优化广告位</el-radio-button>
								 <el-radio-button label="2">按媒体指定位置</el-radio-button>
								 <el-radio-button label="3">按场景指定位置</el-radio-button>
							 </el-radio-group>
							</div>
						</div>
						<div class="tipDiv">
							<div v-show="adverLocation=='1'" class="first">
								<div class="tipLabel">
									系统将根据您设置的定向，选择预估效果最好的广告位进行投放，并触达尽可能多的目标用户
								</div>
							</div>
							<div v-show="adverLocation=='2'" class="second">
								<div class="tipLabel">
									建议您选择所有可选广告位，否则会减少覆盖人数，导致广告失去部分优质展示机会
								</div>
								<div style="width:100%">
									<creatCheckbox @callBackAction='checkBoxChangAction'></creatCheckbox>
								</div>
							</div>
							<div v-show="adverLocation=='3'" class="third">
								<div class="tipLabel">
									系统将结合用户使用场景，智能选择与目标用户场景契合的广告素材进行投放，并获得尽可能优的转化效果
								</div>
								<div style="width:100%">
									<creatRadio @callBackAction='loactionRadioChangeAction'></creatRadio>
								</div>
							</div>
						</div>
					</div>
					<div class="throw_in_location">
						<div class="throw_in_label">制作创意</div>
						<div class="labelItem">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent">
									<div>创意方式</div>
									<div class="radiusSpot"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="creatStyle" size="medium">
								 <el-radio-button label="1">自定义创意</el-radio-button>
								 <el-radio-button label="2">程序化创意</el-radio-button>
							 </el-radio-group>
							</div>
						</div>
						<div class="labelItem" style="width:80px">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent">
									<div>创意内容</div>
									<div class="radiusSpot"></div>
								</div>
							</div>
							<div class="right">
								<div class="inputBox">
									<div class="choicedAdver" v-show='adverLocation==1'>已选广告位:优选广告位</div>
									<div class="choicedAdver" v-show='adverLocation==2'>已选广告位:{{selectedAppName.toString()}}</div>
									<div class="choicedAdver" v-show='adverLocation==3'>已选广告位:场景广告位-{{locationSelectName}}</div>
									<el-button type="primary" @click='addCreatDialogVisible = true' icon="el-icon-circle-plus">添加创意类型</el-button>
									<div class="creativeNum" v-if='creatStyle == 1'>创意个数:
										<div class="num">
											{{selfCreativeNumber}}/10
										</div>
									</div>
									<div class="creativeNum" v-else>图片创意个数:
										<div class="num" style="margin-right:10px">
											{{progImgCreativeNumber}}/12
										</div>
										视频创意个数:
										<div class="num" style="margin-right:10px">
											{{progVideoCreativeNumber}}/6
										</div>
									</div>
									<div class="creativeTypeBox">
										<div class="ltt-itemList">
											<littleCreativItem v-for='item in littleCreativeData' :key='item.id' :backData='item' @callbackItem='clickLittleCreative' @closeItem='clickLittleCloseItem'></littleCreativItem>
										</div>
									</div>
									<div class="creativeListBigBox" v-show='creatStyle==1'>
										<selfBigImgH v-show='littleCreativeData[0].currentShow' :backData='makeSeftCreativeArray[0]'></selfBigImgH>
										<selfVideoH v-show='littleCreativeData[1].currentShow' :backData='makeSeftCreativeArray[1]'></selfVideoH>
										<selfVideoS v-show='littleCreativeData[2].currentShow' :backData='makeSeftCreativeArray[2]'></selfVideoS>
										<selfImgGroup v-show='littleCreativeData[3].currentShow' :backData='makeSeftCreativeArray[3]'></selfImgGroup>
										<selfLittleImg v-show='littleCreativeData[4].currentShow' :backData='makeSeftCreativeArray[4]'></selfLittleImg>
										<selfBigImgS v-show='littleCreativeData[5].currentShow' :backData='makeSeftCreativeArray[5]'></selfBigImgS>
									</div>
									<div class="creativeListBigBox" v-show='creatStyle==2'>
										<progBigImgH v-show='littleCreativeData[0].currentShow' :backData='progCreativeArray[0]'></progBigImgH>
										<progVideoH v-show='littleCreativeData[1].currentShow' :backData='progCreativeArray[1]'></progVideoH>
										<progVideoS v-show='littleCreativeData[2].currentShow' :backData='progCreativeArray[2]'></progVideoS>
										<progLittleImg v-show='littleCreativeData[4].currentShow' :backData='progCreativeArray[4]'></progLittleImg>
										<progBigImgS v-show='littleCreativeData[5].currentShow' :backData='progCreativeArray[5]'></progBigImgS>
									</div>
								</div>
							</div>
						</div>
						<div class="creativeTilte">
	            <div class="labelItem">
	  						<div class="left" style="min-width:80px">
	  							<div class="startNone"></div>
	  							<div class="labelContent">
	  								<div>创意标题</div>
	  								<div class="radiusSpot"></div>
	  							</div>
	  						</div>
								<div class="">
									<div>
										<el-button type="primary" @click='addCreativeTitle' icon="el-icon-circle-plus">创意标题</el-button>
									</div>
		  						<div class="right" style="padding-top:20px;" v-for='(items,index) in form.cibaoArray'>
		                <div class="" style="display:flex">
											<el-input placeholder="请输入内容" v-model="items.title">
			                  <template slot="append">{{items.title.length}}/25</template>
			                </el-input>
											<i class="el-icon-delete deleteIClass" @click='deleteCreativeTitle(index)'></i>
		                </div>
		                <div class="cibaoClass">
		                  <span style="color: #999;">插入动态词包</span>
		                  <a href="javascript:void(0);" v-for='item in cibaoArray' @click='cibaoAction(item)'>+{{item}}</a>
		                  <a href="javascript:void(0);" style="margin-left:50px">更多</a>
		                </div>
		              </div>
								</div>
	            </div>
	          </div>
						<div style="position:relative">
							<el-tooltip class="tooltip" placement="top" effect="light">
								<div slot="content">来源即广告来源，展示在广告左下角，<br/>
									来源需与公司名称或公司名称简称保持一致</div>
								<i class="el-icon-question"></i>
							</el-tooltip>
							<el-form-item label="来源" prop='creativeSource' class='currentWidth'>
								<el-input v-model="form.creativeSource" placeholder='请输入来源'></el-input>
							</el-form-item>
						</div>
						<div class="labelItem">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent" style="width:60px;min-width:60px">
									<div>附加创意类型</div>
									<div class="radiusSpot" style="right:-5px"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="form.subjoinCreatStyle" size="medium">
								 <el-radio-button label="1">不设置</el-radio-button>
							 </el-radio-group>
							</div>
						</div>
						<div class="labelItem">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent" style="width:60px;min-width:60px">
									<div>图片生成视频</div>
									<div class="radiusSpot" style="right:-5px"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="form.subjoinCreatStyle" size="medium">
									<el-radio-button label="1">不启用</el-radio-button>
								 	<el-radio-button label="2">启用</el-radio-button>
							 </el-radio-group>
							</div>
						</div>
						<div class="labelItem">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent" style="width:60px;min-width:60px">
									<div>最优创意衍生计划</div>
									<div class="radiusSpot" style="right:-5px"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="form.subjoinCreatStyle" size="medium">
									<el-radio-button label="1">不启用</el-radio-button>
								 	<el-radio-button label="2">启用</el-radio-button>
							 </el-radio-group>
							</div>
						</div>
						<div style="position:relative" class="height20">
							<el-tooltip class="tooltip" placement="top" effect="light">
								<div slot="content">用户点击广告中“立即下载”按钮以外的区域时所到达的页面</div>
								<i class="el-icon-question" style="top:10px"></i>
							</el-tooltip>
							<el-form-item label="应用下载详情页" style="line-height:20px" prop='creativeSource' class='currentWidth'>
								<el-cascader
								width='420'
								 expand-trigger="hover"
								 :options="options"
								 v-model="form.creativeClass"
								 @change="cascaderChange">
							 </el-cascader>
							</el-form-item>
						</div>
						<div style="position:relative">
							<el-form-item label="应用名" prop='creativeSource' class='currentWidth'>
								<el-input v-model="form.creativeSource" placeholder='请输入来源'></el-input>
							</el-form-item>
						</div>
						<div style="position:relative">
							<el-form-item label="副标题" class='currentWidth'>
								<el-input v-model="form.creativeSource" placeholder='请输入来源'></el-input>
							</el-form-item>
						</div>
						<div class="labelItem">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent">
									<div>广告评论</div>
									<div class="radiusSpot"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="form.adverDiscuss" size="medium">
									<el-radio-button label="1">不启用</el-radio-button>
								 	<el-radio-button label="2">启用</el-radio-button>
							 </el-radio-group>
							</div>
						</div>
						<div class="labelItem">
							<div class="left">
								<div class="startNone"></div>
								<div class="labelContent">
									<div>创意展现</div>
									<div class="radiusSpot"></div>
								</div>
							</div>
							<div class="right">
								<el-radio-group v-model="form.creativeOpen" size="medium">
									<el-radio-button label="1">优选模式</el-radio-button>
							 </el-radio-group>
							 <p style="margin-top:5px">
							 	选择优选模式，系统会自动对效果好的创意进行展示量倾斜，创意效果越好展示量越高
							</p>
							</div>
						</div>
						</div>
						<div class="throw_in_location">
							<div class="throw_in_label">设置创意分类和标签</div>
							<div class="labelItem" style="display:block">
								<div>
									<el-form-item label="创意分类" prop='creativeClass' class='currentWidth'>
										<el-cascader
										width='420'
										 expand-trigger="hover"
										 :options="options"
										 v-model="form.creativeClass"
										 @change="cascaderChange">
									 </el-cascader>
									</el-form-item>
								</div>
								<div>
									<el-form-item label="创意标签" prop='creativetags' class='currentWidth'>
										<el-input placeholder="请输入内容" @keyup.enter.native="addCreativeTag" v-model="form.creativetag">
									    <!-- <template slot="append">
												<div @click="addCreativeTag">
													添加(回车键)
												</div>
											</template> -->
											<template slot="append" >按回车键添加</template>
									  </el-input>
										<creatTags :backData='form.creativetags' @clearCreatTags='clearCreatTags'></creatTags>
									</el-form-item>
									<div>
									</div>
								</div>
							</div>
						</div>
						<div class="throw_in_location">
							<div class="throw_in_label">第三方监测链接</div>
							<div class="labelItem" style="display:block">
								<el-form-item label="展示" class='currentWidth'>
									<el-input v-model="form.creativeSource" placeholder='请输入展示链接'></el-input>
								</el-form-item>
								<el-form-item label="点击" class='currentWidth'>
									<el-input v-model="form.creativeSource" placeholder='请输入点击链接'></el-input>
								</el-form-item>
								<el-form-item label="视频播放" class='currentWidth'>
									<el-input v-model="form.creativeSource" placeholder='请输入视频播放链接'></el-input>
								</el-form-item>
								<el-form-item label="视频播完" class='currentWidth'>
									<el-input v-model="form.creativeSource" placeholder='请输入视频播完链接'></el-input>
								</el-form-item>
								<div class="height20">
									<el-form-item style="line-height:20px" label="视频有效播放" class='currentWidth'>
										<el-input v-model="form.creativeSource" placeholder='请输入视频有效播放链接'></el-input>
									</el-form-item>
								</div>
							</div>
						</div>
						<div class="throw_in_location">
							<div style="position:absolute;right:10px;top:20px">
								<el-button>取消</el-button>
								<el-button type="primary" @click="submitAction('form')">新建并关闭</el-button>
							</div>
						</div>
					</div>
				</div>
		</el-form>
			<el-dialog
			  title="添加创意"
			  :visible.sync="addCreatDialogVisible"
				@close='dialogCloseAction'
			  :width='addCreatDVWidth'>
			  <div class="dvBox">
			  	<div class="titleSpan">视频创意</div>
					<div class="adList">
						<addCreatType :backData='addCreativeDic[1]'></addCreatType>
						<addCreatType :backData='addCreativeDic[2]'></addCreatType>
					</div>
					<div class="titleSpan">图片创意</div>
					<div class="adList">
						<addCreatType :backData='addCreativeDic[0]'></addCreatType>
						<addCreatType :backData='addCreativeDic[3]'></addCreatType>
						<addCreatType :backData='addCreativeDic[4]'></addCreatType>
						<addCreatType :backData='addCreativeDic[5]'></addCreatType>
					</div>
			  </div>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="addCreatDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogSureAction">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import creatCheckbox from './creatCheckbox.vue'
import creatRadio from './creatRadio.vue'
import addCreatType from './addCreatType.vue'
import littleCreativItem from './littleCreativItem.vue'
import selfBigImgH from './creativeComp/selfBigImgH.vue'
import selfBigImgS from './creativeComp/selfBigImgS.vue'
import selfLittleImg from './creativeComp/selfLittleImg.vue'
import selfImgGroup from './creativeComp/selfImgGroup.vue'
import selfVideoH from './creativeComp/selfVideoH.vue'
import selfVideoS from './creativeComp/selfVideoS.vue'

import progBigImgH from './creativeComp/progBigImgH.vue'
import progBigImgS from './creativeComp/progBigImgS.vue'
import progLittleImg from './creativeComp/progLittleImg.vue'
import progVideoH from './creativeComp/progVideoH.vue'
import progVideoS from './creativeComp/progVideoS.vue'
import newData from './newCreative.js'
import creatTags from './creatTags.vue'
import { getCreativeTypeList } from "../../../api/admin";
export default {
	components: {
		creatCheckbox,
		creatRadio,
		addCreatType,
		littleCreativItem,
		selfBigImgH,selfBigImgS,selfLittleImg,selfImgGroup,selfVideoH,selfVideoS,
		progVideoH,progVideoS,progBigImgH,progBigImgS,progLittleImg,creatTags,
		leftBar: resolve => require(["@/components/leftBar.vue"], resolve),
	},
	data: function () {
		var validateSource = (rule, value, callback) => {
			let len = this.getStringLen(value)
				if (len<4||len>20) {
					callback(new Error('4至20个字符, 汉字占两个字符'));
				} else {
					callback();
				}
				// if(value.indexOf("https://itunes.apple.com") == -1) {
				// 	callback(new Error('输入appstore下载地址'));
				// } else {
				// }
			};
		return {
			adverLocation: '1',
		  addCreatDialogVisible: false,
		  screenWidth: '',
			// creatStyle: 1,
		  addCreatDVWidth: '',
			selectedAppName:['今日头条', '西瓜视频', '火山小视频', '抖音', '穿山甲'],
			locationSelectName: '信息流场景',
			addCreativeDic: newData.addCreativeDic,
			littleCreativeData: newData.littleCreativeData,
			isSureClose: false,
			options: [],
			cibaoArray:['地点','日期','星期','年龄'],
			form: {
				creativeSource: '',
				subjoinCreatStyle: 1,
				adverDiscuss: 2,
				creativeOpen: 1,
				creativeClass:[],
				creativetags:[],
				creativetag:'',
				cibaoArray: [{title:''}]
			},
			rulesForm: {
				creativeSource: [{
						required: true,
						validator: validateSource,
						trigger: 'change'
					}],
					creativeClass:[{
						required: true,
						message: '创意分类不能为空',
						trigger: 'blur'
					}],
					creativetags:[{
						required: true,
						message: '创意标签不能为空',
						trigger: 'blur'
					}],
			}
			// makeSeftCreativeArray:this.$store.state.creative.selfCreativeArray,
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
	      let arr = [arr1[0],arr1[4],arr1[5],]
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
	      let arr = [arr1[1],arr1[2]]
	      let allNumber = 0;
	      for (var i = 0; i < arr.length; i++) {
	        let arrItem = arr[i];
	        allNumber += arrItem.length;
	      }
				return allNumber
			}
		},
		creatStyle: {
			get () {
				return this.$store.state.creative.creatStyle
			},
			set (val) {
			  this.$store.commit('setCreatStyle', val)
			}
		},
		makeSeftCreativeArray: {
		    get () {
		      return this.$store.state.creative.selfCreativeArray
		    },
		 },
		progCreativeArray: {
 		    get () {
 		      return this.$store.state.creative.progCreativeArray
 		    },
 		 },
	},
	watch: {
		screenWidth:function(val) {
			if (val >= 992) {
				this.addCreatDVWidth = '900px'
			} else if (val >= 768) {
				this.addCreatDVWidth = '600px'
			}
		},
		makeSeftCreativeArray:function(val) {
			console.log(val);
			this.$store.commit('setSelfCreativeArray',val);
		},
		progCreativeArray:function(val) {
			console.log(val);
			this.$store.commit('setProgCreativeArray',val);
		},
		creatStyle:function(val) {
			this.creatStyleChangeAction(val)
			this.addCreativeDic.forEach(item=>item.hasWarning=false)
			this.littleCreativeData.forEach(item=>item.hasWarning=false)
		},
		adverLocation:function(val) {
			if (val == 3) {
				if (this.locationSelectName != '视频后贴和尾帧场景' && this.creatStyle == 2) {
					this.disableIdAction([4])
				} else if (this.locationSelectName == '视频后贴和尾帧场景' && this.creatStyle != 2) {
					this.disableIdAction([3])
				} else if (this.locationSelectName == '视频后贴和尾帧场景' && this.creatStyle == 2) {
					this.disableIdAction([3,4])
				} else {
					this.addCreativeDic.forEach(item=> {
						item.checked = true
						item.disabled = false
					})
				}
			} else {
				if (this.creatStyle == 2) {
					this.disableIdAction([4])
				} else {
					this.addCreativeDic.forEach(item=> {
						item.checked = true
						item.disabled = false
					})
				}
			}
			let obj = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.littleCreativeData = obj
			this.initCurrentShowCreative();
		}
	},
	mounted() {
		this.initWidth()
		this.creatStyleChangeAction(this.creatStyle)
		let _this = this;
		getCreativeTypeList().then(data=> {
			_this.options = data.data
		})
	},
	methods: {
		initWidth(){  //获取高度
      //获取浏览器可视区域高度
      this.screenWidth = document.documentElement.clientWidth;
      // console.log($(document).height());//浏览器可视区域对象宽度
      window.onresize = () => {  //当窗口或框架发生改变时触发
      //console.log("onresize进来了");
        this.screenWidth = document.documentElement.clientWidth;
      };
		},
		// 添加创意标题按钮
		addCreativeTitle() {
			let obj = {title: ''}
			this.form.cibaoArray.push(obj)
		},
		// 删除创意标题
		deleteCreativeTitle(index) {
			if (this.form.cibaoArray.length <= 1) {
				return ;
			}
			this.form.cibaoArray.splice(index,1)
		},
		creatStyleChangeAction(val) {
			if (val == 2 && this.locationSelectName != '视频后贴和尾帧场景') {
				this.disableIdAction([4])
			} else if (val == 2 && this.locationSelectName == '视频后贴和尾帧场景') {
				this.disableIdAction([3,4])
			} else {
				if (this.locationSelectName == '视频后贴和尾帧场景') {
					this.disableIdAction([3])
				} else {
					this.addCreativeDic.forEach(item=> {
						item.checked = true
						item.disabled = false
					})
				}
			}
			let obj = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.littleCreativeData = obj
			this.initCurrentShowCreative();
		},
		getStringLen(str) {
			var len = 0;
			for (var i = 0; i < str.length; i++) {
				str.charCodeAt(i) > 255 ? len += 2 : len += 1;
			}
			return len;
		},
		// app名称多选框change事件
		checkBoxChangAction(val) {
			this.selectedAppName = val
		},
		// 单选框位置选择change事件
		loactionRadioChangeAction(val) {
			this.locationSelectName = val.label
			if (val.id == 3 && this.creatStyle != 2) {
				this.disableIdAction([3])
			} else if (val.id == 3 && this.creatStyle == 2) {
				this.disableIdAction([3,4])
			} else {
				if (this.creatStyle == 2) {
					this.disableIdAction([4])
				} else {
					this.addCreativeDic.forEach(item=> {
						item.checked = true
						item.disabled = false
					})
				}
			}
			let obj = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.littleCreativeData = obj
		},
		disableIdAction(ids) {
			let _this = this
			this.addCreativeDic.forEach(item=> {
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
		clickLittleCreative(val) {
			let obj = this.littleCreativeData
			for (let model of obj) {
				model.currentShow = false
			}
			val.currentShow = true
		},
		// 点击小图关闭按钮
		clickLittleCloseItem(val) {
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
					 _this.$nextTick(function() {
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
		dialogCloseAction() {
			if (this.isSureClose) {
				this.isSureClose = false
				return;
			}
			let obj = JSON.parse(JSON.stringify(this.littleCreativeData))
			this.addCreativeDic = obj
		},
		// 弹框确定按钮方法
		dialogSureAction() {
			this.addCreatDialogVisible = false
			this.isSureClose = true
			this.littleCreativeData = JSON.parse(JSON.stringify(this.addCreativeDic))
			this.initCurrentShowCreative();
		},
		// 重置当前显示创意
		initCurrentShowCreative() {
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
				 _this.$nextTick(function() {
					 item.currentShow = true
					 let obj = JSON.parse(JSON.stringify(_this.littleCreativeData))
					 _this.addCreativeDic = obj
				 })
				}
			}
		},
		cascaderChange(val) {
			console.log(val);
		},
		addCreativeTag(val) {
			if (this.form.creativetag == '' || this.form.creativetags.includes(this.form.creativetag)) {
				this.form.creativetag=''
				return;
			}
			this.form.creativetags.push(this.form.creativetag)
			this.form.creativetag = ''
		},
		clearCreatTags() {
			this.form.creativetags = []
		},
		submitAction(formName) {
			let _this = this;
			let dialogObj = {
				creatStyle: this.creatStyle,
				makeSeftCreativeArray: this.makeSeftCreativeArray,
				progCreativeArray: this.progCreativeArray,
				addCreativeDic: this.addCreativeDic,
				littleCreativeData: this.littleCreativeData,
			}
			console.log(this.submitCreative(dialogObj));

			_this.$refs[formName].validate((valid) => {
				if(valid) {
				}
			})

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
	// min-width: 1130px;
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
	.tipDiv  {
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
	position: absolute;
  left: 100%;
  top: 50%;
	padding-left: 50px;
	margin-top: -5px;
  transform: translate(-50%,-50%)
}
</style>
