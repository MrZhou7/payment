<template>
    <div id="allOrdersWrap">
      <ul class="orderBox" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <li v-for="(item,index) in dataList" :key="index">
        <p class="title">官方旗舰店</p>
        <div class="data" @click="detailOrder(item,index)">
          <div class="pic"><img :src=item.attachUrl alt=""></div>
          <div class="state">
            <p class="state_1">{{item.goodsName}}</p>
            <!--<p class="state_2">{{ item.goodsContent}}</p>-->
            <p class="state_3">七天退换</p>
            <p class="money">¥{{item.shopPrice | changeNumber}}<span>X{{item.goodsNum}}</span></p>
          </div>
        </div>
        <div class="totalaAll">
          <div class="totalmoney">共 {{item.goodsNum}} 件商品 &nbsp;实付：<span>¥{{item.totalAmount | changeNumber}}</span></div>
          <div class="totalBtn">
            <button class="btn1">确认收货</button>
            <button class="btn2">查看物流</button>
            <button class="btn3" @click.stop="deleteOrder(item,index)">删除订单</button>
          </div>
        </div>
        </li>
      </ul>
    </div>
</template>

<script>
  import axios from "axios"
  import { mapState } from 'vuex'
    export default {
        name: "all-orders",
      inject:['reload'],
      data(){
        return{
          dataList:[],  //订单列表数据
          busy: false, //是否正在加载过程中
          page:0, //默认分页为第一页
          size:10, //默认每页显示10条数据
          flag:false //默认没有分页
        }
      },
      computed:{
        ...mapState(["global"])
      },
      methods:{
        // getOrderList(){   //获取订单列表
        //   var memberId = window.localStorage.getItem('memberId')    //获取用户ID
        //   this.axios({
        //     method: 'post',
        //     url:'http://xds.huift.com.cn:8080/order/filter',
        //     data: {"page":"1","size":"10","memberId":memberId}
        //   })
        //     .then((res)=>{
        //       this.dataList = res.data.data
        //       //console.log(this.dataList)
        //     })
        //     .catch((error)=>{
        //       console.log(error)
        //     })
        // },
        detailOrder(data, index){
          this.$router.push({
            path:'/myOrderDetail',
            query:{
              newOrderId:data.orderId  //传当前订单id到订单详情
            }
          });
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
            this.axios.post(this.global.deleteOrder, {"orderId":data.orderId}/*删除传递id就可以了*/)
              .then(()=>{
                this.reload()//删除刷新
                //console.log(data.orderId)
              })
          }else{
            return false;
          }
        },
        getGoodsList(flag){   //瀑布流加载信息
          let memberId = window.sessionStorage.getItem('memberId')    //获取用户ID
          this.axios({
                method: 'post',
                url:this.global.allOrderList,
                data: {"page":this.page,"size":this.size,"memberId":memberId}
              })
                .then((res)=>{
                  console.log(res)
                  if(flag){   //获取商品列表
                    this.dataList = this.dataList.concat(res.data.data);
                    if(this.dataList.length === 0){
                      this.busy = true;
                    }else{
                      this.busy = false;
                    }
                  }else{
                    // 第一次加载数据
                    this.dataList = res.data.data
                    // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
                    this.busy = false;
                  }
                })
              },
        loadMore() {
          this.page++;
          this.busy = true;
          console.log(this.page)
          //把busy置位true，这次请求结束前不再执行
          setTimeout(() => {
            this.getGoodsList(true);
            //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
          }, 500);
          this.busy = false;
        }
      },
      mounted(){
        //this.getOrderList()  //获取订单列表
      }
    }
</script>

<style scoped lang="less">
  #allOrdersWrap{
    .orderBox{
      li{overflow: hidden;margin-bottom:5px;}
      .title{padding:0 20px;font-size:12px;background:#fff;color:#333333;line-height: 56px;}
      .data{
        display:flex;
        .pic{
          flex:2;padding:6px 12px 24px 12px;
          img{width:100%;height: 94px;}
        }
        .state{
          flex:5; margin-top:8px;padding-right: .2rem;
          .state_1{font-size:12px;color:#333333;overflow: hidden;text-overflow: ellipsis;line-height: .5rem;max-height: 1rem;}
          .state_2{color:#999;font-size: 0.3rem;}
          .state_3{color: #f9dfb3;padding:12px 0;font-size:12px;}
          .money{flex:2;font-weight: bolder;color: #fe702f;margin-top:0.2rem;font-size:16px;overflow:hidden;
            span{float:right;font-size:12px;color:#585858;}
          }
        }
      }
      .totalaAll{
        background-color: #fff;
        .totalmoney{
          font-size:12px;
          text-align: right;
          padding:0 12px;
          line-height:35px;
          color: #333333;
          border-bottom:1px solid #dfdfdf;
          span{color: #fe702f;font-size:16px;}
        }
        .totalBtn{
          overflow:hidden;padding:12px;
          button{width:66px;height:22px;line-height:22px;text-align:center;float:right;font-size:12px;
            border:1px solid #eee;outline: none;display: block;}
          .btn2{color:#333333;background-color: #fff;margin-right:15px;}
          .btn1{color:#fff;background-color: #ff5d00;}
          .btn3{color: red;background-color: #fff;margin-right:15px;}
        }
      }
    }
  }
</style>
