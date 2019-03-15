<script>
  import { mapState, mapMutations } from 'vuex'
  import { SET_OPEN_ID, SET_BUYER_ID, SET_CHANNEL } from './store/mutation-types'
  import $ajax from './http/index'
  import api from './http/api'

  export default {
    data: {
      login_promise: null
    },
    computed: {
      ...mapState([
        'openId',
        'shopId',
        'buyerId',
        'channel'
      ])
    },
    methods: {
      ...mapMutations({
        setOpenId: SET_OPEN_ID,
        setBuyerId: SET_BUYER_ID,
        setChannel: SET_CHANNEL
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
      }
    },
    onLaunch () {
      this.login_promise = this.do_login()
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
