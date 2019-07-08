//这里面就是封装我们常用的js代码
//创建对象
let kits = {};
//求n个数中的最大值
ktis.getMax = function() {
    let max = arguments[0];//先用一个数据把最大值储存起来，用于下面的比较
    for(let i = 1; i < arguments.length; i++) {    
        if(max < arguments[i]) {
            max = arguments[i];
        }else {
            max = max;
        }
        //或者 ：max = max < arguments[i] ? arguments[i] : max;
    }
    //修改函数的返回值
    return max;
}

////求n个数中的最小值
ktis.getMax = function() {
    let min = arguments[0];
    for(let i = 1; i < arguments.length; i++) {
        if(min > arguments[i]) {
            min = arguments[i];
        }else {
            min = min;
        }
    }
    return min ;
}

//获取时间
kits.formateDate = function() {
    let date = new Date();
    let year = date.getFullYear();
    let months = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    //让小于两位数的数值前面+ 0 ;
    months = months < 10 ? '0' + months : months;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    //时间的格式yyyy-mm-dd hh:mm:ss
    let time = year + '-' + months + '-' + day +' ' + hours + ':' + minutes + ':' + seconds;
    console.log(time);

}

// 随机整数
kits.randomInt = function(n,m){
    return Math.floor(Math.random() *(m-n+1) + n);
  }
  
  /**
   * 封装的是一个可以生成唯一id的方法
   */
  kits.primaryKey = function(){
    // 我们通过时间戳 + 大范围的随机数来生成id
    let now = Date.now(); //得到是从1970年到现在为止的总的毫秒数
    // 为了防止在1毫秒之内生成的id有多个，再次加上一个大范围的随机数
    let r = kits.randomInt(100000,999999);
    // console.log(r);
    // 把两个得到的结果，拼接起来
    return now + '' + r;
  }