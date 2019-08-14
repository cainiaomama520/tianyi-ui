<template>
	<!-- 弹窗选择转化目标 -->
	<el-dialog
		title="广告创意"
		:visible.sync="extendVisible"
		@open="open"
		width="1000px"
		class="creat-show"
		@close="close"
	>
		<el-row :gutter="20" class="preview-tr" v-if="creatDetail">
			<el-col :span="7">
				<div style="background: #fff;">
					<div style="padding: 15px 22px 14px;">创意
						<el-badge v-if="list.length!=0" :value="list.length" type="info" class="item"></el-badge>
						<p class="fr" v-if="list.length!=0">
							<span class="link" @click="toCreat">修改</span>
							<span class="link" @click="toCreatList">创意列表</span>
						</p>
					</div>
					<div v-if="list.length==0" style="padding: 20px;">
						当前计划下无创意，点击这里
						<span class="link" @click="toCreat">新建</span>
					</div>
					<el-carousel v-else :autoplay="false" arrow="always" height="188px" style="padding:0 20px">
						<el-carousel-item v-for="item in list" :key="item.creativeId">
							<div class="preview" v-if="item.imageMode=='image'">
								<div v-for="img in item.images" :key="img.imageId">
									<h3>{{ item.title }}</h3>
									<img v-if="img.imageUrl" :src="img.imageUrl">
								</div>
							</div>
							<div class="preview" v-else-if="item.imageMode=='video'">
								<a :href="'https://cc.toutiao.com/v/video_player?code='+item.video.videoId" target="_blank" class="play-btn"><img  src="/static/images/play.png"/></a>
								<h3>{{ item.title }}</h3>
								<img v-if="item.video.imageUrl" :src="item.video.imageUrl">
							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</el-col>
			<el-col :span="17">
				<div class="ad-panel">
					<div class="panel-header">
						广告计划详情
						<span class="fr link" @click="changePlan">修改</span>
					</div>
					<div class="panel-body" v-if="creatDetail.adInfo">
						<el-col :span="12">
							<ul>
								<li>
									<i></i>
									广告ID:{{creatDetail.adId}}
								</li>
								<li>
									<i></i>
									下载链接:
									<a v-if="creatDetail.adInfo.download_url" class="link" :href="creatDetail.adInfo.download_url" target="_blank">{{creatDetail.adInfo.download_url}}</a>
									<a v-else :href="creatDetail.adInfo.external_url" class="link" target="_blank">{{creatDetail.adInfo.external_url}}</a>
								</li>
								<li v-if="creatDetail.adInfo.audience.platform">
									<i></i> 平台:
									<span v-if="creatDetail.adInfo.audience.platform.length==0">不限</span>
									<span v-else>
										<span v-for="item in creatDetail.adInfo.audience.platform" :key="item">{{item+','}}</span>
									</span>
								</li>
								<!-- <li>
									<i></i> 地域:1621699512630296
								</li> -->
								<li>
									<i></i> 性别: 
									<span>{{creatDetail.adInfo.audience.gender=='GENDER_MALE'?'男':creatDetail.adInfo.audience.gender=='NONE'?'不限':'女'}}</span>
								</li>
								<li>
									<i></i>年龄:
									<span v-if="creatDetail.adInfo.audience.age.length==0">不限</span>
									<span v-else>
										<span v-for="item in creatDetail.adInfo.audience.age" :key="item">{{filterAge(item)+','}}</span>
									</span>
								</li>
							</ul>
						</el-col>
						<el-col :span="12">
							<ul>
								<li>
									<i></i> 手机品牌:
									<span v-if="creatDetail.adInfo.audience.device_brand.length==0">不限</span>
									<span v-else>
										<span v-for="item in phone" :key="item">{{item+','}}</span>
									</span>
								</li>
								<li>
									<i></i> 运营商:
									<span v-if="creatDetail.adInfo.audience.ac.length==0">不限</span>
									<span v-else>
										<span v-for="item in creatDetail.adInfo.audience.ac" :key="item">{{item}}</span>
									</span>
								</li>
							</ul>
						</el-col>
					</div>
				</div>
			</el-col>
		</el-row>
	</el-dialog>
