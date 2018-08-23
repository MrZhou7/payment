<template>
  <div id="navWrap">
      <div class="tab-item" >
        <router-link to="/catelogue">商城</router-link>
      </div>
      <div class="tab-item" >
        <router-link to="/mine">我的</router-link>
      </div>
  </div>
</template>

<script>
    export default {
        name: "navHome"
    }
</script>

<style scoped lang="less">
  #navWrap{
    display :flex;
    width:100%;
    height :44px;
    line-height:44px;
    position:fixed;
    bottom:0;
    left:0;
    .tab-item{
      flex:1;
      text-align :center;
      background-color:#ff4038;
      & > a{
        display :block;
        font-size :20px;
        text-decoration: none;
        color:#fff;
      }
      .router-link-exact-active{
        background-color: #ff6924;
      }
    }
  }
</style>
