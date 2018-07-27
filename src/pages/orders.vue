<template>
  <div id="ordersWrap">
    <headerA title="确认订单">
      <span slot="back_1" class="back_1" @click="back()"></span>
    </headerA>
    <div class="ordersWrap">
      <div id="address_1" @click="goAddress">
        <div class="add_pic"><img src="../assets/img/address.png" alt=""></div>
        <div class="add_detail" v-if="!isShow">
          <p class="choiseAdd">请选择收货地址</p>
        </div>
        <div class="add_detail" v-if="isShow">
          <ul class="list">
            <li class="item" v-for="(item,index) in addressList" :key="index" v-if="index==indexNum">
              <p class="section">
                <span class="consignee">收货人:<span ref="userConsignee">{{item.consignee}}</span></span>
                <span class="phone">联系电话:<span ref="userMobile">{{item.mobile}}</span></span>
              </p>
              <p v-if="item.province === itemCity.id" v-for="(itemCity,cityIndex) in citys" :key="cityIndex">
                <span>收货地址:{{itemCity.name}}</span>
                <span v-if="item.city === districtItem.id" v-for="(districtItem,districtIndex) in itemCity.city" :key="districtIndex" ref="userAddress">
                    {{ districtItem.name }}
                  <span v-if="item.district === countyItem.id" v-for="(countyItem,countyIndex) in districtItem.district" :key="countyIndex">
                    {{ countyItem.name }}
                    <span>
                      {{ item.location }}
                    </span>
                  </span>
                </span>
              </p>
            </li>
          </ul>
          <span>(收货不便时,可选择免费代收货服务)</span>
        </div>
      </div>
      <div id="detailWrap">
        <p class="title">官方旗舰店</p>
        <div class="data">
          <div class="pic"><img :src="pic.attachUrl" alt=""></div>
          <div class="state">
            <p class="state_1">{{dataList.goodsName}}</p>
            <p class="state_2">颜色分类:001黑/火焰红-水泥灰-白;鞋码:41;</p>
            <p class="state_3">七天退换</p>
            <p class="money">¥{{dataList.shopPrice | changeNumber}}</p>
          </div>
        </div>
      </div>
      <div id="contentWrap">
        <div class="m-cell">购买数量
          <div class="cell-right">
            <div class="reduce" :class="{'reduce-disabled':shopNum<2}" @click="$store.commit('reduce')">-</div>
            <span class="shopNum">{{ shopNum }}</span>
            <div class="add" @click="$store.commit('add')">+</div>
          </div>
        </div>
        <div class="m-cell">配送方式
          <span class="expressage">快递 免邮</span>
        </div>
      </div>
      <div id="submitWrap">
        <button class="bol" @click="subOrder()">提交订单</button>
        <span slot="totlePrice">共<mark>{{shopNum}}</mark>件,总金额 <mark>¥{{dataList.shopPrice*shopNum | changeNumber}}</mark></span>
      </div>
    </div>
  </div>
</template>

