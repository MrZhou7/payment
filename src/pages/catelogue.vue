<template>
  <div id="catelogue">
    <Header1 title="商品列表"></Header1>
  </div>
</template>

<script>
  import Header1 from '../components/header/Header1'
  import Goods from '../components/goods/goods'
    export default {
        name: "catelogue",
      components:{
        Header1,Goods
      }

    }
</script>

<style scoped>

</style>
