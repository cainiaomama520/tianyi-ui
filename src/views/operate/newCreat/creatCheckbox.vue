<template>
  <div class="creatCheckbox">
    <div class="header">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">APP名称</el-checkbox>
    </div>
    <div class="listBox">
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city.id" :key="city.id">{{city.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ['backData'],
  data() {
    return {
      checkAll: false,
      // checkedCities: ['INVENTORY_FEED', 'INVENTORY_TEXT_LINK', 'INVENTORY_VIDEO_FEED', 'INVENTORY_HOTSOON_FEED', 'INVENTORY_AWEME_FEED','INVENTORY_UNION_SLOT'],
      // checkedCities: [],
      cities: [
        {label:'头条信息流' ,id:'INVENTORY_FEED'},
        {label:'头条文章详' ,id:'INVENTORY_TEXT_LINK'},
        {label:'西瓜信息流' ,id:'INVENTORY_VIDEO_FEED'},
        {label:'火山小视频' ,id:'INVENTORY_HOTSOON_FEED'},
        {label:'抖音信息流' ,id:'INVENTORY_AWEME_FEED'},
        {label:'穿山甲' ,id:'INVENTORY_UNION_SLOT'}
      ],
      isIndeterminate: true
    };
  },
  computed: {
    checkedCities: {
      get() {
        return this.backData;
      },
      set(val) {
        // this.backData = val
        this.$emit('callBackAction',val)
        console.log(val);
      }
    }
  },
  mounted() {
    // this.checkedCities = this.backData
    console.log('----',this.backData);
  },
  methods: {
     handleCheckAllChange(val) {
       let arr = []
       for (let item of this.cities) {
         arr.push(item['id'])
       }
       this.checkedCities = val ? arr : [];
       this.$emit('callBackAction',val ? arr : [])
       this.isIndeterminate = false;
     },
     handleCheckedCitiesChange(value) {
       let checkedCount = value.length;
       this.checkAll = checkedCount === this.cities.length;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
       this.$emit('callBackAction',value)
     }
   }
}
</script>

<style lang="scss">
.creatCheckbox {
  width: 100%;
  .header {
    background-color: #fafbfe;
    border: 1px solid #dee4f5;
    height: 36px;
    line-height: 36px;
    padding-left: 12px;
    padding-right: 24px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    .el-checkbox {
      width: 100%;
      .el-checkbox__label {
        font-size: 14px;
        font-weight: 700;
        color: #333;
      }
    }
  }
  .listBox {
    max-height: 200px;
    border: 1px solid #dee4f5;
    overflow-y: auto;
    margin-top: -1px;
    padding-left: 12px;
    padding-right: 24px;
    .el-checkbox {
      height: 36px;
      line-height: 36px;
      width: 100%;
      .el-checkbox__label {
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
