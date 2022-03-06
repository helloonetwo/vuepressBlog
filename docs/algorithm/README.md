### 异步&事件环

异步&事件环

## 一.Promise.finally 原理

```js
Promise.prototype.finally = function (callback) {
  return this.then(
    (data) => {
      // 让函数执行 内部会调用方法，如果方法是 promise 需要等待他完成
      return Promise.resolve(callback()).then(() => data);
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
};
```

## 二.Promise.race 原理

#1.实现原理

```js
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let currentVal = promises[i];
      if (currentVal && typeof currentVal.then == "function") {
        currentVal.then(resolve, reject);
      } else {
        resolve(currentVal);
      }
    }
  });
};
```

race 只采用第一个成功或者失败的结果

#2.应用场景 (超时处理)

```js
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 3000);
});
function wrap(p) {
  let abort;
  let p1 = new Promise((resolve, reject) => {
    abort = reject;
  });
  let newPromise = Promise.race([p1, p]);
  newPromise.abort = abort;
  return newPromise;
}
let p1 = wrap(p);
p1.then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("error", err);
  }
);
setTimeout(() => {
  p1.abort("超过 2s 了");
}, 2000);
```

借助 race 的特点，可以实现立即中断 promise 变为失败态。常用作超时操作

作业:

```js
Promise.allSettled: 拿到所有 promise 的返回结果
Promise.any: 获取第一个成功的值，都失败才失败 #三.promisify 原理
function promisify(fn){
return function (...args) {
return new Promise((resolve,reject)=>{
fn(...args,function (err,data) {
if(err) reject();
resolve(data);
})
});
}
}
let read = promisify(fs.readFile);
```

## 四.generator 使用

#1.遍历器的基本实现

```js
const interable = { 0: "a", 1: "b", 2: "c", length: 3 };
interable[Symbol.iterator] = function () {
  let index = 0;
  return {
    // 遍历器对象
    next: () => {
      return { value: this[index], done: index++ == this.length };
    },
  };
};
```

如果我们自己去迭代一个对象需要实现一个迭代器接口，自己返回一个具有 next 方法的对象。内部会调用这个 next 方法返回结果包含 value 和 done,当 done 为 true 时迭代完成

#2.通过生成器实现

```js
const iterable = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
iterable[Symbol.iterator] = function\*() {
let index = 0;
while (index !== this.length) {
yield this[index++]
}
}
console.log([...iterable]);

```

#3. 生成器使用

```js
function co(it) {
  return new Promise((resolve, reject) => {
    function next(data) {
      let { value, done } = it.next(data);
      if (!done) {
        Promise.resolve(value).then((data) => {
          next(data);
        }, reject);
      } else {
        resolve(value);
      }
    }
    next();
  });
}
```

这里我们主是掌握思想，异步迭代的思想。（产生一个迭代函数，当做回调函数使用）

## 五. 浏览器事件环

- 1.浏览器的进程
  每一个页卡都是进程 (互不影响)
  浏览器也有一个主进程 (用户界面)
  渲染进程 每个页卡里 都有一个渲染进程 (浏览器内核)
  网络进程 （处理请求）
  GPU 进程 3d 绘制
  第三方插件的进程
- 2. 渲染进程（包含着多个线程）
     GUI 渲染线程 （渲染页面的）
     js 引擎线程 他和页面渲染时互斥
     事件触发线程 独立的线程 EventLoop
     事件 click、setTimeout、ajax 也是一个独立线程
     微任务队列每次都会创建一个全新的队列、事件队列仅有一个

  事件队列、消息队列：存放定时器到达时间的回调函数、ajax 回调成功的函数等
  事件循环：不断检测调用栈是否为空，如果为空则从事件对列中取出一个来执行

- 3.宏任务,微任务
  宏任务 script ui 渲染、setTimeout、setInterval、postMessage、MessageChannel、SetImmediate
  微任务 promise mutationObserver、process.nextTick
  每循环一次会执行一个宏任务，并清空对应的微任务队列，每次事件循环完毕后会判断页面是否需要重新渲染 （大约 16.6ms 会渲染一次）

- 4.微任务和 GUI 渲染

```js
<script>
        document.body.style.background = 'red';
        console.log(1)
        Promise.resolve().then(()=>{
            console.log(2)
            document.body.style.background = 'yellow';
        })
        console.log(3);
</script>
```

- 5.事件任务

```js
<script>
        button.addEventListener('click',()=>{
            console.log('listener1');
            Promise.resolve().then(()=>console.log('micro task1'))
        })
        button.addEventListener('click',()=>{
            console.log('listener2');
            Promise.resolve().then(()=>console.log('micro task2'))
        })
        button.click(); // click1() click2()
</script>
```

- 6.定时器任务

```js
<script>
        Promise.resolve().then(() => {
            console.log('Promise1')
            setTimeout(() => {
                console.log('setTimeout2')
            }, 0);
        })
        setTimeout(() => {
            console.log('setTimeout1');
            Promise.resolve().then(() => {
                console.log('Promise2')
            })
        }, 0);
</script>
```

- 7.任务执行面试题

```js
console.log(1);
async function async() {
  console.log(2);
  await console.log(3);
  console.log(4);
}
setTimeout(() => {
  console.log(5);
}, 0);
const promise = new Promise((resolve, reject) => {
  console.log(6);
  resolve(7);
});
promise.then((res) => {
  console.log(res);
});
async();
console.log(8);
```
