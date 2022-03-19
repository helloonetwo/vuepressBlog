### Vue-Router

::: tip
Vue-Router
:::

## Vue-Router 的使用

### Vue-Router 的基本使用

```js
yarn add vue-router --dev
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
```

样式案例：
// view/Blog.vue 路由相关的组件（视图）

```vue
<template>
  <div>这是 Blog 页面</div>
</template>

<script>
export default {
  name: "Blog",
};
</script>
```

```js
// router/index.js 模块

import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
// 1.注册路由插件
// Vue.use 是用来注册插件，它会调用传入对象的 install 方法
Vue.use(VueRouter)

// 路由规则
const routes = [ // 路由匹配规则
// 每个路由规则，都是一个对象，这个规则对象身上，有两个必须的属性：
// 属性 1 是 path，表示监听哪个路由链接地址
// 属性 2 是 component，表示路由是前面匹配到的 path，则展示 component 属性对应的那个组件
{
path: '/',
name: 'Index',
component: Index
},
{
path: '/blog',
name: 'Blog',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () => import(/_ webpackChunkName: "blog" _/ '../views/Blog.vue')
},
{
path: '/photo',
name: 'Photo',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () => import(/_ webpackChunkName: "photo" _/ '../views/Photo.vue')
}
]

// 在 new 路由对象的时候，可以为构造函数，传递一个配置对象
// 2. 创建 router 对象
var router = new VueRouter ({
//这个配置对象中的 routes 表示 [路由匹配规则] 的意思
routes,
linkActiveClass: 'mycitive' // 修改类名 默认 router-link-exact-active
})

export default router // 导出路由对象
```

```js
// main.js

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  // 3. 注册 router 对象
  // 配置 router 用来监听 URL 地址的变化 展示对应的组件
  router, // 会给 vue 实例注入 $route（路由规则）和$router（路由对象） 两个属性
  render: (h) => h(App),
}).$mount("#app");
// App.vue
```

```vue
<template>
  <div id="app">
    ...
    <div id="nav">
      <!-- 5. 创建链接 使用 router-link to属性 可以省略#
      默认渲染为一个a标签 可使用tag修改 -->
      <router-link to="/">Index</router-link> |
      <router-link to="/blog">Blog</router-link> |
      <router-link to="/photo">Photo</router-link>
    </div>
    <!-- 4. 创建路由组建的占位 由 vue-router 提供的元素 专门用来当作占位符
    路由规则匹配到的组件就会展示到这个 router-view 中去 -->
    <router-view />
  </div>
</template>
```

```js
npm run serve
```

### 动态路由

```js
// router/index.js

...
const routes = [
{
path: '/',
name: 'Index',
component: Index
},
{
path: '/detail/:id', // :id 即一个占位符 通过这个占位来匹配变化的位置
name: 'Detail',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// 即路由懒加载 仅当访问此路由地址时才会加载对应组件 提高性能
component: () => import(/_ webpackChunkName: "detail" _/ '../views/Detail.vue')
}
]
...
```

当地址为动态路由时，在组件中获取传入 id 的两种方式：

1.) 通过当前路由规则，获取数据

```js
<template>
  <div>
    <!-- 此方式强依赖于路由，使用此组件必须有路由传递相应的参数 -->
    通过当前路由规则获取：{{ $route.params.id }}
  </div>
</template>
```

2.) 路由规则中开启 props 传参（推荐）

```js
    // router/index.js

    ...
    const routes = [
    {
    ...
    // 开启 props，会把 URL 中的参数传递给组件
    // 在组件中通过 props 来接收 URL 参数
    props: true,
    ...
    }
    ]
    ...

```

```js
<template>

  <div>
    <!-- 父子组件传值的方式，不再依赖路由规则 -->
    通过开启 props 获取：{{ id }}
  </div>
</template>

<script>
export default {
  ...
  props: ['id']
}
</script>
```

### 嵌套路由

当多个路由的组件都有相同的内容，可以将这些相同内容提取到公共的组件当中

```js
// components/Layout.vue

<template>
  <div>
    <div>
      <img width="25%" src="@/assets/logo.png">
    </div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      Footer
    </div>
  </div>
</template>
```

