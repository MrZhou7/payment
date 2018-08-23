<template>
    <div id="myOrderWrap">
      <HeaderA title="我的订单">
        <span slot="back_1" class="back_1" @click="back()"></span>
      </HeaderA>
      <div class="navBox">
        <span>
          <router-link to="/myOrder/allOrders">全部</router-link>
        </span>
        <span>
          <router-link to="/myOrder/noPay">待付款</router-link>
        </span>
        <span>
          <router-link to="/myOrder/noSend">待发货</router-link>
        </span>
        <span>
          <router-link to="/myOrder/shipped">已发货</router-link>
        </span>
        <span>
          <router-link to="/myOrder/complete">完成</router-link>
        </span>
        <!--<span class="underBorder"></span>-->
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
  import HeaderA from  "../components/header/Header"
  import {mapState} from 'vuex'
  import store from "../store/index"
    export default {
        name: "my-order",
      components:{
        HeaderA
      },
      store:store,
      computed:mapState(["showNum"]),
      methods:{
        back(){
          if(this.showNum==2){
            this.$router.push({path:'/mine'})
          }else if(this.showNum==1){
            this.$router.go(-1)
          }
        }
      }
    }
</script>

<style scoped lang="less">
  .navBox{
    border-bottom:solid 5px #f4f4f4;
    margin-top:44px;
    background: #ffffff;
    display: flex;
    position:relative;
    span{
      flex:1;text-align:center;
      a{text-decoration:none;font-size:14px;color:#666666;line-height:44px;}
      .router-link-exact-active{
        color:#Fe702f;
        border-bottom: 3px solid #Fe702f;
        padding-bottom: 10px;
      }
    }
    /*.underBorder{
      position:absolute;height:4px;width:20%;border-top: 4px solid #Fe702f;
      top:1rem;transition: left .2s ease-in-out 0s;}
    .move1~ .underBorder{left:0;color:#Fe702f;}
    .move2~ .underBorder{left:20%;color:#Fe702f;}
    .move3~ .underBorder{left:40%;color:#Fe702f;}
    .move4~ .underBorder{left:60%;color:#Fe702f;}
    .move5~ .underBorder{left:80%;color:#Fe702f;}
    .move1 a,.move2 a,.move3 a,.move4 a,.move5 a{color:#Fe702f;}*/
  }
</style>
