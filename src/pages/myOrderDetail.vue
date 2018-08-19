<template>
    <div id="myOrderDetailWrap">
      <HeaderA title="订单详情" :isLeft="true">
        <span slot="back_1" class="back_1" @click="back()"></span>
      </HeaderA>
      <div class="ordersWrap">
        <div id="address_1">
          <div class="add_pic"><img src="../assets/img/address.png" alt=""></div>
          <div class="add_detail">
            <ul class="list">
              <li class="item">
                <p class="section">
                  <span class="consignee">收货人:{{dataList.consignee}}</span>
                  <span class="phone">联系电话:{{dataList.mobile}}</span>
                </p>
                <p class="addressStyle" v-if="dataList.province === itemCity.id" v-for="(itemCity,cityIndex) in citys" :key="cityIndex">
                  <span>收货地址:{{itemCity.name}}</span>
                  <span v-if="dataList.city === districtItem.id" v-for="(districtItem,districtIndex) in itemCity.city" :key="districtIndex">
                    {{ districtItem.name }}
                  <span v-if="dataList.district === countyItem.id" v-for="(countyItem,countyIndex) in districtItem.district" :key="countyIndex">
                    {{ countyItem.name }}
                    <span>
                      {{ countyItem.location }}
                    </span>
                  </span>
                </span>
                </p>
              </li>
            </ul>
            <span>(收货不便时,可选择免费代收货服务)</span>
          </div>
        </div>
        <div id="detailWrap" @click="goTo()">
          <p class="title">官方旗舰店</p>
          <div class="data">
            <div class="pic"><img :src="dataList.attachUrl" alt=""></div>
            <div class="state">
              <p class="state_1">{{dataList.goodsName}}</p>
              <p class="state_2"></p>
              <p class="state_3">七天退换</p>
              <p class="money">¥{{dataList.shopPrice | changeNumber}}<span>X{{dataList.goodsNum}}</span></p>
            </div>
          </div>
        </div>
        <div class="totalaAll">
          <div class="totalmoney">共 {{dataList.goodsNum}} 件商品 &nbsp;实付：<span>¥{{dataList.totalAmount | changeNumber}}</span></div>
          <div class="totalBtn">
            <button class="btn1">确认收货</button><button class="btn2">查看物流</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from "axios"
  import HeaderA from  "../components/header/Header"
  import cityData from '../../static/city'
  import { mapState } from 'vuex'
    export default {
        name: "my-order-detail",
      components:{
        HeaderA
      },
      data(){
          return{
            isShow:true,
            dataList:{},  //获取后台的订单所有信息
            info: [],  //地址信息
            citys:[],
            newOrderId:"" //传过来的订单id
          }
      },
      computed:{
        ...mapState(["global"])
      },
      methods:{
        back(){   //返回上一页
          this.$router.go(-1)
        },
        goTo(){
          this.$router.push({
            path: '/details',
            query:{
              goodsId:this.dataList.goodsId //传当前商品id
            }
          });
        },
        getOrderList(){   //获取订单详情列表
          this.newOrderId = this.$route.query.newOrderId;   //接受当前订单id
          //console.log(this.newOrderId)
          this.axios({
            method: 'post',
            url:this.global.orderDetailList,
            data: {"orderId":this.newOrderId}
          })
            .then((res)=>{
              this.dataList = res.data.data[0];
              //console.log(this.dataList)
              this.info = cityData.cityData;
              this.$set(this.dataList,'citys',this.info);
              this.citys = this.dataList.citys;
              //console.log(this.citys, 'citys');
            })
            .catch((error)=>{
              console.log(error)
            })
        }
      },
      mounted(){
        this.getOrderList();  //获取订单详情列表
      }
    }
</script>

<style scoped lang="less">
  #address_1{
    width:100%;
    display:flex;
    background-color: #fff;
    box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
    margin-top:44px;
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
      flex:9;padding: 0 14px 14px 0;
      .section{padding:14px 0;overflow:hidden;}
      .consignee{float:left;font-size:16px;color:#3a3a3a;}
      .phone{float:right;font-size:16px;color:#333333;}
      .addressStyle{font-size:14px;color:#333333;}
      &>span{display: block;font-size:.3rem;line-height:0.6rem;color:#FFA800;}
    }
  }
  #detailWrap{
    margin-top:.2rem;/*box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);*/
    .title{padding:0 1.65rem;font-size:12px;background:#fff;color:#333333;line-height: 56px;}
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
  }
  .totalaAll{
    background-color: #fff;
    .totalmoney{
      font-size:12px;
      text-align: right;
      padding:20px 12px;
      color: #333333;
      span{color: #fe702f;font-size:16px;}
    }
    .totalBtn{
      overflow:hidden;padding:0 12px 20px 12px;
      button{width:66px;height:22px;line-height:22px;text-align:center;float:right;font-size:12px;
        border:1px solid #eee;outline: none;}
      .btn2{color:#333333;background-color: #fff;margin-right:15px;}
      .btn1{color:#fff;background-color: #ff5d00;}
    }
  }
</style>
