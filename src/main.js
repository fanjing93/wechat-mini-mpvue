import Vue from 'vue'
import App from './App'
import store from './store/index'
import config from './config'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue(App)
app.$mount()
getApp().globalData = config
Vue.prototype.globalData = getApp().globalData
