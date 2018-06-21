<template>
  <div class="box">
    <div id="addressWrap">
      <HeaderA title="选择收货地址">
        <a href="#" slot="back_1" class="back_1" @click="back"></a>
      </HeaderA>
      <div class="content">

      </div>
      <submitA submit="添加新地址" :bol="true" @click.native="newAddress"></submitA>
    </div>
  </div>
</template>

<script>
  import HeaderA from '../components/header/HeaderA'
  import submitA from '../components/submit/submitA'

  export default {
        name: "addressA",
        components:{
          HeaderA,submitA
        },

        methods:{
          back(){
            this.$router.back(-1);
          },
          newAddress(){
            this.$router.push({path:'/newAddress'})
          }
        }
    }
</script>

<style scoped lang="less">
  .content{
    width: 100%;overflow: hidden;margin-top: 1.2rem;margin-bottom: 1.42rem;
  .m-cell{
    height: 1rem;
    line-height: initial;
    display: -webkit-box;
    -webkit-box-align: center;
    padding:.1rem  .2rem;
    border-bottom: 0.026667rem solid #ddd;
    font-size: 0.4rem;
  input,textarea{
    border: none;
    display: block;
    position: relative;
    height:  1rem;
    line-height:  1rem;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.4rem;
    text-align: left;
    text-indent: .5rem;
    outline: none;
    width:8rem;}
  }
  .heigh{
    height: 3rem;
  textarea{
    height: 3rem;}
  }
  }
</style>
