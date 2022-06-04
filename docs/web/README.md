### 数据类型的8种判断

## type of
 - 主要用途： 操作数的类型， 只能识别基础数据类型和引用类型
 - 特别注意： null, NaN, document.all 

## constructor 
 - 原理： constructor 指向创建实例对象的构造函数
 - 注意事项： null 和 underfind
 - constructor可以被改写

```js
String.prototype.constructor = function a() {
    return {}
}
console.log("a".constructor)
```

## instanceof
- 原理： 就是原型链上查找，查找即是其实例
- 注意： 右操作数必须是函数或者class

## isPrototypeOf
- 原理： 是否出现在实例对象的原型链上
- 注意事项： 能正常返回值的情况，基本等同与instance of 

## Object.prototype.toString
- 原理： 通过函数的动态this 特性, 返回其数据类型

## 鸭子类型检测
- 原理：检查自身，属性的类型或者执行结果的类型

## Symbol.toStringTag 
```js
class MyArray {
    get [Symbol.toStringTag](){
        return "MyArray"
    }
}

var pf = console.log;
var a = new MyArray();
pf(Object.prototype.toString.call(a) )
```
## 等比较
- 原理： 与某个固定的值进行比较


### 数值千分位6种方法以及赏析性能大比拼！
format_with_array
```js
function format_with_array(number) {
    // 转为字符串，并按照.拆分
  var arr = (number + '').split('.');
    // 整数部分再拆分
  var int = arr[0].split('');
    // 小数部分
  var fraction = arr[1] || '';
    // 返回的变量
  var r = "";
  var len = int.length;
    // 倒叙并遍历
  int.reverse().forEach(function (v, i) {
        // 非第一位并且是位值是3的倍数， 添加 ","
      if (i !== 0 && i % 3 === 0) {
          r = v + "," + r;
      } else {
            // 正常添加字符
          r = v + r;
      }
  })
    // 整数部分和小数部分拼接
  return r + (!!fraction ? "." + fraction : '');
}

const print = console.log;
print(format_with_array(938765432.02));


938765432.02

```

format_with_substring
```js
function format_with_substring(number) {
    // 数字转字符串, 并按照 .分割
  var arr = (number + '').split('.');
  var int = arr[0] + '';
  var fraction = arr[1] || '';

  // 多余的位数
  var f = int.length % 3;
  // 获取多余的位数，f可能是0， 即r可能是空字符串
  var r = int.substring(0, f);
  // 每三位添加","和对应的字符
  for (var i = 0; i < Math.floor(int.length / 3); i++) {
      r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
  }

  //多余的位数，上面
  if (f === 0) {
      r = r.substring(1);
  }
  // 整数部分和小数部分拼接
  return r + (!!fraction ? "." + fraction : '');
}


const print = console.log;
print(format_with_substring(938765432.02));
```

format_with_mod
```js
function format_with_mod(number) {
    var n = number;
    var r = ""; 
    var temp;
    do {
      	// 求模的值，用于获取高三位，这里可能有小数
        mod = n % 1000;
      	// 值是不是大于1，是继续的条件
        n = n / 1000;
      	// 高三位
        temp = ~~mod;
      	// 1. 填充 : n>1 循环未结束， 就要填充为比如，1 => 001, 
        // 不然 1 001， 就会变成 '11',
      	// 2. 拼接 ","
        r =  (n >= 1 ?`${temp}`.padStart(3, "0"): temp) + (!!r ? "," + r : "")
    } while (n >= 1)

    var strNumber = number + "";
    var index = strNumber.indexOf(".");
  	// 拼接小数部分，
    if (index >= 0) {
        r += strNumber.substring(index);
    }
    return r;
}

const print = console.log;
print(format_with_mod(38765432.02));
```

format_with_regex
```js
function format_with_regex(number) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (number + '').replace(reg, '$&,');
}

// 987, 654, 321

// const print = console.log;
// print(format_with_regex(987654321));

function format_with_regex(number) {
    var reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (number + '').replace(reg, function(match, ...args){    
      console.log(match, ...args);
      return match + ','
    });
}
format_with_regex(987654321)



// function format_with_regex(number) {
//     var reg = /(\d)(?=(?:\d{3})+$)/g
//     return (number + '').replace(reg, '$1,');
// }
```

format_with_toLocaleString
```js
function format_with_toLocaleString(number, minimumFractionDigits, maximumFractionDigits) {
    minimumFractionDigits = minimumFractionDigits || 2;
    maximumFractionDigits = (maximumFractionDigits || 2);
    maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

    return number.toLocaleString("en-us", {
        maximumFractionDigits: maximumFractionDigits || 2,
        minimumFractionDigits: minimumFractionDigits || 2
    })
}


function format_with_toLocaleString(number) {
    return number.toLocaleString("en-us")
}


const print = console.log;
print(format_with_toLocaleString(938765432.02));
```

