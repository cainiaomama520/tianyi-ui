export default [
    {
        group: 'show_data',
        title: '展现数据',
        list: [
            {
                id: 'name',
                value: '广告主/代理子账户',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                notFilter: true,
            },
            {
                id: 'company',
                value: '公司名称',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                notFilter: true
            },
            {
                id: 'agentName',
                value: '代理商',
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
        showItem: true, //搜索框是否展开
        list: [
            {
                id: 'show',
                value: '展示量',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                notFilter: true
            },
            {
                id: 'ecpm',
                value: '平均千次展示价格',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
                avg: true
            },
            {
                id: 'click',
                value: '点击量',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'ctr',
                value: '点击率',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false,
            },
            {
                id: 'ecpc',
                value: '平均点击价格',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'cost',
                value: '总消耗',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'balance',
                value: '余额',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'validBalance',
                value: '可用余额',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'convert',
                value: '转化数',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            },
            {
                id: 'convert_cost',
                value: '转化成本',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
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
                expand: false
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
                expand: false
            },
            {
                id: 'cashCost',
                value: '现金消耗',
                sortId: 0,
                sortable: false,
                show: true,
                expand: false
            }
        ]
    }
]