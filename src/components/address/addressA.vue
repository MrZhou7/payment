<template>
    <div id="address_1" @click="goAddress">
        <div class="add_pic"><img src="../../assets/img/address.png" alt=""></div>
        <div class="add_detail">
          <p>
            <span class="consignee">收货人:周云</span>
            <span class="phone">13871435839</span></p>
          <p>收货地址:光谷街20号康桥小区</p>
          <span>(收货不便时,可选择免费代收货服务)</span>
        </div>
    </div>
</template>

<script>
  import axios from "axios"
    export default {
      name: "addressA",
      data(){
        return{
          Id:""
        }
      },
      methods:{
        goAddress(){
          this.$router.push({
            path:"/address"
          })
        },
        getId(){
          this.Id = this.$route.query.addressId
          console.log(this.Id)
          axios.post('http://192.168.5.183:8080/address/addressId', this.Id)
            .then(response => {
              // post 成功，response.data 为返回的数据
              console.log(response.phone)
            })
            .catch(error => {
              // 请求失败
              console.log(error)
            })
        }
      },
      mounted(){
        this.getId()
      }
    }
</script>

<style scoped lang="less">
  #address_1{
    width:100%;
    display:flex;
    background-color: #fff;
    box-shadow: 0 1px 0 0 rgba(0,0,0,.2), 0 0.5px 0 0 rgba(0,0,0,.3);
    color: #666;
    .add_pic{
      flex:2;
      position: relative;
      img{width: 65%;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);}
    }
    .add_detail{
      flex:9;padding: 0.5rem 0.5rem 0.3rem 0;
      p{line-height:0.6rem;font-size:.4rem;overflow:hidden;}
      .consignee{float:left;}
      .phone{float:right;}
      &>span{display: block;font-size:.3rem;line-height:0.6rem;color:#FFA800;}
    }
  }

</style>
