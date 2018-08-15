<template>
    <div id="noPayWrap">
      <ul class="orderBox" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
  import { mapState } from 'vuex'
  import axios from "axios"
    export default {
        name: "no-pay",
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
        //     data: {"page":"1","size":"10","memberId":memberId,"orderStatus":"1"}
        //   })
        //     .then((res)=>{
        //       this.dataList = res.data.data
        //       //console.log(this.dataList)
        //     })
        //     .catch((error)=>{
        //       console.log(error)
        //     })
        // },
        getGoodsList(flag){   //瀑布流加载信息
          var memberId = window.sessionStorage.getItem('memberId')    //获取用户ID
          this.axios({
            method: 'post',
            url:this.global.allOrderList,
            data: {"page":this.page,"size":this.size,"memberId":memberId,"orderStatus":"1"}
          })
            .then((res)=>{
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
          this.busy = true;
          console.log(this.page)
          //把busy置位true，这次请求结束前不再执行
          setTimeout(() => {
            this.page++;
            this.getGoodsList(true);
            //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
          }, 500);
        },
        detailOrder(data, index){
          this.$router.push({
            path:'/myOrderDetail',
            query:{
              newOrderId:data.orderId  //传当前订单id到订单详情
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
            this.axios.post(this.global.deleteOrder, {"orderId":data.orderId}/*删除传递id就可以了*/)
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
        //this.getOrderList()  //获取订单列表
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
