<template>
    <div id="mineWrap">
      <HeaderA title="我的"></HeaderA>
      <div class="myOrder">
        <router-link to="/myOrder/allOrders">我的订单</router-link>
      </div>
      <Nav></Nav>
    </div>
</template>

<script>
  import Nav from "../components/nav/nav"
  import HeaderA from  "../components/header/Header"
    export default {
        name: "mine",
      components:{
          Nav,HeaderA
      }
    }
</script>

<style scoped lang="less">
 #mineWrap{
   .myOrder{margin-top: 1.2rem;
     & > a{
       font-size :0.5rem;
       text-decoration: none;
       color:black;
       border:solid 1px(rgba(181,181,181,0.3));
       display:block;
       padding: .2rem;
     }
   }
 }
</style>
