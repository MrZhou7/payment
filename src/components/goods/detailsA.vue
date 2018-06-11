<template>
    <div id="detailWrap">
      <p class="title">{{title}}</p>
      <div class="data">
        <div class="pic"><slot name="pic_3"></slot></div>
        <div class="state">
          <p class="state_1">{{state_1}}</p>
          <p class="state_2">颜色分类:{{state_2}};鞋码:{{state_3}};</p>
          <p class="state_3">七天退换</p>
          <p class="money">¥{{price_2}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "detailsA",
      props:["title","state_1","state_2","state_3","price_2"]
    }
</script>

<style scoped lang="less">
  #detailWrap{
    margin-top:.2rem;
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
