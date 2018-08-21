<template>
  <div class="box">
    <div id="addressWrap">
      <HeaderA title="选择收货地址">
        <span slot="back_1" class="back_1" @click="back()"></span>
      </HeaderA>
      <div class="content">
        <ul class="list">
          <li class="item" v-for="(item,index) in addressList" :key="index" @click.stop="leaveTo(item,index)">
              <p class="section">
                <span class="consignee">收货人:{{item.consignee}}</span>
                <span class="phone">{{item.mobile}}</span>
              </p>
              <p v-if="item.province === itemCity.id" v-for="(itemCity,cityIndex) in citys" :key="cityIndex">
                <span>收货地址:{{itemCity.name}}</span>
                <span v-if="item.city === districtItem.id" v-for="(districtItem,districtIndex) in itemCity.city" :key="districtIndex">
                    {{ districtItem.name }}
                  <span v-if="item.district === countyItem.id" v-for="(countyItem,countyIndex) in districtItem.district" :key="countyIndex">
                    {{ countyItem.name }}
                    <span>
                      {{ item.location }}
                    </span>
                  </span>
                </span>
              </p>
              <div class="controlBox">
                <label><input type="checkbox" ref="checkbox" @click.stop="doThis(item,index)"/>设为默认地址</label>
                <button @click.stop="deleteAddress(item,index)">删除</button>
              </div>
          </li>
        </ul>
      </div>
      <submitA submit="添加新地址" :bol="true" @click.native="newAddress"></submitA>
    </div>
  </div>
</template>

<script>
  import HeaderA from '../components/header/Header'
  import submitA from '../components/submit/submitA'
  import axios from 'axios'
  import {mapState} from 'vuex';
  import cityData from '../../static/city'

  export default {
        name: "addressA",
        inject:['reload'],
        components:{
          HeaderA,submitA
        },
        data(){
          return{
            addressList:[],  //地址信息列表
            citys:[],
            info: [],  //所有地址信息
            index:"", //传点击的addressList数组索引
            radio: 0
          }
        },
        computed:{
          ...mapState(["global"])
        },
        methods:{
          back(){  //返回
            this.$router.go(-1)
          },
          leaveTo(data,index){  //点击返回订单页，并传递参数
            this.$router.push({
              path: '/orders',
              query:{ index:index } //传点击的addressList数组索引
            });
            if(this.$refs.checkbox[index].checked){
              let memberId = window.sessionStorage.getItem('memberId');    //获取用户ID
                this.axios({
                method: 'post',
                url: this.global.defaultAddress,
                data: {"memberId":memberId,"addressId":data.addressId}
              })
            }
          },
          doThis(data,index){
            for(let i =0;i<this.$refs.checkbox.length;i++){
              if(this.$refs.checkbox[index].checked){
                this.$refs.checkbox[i].checked = false;
                this.$refs.checkbox[index].checked = true
              }
            }
          },
          /*doThis(data, index){
            this.radio = index;
            //阻止选框的事件冒泡
            console.log(data, index);
          }*/
          //跳转页面
          newAddress(){
            this.$router.push({path:'/newAddress'})
          },
          //获取后台数据，遍历到dom中
          getCity(){
            let memberId = window.sessionStorage.getItem('memberId');    //获取用户ID
            this.axios({
              method: 'post',
              url: this.global.address,
              data: {"memberId":memberId}
            }).then((res)=>{
              console.log(res);
              this.addressList = res.data.data;
              //console.log(this.addressList);
              this.info = cityData.cityData;
              this.$set(this.addressList,'citys',this.info);
              this.citys = this.addressList.citys;
              //console.log(this.citys, 'citys');
            })
          },
          //删除某项地址数据
          deleteAddress(data, index){
            const msg = "您确定要删除吗？";
            if (confirm(msg)){
              this.axios.post(this.global.deleteAddress, {"addressId":data.addressId}/*删除传递id就可以了*/)
                .then(()=>{
                  this.reload()//删除刷新
                  //this.$router.go(0)
                })
            }else{
              return false;
            }
          }
        },
        created() {
          this.getCity()  //获取地址信息列表
        }
    }
</script>

<style scoped lang="less">
  .content{
    width: 100%;overflow: hidden;margin-top:44px;margin-bottom: 44px;
  .m-cell{
    height: 1rem;
    line-height: initial;
    display: -webkit-box;
    -webkit-box-align: center;
    padding:.1rem  .2rem;
    border-bottom: 0.026667rem solid #ddd;
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
    .item{
      padding: .26rem .43rem;
      overflow:hidden;
      border-bottom: 2px solid #ddd;
      background-color: #fff;
      .section{
        font-size:16px;overflow:hidden;
        .consignee{float:left;color:#3a3a3a;}
        .phone{float:right;color:#333333;}
      }
      p{line-height: .58rem;font-size:14px;color:#333333;}
      button{
        height: .8rem;
        width: 1.5rem;
        background: #fff;
        color: #ff5d00;
        float: right;
        border: 1px solid #ff5d00;
        border-radius: 1rem;
        font-size:14px;
        outline: none;}
    }
  }
  .controlBox{
    overflow: hidden;
    label{
      font-size:14px;
      color:#ff5d00;
      line-height:.8rem;
      input{
        width:15px;
        height:15px;
        line-height:.8rem;
        vertical-align:text-bottom
      }
    }
  }
</style>
