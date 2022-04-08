## Node.js 高级编程

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

```js
...
import commonjs from 'rollup-plugin-commonjs'

export default {
    ...
    plugins: [
        ...
        commonjs()
    ]
}
```

```js
// src/cjs-module.js

module.exports = {
  foo: "bar",
};
```

```js
// src/index.js

// 导入模块成员
...
import { log } from './logger'
...
import cjs from './cjs-module'

// 使用模块成员
...
log(cjs)
```

### Rollup Code Splitting

在 Rollup 最新的版本中已经开始支持代码拆分了，同样可以使用符合 ESM 标准的动态导入（Dynamic Imports）的方式实现模块的按需加载，Rollup 内部也会自动处理代码拆分（Code Splitting）也就是我们说的分包。

```js
// src/index.js

import("./logger").then(({ log }) => {
  log("code splitting~");
});
```

自执行函数会把所有的模块都放在同一个函数中，无法实现代码拆分。浏览器环境可以使用 amd 格式输出，但是 Code Splitting 需要输出多个文件，就不能再使用 file 配置，而是使用 dir 参数。

```js
// rollup.config.js
export default {
  input: "src/index.js",
  output: {
    // file: 'dist/bundle.js',
    // format: 'iife'
    dir: "dist", // 输出目录
    format: "amd", // 输出格式
  },
};
```

### Rollup 多入口打包

- 对于不同入口的公共部分也会自动提取到单个文件作为独立的 bunder

```js
export default {
  // input: ['src/index.js', 'src/album.js'],
  input: {
    foo: "src/index.js",
    bar: "src/album.js",
  },
  output: {
    dir: "dist",
    format: "amd", // 内部使用代码拆分 就不能使用自调用函数
  },
};
```

- 对于 amd 这种输出模式的输出文件，不能直接引用到页面，必须通过实现 AMD 标准的库加载

```js
  ...

<body>
  <!-- AMD 标准格式的输出 bundle 不能直接引用 -->
  <!-- <script src="foo.js"></script> -->
  <!-- 需要 Require.js 这样的库 -->
  <script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="foo.js"></script>
</body>
```

### Rollup / Webpack 选用规则

我们发现，Rollup 确实有它的优势

输出结果更加扁平
自动移除未引用代码
打包结果依然完全可读
缺点也很明显

加载非 ESM 的第三方模块比较复杂
模块最终都被打爆到一个函数中，无法实现 HMR
浏览器环境中，代码拆分功能依赖 AMD 库
综合以上特点，我们发现

如果我们正在开发应用程序（大量引入第三方模块、需要 HMR 提升开发体验、体积过大需要分包）不适合使用 Rollup，建议使用 Webpack
如果我们正在开发一个框架或者类库（很少依赖第三方模块）适合使用 Rollup
大多数知名框架/库都在使用 Rollup
Webpack 大而全，Rollup 小而美

## Parcel 打包

Parcel：零配置的前端应用打包器

1.在一个空项目中初始化 package.json

```js
yarn init
```

2.安装 parcel-bundler 模块

```js
yarn add parcel-bundler --dev
```

虽然 Parcel 与 Webpack 一样都支持以任意类型的文件作为打包入口，但是 Parcel 官方建议我们使用 html 文件，理由为 HTML 是应用运行在浏览器端的入口。

```js
// 打包入口 src/index.html

<body>
  <script src="main.js"></script>
</body>
```

Parcel 同样支持对 ESM 的打包

```js
// src/main.js

import foo from "./foo";

foo.bar();
```

```js
// src/foo.js

export default {
  bar: () => {
    console.log("hello parcel~");
  },
};
```

```
yarn parcel src/index.html
```

我们可以发现，Parcel 不仅仅帮我们打包了应用，而且还同时开启了一个开发服务器，类似 Webpak 的 Dev Server，如果我们需要模块热替换，Parcel 也支持。

```js
// src/main.js

import foo from "./foo";

foo.bar();
if (module.hot) {
  module.hot.accept(() => {
    // 此处的 accept 只接受一个参数 当前的模块或所依赖模块更新才会执行
    console.log("hmr");
  });
}
```

除了热替换，Parcel 还支持自动安装依赖，极大程度避免了额外的一些手动操作。

除此之外，Parcel 同样支持加载其他类型的资源模块，而且相比其他的模块打包器，在 Parcel 中加载任意类型的资源模块也是零配置，整个过程不需要安装任何插件。

我们还可以添加图片到项目当中

```js
// src/style.css

body {
background-color: #282c40;
}
```

```js
// src/main.js

import $ from 'jquery'
...
import './style.css'
import logo from './zce.png'

...
$(document.body).append(`<img src="${logo}" />`)
...

```

Parcel 同样支持使用动态导入，内部如果使用了动态导入，它也会自动拆分代码

```js
// src/main.js

// import $ from 'jquery'
...
import('jquery').then($ => {
...
$(document.body).append(`<img src="${logo}" />`)
})
...
```

我们再来看一下 Parcel 如何以生产环境打包

```js
yarn parcel build src/index.html
```

需要注意的是，对于相同体量的打包，Parcel 会比 Webpack 的构建速度快很多。因为在 Parcel 内部是多进程同时去工作，充分发挥了多核 CPU 的性能。当然 Webpack 中也可以使用 happypack 的插件来实现这一点。
