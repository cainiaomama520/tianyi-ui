/**
 * 路由适配器
 * @param {Array} menus,服务器返回的树形菜单。
 * @param {Array} routers,自己定义的
 */
export default class RouterProvider {
    routers = []
    constructor(menus = new Array, routerMaps = new Array) {
        let menuArray = []
        let concatMenus = function (menus = new Array) {
            menus.forEach(a => {
                if (a.children) {
                    concatMenus(a.children)
                } else {
                    menuArray.push(a)
                }
            })
        }
        concatMenus(menus)
        routerMaps.forEach(a => {
            let childrens = [];
            if (a.children) {
                a.children.forEach(item => {
                    /**
                     * 如果配置的路由单元里面有路由元信息和服务器对应的路由ID
                     */
                    if (item.meta && item.meta.menuId) {
                        /**
                         * 如果服务器返回的路由表中有当前的路由，并且当前的路由还展示
                         */
                        let serverMenu = menuArray.find(a => a.menuId === item.meta.menuId)
                        if (serverMenu) {
                            let menu = Object.assign({
                                path: serverMenu.url ? serverMenu.url : item.path,
                                name: serverMenu.name,
                                hidden: item.hidden,
                                isTool: item.isTool,
                                meta: item.meta,
                                child: item.child
                            })
                            if (item.components) {
                                menu.components = item.components
                            }
                            if (item.component) {
                                menu.component = item.component
                            }
                            childrens.push(menu)
                        }
                    }

                })
            }
            if (childrens && childrens.length) {
                let menu = Object.assign({
                    path: a.path,
                    name: a.name,
                    hidden: a.hidden ? false : true,
                    isTool: a.isTool,
                    meta: a.meta,
                    child: a.child
                })
                if (a.components) {
                    menu.components = a.components
                }
                if (a.component) {
                    menu.component = a.component
                }
                menu.children = childrens
                this.routers.push(menu)
            }

        })
        console.log("routers", this.routers)
    }

}