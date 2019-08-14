let routes = [{
	path: '/login',
	component: (resolve) => require(['./views/Login.vue'], resolve),
	name: '',
	hidden: true
},
{
	path: '/operate',
	name: '首页',
	sec: true,
	component: (resolve) => require(['./views/advBar.vue'], resolve),
	iconCls: 'fa fa-home fa-lg',
	leaf: true, //只有一个节点
	children: [{
		path: '/operate/operateIndex',
		component: (resolve) => require(['./views/operate/operateIndex.vue'], resolve),
		name: '广告主首页',
		hidden: true
	}]
},
{
	path: '/operate',
	name: '推广管理',
	sec: true,
	component: (resolve) => require(['./views/advBar.vue'], resolve),
	iconCls: 'fa fa-home fa-lg',
	leaf: true, //只有一个节点
	children: [{
		path: '/operate/spreadMng/advert',
		component: (resolve) => require(['./views/operate/spreadMng/advert.vue'], resolve),
		name: '推广管理1',
		hidden: true
	}]
},
{
	path: '/operate',
	name: '数据报告',
	sec: true,
	component: (resolve) => require(['./views/advBar.vue'], resolve),
	iconCls: 'fa fa-home fa-lg',
	leaf: true, //只有一个节点
	narBar: true,
	children: [{
		path: '/operate/dataReport/adgroup',
		component: (resolve) => require(['./views/operate/dataReport/adgroup.vue'], resolve),
		name: '广告组',
		hidden: true
	}, {
		path: '/operate/dataReport/adPlan',
		component: (resolve) => require(['./views/operate/dataReport/adPlan.vue'], resolve),
		name: '广告计划',
		hidden: true
	}, {
		path: '/operate/dataReport/ideas',
		component: (resolve) => require(['./views/operate/dataReport/ideas.vue'], resolve),
		name: '创意',
		hidden: true
	}]
},
{
	path: '/operate',
	name: '工具箱',
	sec: true,
	component: (resolve) => require(['./views/advBar.vue'], resolve),
	leaf: true, //只有一个节点
	children: [{
		path: '/operate/toolCase/tool-case',
		components: {
			nmpBar: (resolve) => require(['./views/operate/toolCase/templete/toolBar.vue'], resolve),
			default: (resolve) => require(['./views/operate/toolCase/tool-case.vue'], resolve)
		},
		name: '转化跟踪',
		hidden: true,
		isTool: true
	},
	{
		path: '/operate/toolCase/new-change',
		components: {
			nmpBar: (resolve) => require(['./views/operate/toolCase/templete/toolBar.vue'], resolve),
			default: (resolve) => require(['./views/operate/toolCase/new-change.vue'], resolve)
		},
		name: '新建转化',
		hidden: true
	},
	{
		path: '/operate/toolCase/creat-change',
		components: {
			nmpBar: (resolve) => require(['./views/operate/toolCase/templete/toolBar.vue'], resolve),
			default: (resolve) => require(['./views/operate/toolCase/creat-change.vue'], resolve)
		},
		name: '新建转化1',
		hidden: true
	},
	//   {
	// 	path: '/operate/toolCase/dmp-manager',
	// 	components: {
	// 	default:(resolve) => require(['./views/operate/toolCase/dmp-manager.vue'], resolve),
	// 		nmpBar:nmpBar
	// 	},
	//     name: 'DMP管理',
	// 	hidden: true,
	// 	isTool:true
	//   },
	{
		path: '/operate/toolCase/dmp-manager',
		components: {
			default: (resolve) => require(['./views/operate/toolCase/dmp-manager.vue'], resolve),
			nmpBar: (resolve) => require(['./views/operate/toolCase/templete/toolBar.vue'], resolve)
		},
		child: '人群列表',
		name: 'DMP管理',
		hidden: true,
		isTool: true,
		isChild: true
	},
	{
		path: '/operate/toolCase/dmpDetail',
		component: (resolve) => require(['./views/operate/toolCase/dmpDetail.vue'], resolve),
		name: 'DMP详情',
		hidden: true
	},
	{
		path: '/operate/newGroup/new-group',
		component: (resolve) => require(['./views/operate/newGroup/new-group.vue'], resolve),
		name: '新建广告组',
		hidden: true
	},
	{
		path: '/operate/newPlan/new-plan',
		component: (resolve) => require(['./views/operate/newPlan/new-plan.vue'], resolve),
		name: '新建广告计划',
		hidden: true
	},
	{
		path: '/operate/newCreat/choicePlan',
		component: (resolve) => require(['./views/operate/newCreat/choicePlan.vue'], resolve),
		name: '选择广告计划',
		hidden: true
	},
	{
		path: '/operate/newCreat/new-creat',
		component: (resolve) => require(['./views/operate/newCreat/new-creat.vue'], resolve),
		name: '新建创意',
		hidden: true
	}
	]
},
{
	path: '/admin',
	name: '首页',
	sec: false,
	component: (resolve) => require(['./views/Home.vue'], resolve),
	iconCls: 'fa fa-home fa-lg',
	leaf: true, //只有一个节点
	children: [{
		path: '/admin/index',
		component: (resolve) => require(['./views/admin/index.vue'], resolve),
		name: '首页',
		hidden: true
	}]
},
{
	path: '/advmanager',
	name: '广告主管理',
	sec: false,
	component: (resolve) => require(['./views/Home.vue'], resolve),
	iconCls: 'fa fa-pencil-square-o',
	leaf: true, //只有一个节点
	children: [{
		path: '/advmanager/table',
		component: (resolve) => require(['./views/admin/advmanager/table.vue'], resolve),
		name: '广告主管理',
		hidden: true
	}]
},
{
	path: '/data',
	component: (resolve) => require(['./views/Home.vue'], resolve),
	sec: false,
	name: '统计报表',
	iconCls: 'fa fa-bar-chart', //图标样式class
	children: [{
		path: '/data/table',
		component: (resolve) => require(['./views/admin/data/table.vue'], resolve),
		name: '数据统计'
	}
	]
},
{
	path: '/data',
	component: (resolve) => require(['./views/Home.vue'], resolve),
	sec: false,
	isCaiwu:true,
	name: '统计报表',
	iconCls: 'fa fa-bar-chart', //图标样式class
	children: [
	{
		path: '/data/dataReport',
		component: (resolve) => require(['./views/admin/data/dataReport.vue'], resolve),
		name: '报表预览',
		isShow:false
	}
	]
},
{
	path: '/changpassword',
	component: (resolve) => require(['./views/Home.vue'], resolve),
	sec: false,
	name: '修改密码',
	hidden: true,
	leaf: true, //只有一个节点
	iconCls: 'fa fa-bar-chart', //图标样式class
	children: [{
		path: '/changpassword',
		component: (resolve) => require(['./views/changpassword.vue'], resolve),
		name: '修改密码'
	}]
},
{
	path: '/financialMan',
	name: '财务管理',
	sec: false,
	iconCls: 'fa fa-credit-card', //图标样式class
	component: (resolve) => require(['./views/Home.vue'], resolve),
	meta: {
		hidden: true,
		isFinance: true
	},
	children: [{
		path: '/financialMan/toutiao',
		component: (resolve) => require(['./views/admin/financialMan/toutiao.vue'], resolve),
		name: '头条'
	}]
},
{
	path: '/role',
	component: (resolve) => require(['./views/Home.vue'], resolve),
	sec: false,
	name: '角色&权限',
	meta: {
		hidden: true,
		isFinance: true
	},
	iconCls: 'fa fa-user-o', //图标样式class
	children: [{
		path: '/role/table',
		component: (resolve) => require(['./views/admin/role/userManager.vue'], resolve),
		name: '运营者管理'
	},
	{
		path: '/role/authorManager',
		component: (resolve) => require(['./views/admin/role/authorManager.vue'], resolve),
		name: '授权管理'
	}
	]
},
{
	path: '/tool',
	name: '辅助工具',
	sec: false,
	meta: {
		isFinance: false
	},
	iconCls: 'fa fa-archive', //图标样式class
	component: (resolve) => require(['./views/Home.vue'], resolve),
	children: [{
		path: '/tool/ruleManage',
		component: (resolve) => require(['./views/admin/tool/ruleManage.vue'], resolve),
		name: '规则管理'
	}, {
		path: '/tool/report',
		component: (resolve) => require(['./views/admin/tool/report.vue'], resolve),
		name: '报表订阅'
	}]
},
{
	path: '/nav',
	name: '菜单管理',
	sec: false,
	meta: {
		hidden: true,
	},
	iconCls: 'fa fa-file-text-o', //图标样式class0
	component: (resolve) => require(['./views/Home.vue'], resolve),
	children: [{
		path: '/nav/menuList',
		component: (resolve) => require(['./views/admin/nav/menuList.vue'], resolve),
		name: '菜单列表'
	}, {
		path: '/nav/menu',
		component: (resolve) => require(['./views/admin/nav/menu.vue'], resolve),
		name: '创建菜单'
	}]
},
{
	path: '/role',
	name: '角色管理',
	sec: false,
	meta: {
		hidden: true,
	},
	iconCls: 'fa fa-user-circle', //图标样式class0
	component: (resolve) => require(['./views/Home.vue'], resolve),
	children: [{
		path: '/role/list',
		component: (resolve) => require(['./views/admin/role/list.vue'], resolve),
		name: '菜单列表'
	}, {
		path: '/role/form',
		component: (resolve) => require(['./views/admin/role/form.vue'], resolve),
		name: '创建菜单'
	}]
},
{
	path: '/',
	name: 'index',
	sec: false,
	component: (resolve) => require(['./views/Home.vue'], resolve),
	hidden: true,
	leaf: true, //只有一个节点
	redirect: 'admin/index'
},
{
	path: '/404',
	component: (resolve) => require(['./views/404.vue'], resolve),
	name: '',
	hidden: true
},
{
	path: '*',
	hidden: true,
	redirect: {
		path: '/404'
	}
}
];
export default routes;