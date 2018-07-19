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
    width:100%;
    .wrap{
      width:100%;padding:1%;box-shadow: 1px 1px 1px #eee;display: flex;
      .pic{
        flex: 3;
        img{width:100%;height:100%;}
      }
      .adds{
        line-height:1.5rem;
        padding: 0 10px;
        color: #999;
        font-weight: lighter;
        overflow: hidden;
        flex:7;
        .title{
          font-size: .37rem;
          color: #051B28;
        }
        .main{
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          -webkit-box-pack: center;
          overflow: hidden;
          word-break: break-all;
          .price{color: #FF0036;    float: left;}
          .sales{color:#999;font-weight:lighter;float:right;}
        }
      }
    }
  }
</style>
