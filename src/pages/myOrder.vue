<template>
    <div id="myOrderWrap">
      <HeaderA title="我的订单">
        <a href="#" slot="back_1" class="back_1" @click="back"></a>
      </HeaderA>
      <ul class="orderBox">
        <li @click="detailOrder()" v-for="(item,index) in dataList" :key="index">
          <p class="title">JORDAN官方旗舰店</p>
          <div class="data">
            <div class="pic"><img :src=item alt=""></div>
            <div class="state">
              <p class="state_1">{{item.goodsName}}</p>
              <p class="state_2">{{ item.memberNote}}</p>
              <p class="state_3">七天退换</p>
              <p class="money">{{item.shopPrice}}</p>
            </div>
          </div>
          <button @click.stop="cancleOrder(item,index)">取消订单</button>
          <button @click.stop="deleteOrder(item,index)">删除订单</button>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from "axios"
  import HeaderA from  "../components/header/Header"
    export default {
        name: "my-order",
      inject:['reload'],
      components:{
        HeaderA
      },
      data(){
        return{
          dataList:[],
          index:""
        }
      },
      methods:{
        back(){
          this.$router.back(-1)
        },
        getOrderList(){
          this.axios({
            method: 'post',
            url:'http://xds.huift.com.cn:8080/order/member',
            data: {"memberId":1}
          })
            .then((res)=>{
              this.dataList = res.data.data
              console.log(this.dataList)
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        detailOrder(){
          this.$router.push({path:'/myOrderDetail'})
        },
        cancleOrder(data, index){    //取消某项订单
          const msg = "您确定要取消订单吗？";
          if (confirm(msg)){
            this.axios.post('http://xds.huift.com.cn:8080/cancleOrder', {"orderId":data.orderId}/*删除传递id就可以了*/)
              .then(()=>{
                this.reload()//删除刷新
                console.log(data.orderId)
                //this.$router.go(0)
              })
          }else{
            return false;
          }
        },
        deleteOrder(data, index){   //删除某项订单
          const msg = "您确定要删除订单吗？";
          if (confirm(msg)){
            this.axios.post('http://xds.huift.com.cn:8080/delOrder', {"orderId":data.orderId}/*删除传递id就可以了*/)
              .then(()=>{
                this.reload()//删除刷新
                console.log(data.orderId)
                //this.$router.go(0)
              })
          }else{
            return false;
          }
        }
      },
      mounted(){
          this.getOrderList()
      }
    }
</script>

<style scoped lang="less">
  .orderBox{
    margin-top:1.2rem;
    li{overflow: hidden;}
    button{display: block;float: right;margin-left: .5rem;}
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
