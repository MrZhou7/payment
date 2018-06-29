<template>
  <div class="box">
    <div id="addressWrap">
      <HeaderA title="选择收货地址">
        <a href="#" slot="back_1" class="back_1" @click="back"></a>
      </HeaderA>
      <div class="content">
        <ul class="list">
          <li class="item">
            <mt-cell-swipe
              :right="[
                {
                    content: '删除',
                    style: { background: '#ff7900', color: '#fff'},
                    handler: () => deleteSection(section.PartId)
                }
            ]">
              <p class="section"><p><span class="consignee">收货人:周云</span><span class="phone">13871435839</span></p></p>
              <p class="teacher">收货地址:光谷街20号康桥小区</p>
            </mt-cell-swipe>
          </li>
        </ul>
      </div>
      <submitA submit="添加新地址" :bol="true" @click.native="newAddress"></submitA>
    </div>
  </div>
</template>

<script>
  import HeaderA from '../components/header/HeaderA'
  import submitA from '../components/submit/submitA'
  import axios from 'axios'
  import { CellSwipe } from 'mint-ui';

  export default {
        name: "addressA",
        components:{
          HeaderA,submitA,CellSwipe
        },

        methods:{
          back(){
            this.$route.go(-1)
          },
          newAddress(){
            this.$router.push({path:'/newAddress'})
          }
        },
        created(){
          // this.axios.post('http://192.168.5.178:8080/address/Id', {
          //   data:{"memberId":1}
          // }).then((res)=>{
          //     console.log(res);
          //   })
          //   .catch((error)=>{
          //     console.log(error);
          //   })
          this.axios({
            method: 'post',
            url: 'http://192.168.5.178:8080/address/Id',
            data: {"memberId":1}
          }).then((res)=>{
            console.log(res);
          })
            .catch((error)=>{
              console.log(error);
            })
        }
    }
</script>

<style scoped lang="less">
  .content{
    width: 100%;overflow: hidden;margin-top: 1.2rem;margin-bottom: 1.42rem;
  .m-cell{
    height: 1rem;
    line-height: initial;
    display: -webkit-box;
    -webkit-box-align: center;
    padding:.1rem  .2rem;
    border-bottom: 0.026667rem solid #ddd;
    font-size: 0.4rem;
  input,textarea{
    border: none;
    display: block;
    position: relative;
    height:  1rem;
    line-height:  1rem;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.4rem;
    text-align: left;
    text-indent: .5rem;
    outline: none;
    width:8rem;}
  }
  .heigh{
    height: 3rem;
  textarea{
    height: 3rem;}
  }
  }
</style>
