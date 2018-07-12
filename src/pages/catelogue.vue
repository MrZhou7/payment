<template>
  <div id="catelogueWrap">
    <HeaderA title="商品列表"></HeaderA>
    <div class="shopList">
      <goods @click.native="jump(index)" v-for="(item,index) in dataList"
             :key="index" :title="item.goodsName" :price="item.shopPrice" :sales="item.salesVolume">
        <img :src="item.img" alt="" slot="pic_1">
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
  import {newList} from '../api/api'
  import Nav from '../components/nav/nav'
    export default {
        name: "catelogue",
      store:store,
      components:{
        HeaderA,Goods,Nav
      },
      data(){
          return{
            dataList:[]
          }
      },
      created (){
        let params = {};
        newList(params).then(res=>{
          this.dataList = res.data.content
          //console.log(this.dataList)
        })
      },
      methods:{
        jump(index){   //跳转传参
          //console.log(item.id)
          this.$router.push({
            path:'/details',
            name:'Detail',
            params:{
              dataId:index
            }
          })
        }
      }
    }
</script>

<style scoped>
.shopList{
  overflow: hidden;
  margin-top: 1.2rem;
}
</style>
