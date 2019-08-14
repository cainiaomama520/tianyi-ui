let data = {
  addCreativeDic: [{
    id: 1,
    disabled: false,
    checked: true,
    hasWarning: false,
    currentShow: true,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/3.svg',
    title: '大图横图',
    desc: '突出图片主体, 对用户干扰较小'
  }, {
    id: 2,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/5.svg',
    title: '横版视频',
    desc: '极具冲击力和吸引力的内容展现'
  }, {
    id: 3,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/15.svg',
    title: '竖版视频',
    desc: '沉浸式、用户互动性强'
  }, {
    id: 4,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/4.svg',
    title: '组图',
    desc: '更多信息传递，更多内容曝光'
  }, {
    id: 5,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/2.svg',
    title: '小图',
    desc: '内容聚焦, 贴合移动端阅读习惯'
  }, {
    id: 6,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/16.svg',
    title: '大图竖图',
    desc: '内容聚焦, 贴合移动端阅读习惯'
  }],
  littleCreativeData: [{
    id: 1,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: true,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/3.svg',
    title: '大图横图',
    desc: '突出图片主体, 对用户干扰较小'
  }, {
    id: 2,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/5.svg',
    title: '横版视频',
    desc: '极具冲击力和吸引力的内容展现'
  }, {
    id: 3,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/15.svg',
    title: '竖版视频',
    desc: '沉浸式、用户互动性强'
  }, {
    id: 4,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/4.svg',
    title: '组图',
    desc: '更多信息传递，更多内容曝光'
  }, {
    id: 5,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/2.svg',
    title: '小图',
    desc: '内容聚焦, 贴合移动端阅读习惯'
  }, {
    id: 6,
    checked: true,
    hasWarning: false,
    disabled: false,
    currentShow: false,
    img: 'http://sf1-ttcdn-tos.pstatp.com/obj/ttfe/adfe/platform/creative_type/v2/16.svg',
    title: '大图竖图',
    desc: '内容聚焦, 贴合移动端阅读习惯'
  }],
  submitObj: {
    advertiser_id: '', // 广告主id
    ad_id: '', // 广告计划id
    landing_type: '', // 创意类型
    smart_inventory: '', //优选
    creatives: [],
    inventory_type: '', // 广告位置
    creative_material_mode: '', // 创意方式(STATIC_ASSEMBLE程序化创意)
    title: '', //创意标题
    creative_word_ids: [], //动态词包ID
    web_url: '', // 应用下载详情页
    app_name: '', // 应用名
    advanced_creative_title: '', // 副标题
    is_comment_disable: '', // 广告评论（0，1）
    creative_display_mode: 'CREATIVE_DISPLAY_MODE_CTR', // 创意展示
    ad_category: '', // 创意分类
    ad_keywords: [], // 创意标签
    track_url: '', // 展示监测链接
    action_track_url: '', // 点击监测链接
    video_play_effective_track_url: '', // 视频有效播放监测链接
    video_play_done_track_url: '', // 视频播放完毕监测链接
    video_play_track_url: '', // 视频播放监测链接
    image_mode: '', // 素材类型
    source: '', // 来源
    image_list: [], // 程序化创意
    title_list: [], // 程序化创意titles
  },
  selfSubmitC: {
    creative_id: 0,
    creative_word_ids: [],
    image_id: '',
    image_url: '',
    image_ids: [],
    image_urls: [],
    image_mode: '',
    third_party_id: '',
    title: '',
    video_id: '',
    video_url: '',
  },
  progSubmitC: {
    image_id: '',
    image_ids: [],
    image_mode: '',
    image_url: '',
    image_urls: [],
    video_id: '',
    video_url: '',
  }
}

module.exports = data