```js
// router/index.js

...
const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    // 嵌套路由
    {
    path: '/',
    component: Layout,
    children: [ // 将外部路径与 children 内的路径合并
        {
            name: 'index',
            path: '', // 外部 path 为'/' 内部可以写成''空字符串
            component: Index
        },
        {
            name: 'detail',
            path: 'detail/:id', // 可以是相对路径 也可以是绝对路径
            props: true,
            component: () => import('@/views/Detail.vue')
        }
    ]
    }
]
...
```

### 编程式导航

之前我们在页面之间的跳转使用的是 router-link 生成超链接，但是做登陆页面需要点击按钮跳转到首页，此时就需要使用编程式导航调用 $router.push() 方法

```vue
// views/Login.vue
<template>
  <div>
    用户名：<input type="text" /><br />
    密&nbsp;&nbsp;码：<input type="password" /><br />

    <button @click="push">push</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    push() {
      this.$router.push("/"); // 字符串 既要跳转的地址
      // this.$router.push({ name: 'Home' }) //对象 设置路由名称
    },
  },
};
</script>
```

```vue
// views/Index.vue

<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Index</router-link>
    </div>
    <button @click="replace">replace</button>

    <button @click="goDetail">Detail</button>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    replace() {
      // 与push方法类似 可以跳转到指定路径 参数形式相同
      this.$router.replace("/login");
    },
    goDetail() {
      this.$router.push({ name: "Detail", params: { id: 1 } });
    },
  },
};
</script>
```

```vue
// views/Detail.vue

<template>
  <div>
    路由参数：{{ id }}

    <button @click="go">go(-2)</button>
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: ["id"],
  methods: {
    go() {
      this.$router.go(-2);
    },
  },
};
</script>
```

push 方法 会记录本次历史
replace 方法 不会记录本次历史 会替换历史记录
go 方法 会以 0 为基准跳转到相对页面

### Hash 和 History 模式区别

两种方式均为客户端路由的实现方式：当路径法发生变化，不会向服务器发送请求，使用 js 监视路径的变化根据不同的地址渲染不同的内容，如果需要服务器端的内容会发送 Ajax 请求来获取。

表现形式的区别:

- Hash 模式
  https://music.163.com/#/playlist?id=3102961863
- Histort 模式
  https://music.163.com/playlist/3102961863

原理的区别:

- Hash 模式是基于锚点，以及 onhashchange 事件
- History 模式 是基于 HTML5 中的 History API
  - history.pushState() IE10 以后才支持
  - history.replaceState()

### History 模式

History 模式的使用:

- History 需要服务器的支持
- 单页应用中，服务器不存在 http://www.testurl.com/login 这样的地址会返回找不到该页面
- 在服务端应该除了静态资源外都返回单页应用的 index.html

```vue
// views/404.vue

<template>
  <div>您要查看的页面不存在</div>
</template>
```

```vue
// App.vue

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <!-- /video 不存在 -->
      <router-link to="/video">Video</router-link>
    </div>
    <router-view />
  </div>
</template>
```

```js
// router/index.js

...
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/_ webpackChunkName: "about" _/ '../views/About.vue')
    },
    {
        path: '_',
        name: '404',
        component: () => import(/_ webpackChunkName: "404" \*/ '../views/404.vue')
    }
]

const router = new VueRouter({
    mode: 'history', // 默认为 hash 模式
    routes
})

export default router
```

当我们刷新 /video 地址回想服务器发送请求，请求/video 页面，服务器如果不存在这个页面应该返回 404 页面，但是 vue-cli 自带的服务器已经配置好了。

#### History 模式 - Node.js

当我们开启服务器的支持时，我们刷新浏览器的时候会向服务器发送请求，服务器接收到请求后，请求的页面服务器并没有，因此会输出默认的 404 页面。

![](/images/vr2.png)

```js
// 注册处理 history 模式的中间件
app.use(history());
```

但因为我们开启了对 histort 模式的支持，因此会将单页应用默认的首页返回给浏览器，浏览器接收到此页面再去判断路由地址并加载对应组件内容并渲染到浏览器。

#### History 模式 - nginx

