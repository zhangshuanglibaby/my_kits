//这里面就是封装我们常用的js代码
//创建对象
let kits = {};
//求n个数中的最大值
ktis.getMax = function () {
  let max = arguments[0]; //先用一个数据把最大值储存起来，用于下面的比较
  for (let i = 1; i < arguments.length; i++) {
    if (max < arguments[i]) {
      max = arguments[i];
    } else {
      max = max;
    }
    //或者 ：max = max < arguments[i] ? arguments[i] : max;
  }
  //修改函数的返回值
  return max;
};

////求n个数中的最小值
ktis.getMax = function () {
  let min = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    if (min > arguments[i]) {
      min = arguments[i];
    } else {
      min = min;
    }
  }
  return min;
};

//获取时间
kits.formateDate = function () {
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
  let time = year + '-' + months + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  console.log(time);

};

// 随机整数
kits.randomInt = function (n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
};


//封装的是一个可以生成唯一id的方法
kits.primaryKey = function () {
  // 我们通过时间戳 + 大范围的随机数来生成id
  let now = Date.now(); //得到是从1970年到现在为止的总的毫秒数
  // 为了防止在1毫秒之内生成的id有多个，再次加上一个大范围的随机数
  let r = kits.randomInt(100000, 999999);
  // console.log(r);
  // 把两个得到的结果，拼接起来
  return now + '' + r;
};

//从url地址栏里面获取后面的参数 eg ： id=10086&name=goudan&pwd=123
kits.getUrlParams = function () {
  let arr = location.search.substring(1).split('&');
  let params = {};
  arr.forEach(e => {
    let temp = e.split('=');
    let key = temp[0];
    let val = temp[1];
    params[key] = val;
  })
  return params;
}

//封装验证数据的方法
//用一个对象把需要验证的规则放进去,变成对象的方法
let strategies = {
  //验证非空
  isNonEmpty: function (val, msg) {
    if (val.trim().length === 0) {
      return msg;
    }
  },
  //验证长度
  minLength: function (val, len, msg) {
    if (val.trim().length < len) {
      return msg;
    }
  },
  //验证手机号码的方法
  isMobile: function (val, msg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return msg;
    }
  }
}

//状态模式的思想 ：使用状态代替if-else
function Validator() {
  //有一个数组,用来储存所有验证的函数
  this.validateFuns = [];
}

//给构造函数的原型添加一个方法,让其可以添加一个新的函数进去
Validator.prototype.add = function (dom, arr) {
  //遍历数组,往this.validateFuns添加新的验证方法
  for (let i = 0; i < arr.length; i++) {
    let fn = function () {
      let rule = arr[i];
      let params = rule.fnName.split(':'); //eg[minLength,8]
      let fnName = params.shift();
      params.unshift(dom.value); //eg[dom.vlaue,8]
      params.push(rule.errMsg); // eg[dom.value,8,rule.errMsg];
      return strategies[fnName].apply(dom, params);
    }
    this.validateFuns.push(fn);
  }
}

//需要一个可以把数组里面的每个函数都执行的方法
Validator.prototype.start = function () {
  //遍历数组
  for (let i = 0; i < this.validateFuns.length; i++) {
    let msg = this.validateFuns[i]();
    if (msg) {
      return msg;
    }
  }
};

//收集表单数据的方法
kits.serialize = function(formSelector) {
  let form = document.querySelector(formSelector);
  let eles = form.querySelectorAll('[name]');
  //创建一个空数组
  let arr = [];
  //由于单选框的值只能有一个,因此要判断
  //遍历eles
  eles.forEach(e => {
    if (e.type === 'radio' && e.checked) {
      let key = e.name;
      let val = e.value;
      arr.push(key + '=' + val);
    }
    if (e.type !== 'radio') {
      let key = e.name;
      let val = e.value;
      arr.push(key + '=' + val);
    }
  });
  //利用数组的jion方法
  return arr.join('&')
};