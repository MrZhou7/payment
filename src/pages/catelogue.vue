<template>
  <div id="catelogue">
    <headerA title="商品列表"></headerA>
    <div class="shopList">
      <goods @click.native="jump(item)" v-for="(item,index) in list"
             :key="index" :title="item.title" :price="item.price" :sales="item.sales">
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
  import {newList} from '../api/api';
    export default {
        name: "catelogue",
      store:store,
      components:{
        headerA,Goods
      },
      data(){
          return{
            list:[]
          }
      },
      created (){
        let params = {};
        newList(params).then(res=>{
          this.list = res.data
          //console.log(this.list)
        })
      },
      methods:{
        jump(item){
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
