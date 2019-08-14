
export const model = [
{
   type:'initAdvgroup',
   values:[ {
            id: 'cost',
            value: '总花费(元)',
            sortId: 0,
            sortable: true,
            show: true,
            width:110,
            expand: false
        },
        {
            id: 'show',
            value: '展示数',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'click',
            value: '点击数',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'ctr',
            value: '点击率',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'ecpc',
            value: '平均点击单价(元)',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'ecpm',
            value: '平均千次展现费用(元)',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        }
   ]
},{
   type:'initPlan',
   values:[ 
	{
		id: 'cost',
		value: '总花费(元)',
		sortId: 0,
		sortable: true,
		show: true,
		width:110,
		expand: false
	},
	{
		id: 'show',
		value: '展示数',
		sortId: 0,
		sortable: true,
		show: true,
		width:100,
		expand: false
	},
	{
		id: 'click',
		value: '点击数',
		sortId: 0,
		sortable: true,
		show: true,
		width:100,
		expand: false
	},
	{
		id: 'ctr',
		value: '点击率',
		sortId: 0,
		sortable: true,
		show: true,
		width:100,
		expand: false
	},
	{
		id: 'ecpc',
		value: '平均点击单价(元)',
		sortId: 0,
		sortable: true,
		show: true,
		width:200,
		expand: false
	},
	{
		id: 'ecpm',
		value: '平均千次展现费用(元)',
		sortId: 0,
		sortable: true,
		show: true,
		width:200,
		expand: false
	}
   ]
},
{
   type:'initIdea',
   values:[
	{
		id: 'cost',
		value: '总花费(元)',
		sortId: 0,
		sortable: true,
		show: true,
		width:110,
		expand: false
	},
	{
		id: 'show',
		value: '展示数',
		sortId: 0,
		sortable: true,
		show: true,
		width:100,
		expand: false
	},
	{
		id: 'click',
		value: '点击数',
		sortId: 0,
		sortable: true,
		show: true,
		width:100,
		expand: false
	},
	{
		id: 'ctr',
		value: '点击率',
		sortId: 0,
		sortable: true,
		show: true,
		width:100,
		expand: false
	},
	{
		id: 'ecpc',
		value: '平均点击单价(元)',
		sortId: 0,
		sortable: true,
		show: true,
		width:200,
		expand: false
	},
	{
		id: 'ecpm',
		value: '平均千次展现费用(元)',
		sortId: 0,
		sortable: true,
		show: true,
		width:200,
		expand: false
	}
   ]
},
{
    type:'staticLabel',
    values:[
    {
            id: 'date',
            value: '时间',
            sortId: 0,
            sortable: false,
            show: true,
            width:100,
            expand: false
        }
        ]
},
{
    type:'staticGroup',
    values:[
        {
            id: 'name',
            value: '广告组',
            sortId: 0,
            sortable: false,
            show: true,
            width:100,
            expand: false
		}
	]
},
{
    type:'staticPlan',
    values:[
        {
            id: 'name',
            value: '广告计划',
            sortId: 0,
            sortable: false,
            show: true,
            width:100,
            expand: false
		}
	]
},{
    type:'staticIdea',
    values:[		
    {
            id: 'creative_id',
            value: '创意ID',
            sortId: 0,
            sortable: false,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'creativeInfo',
            value: '创意',
            sortId: 0,
            sortable: false,
            show: true,
            width:190,
			expand: false,
			formatter: function (h, item, col) {
				return (
					<div>
						<p>{item[col]?item[col]['title']:''}</p>
						{(item[col]&&item[col]['images']&&item[col]['imageMode']=='image')?<img
							style="width:180px;height:auto"
							src={item[col]['images'][0]['imageUrl']}
						/>:(item[col]&&item[col]['video']&&item[col]['imageMode'])?(<div>
							<img
							style="width:180px;height:auto"
							src={item[col]['video']['imageUrl']}/><a style="top: 50%;margin-top: -14px;" v-show={item['creativeInfo']['imageMode']=='video'&&item['creativeInfo']['video']['imageUrl']}
							 href={'https://cc.toutiao.com/v/video_player?code='+item['creativeInfo']['video']['videoId']}
							  target="_blank" class="play-btn">
							  <img style="display: block;width: 100%;" src="/static/images/play.png"/></a></div>):
							  (item[col]&&item['creativeProgramming'][0]['images'])?<img
							  style="width:180px;height:auto"
							  src={item['creativeProgramming'][0]['images'][0]['imageUrl']}
						  />:''}
					</div>
				)
			}
		},
		// {
        //     id: 'place',
        //     value: '投放位置',
        //     sortId: 0,
        //     sortable: false,
        //     show: true,
        //     width:100,
        //     expand: false
		// }
	]
},
{
    type:'idea',
    values:[
    {
        group: 'show_data',
        title: '转化数据',
        showItem: false,
        list: [{
            id: 'addr0119',
            value: '深度转化次数',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
            width:120,
            notFilter: true
        },
        {
            id: 'addr10',
            value: '深度转化成本',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
             width:120,
            notFilter: true
        },
        {
            id: 'addr11',
            value: '深度转化率',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
             width:120,
            notFilter: true
        },
        {
            id: 'addr12',
            value: '转化跟踪方式',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
             width:120,
            notFilter: true
        },
        {
            id: 'addr13',
            value: '转化目标',
            sortId: 0,
            sortable: 'customer',
            show: true,
            expand: false,
             width:120,
            notFilter: true
        },
        {
            id: 'addr14',
            value: '转化数',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
             width:120,
            notFilter: true
        },
        {
            id: 'addr15',
            value: '转化成本',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
             width:150,
            notFilter: true
        },
        {
            id: 'addr16',
            value: '转化率',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
            width:150,
            notFilter: true
        },
        {
            id: 'addr160',
            value: '深度转化目标',
            sortId: 0,
            sortable: false,
            show: true,
            expand: false,
            width:150,
            notFilter: true
        }
        ]
    },{
        group: 'show_data',
        title: '视频数据',
        showItem: false,
        list: [{
            id: 'total_play',
            value: '播放数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'valid_play',
            value: '有效播放数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'd12',
            value: '有效播放率',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'd11',
            value: '有效播放成本',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        }]
    }
    ]
},
{
    type:'plan',
    values:[
     {
        group: 'show_data',
        title: '互动数据',
        showItem: false,
        list: [{
            id: 's1',
            value: '收藏数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 's2',
            value: '分享数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 's3',
            value: '评论数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 's4',
            value: '点赞数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 's5',
            value: '新增关注数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 's6',
            value: '主页访问量',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },{
            id: 's7',
            value: '挑战赛查看数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 's8',
            value: '音乐查看数',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },{
            id: 's9',
            value: '单词互动成本',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        }]
    },
    {
        group: 'show_data',
        title: '其他',
        showItem: false,
        list: [
		// 	{
        //     id: 'e1',
        //     value: '广告质量度',
        //     sortId: 0,
        //     sortable: false,
        //     show: true,
        //     width:200,
        //     expand: false
		// }
	]
    }
    ]
},{
    type:'advgroup',
    values:[
    {
        group: 'show_data',
        title: '转化数据',
        showItem: false,
        list: [{
            id: 'convert',
            value: '转化数',
            sortId: 0,
            width:100,
            sortable: true,
            show: true,
            expand: false
        },
        {
            id: 'convert_cost',
            value: '转化成本',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'convert_rate',
            value: '转化率',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        ]
    }
    ]
},
{
    type: 'data',
    values: [
    	{
        group: 'show_data',
        title: '展现数据',
        showItem: true,
        list: [{
            id: 'cost',
            value: '总花费(元)',
            sortId: 0,
            sortable: true,
            show: true,
            width:110,
            expand: false
        },
        {
            id: 'show',
            value: '展示数',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'click',
            value: '点击数',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'ctr',
            value: '点击率',
            sortId: 0,
            sortable: true,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'ecpc',
            value: '平均点击单价(元)',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'ecpm',
            value: '平均千次展现费用(元)',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'd6',
            value: '覆盖人数',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        },{
            id: 'd7',
            value: '千人覆盖花费',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        },{
            id: 'd8',
            value: '人均展示频次',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        },{
            id: 'd9',
            value: '微头条区域点击数',
            sortId: 0,
            sortable: true,
            show: true,
            width:200,
            expand: false
        }
        ]
    },
    {
        group: 'show_data',
        title: '应用下载广告数据',
        showItem: false,
        list: [{
            id: 'download_start',
            value: '安卓下载开始数',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        },
        {
            id: 'download_start_cost',
            value: '安卓下载开始成本',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        },
        {
            id: 'download_start_rate',
            value: '安卓下载开始率',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        }, {
            id: 'download_finish',
            value: '安卓下载完成数',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        },
        {
            id: 'download_finish_cost',
            value: '安卓下载完成成本',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        }, {
            id: 'download_finish_rate',
            value: '安卓下载完成率',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        },
        {
            id: 'install_finish',
            value: '安卓安装完成数',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        }, {
            id: 'install_finish_cost',
            value: '安卓安装完成成本',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        },
        {
            id: 'install_finish_rate',
            value: '安卓安装完成率',
            sortId: 0,
            sortable: false,
            show: true,
            width:150,
            expand: false
        }, {
            id: 'active',
            value: '激活数',
            sortId: 0,
            sortable: false,
            show: true,
            width:100,
            expand: false
        },
        {
            id: 'active_cost',
            value: '激活成本',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'active_cost_rate',
            value: '激活率',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'register',
            value: '注册数',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'register_cost',
            value: '注册成本',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'register_rate',
            value: '注册率',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'addraddr-16',
            value: '关键行为数',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'addr-17',
            value: '关键行为成本',
            sortId: 0,
            sortable: false,
            show: true,
             width:120,
            expand: false
        }, {
            id: 'addr-18',
            value: '关键行为率',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'pay_count',
            value: '付费数',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'pay_cost',
            value: '付费成本',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'pay_rate',
            value: '付费率',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'in_app_uv',
            value: '到达uv',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'in_app_detail_uv',
            value: '详情页到站uv',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'in_app_cart',
            value: '加入购物车',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'in_app_order',
            value: '提交订单',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'in_app_pay',
            value: '付费',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'addr-27',
            value: '次留',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'addr-28',
            value: '次留成本',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'addr-29',
            value: '次留率',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }
        ]
    },
    {
        group: 'show_data',
        title: '落地页转化数据',
        showItem: false,
        list: [{
            id: 'phone',
            value: '点击电话按钮',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'form',
            value: '表单提交',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'map_search',
            value: '地图搜索',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'button',
            value: '按钮button',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'view',
            value: '关键页面浏览',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'addr013',
            value: '下载开始',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'qq',
            value: 'QQ咨询',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'lottery',
            value: '抽奖',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'vote',
            value: '投票',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        }, {
            id: 'addr009',
            value: '短信咨询',
            sortId: 0,
            sortable: false,
            show: true,
             width:100,
            expand: false
        },
        {
            id: 'redirect',
            value: '页面跳转',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        }, {
            id: 'shopping',
            value: '商品购买',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        }, {
            id: 'consult',
            value: '在线咨询',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        },
        {
            id: 'wechat',
            value: '微信复制',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        }, {
            id: 'phone_confirm',
            value: '智能电话-确认拨打',
            sortId: 0,
            sortable: false,
            show: true,
              width:150,
            expand: false
        },{
            id: 'phone_connect',
            value: '智能电话-确认接通',
            sortId: 0,
            sortable: false,
            show: true,
              width:150,
            expand: false
        }, {
            id: 'consult_effective',
            value: '智能电话-有效咨询',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        },
        {
            id: 'addr002',
            value: '建站卡券领取',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        },
        {
            id: 'addr001',
            value: '卡券页领取',
            sortId: 0,
            sortable: false,
            show: true,
              width:100,
            expand: false
        },
        ]
    },
 {
        group: 'show_data',
        title: '附加创意',
        showItem: false,
        list: [{
            id: 'advanced_creative_phone_click',
            value: '附加创意电话按钮点击',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'advanced_creative_counsel_click',
            value: '附加创意在线咨询点击',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'advanced_creative_form_click',
            value: '附加创意表单按钮点击',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        },
        {
            id: 'd10',
            value: '附加创意卡券领取',
            sortId: 0,
            sortable: false,
            show: true,
            width:200,
            expand: false
        }]
    }]
}
];
