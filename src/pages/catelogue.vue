<template>
  <div id="catelogueWrap">
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
  import Nav from '../components/nav/nav'
  import {mapState} from 'vuex'
  import axios from'axios'
    export default {
        name: "catelogue",
      store:store,
      components:{
        HeaderA,Goods,Nav
      },
      data(){
          return{
            goToUrl:"",//获取的要跳转的路径？
            dataList:[],  //获取当前商品信息
            busy: false, //是否正在加载过程中
            page:0, //默认分页为第一页
            size:10, //默认每页显示10条数据
            flag:false //默认没有分页
          }
      },
      computed:mapState(["showNum"]),
      methods:{
        jump(item,index){   //跳转传参
          this.$router.push({path:'/details'})
          window.sessionStorage.setItem("goodsId",item.goodsId);  //传递本地的商品列表的当前商品id
        },
        getGoodsList(flag){
          let param = {
            "page":this.page,
            "size":this.size,
          };
          axios.get('https://xds.huift.com.cn/server/goodlist?page='+this.page+'&limit=10',{params:param}).then(res=>{
            if(flag){   //获取商品列表
              this.dataList = this.dataList.concat(res.data.data.content);
              if(this.dataList.length === 0){
                this.busy = true;
              }else{
                this.busy = false;
              }
            }else{
              // 第一次加载数据
              this.dataList = res.data.data.content;
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
          this.busy = false;
        }
      },
      created(){
        this.GetOpenId();     //获取当前openid
        //this.GetRequest();  //获取当前openid
        this.$store.state.showNum = 2;
        console.log(this.showNum);
      }
    }
</script>

<style scoped>
.shopList{
  max-height:600px;
  overflow-y:auto;
  padding:44px 0;
  background:#f3f3f3;
}
</style>
