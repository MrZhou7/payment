<template>
  <div id="detailWrap">
    <div class="container">
      <div class="pic_warp">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) in pic" :key="index">
            <img :src="item.attachUrl" alt="">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
      </div>
      <p class="price"><span>¥</span>{{dataList.shopPrice | changeNumber}}</p>
      <p class="main">{{dataList.goodsName}}</p>
      <div class="adds">
        <span class="express">快递:0.00</span>
        <span class="sales">月销量:{{dataList.salesVolume}}件</span>
      </div>
      <div class="goodsRemark">
        <h3>商品介绍</h3>
        <pre>{{dataList.goodsRemark}}</pre>
      </div>
      <div class="goodsRemark">
        <h3>使用说明</h3>
        <pre>{{dataList.defaultContent}}</pre>
      </div>
    </div>
    <SubmitA submit="立即购买" :bol="true" @click.native="goFor()"></SubmitA>
    <div v-show="isShow" class="back" @click="back()"><img src="../assets/img/back.svg" alt=""></div>
    <!-- 悬浮的HTML -->
    <div v-show="!isShow" class="xuanfu" id="moveDiv"
         @mousedown="down" @touchstart="down"
         @mousemove="move" @touchmove="move"
         @mouseup="end" @touchend="end"
    >
      <div class="yuanqiu" @click="gOTO()">
        <img src="../assets/img/111.png" alt="">
      </div>
    </div>

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
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  //import { newList } from "../api/api";
  import store from "../store/index"

  export default {
        name: "details-a",
      components :{
          SubmitA,swiper,swiperSlide
      },
      store:store,
      /*store:store,
      computed:mapState([
        "num","disabled"
      ]),
      computed:mapGetters([
        'getNum'
      ]),*/
      data(){
          return{
            flags: false,
            position: {
              x: 0,
              y: 0
            },
            nx: '', ny: '', dx: '', dy: '', xPum: '', yPum: '',
            swiperOption: {   //控制轮播图
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets'
              }
            },
            dataList: [],  //获取的数据
            pic:"", //获取的图片url
            //myBoxShow:false,  //遮罩层的显示和隐藏
            goodsId:"",   //商品id
            isShow:true  //返回键的显示隐藏
          }
      },
      computed:{...mapState(["showNum","global"])},
      methods:{
        goFor(){
          this.$router.push({path:'/orders'});  //跳转页面，传递商品Id
          window.sessionStorage.setItem("goodsId",this.goodsId?this.goodsId:this.urlId)
        },
        back(){
            this.$router.push({path:'/catelogue'})
        },
        gOTO(){
          this.$router.push({path:'/myOrder/allOrders'});  //跳转页面
        },
        getParams(){
          //console.log(this.showNum);
          if(this.showNum == 1){
            this.isShow = false;
          }

          let nowUrl = window.location.href; //获取url中"?"符后的字串*/
          let str = nowUrl.indexOf("=");
          let end = nowUrl.indexOf("&");
          //console.log(str); console.log(end)
          let urlId = nowUrl.substring(str+1,end);//路径中获取的goodsId
          let openId = window.sessionStorage.getItem("goodsId");
          //传过来商品id
          this.goodsId = openId?openId:urlId;
          this.axios({
            method: "post",
            url: this.global.aloneShop,
            data: {"goodsId":this.goodsId}
          })
            .then((res)=>{
              this.dataList = res.data.data;
              //console.log(this.dataList);
              this.pic = res.data.data.attachments;
              //console.log(this.pic)
            })
        },
        /*showChoise(){     //显示选择数量页面
          this.myBoxShow = true
        },*/
        /*cancleBtn(){  //隐藏选择款式页面
          this.myBoxShow = false
        },*/

        // 实现移动端拖拽
        down(){
          this.flags = true;
          var touch ;
          if(event.touches){
            touch = event.touches[0];
          }else {
            touch = event;
          }
          this.position.x = touch.clientX;
          this.position.y = touch.clientY;
          this.dx = moveDiv.offsetLeft;
          this.dy = moveDiv.offsetTop;
        },
        move(){
          if(this.flags){
            var touch ;
            if(event.touches){
              touch = event.touches[0];
            }else {
              touch = event;
            }
            this.nx = touch.clientX - this.position.x;
            this.ny = touch.clientY - this.position.y;
            this.xPum = this.dx+this.nx;
            this.yPum = this.dy+this.ny;
            moveDiv.style.left = this.xPum+"px";
            moveDiv.style.top = this.yPum +"px";
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove",function(){
              event.preventDefault();
            },false);
          }
        },
        //鼠标释放时候的函数
        end(){
          this.flags = false;
        },
      },
      created(){
        this.getParams();     //通过获取商品id来获取商品信息
        //this.GetRequest();  //获取当前openid
        this.GetOpenId();     //获取当前openid
      },
      watch:{
          '$route':'getParams'
      }
    }
</script>

<style scoped lang="less">
.container{
  margin-bottom: 1.4rem;background:#f8f8f8;
  .pic_warp{
    width:100%;
    .swiper-container{
      height:346px;
      overflow: hidden;
    }
    .swiper-wrapper{
      height:346px;
    }
    .swiper-pagination{
      font-size: 16px;
    }
    .swiper-slide{
      height:346px;
      float: left;
      img{
        height: 346px;
        width: 100%;
      }
    }
  }
  .main{
    background-color: #FFF;
    padding:10px .3rem 22px;
    font-size:15px;
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
    color: #FF5000;
    height:.96rem;
    line-height:.96rem;
    font-size:.64rem;
    span{font-size: .47rem;padding-right: .1rem;}
  }
  .adds{
    display: flex;
    line-height:0.8rem;
    padding:0 0.27rem;
    font-size: .35rem;
    background: #FFF;
    color:#cfcfcf;
    font-weight:lighter;
    span{flex:1;}
    .express{text-align: left;}
    .sales{text-align: right;}
  }
  .goodsRemark{
    background: #fff;
    border-top:10px solid #f8f8f8;
    padding: 0 .2rem;
    h3{line-height: 1rem;}
    pre{color: #7E7C78;
      padding: .1rem 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    font-size:13px;}
  }
}
#detailWrap{
  position: relative;
  .back{
    z-index: 99999;
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
.xuanfu {
  z-index: 990;
  position: fixed;
  top: 12rem;
  right: 0;
}
.yuanqiu {
  width:40px;
  height:60px;
  img{
    width:100%;
  }
}
</style>
