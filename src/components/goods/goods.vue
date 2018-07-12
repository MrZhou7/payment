<template>
<div id="goodsWrap">
  <div class="box">
    <div class="wrap">
      <div class="pic"><slot name="pic_1"></slot></div>
      <p class="main">{{title}}</p>
      <div class="adds">
        <span class="price">{{price}}</span>
        <span class="sales">月销量:{{sales}}件</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import {newList} from '../../api/api'
    export default {
        name: "goods",
      props:[
        "title","price","sales"
      ]
    }
</script>

<style scoped lang="less">
 .box{
    width:50%;float:left;
    .wrap{
      width:98%;margin: 1%;box-shadow: 1px 1px 0 #eee;
      .pic img{width:100%;height:100%;}
      .main{
        font-size: .35rem;
        color: #051B28;
        line-height:.48rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-box-pack: center;
        max-height:1.12rem;
        overflow: hidden;
        word-break: break-all;
        padding: 0 10px;}
      .price{color: #FF0036;height: 1rem;line-height: 1rem;float:left;}
      .sales{text-align: center;color:#999;font-weight:lighter;float:right;}
      .adds{line-height:1rem;padding: 0 10px;color: #999;font-weight: lighter;overflow: hidden;font-size: 0.3rem;}
    }
  }
</style>
