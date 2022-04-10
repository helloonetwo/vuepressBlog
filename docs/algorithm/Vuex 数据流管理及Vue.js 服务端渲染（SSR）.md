# Vuex数据流管理及Vue.js服务端渲染（SSR）

## Vuex状态管理

### 一、组件内的状态管理流程

#### 1. 状态管理

+ state：驱动应用的数据源

+ view：以声明方式将state映射到视图

+ actions：相应在view上的用户输入导致的状态变化

  <img src="../images/1.jpeg" alt="01.jpeg" style="zoom:50%;" />

### 二、组件间通信方式

#### 1. 父组件给子组件传值

+ 子组件通过props接受数据

  ```vue
  <template>
  	<div>
      <h2>{{title}}</h2>
    </div>
  </template>
  
  <script>
  export default {
    // props: ['title'],
    props: {
      title: String
    }
  }
  </script>
  ```

+ 父组件中给子组件通过响应属性传值

  ```vue
  <template>
  	<div>
      <child title="My journey with Vue"></child>
    </div>
  </template>
  
  <script>
  import child from './01-Child'
    export default {
      components: {
        child
      }
    }
  </script>
  ```

#### 2. 子组件给父组件传值

+ 通过自定义事件子组件给父组件传值

  ```vue
  <template>
  	<div>
      <h1 :style="{ fontSize: fontSize + 'em' }">Props Down Child</h1>
      <button @click="handler">文字增大</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      fontSize: Number
    },
    methods: {
      handler () {
        this.$emit('enlargeText', 01)
  		}
    }
  }
  </script>
  ```

+ 父组件中注册子组件内部触发的事件

  ```vue
  <template>
  	<div>
      <h1 :style="{ fontSize: hFontSize + 'em' }">Event Up Parent</h1>
      
      这里的文字不需要变化
      
      <child :fontSize="hFontSize" v-on:enlargeText="enlargeText"></child>
      <child :fontSize="hFontSize" v-on:enlargeText="enlargeText"></child>
  		<child :fontSize="hFontSize" v-on:enlargeText="hFontSize + $event"></child>
    </div>
  </template>
  
  <script>
  import child from './02-child'
  export default {
    components: {
      child
    },
    data () {
      return {
        hFontSize: 1
      }
    },
    methods: {
      enlargeText (size) {
        this.hFontSize += size
      }
    }
  }
  </script>
  ```

#### 3. 不相关组件之间传值

+ 通过事件中心eventbus触发和注册事件

  ```js
  import Vue from 'vue'
  export default new Vue()
  ```

+ 触发eventbus中的事件

  ```vue
  <template>
  	<div>
      <h1>Event Bus sibling01</h1>
      <div class="number" @click="sub">-</div>
      <input type="text" style="width: 30px; text-align: center": value="value">
      <div class="number" @click="add">+</div>
    </div>
  </template>
  
  <script>
  import bus from './eventbus'
    
  export default {
    props: {
      num: Number
    },
    created () {
      this.value = this.num
    },
    data () {
      return {
        value: -1
      }
    },
    methods: {
  		sub () {
        if (this.value > 1) {
          this.value--
          bus.$emit('numchange', this.value)
        }
      },
      add () {
        this.value++
        bus.$emit('numchange', this.value)
      }
    }
  }
  </script>
  ```

+ 注册事件

  ```vue
  <template>
  	<div>
      <h1>Event Bus sibling02</h1>
      
      <div>{{ msg }}</div>
    </div>
  </template>
  
  <script>
  import bus from './eventbus'
  export default {
    data () {
      return {
        msg: ''
      }
    },
    created () {
  		bus.$on('numchange', (value) => {
        this.msg = `您选择了${value}件商品`
      })
    }
  }
  </script>
  ```

#### 4. 其他常见方式(不推荐使用)

+ $root
+ $parent
+ $children
+ $ref

ref两个作用：

1. 在普通HTML标签上使用ref，获取到的是DOM

2. 在组件标签上使用ref，获取到的是组件实例

子组件中定义ref

```vue
<template>
	<div>
    <h1>
      ref Child
  	</h1>
    <input ref="input" type="text" v-model="value">
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>
```

父组件获取子组件的ref

```vue
<template>
	<div>
    <h1>
      ref Parent
  	</h1>
    
    <child ref="c"></child>
  </div>
</template>

<script>
import child from './04-child'
export default {
  components: {
    child
  },
  mounted () {
    this.$refs.c.focus()
    this.$refs.c.value = 'hello input'
  }
}
</script>
```

> ref这种方式不到万不得已不要使用，会导致数据的混乱。

### 三、简易的状态管理方案

#### 1. 父子组件传值的问题

+ 多个视图依赖同一状态
+ 来自不同视图的行为需要变更同一状态

#### 2. 集中式的状态管理

store.js

```js
export default {
  debug: true,
  state: {
    user: {
      name: 'xiaomao',
      age: 18,
      sex: '男'
    }
  },
  setUserNameAction (name) {
    if (this.debug) {
      console.log('setUserNameAction triggered: ', name)
    }
    this.state.user.name = name
  }
}
```

componentA.vue

```vue
<template>
	<div>
    <h1> componentA </h1>
    user name : {{ sharedState.user.name }}
    <button @click="change"> Change Info </button>
  </div>
</template>

<script>
import store from './store'
export default {
  methods: {
    change () {
      store.setUserNameAction('componentA')
    }
  },
  data () {
    return {
      privateState: {},
      sharedState: store.state
    }
  }
}
</script>
```

componentB.vue

```vue
<template>
	<div>
    <h1> componentB </h1>
    user name : {{ sharedState.user.name }}
    <button @click="change"> Change Info </button>
  </div>
</template>

<script>
import store from './store'
export default {
  methods: {
    change () {
      store.setUserNameAction('componentB')
    }
  },
  data () {
    return {
      privateState: {},
      sharedState: store.state
    }
  }
}
</script>
```

### 四、Vuex回顾

#### 1. 什么是Vuex

+ Vuex是专门为Vue.js设计的状态管理库
+ Vuex采用集中式的方式存储需要共享的状态
+ Vuex的作用是进行状态管理，解决复杂组件通信，数据共享
+ Vuex集成到了devtools中，提供了time-travel时光旅行历史回滚功能

#### 2. 什么情况下使用Vuex

+ 非必要的情况不要使用Vuex
+ 大型的单页应用程序
  + 多个视图依赖于同一状态
  + 来自不同视图的行为需要变更同一状态

#### 3. Vuex核心概念

+ Store： 是一个容器，包含着应用中的大部分状态，不能直接改变store中的状态，要通过mutation的方式改变状态。
+ State：是状态，保存在Store中，因为Store是唯一的，所以State也是唯一的，也称为单一状态树。这里的状态是响应式的。
+ Getter：是Vuex中的计算属性，方便从一个属性派生出其他的值。它内部会对计算的属性进行缓存，只有当依赖改变的时候，才会重新进行计算。
+ Mutation：状态的变换必须要通过提交Mutation来完成。
+ Action：和MuTation类似，不同的是Action可以进行异步的操作，内部改变状态的时候，都需要提交Mutation。
+ Module：当Store太过臃肿时，可以将Store分成多个模块，每个模块里有State、Mutation、Action、Getter，甚至是子模块。

### 五、Vuex使用

#### 1. Vuex基本结构

定义store：store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

注入store：

```js
import store from './store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

#### 2. State

<img src="../images/2.jpeg" alt="02.jpeg" style="zoom:50%;" />

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

App.vue

```vue
<template>
  <div id="app">
    <h1>Vuex - Demo </h1>
    <!-- <p>count: {{ $store.state.count }}</p> -->
    <!-- <p>msg: {{ $store.state.msg }}</p> -->
    <p>count: {{ count }}</p>
    <p>msg: {{ msg }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    // count: state => state.count,
    ...mapState(['count', 'msg'])
  }
}
</script>

```

​    `$store.state.xxx`和`mapState`展开两种写法都可以。不过使用`mapState`展开成计算属性时，如果原本就有这个属性名，那么`mapState`展开的属性就不起作用，可以通过给属性重命名的方式更改计算属性的名称:

```vue
<p>count: {{ num }}</p>
<p>msg: {{ message }}</p>
```

```js
...mapState({ num: 'count', message: 'msg' })
```

#### 3. Getter

Vuex中的getter相当于VUE中的计算属性。

store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

```

App.vue

```vue
<template>
  <div id="app">
    <h1>Vuex - Demo </h1>
    <!-- <p>count: {{ $store.state.count }}</p> -->
    <!-- <p>msg: {{ $store.state.msg }}</p> -->
    <!-- <p>count: {{ count }}</p> -->
    <!-- <p>msg: {{ msg }}</p> -->
    <p>count: {{ num }}</p>
    <p>msg: {{ message }}</p>
    <h2>Getter</h2>
    <!-- <p>reverseMsg: {{ $store.getters.reverseMsg }}</p> -->
    <p>reverseMsg: {{ reverseMsg }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    // count: state => state.count,
    // ...mapState(['count', 'msg']),
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg'])
  }
}
</script>

```

使用mapGetters将VUE中的getters导入到Vue的计算属性中，用法和mapState类似。

#### 4. Mutation

Mutation中修改state，只能支持同步操作。

store/index.js

```js
mutations: {
  increate (state, payload) {
    state.count += payload
  }
},
```

在模板中通过`$store.emit()`来提交mutation。

App.vue

```vue
<button @click="$store.commit('increate', 3)">Mutation</button>
```

而mutation的本质是方法，所以可以通过mapMutations将mutation中的方法展开到Vue的methods中

App.vue

```vue
<template>
  <div id="app">
    <h1>Vuex - Demo </h1>
    <!-- <p>count: {{ $store.state.count }}</p> -->
    <!-- <p>msg: {{ $store.state.msg }}</p> -->
    <!-- <p>count: {{ count }}</p> -->
    <!-- <p>msg: {{ msg }}</p> -->
    <p>count: {{ num }}</p>
    <p>msg: {{ message }}</p>
    <h2>Getter</h2>
    <!-- <p>reverseMsg: {{ $store.getters.reverseMsg }}</p> -->
    <p>reverseMsg: {{ reverseMsg }}</p>

    <h2>Mutation</h2>
    <!-- <button @click="$store.commit('increate', 2)">Mutation</button> -->
    <button @click="increate(3)">Mutation</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {
    // count: state => state.count,
    // ...mapState(['count', 'msg']),
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg'])
  },
  methods: {
    ...mapMutations(['increate'])
  }
}
</script>

```

