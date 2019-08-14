<template>
	<div>
		<div class="creativeBoy" v-show="backData.length>0">
			<div class="header">
				<div class="tableList">
					<div class="tableItemBox" v-for="(item,index) in backData" @click="changeItemAction(index)">
						<div :class="item.active?'tableItem active':'tableItem'">
							创意{{index+1}}
							<i v-show="item.hasWarning" class="el-icon-warning warningIcon"></i>
							<i @click.stop="closeAction(index)" class="el-icon-close icon"></i>
						</div>
					</div>
				</div>
				<div class="bottonBox">
					<el-button type="primary" @click="addActiveAction" icon="el-icon-circle-plus">添加创意</el-button>
				</div>
			</div>
			<div class="creativeBodyBox">
				<div class="content">
					<div class="labelItem">
						<div class="left" style="min-width:80px">
							<div class="startNone"></div>
							<div class="labelContent">
								<div>创意方式</div>
								<!-- <div class="radiusSpot"></div> -->
							</div>
						</div>
						<div class="right">
							<div style="display:inline-block">
								<el-upload
									class="avatar-uploader"
									ref="upload"
									:headers="myHeaders"
									:data="myDataVideo"
									:action="this.creativeVideoUrl"
									:show-file-list="false"
									:on-success="handleAvatarSuccessVideo"
									:before-upload="beforeAvatarUploadVideo"
									:on-progress="uploadVideoProcess"
									:on-error="uploadVideoError"
								>
									<video
										ref="selfVideoH"
										v-show="currentModel.video"
										:src="currentModel.video"
										class="avatar"
										controls="controls"
									>您的浏览器不支持视频播放</video>
									<i
										v-show="!currentModel.video"
										style="color:#598fe6"
										class="el-icon-upload avatar-uploader-icon"
									>上传视频</i>
									<div class="progressDiv" v-if="videoFlag">
										<el-progress
											class="progressC"
											style="left:26%;top:11%"
											type="circle"
											color="green"
											:percentage="videoUploadPercent"
										></el-progress>
									</div>
								</el-upload>
								<div class="tipDiv" style="width:257px">宽高比16:9,视频码率≥516kbps,大小≤1000M,分辨率≥1280*720</div>
							</div>

							<div style="display:inline-block">
								<el-upload
									class="avatar-uploader"
									:action="this.creativeImgUrl"
									:headers="myHeaders"
									:data="myDataImg"
									:show-file-list="false"
									:on-success="handleAvatarSuccess"
									:before-upload="beforeAvatarUpload"
									:on-progress="uploadImgProcess"
								>
									<img v-if="currentModel.url" :src="currentModel.url" class="avatar">
									<i v-else style="color:#598fe6" class="el-icon-upload avatar-uploader-icon">上传图片</i>
									<div class="progressDiv" v-if="imgFlag">
										<el-progress
											class="progressC"
											style="left:120%;top:11%"
											type="circle"
											color="green"
											:percentage="imgUploadPercent"
										></el-progress>
									</div>
								</el-upload>
								<div class="tipDiv">宽高比16:9,大小≤1.5M,1280*720≤尺寸≤2560*1440,支持JPG、PNG等图片格式</div>
							</div>
						</div>
					</div>
					<!-- 创意标题 -->
					<creative-title
						v-model="currentModel.title"
						@getWordIds="getWordIds"
						:titleLength="currentModel.titleLength"
						:titleId="'selfVideoH'"
					></creative-title>
				</div>
			</div>
		</div>
		<div class="bodyEmpty" v-show="backData.length==0">
			<div class="noneS">
				<div class>
					<div class="imgBox">
						<img
							src="http://s1.pstatp.com/bytecom/platform_web/static/image/none.png?a3cb5445c2ca37cfe3ca7caf16c66364"
							alt
						>
					</div>
					<p>请为横版视频</p>
					<el-button
						style="margin-left:8px;"
						@click="addActiveAction"
						type="primary"
						icon="el-icon-circle-plus"
					>添加创意</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getToken,
} from '@/utils/auth'
import { getCBWordsLength } from "../../../../api/admin";
export default {
	components: {
		'creative-title': resolve => require(['../creativeTitle.vue'], resolve)
	},
	props: ['backData'],
	data () {
		return {
			imgFlag: false,
			videoFlag: false,
			imgUploadPercent: 0,
			videoUploadPercent: 0,
			myHeaders: { token: getToken('token') },
			myDataVideo: { advertiser_id: this.$store.state.titlemess.advId, image_mode: 5 },
			myDataImg: { advertiser_id: this.$store.state.titlemess.advId, image_mode: 1 },
			title: '',
			videoFileLeng: 0,
			currentModel: {
				video: '',
				videoId: '',
				url: '',
				urlId: '',
				title: '',
				wordIds: [],
				titleLength: 0,
				hasWarning: false,
				active: false
			},
			model: {
				video: '',
				url: '',
				videoId: '',
				urlId: '',
				title: '',
				wordIds: [],
				titleLength: 0,
				hasWarning: false,
				active: false
			},
		};
	},
	watch: {
		// 'currentModel.title':function(val) {
		//   let str = '?advertiserId='+this.$store.state.titlemess.advId+'&title='+encodeURI(val)
		//   getCBWordsLength(str).then(res=> {
		//     this.currentModel.wordIds = res.data.creative_word_ids;
		//     this.currentModel.titleLength = res.data.length || 0
		//     this.saveData()
		//   })
		// },
		'currentModel.titleLength': function (val) {
			if (val < 6 || val > 25) {
				this.currentModel.hasWarning = true
				this.$emit('wordsLengthWarning', this.backData, true)
			} else {
				this.currentModel.hasWarning = false
				this.$emit('wordsLengthWarning', this.backData, false)
			}
		},
		'currentModel.url': function (val) {
			this.saveData()
		},
		'currentModel.video': function (val) {
			this.saveData()
		},
		'currentModel.active': function (val) {
			this.saveData()
		}
	},
	mounted () {
		if (this.backData.length > 0) {
			let _this = this;
			this.backData.forEach((item, index) => {
				let str = '?advertiserId=' + this.$store.state.titlemess.advId + '&title=' + encodeURI(item.title)
				getCBWordsLength(str).then(res => {
					item.wordIds = res.data.creative_word_ids;
					item.titleLength = res.data.length || 0
					this.$set(this.backData, index, item)
				})
				if (item.active) {
					_this.currentModel = item
				}
			})
		}
		console.log(this.backData);
	},
	methods: {
		getWordIds (val) {
			//   获取动态词包的id
			this.currentModel.wordIds = val.creative_word_ids;
			this.currentModel.titleLength = val.length;
			this.saveData()
		},
		addActiveAction () {
			if (this.imgFlag || this.videoFlag) {
				return;
			}
			let arr = this.$store.state.creative.selfCreativeArray;
			let allNumber = 0;
			for (var i = 0; i < arr.length; i++) {
				let arrItem = arr[i];
				allNumber += arrItem.length;
			}
			if (allNumber >= 10) {
				this.$message.error('创意已达上限');
				return;
			}
			this.backData.forEach(item => item.active = false)
			let obj = JSON.parse(JSON.stringify(this.model));
			obj.active = true
			this.backData.push(obj);
			this.currentModel = obj;
		},
		// 关闭
		closeAction (index) {
			let item = this.backData[index];
			if (item.active) {
				this.backData.splice(index, 1);
				if (this.backData.length > 0) {
					this.backData[0].active = true
					this.currentModel = this.backData[0]
				}
			} else {
				this.backData.splice(index, 1);
			}
		},
		// 切换创意
		changeItemAction (index) {
			if (this.imgFlag || this.videoFlag) {
				return;
			}
			let item = this.backData[index];
			if (!item.active) {
				this.backData.forEach(itemC => itemC.active = false)
				item.active = true
				this.currentModel = item
			}
		},
		uploadVideoError (res, file) {
			this.videoFlag = false;
			this.videoUploadPercent = 0;
			this.$message.error('上传视频错误')
		},
		handleAvatarSuccessVideo (res, file) {
			this.videoFlag = false;
			this.videoUploadPercent = 0;
			if (res.msg == 'success') {
				this.currentModel.video = res.data.url
				this.currentModel.videoId = res.data.id
				let _this = this
				this.$nextTick(() => {
					var vdo = _this.$refs.selfVideoH
					vdo.load();
					vdo.oncanplay = function () {
						console.log('---', vdo);
						let hw = vdo.videoWidth / vdo.videoHeight;
						let bitRate = _this.videoFileLeng * 8 / (vdo.duration * 1000)
						if (hw != 16 / 9 || vdo.videoWidth < 1280 || bitRate < 516) {
							_this.currentModel.video = ''
							_this.currentModel.videoId = ''
							_this.$message.error('上传视频不符合要求')
						} else {
							_this.$message.success('视频上传成功')
						}
					}
				})
				console.log(this.backData);
			}
			else {
				this.$message.error('视频上传失败')
			}
		},
		handleAvatarSuccess (res, file) {
			this.imgFlag = false;
			this.imgUploadPercent = 0;
			if (res.msg == 'success') {
				this.currentModel.url = res.data.url
				this.currentModel.urlId = res.data.id
				this.$message.success('图片上传成功')
				console.log(this.backData);
			}
			else {
				this.$message.error('图片上传失败')
			}
		},
		uploadImgProcess (event, file, fileList) {
			this.imgFlag = true;
			this.imgUploadPercent = Number(file.percentage.toFixed(0));
		},
		uploadVideoProcess (event, file, fileList) {
			this.videoFlag = true;
			this.videoUploadPercent = Number(file.percentage.toFixed(0));
		},
		beforeAvatarUploadVideo (file) {
			this.videoFileLeng = file.size;
			const isLt1000M = file.size / 1024 / 1024 <= 1000;
			if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
				this.$message.error('请上传正确的视频格式');
				return false;
			}
			if (!isLt1000M) {
				this.$message.error('上传视频大小不能超过1000MB哦!');
				return false;
			}
		},
		beforeAvatarUpload (file) {
			const isJPG = (file.type === 'image/png') || (file.type === 'image/jpeg');
			const isLt2M = file.size / 1024 / 1024 <= 1.5;

			var v = this;
			return new Promise(function (resolve, reject) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var data = e.target.result;
					//加载图片获取图片真实宽度和高度
					var image = new Image();
					image.onload = function () {
						var width = image.width;
						var height = image.height;
						var result = (width >= 1280 && width <= 2560 && (width / height == 16 / 9))
						if (isJPG && isLt2M && result) {
							resolve(isLt2M && result);
						} else {
							if (!result) {
								v.$message.error('上传图片尺寸不符合要求！');
							}
							if (!isJPG) {
								v.$message.error('上传图片只能是 JPG/PNG 格式!');
							}
							if (!isLt2M) {
								v.$message.error('上传图片大小不能超过 1.5M!');
							}
							reject('图片尺寸不对')
						}
					};
					image.src = data;
				};
				reader.readAsDataURL(file);
			})
		},
		saveData () {
			for (var i = 0; i < this.backData.length; i++) {
				let item = this.backData[i]
				// item.hasWarning = false
				if (item.active) {
					this.$set(this.backData, i, this.currentModel)
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.avatar-uploader {
	display: inline-block;
	padding-right: 5px;
	// padding-bottom: 10px;
}
.avatar-uploader-icon {
	background-color: #fff;
	border: 1px dashed #dee4f5;
	font-size: 16px;
	color: #8c939d;
	width: 257px;
	height: 144px;
	line-height: 144px;
	text-align: center;
}

.avatar {
	width: 257px;
	height: 144px;
	display: block;
}
</style>
