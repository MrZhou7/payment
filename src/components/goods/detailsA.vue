<template>
    <div id="detailWrap">
      <p class="title">JORDAN官方旗舰店</p>
      <div class="data">
        <div class="pic"><img :src=dataList.pic alt=""></div>
        <div class="state">
          <p class="state_1">{{dataList.title}}</p>
          <p class="state_2">颜色分类:001黑/火焰红-水泥灰-白;鞋码:41;</p>
          <p class="state_3">七天退换</p>
          <p class="money">{{dataList.price}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    import { newList } from "../../api/api";
    export default {
      name: "detailsA",
      data(){
        return{
          getID:"",
          dataList:[]
        }
      },
      created(){
        this.getData()
      },
      methods:{
        getData(){
          let getID = this.$route.params.dataId;
          //console.log(getID)
          let params = {};
          newList(params).then(res=>{
            this.dataList = res.data[getID-1];
            //console.log(this.dataList)
          })
        }
      },
      watch:{
        '$route':'getData'
      }
    }
</script>

<style scoped lang="less">
  #detailWrap{
    margin-top:.2rem;
    .title{padding:.2rem 1.65rem;font-size:.4rem;background:#fff;}
    .data{
      display:flex;
      .pic{
        flex:3;padding:.2rem;
        img{width:100%;}
      }
      .state{
        flex:5; margin-top:0.2rem;padding-right: .2rem;
        .state_1{font-size:.4rem;}
        .state_2{color:#999;font-size: 0.3rem;}
        .state_3{color: #ff0036;padding: 0 3px;font-size: 0.3rem;}
        .money{flex:2;font-weight: bolder;color: #ff0036;margin-top:0.2rem;font-size:.4rem;}
      }
    }
  }
</style>
