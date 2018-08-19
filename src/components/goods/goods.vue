<template>
<div id="goodsWrap">
  <div class="box">
    <div class="wrap">
      <div class="pic"><slot name="pic_1"></slot></div>
      <div class="adds">
        <p class="title">{{title}}</p>
        <p class="main">
          <span class="price">¥{{price | changeNumber}}</span>
          <span class="sales">月销量:{{sales}}件</span>
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "goods",
      props:[
        "title","price","sales"
      ]
    }
</script>

<style scoped lang="less">
  .box {
    width:50%;
    height: 256px;
    float: left;
    padding: 0 5px 0 10px;
    box-sizing: border-box;
    margin:5px 0 10px 0;
    .wrap {
      width: 100%;
      box-shadow: 1px 1px 1px #eee;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      .pic {
        img {
          width: 100%;
          height: 172px;
        }
      }
      .adds {
        padding: 0 10px;
        .title {
          font-size: 14px;
          color: #333;
          height: 1rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .main {
          font-size: .37rem;
          overflow: hidden;
          margin: 6px 0 16px 0;
          .price {
            color: #ff6924;
            font-size: 18px;
          }
          .sales {
            color: #a8a8a8;
            padding-left: 6px;
          }
        }
      }
    }
  }
</style>
