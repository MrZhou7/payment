<template>
  <div id="detailWrap">
    <div class="container">
      <div class="pic_warp">
        <a href="javascript:void(0)"><img :src="pic.attachUrl" alt=""></a>
      </div>
      <p class="main">{{dataList.goodsName}}</p>
      <p class="price"><span>¥{{dataList.shopPrice}}</span></p>
      <div class="adds">
        <span class="express">快递:0.00</span>
        <span class="sales">月销量:{{dataList.salesVolume}}件</span>
      </div>
    </div>
    <SubmitA submit="立即购买" :bol="true" @click.native="gofor"></SubmitA>
    <div class="back" @click="back()"><img src="../assets/img/back.svg" alt=""></div>
  </div>
  <!--<div class="pay" v-show="false">-->
    <!--<div class="pic_warp">-->
      <!--<a href="javascript:void(0)"><img :src="pic.attachUrl" alt=""></a>-->
    <!--</div>-->
    <!--<div>-->
      <!--<span>购买数量</span><button>-</button><input type="number"><button>+</button>-->
    <!--</div>-->
  <!--</div>-->
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
            detailId: this.$route.params.dataId,
            dataList: [],  //获取的数据
            pic:""  //获取的图片url
          }
      },
      mounted(){
        this.getParams()
      },
      methods:{
          getParams(){
            var detailId = this.$route.params.dataId;    //接受传递过来的dataId
            //console.log(detailId)
            let params = {};
            newList(params).then(res=>{
              this.dataList = res.data.content[detailId];
              this.pic = res.data.content[detailId].attachments[detailId];
              //console.log(res.data)
            })
          },
          gofor(){     //跳转页面并传参
            //console.log(this.detailId)
            this.$router.push({
              path:'/orders',
              name:'Orders',
              params:{
                dataId:this.detailId
              }
            })
          },
        back(){
            this.$router.back(-1)
        }
      },
      watch:{
          '$route':'getParams'
      }
      // filters:{  //过滤价格
      //   changeNumber(num){
      //     num = num.toString();
      //     let result = [];
      //     if(num.length == 2){
      //       num = '0.' + num;
      //       result = num;
      //     }else if(num.length == 1){
      //       num = '0.0' + num;
      //       result = num;
      //     }else{
      //       for(let i=0;i<num.length;i++){
      //         result = result + num.charAt(i);
      //         if(i==num.length-3){
      //           result = result + '.';
      //         }
      //       }
      //     }
      //     return result;
      //   }
      // }
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
    span{margin-left:.1rem;}}
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
#detailWrap{
  position: relative;
  .back{
    position: absolute;
    top: .1rem;
    left: .1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background:rgba(62,62,62,0.459);
    opacity: .7;
    color: white;
    font-size: .4rem;
    text-align: center;
    line-height: 1rem;
    img{
      width:100%;
    }
  }
}

</style>
