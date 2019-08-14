<template>
  <div>
    <div class="creativeBoy" v-show='backData.length>0'>
      <div class="progCreativeBody">
        <div class="addActiveButton">
          <el-button @click='addActiveAction' type="primary" icon="el-icon-circle-plus">添加素材</el-button>
        </div>
        <div class="progItem" v-for='(item,index) in backData' @click='clickAction(index)' style="width:calc(33.3333% - 24px)">
          <div class="icon-box">
            <i class="el-icon-circle-close" @click.stop='closeAction(index)'></i>
          </div>
          <div class="display:inline-block">
            <el-upload
              class="avatar-uploader"
              :action="imgAction"
              :disabled='currentIndex!=index'
              :headers="myHeaders"
              :data= "myData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-progress="uploadVideoProcess">
              <img v-if="item.url" :src="item.url" class="avatar">
              <i v-else style="color:#598fe6" class="el-icon-upload avatar-uploader-icon">上传图片</i>
              <div class="progressDiv" v-if="imgFlag && index == currentIndex">
                <el-progress class="progressC" style="top:30%;left:27%" type="circle" color="green" :percentage="videoUploadPercent"></el-progress>
              </div>
            </el-upload>
            <div class="tipDiv" style="width:184px;display:inline-block;margin-top:10px">
              宽高比16:9,大小≤1.5M,1280*720≤尺寸≤2560*1440,支持JPG、PNG等图片格式
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bodyEmpty" v-show='backData.length==0'>
      <div class="noneS">
        <div class="">
          <div class="imgBox">
            <img src="http://s1.pstatp.com/bytecom/platform_web/static/image/none.png?a3cb5445c2ca37cfe3ca7caf16c66364" alt="">
          </div>
            <p>请为大图横图</p>
            <el-button style="margin-left:8px;" @click='addActiveAction' type="primary" icon="el-icon-circle-plus">添加创意</el-button>
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
  props:['backData'],
  data() {
    return {
      imgFlag: false,
      videoUploadPercent: 0,
      myHeaders: {token:getToken('token')},
      myData: {advertiser_id:this.$store.state.titlemess.advId,image_mode:1},
      title: '',
      cibaoArray:['地点','日期','星期','年龄'],
      currentIndex:0,
      currentModel: {
        url:'',
        id: '',
      },
      model:{
        url:'',
        id: '',
      },
    };
  },
  computed: {
    imgAction() {
      return this.creativeImgUrl;
    }
  },
  watch: {
    'currentModel.url':function(val) {
      this.saveData()
    },
  },
  mounted() {
  },
  methods: {
    clickAction(index) {
      // console.log(index);
      if (!this.imgFlag) {
        this.currentIndex = index
        this.currentModel = this.backData[index];
      }
    },
    closeAction(index) {
      this.backData.splice(index,1);
    },
    addActiveAction() {
      let arr1 = this.$store.state.creative.progCreativeArray;
      let arr = [arr1[0],arr1[4],arr1[5],]
      let allNumber = 0;
      for (var i = 0; i < arr.length; i++) {
        let arrItem = arr[i];
        allNumber += arrItem.length;
      }
      if (allNumber >= 12) {
        this.$message.error('创意已达上限');
        return ;
      }
      let obj = JSON.parse(JSON.stringify(this.model));
      this.backData.push(obj);
    },
    handleAvatarSuccess(res, file) {
      this.imgFlag = false;
      this.videoUploadPercent = 0;
      if (res.msg == 'success') {
        this.currentModel.url = res.data.url
        this.currentModel.id = res.data.id
        this.$message.success('图片上传成功')
        console.log(this.backData);
      }
      else {
        this.$message.error('图片上传失败')
      }
    },
    uploadVideoProcess(event, file, fileList){
        this.imgFlag = true;
        this.videoUploadPercent = Number(file.percentage.toFixed(0));
    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/png') || (file.type === 'image/jpeg');
      const isLt2M = file.size / 1024 / 1024 <= 1.5;

      var v = this;
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.onload = function(e) {
						var data = e.target.result;
						//加载图片获取图片真实宽度和高度
						var image = new Image();
						image.onload = function() {
							var width = image.width;
							var height = image.height;
              var result = (width >= 1280 && width <= 2560 && (width/height==16/9))
							if(isJPG && isLt2M && result) {
								resolve(isLt2M && result);
							} else {
								if(!result) {
                  v.$message.error('上传图片尺寸不符合要求！');
								}
								if(!isJPG) {
									v.$message.error('上传图片只能是 JPG/PNG 格式!');
								}
								if(!isLt2M) {
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
    saveData() {
      this.currentModel.hasWarning = false
      this.$set(this.backData,this.currentIndex,this.currentModel)
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
  width: 184px;
  height: 164px;
  line-height: 164px;
  text-align: center;
}

.avatar {
  width: 184px;
  height: 164px;
  display: block;
}
</style>
