//这里面就是封装我们常用的js代码

//求n个数中的最大值
function getMax() {
    var max = arguments[0];//先用一个数据把最大值储存起来，用于下面的比较
    for(var i = 1; i < arguments.length; i++) {    
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
function getMin() {
    var min = arguments[0];
    for(var i = 1; i < arguments.length; i++) {
        if(min > arguments[i]) {
            min = arguments[i];
        }else {
            min = min;
        }
    }
    return min ;
}