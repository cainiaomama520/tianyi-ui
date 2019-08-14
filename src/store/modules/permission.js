
import { menuList } from '@/api/menu'
import RouterProvider from "@/router/RouterProvider"
import routers from '@/router/Data/RouterMap.js'

const permission = {
	state: {
		addRouters: []
	},
	mutations: {
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
		}
	},
	actions: {
		GenerateRoutes({ commit, state }) {
			return new Promise((resolve, reject) => {
				if (!(state.addRouters && state.addRouters.length > 0)) {
					menuList().then((res) => {
						let routerProvider = new RouterProvider(res.menuList, routers)
						commit("SET_ROUTERS", routerProvider.routers)
						resolve(routers)
					})
						.catch()
				} else {
					resolve(state.addRouters)
				}
			})
		}
	}
}

export default permission