打开Vue调试工具，可以看到vuex中的mutation变化，每个mutation上面的三个按钮，分别是提交本次mutation、恢复到本次的mutation、时光旅行。

<img src="../images/03.png" alt="03.png" style="zoom:50%;" />

#### 5. Action

Action中可以进行异步操作，不过如果需要修改state，得提交Mutation。

Store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    increate (state, payload) {
      state.count += payload
    }
  },
  actions: {
    increateAsync (context, payload) {
      setTimeout(() => {
        context.commit('increate', payload)
      }, 2000)
    }
  },
  modules: {
  }
})

```

App.vue

mapActions用法同mapMutations

```vue
<template>
  <div id="app">
    <h1>Vuex - Demo </h1>
    <!-- <p>count: {{ $store.state.count }}</p> -->
    <!-- <p>msg: {{ $store.state.msg }}</p> -->
    <!-- <p>count: {{ count }}</p> -->
    <!-- <p>msg: {{ msg }}</p> -->
    <p>count: {{ num }}</p>
    <p>msg: {{ message }}</p>
    <h2>Getter</h2>
    <!-- <p>reverseMsg: {{ $store.getters.reverseMsg }}</p> -->
    <p>reverseMsg: {{ reverseMsg }}</p>

    <h2>Mutation</h2>
    <!-- <button @click="$store.commit('increate', 2)">Mutation</button> -->
    <button @click="increate(3)">Mutation</button>

    <h2>Action</h2>
    <!-- <button @click="$store.dispatch('increateAsync', 5)">Mutation</button> -->
    <button @click="increateAsync(6)">Mutation</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    // count: state => state.count,
    // ...mapState(['count', 'msg']),
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg'])
  },
  methods: {
    ...mapMutations(['increate']),
    ...mapActions(['increateAsync'])
  }
}
</script>
```

#### 6. Module

Module可以让单一状态树拆分成多个模块，每个模块可以拥有state、mutation、action、getter，甚至嵌套子模块。

在使用模块里的数据时，可以通过`$store.模块名.state状态属性名`的方式访问

在使用模块里的方法时，可以通过`$store.commit('mutation方法名')`的方式提交mutation

当想要有更强的封装性时，可以开启命名空间，在导出的模块对象里增加一个namespaced属性为true，然后就可以在Vue中使用    `mapState('模块名', ['state状态属性名'])`的方式获取到属性名称，使用`mapMutations('模块名', ['mutation方法名'])`的方式获取到方法名。

./store/modules/products.js

```js
const state = {
  products: [
    { id: 1, title: 'iPhone 11', price: 8000 },
    { id: 2, title: 'iPhone 12', price: 10000 }
  ]
}
const getters = {}
const mutations = {
  setProducts (state, payload) {
    state.products = payload
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

```

./store/modules/cart.js

```js
const state = {}
const getters = {}
const mutations = {}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

```

./store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  getters: {
    reverseMsg (state) {
      return state.msg.split('').reverse().join('')
    }
  },
  mutations: {
    increate (state, payload) {
      state.count += payload
    }
  },
  actions: {
    increateAsync (context, payload) {
      setTimeout(() => {
        context.commit('increate', payload)
      }, 2000)
    }
  },
  modules: {
    products,
    cart
  }
})

```

App.vue

```vue
<template>
  <div id="app">
    <h1>Vuex - Demo </h1>
    <!-- <p>count: {{ $store.state.count }}</p> -->
    <!-- <p>msg: {{ $store.state.msg }}</p> -->
    <!-- <p>count: {{ count }}</p> -->
    <!-- <p>msg: {{ msg }}</p> -->
    <p>count: {{ num }}</p>
    <p>msg: {{ message }}</p>
    <h2>Getter</h2>
    <!-- <p>reverseMsg: {{ $store.getters.reverseMsg }}</p> -->
    <p>reverseMsg: {{ reverseMsg }}</p>

    <h2>Mutation</h2>
    <!-- <button @click="$store.commit('increate', 2)">Mutation</button> -->
    <button @click="increate(3)">Mutation</button>

    <h2>Action</h2>
    <!-- <button @click="$store.dispatch('increateAsync', 5)">Mutation</button> -->
    <button @click="increateAsync(6)">Mutation</button>

    <h2>Modules</h2>
    <!-- <p>products: {{ $store.state.products.products }}</p> -->
    <!-- <button @click="$store.commit('setProducts', [])">Mutation</button> -->
    <p>products: {{ products }}</p>
    <button @click="setProducts([])">Mutation</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'App',
  computed: {
    // count: state => state.count,
    // ...mapState(['count', 'msg']),
    ...mapState({ num: 'count', message: 'msg' }),
    ...mapGetters(['reverseMsg']),
    ...mapState('products', ['products'])
  },
  methods: {
    ...mapMutations(['increate']),
    ...mapActions(['increateAsync']),
    ...mapMutations('products', ['setProducts'])
  }
}
</script>

```

### 六、严格模式

Vuex中的状态的更新要通过提交mutation来修改，但其实在组件中还可以通过`$store.state.msg`进行修改，从语法从面来说这是没有问题的，但是这破坏了Vuex的约定，如果在组件中直接修改state，devtools无法跟踪到这次状态的修改。

开启严格模式之后，如果在组件中直接修改state会抛出错误，但数据仍被成功修改。

如何开启：在store中增加一个属性strict为true

store/index.js

```js
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    count: 0,
    msg: 'Hello Vuex'
  },
  // ...
})
```

App.vue

```vue
<h2>strict</h2>
<button @click="$store.state.msg = 'lagou'">strict</button>
```

<img src="../images/04.png" alt="04.png" style="zoom:50%;" />

> 注意：不要在生产模式下开启严格模式，严格模式会深度检查状态树，检查不合规的状态改变，会影响性能。
>
> 我们可以在开发模式下开启严格模式，在生产模式中关闭严格模式:
>
> `  strict: process.env.NODE_ENV !== 'production',`

### 七、购物车案例

#### 1. 模板

地址：https://github.com/goddlts/vuex-cart-demo-template.git

用到了ElementUI、Vuex、Vue-Router

项目根目录下的server.js文件是一个node服务，为了模拟项目接口。

页面组件和路由已经完成了，我们需要使用Vuex完成数据的交互。

三个组件：

+ 商品列表组件
+ 购物车列表组件
+ 我的购物车组件（弹出窗口）

#### 2. 商品列表组件

+ 展示商品列表
+ 添加购物车

#### 3. 我的购物车组件

+ 购买商品列表
+ 统计购物车中的商品数量和价格
+ 购物车上的商品数量
+ 删除按钮

#### 4. 购物车组件

+ 展示购物车列表
+ 全选功能
+ 增减商品功能和统计当前商品的小计
+ 删除商品
+ 统计选中商品和价格

#### 5. Vuex插件介绍

+ Vuex的插件就是一个函数
+ 这个函数接受一个store参数

这个参数可以订阅一个函数，让这个函数在所有的mutation结束之后执行。

```js
const myPlugin = store => {
  // 当store初始化后调用
  store.subscribe((mutation, state) => {
    // 每次mutation之后调用
    // mutation的格式为{ type, payload }
  })
}
```

Store/index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'
Vue.use(Vuex)

const myPlugin = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  },
  plugins: [myPlugin]
})

```

### 八、模拟实现Vuex

Myvuex/index.js

```js
let _Vue = null

class Store {
  constructor (options) {
    const {
      state = {},
      getters = {},
      mutations = {},
      actions = {}
    } = options
    this.state = _Vue.observable(state)
    this.getters = Object.create(null)
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })
    this._mutaions = mutations
    this._actions = actions
  }

  commit (type, payload) {
    this._mutaions[type](this.state, payload)
  }

  dispatch (type, payload) {
    this._actions[type](this, payload)
  }
}

