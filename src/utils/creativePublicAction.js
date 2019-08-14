export default {
  install(Vue, options) {
    Vue.prototype.creativeImgUrl = process.env.BASE_API + '/biz/file/image/ad';
    Vue.prototype.creativeVideoUrl = process.env.BASE_API + '/biz/file/video/ad';
    Vue.prototype.submitCreative = function(obj) {
        let stateArr = [true, true, true, true, true, true]
        if (obj.creatStyle == 1) {
          for (var i = 0; i < obj.makeSeftCreativeArray.length; i++) {
            let selfObj = obj.makeSeftCreativeArray[i];
            if (!obj.littleCreativeData[i].checked) {
              continue;
            }
            for (var j = 0; j < selfObj.length; j++) {
              let item = selfObj[j];
              console.log(item);
              if (i == 0 || i == 4 || i == 5) {
                if (item.url == '' || item.title == '') {
                  stateArr[i] = false
                }
              } else if (i == 1 || i == 2) {
                if (item.url == '' || item.title == '' || item.video == '') {
                  stateArr[i] = false
                }
              } else if (i == 3) {
                if (item.url[0] == '' || item.title == '' || item.url[1] == '' || item.url[2] == '') {
                  stateArr[i] = false
                }
              }
              if (item.titleLength == undefined || item.titleLength < 6 || item.titleLength > 25) {
                stateArr[i] = false
              }
              if (!stateArr[i]) {
                item.hasWarning = true
                this.$set(selfObj, j, item)
                obj.littleCreativeData[i].hasWarning = true
              }
            }
          }
        } else {
          for (var i = 0; i < obj.progCreativeArray.length; i++) {
            let selfObj = obj.progCreativeArray[i];
            if (!obj.littleCreativeData[i].checked) {
              continue;
            }
            if (i == 0 || i == 4 || i == 5) {
              for (var item of selfObj) {
                console.log(item);
                if (item.url == '') {
                  stateArr[i] = false
                }
              }
            } else {
              for (var j = 0; j < selfObj.length; j++) {
                let item = selfObj[j];
                if (item.url == '' || item.video == '') {
                  stateArr[i] = false
                }
              }
            }
            if (!stateArr[i]) {
              obj.littleCreativeData[i].hasWarning = true
            }
          }
        }
        this.addCreativeDic = JSON.parse(JSON.stringify(this.littleCreativeData))
        return stateArr.includes(false);
      },
      Vue.prototype.creativeSleep = function(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
      },
      Vue.prototype.getOneParamInUrl = function(key) {
        var after = window.location.search;
        if (after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空

        //key存在先通过search取值如果取不到就通过hash来取
        after = after.substr(1) || window.location.hash.split("?")[1];

        if (after) {
          var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
          var r = after.match(reg);
          if (r != null) {
            return decodeURIComponent(r[2]);
          } else {
            return null;
          }
        }
      };
  }
}