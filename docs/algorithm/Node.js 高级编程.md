## Node.js 基础知识

### Nodejs 可以做什么？

- ·轻量级、高性能的Web服务
- ·前后端JavaScript 同构开发
- ·便捷高效的前端工程化

### Nodejs 架构

![](/images/node1.png)


#### Natives modules
 - ·当前层内容由JS实现
 - ·提供应用程序可直接调用库，例如fs、path、http等
 - ·JS 语言无法直接操作底层硬件设置

#### Builtin modules“胶水层”
![](/images/node2.png)


#### 底层
- V8：执行JS代码，提供桥梁接口
- Libuv：事件循环、事件队列、异步10
- 第三方模块：zlib、http、c-ares等
![](/images/node3.png)


### Nodejs 异步Io
![](/images/node4.png)

### libuv
![](/images/node5.png)
![](/images/node6.png)



### 异步10总结
- 是应用程序的瓶颈所在
- 异步10提高性能无采原地等待结果返回
- 操作属于操作系统级别，平台都有对应实现
- Nodejs单线程配合事件驱动架构及libuv实现了异步10


###  事件驱动架构


一个发布者 多个订阅者
```js
const EventEmitter = require('events')

const myEvent = new EventEmitter()

myEvent.on('事件1', () => {
  console.log('事件1执行了')
})

myEvent.on('事件1', () => {
  console.log('事件1-2执行了')
})

myEvent.emit('事件1')
```

### Node 主线程是单线程


```
const http = require('http')
function sleepTime (time) {
  const sleep = Date.now() + time * 1000
  while(Date.now() < sleep) {}
  return 
}
sleepTime(4)
const server = http.createServer((req, res) => {
  res.end('server starting......')
})

server.listen(8080, () => {
  console.log('服务启动了')
})
```



### 全局对象

#### Nodejs 全局对象
-  与浏览器平台的window不完全相同
-  Nodejs全局对象上挂载许多属性
#### 全局对象是JavaScript中的特殊对象
#### Nodejs中全局对象是global
#### Global的根本作用就是作为宿主
#### 全局对象可以看做是全局变量的宿主

### Nodejs 常见全局变量
- filename：返回正在执行脚本文件的绝对路径
- dirname：返回正在执行脚本所在目录
- timer类函数：执行顺序与事件循环间的关系
- process：提供与当前进程互动的接口
- require：实现模块的加载
- module、exports：处理模块的导出


### process全局变量

> 获取进程信息

#### 资源： cpu 内存

占用 arrayBuffers 声明一个大小为 1000 的 Buffer
```js
// Buffer.alloc(1000)
```
```js
console.log(process.memoryUsage())
// {
//   rss: 24879104, // 常驻内存
//   heapTotal: 4509696, // 脚本执行之初申请的总的内存大小
//   heapUsed: 2415608, // 当前脚本在执行中实际使用的内存大小
//   external: 808874, // 底层 C/C++ 模块所占据的内存大小
//   arrayBuffers: 9386 // 缓冲区，代表一块独立的空间，不占据 V8 的内存，默认也会先申请一块空间
// }
```
```js
console.log(process.cpuUsage())
// {
//   user: 31000, // 用户占用的 CPU 时间片段
//   system: 78000 // 操作系统占用的 CPU 时间片段
// }
```
#### 运行环境：运行目录、node环境、cpu架构、用户环境、系统平台
2.1 运行目录
```js
console.log(process.cwd())
```
2.2 node 环境信息
```js
console.log(process.version) // node 版本
console.log(process.versions) // 更多版本信息
```
2.3 cpu 架构
```js
console.log(process.arch) // x64
```
2.4 用户环境（开发环境）
```js
console.log(process.env.NODE_ENV)
console.log(process.env.PATH)
```
2.5 系统平台
```js
console.log(process.platform) // win32
```
#### 运行状态

3.1 启动参数(如 node <脚本文件> 1 -a 2 -b)
```js
console.log(process.argv) // [<node 启动程序绝对路径>, <脚本文件绝对路径>, '1', '-a', '2', '-b']
```
3.2 进程 PID
```js
console.log(process.pid)
```
3.3 运行时间
```js
setTimeout(() => {
  console.log(process.uptime()) // 脚本从运行开始到结束总共消耗的时间
}, 3000)
```

#### 事件监听
```js
// beforExit 中可使用异步代码，exit中只能使用同步代码
process.on('exit', (code) => {
  console.log('exit ' + code);
})

process.on('beforeExit', (code) => {
  console.log('before exit '+code);
})

console.log('code over');

// 手动退出，不会触发beforeExit
process.exit()
```

#### 标准输出 输入 错误
```js
// 读取文件并输出
const fs = require('fs')
fs.createReadStream('test.txt')
     .pipe(process.stdout)
     
// stdin 输入，stdout输出
process.stdin.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('readable', () => {
  let chunk = process.stdin.read()
  if (chunk !== null) {
    process.stdout.write('data'+chunk)
  }
})
```

## Node.js 核心模块