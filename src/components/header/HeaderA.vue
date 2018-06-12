<template>
    <div class="headWrap">
      <div class="header_top">
        <slot name="back_1"></slot>
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "headerA",
      props:['title']
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
      background: #f64f48;
      color: #fff;
      text-align: center;
      font-size:.5rem;
      line-height: 1.2rem;
      text-indent: 1em;
      border-bottom: 1px solid #ddd;
      .back_1{
        position: absolute;
        left: 0;
        display: block;
        width:1.2rem;
        height: 1.2rem;}
      .back_1:before{
        border-top:0.05rem solid #fff;
        border-left:0.05rem solid #fff;
        content:'\0020';
        left:0.43rem;
        top:0.32rem;
        width:0.43rem;
        height:0.43rem;
        transform:rotate(-45deg);
        -webkit-transform:rotate(-45deg);
        position:absolute;
      }
    }
  }
</style>
