<template>
    <div id="myOrderWrap">
      <HeaderA title="我的订单">
        <span slot="back_1" class="back_1" @click="back()"></span>
      </HeaderA>
      <div class="navBox">
        <span :class="{move1:nowIndex==0}" @click="nowIndex=0">
          <router-link to="/myOrder/allOrders">全部</router-link>
        </span>
        <span :class="{move2:nowIndex==1}" @click="nowIndex=1">
          <router-link to="/myOrder/noPay">待付款</router-link>
        </span>
        <span :class="{move3:nowIndex==2}" @click="nowIndex=2">
          <router-link to="/myOrder/noSend">待发货</router-link>
        </span>
        <span :class="{move4:nowIndex==3}" @click="nowIndex=3">
          <router-link to="/myOrder/shipped">已发货</router-link>
        </span>
        <span :class="{move5:nowIndex==4}" @click="nowIndex=4">
          <router-link to="/myOrder/complete">完成</router-link>
        </span>
        <span class="underBorder"></span>
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
    border-bottom:solid 10px (rgba(181,181,181,0.3));
    margin-top:1.2rem;
    display: flex;
    position:relative;
    span{
      flex:1;text-align:center;
      a{text-decoration:none;font-size: .4rem;color:#141414;line-height: 1.3rem;}
    }
    .underBorder{
      position:absolute;height:4px;width:20%;
      border-top: 4px solid #FF6600;top:1rem;transition: left .2s ease-in-out 0s;}
    .move1~ .underBorder{left:0;color:#FF6600;}
    .move2~ .underBorder{left:20%;color:#FF6600;}
    .move3~ .underBorder{left:40%;color:#FF6600;}
    .move4~ .underBorder{left:60%;color:#FF6600;}
    .move5~ .underBorder{left:80%;color:#FF6600;}
    .move1 a,.move2 a,.move3 a,.move4 a,.move5 a{color:#FF6600;}
  }
</style>