function install (Vue) {
  _Vue = Vue
  _Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {
  Store,
  install
}

```

将store/index.js中的vuex的导入替换成myvuex

```js
import Vuex from '../myvuex'
```

----

## 服务端渲染

### 一、概述

#### 1. 基于客户端渲染的前端框架

+ Angular
+ React
+ Vue

#### 2. SPA单页应用

优点：

+ 用户体验好
+ 开发效率高
+ 渲染性能好
+ 可维护性好

缺点：

+ 首屏渲染时间长
+ 不利于SEO

#### 3. 借鉴传统的服务器渲染

<img src="../images/05.jpeg" alt="05" style="zoom:50%;" />

#### 4. 客户端激活为SPA

<img src="../images/06.jpeg" alt="06" style="zoom:50%;" />

#### 5. 同构应用

+ 通过服务端渲染首屏直出，解决SPA应用首屏渲染慢以及不利于SEO问题
+ 通过客户端渲染结果页面内容交互得到更好的用户体验
+ 这种方式通常称之为现代化的服务端渲染，也叫同构渲染
+ 这种方式构建的应用称之为服务端渲染应用或者是同构应用

#### 6. 相关概念

+ 什么是渲染：把数据和模板拼接在一起。渲染的本质就是字符串的解析替换。
+ 传统的服务端渲染：早期的web页面渲染都是在服务端进行的
+ 客户端渲染
+ 现代化的服务端渲染（同构渲染）

### 二、传统的服务端渲染（SSR）

#### 1. 案例

<img src="../images/07.png" alt="07" style="zoom:50%;" />

index.js

```js
const express = require('express')
const fs = require('fs')
const template = require('art-template')

const app = express()

app.get('/', (req, res) => {
  // 1. 获取页面模板
  const templateStr = fs.readFileSync('./index.html', 'utf-8')
  console.log(templateStr)
  // 2. 获取数据
  const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
  console.log(data)
  // 3. 渲染：数据 + 模板 = 最终结果
  const html = template.render(templateStr, data)
  console.log(html)
  // 4. 把渲染结果发送给客户端
  res.send(html)
})

app.listen(8081, () => {
  console.log('running......')
})
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>传统的服务端渲染示例</title>
</head>
<body>
  <h1>
    传统的服务端渲染示例
  </h1>
  <h2>{{title}}</h2>
  <ul>
    {{ each data }}
    <li>{{$value.name}}</li>
    {{ /each }}
  </ul>
</body>
</html>
```

data.json

```json
{
  "data": [
    {
      "id": 1,
      "name": "jal"
    },
    {
      "id": 2,
      "name": "wyb"
    }
  ],
  "title": "王一博0805生日快乐"
}
```

#### 2. 缺点：

+ 前后端代码完全耦合在一起，不利于开发和维护
+ 前端没有足够发挥空间
+ 服务端压力大
+ 用户体验一般

### 三、客户端渲染（CSR）

之前服务端渲染的缺点，随着客户端Ajax技术的普及得到了有效的解决，Ajax使得客户端动态获取数据成为可能，因此，服务端渲染的工作来到了客户端。

以Vue.js项目为例系统了解客户端渲染流程。

+ 后端负责处理数据接口
+ 前端负责将接口数据渲染到页面中

前端更为独立，不再受限于后端。

但客户端渲染也存在一些明显的不足：

+ 首屏渲染慢：因为客户端渲染至少发起Http请求三次，第一次是请求页面，第二次是请求页面里的JS脚本，第三次是动态数据请求。

+ 不利于SEO：因为客户端渲染的内容都是由JS生成的，而搜索引擎只会请求网络路径的html，不会去将html里的JS脚本再去请求做解析处理，因此搜索引擎获取到的首屏是空的，单页应用SEO几乎为0。

  ```js
  // 搜索引擎是怎么获取网页内容的？
  const http = require('http')
  
  http.get('http://localhost:8080', res => {
    let data = ''
    res.on('data', chunk => {
      data += chunk
    })
    res.on('end', () => {
      console.log(data)
    })
  })
  
  /*
  打印结果：
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <link rel="icon" href="/favicon.ico">
      <title>vuex-cart-demo-template</title>
    <link href="/js/about.js" rel="prefetch"><link href="/js/app.js" rel="preload" as="script"><link href="/js/chunk-vendors.js" rel="preload" as="script"></head>
    <body>
      <noscript>
        <strong>We're sorry but vuex-cart-demo-template doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
      </noscript>
      <div id="app"></div>
      <!-- built files will be auto injected -->
    <script type="text/javascript" src="/js/chunk-vendors.js"></script><script type="text/javascript" src="/js/app.js"></script></body>
  </html>
  */
  ```

### 四、现代化的服务端渲染（同构渲染）

#### 1. 同构渲染 = 后端渲染 + 前端渲染

+ 基于React、Vue等框架，客户端渲染和服务端渲染的结合
  + 在客户端执行一次，用户实现服务器端渲染（首屏直出）
  + 在客户端再执行一次，用于接管页面交互
+ 核心解决SEO和首屏渲染慢的问题
+ 拥有传统服务端渲染的优点，也有客户端渲染的优点。

#### 2. 如何实现同构渲染?

+ 使用Vue、React等框架的官方解决方案
  + 优点：有助于理解原理
  + 缺点：需要搭建环境
+ 使用第三方解决方案
  + React生态的Next.js
  + Vue生态的Nuxt.js

#### 3. 以Vue生态的Nuxt.js为例演示同构渲染应用

1. 创建一个文件夹，然后进入文件夹执行`yarn init`生成包管理器

2. 然后执行`yarn add nuxt`安装Nuxt

3. 在package.json增加scripts脚本命令`"dev": "nuxt"`

4. 创建pages文件夹，在这个文件夹中创建index.vue文件和about.vue文件，nuxt会根据pages路径自动生成路由。

   ```vue
   // index.vue
   <template>
     <div>
       <h1>首页</h1>
     </div>
   </template>
   
   <script>
   export default {
   
   }
   </script>
   
   <style scoped>
   
   </style>
   ```

   ```vue
   // about.vue
   <template>
     <div>
       <h1>About</h1>
     </div>
   </template>
   
   <script>
   export default {
   
   }
   </script>
   
   <style scoped>
   
   </style>
   
   ```

5. 执行`yarn dev`运行这个Nuxt项目，打开localhost:3000端口，默认是pages/index.vue页面，然后访问localhost:3000/about访问的是pages/about.vue页面

6. 在pages/index.vue页面中通过`asyncData`方法获取json数据，静态的json数据文件是放在static目录下的。Nuxt中提供的钩子函数`asyncData()`，专门用于获取服务端渲染的数据。axios不要忘了安装：`yarn add axios`

   ```vue
   // pages/index.vue
   <template>
     <div id="app">
       <h2>{{ title }}</h2>
       <ul>
         <li
           v-for="item in data"
           :key="item.id"
         >{{ item.name }}</li>
       </ul>
     </div>
   </template>
   
   <script>
   import axios from 'axios'
   
   export default {
     name: 'Home',
     components: {},
     // Nuxt中提供一个钩子函数`asyncData()`，专门用于获取服务端渲染的数据。
     async asyncData () {
       const { data } = await axios({
         method: 'GET',
         // 注意此处的URL要指定当前端口，否则默认会去服务端的80端口去查找。
         url: 'http://localhost:3000/data.json'
       })
       // 这里返回的数据会和data () {} 中的数据合并到一起给页面使用
       return data
     }
   }
   </script>
   
   <style scoped>
   
   </style>
   
   ```

   static/data.json

   ```json
   {
     "data": [
       {
         "id": 1,
         "name": "jal"
       },
       {
         "id": 2,
         "name": "wyb"
       }
     ],
     "title": "王一博0805生日快乐"
   }
   ```

7. 一次请求就拿到了完整页面，Nuxt的服务端渲染方案解决了首屏渲染慢的问题和SEO的问题

<img src="../images/08.png" alt="08" style="zoom:50%;" />

8. Nuxt生成的是SPA单页应用，可以通过增加路由导航看出来，Home和About两个组件切换时页面没有刷新。创建一个文件夹layouts，然后在这个文件夹中创建一个default.vue文件，这个文件名是固定要求的，不能随意取

   ```vue
   <template>
   <div>
   <!-- 路由出口 -->
     <ul>
       <li>
         <!-- 类似于 router-link，用于单页面应用导航 -->
         <nuxt-link to="/">Home</nuxt-link>
       </li>
       <li>
         <!-- 类似于 router-link，用于单页面应用导航 -->
         <nuxt-link to="/about">About</nuxt-link>
       </li>
     </ul>
   <!-- 子页面出口 -->
     <nuxt />
   </div>
   </template>
   
   <script>
   export default {
   
   }
   </script>
   
   <style scoped>
   
   </style>
   
   ```

   

#### 4. 同构渲染应用的问题

+ 开发条件有限

  + 浏览器特定的代码只能在某些生命周期钩子函数中使用
  + 一些外部扩展库可能需要特殊处理才能在服务端渲染应用中运行
  + 不能再服务端渲染期间操作DOM
  + 某些代码操作需要区分运行环境

+ 涉及构建设置和部署的更多要求

  |      | 客户端渲染                | 同构渲染                   |
  | ---- | ------------------------- | -------------------------- |
  | 构建 | 仅构建客户端应用即可      | 需要构建两个端             |
  | 部署 | 可以部署在任意web服务器中 | 只能部署在Node.js Server中 |

+ 更多的服务器端负载

  + 在Node中渲染完整的应用程序，相比仅仅提供静态文件服务器，需要大量占用CPU资源
  + 如果应用在高流量环境下使用，需要准备相应的服务器负载
  + 需要更多的服务端渲染优化工作处理

#### 5. 服务端渲染使用建议

+ 首屏渲染速度是否真的重要？
+ 是否真的需要SEO？

----

## NuxtJS

> 代码仓库地址：https://gitee.com/jiailing/nuxtjs-demo

### 一、Nuxt.js是什么

+ 一个基于Vue.js生态的第三方开源服务端渲染应用框架
+ 它可以帮我们轻松的使用Vue.js技术栈构建同构应用
+ 官网：https://zh.nuxtjs.org/
+ Github仓库：https://github.com/nuxt/nuxt.js

### 二、Nuxt.js的使用方式

+ 初始化项目
+ 已有的Node.js服务端项目
  + 直接把Nuxt当做一个中间件集成到Node Web Server中
+ 现有的Vue.js项目
  + 非常熟悉Nuxt.js
  + 至少百分之10的代码改动

### 三、初始化Nuxt.js应用方式

官方文档：https://zh.nuxtjs.org/guide/installation

+ 方式一：使用create-nuxt-app
+ 方式二：手动创建

### 四、Nuxt.js路由

#### 1. 基本路由

pages文件夹下的文件会自动生成路由

#### 2. 路由导航

+ a标签

  + 它会刷新整个页面，不推荐使用
  + `<a href="/">首页</a>`

+ nuxt-link组件

  + https://router.vuejs.org/zh/api/#router-link-props
  + `<router-link to="/">首页</router-link>`

+ 编程式导航

  + https://router.vuejs.org/zh/guide/essentials/navigation.html

  + `<button @click="onClick">首页</button>`

    ```js
    methods: {
      onClick () {
        this.$router.push('/')
      }
    }
    ```

#### 3. 动态路由

+ Vue Router动态路由匹配
  + https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html
+ Nuxt
  + [https://zh.nuxtjs.org/guide/routing#%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1](https://zh.nuxtjs.org/guide/routing#动态路由)

user/_id.vue，动态路由参数文件名由下划线开头。

```vue
<template>
  <div>
    <h1>User page</h1>
    <p>{{$route.params.id}}</p>
  </div>
</template>

<script>
export default {
  name: 'UserPage'
}
</script>

<style scoped>

</style>
```

#### 4. 嵌套路由

+ Vue Router 嵌套路由
  + https://router.vuejs.org/zh/guide/essentials/nested-routes.html
+ Nuxt.js嵌套路由
  + [https://zh.nuxtjs.org/guide/routing#%E5%B5%8C%E5%A5%97%E8%B7%AF%E7%94%B1](https://zh.nuxtjs.org/guide/routing#嵌套路由)

可以通过 vue-router 的子路由创建 Nuxt.js 应用的嵌套路由。创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。

**Warning:** 别忘了在父组件(`.vue`文件) 内增加 `<nuxt-child/>` 用于显示子视图内容。

![image-20200804073142646](../images/09.png)

#### 4. 路由配置

+ 参考文档：https://zh.nuxtjs.org/api/configuration-router

+ 在项目根目录下创建nuxt.config.js

  ```js
  /**
   * Nuxt.js 配置文件 nuxt.config.js
   */
  
   module.exports = {
     router: {
       base: '/abc',
       // routes就是路由配置表，是个数组，resolve是解析路由路径的
       extendRoutes(routes, resolve) {
        routes.push({
          name: 'custom',
          path: '*',
          component: resolve(__dirname, 'pages/404.vue')
        }),
        routes.push({
          name: 'hello',
          path: '/hello',
          component: resolve(__dirname, 'pages/about.vue')
        })
      }
     }
   }
  ```

### 五、Nuxt.js视图

<img src="../images/10.png" alt="10" />

#### 1. 模板

你可以定制化 Nuxt.js 默认的应用模板。

定制化默认的 html 模板，只需要在 src 文件夹下（默认是应用根目录）创建一个 `app.html` 的文件。

默认模板为：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

<img src="../images/11.png" alt="11" />

#### 2. 结构

Nuxt.js 允许你扩展默认的布局，或在 `layout` 目录下创建自定义的布局。

可通过添加 `layouts/default.vue` 文件来扩展应用的默认布局。

**提示:** 别忘了在布局文件中添加 `<nuxt/>` 组件用于显示页面的主体内容。

默认布局的源码如下：

```vue
<template>
  <nuxt />
</template>
```

<img src="../images/12.png" alt="12" style="zoom:50%;" />

可以在组件中通过layout属性修改默认布局组件：

<img src="../images/13.png" alt="13" style="zoom:50%;" />

Index页面的布局组件变成了foo，但是about页面还是default，因为about页面没有修改其layout属性，所以默认的布局文件还是default

### 六、Nuxt.js异步数据

#### 1. asyncData方法

*Nuxt.js 扩展了 Vue.js，增加了一个叫* `asyncData` 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。



+ https://zh.nuxtjs.org/guide/async-data
+ 基本用法
  + 它会将asyncData返回的数据融合组件data方法返回数据一并给组件
  + 调用时机：服务端渲染期间和客户端路由更新之前（保证了服务端和客户端都要运行处理数据）
+ 注意事项
  + 只能在页面组件中使用，非页面组件中不会调用asyncData方法，如果子组件中需要数据，可以通过props方式传递数据
  + 没有this，因为它是在组件初始化之前被调用的

当你想用的动态页面内容有利于SEO或者是提升首屏渲染速度的时候，就在asyncData中发送请求数据。如果是非异步数据或者普通数据，则正常的初始化到data中即可。

Pages/index.vue

```vue
<template>
  <div>
    <h1>Hello {{ title }}!</h1>
    <Foo />
    <nuxt-link to="/about">about</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
import Foo from '@/components/Foo'

export default {
  name: 'HomePage',
  components: {
    Foo
  },
  async asyncData () {
    // 如果验证asyncData是在服务端执行的？可以通过log输出在了服务端控制台，得出这个方法是在服务端执行的。Nuxtjs为了方便调试，把服务端控制台输出数据也打印在了客户端控制台，但是为了区分，在客户端控制台用“Nuxt SSR”包裹起来了
    console.log('asyncData')
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'// 这里的请求地址要写完整，因为在服务端渲染期间，也要来请求数据，不写完整的话服务端渲染就会走到80端口，如果只是客户端渲染，就会以3000端口为基准来请求根目录下的data.json，服务端渲染就默认走到80了
    })
    // 返回的数据会与data中的数据混合
    return res.data
  },
  data () {
    return {
      foo: 'bar'
    }
  }
}
</script>

