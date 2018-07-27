<template>
  <div id="catelogueWrap">
    <HeaderA title="商品列表"></HeaderA>
    <div class="shopList">
      <goods @click.native="jump(index)" v-for="(item,index) in dataList"
             :key="index" :title="item.goodsName" :price="item.shopPrice" :sales="item.salesVolume">
        <img :src="item.attachments[0].attachUrl" alt="" slot="pic_1">
      </goods>
    </div>
    <Nav></Nav>
  </div>
</template>

<script>
  import HeaderA from '../components/header/Header'
  import Goods from '../components/goods/goods'
  import store from '../store/index'
  import { mapState } from 'vuex'
  import {newList} from '../api/api.js'
  import Nav from '../components/nav/nav'
    export default {
        name: "catelogue",
      store:store,
      components:{
        HeaderA,Goods,Nav
      },
      data(){
          return{
            dataList:[],  //获取当前商品信息
            nowUrl:"", //获取当前的url
            newUrl:""  //获取的openid
          }
      },
      created (){

      },
      methods:{
        jump(index){   //跳转传参
          this.$router.push({path:'/details',name:'Detail'});
          window.localStorage.setItem('shopId',index); //储存本地的商品列表的当前商品索引号
        },
        GetRequest() {
          /*this.nowUrl = window.location.href //获取url中"?"符后的字串
          //console.log(this.nowUrl)
          if (this.nowUrl.indexOf("?") != -1){
            var str = this.nowUrl.indexOf("=")
            var end = this.nowUrl.indexOf("&")
            //console.log(str)
            //console.log(end)
            this.newUrl = this.nowUrl.substring(str+1,end)
            //console.log(this.newUrl)
            this.axios({
              method:"post",
              url:"http://xds.huift.com.cn:8080/openId",
              data:{"openId":this.newUrl}
            })
              .then((res)=>{
                // console.log(res.data.data.memberId);
                window.localStorage.setItem('memberId',res.data.data.memberId); //储存用户ID
              })
          }*/
          this.axios({
            method:"post",
            url:"http://xds.huift.com.cn:8080/openId",
            data:{"openId":"oboBC0aTWv174jQcRzsqXfZN2YyQl"}
          })
            .then((res)=>{
              // console.log(res.data.data.memberId);
              window.localStorage.setItem('memberId',"1"); //储存用户ID
            })
        }
      },
      mounted(){
        this.GetRequest()  //获取当前openid
        let params = {};
        newList(params).then(res=>{
          this.dataList = res.data.content
          //console.log(this.dataList)
        })
      }
    }
</script>

<style scoped>
.shopList{
  overflow: hidden;
  margin: 1.2rem 0;
  background: #E4E3E0;
}
</style>
