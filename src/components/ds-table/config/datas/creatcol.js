export default [
    {
        group: 'show_data',
        title: '展现数据1',
        showItem: false, //搜索框是否展开
        list: [
            {
                id: 'opt_status',
                value: '开关',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                prop: 'switch',
                notFilter: true 
            },
            {
                id: 'id',
                value: '创意ID',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                notFilter: true
            },
            {
                id: 'title',
                value: '创意',
                sortId: 0,
                sortable: false,
                show: true,
                width: 200,
                expand: false,
                prop: 'group',
                notFilter: true
            },
            {
                id: 'operator',
                value: '操作',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                // prop: 'operate',
                notFilter: true
            },
            {
                id: 'status',
                value: '状态',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                prop: 'operate',
                notFilter: true,
            },
            {
                id: 'adName',
                value: '广告计划',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                notFilter: true,
            },
            {
                id: 'campaignName',
                value: '广告组',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                notFilter: true
            }
        ]
    },
    {
        group: 'show_data',
        title: '展现数据',
        showItem: true,
        list: [
            {
                id: 'cost',
                value: '总花费(元)',
                sortId: 0,
                sortable: true,
                show: true,
                width: 110,
                expand: false
            },
            {
                id: 'show',
                value: '展示数',
                sortId: 0,
                sortable: true,
                show: true,
                width: 100,
                expand: false
            },
            {
                id: 'click',
                value: '点击数',
                sortId: 0,
                sortable: true,
                show: true,
                width: 100,
                expand: false
            },
            {
                id: 'ctr',
                value: '点击率',
                sortId: 0,
                sortable: true,
                show: true,
                width: 100,
                expand: false,
                avg: true
            },
            {
                id: 'ecpc',
                value: '平均点击单价(元)',
                sortId: 0,
                sortable: true,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'ecpm',
                value: '平均千次展现费用(元)',
                sortId: 0,
                sortable: true,
                show: true,
                width: 130,
                expand: false,
                avg: true
            }
        ]
    },
    {
        group: 'show_data',
        title: '转化数据',
        showItem: false,
        list: [
            {
                id: 'convert',
                value: '转化数',
                sortId: 0,
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
                expand: false,
                avg: true
            },
            {
                id: 'convert_rate',
                value: '转化率',
                sortId: 0,
                sortable: true,
                show: true,
                expand: false,
                avg: true
            }
        ]
    },
    {
        group: 'show_data',
        title: '应用下载广告数据',
        showItem: false,
        list: [
            {
                id: 'download_start',
                value: '安卓下载开始数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'download_start_cost',
                value: '安卓下载开始成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'download_start_rate',
                value: '安卓下载开始率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'download_finish',
                value: '安卓下载完成数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'download_finish_cost',
                value: '安卓下载完成成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'download_finish_rate',
                value: '安卓下载完成率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'install_finish',
                value: '安卓安装完成数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'install_finish_cost',
                value: '安卓安装完成成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'install_finish_rate',
                value: '安卓安装完成率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'active',
                value: '激活数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'active_cost',
                value: '激活成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'active_rate',
                value: '激活率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'register',
                value: '注册数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'register_cost',
                value: '注册成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'register_cost',
                value: '注册率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'addr1',
                value: '关键行为数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },

            {
                id: 'pay_count',
                value: '付费数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'pay_cost',
                value: '付费成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'pay_rate',
                value: '付费率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'in_app_uv',
                value: '到达uv',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'in_app_detail_uv',
                value: '详情页到站uv',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'in_app_cart',
                value: '加入购物车',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'in_app_order',
                value: '提交订单',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'in_app_pay',
                value: '付费',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            }
        ]
    },
    {
        group: 'show_data',
        title: '落地页转化数据',
        showItem: false,
        list: [
            {
                id: 'phone',
                value: '点击电话按钮',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'form',
                value: '表单提交',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'map_search',
                value: '地图搜索',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'button',
                value: '按钮button',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'view',
                value: '关键页面浏览',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'qq',
                value: 'QQ咨询',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'lottery',
                value: '抽奖',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'vote',
                value: '投票',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'redirect',
                value: '页面跳转',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'shopping',
                value: '商品购买',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'consult',
                value: '在线咨询',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'wechat',
                value: '微信复制',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'phone_confirm',
                value: '智能电话-确认拨打',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'consult_effective',
                value: '有效咨询',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            }
        ]
    },
    {
        group: 'show_data',
        title: '附加创意',
        showItem: false,
        list: [
            {
                id: 'advanced_creative_phone_click',
                value: '附加创意电话按钮点击',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'advanced_creative_counsel_click',
                value: '附加创意在线咨询点击',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'advanced_creative_form_click',
                value: '附加创意表单按钮点击',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            }
        ]
    },
    {
        group: 'show_data',
        title: '视频数据',
        showItem: false,
        list: [
            {
                id: 'total_play',
                value: '播放数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'valid_play',
                value: '有效播放数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            }
        ]
    }
]