<style scoped>

</style>
```

pages/components/Foo.vue

```vue
<template>
  <div>
    <h1>Foo</h1>
    此处会报错，因为这是非页面组件，asyncData方法不会执行，所以foo是未定义。
    <h3>{{foo}}</h3>
  </div>
</template>

<script>
export default {
  name: 'FooPage',
  asyncData () {
    return {
      foo: 'bar'
    }
  }
}
</script>

<style scoped>

</style>
```

static这个文件夹可以直接作为根路径访问

#### 2. 上下文对象

+ [https://zh.nuxtjs.org/guide/async-data#%E4%B8%8A%E4%B8%8B%E6%96%87%E5%AF%B9%E8%B1%A1](https://zh.nuxtjs.org/guide/async-data#上下文对象)

pages/article/_id.vue

```vue
<template>
  <div>
    <h1>article Page </h1>
    <nuxt-link to="/">首页</nuxt-link>
    <h3>title: {{post.title}}</h3>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticlePage',
  async asyncData (context) {
    // asyncData的参数为上下文对象，我们无法在这个方法里使用this，所以无法通过this.$router.params.id拿到路由参数，但是可以通过context.params.id获取参数
    console.log(context) 
    const { data: {posts} } = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'
    })
    const id = parseInt(context.params.id, 10)
    return {
      post: posts.find(item => item.id === id),
    }
  }
}
</script>
```

Components/Foo.vue

```vue
<template>
  <div>
    <h1>Foo</h1>
    <ul>
      <li v-for="item in posts" :key="item.id">
        <nuxt-link :to="'/article/'+item.id">{{item.title}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FooPage',
  props: ["posts"]
}
</script>

<style scoped>

</style>
```

pages/index.vue

```vue
<template>
  <div>
    <h1>Hello {{ title }}!</h1>
    <Foo :posts="posts" />
    <nuxt-link to="/about">about</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'
import Foo from '@/components/Foo'

export default {
  name: 'HomePage',
  components: {
    Foo
  },
  async asyncData () {
    // 如果验证asyncData是在服务端执行的？可以通过log输出在了服务端控制台，得出这个方法是在服务端执行的。Nuxtjs为了方便调试，把服务端控制台输出数据也打印在了客户端控制台，但是为了区分，在客户端控制台用“Nuxt SSR”包裹起来了
    console.log('asyncData')
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/data.json'// 这里的请求地址要写完整，因为在服务端渲染期间，也要来请求数据，不写完整的话服务端渲染就会走到80端口，如果只是客户端渲染，就会以3000端口为基准来请求根目录下的data.json，服务端渲染就默认走到80了
    })
    // 返回的数据会与data中的数据混合
    return res.data
  },
  data () {
    return {
      foo: 'bar'
    }
  }
}
</script>

<style scoped>

</style>
```

## NuxtJS综合案例

### 一、案例介绍

#### 1. 案例介绍

案例名称：RealWorld

这是一个开源的学习项目，目的就是帮助开发者快速学习新技能。

GitHub仓库：[https://github.com/gothinkster/realworld](https://github.com/gothinkster/realworld)

在线实例：[https://demo.realworld.io/](https://demo.realworld.io/)

#### 2. 案例相关资源

+ 页面模板：[https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)
+ 接口文档：[https://github.com/gothinkster/realworld/tree/master/api](https://github.com/gothinkster/realworld/tree/master/api)

#### 3. 学习前提

+ Vue.js使用经验
+ Nuxt.js基础
+ Node.js、webpack相关使用经验

#### 4. 学习收获

+ 掌握使用Nuxt.js开发同构渲染应用

+ 增强Vue.js实践能力

+ 掌握同构渲染应用中常见的功能处理

  + 用户状态管理
  + 页面访问权限处理
  + SEO优化

+ 掌握同构渲染应用的发布与部署

  

### 二、项目初始化

#### 1. 创建项目

+ `mkdir realworld-nuxtjs`
+ `yarn init -y`
+ `yarn add nuxt`
+ 配置启动脚本
+ 创建pages目录，配置初始页面

#### 2. 导入样式资源

Real world的仓库里提供了样式文件：[https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md)

![image-20200806172914730](../images/14.png)

```html
<!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="//demo.productionready.io/main.css">
```

将这三个link放到我们项目中的app.html模板文件中，这个app.html要新建，默认模板就是Nuxt官网上的导航里的视图中的代码：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

把三个link放到head标签里，由于ionicons的CDN地址在国外，打开速度较慢，又包含字体文件，无法直接下载到本地，所以我们去一个国内CDN网站上找到它来使用。

国内CDN网站：[https://www.jsdelivr.com/](https://www.jsdelivr.com/)

![image-20200806173317804](../images/15.png)

搜索ionicons，选择我们需要的版本的css的min版本，复制CDN链接，替换到link中

![image-20200806173438889](../images/16.png)

第二个link的CDN国内支持访问，就不用本地化了。

第三个link的CDN也是在国外，需要本地化，然而它不含字体文件，所以可以直接另存到本地，我们另存到了static/index.css

最终app.html就是这样：

```html
<!DOCTYPE html>
<html {{ HTML_ATTRS }}>
  <head {{ HEAD_ATTRS }}>
    {{ HEAD }}
    <!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
    <link href="https://cdn.jsdelivr.net/npm/ionicons@2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">
    <!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
    <link rel="stylesheet" href="/index.css">
  </head>
  <body {{ BODY_ATTRS }}>
    {{ APP }}
  </body>
