<template>
    <div id="address_1">
        <div class="add_pic"><slot name="pic_2"></slot></div>
        <div class="add_detail">
          <p><span class="consignee">收货人:{{consignee}}</span><span class="phone">{{phone}}</span></p>
          <p>收货地址:{{address_1}}</p>
          <span>(收货不便时,可选择免费代收货服务)</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addressA",
      props:[
        "consignee","phone","address_1"
      ]
    }
</script>

<style scoped lang="less">
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

</style>
