<template>
  <div id="ordersWrap">
    <headerA title="确认订单"></headerA>
    <div class="ordersWrap">
      <addressA consignee="周云" phone="13871435839" address_1="光谷街20号康桥小区">
        <img src="../assets/img/address.png" alt="" slot="pic_2">
      </addressA>
      <detailsA title="JORDAN官方旗舰店" state_1="AN 3 RETRO OG AJ3复刻男子篮球运动鞋854262"
                state_2="001黑/火焰红-水泥灰-白" state_3="43" price_2="1399.00">
        <img src="../assets/img/aj3.jpg" alt="" slot="pic_3">
      </detailsA>
      <contentA></contentA>
      <SubmitA numberA="1" totlePrice="1399.00"></SubmitA>
    </div>
  </div>
</template>

<script>
  import headerA from '../components/header/HeaderA.vue'
  import addressA from '../components/address/addressA.vue'
  import detailsA from '../components/goods/detailsA'
  import contentA from '../components/content/contentA'
  import SubmitA from '../components/submit/submitA'
    export default {
        name: "orders",
      components:{
        headerA,addressA,detailsA,contentA,SubmitA
      }
    }
</script>

<style scoped>
#ordersWrap{background-color: #eee;}
.ordersWrap{overflow: hidden;margin-top: 1.2rem;margin-bottom: 1.42rem;}
</style>
