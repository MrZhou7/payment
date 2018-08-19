<template>
    <div id="submitWrap">
      <button :class="{btn:bol}">{{submit}}</button>
      <slot name="totlePrice"></slot>
    </div>
</template>

<script>
  import axios from "axios"
    export default {
        name: "submitA",
      props:[
        "submit","bol"
      ]
    }
</script>

<style scoped lang="less">
#submitWrap{
  position:fixed;bottom:0;width:100%;
  button{
    text-decoration:none;
    color:white;
    background:#ff5d00;
    line-height: 44px;
    font-size:20px;
    border: none;
    float:right;}
  .btn{ width: 100%;}
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
