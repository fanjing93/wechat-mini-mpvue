<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from './store/mutation-types'
  import $ajax from './http/index'
  import api from './http/api'

  export default {
    data: {
      login_promise: null,
      get_theme_promise: null,
      color_map: {
        '#fff': 'black',
        '#000': 'black',
        '#3da2e0': 'blue',
        '#a664c0': 'purple',
        '#ea3f3f': 'red',
        '#d29b6b': 'brown',
        '#18aa91': 'green',
        '#a0afaf': 'light_green',
        '#6FB33F': 'ba_green'
      }
    },
    computed: {
      ...mapState([
        'openId',
        'shopId',
        'buyerId',
        'channel',
        'navigatorBg',
        'frontColor',
        'navigator_color',
        'navigator_icon',
        'btn_color'
      ])
    },
    methods: {
      ...mapMutations({
        setOpenId: types.SET_OPEN_ID,
        setBuyerId: types.SET_BUYER_ID,
        setChannel: types.SET_CHANNEL,
        setNavigatorBg: types.SET_NAVIGATOR_BG,
        setFrontColor: types.SET_FRONT_COLOR,
        setNavigatorColor: types.SET_NAVIGATOR_COLOR,
        setNavigatorIcon: types.SET_NAVIGATOR_ICON,
        setBthColor: types.SET_BTH_COLOR
      }),
      async login () {
        return new Promise((resolve, reject) => {
          wx.login({
            success: data => {
              resolve(data)
            },
            fail: data => {
              reject(data)
            }
          })
        })
      },
      async getToken (code) {
        return new Promise((resolve, reject) => {
          $ajax({
            url: api.mini_app_code_create,
            data: {
              'code': code,
              'shop_id': this.shopId
            },
            noToken: true,
            noLoading: true,
            method: 'post',
            success: res => {
              resolve(res)
            },
            fail: res => {
              reject(res)
            },
            complete: function (res) {

            }
          })
        })
      },
      // 拆分wx.login，结构更清晰
      async do_login (isLogin = false) {
        return new Promise(async (resolve, reject) => {
          if (!isLogin) {
            let login = await this.login()
            if (login.code) {
              let res = await this.getToken(login.code)
              if (res.code === 0) {
                wx.setStorageSync('buyer_token', res.data.buyer_token)
                wx.setStorageSync('buyer_id', res.data['buyer_id'])
                this.setBuyerId(res.data['buyer_id'])
              }
            } else {
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: '已登录',
              icon: 'none'
            })
          }
        })
      },
      async do_after_login () {
        return this.login_promise
      },
      async getTheme () {
        let res = await $ajax({
          url: api.query_theme,
          method: 'get',
          noToken: true,
          data: {
            scene_type: 1
          }
        })
        if (res.code === 0) {
          let settingContent = JSON.parse(res.data['theme'].config) || {}
          this.setNavigatorBg(settingContent['contentColor'] || '#FFFFFF')
          this.setFrontColor(settingContent['contentColor'] === '#fff' ? '#000000' : '#ffffff')
          this.setNavigatorColor(settingContent['contentColor'] === '#fff' ? '#000000' : settingContent['contentColor'])
          this.setNavigatorIcon(this.color_map[settingContent['contentColor']] || 'red')
          this.setBthColor({
            primary_1: settingContent['contentColor'],
            primary_2: 'rgba(103,174,131,1)',
            light_grey: 'rgba(180,180,180,0.5)',
            red: '#F15251'
          })
          wx.setStorageSync('shop_name', res.data['shop']['shop_name'] || '')
        }
      },
      async do_after_get_theme () {
        return this.get_theme_promise
      }
    },
    onLaunch () {
      console.log(this)
      this.login_promise = this.do_login()
      this.get_theme_promise = this.getTheme()
    },
    onShow: function (options) {
      if (options.query && options.query.channel) {
        console.log('渠道：' + options.query.channel)
        this.setChannel(options.query.channel)
      }
      // 检测用户一段时间没使用小程序后的session是否有效
      let userUid = wx.getStorageSync('buyer_id')
      if (!userUid) {
        this.login_promise = this.do_login()
      }
      wx.checkSession({
        success: res => {
          // session 未过期，并且在本生命周期一直有效
          console.log('session未过期')
        },
        fail: res => {
          // 登录态过期
          console.log('登录态过期')
          this.login_promise = this.do_login()
        }
      })
    }
  }
</script>
