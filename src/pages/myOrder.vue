<template>
    <div id="myOrderWrap">
      <HeaderA title="我的订单">
        <a href="#" slot="back_1" class="back_1" @click="back"></a>
      </HeaderA>
      <ul class="orderBox">
        <li @click="detailOrder()">

        </li>
      </ul>
    </div>
</template>

<script>
  import axios from "axios"
  import HeaderA from  "../components/header/Header"
    export default {
        name: "my-order",
      components:{
        HeaderA
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        getOrderList(){
          this.axios({
            method: 'post',
            url:'http://xds.huift.com.cn/order/member',
            data: {"memberId":1}
          })
            .then((res)=>{
              console.log(res.data)
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        detailOrder(){}
      },
      mounted(){
          this.getOrderList()
      }
    }
</script>

<style scoped>

</style>
