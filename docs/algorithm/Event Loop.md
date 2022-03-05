### Event Loop 机制

::: tip
Event Loop 机制
:::

## 一、什么是回调函数

在 JavaScript 中，函数即对象。我们可以将对象作为参数传递给函数吗？答案是“可以”。

所以，我们可以将函数作为参数传递给其他函数，在外部函数中调用它。听起来有点复杂？我们看一下下面的例子：

print( ) 函数将另一个函数作为参数，并在函数体内部调用它。在 JavaScript 里，我们叫它“回调”。所以，被传递给另一个函数作为参数的函数叫作回调函数。

```js
function print(callback) {
  callback();
}
```

#### 回调函数可能写出回调地狱

```js
// 回调函数

function foo(callback) {
  setTimeout(function () {
    callback();
  }, 3000);
}

foo(function () {
  console.log("这就是一个回调函数");
  console.log("调用者定义这个函数，执行者执行这个函数");
  console.log("其实就是调用者告诉执行者异步任务结束后应该做什么");
});

// 回调地狱，只是示例，不能运行

$.get("/url1", function (data1) {
  $.get("/url2", data1, function (data2) {
    $.get("/url3", data2, function (data3) {
      $.get("/url4", data3, function (data4) {
        $.get("/url5", data4, function (data5) {
          $.get("/url6", data5, function (data6) {
            $.get("/url7", data6, function (data7) {
              // 略微夸张了一点点
            });
          });
        });
      });
    });
  });
});
```

## 二、Event Loop

Event Loop 是什么
event loop 是一个执行模型，在不同的地方有不同的实现。浏览器和 NodeJS 基于不同的技术实现了各自的 Event Loop。

浏览器的 Event Loop 是在 html5 的规范中明确定义。
NodeJS 的 Event Loop 是基于 libuv 实现的。可以参考 Node 的官方文档以及 libuv 的官方文档。
libuv 已经对 Event Loop 做出了实现，而 HTML5 规范中只是定义了浏览器中 Event Loop 的模型，具体的实现留给了浏览器厂商。
宏队列和微队列
宏队列，macrotask，也叫 tasks。 一些异步任务的回调会依次进入 macro task queue，等待后续被调用，这些异步任务包括：

setTimeout
setInterval
setImmediate (Node 独有)
requestAnimationFrame (浏览器独有)
I/O
UI rendering (浏览器独有)
微队列，microtask，也叫 jobs。 另一些异步任务的回调会依次进入 micro task queue，等待后续被调用，这些异步任务包括：

process.nextTick (Node 独有)
Promise
Object.observe
MutationObserver
（注：这里只针对浏览器和 NodeJS）

浏览器的 Event Loop
我们先来看一张图，再看完这篇文章后，请返回来再仔细看一下这张图，相信你会有更深的理解。

browser-eventloop
这张图将浏览器的 Event Loop 完整的描述了出来，我来讲执行一个 JavaScript 代码的具体流程：

执行全局 Script 同步代码，这些同步代码有一些是同步语句，有一些是异步语句（比如 setTimeout 等）；
全局 Script 代码执行完毕后，调用栈 Stack 会清空；
从微队列 microtask queue 中取出位于队首的回调任务，放入调用栈 Stack 中执行，执行完后 microtask queue 长度减 1；
继续取出位于队首的任务，放入调用栈 Stack 中执行，以此类推，直到直到把 microtask queue 中的所有任务都执行完毕。注意，如果在执行 microtask 的过程中，又产生了 microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；
microtask queue 中的所有任务都执行完毕，此时 microtask queue 为空队列，调用栈 Stack 也为空；
取出宏队列 macrotask queue 中位于队首的任务，放入 Stack 中执行；
执行完毕后，调用栈 Stack 为空；
重复第 3-7 个步骤；
重复第 3-7 个步骤；
……
可以看到，这就是浏览器的事件循环 Event Loop

这里归纳 3 个重点：

宏队列 macrotask 一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
微任务队列中所有的任务都会被依次取出来执行，知道 microtask queue 为空；
图中没有画 UI rendering 的节点，因为这个是由浏览器自行判断决定的，但是只要执行 UI rendering，它的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧跟着执行 UI render。
好了，概念性的东西就这么多，来看几个示例代码，测试一下你是否掌握了:

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
});

new Promise((resolve, reject) => {
  console.log(4);
  resolve(5);
}).then((data) => {
  console.log(data);
});

