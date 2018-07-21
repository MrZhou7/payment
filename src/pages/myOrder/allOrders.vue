<template>
    <div id="allOrdersWrap">
      <ul class="orderBox">
        <li @click="detailOrder()" v-for="(item,index) in dataList" :key="index">
        <p class="title">官方旗舰店</p>
        <div class="data">
          <div class="pic"><img :src=item.orderDetails[0].goods.attachments[0].attachUrl alt=""></div>
          <div class="state">
            <p class="state_1">{{item.orderDetails[0].goods.goodsName}}</p>
            <p class="state_2">{{ item.memberNote}}</p>
            <p class="state_3">七天退换</p>
            <p class="money">¥{{item.orderDetails[0].goods.shopPrice | changeNumber}}</p>
          </div>
        </div>
        <button @click.stop="deleteOrder(item,index)">删除订单</button>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from "axios"
    export default {
        name: "all-orders",
      inject:['reload'],
      data(){
        return{
          dataList:[],
          index:""
        }
      },
      methods:{
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
        // cancleOrder(data, index){    //取消某项订单
        //   const msg = "您确定要取消订单吗？";
        //   if (confirm(msg)){
        //     this.axios.post('http://xds.huift.com.cn:8080/cancleOrder', {"orderId":data.orderId}/*删除传递id就可以了*/)
        //       .then(()=>{
        //         this.reload()//删除刷新
        //         console.log(data.orderId)
        //         //this.$router.go(0)
        //       })
        //   }else{
        //     return false;
        //   }
        // },
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
      },
      filters:{  //过滤价格
        changeNumber(num){
          if(num){
            num = num.toString();
            let result = [];
            if(num.length == 2){
              num = '0.' + num;
              result = num;
            }else if(num.length == 1){
              num = '0.0' + num;
              result = num;
            }else{
              for(let i=0;i<num.length;i++){
                result = result + num.charAt(i);
                if(i==num.length-3){
                  result = result + '.';
                }
              }
            }
            return result;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  #allOrdersWrap{
    .orderBox{
      li{overflow: hidden;margin-top: .3rem;border-bottom:solid 1px(rgba(181,181,181,0.3));}
      button{
        display: block;
        float: right;
        margin-left: .5rem;
        width: 2rem;
        height: .8rem;
        border-radius: 1rem;
        border: none;
        color: red;
      }
      .title{padding:.2rem 1.65rem;font-size:.4rem;background:#fff;border-bottom:solid 1px(rgba(181,181,181,0.3));}
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
  }
</style>
