<template>
	<div>
		<div class="creativeBoy" v-show="backData.length>0">
			<div class="progCreativeBody">
				<div class="addActiveButton">
					<el-button @click="addActiveAction" type="primary" icon="el-icon-circle-plus">添加素材</el-button>
				</div>
				<div
					class="progItem"
					v-for="(item,index) in backData"
					@click="clickAction(index)"
					style="width:calc(50% - 24px)"
				>
					<div class="icon-box">
						<i class="el-icon-circle-close" @click.stop="closeAction(index)"></i>
					</div>
					<div class="display:inline-block">
						<div style="display:inline-block;margin-right:10px">
							<el-upload
								class="avatar-uploader"
								:disabled="currentIndex!=index"
								ref="upload"
								:headers="myHeaders"
								:data="myDataVideo"
								:action="videoAction"
								:show-file-list="false"
								:on-success="handleAvatarSuccessVideo"
								:before-upload="beforeAvatarUploadVideo"
								:on-progress="uploadVideoProcess"
								:on-error="uploadVideoError"
							>
								<video
									ref="progVideoH"
									v-show="item.video"
									:src="item.video"
									class="avatar"
									controls="controls"
								>您的浏览器不支持视频播放</video>
								<i
									v-show="!item.video"
									style="color:#598fe6"
									class="el-icon-upload avatar-uploader-icon"
								>上传视频</i>
								<div class="progressDiv" v-if="videoFlag && currentIndex==index">
									<el-progress
										class="progressC"
										style="left:19%;top:13%"
										type="circle"
										color="green"
										:percentage="videoUploadPercent"
									></el-progress>
								</div>
							</el-upload>
							<div
								class="tipDiv"
								style="width:184px;display:inline-block;margin-top:10px"
							>宽高比16:9,视频码率≥516kbps,大小≤1000M,分辨率≥1280*720 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
						</div>
						<div style="display:inline-block">
							<el-upload
								class="avatar-uploader"
								:action="imgAction"
								:disabled="currentIndex!=index"
								:headers="myHeaders"
								:data="myDataImg"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
								:on-progress="uploadImgProcess"
							>
								<img v-if="item.url" :src="item.url" class="avatar">
								<i v-else style="color:#598fe6" class="el-icon-upload avatar-uploader-icon">上传图片</i>
								<div class="progressDiv" v-if="imgFlag && currentIndex==index">
									<el-progress
										class="progressC"
										style="left:89%;top:13%"
										type="circle"
										color="green"
										:percentage="imgUploadPercent"
									></el-progress>
								</div>
							</el-upload>
							<div
								class="tipDiv"
								style="width:184px;display:inline-block;margin-top:10px"
							>宽高比16:9,大小≤1.5M,1280*720≤尺寸≤2560*1440,支持JPG、PNG等图片格式</div>
						</div>
					</div>
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
export default {
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
			cibaoArray: ['地点', '日期', '星期', '年龄'],
			currentIndex: 0,
			videoFileLeng: 0,
			model: {
				video: '',
				videoId: '',
				url: '',
				urlId: ''
			}
		};
	},
	computed: {
		imgAction () {
			return this.creativeImgUrl;
		},
		videoAction () {
			return this.creativeVideoUrl;
		}
	},
	watch: {
	},
	mounted () {
	},
	methods: {
		clickAction (index) {
			console.log(index);
			if (!this.videoFlag && !this.imgFlag) {
				this.currentIndex = index
			}
		},
		closeAction (index) {
			this.backData.splice(index, 1);
		},
		addActiveAction () {
			let arr1 = this.$store.state.creative.progCreativeArray;
			let arr = [arr1[1], arr1[2]]
			let allNumber = 0;
			for (var i = 0; i < arr.length; i++) {
				let arrItem = arr[i];
				allNumber += arrItem.length;
			}
			if (allNumber >= 6) {
				this.$message.error('创意已达上限');
				return;
			}
			let obj = JSON.parse(JSON.stringify(this.model));
			this.backData.push(obj);
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
				let item = this.backData[this.currentIndex];
				item.video = res.data.url
				item.videoId = res.data.id
				item.hasWarning = false
				let _this = this
				this.$nextTick(() => {
					let vdo = _this.$refs.progVideoH[this.currentIndex];
					vdo.load();
					vdo.oncanplay = function () {
						console.log('---', vdo);
						let hw = vdo.videoWidth / vdo.videoHeight;
						let bitRate = _this.videoFileLeng * 8 / (vdo.duration * 1000)
						if (hw != 16 / 9 || vdo.videoWidth < 1280 || bitRate < 516) {
							item.video = ''
							item.videoId = ''
							_this.$message.error('上传视频不符合要求')
						} else {
							_this.$message.success('视频上传成功')
						}
						_this.$set(_this.backData, _this.currentIndex, item)
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
				let item = this.backData[this.currentIndex];
				item.url = res.data.url
				item.urlId = res.data.id
				item.hasWarning = false
				this.$set(this.backData, this.currentIndex, item)
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
		}
	}
}
</script>

<style lang="scss" scoped>
.avatar-uploader-icon {
	background-color: #fff;
	border: 1px dashed #dee4f5;
	font-size: 16px;
	color: #8c939d;
	width: 182px;
	height: 103px;
	line-height: 103px;
	text-align: center;
}

.avatar {
	width: 182px;
	height: 103px;
	display: block;
}
</style>
