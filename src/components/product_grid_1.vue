<template>
  <view class='wm-goods-list'>
    <van-row gutter='20'>
      <van-col span='12' v-for='(item, index) in list' :key='index'>
        <navigator :url='item.url' hover-class='none'>
          <image mode='aspectFit' class='wm-goods-list-img' :src='item.images' alt='goods_images'></image>
          <view class='line-height-14 font-size-12 text-center'>{{ item['goods_name'] }}</view>
          <view class='wm-goods-list-price line-height-14 font-size-12 text-center'>￥{{ item['price'] }}</view>
        </navigator>
      </van-col>
    </van-row>
  </view>
</template>

<script>
  import $ajax from '../http/index'
  import api from '../http/api'
  import { formatPrice } from '../utils/index'

  export default {
    name: 'product_grid_1',
    data () {
      return {
        list: [],
        total_num: 0
      }
    },
    methods: {
      async getGoodsList () {
        let params = {
          page_index: 1,
          page_size: 10
        }
        let res = await $ajax({
          url: api.goods_list,
          data: params
        })
        if (res.code === 0) {
          let list = res.data.list
          list.map((item) => {
            item['url'] = `/pages/product/main?goods_id=${item['goods_id']}`
            item['min_price'] === item['max_price'] ? (item.price = formatPrice(item['min_price'])) : (item.price = `${formatPrice(item['min_price'])}~${formatPrice(item['max_price'])}`)
          })
          this.list = list.length ? list : []
          this.total_num = res.data.total_num
        }
      }
    },
    mounted () {
      this.getGoodsList()
    }
  }
</script>

<style scoped lang='less'>
  .wm-goods-list {
    padding: 10px;
    color: #5b5b5b;

    &-img {
      width: 100%;
      object-fit: contain;
      height: 400 rpx;
    }

    .line-height-14 {
      line-height: 1.4;
    }

    .font-size-12 {
      font-size: 24 rpx;
    }

    .text-center {
      text-align: center;
    }

    &-price {
      color: #9b9b9b;
    }
  }
</style>
