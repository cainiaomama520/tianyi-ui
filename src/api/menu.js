import axios from '@/utils/request';
// 删除菜单
export const menuDelete = params => {
	return axios.post(`/sys/menu/delete?menuId=`+params).then(res => res)
}
  // 菜单列表
export const menuList = params => {
	return axios.get(`/sys/menu/nav`, {
		params: params
	})
}
// 新增菜单
export const menuAdd = params => {
	return axios.post(`/sys/menu/save`,params).then(res => res)
}
// 修改菜单
export const menuUpdate = params => {
	return axios.post(`/sys/menu/update`,params).then(res => res)
}
// /sys/menu/select
export const menuSelect= params => {
	return axios.get(`/sys/menu/select`, {
		params: params
	})
}
// 菜单详情/sys/menu/info/{menuId}
export const menuDetail= params => {
	return axios.get(`/sys/menu/info/`+params)
}
// 角色列表/sys/role/list roleListUrl
export const roleListUrl= params => {
	return axios.get(`/sys/role/list`,{params:params})
}
// 删除角色
export const roleDelete = params => {
	return axios.post(`/sys/role/delete?roleId=`+params).then(res => res)
}
// 角色详情
export const roleDetail= roleId => {
	return axios.get(`/sys/role/info/`+roleId)
}
// 角色保存新建
export const roleSave = params => {
	return axios.post(`/sys/role/save`,params).then(res => res)
}
// 角色修改
export const roleChange = params => {
	return axios.post(`/sys/role/update`,params).then(res => res)
}