setTimeout(() => {
  console.log(6);
});

console.log(7);
```

这里结果会是什么呢？运用上面了解到的知识，先自己做一下试试看。

// 正确答案
1
4
7
5
2
3
6
你答对了吗？

我们来分析一下整个流程：

执行全局 Script 代码
Step 1

```js
console.log(1)

Stack Queue: [console]

Macrotask Queue: []

Microtask Queue: []
```

打印结果：
1

Step 2

```js
setTimeout(() => {
// 这个回调函数叫做 callback1，setTimeout 属于 macrotask，所以放到 macrotask queue 中
console.log(2);
Promise.resolve().then(() => {
console.log(3)
});
});

Stack Queue: [setTimeout]

Macrotask Queue: [callback1]

Microtask Queue: []

```

打印结果：
1

Step 3

```js
new Promise((resolve, reject) => {
  // 注意，这里是同步执行的，如果不太清楚，可以去看一下我开头自己实现的 promise 啦~~
  console.log(4);
  resolve(5);
}).then((data) => {
  // 这个回调函数叫做 callback2，promise 属于 microtask，所以放到 microtask queue 中
  console.log(data);
});
```

Stack Queue: [promise]

Macrotask Queue: [callback1]

Microtask Queue: [callback2]

打印结果：
1
4

Step 5

```js
setTimeout(() => {
  // 这个回调函数叫做 callback3，setTimeout 属于 macrotask，所以放到 macrotask queue 中
  console.log(6);
});
```

Stack Queue: [setTimeout]

Macrotask Queue: [callback1, callback3]

Microtask Queue: [callback2]

打印结果：
1
4

Step 6

```js
console.log(7)
Stack Queue: [console]

Macrotask Queue: [callback1, callback3]

Microtask Queue: [callback2]
```

打印结果：
1
4
7

好啦，全局 Script 代码执行完了，进入下一个步骤，从 microtask queue 中依次取出任务执行，直到 microtask queue 队列为空。
Step 7

```js
console.log(data) // 这里 data 是 Promise 的决议值 5

Stack Queue: [callback2]

Macrotask Queue: [callback1, callback3]

Microtask Queue: []
```

打印结果：
1
4
7
5

这里 microtask queue 中只有一个任务，执行完后开始从宏任务队列 macrotask queue 中取位于队首的任务执行
Step 8

```js
console.log(2)
Stack Queue: [callback1]

Macrotask Queue: [callback3]

Microtask Queue: []
```

打印结果：
1
4
7
5
2

但是，执行 callback1 的时候又遇到了另一个 Promise，Promise 异步执行完后在 microtask queue 中又注册了一个 callback4 回调函数

Step 9

```js
Promise.resolve().then(() => {
  // 这个回调函数叫做 callback4，promise 属于 microtask，所以放到 microtask queue 中
  console.log(3);
});
```

Stack Queue: [promise]

Macrotask v: [callback3]

Microtask Queue: [callback4]

打印结果：
1
4
7
5
2

取出一个宏任务 macrotask 执行完毕，然后再去微任务队列 microtask queue 中依次取出执行
Step 10

```js
console.log(3)
复制代码
Stack Queue: [callback4]

Macrotask Queue: [callback3]

Microtask Queue: []
```

打印结果：
1
4
7
5
2
3

微任务队列全部执行完，再去宏任务队列中取第一个任务执行
Step 11

```js
console.log(6)
复制代码
Stack Queue: [callback3]

Macrotask Queue: []

Microtask Queue: []
```

打印结果：
1
4
7
5
2
3
6

以上，全部执行完后，Stack Queue 为空，Macrotask Queue 为空，Micro Queue 为空
Stack Queue: []

Macrotask Queue: []

Microtask Queue: []

最终打印结果：
1
4
7
5
2
3
6

因为是第一个例子，所以这里分析的比较详细，大家仔细看一下，接下来我们再来一个例子：

```js
console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => {
    console.log(3);
  });
});

new Promise((resolve, reject) => {
  console.log(4);
  resolve(5);
}).then((data) => {
  console.log(data);

  Promise.resolve()
    .then(() => {
      console.log(6);
    })
    .then(() => {
      console.log(7);

      setTimeout(() => {
        console.log(8);
      }, 0);
    });
});

setTimeout(() => {
  console.log(9);
});