</html>
```

#### 3. 布局组件

+ 重写路由表

nuxt.config.js

```js
module.exports = {
  router: {
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除Nuxt.js基于pages目录生成的路由表规则
      routes.splice(0)

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '', // 默认子路由
              component: resolve(__dirname, 'pages/Home')
            }
          ]
        }
      ])
    }
  }
}
```

Layout/index.vue

![image-20200806190456963](../images/17.png)

将模板代码中的导航和页脚代码放到layout/index.vue里面，导航和页脚之间放子路由组件`<nuxt-child/>`

路由表中的layout组件的默认子组件是HomePage，html部分的代码来自于模板代码中的home部分。代码如下

home/index.vue

![image-20200806191235438](../images/18.png)

然后重启项目，访问项目的根路径，就是Layout组件

![image-20200806191356293](../images/19.png)

#### 4. 导入登录注册页面

将仓库中的登录/注册模板代码拷贝到pages/login/index.vue中，登录和注册共用一个页面，通过计算属性来判断当前是登录还是注册页面，进而进行不同的文字渲染。

![image-20200806194930769](../images/20.png)

但是配置两个不同的路由，在nuxt.config.js中的layout路由的children数组中再添加两个子路由：

```js
{
  path: '/login',
  name: 'login',
  component: resolve(__dirname, 'pages/login')
},
{
  path: '/register',
  name: 'register',
  component: resolve(__dirname, 'pages/login')
}
```

页面如下：

![image-20200806195212732](../images/21.png)

![image-20200806195232199](../images/22.png)

#### 5. 导入剩余页面

个人简介profile、设置settings、文章新增修改页editor、文章详情页article

![image-20200806225903998](../images/23.png)

#### 6. 处理顶部导航链接

将`a`标签替换成`nuxt-link`标签，`href`属性替换成`to`属性

#### 7. 处理导航链接的高亮

给nuxt.config.js的router对象增加`    linkActiveClass: 'active'`属性

然后删掉导航链接中的Home链接写死的active类，再增加exact属性，表示只有精确匹配到Home的路径时才高亮。

` <nuxt-link class="nav-link" exact to="/">Home</nuxt-link>`

#### 8. 封装请求状态

安装axios: `yarn add axios`

封装请求：utils/request.js

```js
/**
 * 基于axios封装的请求模块
 */

 import axios from 'axios'

 const request = axios.create({
   baseURL: 'https://conduit.productionready.io'
 })

// 请求拦截器

// 响应拦截器

 export default request
```

### 三、登录注册

#### 1. 封装登录方法

api/user.js

```js
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}
```

pages/login/index.vue

```js
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      // 提交表单，请求登录
      const { data } = await login({
        user: this.user
      })
      console.log('data', data)
      // TODO 保存用户的登录状态

      // 跳转到首页
      this.$router.push('/')
    }
  }
}
```

#### 2. 错误处理

data中存放`errors: {} // 错误信息`

改写onSubmit方法(try-catch捕获错误)：

```js
async onSubmit () {
  try {
    // 提交表单，请求登录
    const { data } = await login({
      user: this.user
    })
    console.log('data', data)
    // TODO 保存用户的登录状态

    // 跳转到首页
    this.$router.push('/')
  }
  catch (err) {
    console.log('请求失败', err)
    console.dir(err)
    this.errors = err.response.data.errors
  }
}
```

遍历错误信息：

```html
<ul class="error-messages">
  <template v-for="(messages, field) in errors">
    <li v-for="(message, index) in messages" :key="index">
      {{ field }} {{ messages}}
    </li>
  </template>
</ul>
```

#### 3. 注册

```js
data () {
  return {
    user: {
      username: '',
      email: '',
      password: ''
    },
    errors: {} // 错误信息
  }
},
methods: {
    async onSubmit () {
      try {
        // 提交表单，请求登录
        const { data } = this.isLogin ? await login({
          user: this.user
        }): await register({
          user: this.user
        })
        console.log('data', data)
        // TODO 保存用户的登录状态

        // 跳转到首页
        this.$router.push('/')
      }
      catch (err) {
        console.log('请求失败', err)
        console.dir(err)
        this.errors = err.response.data.errors
      }
    }
}
```

#### 4. 解析存储登录状态实现流程

