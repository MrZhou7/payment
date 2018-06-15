<template>
  <div id="catelogue">
    <headerA title="商品列表"></headerA>
    <div class="shopList">
      <goods v-for="item in list" :title="item.title" :price="item.price" :sales="item.sales">
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
          console.log(res.data)
          this.list = res.data
        })
        //axios.post('http://rap.sueua.cn/moc+ekjsdata/1/v1/goods').then(res => console.log(res.data))
      },
      // methods: {
      //   postData() {
      //     this.$axios({
      //       method: 'post',
      //       url: 'http://rap.sueua.cn/mockjsdata/1/v1/goods',
      //       data: {
      //         name: 'xiaoming',
      //         info: '12'
      //       }
      //     })
      //   }
      // }
      methods:{
        goodTo(){

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
