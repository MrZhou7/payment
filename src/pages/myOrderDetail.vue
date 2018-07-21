<template>
    <div id="myOrderDetailWrap">
      <HeaderA title="订单列表">
        <a href="#" slot="back_1" class="back_1" @click="back"></a>
      </HeaderA>
      <div v-if="" v-for="(item,index) in addressList" :key="index">
        <li class="item">
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
            addressList:[]
          }
      },
      methods:{
        back(){   //返回上一页
          this.$router.go(-1)
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
        }
      },
      mounted(){
        this.getOrderList()
      }
    }
</script>

<style scoped>

</style>