[https://zh.nuxtjs.org/examples/auth-external-jwt](https://zh.nuxtjs.org/examples/auth-external-jwt)

[https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/auth-jwt?from-embed=&file=/store/index.js](https://codesandbox.io/s/github/nuxt/nuxt.js/tree/dev/examples/auth-jwt?from-embed=&file=/store/index.js)

#### 5. 将登录状态存储到容器中

store/index.js

```js
// 为了防止在服务端渲染期间，运行的都是同一个实例，防止数据冲突，务必要把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {

}
```

登录成功时保存用户状态到容器中，login/index.vue

```js
// 保存用户的登录状态
this.$store.commit('setUser', data.user)
```

#### 6. 登录状态持久化

将数据存到store中，只是在内存里，页面一刷新就没了。所以我们应该想办法将数据进行持久化。以前的做法是存到本地存储里，而现在在服务端也要渲染，所以不可以存在本地存储，否则服务端获取不到。正确的做法是存在cookie中，cookie可以随着http请求发送到服务端。

所以在login/index.vue页面中容器保存完登录状态后，还要将数据存储到Cookie中

```js
// 仅在客户端加载js-cookie
const Cookie = process.client ? require('js-cookie'): undefined

// ...

// 保存用户的登录状态
this.$store.commit('setUser', data.user)

// 为了防止刷新页面数据丢失，数据需要持久化
Cookie.set('user', data.user)
```

在Store/index.js的`actions`中增加`nuxtServerInit`方法，`nuxtServerInit`是一个特殊的`action`方法，这个方法会在服务端渲染期间自动调用，作用是初始化容器数据，传递数据给客户端使用

```js
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    // 如果请求头中有个Cookie
    if (req.headers.cookie) {
      // 使用Cookieparser把cookie字符串转化为JavaScript对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}
```

#### 7. 处理导航栏链接展示状态

Layout/index.vue页面中，增加计算属性user，通过user判断用户是否是登录状态：

```js
import { mapState } from 'vuex'

export default {
  name: 'LayoutIndex',
  computed: {
    ...mapState(['user'])
  }
}
```

然后将导航栏上的用户名称那个`li`调到登录注册的`li`前面去，将最后两个`li`套在`template`里，将另3个`li`套在另外一个`template`里，如果用户登录了，则显示第一个`template`，如果未登录则显示后面两个登录注册所在的`template`

<img src="../images/24.png" />

#### 8. 处理页面访问权限 -- 中间件

[[https://zh.nuxtjs.org/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6](https://zh.nuxtjs.org/guide/routing#中间件)]([https://zh.nuxtjs.org/guide/routing#%E4%B8%AD%E9%97%B4%E4%BB%B6](https://zh.nuxtjs.org/guide/routing#中间件))

中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。

每一个中间件应放置在 `middleware/` 目录。文件名的名称将成为中间件名称 (`middleware/auth.js`将成为 `auth` 中间件)。然后给要保护的页面增加`middleware`属性，值为中间件的文件名

中间件执行流程顺序：

1. `nuxt.config.js`
2. 匹配布局
3. 匹配页面

定义两个中间件，

middleware/authenticated.js

```js
export default function ({ store, redirect }) {
  // 如果用户未登录，则跳转到登录页
  if (!store.state.user) {
    return redirect('/login')
  }
}
```

middleware/notAuthenticated.js

```js
export default function ({ store, redirect }) {
  // 如果用户已登录，则跳转到首页
  if (store.state.user) {
    return redirect('/')
  }
}
```

然后给`settings/index.vue`、`profile/index.vue`、`editor/index`页面增加属性`middleware`值为`authenticated`

```js
export default {
  name: 'Settings',
  middleware: 'authenticated'
}
```

给`login/index.vue`页面增加属性`middleware`值为`notAuthenticated`

```js
export default {
  name: 'LoginPage',
  middleware: 'notAuthenticated',
  // ...
}
```

### 四、首页

首页展示我的关注的文章和公共文章，所有文章可以选择标签，还可以分页。

#### 1. 展示公共文章列表

Api/article.js

```js
import request from '@/utils/request'

// 获取公共的文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
```

为了更好地优化SEO，将数据渲染放到服务端进行，数据初始化代码写到` asyncData () `函数中，循环渲染文章信息。

home/index.vue

```html
<div
  class="article-preview"
  v-for="article in articles"
  :key="article.slug"
>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }"
      ><img :src="article.author.image"
    /></nuxt-link>
    <div class="info">
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }"
        class="author"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createAt}}</span>
    </div>
    <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active: article.favorited}">
      <i class="ion-heart"></i> {{article.favoritesCount}}
    </button>
  </div>
  <nuxt-link :to="{
    name: 'article',
    params: {
      slug: article.slug
    }
  }" class="preview-link">
    <h1>{{article.title}}</h1>
    <p>{{article.description}}</p>
    <span>Read more...</span>
  </nuxt-link>
</div>
```

```js
import { getArticles } from '@/api/article'
export default {
  name: "HomePage",
  async asyncData () {
    const { data } = await getArticles()
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    }
  }
};
```

#### 2. 列表分页

+ 分页参数的使用

  ```js
  async asyncData () {
    const page = 1
    const limit = 2
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    }
  }
  ```

  `limit`表示每次展示多少条，`offset`表示跳过前多少条。所以当点击了页码为`page`时，`offset`则为`(page - 1) * limit`

+ 分页处理

  ```html
  <!-- 分页 -->
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{active: item === page}" v-for="item in totalPage" :key="item">
        <nuxt-link class="page-link" :to="{
                                          name: 'home',
                                          query: {
                                          page: item
                                          }
                                          }">{{item}}</nuxt-link>
      </li>
    </ul>
  ```

  ```js
  import { getArticles } from '@/api/article'
  export default {
    name: "HomePage",
    watchQuery: ['page'],
    async asyncData ({ query }) {
      const page = Number.parseInt(query.page || 1)
      const limit = 20
      const { data } = await getArticles({
        limit,
        offset: (page - 1) * limit
      })
      return {
        limit,
        page,
        articles: data.articles,
        articlesCount: data.articlesCount
      }
    },
    computed: {
      totalPage () {
        return Math.ceil(this.articlesCount / this.limit)
      }
    }
  };
  ```

  通过计算属性totalPage获取到总页面数。asyncData服务端渲染时通过URL上的query中的page参数获取到页码。

  循环生成的页码标签使用nuxt-link标签，在客户端进行路由切换。而在前端路由变化之前，会执行asyncData方法更新数据。但是Nuxt中默认情况下query参数的变化不能引起asyncData代码的执行，所以我们可以通过使用watchQuery参数监听到路由的变化，触发asyncData的调用。

  [https://zh.nuxtjs.org/api/pages-watchquery](https://zh.nuxtjs.org/api/pages-watchquery)

  使用`watchQuery`属性可以监听参数字符串的更改。 如果定义的字符串发生变化，将调用所有组件方法(asyncData, fetch, validate, layout, ...)。 为了提高性能，默认情况下禁用。

  ```js
  export default {
    watchQuery: ['page']
  }
  ```

#### 3. 文章便签列表

api/tag.js

```js
import request from '@/utils/request'

// 获取文章标签列表
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}
```

pages/home/index.vue

```html
<div class="tag-list">
              <a
                href=""
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{item}}</a>
            </div>
```

```js
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tag'
export default {
  name: "HomePage",
  watchQuery: ['page'],
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    const { data: tagData } = await getTags()
    return {
      limit,
      page,
      articles: data.articles,
      articlesCount: data.articlesCount,
      tags: tagData.tags
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
};
```

#### 4. 优化并行异步任务

将两个没有依赖关系的异步任务通过使用`Promise.all`并行执行，提高请求速度。并发执行的速度大于串行执行的速度。

```js
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tag'
export default {
  name: "HomePage",
  watchQuery: ['page'],
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const [articleRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    return {
      limit,
      page,
      articles,
      articlesCount,
      tags
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  }
};
```

#### 5. 处理标签列表链接和数据

```html
<!-- 分页 -->
<nav>
  <ul class="pagination">
    <li class="page-item" :class="{active: item === page}" v-for="item in totalPage" :key="item">
      <nuxt-link class="page-link" :to="{
                                        name: 'home',
                                        query: {
                                        page: item,
                                        tag: $route.query.tag
                                        }
                                        }">{{item}}</nuxt-link>
    </li>
  </ul>
</nav>

<div class="tag-list">
              <nuxt-link
                :to="{
                  name: 'home',
                  query: {
                    tag: item
                  }
                }"
                class="tag-pill tag-default"
                v-for="item in tags"
                :key="item"
              >{{item}}</nuxt-link>
            </div>
```

```js
watchQuery: ['page', 'tag'],// 此处监听query中tag变化
  
// ...
  
 
getArticles({
    limit,
    offset: (page - 1) * limit,
    tag: query.tag, // 此处增加tag参数
  }),
```

#### 6. 处理文章导航选项卡

```html
<ul class="nav nav-pills outline-active">
  <li v-if="user" class="nav-item" :class="{active: tab === 'your_feed'}">
    <nuxt-link
               class="nav-link"
               :to="{
                    name: 'home',
                    query: {
                    tab: 'your_feed'
                    }
                    }"
               exact
               >Your Feed</nuxt-link>
  </li>
  <li class="nav-item" :class="{active: tab === 'global_feed'}">
    <nuxt-link
               class="nav-link"
               :to="{
                    name: 'home'
                    }"
               exact
               >Global Feed</nuxt-link>
  </li>
  <li v-if="tag" class="nav-item" :class="{active: tab === 'tag'}">
    <nuxt-link
               class="nav-link"
               :to="{
                    name: 'home',
                    query: {
                    tab: 'tag',
                    tag: tag
                    }
                    }"
               exact
               > # {{ tag }}</nuxt-link>
  </li>
</ul>

<div class="tag-list">
  <nuxt-link
             :to="{
                  name: 'home',
                  query: {
                  tag: item,
                  tab: 'tag'
                  }
                  }"
             class="tag-pill tag-default"
             v-for="item in tags"
             :key="item"
             >{{item}}</nuxt-link>
</div>
```

```js
import { getArticles } from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: "HomePage",
  watchQuery: ['page', 'tag', 'tab'], // 这里增加了tab的监听
  async asyncData ({ query }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20
    const tab = query.tab || 'global_feed' // 将tab存到data里
    const tag = query.tag // 将tag存到data里
    const [articleRes, tagRes] = await Promise.all([
      getArticles({
        limit,
        offset: (page - 1) * limit,
        tag: query.tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articleRes.data
    const { tags } = tagRes.data
    return {
      limit,
      page,
      articles,
      articlesCount,
      tags,
      tab,
      tag
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user']) // 用来判断用户是否登录
  }
};
```

#### 7. 展示用户关注的文章列表

Api/article.js

```js
// 获取用户关注的文章列表
export const getYourFeedArticles = params => {
  return request({
    headers: {
      // 添加用户身份，数据格式：Token空格Token数据
      Authorization: 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTA4NjU2LCJ1c2VybmFtZSI6ImppYWlsaW5nIiwiZXhwIjoxNjAyMDcyNDkyfQ.Uoz9baKbVzE8oDpLFzAsmhdIPqLnfDCLmEzU7A8Cfog'
    },
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}
```

pages/home/index.vue改写部分

```js
const loadArticles = tab !== 'your_feed'
? getArticles
: getYourFeedArticles
const [articleRes, tagRes] = await Promise.all([
  loadArticles({
    limit,
    offset: (page - 1) * limit,
    tag: query.tag
  }),
  getTags()
])
```

#### 8. 统一设置用户Token

axios请求拦截器：

[https://github.com/axios/axios#interceptors](https://github.com/axios/axios#interceptors)

Nuxt中间件：

[[https://zh.nuxtjs.org/guide/plugins#%E6%B3%A8%E5%85%A5-context](https://zh.nuxtjs.org/guide/plugins#注入-context)]([https://zh.nuxtjs.org/guide/plugins#%E6%B3%A8%E5%85%A5-context](https://zh.nuxtjs.org/guide/plugins#注入-context))

新建文件plugins/request.js

```js
/**
 * 基于axios封装的请求模块
 */

import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取到上下文对象（query、params、req、res、app、store···）
// 插件导出函数必须作为default成员
export default ({ store }) => {

  // 请求拦截器
  // Add a request interceptor
  // 任何请求都要经过请求拦截器
  // 我们可以在请求拦截器中做一些公共的业务处理，例如统一设置Token
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 请求就会经过这里
    const { user } = store.state
    if ( user && user.token)
    config.headers.Authorization = `Token ${user.token}`
    // 返回config请求配置对象
    return config;
  }, function (error) {
    // 如果请求失败（此时请求还没有发出去）就会进入这里
    // Do something with request error
    return Promise.reject(error);
  });
}

```

在Nuxt配置文件中注册插件：

Nuxt.config.js

```js
module.exports = {
  // 注册插件
  plugins: [
    '~/plugins/request.js', // 波浪线开头表示从根路径触发
  ]
}
```

删除原本的utils/request.js文件

将原本api文件夹里的文件引用的utils/request.js文件全部改为plugins/request.js

#### 9. 文章发布时间格式设置

Dayjs是一种更轻量级的日期插件，跟Moment的API用法相同，包含Moment最核心的功能。

Dayjs的GitHub仓库地址：[https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md)

在dayjs官网上查看日期格式：[https://day.js.org/docs/en/display/format](https://day.js.org/docs/en/display/format)

安装：`yarn add dayjs`

新建文件plugins/dayjs.js

```js
import Vue from 'vue'
import dayjs from 'dayjs'

// {{ 表达式 | 过滤器 }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
```

去nuxt.config.js里面注册date过滤器插件

```js
module.exports = {
  // ... 
  
	// 注册插件
  plugins: [
    '~/plugins/request.js', // 波浪线开头表示从根路径触发
    '~/plugins/dayjs.js',
  ]
}
```

对page/home/index.vue里面的日期使用过滤器

```html
<span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
```

#### 10. 文章点赞

Api/article.js增加两个按需导出的方法，处理文章点赞和取消点赞功能

```js
// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
```

视图中的button按钮增加点击事件：

```html
<button
        class="btn btn-outline-primary btn-sm pull-xs-right"
        :class="{active: article.favorited}"
        @click="onFavorite(article)"
        :disabled="article.favoriteDisabled"
        >
  <i class="ion-heart"></i> {{article.favoritesCount}}
</button>
```

在methods中实现onFavorite(article)函数

```js
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite } from '@/api/article'
```

```js
// 主动给article增加一个favoriteDisabled属性，用来控制用户无法频繁点击，避免因为网络原因导致视图和数据库的点赞数不一致。下面这句话写在asyncData方法的return之前。
articles.forEach(article => article.favoriteDisabled = false)
```

```js
methods: {
  async onFavorite (article) {
    article.favoriteDisabled = true // 禁用点击
    if(article.favorited) {
      // 取消点赞
      await deleteFavorite(article.slug)
      article.favorited = false
      article.favoritesCount -= 1
    } else {
      // 添加点赞
      await addFavorite(article.slug)
      article.favorited = true
      article.favoritesCount += 1
    }
    article.favoriteDisabled = false // 允许点击
  }
}
```

### 五、文章详情

展示文章详情内容、关注作者、点赞和取消点赞、评论功能

#### 1. 展示文章基本信息

在api/article.js中增加一个获取文章详情的方法

```js
// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
```

pages/article/index.vue

```js
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndx',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    return {
      article: data.article
    }
  }
}
```

```html
<h1>{{article.title}}</h1>

<div class="row article-content">
  <div class="col-md-12">
    {{ article.body }}
  </div>
</div>
```

#### 2. 文章详情 - markdown转HTML

可以使用slug为`markdown-ddof1g`的文章测试

先安装处理markdown的依赖markdown-it

```
yarn add markdown-it
```

然后new一个 MarkdownIt的实例，使用实例的render方法转化markdown为HTML

```js
import MarkdownIt from 'markdown-it'
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndx',
  async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article: article
    }
  }
}
```

html文本要用v-html标签渲染

```html
<div class="row article-content">
  <div class="col-md-12" v-html="article.body">
  </div>
</div>
```

#### 3. 展示文章作者相关信息

Pages/article/components/article-meta.vue

```html
<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }" class="author">{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>

    <button class="btn btn-sm btn-outline-secondary" :class="{active: article.author.following}">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{active: article.favorited}">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>
```

pages/article/index.vue

```html
<ArticleMeta :article="article"/>
```

#### 4. 设置页面meta的SEO优化

[https://zh.nuxtjs.org/guide/views#html-%E5%A4%B4%E9%83%A8](https://zh.nuxtjs.org/guide/views#html-头部)

[https://zh.nuxtjs.org/guide/views#%E4%B8%AA%E6%80%A7%E5%8C%96%E7%89%B9%E5%AE%9A%E9%A1%B5%E9%9D%A2%E7%9A%84-meta-%E6%A0%87%E7%AD%BE](https://zh.nuxtjs.org/guide/views#个性化特定页面的-meta-标签)

Nuxt 在 `head` 方法里可通过 `this` 关键字来获取组件的数据，你可以利用页面组件的数据来设置个性化的 `meta` 标签。

注意：为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为 meta 标签配一个唯一的标识编号。请阅读[关于 `vue-meta` 的更多信息](https://vue-meta.nuxtjs.org/api/#tagidkeyname)。

Pages/article/index.vue

```js
head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
```

#### 5. 通过客户端渲染展示评论列表

Api/article.js里增加获取文章评论的方法

```js
// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
```

pages/article/components/article-comment.vue

```html
<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import { getComments } from '@/api/article'
export default {
  name: 'ArticleComment',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // 文章列表
      comments: []
    }
  },
  async mounted () {
    // 不要求SEO，请求数据放到mounted里面，只走客户端渲染
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  }
}
</script>
```

pages/article/index.vue

```html
<ArticleComment :article="article" />
```

#### 6. 登录才能评论

pages/article/index.vue

```html
<div class="col-xs-12 col-md-8 offset-md-2">
  <ArticleComment v-if="user" :article="article" />
  <ArticlelUnlogin v-else />
</div>
```

```js
import { mapState } from 'vuex'
import ArticleUnlogin from './components/article-unlogin'

export default {
  // ...
  components: {
    // ...
    ArticleUnlogin
  },
  // ...
  computed: {
    ...mapState(['user'])
  },
}
```

pages/article/components/article-unlogin.vue

```html
<template>
  <div>
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div show-authed="true" style="display: none;">
        <list-errors from="$ctrl.commentForm.errors" class="ng-isolate-scope"
          ><ul class="error-messages ng-hide" ng-show="$ctrl.errors">
            <!-- ngRepeat: (field, errors) in $ctrl.errors -->
          </ul>
        </list-errors>
        <form
          class="card comment-form ng-pristine ng-valid"
          ng-submit="$ctrl.addComment()"
        >
          <div class="card-block">
            <textarea
              class="form-control ng-pristine ng-untouched ng-valid ng-empty"
              placeholder="Write a comment..."
              rows="3"
              ng-model="$ctrl.commentForm.body"
            >
            </textarea>
          </div>
          <div class="card-footer">
            <img class="comment-author-img" />
            <button class="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </form>
      </div>

      <p show-authed="false" style="display: inherit;">
        <nuxt-link to="/login">Sign in</nuxt-link> or
        <nuxt-link to="/register">sign up</nuxt-link> to add comments
        on this article.
      </p>

    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleUnlogin",
};
</script>

```

#### 7. 发表评论

pages/article/components/article-comment.vue

```html
<form class="card comment-form">
  <div class="card-block">
    <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="body"></textarea>
  </div>
  <div class="card-footer">
    <img :src="user.image" class="comment-author-img" />
    <button class="btn btn-sm btn-primary" @click.prevent="submitComment">
      Post Comment
    </button>
  </div>
</form>
```

```js
import { getComments, addComment } from '@/api/article'

export default {
  data () {
    return {
      // ...
      body: ''
    }
  },
  // ...
  methods: {
    async submitComment () {
      const { data } = await addComment(this.article.slug, this.body)
      this.comments.unshift(data.comment)
      this.body = ''
    }
  }
}
```

api/article.js

```js
// 评论文章
export const addComment = (slug, body) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {body}
  })
}
```

#### 8. 添加文章

pages/editor/index.vue

```html
<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <ul class="error-messages" v-if="errors">
          <div v-for="(value, field) in errors" :key="field" class="ng-scope">
            <li v-for="error in value" :key="error" class="ng-binding ng-scope">
              {{field}} {{error}}
            </li>
          </div>
        </ul>
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" required>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description" required>
            </fieldset>
            <fieldset class="form-group">
                <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)" required></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input v-model="tagstr" v-on:keyup.enter="enterTag" type="text" class="form-control" placeholder="Enter tags">
                <div class="tag-list">
                  <span v-for="(tag, index) in article.tagList" :key="index" class="tag-default tag-pill">
                  <i class="ion-close-round" @click="removeTag(index)"></i>
                  {{tag}}
                </span>
                </div>
            </fieldset>
            <button @click="submitArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { createArticle } from '@/api/editor'

export default {
  name: 'EditorIndex',
  middleware: 'authenticated',
  data () {
    return {
      tagstr: '',
      errors: null,
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  methods: {
    enterTag () {
      this.article.tagList.push(this.tagstr)
      this.tagstr = ''
    },
    removeTag (index) {
      this.article.tagList.splice(index, 1)
    },
    async submitArticle () {
      try {
        const { data } = await createArticle(this.article)
        this.$router.push(`/article/${data.article.slug}`)
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
  }
}
</script>

<style scoped>

</style>

```

api/editor.js

```js
import {request} from '@/plugins/request'

// 发表文章
export const createArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}
```

#### 9. 本人的文章详情页显示修改按钮和删除按钮

![34](../images/34.png)

注意：修改文章的路由表里要配:slug,否则slug无法显示到路由上，slug后面要加问号，否则添加文章的页面无法访问了

nuxt.config.js

```js
{
  path: '/editor/:slug?',
    name: 'editor',
      component: resolve(__dirname, 'pages/editor')
},
```

pages/article/components/article-meta.vue

```html
<span v-if="!user">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{ active: article.author.following }"
      >
        <i class="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{ active: article.favorited }"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </span>
    <span v-else>
      <nuxt-link
        class="btn btn-outline-secondary btn-sm"
        :to="{
          name: 'editor',
          params: {
            slug: article.slug,
          },
        }"
      >
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button
        class="btn btn-outline-danger btn-sm"
        :class="{ disabled: article.isDeleting }"
        @click="handleDelete(article)"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
```

```js
import { mapState } from "vuex"
import { deleteArticle } from '@/api/article'
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async handleDelete(article) {
      this.article.isDeleting = true
      await deleteArticle(article.slug)
      this.article.isDeleting = false
      this.$router.push('/')
    },
  },
};
```

api/article.js

```js
// 删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}

// 更新文章详情
export const updateArticle = (slug, data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}
```

#### 10. 修改文章与添加文章共用一个路由和页面

pages/editor/index.vue

```js
import { createArticle, getArticle, updateArticle } from '@/api/article'

export default {
  name: 'EditorIndex',
  middleware: 'authenticated',
  data () {
    return {
      tagstr: '',
      errors: null,
      article: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  async mounted () {
    const slug = this.$route.params.slug
    if (slug) {
      this.slug = slug
      const { data } = await getArticle(slug)
      this.article = data.article
    }
  },
  methods: {
    enterTag () {
      this.article.tagList.push(this.tagstr)
      this.tagstr = ''
    },
    removeTag (index) {
      this.article.tagList.splice(index, 1)
    },
    async submitArticle () {
      try {
        if (this.slug) {
          const { data } = await updateArticle(this.slug, {article: this.article})
          this.$router.push(`/article/${data.article.slug}`)
        }else {
          const { data } = await createArticle({
            article: this.article
          })
          this.$router.push(`/article/${data.article.slug}`)
        }
      } catch (e) {
        this.errors = e.response.data.errors
      }
    }
  }
}
```

#### 11. 设置页修改个人资料

pages/settings/index.vue

```html
<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>
        <ul class="error-messages">
          <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">
              {{ field }} {{ messages}}
            </li>
          </template>
        </ul>
        <form>
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="url" placeholder="URL of profile picture" v-model="user.image" required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required>
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required>
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right" @click.prevent="handleSubmit">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr/>
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
const Cookie = process.client ? require('js-cookie'): undefined
import { updateUser } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  middleware: 'authenticated',
  data () {
    return {
      user: {
        bio: '',
        email: '',
        image: '',
        password: '',
        username: ''
      },
      errors: {} // 错误信息
    }
  },
  computed: {
    ...mapState({storeUser: 'user'})
  },
  
  mounted () {
    this.user.bio = this.storeUser.bio
    this.user.email = this.storeUser.email
    this.user.image = this.storeUser.image
    this.user.password = this.storeUser.password
    this.user.username = this.storeUser.username
  },

  methods: {
    async handleSubmit () {
      try {
        const { data } = await updateUser({
          user: this.user
        })

        console.log('data', data)

        // 更新用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止刷新页面数据丢失，数据需要持久化
        Cookie.set('user', data.user)

        this.$router.push(`/profile/${data.user.username}`)
      } catch (e) {
        this.errors = e.response.data.errors
      }
    },
    logout () {
      // 删除用户的登录状态
      this.$store.commit('setUser', null)

      // 删除数据持久化
      Cookie.set('user', null)
      
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>

```

#### 12. 用户个人主页

```html
<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <button
            class="btn btn-sm btn-outline-secondary action-btn"
            :class="{ active: profile.following }"
            @click="onFollow(profile)"
          >
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{profile.username}} 
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link
                class="nav-link" 
                exact
                :class="{active: tab === 'my'}"
                :to="{
                name: 'profile',
                params: {
                  profile: profile.username
                },
                query: {
                  tab: 'my'
                }
              }">My Articles</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link
                class="nav-link"
                exact
                :class="{active: tab === 'favorited'}"
                :to="{
                  name: 'profile',
                  params: {
                    profile: profile.username
                  },
                  query: {
                    tab: 'favorited'
                  }
                }">Favorited Articles</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{
              name: 'profile',
              params: {
                username: article.author.username
              }
            }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
                class="author"
               >
                {{article.author.username}}
              </nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active: article.favorited}"
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
              >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
            <ul class="tag-list">
              <li class="tag-default tag-pill tag-outline" v-for="tag in article.tagList" :key="tag">
                {{tag}}
              </li>
            </ul>
          </nuxt-link>
        </div>
        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <li class="page-item" :class="{active: item === page}" v-for="item in totalPage" :key="item">
              <nuxt-link class="page-link"
                :to="{
                  name: 'profile',
                  params: {
                    username: profile.username
                  },
                  query: {
                    page: item,
                    tab
                  }
                }">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getProfiles } from '@/api/profile'
import { getArticles, deleteFavorite, addFavorite, deleteFollow, addFollow } from '@/api/article'
export default {
  name: 'UserProfile',
  watchQuery: ['tab', 'page'],
  async asyncData (context) {

    const { tab = 'my', page = 1 } = context.query
    const {username} = context.params

    const limit = 5
    const offset = ( page - 1 ) * limit

    const articleParams = tab === 'my'
    ? { author: username }
    : { favorited: username }

    articleParams.limit = limit
    articleParams.offset = offset

    const [profileRes, articlesRes] = await Promise.all([
      getProfiles(username), getArticles(articleParams)
    ])
    const { profile } = profileRes.data
    const { articles, articlesCount } = articlesRes.data
    articles.forEach(article => article.favoriteDisabled = false)

    return {
      tab,
      limit,
      page,
      profile,
      articles,
      articlesCount,
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    },
  },
  methods: {
    async onFavorite (article) {
      if (!this.user ) return this.$router.push('/login')
      article.favoriteDisabled = true // 禁用点击
      if(article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false // 允许点击
    },
    async onFollow (author) {
      if (!this.user ) return this.$router.push('/login')
      author.followDisabled = true // 禁用点击
      if(author.following) {
        // 取消点赞
        await deleteFollow(author.username)
        author.following = false
        author.favoritesCount -= 1
      } else {
        // 添加点赞
        await addFollow(author.username)
        author.following = true
        author.followesCount += 1
      }
      author.followDisabled = false // 允许点击
    }
  }
}
</script>

<style scoped>

</style>

```

>最终代码都在这儿：https://github.com/2604150210/realworld-nuxtjs

### 六、Nuxt.js 发布部署

#### 1. 使用命令打包

[https://zh.nuxtjs.org/guide/commands](https://zh.nuxtjs.org/guide/commands)

*Nuxt.js 提供了一系列常用的命令, 用于开发或发布部署。*

| 命令          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| nuxt          | 启动一个热加载的 Web 服务器（开发模式） [localhost:3000](http://localhost:3000/)。 |
| nuxt build    | 利用 webpack 编译应用，压缩 JS 和 CSS 资源（发布用）。       |
| nuxt start    | 以生产模式启动一个 Web 服务器 (需要先执行`nuxt build`)。     |
| nuxt generate | 编译应用，并依据路由配置生成对应的 HTML 文件 (用于静态站点的部署)。 |

可以将这些命令添加至 `package.json`：

```json
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start"
}
```

先执行`yarn build`，再执行`yarn start`

#### 2. 最简单的部署方式

+ 配置Host + Port

  ```js
  // nuxt.config.js
  server: {
    host: '0.0.0.0',// 监听所有外网地址。在生产环境服务器上外网环境就能访问到了，在本地的话，局域网都能访问到了
      port: 3000
  },
  ```

+ 压缩发布包

  + `.nuxt`文件夹（Nuxt打包生成的资源文件）

  + static文件夹（项目中的静态资源）

  + nuxt.config.js（给Nuxt服务来使用的）

  + package.json （因为在服务端要安装第三方包）

  + yarn.lock（因为在服务端要安装第三方包）

    ![image-20200809144330187](../images/25.png)

+ 把发布包传到服务端

  + 登录服务器：`ssh root@jiailing.com`
  + 选择一个目录创建一个realworld-nuxtjs文件夹：`mkdir realworld-nuxtjs`
  + `cd realworld-nuxtjs`进入这个文件夹，然后使用`pwd`命令打印当前文件夹路径：`/product/front/realworld-nuxtjs`
  + 回到本地，使用scp命令往服务器传压缩包：`scp ~/JALProjects/lagou-fed/fed-e-task-03-03/code/realworld-nuxtjs/realworld-nuxtjs.zip root@jiailing.com:/product/front/realworld-nuxtjs`

+ 解压

  + 回到服务器的`realworld-nuxtjs`文件夹里，此时已经有了一个`realworld-nuxtjs.zip`文件，执行`unzip realworld-nuxtjs.zip`对压缩包解压
  + 然后使用`ls -al`查看解压后的所有文件

+ 安装依赖

  + 执行`yarn`

+ 启动服务

  + 执行`yarn start`启动服务
  + 访问：[http://jiailing.com:3000/](http://jiailing.com:3000/)

#### 3. 使用PM2在后台启动应用

+ Github仓库地址：[https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)
+ 官方文档：[https://pm2.io](https://pm2.io)
+ 在生产环境上安装：`npm install --global pm2`
+ 启动：`pm2 start 脚本路径`，即：`pm2 start --name realworld npm -- run start`，我的服务器上使用pm2起yarn貌似有点问题，改为npm就成功了
+ 访问：[http://jiailing.com:3000/](http://jiailing.com:3000/)

PM2常用命令

| 命令        | 说明         |
| ----------- | ------------ |
| pm2 list    | 查看应用列表 |
| pm2 start   | 启动应用     |
| pm2 stop    | 停止应用     |
| pm2 reload  | 重载应用     |
| pm2 restart | 重启应用     |
| pm2 delete  | 删除应用     |

#### 4. 自动部署

传统的部署方式

+ 更新
  + 本地构建
  + 发布
+ 更新
  + 本地构建
  + 发布
+ ......

现代化的部署方式（CI/CD）

![26](../images/26.png)

#### 5. 使用GitHub Actions 实现自动部署

CI/CD服务:

+ Jenkins
+ Gitlab CI
+ Github  Actions
+ Travis CI
+ Circle CI
+ ......

环境准备

+ Linux服务器

+ 把代码提交到GitHub远程仓库

  先在GitHub上建一个仓库，realworld-nuxtjs，将本地代码提交到仓库里。

  ```bash
  echo "# realworld-nuxtjs" >> README.md
  git init
  echo node_modules > .gitignore
  git add .
  git commit -m "first commit"
  git remote add origin git@github.com:2604150210/realworld-nuxtjs.git
  git push -u origin master
  ```

配置GitHub Access Token

+ 生成：[https://github.com/settings/tokens](https://github.com/settings/tokens)

  头像 -> Settings -> Developer settings -> Personal access tokens -> Generate new Token

  Token名称填写`Tocken`，`Select scopes`勾选repo，然后滚动到网页最下面点击提交按钮。生成了Token

  ![27](../images/27.png)

+ 配置到项目的Secrets中：[https://github.com/2604150210/realworld-nuxtjs/settings/secrets/new](https://github.com/2604150210/realworld-nuxtjs/settings/secrets/new)

  回到项目https://github.com/2604150210/realworld-nuxtjs下面

  Settings -> Secrets -> New Secrets

  ![28](../images/28.png)

配置GitHub Actions执行脚本

+ 在项目根目录创建`.github/workflows`目录

+ 下载`main.yml`到`workflows`目录中：[https://github.com/lipengzhou/realworld-nuxtjs/edit/master/.github/workflows/main.yml](https://github.com/lipengzhou/realworld-nuxtjs/edit/master/.github/workflows/main.yml)

+ 修改配置 main.yml

  + 下载下来main.yml是用npm来管理项目的，而我用的是yarn，所以对应部分改为yarn

  + 修改对应的服务器路径为：`/product/front/realworld-nuxtjs`

  + wget后面的下载地址改为自己的仓库地址：`https://github.com/2604150210/realworld-nuxtjs/releases/latest/download/release.tgz`

  + 在项目里`https://github.com/2604150210/realworld-nuxtjs/settings/secrets/new`配置HOST、USERNAME、PASSWORD、PORT

    ![29](../images/29.png)

  + 最终我的main.yml

    ```yml
    name: Publish And Deploy Demo
    on:
      push:
        tags:
          - 'v*'
    
    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
    
        # 下载源码
        - name: Checkout
          uses: actions/checkout@master
    
        # 打包构建
        - name: Build
          uses: actions/setup-node@master
        - run: yarn
        - run: yarn build
        - run: tar -zcvf release.tgz .nuxt static nuxt.config.js package.json yarn.lock pm2.config.json
    
        # 发布 Release
        - name: Create Release
          id: create_release
          uses: actions/create-release@master
          env:
            GITHUB_TOKEN: ${{ secrets.TOKEN }}
          with:
            tag_name: ${{ github.ref }}
            release_name: Release ${{ github.ref }}
            draft: false
            prerelease: false
    
        # 上传构建结果到 Release
        - name: Upload Release Asset
          id: upload-release-asset
          uses: actions/upload-release-asset@master
          env:
            GITHUB_TOKEN: ${{ secrets.TOKEN }}
          with:
            upload_url: ${{ steps.create_release.outputs.upload_url }}
            asset_path: ./release.tgz
            asset_name: release.tgz
            asset_content_type: application/x-tgz
    
        # 部署到服务器
        - name: Deploy
          uses: appleboy/ssh-action@master
          with:
            host: ${{ secrets.HOST }}
            username: ${{ secrets.USERNAME }}
            password: ${{ secrets.PASSWORD }}
            port: ${{ secrets.PORT }}
            script: |
              cd /product/front/realworld-nuxtjs
              wget https://github.com/2604150210/realworld-nuxtjs/releases/latest/download/release.tgz -O release.tgz
              tar zxvf release.tgz
              npm install --production
              pm2 reload pm2.config.json
    ```

+ 配置PM2配置文件 pm2.config.json  我的服务器上pm2启动yarn有点问题，所以pm2使用npm来起项目。

  ```json
  {
    "apps": [
      {
        "name": "RealWorld",
        "script": "npm",
        "args": "start"
      }
    ]
  }
  ```

+ 提交更新

  + `git add .`
  + `git commit -m"第一次发布部署-测试"`
  + `git push` （此时只是推送了提交记录，并不会触发自动化构建）
  + `git add .`
  + `git tag v0.1.0` （通过tag打版）
  + `git tag` （查看版本）
  + `git push origin v0.1.0` （把本地标签推送到远程仓库，会触发自动构建）

+ 查看自动部署动态

  ![image-20200809231445352](../images/30.png)

  很不幸跑了十几分钟，最终失败了，是在倒数第二步Deploy的地方失败的😭😭😭

  于是我又把main.yml里面的yarn换成了npm来操作，然后重新重复一轮上面的Git操作：add 、commit、 push、 tag、 push tag。

  我的代码地址：[realworld-nuxtjs](https://github.com/2604150210/realworld-nuxtjs)

  重新发布部署一次，这次成功了，耶✌️✌️✌️

  ![31](../images/31.png)

  项目主页的右侧还可以点进去看到发布日志以及版本和源代码

  ![33](../images/33.png)

+ 访问网站：[jiailing.com:3000](jiailing.com:3000)

  ![32](../images/32.png)

  

