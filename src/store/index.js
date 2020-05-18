import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/common/js/common'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 是否折叠左侧导航
    isCollapse: false
  },
  mutations: {
    // 折叠菜单
    COLLAPSE_MENU (state) {
      state.isCollapse = !state.isCollapse
    },
    login (state, user) {
      common.setLoginInfo(user)
    },
    logout (state) {
      common.clearUserInfo()
      state.token = ''
    }
  },
  actions: {
    login: ({ commit }, user) => {
      commit('login', user)
    },
    logout: ({ commit }) => {
      commit('logout')
    }
  },
  getters: {
    getIsCollapse (state) {
      return state.isCollapse
    }
  }
})
