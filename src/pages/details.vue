<template>
  <div id="detailWrap">
    <div class="container">
      <div class="pic_warp">
        <a href="javascript:void(0)"><img :src="pic.attachUrl" alt=""></a>
      </div>
      <p class="price">¥{{dataList.shopPrice | changeNumber}}</p>
      <p class="main">{{dataList.goodsName}}</p>
      <div class="adds">
        <span class="express">快递:0.00</span>
        <span class="sales">月销量:{{dataList.salesVolume}}件</span>
      </div>
      <div class="goodsRemark">
        <h3>商品介绍</h3>
        <p>{{dataList.goodsRemark}}</p>
      </div>
      <div class="goodsRemark">
        <h3>使用说明</h3>
        <p>{{dataList.defaultContent}}</p>
      </div>
    </div>
    <SubmitA submit="立即购买" :bol="true" @click.native="goFor()"></SubmitA>
    <div class="back" @click="back()"><img src="../assets/img/back.svg" alt=""></div>


    <!--遮罩层-->
    <!--<transition name="myBox">
      <div class="overlayer" v-show="myBoxShow">
        <div class="pay">
          <div class="pic_warp">
            <a href="javascript:void(0)"><img :src="pic.attachUrl" alt=""></a>
          </div>
          <div class="payNum">
            <span class="payNumLeft">购买数量</span>
            <span class="payNumRight">
              <button @click="$store.commit('reduce')">-</button>
              <span>{{ getNum }}</span>
              <button @click="$store.commit('add')">+</button></span>
          </div>
          <button class="sureBtn" @click="goFor()">确定</button>
          <button class="cancleBtn" @click="cancleBtn()">取消</button>
        </div>
      </div>
    </transition>-->
  </div>
</template>

<script>
  import SubmitA from '../components/submit/submitA'
  import {mapState,mapGetters,mapActions} from 'vuex'
  import { newList } from "../api/api";
  //import store from "../store/index"

  export default {
        name: "details-a",
      components :{
          SubmitA
      },
      /*store:store,
      computed:mapState([
        "num","disabled"
      ]),
      computed:mapGetters([
        'getNum'
      ]),*/
      data(){
          return{
            dataList: [],  //获取的数据
            pic:""  //获取的图片url
            //myBoxShow:false,  //遮罩层的显示和隐藏
          }
      },
      mounted(){
        this.getParams()
      },
      methods:{
          getParams(){
            var shopId = window.localStorage.getItem('shopId')    //获取本地的商品列表的当前商品索引号
            //console.log(detailId)
            let params = {};
            newList(params).then(res=>{
              this.dataList = res.data.content[shopId];
              this.pic = res.data.content[shopId].attachments[0];
              console.log(this.dataList)
            })
          },
          /*showChoise(){     //显示选择数量页面
            this.myBoxShow = true
          },*/
          /*cancleBtn(){  //隐藏选择款式页面
            this.myBoxShow = false
          },*/
          goFor(){this.$router.push({path:'/orders',name:'Orders'})},  //跳转页面
          back(){this.$router.push({path:'/'})}
      },
      watch:{
          '$route':'getParams'
      },
      filters:{  //过滤价格
        changeNumber(num){
          if(num){
            num = num.toString();
            let result = [];
            if(num.length == 2){
              num = '0.' + num;
              result = num;
            }else if(num.length == 1){
              num = '0.0' + num;
              result = num;
            }else{
              for(let i=0;i<num.length;i++){
                result = result + num.charAt(i);
                if(i==num.length-3){
                  result = result + '.';
                }
              }
            }
            return result;
          }
        }
      }
    }
</script>

<style scoped lang="less">
.container{
  margin-bottom: 1.4rem;background: #E4E3E0;
  .pic_warp{
    width:100%;
    a{
      display:block;
      img{width:100%;}
    }
  }
  .main{
    background-color: #FFF;
    padding: 0 .3rem;
    font-size: .4rem;
    color: #091E2D;
    line-height: .53rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-box-pack: center;
    max-height: 1.12rem;
    overflow: hidden;
    font-weight: bold;
    word-break: break-all;}
  .price{
    background-color: #FFF;
    padding: 0 .3rem;
    color: #FF0036;
    height:.96rem;
    line-height:.96rem;
    font-size:.64rem;}
  .adds{
    display: flex;
    line-height:0.8rem;
    padding:0 0.27rem;
    font-size: .35rem;
    background: #FFF;
    color:#999;
    font-weight:lighter;
    span{flex:1;}
    .express{text-align: left;}
    .sales{text-align: right;}
  }
  .goodsRemark{
    background: #fff;
    margin: .5rem 0;
    padding: 0 .2rem;
    h3{line-height: 1rem;}
    p{color: #7E7C78;
      padding: .1rem 0}
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
.pay{
  width:100%;
  height: 80%;
  position: fixed;
  background: #fff;
  backface-visibility: hidden;
  -webkit-transition: .2s ease-out;
  transition: .2s ease-out;
  bottom: 0;
  z-index: 11;
  .pic_warp{
    width:100%;
    a{
      display:block;
      width: 45%;
      margin: .2rem;
      img{width:100%;}
    }
  }
  .payNum{
    font-size:.4rem;
    width:95%;
    overflow:hidden;
    padding:0 0.2rem;
    .payNumLeft{float:left;}
    .payNumRight{
      float:right;
      button{width: 0.6rem;height: .6rem;-webkit-appearance : none ;}
      span{width: 0.6rem;height: 0.5rem;display: inline-block;border: 1px solid grey;text-align: center;}
    }
  }
  .sureBtn{
    position: absolute;
    bottom: .2rem;
    width: 80%;
    margin-left: 10%;
    display: inline-block;
    border-radius: 2rem;
    border: none;
    outline:none;
    padding: .3rem;
    background: red;
    color: #fff;
    font-size: .4rem;}
  .cancleBtn{
    position: absolute;
    right:0.1rem;
    top:0.1rem;
    font-size: 0.4rem;
    color: #D8D8D8;
    border: 0.026667rem solid #d8d8d8;
    padding: 0.05rem .1rem;
    cursor: pointer;
    background: #0071B8;
  }
}
.overlayer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background:rgba(77, 82, 113, 0.8);
}
.myBox-enter-active{//boom 是过渡名称 in,out是两个动画，动画写到进入和离开结束的class中
  animation:in .5s;
}
.myBox-leave-active{
  animation:out .5s;
}
@keyframes  in {//in动画
  0% {
    transform: scale(0);
    opactity:0;
  }
  100% {
    transform: scale(1);
    opactity:1;
  }
}
@keyframes  out {//out 动画
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
    opactity:0;
  }
}

</style>
