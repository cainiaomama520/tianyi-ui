const getters = {
  sidebar: state => (state.app && state.app.sidebar) || null,
//   language: state => (state.app && state.app.language) || null,
  visitedViews: state => (state.app && state.app.visitedViews) || null,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  resource: state => state.user.resource,
  setting: state => state.user.setting,
  permission_routers: state => (state.permission && state.permission.routers) || null,
  addRouters: state => (state.permission && state.permission.addRouters) || null
}
export default getters