</template>
<script>
import { planCreative } from '@/api/admin.js'
import {phoneType} from '@/common/json/ad_tag.json'
export default {
	data () {
		return {
			extendVisible: this.value,
			creat: {
				list: [{ title: '{地点}{日期}', src: 'https://sf1-ttcdn-tos.pstatp.com/obj/mosaic-legacy/16b21000b100cf8559bb8' }]
			},
			list: [],
			creatType:'',
			phonnType:phoneType,
			phone:[]
		};
	},
	props: {
		value: {
			type: Boolean,
			default: false,
			required: false
		},
		creatDetail: {
			type: Object,
			required: false
		}
	},
	methods: {
		close () {
			this.$emit("input", false);
		},
		open () {
			this.getCreat();
			this.filterPhone()

		},
		getCreat () {
			planCreative({ adverId: this.creatDetail.adverid, adId: this.creatDetail.adId }).then(res => {
				this.list = res.data.creatives;
				this.creatType=res.data.creatType;
			})
		},
		toCreat () {
			let routeData = this.$router.resolve({
				path: '/operate/newCreat/new-creat',
				query: {
					adId: this.creatDetail.adId,
					landing_type: this.creatDetail.landing_type,
					planName: this.creatDetail.name,
					APPType:this.creatDetail.adInfo.app_type
				}
			})
			window.open(routeData.href, '_blank')
		},
		changePlan(){
			let routeData = this.$router.resolve({
				path: '/operate/newPlan/new-plan',
				query: {
					adId: this.creatDetail.id,
					landing_type: this.creatDetail.landing_type,
					campaign_name: this.creatDetail.campaignName
				}
			})
			window.open(routeData.href, '_blank')
		},
		toCreatList(){
			this.$store.commit("changeCreat", false);
			this.$store.commit("changeActive", "creative");
			this.$store.commit("getCreativeId", this.creatDetail.id);
			this.$store.commit("getCampaignId", "");
		},
		filterPhone(){
			console.log(phoneType)
			let arr =[]
			this.creatDetail.adInfo.audience.device_brand.map(element => {
				this.phonnType.filter(val=>{
					if(element==val.value){
						arr.push(val.label)
						console.log(val.label)
					}
				})
			})
			this.phone=arr;
		},
		filterAge(val){
			switch(val){
				case 'AGE_BELOW_18':
				return '<18';
				break;
				case 'AGE_BETWEEN_18_23':
				return '18-23';
				break;
				case 'AGE_BETWEEN_24_30':
				return '24-30';
				break;
				case 'AGE_BETWEEN_31_40':
				return '31-40';
				break;
				case 'AGE_BETWEEN_41_49':
				return '41-49';
				break;
				case 'AGE_ABOVE_50':
				return '50+';
				break;	
				default:
				return '不限'		
			}
		}
	},
	watch: {
		value: function (val) {
			this.extendVisible = val;
		}
	}
};
</script>
<style>
.creat-show .el-dialog__body {
	padding: 20px 10px 0;
}
.preview-tr {
	background: #f3f3f3;
	font-size: 12px;
	padding: 20px 0;
}
.preview {
	background-color: #fff;
	border: 1px solid #e8e8e8;
	padding: 5px;
	border-radius: 4px;
	color: #333;
	position: relative;
}
.preview h3 {
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	overflow: hidden;
	position: relative;
	word-break: break-all;
	text-align: center;
}
.preview img {
	display: block;
	width: 100%;
	height: 100%;
}
.ad-panel {
	background: #fff;
	overflow: hidden;
	min-height: 230px;
	padding: 8px 20px 0;
}
.ad-panel .panel-header {
	border-bottom: 1px solid #e8e8e8;
	padding: 10px;
	margin-bottom: 10px;
}
.ad-panel .panel-body {
	padding: 5px 5px 0;
	color: #999;
}
.ad-panel .panel-body ul li {
	margin-bottom: 5px;
	list-style-type: none;
	line-height: 18px;
	align-items: center;
	text-overflow: ellipsis;
    overflow: hidden;
}
.ad-panel .panel-body ul li i {
	width: 5px;
	margin-right: 5px;
	height: 5px;
	border-radius: 50%;
	background: #ccc;
	display: inline-block;
	vertical-align: middle;
}
.creat-show .el-carousel__container {
	position: relative;
}
.el-carousel__button{
	border-radius: 50%;
	width: 6px;
    height: 6px;
}
</style>

