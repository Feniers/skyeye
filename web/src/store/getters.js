const getters = {
  baseApi: state => state.api.baseApi,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  sname: state => state.user.name,
  id: state => state.user.id,
  right: state => state.user.right,

  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  user: state => state.user.user,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  menuLoaded: state => state.permission.menuLoaded,
  cachedViews: state => state.tabbar.cachedViews,

  enable: state => state.user.enable,
}

export default getters