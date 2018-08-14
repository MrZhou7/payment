<template>
    <div id="blankWrap">

    </div>
</template>

<script>
    export default {
        name: "blank",
      created(){
        this.nowUrl = window.location.href //获取url中"?"符后的字串
        //console.log(this.nowUrl)
        if (this.nowUrl.indexOf("=") !== -1){ //获取链接中的url
          let str = this.nowUrl.indexOf("=")
          //console.log(str)
          this.newUrl = this.nowUrl.substr(str+1)
          //console.log(this.newUrl)
          window.sessionStorage.setItem('url',this.newUrl)//储存截取的url
          this.open()
        }
      },
      methods:{
          open(){
            window.location.href = "http://xds.huift.com.cn/WechatConfirm/transfer/goConfirm?appid=DS0000&rtype=1"
            window.sessionStorage.setItem('back',"yes")//判断是否是第三方进入
          }
      }
    }
</script>

<style scoped>

</style>
