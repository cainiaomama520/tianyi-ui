const menuMap = {
  首页: () => import('@/views/admin/index'),
  广告主管理: () => import('@/views/admin/advmanager/table'),
  // 发奖管理: () =>
  //   import('@/views/lottery/sponsorlist'),
  // 抽奖管理: () =>
  //   import('@/views/lottery/ticketlist'),
  // 数据报告: () =>
  //   import('@/views/layout/layout'),
  // 整体数据: () =>
  //   import('@/views/report/overview'),
  // 发奖数据: () =>
  //   import('@/views/report/sponsor'),
  // 抽奖数据: () =>
  //   import('@/views/report/participant'),
  // 客户管理: () =>
  //   import('@/views/lottery/customerList'),
  // 系统管理: () =>
  //   import('@/views/layout/layout'),
  // 每日推荐: () =>
  //   import('@/views/lottery/recommend'),
  // 账户管理: () =>
  //   import('@/views/sys/user/list'),
  // 角色管理: () => import('@/views/sys/role/list'),
  // 菜单管理: () =>
  //   import('@/views/sys/menu/list'),
  // SQL监控: null,
  // 定时任务: null,
  // 参数管理: null,
  // 文件上传: null,
  // 用户组: null,
  // 操作记录: () =>
  //   import('@/views/sys/log/list'),
  // API: null
}
console.log(menuMap, 'menuMap')
export {
  menuMap
}