<script>
  import headerA from '../components/header/Header.vue'
  import {newList} from '../api/api'
  import axios from "axios"
  import store from "../store/index"
  import cityData from '../../static/city'
    export default {
        name: "orders",
        inject:['reload'],
        components:{
          headerA
        },
        store:store,
        data(){
          return{
            addressList:[],    //地址列表数据
            info: [],  //地址信息
            citys:[],
            indexNum:0,
            num:'',
            isShow:true,  //控制显示地址栏的状态信息
            dataList:[],  //商品列表数据
            pic:"",  //获取的图片路径
            paydata: {},
            isPay: 0, // 判断支付的状态做出各种操作，0-刚进入不做任何操作，点击物理返回键/触发支付行为后取消支付-需要取消订单后直接返回，1-，2-默认，不做出任何操作
            fanhuiData:"",  //第一次返回的数据
            nowUrl:"", //获取当前的url
            //newUrl:"",  //获取的openid
            shopNumber:this.$store.state.num  //商品数量
          }
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
        },
        computed: {
          shopNum() {   //vuex数据
            return this.$store.state.num
            this.shopNumber = this.$store.state.num
          }
        },
        methods: {
          back(){
            this.$router.push({path:'/details'})
          },
          goTo(){   //跳转页面
            this.$router.push({
              path:'myOrderDetail',
              name:'MyOrderDetail',
              params:{
                newOrderId:this.dataList.goodsId
              }
            })
          },
          subOrder(){   //调支付
            //console.log(this.addressList[this.indexNum].city)
            // console.log(this.$refs.userAddress)
            // console.log(this.$refs.userConsignee)
            // console.log(this.$refs.userMobile)
            if(this.$refs.userAddress !==undefined || this.$refs.userConsignee !==undefined || this.$refs.userMobile !==undefined){
              let postData = {"order":{"member":{"memberId":1},
                  "address":this.addressList[this.indexNum].location,"mobile":this.addressList[this.indexNum].mobile,"consignee":this.addressList[this.indexNum].consignee,
                  "province":this.addressList[this.indexNum].province,"city":this.addressList[this.indexNum].city,"district":this.addressList[this.indexNum].district,"memberNote":"加个鸭蛋"},
                "orderDetail":{"goods":{"goodsId":this.dataList.goodsId},"goodsNum":this.$store.state.num}
              };
              //console.log(postData)
              axios.post('http://xds.huift.com.cn:8080/order',postData)
                .then(res => {
                  //console.log(res.data)  //post 成功，response.data 为返回的数据
                  this.fanhuiData = res.data.data.OrderId
                  this.axios({
                    method: 'post',
                    url: 'http://xds.huift.com.cn:8080/wechat/pay-config',
                    data: {"orderId":this.fanhuiData,"amount":"20","openId":"oboBC0aTWv174jQcRzsqXfZN2YyQl"}
                  })
                    .then((res)=>{
                      //console.log(res)
                      this.paydata = res.data;
                      this.callpay();
                    })
                })
            }else{
              alert("请完善地址信息")
            }
          },
          goAddress(){    //跳转到地址页面
            this.$router.push({ath:"/address",name:'Address'})
          },
          getCity(){    //获取后台数据遍历，并且判断数据数据长度，控制显示隐藏切换
            var memberId = window.localStorage.getItem('memberId')    //获取用户ID
            this.axios({
              method: 'post',
              url: 'http://xds.huift.com.cn:8080/address/Id',
              data: {"memberId":memberId}
            }).then((res)=>{
              //console.log(res);
              this.addressList = res.data.data;
              //console.log(this.addressList);
              this.info = cityData.cityData
              this.$set(this.addressList,'citys',this.info);
              this.citys = this.addressList.citys;
              //console.log(this.citys, 'citys');
              //console.log(this.addressList.length)
              if(this.addressList.length > 0){  //控制显示隐藏切换
                this.isShow = true
                this.num = this.$route.params.index  //接收传递过来的数据数组索引
                if(this.num === "" || this.num === undefined){
                  for(var i =0;i<this.addressList.length;i++){
                    if(this.addressList[i].default){
                      this.indexNum = i
                    }
                  }
                }else{
                  this.indexNum = this.num
                }
              }else{
                this.isShow = false
              }
            })
          },
          getData(){
            let shopId = window.localStorage.getItem('shopId')  //获取本地的商品列表的当前商品索引号
            //console.log(shopId)
            let params = {};
            newList(params).then(res=>{
              this.dataList = res.data.content[shopId]
              this.pic = res.data.content[shopId].attachments[0];
              //console.log(this.dataList)
            })
          },
          jsApiCall() {    //调用微信支付
            let that = this;
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              this.paydata,
              function(res) {
                if (res.err_msg) {
                  if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                    that.isPay = 0;
                    that.reload();
                  }else{
                    that.isPay = 1;
                    that.goTo();
                    //window.location = that.clickurl;
                  }
                }
              }
            );
          },
          callpay(){   //兼容处理
            if (typeof WeixinJSBridge === 'undefined') {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', this.jsApiCall);
                document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
              }
            } else {
              this.jsApiCall();
            }
          },
          /*GetRequest() {  //获取当前openid
            this.nowUrl = window.location.href //获取url中"?"符后的字串
            //console.log(this.nowUrl)
            if (this.nowUrl.indexOf("?") != -1){
              var str = this.nowUrl.indexOf("=")
              var end = this.nowUrl.indexOf("&")
              //console.log(str)
              //console.log(end)
              this.newUrl = this.nowUrl.substring(str+1,end)
              //console.log(this.newUrl)
            }
          }*/
        },
        created(){
          this.getData()   //获取商品信息
          this.getCity()   //获取地址数据
          //this.GetRequest()  //获取当前openid
        },
        watch:{
          '$route':'getData'
        }
    }
