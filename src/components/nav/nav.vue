<template>
  <div id="navWrap">
      <div class="tab-item">
        <router-link to="/" replace>商城</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/mine" replace>我的</router-link>
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
    height :1.2rem;
    line-height:1.2rem;
    position:fixed;
    bottom:0;
    left:0;
    background-color:#f64f48;
    .tab-item{
      flex:1;
      text-align :center;
      border:solid 1px(rgba(181,181,181,0.3));
      & > a{
        display :block;
        font-size :0.5rem;
        text-decoration: none;
        color:#fff;
        &:before{
          display:inline-block;
          height:0.69rem;
          line-height:1.16rem;
          font-size:25px;
          width:100%;
        }
        &.active{
          color :rgb(240,20,20);
        }
      }
    }
  }
</style>
