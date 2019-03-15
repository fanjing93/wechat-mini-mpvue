<script>
  export default {
    data: {
      code: ''
    },
    created () {
      // 调用API从本地缓存中获取数据
      /*
       * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
       * 微信：mpvue === wx, mpvuePlatform === 'wx'
       * 头条：mpvue === tt, mpvuePlatform === 'tt'
       * 百度：mpvue === swan, mpvuePlatform === 'swan'
       * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
       */
      console.log()
      let logs
      if (mpvuePlatform === 'my') {
        logs = mpvue.getStorageSync({ key: 'logs' }).data || []
        logs.unshift(Date.now())
        mpvue.setStorageSync({
          key: 'logs',
          data: logs
        })
      } else {
        logs = mpvue.getStorageSync('logs') || []
        logs.unshift(Date.now())
        mpvue.setStorageSync('logs', logs)
      }
    },
    mounted () {
      wx.login({
        success: res => {
          console.log(this)
          if (res.code) {
            this.code = res.code
          } else {
            wx.showToast({
              title: '登陆失败',
              icon: 'none'
            })
          }
        }
      })
    },
    log () {
      console.log(`log at:${Date.now()}`)
    }
  }
</script>

<style lang="less">
  page {
    min-height: 100%;
  }
</style>