当 nginx 服务器未处理 vue-router 的 history 模式时，当我们刷新浏览器再去请求地址时，服务器不存在请求的路径中对应的文件，所以服务器会返回 404 页面。

在这里插入图片描述

```js
// nginx.conf

http {
    server{
        ...
        location / {
        ...
        index index.html index.htm;

        # $uri 为当前请求的路径

        # 如果没有找到继续往后找$uri/（当成目录 找目录下的默认首页 即 index 的内容）

        try_files $uri $uri/ /index.html; # 如果还未找到 返回单页面的首页
        }
    }
}

```

## Vue Router 实现原理

Hash 模式

- URL 中 # 后面的内容作为路径地址
- 监听 hashchange 事件
- 根据当前路由地址找到对应组件重新渲染

History 模式

- 通过 history.pushState() 方法改变地址栏
- 监听 popstate 事件
- 根据当前路由地址找到对应组件重新渲染

### Vue Router 模拟实现 ( History 模式 )

前置的知识：插件、slot 插槽、混入、render 函数、运行时和完整版的 Vue

Vue Router 的核心代码.

```js
// 注册插件
// Vue.use() 内部调用传入对象的 install 方法

Vue.use(VueRouter);
// 创建路由对象
const router = new VueRouter({
  routes: [{ name: "home", path: "/", component: homeComponent }],
});
// 创建 Vue 实例，注册 router 对象
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

![](/images/vr1.png)

这个类图由三部分：类名、 类的属性、 类的方法

属性：

    options 对象： 记录构造函数中传入的对象

    data 对象：有一个属性 current 记录当前路由地址 该对象是响应式的(调用 vue.observe 方法)

    routeMap 对象：记录路由地址和组件的对应关系

方法：

    Coustructor(Options)：构造函数，初始化属性

    install(Vue)：静态方法，实现 vue 的插件机制

    init()：调用下面三个方法，将不同代码分隔到不同方法实现

    initEvent()：注册 popstate 事件，监听浏览器历史的变化

    creatRouteMap()：初始化 routeMap 属性，把构造函数中传入的路由规则转换成键值对的形式存储到 RouterMap 对象。（路由地址：对应组件）

    initComponents(Vue)：创建 router-link 和 router-vue 两个组件

完整代码：

```js
// src/vuerouter/index.js

console.dir(Vue);
let _Vue = null;
class VueRouter {
  static install(Vue) {
    //1 判断当前插件是否被安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //2 把Vue的构造函数记录在全局
    _Vue = Vue;
    //3 把创建Vue的实例传入的router对象注入到Vue实例
    // _Vue.prototype.$router = this.$options.router
    _Vue.mixin({
      // beforeCreate 获取到this  实例
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    this.routeMap = {};
    // observable
    this.data = _Vue.observable({
      current: "/",
    });
    this.init();
  }
  init() {
    this.createRouteMap();
    this.initComponent(_Vue);
    this.initEvent();
  }
  createRouteMap() {
    //遍历所有的路由规则 吧路由规则解析成键值对的形式存储到routeMap中
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  initComponent(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: this.to,
            },
            on: {
              click: this.clickhander,
            },
          },
          [this.$slots.default]
        );
      },
      methods: {
        clickhander(e) {
          history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
          e.preventDefault();
        },
      },
      // template:"<a :href='to'><slot></slot><>"
    });
    const self = this;
    Vue.component("router-view", {
      render(h) {
        // self.data.current
        const cm = self.routeMap[self.data.current];
        return h(cm);
      },
    });
  }
  initEvent() {
    //
    window.addEventListener("popstate", () => {
      this.data.current = window.location.pathname;
    });
  }
}
```

### Vue Router - Constructor

```js
constructor (options) {
    this.options = options
    // 记录路径和对应的组件
    this.routeMap = {}
    this.data = \_Vue.observable({
    // 当前的默认路径
    current: '/'
    })
}
```

### Vue Router - install

```js
let \_Vue = null

