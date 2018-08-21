<template>
    <div id="blankWrap">

    </div>
</template>

<script>
    export default {
        name: "blank",
      created(){
        this.nowUrl = window.location.href; //获取url中"?"符后的字串
        //console.log(this.nowUrl)
        if (this.nowUrl.indexOf("=") !== -1){ //获取链接中的url
          let str = this.nowUrl.indexOf("=");
          //console.log(str)
          this.newUrl = this.nowUrl.substr(str+1);
          //console.log(this.newUrl)
          window.sessionStorage.setItem('url',this.newUrl);//储存截取的url
          this.open()
        }
      },
      methods:{
          open(){
            window.location.href = "http://xds.huift.com.cn/WechatConfirm/transfer/goConfirm?appid=DS0000&rtype=1"
            window.sessionStorage.setItem('back',"yes")//判断是否是第三方进入
          }
        /*GetRequest(){
          this.nowUrl = window.location.href; //获取url中"?"符后的字串*!/
          console.log(this.nowUrl);
          if (this.nowUrl.indexOf("?") !== -1){
            let str = this.nowUrl.indexOf("=");
            let end = this.nowUrl.indexOf("&");
            //console.log(str)
            //console.log(end)
            this.newUrl = this.nowUrl.substring(str+1,end);//截取的openid
            //console.log(this.newUrl)

             let two = this.nowUrl.indexOf("=",str+1);   //截取的跳转url
             let goToNum = this.nowUrl.indexOf("&",end+1);
             let num = this.nowUrl.indexOf("&",end+1);
             this.goToUrl = this.nowUrl.substring(two+1,goToNum);
             //console.log(this.goToUrl)

            //window.sessionStorage.setItem("goToUrl",this.goToUrl);//储存截取的跳转url
            this.axios({
              method:"post",
              url:"http://xds.huift.com.cn/server/openId",
              data:{"openId":this.newUrl}
            })
              .then((res)=>{
                //console.log(res);
                window.sessionStorage.setItem('memberId',res.data.data.memberId); //储存用户ID
                window.sessionStorage.setItem('openId',this.newUrl); //储存用户openID
                let store = window.sessionStorage.getItem('store');//判断返回到首页后的跳转
                if(store){
                  this.isShow = true;
                  this.$router.push({path:"/"})
                  window.sessionStorage.setItem("num",1);  //储存这个值，判断是否是主页
                }else if( this.goToUrl && num!== -1 ){
                  window.location.href = "http://xds.huift.com.cn/#/" + this.goToUrl
                }else{
                  this.isShow = true;
                  this.$router.push({path:"/"})
                  window.sessionStorage.setItem("num",1);  //储存这个值，判断是否是主页
                }
              })
          }
        }*/
      }
    }
</script>

<style scoped>

</style>
