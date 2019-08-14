import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import creative from './creative'
import titlemess from './modules/advMes'
Vue.config.devtools = true;
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: sessionStorage
    })
  ],
  modules: {
    user,
    titlemess,
    creative,
    permission
  },
  getters
})

export default store