export default class VueRouter {
    static install (Vue) {
    // 1.判断当前插件是否已经被安装
    // 如果插件已经安装直接返回
    if (VueRouter.install.installed && \_Vue === Vue) return
    VueRouter.install.installed = true
    // 2.把 Vue 构造函数记录到全局变量
    \_Vue = Vue
    // 3.把创建 Vue 实例时候传入的 router 对象注入到 Vue 实例上
    // 混入
    \_Vue.mixin({
    beforeCreate () {
    // 判断 router 对象是否已经挂载了 Vue 实例上
    if (this.$options.router) {
            // 把 router 对象注入到 Vue 实例上
            _Vue.prototype.$router = this.$options.router
    ...
    }
    }
    })
    }
    ...
}
```

### Vue Router - init

- 使用 init 包装 createRouteMap () 和 initComponents (Vue) 以及 initEvent

```js
init () {
this.createRouteMap()
this.initComponents(\_Vue)
this.initEvent()
}
```

- 回到 install() 方法来调用初始化方法

```js
    static install (Vue) {
    ...
    \_Vue.mixin({
    beforeCreate () {
    if (this.$options.router) {
            _Vue.prototype.$router = this.$options.router

        this.$options.router.init()
            }
        }
        })

    }
```

### Vue Router - createRouteMap

将构造函数中选项传过来的路由规则 routes 转换成键值对的形式存储到 RouteMap 对象，其存储的键就是路由的地址，它的值就是这个地址所对应的组件。将来在路由地址发生变化时，可以根据这个地址来 RouteMap 对象找到组件并渲染到视图中。

```js
createRouteMap () {
        // routes => [{ name: '', path: '', component: }]
        // 遍历所有的路由信息，记录路径和组件的映射
        this.options.routes.forEach(route => {
        // 记录路径和组件的映射关系
        this.routeMap[route.path] = route.component
    })
}
```

### Vue Router - initComponents - router-link

Vue 的构建版本
运行时版：不支持 template 模板，需要打包的时候提前编译（render 函数）
完整版：包含运行时和编译器，体机比运行时版大 10K 左右，程序运行的时候把模板转换成 render 函数
完整版本 Vue:

vue-cli 创建的项目默认使用的是 运行时版本的 Vue

如果想切换成带编译器版本的 Vue.js，需要修改 vue-cli 配置

```js
// 在项目根目录下创建 vue.config.js

module.exports = {
// 选项
runtimeCompiler: true // 此时会加载带编译器版本的 vue 默认为 false
}
initComponents (Vue) {
\_Vue.component('router-link', {
// 接收外部传入的参数
props: {
to: String
},
// 需要带编译器版本的 Vue.js 即完整版 Vue
// 编译器会将 template 模板 转化为 render 函数
template: '<a :href="to"><slot></slot></a>'
}
```

运行时版本 Vue:

```js
initComponents (Vue) {
\_Vue.component('router-link', {
// 接收外部传入的参数
props: {
to: String
},
// 使用运行时版本的 Vue.js
// 此时没有编译器 直接来写一个 render 函数
render (h) { // 参数 h 创建虚拟 DOM render 函数中调用 h 函数并将结果返回
// h 函数 接收三个参数
return h('a', { // 1. 创建的元素对应的选择器
attrs: { // 2. 给标签设置属性 attes 指明 DOM 对象属性
href: this.to
},
on:{ // 给 a 标签 注册点击事件
click:this.clickhander
}
}, [this.$slots.default]) // 3. 生成元素的子元素
},
methods:{
clickhander(e){ //时间参数 e
// 改变浏览器地址栏 pushiState 不向服务器发送请求
history.pushState({}, "", this.to) // data title url
this.$router.data.current = this.to // 响应式对象 data
e.preventDefault() // 阻止事件默认行为
}
}
// template: '<a :href="to"><slot></slot></a>'
})
...
}
```

### Vue Router - initComponents - router-view

```js
initComponents (Vue) {
    \_Vue.component('router-link', {
    ...
    })

    const self = this // 保存 this
    _Vue.component('router-view', {
      render (h) {
        // 根据当前路径找到对应的组件，注意 this 的问题
        const component = self.routeMap[self.data.current]
        return h(component) // 将组件转换为虚拟DOM返回
      }
    })

}
```

### Vue Router - initEvent

```js
initEvent(){
    window.addEventListener("popstate", () => {
        this.data.current = window.location.pathname
    })
}

```
