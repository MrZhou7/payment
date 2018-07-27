<template>
    <div id="noPayWrap">
      <ul class="orderBox">
        <li @click="detailOrder(item,index)" v-for="(item,index) in dataList" :key="index">
          <p class="title">官方旗舰店</p>
          <div class="data">
            <div class="pic"><img :src=item.attachUrl alt=""></div>
            <div class="state">
              <p class="state_1">{{item.goodsName}}</p>
              <!--<p class="state_2">{{ item.goodsContent}}</p>-->
              <p class="state_3">七天退换</p>
              <p class="money">¥{{item.shopPrice | changeNumber}}</p>
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
        name: "no-pay",
      data(){
        return{
          dataList:[]  //订单列表数据
        }
      },
      methods:{
        getOrderList(){   //获取订单列表
          var memberId = window.localStorage.getItem('memberId')    //获取用户ID
          this.axios({
            method: 'post',
            url:'http://xds.huift.com.cn:8080/order/filter',
            data: {"page":"1","size":"10","memberId":memberId,"orderStatus":"1"}
          })
            .then((res)=>{
              this.dataList = res.data.data
              //console.log(this.dataList)
            })
            .catch((error)=>{
              console.log(error)
            })
        },
        detailOrder(data, index){
          this.$router.push({
            path:'/myOrderDetail',
            name:'MyOrderDetail',
            params:{
              newOrderId:data.orderId   //传当前订单id到订单详情
            }
          })
          //console.log(data.orderId)
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
                //console.log(data.orderId)
              })
          }else{
            return false;
          }
        }
      },
      mounted(){
        this.getOrderList()  //获取订单列表
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
  #noPayWrap{
  .orderBox{
  li{overflow: hidden;margin-top: .3rem;border-bottom:solid 1px(rgba(181,181,181,0.3));}
  button{
    display: block;
    float: right;
    width: 2rem;
    height: .8rem;
    border-radius: 1rem;
    outline: none;
    color: red;
    border: 1px solid red;
    background: #fff;
    margin: 0 .5rem 0.2rem .5rem;
  }
  .title{padding:.2rem 1.65rem;font-size:.4rem;background:#fff;border-bottom:solid 1px(rgba(181,181,181,0.3));}
  .data{
    display:flex;
  .pic{
    flex:3;padding:.2rem;
  img{width:100%;height: 2.7rem;}
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
