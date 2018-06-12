<template>
  <div id="newAddressWrap">
    <HeaderA title="新增收货地址">
      <a href="#" slot="back_1" class="back_1"></a>
    </HeaderA>
    <div class="content">
      <div class="m-cell">收 货 人&nbsp;&nbsp;
        <input type="text" autofocus required maxlength="10">
      </div>
      <div class="m-cell">联系电话
        <input type="text" autofocus required maxlength="11">
      </div>
      <div class="m-cell">所在地区
        <input type="text" autofocus required>
      </div>
      <div class="m-cell heigh">详细地址
        <textarea name="" id="" cols="3" rows="3" warp="virtual" autofocus required maxlength="50"></textarea>
        <!--<input type="text" placeholder="如道路、门牌号、小区、单元楼" autofocus required>-->
      </div>
    </div>
    <submitA submit="保存" :bol="true"></submitA>
  </div>
</template>

<script>
  import HeaderA from '../components/header/HeaderA'
  import submitA from '../components/submit/submitA'
    export default {
        name: "new-address",
      components:{
        HeaderA,submitA
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
