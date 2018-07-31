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
      ],
      filters:{  //过滤价格
        changeNumber(num){
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
</script>

<style scoped lang="less">
 .box{
   width: 48%;
   float: left;
   height: 6.5rem;
   margin: .1rem;
    .wrap{
      width:100%;box-shadow: 1px 1px 1px #eee;background: #fff;
      .pic{
        img{width:100%;height:4.5rem;}
      }
      .adds{
        padding: 0 10px;
        color: #999;
        font-weight: lighter;
        .title{
          font-size: .37rem;
          color: #2d2d2d;
          height: 1rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-bottom: .5rem;
        }
        .main{
          font-size: .37rem;
          overflow: hidden;
          .price{color:#d43a32;float: left;}
          .sales{color:#b2b2b2;font-weight:lighter;float:right;}
        }
      }
    }
  }
</style>
