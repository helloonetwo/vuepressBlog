# 企业工程化场景分析&工程化核心技术讲解

## 前端发展历史回顾
![在这里插入图片描述](https://segmentfault.com/img/remote/1460000019650483?w=1830&h=504)

- 静态页面 1990~2005
  互联网发展早期，前端只负责写静态页面，纯粹的展示功能，JavaScript的作用也只是增加一些特殊效果。这种静态页面不能读取数据库，为了使Web更加充满活力，以PHP、JSP、ASP.NET为主的动态语言相继诞生。
  这使页面能够获取数据并不断更新，是前后端混合开发模式开端，所有的前端代码和前端数据都是后端生成的，随着后端代码的庞大和逻辑越来越复杂，相继的MVC发展起来。这时后端大多采用MVC模式开发，前端只是后端MVC中的V(视图)；
  从web的诞生到2005，一直处在_后端重前端轻_的状态。


- AJAX阶段 2005
  2004年AJAX技术的诞生改变了前端的发展历史。以Gmail和Google地图这样革命性的产品出现，使得开发者发现，前端的作用不仅仅是展示页面，可以管理数据和用户互动。解决一些糟糕的用户体验，前端页面要想获取后台数据需要刷新整个页面。
  依稀记得前几年，依托强大的Jquery,一页面的javascript代码使用ajax发送请求渲染DOM的情景。
  前端开始慢慢向后端靠拢。


- NODEJS 的爆发 2009
  2009年Ryan Dahl利用Chrome的V8引擎打造了基于事件循环的异步I/O框架。
  NODE的诞生，使javascript在服务端的无限可能，更重要的是它构建了一个庞大的生态系统。
  2010年1月，NPM作为node的包管理系统首次发布。开发人员可以依照规范编写nodejs模块，发布到npm上，供其他开发人员下载使用。截止目前2019年6月8日，NPM包数量有1,003,262，是世界上最大的包模块管理系统。
  Node.js 给开发人员带来了无穷的想象，JavaScript 大有一统天下的趋势。


- 前端MV**架构阶段 2010
  随着 HTML5 小程序 的流行，前端再也不是人们眼中的小玩意了，应用功能开发逐步迁移到了前端，前端的代码逻辑逐渐变得复杂起来。
  2010年10月Backbone MVP架构发布。
  2010年10月Angular MVC->MVVM
  2013年05月React开源 MVVM
  2014年07月Vue MVVM

  随着这些 MV* 框架的出现，网页逐渐由 Web Site 演变成了 Web App，最终导致了复杂的单页应用（ Single Page Application）的出现。
  随着 SPA 的兴起，2010年后，前端工程师从开发页面（切模板），逐渐变成了开发“前端应用”（跑在浏览器里面的应用程序）。


- javascript 开发App
  随着 iOS 和 Android 等智能手机的广泛使用，移动浏览器也逐步加强了对 HTML5 特性的支持力度。

  Web APP，即移动端的网站。一般泛指 SPA(Single Page Application)模式开发出的网站。将页面部署在服务器上，然后用户使用各大浏览器访问，不是独立APP，无法安装和发布。

  Hybrid App，即混合开发，也就是半原生半Web的开发模式，有跨平台效果，实质最终发布的仍然是独立的原生APP。

  React Native App，Facebook发起的开源的一套新的APP开发方案,使用JS+部分原生语法来实现功能。

  May 7, 2019谷歌发布 Flutter for web，正式宣布 Flutter 成为全平台框架，支持手机、Web、桌面电脑和嵌入式设备。现在学跨平台应用开发，第一个要看的可能不是 React Native，而是 Flutter。

## 前端开发模式回顾

![](./images/en1.png)

## 前端研发架构图

![](./images/en2.png)

## 前端工程化解决问题

- 开发效率 
- 开发规范
- 访问性能

## 前端模块化
 - 将复杂程序按照规范拆分为若干模块，一个模块包括输入输出
 - 模块的内部实现是私有的，对外暴露接口与其他模块通信

## 模块化的进化过程
- 全局function模式 : 将不同的功能封装成不同的全局函数
  - 编码: 将不同的功能封装成不同的全局函数
  - 问题: 污染全局命名空间, 容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系
```js
function m1(){
  //...
}
function m2(){
  //...
}
```

- namespace模式 : 简单对象封装
  - 作用: 减少了全局变量，解决命名冲突
  - 问题: 数据不安全(外部可以直接修改模块内部的数据)
```js
let myModule = {
  data: 'www.baidu.com',
  foo() {
    console.log(`foo() ${this.data}`)
  },
  bar() {
    console.log(`bar() ${this.data}`)
  }
}
myModule.data = 'other data' //能直接修改模块内部的数据
myModule.foo() // foo() other data
```

- IIFE模式：匿名函数自调用(闭包)
  - 作用: 数据是私有的, 外部只能通过暴露的方法操作
  - 编码: 将数据和行为封装到一个函数内部, 通过给window添加属性来向外暴露接口
  - 问题: 如果当前这个模块依赖另一个模块怎么办?

```js
// index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>

// module.js文件
(function(window) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar } //ES6写法
})(window)
```

- IIFE模式增强  
  - 引入jquery到项目中
  -  module4.js
```js
    (function (window, $) {
      //数据
     let data = '12312312'    
      //操作数据的函数
      function foo() { //用于暴露有函数
        console.log(`foo() ${data}`)
        $('body').css('background', 'red')
      }
    
      function bar() {//用于暴露有函数
        console.log(`bar() ${data}`)
        otherFun() //内部调用
      }
    
      function otherFun() { //内部私有的函数
        console.log('otherFun()')
      }    

      //暴露行为
      window.myModule = {foo, bar}
    })(window, jQuery)
```
```html
    <script type="text/javascript" src="jquery-1.10.1.js"></script>
    <script type="text/javascript" src="module4.js"></script>
    <script type="text/javascript">
      myModule.foo()
    </script>
```
  - 说明
  - IIFE模式增强 : 引入依赖
  - 这就是现代模块实现的基石

- 页面加载多个js的问题  * 页面:    
```
    <script type="text/javascript" src="module1.js"></script>
    <script type="text/javascript" src="module2.js"></script>
    <script type="text/javascript" src="module3.js"></script>
    <script type="text/javascript" src="module4.js"></script>
    <script type="text/javascript" src="module5.js"></script>
    <script type="text/javascript" src="module6.js"></script>
    <script type="text/javascript" src="module7.js"></script>
    <script type="text/javascript" src="module8.js"></script>
    <script type="text/javascript" src="module9.js"></script>
    <script type="text/javascript" src="module10.js"></script>
    <script type="text/javascript" src="module11.js"></script>
    <script type="text/javascript" src="module12.js"></script>
```
- 问题:
  - 请求过多
  - 依赖模糊
  - 难以维护



## Commonjs 模块化规范
### Commonjs 模块化规范 介绍
  - 每个文件就是一个模块 有自己的作用域
  - 采用同步加载模式
  - 通过require 加载模块  通过exports 或者 module.exports 导出模块
  - 所有代码运行在自己的模块作用域 不会污染全局作用域
  -  模块可以多次加载 第一次加载模块时 会将模块的输出结果缓存起来 再次加载时 直接从缓存中读取模块输出结果
  - 模块的加载顺序 是按照代码的书写顺序的 
  - 模块输出的值是值的拷贝



## AMD 模块化规范
-  AMD 采用非同步加载模块
- 浏览器环境下  模块需要请求获取 适合异步加载
- require 是 AMD的一个具体的库 


## cmd
- CMD 整合了COMMONjs 和 AMD的优点  模块加载是异步的 
- CMD专门用于浏览器端 sea.js 是代表
- 没有通过标准语法规范 

## ESModules
- 设计理念是在编译时确定模块依赖关系及输入输出关系
- Commonjs 和 AMD 必须在运行时确定依赖关系及输入输出关系
- 通过import加载模块  通过export导出模块


## COMMONJS 与 ESModules 规范对比
 - CommonJS模块输出的是值的拷贝 ES6模块输出的是值的引用
 - CommonJS 是运行是加载  ESModules是编译时输出接口
 - CommonJS是单个值导出 ESModules 可以导出多个