<template>
  <div id="catelogue">
    <headerA title="商品列表"></headerA>
    <div class="shopList">
      <goods @click.native="jump(item)" v-for="(item,index) in dataList"
             :key="index" :title="item.goodsName" :price="item.marketPrice" :sales="item.sales">
        <img :src="item.img" alt="" slot="pic_1">
      </goods>
    </div>
  </div>
</template>

<script>
  import headerA from '../components/header/HeaderA'
  import Goods from '../components/goods/goods'
  import store from '../store/index'
  import { mapState } from 'vuex'
  import {newList} from '../api/api'
    export default {
        name: "catelogue",
      store:store,
      components:{
        headerA,Goods
      },
      data(){
          return{
            list:[],
            dataList:[]
          }
      },
      created (){
        /*let params = {};
        newList(params).then(res=>{
          this.list = res.data
          //console.log(this.list)
        })*/
        this.axios({
          method : 'get',
          url: 'http://test123456.tunnel.qydev.com/goodlist',
        }).then((res)=>{
          console.log(res.data.data)
          this.dataList = res.data.data
        })
          .catch((error)=>{
          console.log(error)
        })
      },
      methods:{
        jump(item){   //跳转传参
          //console.log(item.id)
          this.$router.push({
            path:'/details',
            name:'Detail',
            params:{
              dataId:item.id
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
