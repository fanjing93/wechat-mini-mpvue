import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

// 引入vuex-persistedstate，将vuex的数据持久化到本地
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => wx.clearStorageSync()
      }
    })
  ]
})
