<template>
    <div class="headWrap">
      <div class="header_top">
        <slot name="back_1"></slot>
        <span :class="{'top':isLeft}">{{title}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "headerA",
      props:['title','isLeft']
    }
</script>

<style scoped lang="less">
  .headWrap{
    width:100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    .header_top{
      color: #010101;
      text-align: center;
      font-size:20px;
      line-height:44px;
      box-shadow:0px 0px 3px #b3b3b3;
      background: #f9f9f9;;
      overflow:hidden;
      .back_1{
        position: absolute;
        left: 0;
        display: block;
        width:1.2rem;
        height: 1.2rem;}
      .back_1:before{
        border-top:0.05rem solid #b3b3b3;
        border-left:0.05rem solid #b3b3b3;
        content:'\0020';
        left:0.43rem;
        top:0.32rem;
        width:0.43rem;
        height:0.43rem;
        transform:rotate(-45deg);
        -webkit-transform:rotate(-45deg);
        position:absolute;
      }
      .top{
        float:left;
        margin-left:1.3rem;
        color:#444444;
      }
    }
  }
</style>
