<template>
  <page class="wm-container">
    <productGrid1></productGrid1>
  </page>
</template>

<script>
  import productGrid1 from '@/components/product_grid_1'

  export default {
    data () {
      return {
      }
    },

    components: {
      productGrid1
    },

    methods: {},

    created () {

    },

    mounted () {

    }
  }
</script>

<style scoped lang="less">
  .wm-container {
    width: 100%;
    background-color: #fff;
  }
</style>
