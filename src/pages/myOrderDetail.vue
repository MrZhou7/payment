<template>
    <div id="myOrderDetailWrap">
      <HeaderA title="订单详情">
        <span slot="back_1" class="back_1" @click="back()"></span>
      </HeaderA>
      <div class="ordersWrap">
        <div id="address_1">
          <div class="add_pic"><img src="../assets/img/address.png" alt=""></div>
          <div class="add_detail">
            <ul class="list">
              <li class="item" v-for="(item,index) in dataList" :key="index" v-if="newOrderId===item.orderId">
                <p class="section">
                  <span class="consignee">收货人:{{item.consignee}}</span>
                  <span class="phone">联系电话:{{item.mobile}}</span>
                </p>
                <p v-if="item.province === itemCity.id" v-for="(itemCity,cityIndex) in citys" :key="cityIndex">
                  <span>收货地址:{{itemCity.name}}</span>
                  <span v-if="item.city === districtItem.id" v-for="(districtItem,districtIndex) in itemCity.city" :key="districtIndex">
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
        <div id="detailWrap" v-for="(item,index) in dataList" :key="index" v-if="newOrderId===item.orderId">
          <p class="title">JORDAN官方旗舰店</p>
          <div class="data">
            <div class="pic"><img :src="item.attachUrl" alt=""></div>
            <div class="state">
              <p class="state_1">{{item.goodsName}}</p>
              <p class="state_2">颜色分类:001黑/火焰红-水泥灰-白;鞋码:41;</p>
              <p class="state_3">七天退换</p>
              <p class="money">¥{{item.shopPrice | changeNumber}}</p>
            </div>
          </div>
          <div class="totalmoney">订单总价<span>¥{{item.totalAmount | changeNumber}}</span></div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios"
  import HeaderA from  "../components/header/Header"
    export default {
        name: "my-order-detail",
      components:{
        HeaderA
      },
      data(){
          return{
            dataList:[],  //获取后台的订单所有信息
            info: [],  //地址信息
            citys:[],
            newOrderId:"" //传过来的订单id
          }
      },
      methods:{
        back(){   //返回上一页
          this.$router.go(-1)
        },
        getOrderList(){   //获取订单详情列表
          var memberId = window.localStorage.getItem('shopId')    //获取用户ID
          this.axios({
            method: 'post',
            url:'http://xds.huift.com.cn:8080/order/member',
            data: {"memberId":memberId}
          })
            .then((res)=>{
              this.dataList = res.data.data
              //console.log(this.dataList)
              this.info = cityData.cityData
              this.$set(this.dataList,'citys',this.info);
              this.citys = this.dataList.citys;
            })
            .catch((error)=>{
              console.log(error)
            })
        }
      },
      mounted(){
        this.getOrderList();  //获取订单详情列表
        this.newOrderId = this.$route.params.newOrderId   //接受当前订单id
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
  #address_1{
    width:100%;
    display:flex;
    background-color: #fff;
    box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
    color: #666;
    margin-top:1.2rem;
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
    margin-top:.2rem;background-color: #eee;box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
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
    .totalmoney{
      background: #fff;
      font-size: .5rem;
      text-align: right;
      line-height: 1rem;
      padding-right: .5rem;
      span{color: #ff0036;}
    }
  }
</style>
