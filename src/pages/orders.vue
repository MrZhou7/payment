<template>
  <div id="ordersWrap">
    <headerA title="确认订单"></headerA>
    <div class="ordersWrap">
      <addressA consignee="周云" phone="13871435839" address_1="光谷街20号康桥小区">
        <img src="../assets/img/address.png" alt="" slot="pic_2">
      </addressA>
      <detailsA title="JORDAN官方旗舰店" state_1="AN 3 RETRO OG AJ3复刻男子篮球运动鞋854262"
                state_2="001黑/火焰红-水泥灰-白" state_3="43" price_2="1399.00">
        <img src="../assets/img/aj3.jpg" alt="" slot="pic_3">
      </detailsA>
      <div id="contentWrap">
        <div class="m-cell">购买数量
          <span>X1</span>
        </div>
        <div class="m-cell">配送方式
          <span>快递 免邮</span>
        </div>
        <div class="m-cell">发票类型
          <span>电子发票</span>
        </div>
        <div class="m-cell">发票内容
          <span>明细</span>
        </div>
        <div class="m-cell">发票抬头
          <span>个人</span>
        </div>
        <div class="m-cell">运费险&nbsp;&nbsp;&nbsp;
          <span>卖家送</span>
        </div>
      </div>
      <SubmitA submit="提交订单">
        <span slot="totlePrice">共<mark>1</mark>件,总金额 <mark>¥1399.00</mark></span>
      </SubmitA>
    </div>
  </div>
</template>

<script>
  import headerA from '../components/header/HeaderA.vue'
  import addressA from '../components/address/addressA.vue'
  import detailsA from '../components/goods/detailsA'
  import SubmitA from '../components/submit/submitA'
    export default {
        name: "orders",
      components:{
        headerA,addressA,detailsA,SubmitA
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
    line-height: initial;
    display: -webkit-box;
    -webkit-box-align: center;
    padding: .2rem;
    border-bottom: 0.026667rem solid #ddd;
    font-size: 0.4rem;
    span{
    display: block;
    position: relative;
    min-height:  1.2rem;
    line-height:  1.2rem;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 85%;
    overflow: hidden;
    padding-right: .2rem;color: #999;
    font-size: 0.4rem;
    text-align: right;}
  }
}
</style>
