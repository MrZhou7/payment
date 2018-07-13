<template>
   <div id="orderDetailWrap">
     <div id="detailWrap">
       <p class="title">JORDAN官方旗舰店</p>
       <div class="data">
         <div class="pic"><img src="" alt=""></div>
         <div class="state">
           <p class="state_1">{{}}</p>
           <p class="state_2">颜色分类:001黑/火焰红-水泥灰-白;鞋码:41;</p>
           <p class="state_3">七天退换</p>
           <p class="money">{{}}</p>
         </div>
       </div>
       <button @click="cancleOrder">取消订单</button>
       <button @click="deleteOrder">删除订单</button>
     </div>
   </div>
</template>

<script>
    export default {
        name: "order-detail",
      methods:{
        cancleOrder(){
          this.axios({
            method:'post',
            url:'http://xds.huift.com.cn/cancleOrder',
            data:{"orderId":1}
          })
            .then((res)=>{
              console.log(res)
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        deleteOrder(){

        },
        getList(){

        }
      },
      mounted(){
          this.getList()
      }
    }
</script>

<style scoped lang="less">
  #detailWrap{
    margin-top:.2rem;
  .title{padding:.2rem 1.65rem;font-size:.4rem;background:#fff;}
  .data{
    display:flex;
  .pic{
    flex:3;padding:.2rem;
  img{width:100%;}
  }
  .state{
    flex:5; margin-top:0.2rem;padding-right: .2rem;
  .state_1{font-size:.4rem;}
  .state_2{color:#999;font-size: 0.3rem;}
  .state_3{color: #ff0036;padding: 0 3px;font-size: 0.3rem;}
  .money{flex:2;font-weight: bolder;color: #ff0036;margin-top:0.2rem;font-size:.4rem;}
  }
  }
  }
</style>
