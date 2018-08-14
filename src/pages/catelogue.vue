<template>
  <div id="catelogueWrap" v-show="isShow">
    <HeaderA title="商品列表"></HeaderA>
    <div class="shopList" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <goods @click.native="jump(item,index)" v-for="(item,index) in dataList"
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
  import axios from'axios'
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
            newUrl:"",  //获取的openid
            busy: false, //是否正在加载过程中
            page:0, //默认分页为第一页
            size:10, //默认每页显示10条数据
            flag:false, //默认没有分页
            isShow:false //整个页面的显示影藏
          }
      },
      methods:{
        jump(item,index){   //跳转传参
          this.$router.push({
            path:'/details',name:'Detail'});
          window.sessionStorage.setItem('url',item.goodsId); //储存本地的商品列表的当前商品id
        },
        GetRequest(){
          this.nowUrl = window.location.href //获取url中"?"符后的字串
          console.log(this.nowUrl)
          if (this.nowUrl.indexOf("?") !== -1){
            var str = this.nowUrl.indexOf("=")
            var end = this.nowUrl.indexOf("&")
            //console.log(str)
            //console.log(end)
            this.newUrl = this.nowUrl.substring(str+1,end)
            //console.log(this.newUrl)
            this.axios({
              method:"post",
              url:"http://xds.huift.com.cn/server/openId",
              data:{"openId":this.newUrl}
            })
              .then((res)=>{
                console.log(res);
                window.sessionStorage.setItem('memberId',res.data.data.memberId); //储存用户ID
                let goodsId = window.sessionStorage.getItem('url');  //获得商品id
                let store = window.sessionStorage.getItem('store');//判断返回到首页后的跳转
                if(store){
                  this.isShow = true;
                  this.$router.push({path:"/"})
                }else if(goodsId){
                  this.$router.push({path:"/details"})
                }else{
                  this.isShow = true;
                  this.$router.push({path:"/"})
                }
              })
          }
        },
        getGoodsList(flag){
          let param = {
            "page":this.page,
            "size":this.size,
          };
          axios.get('http://xds.huift.com.cn/server/goodlist?page='+this.page+'&limit=10',{params:param}).then(res=>{
            if(flag){   //获取商品列表
              this.dataList = this.dataList.concat(res.data.data.content);
              if(this.dataList.length === 0){
                this.busy = true;
              }else{
                this.busy = false;
              }
            }else{
              // 第一次加载数据
              this.dataList = res.data.data.content
              // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
              this.busy = false;
            }
          })
        },
        loadMore() {
          this.busy = true;
          this.page++;
          //console.log(this.page)
          //把busy置位true，这次请求结束前不再执行
          setTimeout(() => {
            this.getGoodsList(true);
            //调用获取数据接口，并且传入一个true，让axios方法指导是否需要拼接数组。
          }, 500);
        }
      },
      created(){
        this.GetRequest()  //获取当前openid
        /*let params = {};
        newList(params).then(res=>{
          this.dataList = res.data.content
          //console.log(this.dataList)
        })*/
      }
    }
</script>

<style scoped>
.shopList{
  max-height:600px;
  overflow-y:auto;
  margin: 1.2rem 0;
  background:#f3f3f3;
}
</style>