</script>

<style scoped lang="less">
#ordersWrap{background-color: #eee;}
.ordersWrap{overflow: hidden;margin-top: 1.2rem;margin-bottom: 1.42rem;}
#contentWrap{
  width: 100%;background: #fff;
  .m-cell{
    height: 1rem;
    line-height:1rem;
    -webkit-box-align: center;
    padding: .2rem;
    border-bottom: 0.026667rem solid #ddd;
    font-size: 0.4rem;
    overflow:hidden;
    .cell-right{
      float:right;
      .shopNum{
        width: 1rem;
        display: inline-block;
        text-align: center;
      }
      .reduce{
        display:inline;
        width:0.5rem;
        height:0.5rem;
        line-height:0.5rem;
        font-size:0.4rem;
        padding:0.1rem 0.38rem;
        border:1px solid #f64f48;
        border-radius:10%}
      .reduce-disabled{
        border-color:#cecece;}
      .add{
        display:inline;
        width:0.5rem;
        height:0.5rem;
        font-size:0.4rem;
        padding:0.1rem 0.3rem;
        border:1px solid #f64f48;
        border-radius:10%;}
    }
    .expressage{
      display: inline-block;
      float: right;
      color: #999;
    }
  }
}
#submitWrap{
  position:fixed;bottom:0;width:100%;background:#fff;
  button{
    text-decoration:none;
    color:white;
    background:#f64f48;
    padding:.4rem;
    font-size:.45rem;
    border: none;
    float:right;}
  .btn{
    width: 100%;}
  span{
    float:right;
    margin-right: 9px;
    color:#87837E;
    font-size:.4rem;
    padding:.4rem .2rem .4rem .4rem;
    mark{
      color:#ff0036;
      background:none;
      display: inline-block;}
  }
}
#address_1{
  width:100%;
  display:flex;
  background-color: #fff;
  box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
  color: #666;
  .add_pic{
    flex:2;
    position: relative;
    img{width: 65%;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);}
  }
  .add_detail{
    flex:9;padding: 0.5rem 0.5rem 0.3rem 0;
    p{line-height:0.6rem;font-size:.4rem;overflow:hidden;}
    .consignee{float:left;}
    .phone{float:right;}
    &>span{display: block;font-size:.3rem;line-height:0.6rem;color:#FFA800;}
  }
}
#detailWrap{
  margin-top:.2rem;
  .title{padding:.2rem 1.65rem;font-size:.4rem;background:#fff;}
  .data{
    display:flex;
    .pic{
      flex:3;padding:.2rem;
      img{width:100%;height: 2.7rem;}
    }
    .state{
      flex:5; margin-top:0.2rem;padding-right: .2rem;
      .state_1{font-size:.4rem;overflow: hidden;text-overflow: ellipsis;line-height: .5rem;max-height: 1rem;}
      .state_2{color:#999;font-size: 0.3rem;}
      .state_3{color: #ff0036;padding: 0 3px;font-size: 0.3rem;}
      .money{flex:2;font-weight: bolder;color: #ff0036;margin-top:0.2rem;font-size:.4rem;}
    }
  }
}
</style>
