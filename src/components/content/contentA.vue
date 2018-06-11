<template>
    <div id="contentWrap">
      <div class="m-cell cell-arrow">购买数量
        <input type="text" class="cell-input" placeholder="X1">
      </div>
      <div class="m-cell cell-arrow">配送方式
        <input type="text" class="cell-input" placeholder="快递 免邮">
      </div>
      <div class="m-cell cell-arrow">发票类型
        <input type="text" class="cell-input" placeholder="电子发票">
      </div>
      <div class="m-cell cell-arrow">发票内容
        <input type="text" class="cell-input" placeholder="明细">
      </div>
      <div class="m-cell cell-arrow">发票抬头
        <input type="text" class="cell-input" placeholder="个人">
      </div>
      <div class="m-cell cell-arrow">运费险&nbsp;&nbsp;&nbsp;
        <input type="text" class="cell-input" placeholder="卖家送">
      </div>
    </div>
</template>

<script>
    export default {
        name: "contentA"
    }
</script>

<style scoped lang="less">
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
      input{
        border: none;
        display: block;
        position: relative;
        min-height:  1.2rem;
        line-height:  1.2rem;
        box-sizing: border-box;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 93%;
        overflow: hidden;
        padding-right: 1.2rem;
        font-size: 0.4rem;
        text-align: right;}
    }
  }

</style>
