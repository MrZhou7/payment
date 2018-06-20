<template>
  <div id="detailWrap">
    <div class="container">
      <div class="pic_warp">
        <a href="javascript:void(0)"><img src="../assets/img/aj3.jpg" alt=""></a>
      </div>
      <p class="main">{{titleD}}</p>
      <p class="price"><i>¥</i><span>1399</span></p>
      <div class="adds">
        <span class="express">快递:0.00</span>
        <span class="sales">月销量:188件</span>
      </div>
    </div>
    <SubmitA submit="立即购买" :bol="true" @click.native="submitForm"></SubmitA>
  </div>
</template>

<script>

  import SubmitA from '../components/submit/submitA'
  import { mapGetters,mapActions} from 'vuex'
  import { newList } from "../api/api";

  export default {
        name: "details-a",
      components :{
          SubmitA
      },
      data(){
          return{
            List:[],
            getId:{},
            titleD:{}
          }
      },
      created(){
        let params = {};
        newList(params).then(res=>{
          this.List = res.data;
          //console.log(this.list)
          let titleD = this.List[this.getId]
          console.log(titleD)
        })
        this.getParams()
      },
      methods:{
          getParams(){
            let getId = this.$route.params.dataId;
            console.log(getId)
          }
      },
      watch:{
          '$route':'getParams()'
      }
    }
</script>

<style scoped lang="less">
.container{
  .pic_warp{
    width:100%;
    a{
      display:block;
      img{width:100%;}
    }
  }
  .main{
    padding:.3rem .3rem 0!important;
    font-size: .4rem;
    color: #051B28;
    line-height:.53rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    max-height:1.12rem;
    overflow: hidden;
    word-break: break-all;}
  .price{
    background-color: #FFF;
    padding: 0 .3rem;
    color: #FF0036;
    height:.96rem;
    line-height:.96rem;
    font-size:.64rem;
    span{margin-left:.1rem;}
    i{font-family: arial;font-style: normal;}}
  .adds{
    display: flex;
    line-height:0.8rem;
    padding:0 0.27rem;
    font-size: .35rem;
    color:#999;
    font-weight:lighter;
    span{flex:1;}
    .express{text-align: left;}
    .sales{text-align: right;}
  }
}
</style>