console.log(10);
```

最终输出结果是什么呢？参考前面的例子，好好想一想……

// 正确答案
1
4
10
5
6
7
2
3
9
8
相信大家都答对了，这里的关键在前面已经提过：

在执行微队列 microtask queue 中任务的时候，如果又产生了 microtask，那么会继续添加到队列的末尾，也会在这个周期执行，直到 microtask queue 为空停止。

注：当然如果你在 microtask 中不断的产生 microtask，那么其他宏任务 macrotask 就无法执行了，但是这个操作也不是无限的，拿 NodeJS 中的微任务 process.nextTick()来说，它的上限是 1000 个，后面我们会讲到。

浏览器的 Event Loop 就说到这里，下面我们看一下 NodeJS 中的 Event Loop，它更复杂一些，机制也不太一样。

NodeJS 中的 Event Loop
libuv
先来看一张 libuv 的结构图：

node-libuv
NodeJS 中的宏队列和微队列
NodeJS 的 Event Loop 中，执行宏队列的回调任务有 6 个阶段，如下图：

node-eventloop-6phase
各个阶段执行的任务如下：

timers 阶段：这个阶段执行 setTimeout 和 setInterval 预定的 callback
I/O callback 阶段：执行除了 close 事件的 callbacks、被 timers 设定的 callbacks、setImmediate()设定的 callbacks 这些之外的 callbacks
idle, prepare 阶段：仅 node 内部使用
poll 阶段：获取新的 I/O 事件，适当的条件下 node 将阻塞在这里
check 阶段：执行 setImmediate()设定的 callbacks
close callbacks 阶段：执行 socket.on(‘close’, ….)这些 callbacks
NodeJS 中宏队列主要有 4 个

由上面的介绍可以看到，回调事件主要位于 4 个 macrotask queue 中：

Timers Queue
IO Callbacks Queue
Check Queue
Close Callbacks Queue
这 4 个都属于宏队列，但是在浏览器中，可以认为只有一个宏队列，所有的 macrotask 都会被加到这一个宏队列中，但是在 NodeJS 中，不同的 macrotask 会被放置在不同的宏队列中。

NodeJS 中微队列主要有 2 个：

Next Tick Queue：是放置 process.nextTick(callback)的回调任务的
Other Micro Queue：放置其他 microtask，比如 Promise 等
在浏览器中，也可以认为只有一个微队列，所有的 microtask 都会被加到这一个微队列中，但是在 NodeJS 中，不同的 microtask 会被放置在不同的微队列中。

具体可以通过下图加深一下理解：

node-eventloop
大体解释一下 NodeJS 的 Event Loop 过程：

执行全局 Script 的同步代码
执行 microtask 微任务，先执行所有 Next Tick Queue 中的所有任务，再执行 Other Microtask Queue 中的所有任务
开始执行 macrotask 宏任务，共 6 个阶段，从第 1 个阶段开始执行相应每一个阶段 macrotask 中的所有任务，注意，这里是所有每个阶段宏任务队列的所有任务，在浏览器的 Event Loop 中是只取宏队列的第一个任务出来执行，每一个阶段的 macrotask 任务执行完毕后，开始执行微任务，也就是步骤 2
Timers Queue -> 步骤 2 -> I/O Queue -> 步骤 2 -> Check Queue -> 步骤 2 -> Close Callback Queue -> 步骤 2 -> Timers Queue ……
这就是 Node 的 Event Loop
关于 NodeJS 的 macrotask queue 和 microtask queue，我画了两张图，大家作为参考：

node-microtaskqueue
node-macrotaskqueue
好啦，概念理解了我们通过几个例子来实战一下：

第一个例子

```js
console.log("start");

setTimeout(() => {
  // callback1
  console.log(111);
  setTimeout(() => {
    // callback2
    console.log(222);
  }, 0);
  setImmediate(() => {
    // callback3
    console.log(333);
  });
  process.nextTick(() => {
    // callback4
    console.log(444);
  });
}, 0);

setImmediate(() => {
  // callback5
  console.log(555);
  process.nextTick(() => {
    // callback6
    console.log(666);
  });
});

setTimeout(() => {
  // callback7
  console.log(777);
  process.nextTick(() => {
    // callback8
    console.log(888);
  });
}, 0);

process.nextTick(() => {
  // callback9
  console.log(999);
});