Intl.NumberFormat
```js
function format_with_Intl(number, minimumFractionDigits, maximumFractionDigits) {
    minimumFractionDigits = minimumFractionDigits || 2;
    maximumFractionDigits = (maximumFractionDigits || 2);
    maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

    return new Intl.NumberFormat('en-us', {
        maximumFractionDigits: maximumFractionDigits || 2,
        minimumFractionDigits: minimumFractionDigits || 2
    }).format(number)
}


// 使用默认配置选项
// function format_with_Intl(number) {
//     return new Intl.NumberFormat('en-us').format(number)
// }


const print = console.log;
print(format_with_Intl(938765432.02));
```

性能比较：
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>数字千分位</title>
</head>

<body>


    <div style="text-align:center">
        <p><input type="number" value="5000" id="textCount" /></p>
        <p>
            <input type="button" onclick="executeTest()" value="测试" />
            <input type="button" onclick="javascript:document.getElementById('messageEl').innerHTML=''" value="清除" />
        </p>


    </div>
    <div id="messageEl" style="width: 300px;margin: auto;">

    </div>


    <script>
        function format_with_array(number) {
            var arr = (number + '').split('.');
            var int = arr[0].split('');
            var fraction = arr[1] || '';
            var r = "";
            var len = int.length;
            int.reverse().forEach(function(v, i) {
                if (i !== 0 && i % 3 === 0) {
                    r = v + "," + r;
                } else {
                    r = v + r;
                }
            })
            return r + (!!fraction ? "." + fraction : '');
        }
    </script>

    <script>
        function format_with_substring(number) {
            var arr = (number + '').split('.');
            var int = arr[0] + '';
            var fraction = arr[1] || '';
            var f = int.length % 3;
            var r = int.substring(0, f);

            for (var i = 0; i < Math.floor(int.length / 3); i++) {
                r += ',' + int.substring(f + i * 3, f + (i + 1) * 3)
            }

            if (f === 0) {
                r = r.substring(1);
            }
            return r + (!!fraction ? "." + fraction : '');
        }
    </script>

    <script>
        function format_with_mod(number) {
            var n = number;
            var r = "";
            var temp;
            var mod;
            do {
                mod = n % 1000;
                n = n / 1000;
                temp = ~~mod;
                r = (n > 1 ? `${temp}`.padStart(3, "0") : temp) + (!!r ? "," + r : "")
            } while (n > 1)

            var strNumber = number + "";
            var index = strNumber.indexOf(".");
            if (index > 0) {
                r += strNumber.substring(index);
            }
            return r;
        }
    </script>

    <script>
        function format_with_regex(number) {
            var reg = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
            // var reg = /(\d)(?=(?:\d{3})+$)/g
            //var reg = /\d{1,3}(?=(\d{3})+$)/g;
            return (number + '').replace(reg, '$1,');
        }
    </script>

    <script>
        // function format_with_toLocaleString(number, minimumFractionDigits, maximumFractionDigits) {
        //     minimumFractionDigits = minimumFractionDigits || 2;
        //     maximumFractionDigits = (maximumFractionDigits || 2);
        //     maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

        //     return number.toLocaleString("en-us", {
        //         maximumFractionDigits: maximumFractionDigits || 2,
        //         minimumFractionDigits: minimumFractionDigits || 2
        //     })
        // }

        function format_with_toLocaleString(number) {
            return number.toLocaleString("en-us")
        }
    </script>

    <script>
        // function format_with_Intl(number, minimumFractionDigits, maximumFractionDigits) {
        //     minimumFractionDigits = minimumFractionDigits || 2;
        //     maximumFractionDigits = (maximumFractionDigits || 2);
        //     maximumFractionDigits = Math.max(minimumFractionDigits, maximumFractionDigits);

        //     return new Intl.NumberFormat('en-us', {
        //         maximumFractionDigits: maximumFractionDigits || 2,
        //         minimumFractionDigits: minimumFractionDigits || 2
        //     }).format(number)
        // }


        const format = new Intl.NumberFormat('en-us');

        function format_with_Intl(number) {
            return format.format(number)
        }
    </script>


    <script>
        function getData(count) {
            var data = new Array(count).fill(0).map(function(i) {
                var rd = Math.random();
                var r = rd * Math.pow(10, Math.trunc(Math.random() * 12));
                if (rd > 0.5) {
                    r = ~~r;
                }
                return r
            })
            return data;
        }

        function test(data, fn, label) {
            var start = performance.now();
            for (var i = 0; i < data.length; i++) {
                fn(data[i]);
            }
            var time = performance.now() - start;

            message((fn.name || label) + ":" + time.toFixed(2) + "ms");
        }


        function executeTest() {
            var data = getData(+textCount.value);
            test(data, format_with_array);
            test(data, format_with_mod);
            test(data, format_with_substring);
            test(data, format_with_regex);
            test(data, format_with_toLocaleString);
            test(data, format_with_Intl);
            message("-------------------")
        }

        function message(msg) {
            var el = document.createElement("p");
            el.innerHTML = msg;
            messageEl.appendChild(el);
        }
    </script>


</body>

</html>
```