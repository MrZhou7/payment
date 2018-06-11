<template>
  <div id="catelogue">
    <headerA title="商品列表"></headerA>
    <div class="shopList">
      <goods title="Jordan官方 AIR JORDAN 3 RETRO OG AJ3复刻男子篮球运动鞋854262" price="¥1399.00" sales="188">
        <img src="../assets/img/aj3.jpg" alt="" slot="pic_1">
      </goods>
      <goods title="Jordan官方AIR JORDAN 1 RETRO HIGH OG AJ1复刻篮球运动鞋555088" price="¥1299.00" sales="296">
        <img src="../assets/img/aj1.jpg" alt="" slot="pic_1">
      </goods>
      <goods title="Jordan官方AIR JORDAN 11 RETRO LOW AJ11男子篮球运动鞋 528895" price="¥1142.00" sales="1158">
        <img src="../assets/img/aj11.jpg" alt="" slot="pic_1">
      </goods>
      <goods title="Air Jordan 7 Retro AJ7 乔7 多伦多猛龙男子篮球鞋 304775-018" price="¥2099.00" sales="1">
        <img src="../assets/img/aj7.jpg" alt="" slot="pic_1">
      </goods>
    </div>
  </div>
</template>

<script>
  import headerA from '../components/header/HeaderA'
  import Goods from '../components/goods/goods'
    export default {
        name: "catelogue",
      components:{
        headerA,Goods
      }

    }
</script>

<style scoped>
.shopList{
  overflow: hidden;
  margin-top: 1.2rem;
}
</style>