console.log("end");
```

上面这段代码你执行的结果可能会有多种情况，原因解释如下。

setTimeout(fn, 0)不是严格的 0，一般是 setTimeout(fn, 3)或什么，会有一定的延迟时间，当 setTimeout(fn, 0)和 setImmediate(fn)出现在同一段同步代码中时，就会存在两种情况。

- 第 1 种情况：同步代码执行完了，Timer 还没到期，setImmediate 回调先注册到 Check Queue 中，开始执行微队列，然后是宏队列，先从 Timers Queue 中开始，发现没回调，往下走直到 Check Queue 中有回调，执行，然后 timer 到期（只要在执行完 Timer Queue 后到期效果就都一样），timer 回调注册到 Timers Queue 中，下一轮循环执行到 Timers Queue 中才能执行那个 timer 回调；所以，这种情况下，setImmediate(fn)回调先于 setTimeout(fn, 0)回调执行。
- 第 2 种情况：同步代码还没执行完，timer 先到期，timer 回调先注册到 Timers Queue 中，执行到 setImmediate 了，它的回调再注册到 Check Queue 中。 然后，同步代码执行完了，执行微队列，然后开始先执行 Timers Queue，先执行 Timer 回调，再到 Check Queue，执行 setImmediate 回调；所以，这种情况下，setTimeout(fn, 0)回调先于 setImmediate(fn)回调执行。
  所以，在同步代码中同时调 setTimeout(fn, 0)和 setImmediate 情况是不确定的，但是如果把他们放在一个 IO 的回调，比如 readFile(‘xx’, function () {// ….})回调中，那么 IO 回调是在 IO Queue 中，setTimeout 到期回调注册到 Timers Queue，setImmediate 回调注册到 Check Queue，IO Queue 执行完到 Check Queue，timer Queue 得到下个周期，所以 setImmediate 回调这种情况下肯定比 setTimeout(fn, 0)回调先执行。
  综上，这个例子是不太好的，setTimeout(fn, 0)和 setImmediate(fn)如果想要保证结果唯一，就放在一个 IO Callback 中吧，上面那段代码可以把所有它俩同步执行的代码都放在一个 IO Callback 中，结果就唯一了。

请运用前面学到的知识，仔细分析一下……

// 正确答案
start
end
999
111
777
444
888
555
333
666
222

你答对了吗？我们来一起分析一下：

执行全局 Script 代码，先打印 start，向下执行，将 setTimeout 的回调 callback1 注册到 Timers Queue 中，再向下执行，将 setImmediate 的回调 callback5 注册到 Check Queue 中，接着向下执行，将 setTimeout 的回调 callback7 注册到 Timers Queue 中，继续向下，将 process.nextTick 的回调 callback9 注册到微队列 Next Tick Queue 中,最后一步打印 end。此时，各个队列的回调情况如下：
宏队列

Timers Queue: [callback1, callback7]

Check Queue: [callback5]

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: [callback9]

Other Microtask Queue: []

打印结果
start
end

全局 Script 执行完了，开始依次执行微任务 Next Tick Queue 中的全部回调任务。此时 Next Tick Queue 中只有一个 callback9，将其取出放入调用栈中执行，打印 999。
宏队列

Timers Queue: [callback1, callback7]

Check Queue: [callback5]

IO Callback Queue： []

Close Callback Queue: []

微队列

Next Tick Queue: []

Other Microtask Queue: []

打印结果
start
end
999

开始依次执行 6 个阶段各自宏队列中的所有任务，先执行第 1 个阶段 Timers Queue 中的所有任务，先取出 callback1 执行，打印 111，callback1 函数继续向下，依次把 callback2 放入 Timers Queue 中，把 callback3 放入 Check Queue 中，把 callback4 放入 Next Tick Queue 中，然后 callback1 执行完毕。再取出 Timers Queue 中此时排在首位的 callback7 执行，打印 777，把 callback8 放入 Next Tick Queue 中，执行完毕。此时，各队列情况如下：

- 宏队列

  - Timers Queue: [callback2]

  - Check Queue: [callback5, callback3]

  - IO Callback Queue： []

  - Close Callback Queue: []

- 微队列

  - Next Tick Queue: [callback4, callback8]

  - Other Microtask Queue: []

打印结果
start
end
999
111
777

6 个阶段每阶段的宏任务队列执行完毕后，都会开始执行微任务，此时，先取出 Next Tick Queue 中的所有任务执行，callback4 开始执行，打印 444，然后 callback8 开始执行，打印 888，Next Tick Queue 执行完毕，开始执行 Other Microtask Queue 中的任务，因为里面为空，所以继续向下。

- 宏队列

Timers Queue: [callback2]

Check Queue: [callback5, callback3]

IO Callback Queue： []

Close Callback Queue: []

- 微队列

Next Tick Queue: []

Other Microtask Queue: []

打印结果
start
end
999
111
777
444
888

第 2 个阶段 IO Callback Queue 队列为空，跳过，第 3 和第 4 个阶段一般是 Node 内部使用，跳过，进入第 5 个阶段 Check Queue。取出 callback5 执行，打印 555，把 callback6 放入 Next Tick Queue 中，执行 callback3，打印 333。

- 宏队列

Timers Queue: [callback2]

Check Queue: []

IO Callback Queue： []

Close Callback Queue: []

- 微队列

Next Tick Queue: [callback6]

Other Microtask Queue: []

打印结果
start
end
999
111
777
444
888
555
333

执行微任务队列，先执行 Next Tick Queue，取出 callback6 执行，打印 666，执行完毕，因为 Other Microtask Queue 为空，跳过。

- 宏队列

Timers Queue: [callback2]

Check Queue: []

IO Callback Queue： []

Close Callback Queue: []

- 微队列

Next Tick Queue: [callback6]

Other Microtask Queue: []

打印结果
start
end
999
111
777
444
888
555
333

执行第 6 个阶段 Close Callback Queue 中的任务，为空，跳过，好了，此时一个循环已经结束。进入下一个循环，执行第 1 个阶段 Timers Queue 中的所有任务，取出 callback2 执行，打印 222，完毕。此时，所有队列包括宏任务队列和微任务队列都为空，不再打印任何东西。

- 宏队列

Timers Queue: []

Check Queue: []

IO Callback Queue： []

Close Callback Queue: []

- 微队列

Next Tick Queue: [callback6]

Other Microtask Queue: []

最终结果
start
end
999
111
777
444
888
555
333
666
222

以上就是这道题目的详细分析，如果没有明白，一定要多看几次。

下面引入 Promise 再来看一个例子：

```js
console.log("1");

setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});

new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});
process.nextTick(function () {
  console.log("6");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});
```

大家仔细分析，相比于上一个例子，这里由于存在 Promise，所以 Other Microtask Queue 中也会有回调任务的存在，执行到微任务阶段时，先执行 Next Tick Queue 中的所有任务，再执行 Other Microtask Queue 中的所有任务，然后才会进入下一个阶段的宏任务。明白了这一点，相信大家都可以分析出来，下面直接给出正确答案，如有疑问，欢迎留言和我讨论。

// 正确答案
1
7
6
8
2
4
9
11
3
10
5
12

setTimeout 对比 setImmediate
setTimeout(fn, 0)在 Timers 阶段执行，并且是在 poll 阶段进行判断是否达到指定的 timer 时间才会执行
setImmediate(fn)在 Check 阶段执行
两者的执行顺序要根据当前的执行环境才能确定：

如果两者都在主模块(main module)调用，那么执行先后取决于进程性能，顺序随机
如果两者都不在主模块调用，即在一个 I/O Circle 中调用，那么 setImmediate 的回调永远先执行，因为会先到 Check 阶段
setImmediate 对比 process.nextTick
setImmediate(fn)的回调任务会插入到宏队列 Check Queue 中
process.nextTick(fn)的回调任务会插入到微队列 Next Tick Queue 中
process.nextTick(fn)调用深度有限制，上限是 1000，而 setImmedaite 则没有
总结
浏览器的 Event Loop 和 NodeJS 的 Event Loop 是不同的，实现机制也不一样，不要混为一谈。

### NodeJS 可以理解成有 4 个宏任务队列和 2 个微任务队列，但是执行宏任务时有 6 个阶段。

- 先执行全局 Script 代码，执行完同步代码调用栈清空后，先从微任务队列 Next Tick Queue 中依次取出所有的任务放入调用栈中执行，再从微任务队列 Other Microtask Queue 中依次取出所有的任务放入调用栈中执行。然后开始宏任务的 6 个阶段，每个阶段都将该宏任务队列中的所有任务都取出来执行（注意，这里和浏览器不一样，浏览器只取一个），每个宏任务阶段执行完毕后，开始执行微任务，再开始执行下一阶段宏任务，以此构成事件循环。

- MacroTask 包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering
- Microtask 包括： process.nextTick(Node)、Promise、Object.observe、MutationObserver
  第 3 点修改： Node 在新版本中，也是每个 Macrotask 执行完后，就去执行 Microtask 了，和浏览器的模型一致。
