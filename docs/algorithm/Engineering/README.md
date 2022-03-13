### 异步&事件环

异步&事件环

## 一.前端工程化

> 通过工程化提升战斗力 工程化是使用软件工程的技术和方法来进行前端的开发流程、技术、工具、经验等规范化、标准化，其以提高效率、降低成本、质量保证为目的。工程化不等于某个具体的工具，工程化是指项目整体的规划和架构，工具只是落地实施的手段。

- 工程化主要解决的问题
- 传统语言或语法的弊端
- 无法使用模块化、组件化
- 重复的机械式工作
- 代码风格统一、质量保证
- 依赖后端服务接口支持
- 整体依赖后端项目

- 工程化的一般流程

  - 创建项目：使用脚手架工具 CLI 自动搭建，创建项目结构、创建特定类型文件
  - 编码：格式化代码、校验代码风格、编译/构建/打包
  - 预览/测试：Web Server 热更新、Mock 模拟接口、Live Reloading、HMR、Source Map 定位源代码
  - 提交：Git Hooks 提交前做源码检查、Lint-Staged、持续集成
  - 部署：CI/CD、自动发布

> 工程化不等于工具

- 一些成熟的工程化集成
  - create-react-app
  - vue-cli
  - angular-cli
  - gatsby-cli

## 二. 脚手架工具

- 常用的脚手架工具

服务于特定框架的脚手架：create-react-app、vue-cli（此处不做讨论）
通用型脚手架：Yeoman
项目开发过程中创定特定类型的文件：Plop

- Yeoman 简介

Yeoman 是一款最老牌最通用的脚手架工具，基于 node.js 开发的工具模块，是一款创建现代化应用的脚手架工具,不同于 vue-cli 这样的工具，Yeoman 更像是一个脚手架的运行平台，通过不同的 Generator 搭建属于自己的脚手架。

安装：yarn global add yo generator-node
生成: 新建一个文件夹 my-module，在这个文件夹下执行 yo node(node 就是 generator-node)
使用 yarn 安装依赖包，执行命令 yarn link, 就会出现 my-module 命令，检查 my-module --help
可以在 Yeoman 官网查找 generator 相关的插件

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
