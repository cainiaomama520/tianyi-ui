import {
  requestLogin,
  logout,
  getInfo
} from '@/api/api'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    role: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.role = roles
    }
  },

  actions: {
    // 登录
    Login({
      commit,
      dispatch
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        requestLogin(username, userInfo.password)
          .then((response) => {
            const data = response;
            setToken(data.token);
            commit('SET_TOKEN', data.token)
            commit('SET_ROLES', data.userType)
            sessionStorage.setItem('user', JSON.stringify(data))
            dispatch('GenerateRoutes')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then((response) => {
            const data = response.user;
            console.log(data, 'data')
            commit('SET_ROLES', data.userType)
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user