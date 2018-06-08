<template>
    <div class="headWrap">
      <div class="header_top">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "header1",
      props:['title']
    }
</script>

<style scoped lang="less">
  .headWrap{
    width:100%;
    position: fixed;
    left: 0;
    top: 0;
    .header_top{
      background: #f64f48;
      color: #fff;
      text-align: center;
      font-size:16px;
      line-height: 1.2rem;
      text-indent: 1em;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
