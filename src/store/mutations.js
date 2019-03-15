import * as types from './mutation-types'

const matations = {
  /**
   * state:当前状态树
   * val: 提交matations时传的参数
   */

  [types.SET_BUYER_ID] (state, val) {
    state.buyerId = val
  },

  [types.SET_CHANNEL] (state, val) {
    state.channel = val
  },

  [types.SET_NAVIGATOR_BG] (state, val) {
    state.navigatorBg = val
  },

  [types.SET_FRONT_COLOR] (state, val) {
    state.frontColor = val
  },

  [types.SET_NAVIGATOR_COLOR] (state, val) {
    state.navigator_color = val
  },

  [types.SET_NAVIGATOR_ICON] (state, val) {
    state.navigator_icon = val
  },

  [types.SET_BTH_COLOR] (state, val) {
    state.bth_color = val
  }
}

export default matations
