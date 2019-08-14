let routes = [
  {
    path: '/operate',
    name: '首页',
    sec: true,
    component: () => import("@/views/advBar.vue"),
    iconCls: 'fa fa-home fa-lg',
    leaf: true, //只有一个节点
    children: [{
      path: '/operate/operateIndex',
      component: () => import('@/views/operate/operateIndex.vue'),
      name: '广告主首页',
      hidden: true
    },
    {
      path: '/operate/spreadMng/advert',
      component: () => import("@/views/operate/spreadMng/advert.vue"),
      name: '推广管理1',
      hidden: true
    },
    {
      path: '/operate/dataReport/adgroup',
      component: () => import("@/views/operate/dataReport/adgroup.vue"),
      name: '广告组',
      hidden: true
    }, {
      path: '/operate/dataReport/adPlan',
      component: () => import("@/views/operate/dataReport/adPlan.vue"),
      name: '广告计划',
      hidden: true
    }, {
      path: '/operate/dataReport/ideas',
      component: () => import("@/views/operate/dataReport/ideas.vue"),
      name: '创意',
      hidden: true
    },
    {
      path: '/operate/toolCase/tool-case',
      components: {
        nmpBar: () => import("@/views/operate/toolCase/templete/toolBar.vue"),
        default: () => import("@/views/operate/toolCase/tool-case.vue")
      },
      name: '转化跟踪',
      hidden: true,
      isTool: true
    },
    {
      path: '/operate/toolCase/new-change',
      components: {
        nmpBar: () => import("@/views/operate/toolCase/templete/toolBar.vue"),
        default: () => import("@/views/operate/toolCase/creat-change.vue")
      }
    },
    {
      path: '/operate/toolCase/creat-change',
      components: {
        nmpBar: () => import("@/views/operate/toolCase/templete/toolBar.vue"),
        default: () => import("@/views/operate/toolCase/new-change.vue")
      },
      name: '新建转化1',
      hidden: true
    },
    {
      path: '/operate/toolCase/dmp-manager',
      components: {
        default: () => import('@/views/operate/toolCase/dmp-manager.vue'),
        nmpBar: () => import("@/views/operate/toolCase/templete/toolBar.vue")
      },
      child: '人群列表',
      name: 'DMP管理',
      hidden: true,
      isTool: true,
      isChild: true
    },
    {
      path: '/operate/toolCase/dmpDetail',
      component: () => import('@/views/operate/toolCase/dmpDetail.vue'),
      name: 'DMP详情',
      hidden: true
    },
    {
      path: '/operate/newGroup/new-group',
      component: () => import('@/views/operate/newGroup/new-group.vue'),
      name: '新建广告组',
      hidden: true
    },
    {
      path: '/operate/newPlan/new-plan',
      component: () => import('@/views/operate/newPlan/new-plan.vue'),
      name: '新建广告计划',
      hidden: true
    },
    {
      path: '/operate/newCreat/choicePlan',
      component: () => import('@/views/operate/newCreat/choicePlan.vue'),
      name: '选择广告计划',
      hidden: true
    },
    {
      path: '/operate/newCreat/new-creat',
      component: () => import('@/views/operate/newCreat/new-creat.vue'),
      name: '新建创意',
      hidden: true
    }
    ]
  },
  {
    path: '/admin',
    name: '首页',
    sec: false,
    meta: {
      type: "admin"
    },
    component: () => import("@/views/Home.vue"),
    iconCls: 'fa fa-home fa-lg',
    leaf: true, //只有一个节点
    children: [{
      path: '/admin/index',
      component: () => import("@/views/admin/index.vue"),
      name: '首页',
      hidden: true,
      meta: {
        menuId: 313
      }
    },
    {
      path: '/data/table',
      component: () => import("@/views/admin/data/table.vue"),
      name: '数据统计'
    },
    {
      path: '/changpassword',
      component: () => import("@/views/changpassword.vue"),
      name: '修改密码'
    },
    {
      path: '/role/table',
      component: () => import("@/views/admin/role/userManager.vue"),
      name: '运营者管理'
    },
    {
      path: '/role/authorManager',
      component: () => import("@/views/admin/role/authorManager.vue"),
      name: '授权管理'
    },
    {
      path: '/tool/ruleManage',
      component: () => import('@/views/admin/tool/ruleManage.vue'),
      name: '规则管理'
    },
    {
      path: '/advmanager/table',
      component: () => import('@/views/admin/advmanager/table.vue'),
      name: '广告主管理',
      hidden: true
    },
    {
      path: '/financialMan/toutiao',
      component: () => import('@/views/admin/financialMan/toutiao.vue'),
      name: '头条'
    },
    {
      path: '/nav/menuList',
      component: () => import('@/views/admin/nav/menuList.vue'),
      name: '菜单列表'
    }, {
      path: '/nav/menu',
      component: () => import('@/views/admin/nav/menu.vue'),
      name: '创建菜单'
    },
    {
      path: '/role/list',
      component: () => import('@/views/admin/role/list.vue'),
      name: '菜单列表'
    }, {
      path: '/role/form',
      component: () => import('@/views/admin/role/form.vue'),
      name: '创建菜单'
    }
    ]
  }
];

export default routes;