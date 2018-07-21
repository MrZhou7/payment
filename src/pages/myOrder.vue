<template>
    <div id="myOrderWrap">
      <HeaderA title="我的订单">
        <a href="#" slot="back_1" class="back_1" @click="back()"></a>
      </HeaderA>
      <div class="navBox">
        <span :class="{active:nowIndex==0}" @click="nowIndex=0">
          <router-link to="/myOrder/allOrders">全部</router-link>
        </span>
        <span :class="{active:nowIndex==1}" @click="nowIndex=1">
          <router-link to="/myOrder/noPay">代付款</router-link>
        </span>
        <span :class="{active:nowIndex==2}" @click="nowIndex=2">
          <router-link to="/myOrder/noSend">代发货</router-link>
        </span>
        <span :class="{active:nowIndex==3}" @click="nowIndex=3">
          <router-link to="/myOrder/noGood">待收货</router-link>
        </span>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import HeaderA from  "../components/header/Header"
    export default {
        name: "my-order",
      components:{
        HeaderA
      },
      data(){
        return{
          nowIndex:0
        }
      },
      methods:{
        back(){
          this.$router.push({path:'/mine'})
        }
      }
    }
</script>

<style scoped lang="less">
  .navBox{
    border-bottom:solid 10px(rgba(181,181,181,0.3));
    margin-top:1.2rem;
    display: flex;
    span{
      flex:1;text-align:center;margin: 0.3rem 0;
      a{
        text-decoration:none;
        font-size: .4rem;
        color:#141414;
      }
    }
    .active a{border-bottom: 3px solid #FF6600;color:#FF6600;}
  }
</style>
