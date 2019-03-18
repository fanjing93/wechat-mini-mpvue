<template>
  <div class="wm-container">
    <productGrid></productGrid>
  </div>
</template>

<script>
  import productGrid from '../../components/product_grid_1'

  export default {
    components: {
      productGrid
    }
  }
</script>

<style scoped lang="less">
  .wm-container {
    width: 100%;
    background-color: #fff;
  }
</style>
