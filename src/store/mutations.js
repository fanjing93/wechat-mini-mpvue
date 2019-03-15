import * as types from './mutation-types'

const matations = {
  /**
   * state:当前状态树
   * v: 提交matations时传的参数
   */
  [types.SET_OPEN_ID] (state, v) {
    state.openId = v
  },

  [types.SET_BUYER_ID] (state, buyerId) {
    state.buyerId = buyerId
  },

  [types.SET_CHANNEL] (state, val) {
    state.channel = val
  }

}

export default matations
