<template>
    <div id="submitWrap">
      <button>提交订单</button>
      <span>共<mark>{{numberA}}</mark>件,总金额 <mark>¥{{totlePrice}}</mark></span>
    </div>
</template>

<script>
    export default {
        name: "submitA",
      props:[
        "numberA","totlePrice"
      ]
    }
</script>

<style scoped lang="less">
#submitWrap{
  position:fixed;bottom:0;width:100%;background:#fff;
  button{
    text-decoration:none;
    color:white;
    background:#FF0036;
    padding:.4rem;
    font-size:.45rem;
    border: none;
    float:right;}
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
</style>
