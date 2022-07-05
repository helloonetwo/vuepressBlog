# JavaScript进阶
## 函数
### compose和pipe函数
```js
function multiplyTwo(num) {
    return num * 2;
}

function minusOne(num) {
    return num - 1;
}

function addTwo(num) {
    return num + 2;
}

function addThree(num) {
    return num + 3;
}

function compose(a, b) {
    // 将类数组转换为数组  倒叙
    const args = [].slice.apply(arguments);
    console.log(args, '----args------', arguments)

    return function (num) {
        var _result = num;
        for (var i = args.length - 1; i >= 0; i--) {
            _result = args[i](_result);
        }
        console.log(_result, '_result')
        return _result;
    }
    /* return args.reduceRight((res, cb) => cb(res), num);*/
}
console.log(compose(addThree, addTwo, minusOne, multiplyTwo)(10));

Promise.resolve(10).then(multiplyTwo).then(minusOne).then(addTwo).then((res) => {
    console.log(res);
})
```


### 高阶函数
> 高阶函数英文叫Higher-order function。JavaScript的函数其实都指向某个变量。既然变量可以指向函数，函数的参数能接收变量，那么一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

```js
var arr = [1, 2, 3, 4, 5]
Array.prototype.myMap = function (fn) {
    var len = this.length;
    //创建新数组
    var arr = [];
    for (var i = 0; i < len; i++) {
        arr.push(fn(this[i], i))
    }
    return arr;
}
var aa = arr.myMap(function (ele, index) {
    return ele * 2;
})
 
```

```js
//自定义
var obj = {
    num1: 1,
    num2: 2,
    num3: 3,
    num4: 4,
    num5: 5,
    num6: 6
}

function findProperty(obj, fn) {
    var _obj = Object.create(obj);
    var _propertyArr = [];
    for (var item in obj) {
        if (fn.call(obj, obj[item], item)) {
            _propertyArr.push(item);
        }
    }
    return _propertyArr;
}
findProperty(obj, (value, name) => {
    return value % 2 == 0;
})
```
### 函数柯里化
> 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。

```js
// 定义一个createCurry的函数
function createCurry(fn){
    var slice = Array.prototype.slice,
    stored_args = slice.call(arguments,1);
    return function () {
        let new_args = slice.call(arguments),
        args = stored_args.concat(new_args);
        return fn.apply(null,args);
    }
}
```
在以上公共的柯里化函数中：

arguments,并不是一个真的数组，只是一个具有length属性的对象，所以我们从Array.prototype中借用slice方法帮我们把arguments转为一个真正的数组，方便我们更好的操作。
当我们第一次调用函数createCurry的时候，其中变量stored_args 是保持了除去第一个参数以外的参数，因为第一个参数是我们需要柯里化的函数。
当我们执行createCurry函数中返回的函数时，变量new_args获取参数并转为数组。
内部返回的函数通过闭包访问变量stored_args中存储的值和变量new_args的值合并为一个新的数组，并赋值给变量args。
最后调用fn.apply(null,args)方法，执行被柯里化的函数。

### 函数式编程

函数式编程具有五个鲜明的特点：
1. 函数是"第一等公民"
指的是函数与其他数据类型一样，处于平等地位
2. 只用"表达式"，不用"语句"
"表达式"（expression）是一个单纯的运算过程，总是有返回值；
"语句"（statement）是执行某种操作，没有返回值。
3. 没有"副作用"
指的是函数内部与外部互动（最典型的情况，就是修改全局变量的值），
产生运算以外的其他结果。
4. 不修改状态
变量往往用来保存"状态"（state）。不修改变量，意味着状态不能保存在变量中，
函数式编程使用参数保存状态
5. 引用透明
指的是函数的运行不依赖于外部变量或"状态"，只依赖于输入的参数，任何时候只要参数相同，
引用函数所得到的返回值总是相同的
```js
var a = 10;

function add(a, b) {
   return a + b;
}
a = 6;
add(a, 1);
console.log(add(a, 1), 'add(a, 1)')

var a = 123;

function aPlus(a) {
   var a = a;
   a = a + 1;
   return a;
}
console.log(aPlus(a), 'aPlus')

var obj = {
   a: 123
}

function objPlus(obj, num) {
   var _obj = Object.create(obj);
   _obj.a += num;
   return _obj;
}
var arr = [1, 2, 3];
console.log(objPlus(obj, 2), 'objPlus')

function arrPlus(arr, num) {
   var _arr = [...arr]
   _arr[0] += num;
   return _arr;
}
```