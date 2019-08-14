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
							<el-upload
								class="avatar-uploader"
								:action="this.creativeImgUrl"
								:headers="myHeaders"
								:data="myData"
								:show-file-list="false"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload"
								:on-progress="uploadVideoProcess"
							>
								<img v-if="currentModel.url" :src="currentModel.url" class="avatar">
								<i v-else style="color:#598fe6" class="el-icon-upload avatar-uploader-icon">上传图片</i>
								<div class="progressDiv" v-if="imgFlag">
									<el-progress
										class="progressC"
										style="left:25%"
										type="circle"
										color="green"
										:percentage="videoUploadPercent"
									></el-progress>
								</div>
							</el-upload>
							<div class="tipDiv">宽高比1.52,大小≤1.5M,456*300≤尺寸≤1368*900,支持JPG、PNG等图片格式</div>
						</div>
					</div>
					<creative-title
						v-model="currentModel.title"
						@getWordIds="getWordIds"
						:titleLength="currentModel.titleLength"
						:titleId="'selfImgLittle'"
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
					<p>请为小图</p>
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
		insertCB: resolve => require(["../insertCB.vue"], resolve),
		'creative-title': resolve => require(['../creativeTitle.vue'], resolve)
	},
	props: ['backData'],
	data () {
		return {
			imgFlag: false,
			videoUploadPercent: 0,
			myHeaders: { token: getToken('token') },
			myData: { advertiser_id: this.$store.state.titlemess.advId, image_mode: 2 },
			title: '',
			currentModel: {
				url: '',
				id: '',
				title: '',
				wordIds: [],
				titleLength: 0,
				hasWarning: false,
				active: false
			},
			model: {
				url: '',
				id: '',
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
			if (this.imgFlag) {
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
			if (this.imgFlag) {
				return;
			}
			let item = this.backData[index];
			if (!item.active) {
				this.backData.forEach(itemC => itemC.active = false)
				item.active = true
				this.currentModel = item
			}
		},
		handleAvatarSuccess (res, file) {
			this.imgFlag = false;
			this.videoUploadPercent = 0;
			if (res.msg == 'success') {
				this.currentModel.url = res.data.url
				this.currentModel.id = res.data.id
				this.$message.success('图片上传成功')
			}
			else {
				this.$message.error('图片上传失败')
			}
		},
		uploadVideoProcess (event, file, fileList) {
			this.imgFlag = true;
			this.videoUploadPercent = Number(file.percentage.toFixed(0));
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
						var result = (width >= 456 && width <= 1368 && (width / height == 1.52))
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
.avatar-uploader-icon {
	background-color: #fff;
	border: 1px dashed #dee4f5;
	font-size: 16px;
	color: #8c939d;
	width: 242px;
	height: 159px;
	line-height: 159px;
	text-align: center;
}

.avatar {
	width: 242px;
	height: 159px;
	display: block;
}
</style>
