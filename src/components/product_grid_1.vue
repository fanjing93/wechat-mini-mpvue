<template>
  <ul class="wm-product-list-1">
    <li class="wm-product-list-1-item">
        333
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'product_grid_1'
  }
</script>

<style scoped lang="less">
  .wm-product-list-1 {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    &-item {
      width: 50%;
    }
  }
</style>
