const changeNumber = function(num){
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
  };
export default{
  changeNumber
}
