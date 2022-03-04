### 函数式编程

::: tip
函数式编程
:::

## 一、什么是函数式编程

函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程编程、面向对象编程。
：

- 面向对象编程的思维方式：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和
多态来演示事物事件的联系
- 函数式编程的思维方式：把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程进行抽
象）
  - 程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数 x -> f(联系、映射) -> y，y=f(x)
  - 函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如：y = sin(x)，x和y的关系相同的 输入始终要得到相同的输出(纯函数)
  - 函数式编程用来描述数据(函数)之间的映射

```js
// 非函数式
let num1 = 2
let num2 = 3
let sum = num1 + num2
console.log(sum)
// 函数式
function add (n1, n2) {
return n1 + n2
}
let sum = add(2, 3)
console.log(sum)

```



## 二、高阶函数

 ### 使用高阶函数的意义:
  - 抽象可以帮我们屏蔽细节，只需要关注与我们的目标
  - 高阶函数是用来抽象通用的问题

  ```js
    // 面向过程的方式
    let array = [1, 2, 3, 4]
      for (let i = 0; i < array.length; i++) {
      console.log(array[i])
    }
    // 高阶高阶函数
    let array = [1, 2, 3, 4]
    forEach(array, item => {
     console.log(item)
    })
    let r = filter(array, item => {
      return item % 2 === 0
    })

```
- 函数作为参数
  ```Js
  // forEach
  function forEach (array, fn) {
  for (let i = 0; i < array.length; i++) {
  fn(array[i])
  }
  }
  // filter
  function filter (array, fn) {
  let results = []
  for (let i = 0; i < array.length; i++) {
  if (fn(array[i])) {
    results.push(array[i])
    }
    }
  return results
  }
  ```
  
- 函数作为返回值

  ```js
    function makeFn () {
        let msg = 'Hello function'
        return function () {
        console.log(msg)
        }
    }
    const fn = makeFn()
    fn()
  ```


## 三 、闭包

  - 闭包 (Closure)：函数和其周围的状态(词法环境)的引用捆绑在一起形成闭
  - 闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，但是
堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员


  ```js
    // 函数作为返回值
    function makeFn () {
      let msg = 'Hello function'
      return function () {
      console.log(msg)
    }
    }
    const fn = makeFn()
    fn()

```
  
- 闭包案例


  ```js
   // 第一个数是基本工资，第二个数是绩效工资
    function makeSalary (x) {
      return function (y) {
       return x + y
      }
    }
    let salaryLevel1 = makeSalary(1500)
    let salaryLevel2 = makeSalary(2500)
    console.log(salaryLevel1(2000))
    console.log(salaryLevel1(3000))

  ```

## 四、纯函数

相同的输入永远会得到相同的输出，而且没有任何可观察的副作用

 - 数组的 slice 和 splice 分别是：纯函数和不纯的函数
 - 可缓存 
    - slice 返回数组中的指定部分，不会改变原数组
    - splice 对数组进行操作返回该数组，会改变原数组



```js
 
let numbers = [1, 2, 3, 4, 5]
// 纯函数
numbers.slice(0, 3)
// => [1, 2, 3]
numbers.slice(0, 3)
// => [1, 2, 3]
numbers.slice(0, 3)
// => [1, 2, 3]
// 不纯的函数
numbers.splice(0, 3)
// => [1, 2, 3]
numbers.splice(0, 3)
// => [4, 5]
numbers.splice(0, 3)
// => []
```


## 五 、柯里化

 - 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
 - 这是一种对函数参数的'缓存'
 - 让函数变的更灵活，让函数的粒度更小
 - 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能
- 当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）, 然后返回一个新的函数接收剩余的参数，返回结果

```js
  function checkAge (age) {
    let min = 18
    return age >= min
  }
  // 普通纯函数
  function checkAge (min, age) {
    return age >= min
  }
  checkAge(18, 24)
  checkAge(18, 20)
  checkAge(20, 30)
  // 柯里化
  function checkAge (min) {
    return function (age) {
      return age >= min
    }
  }
  // ES6 写法 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能
  let checkAge = min => (age => age >= min)
  let checkAge18 = checkAge(18)
  let checkAge20 = checkAge(20)
  checkAge18(24)
  checkAge18(20)

```
### 手写 lodash 中的柯里化函数

 ```js
 function getSum (a, b, c) {
  return a + b + c
}

const curried = curry(getSum)

console.log(curried(1, 2, 3))
console.log(curried(1)(2, 3))
console.log(curried(1, 2)(3))


function curry (func) {
  return function curriedFn(...args) {
    // 判断实参和形参的个数
    if (args.length < func.length) {
      return function () {
        console.log(Array.from(arguments), ...args)
        return curriedFn(...args.concat(Array.from(arguments)))
      }
    }
    console.log(...args, '...args')
    return func(...args)
  }
}
```



## 六、函数组合

下面这张图表示程序中使用函数处理数据的过程，给 fn 函数输入参数 a，返回结果 b。可以想想 a 数据
通过一个管道得到了 b 数据。

![](/images/compose1.png)

当 fn 函数比较复杂的时候，我们可以把函数 fn 拆分成多个小函数，此时多了中间运算过程产生的 m 和
n。
下面这张图中可以想象成把 fn 这个管道拆分成了3个管道 f1, f2, f3，数据 a 通过管道 f3 得到结果 m，m
再通过管道 f2 得到结果 n，n 通过管道 f1 得到最终结果 b
![](/images/compose2.png)

``` js
 fn = compose(f1, f2, f3)
 b = fn(a)
```


- 函数组合 (compose)：如果一个函数要经过多个函数W处理才能得到最终值，这个时候可以把中间
过程的函数合并成一个函数
 - 函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终
结果
 - **函数组合默认是从右到左执行** 

 ```js
  // 组合函数
  function compose (f, g) {
    return function (x) {
     return f(g(x))
    }
  }
  function first (arr) {
     return arr[0]
  }
  function reverse (arr) {
    return arr.reverse()
  }
  // 从右到左运行
  let last = compose(first, reverse)
  console.log(last([1, 2, 3, 4]))
```
### 模拟实现 lodash 的 flowRight 方法

 ```js
  // 多函数组合
  function compose (...fns) {
    return function (value) {
      return fns.reverse().reduce(function (acc, fn) {
        return fn(acc)
      }, value)
    }
  }
  // ES6
  const compose = (...fns) => value => fns.reverse().reduce((acc, fn) =>
  fn(acc), value)
```

## 七、函子
### 什么是么是 Functor
- 容器：包含值和值的变形关系(这个变形关系就是函数)
- 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运
行一个函数对值进行处理(变形关系)

### Functor 函子

```js
// 一个容器，包裹一个值
class Container {
  // of 静态方法，可以省略 new 关键字创建对象
  static of (value) {
    return new Container(value)
  }
  constructor (value) {
    this._value = value
  }
  // map 方法，传入变形关系，将容器里的每一个值映射到另一个容器
  map (fn) {
    return Container.of(fn(this._value))
  }
}
// 测试
Container.of(3)
.map(x => x + 2)
.map(x => x * x)

```
总结
- 函数式编程的运算不直接操作值，而是由函子完成
- 函子就是一个实现了 map 契约的对象
- 我们可以把函子想象成一个盒子，这个盒子里封装了一个值
想要处理盒子中的值，我们需要给盒子的 map 方法传递一个处理值的函数（纯函数），由这
个函数来对值进行处理
最终 map 方法返回一个包含新值的盒子（函子）


### MayBe 函子
 - 我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理
 - MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）
 - MayBe 函子 可以处理异常 我们很难确认是哪一步产生的空值问题

```js
// MayBe 函子
class MayBe {
  static of (value) {
    return new MayBe(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  isNothing () {
    return this._value === null || this._value === undefined
  }
}


// let r = MayBe.of('Hello World')
//           .map(x => x.toUpperCase())
// console.log(r)


// let r = MayBe.of(null)
//           .map(x => x.toUpperCase())
// console.log(r)


let r = MayBe.of('hello world')
          .map(x => x.toUpperCase())
          .map(x => null)
          .map(x => x.split(' '))
console.log(r)
```


#### 我们很难确认是哪一步产生的空值问题
```js
let r = MayBe.of('hello world')
          .map(x => x.toUpperCase())
          .map(x => null)
          .map(x => x.split(' '))
console.log(r)
```

### Either 函子
- Either 两者中的任何一个，类似于 if...else...的处理
- 异常会让函数变的不纯，Either 函子可以用来做异常处理
- Either 用来处理异常


```js
// Either 函子 2. 异常会让函数变的不纯，Either 函子可以用来做异常处理
class Left {
  static of (value) {
    return new Left(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return this
  }
}

class Right {
  static of (value) {
    return new Right(value)
  }

  constructor (value) {
    this._value = value
  }

  map (fn) {
    return Right.of(fn(this._value))
  }
}

// let r1 = Right.of(12).map(x => x + 2)
// let r2 = Left.of(12).map(x => x + 2)

// console.log(r1)
// console.log(r2)


function parseJSON (str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (e) {
    return Left.of({ error: e.message })
  }
}

// let r = parseJSON('{ name: zs }')
// console.log(r)
//3. Either 用来处理异常
let r = parseJSON('{ "name": "zs" }')
          .map(x => x.name.toUpperCase())
console.log(r)
```


###  IO 函子
 - IO 函子中的 _value 是一个函数，这里是把函数作为值来处理
 - IO 函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作(惰性执行)，包装当前的操
 - 作纯
把不纯的操作交给调用者来处理

```js
// IO 函子
const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }

  constructor (fn) {
    this._value = fn
  }

  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

// 调用
let r = IO.of(process).map(p => p.execPath)
// console.log(r)
console.log(r._value())
```


### Task

 #### Task 异步执行
  - 异步任务的实现过于复杂，我们使用 folktale 中的 Task 来演示
  - folktale 一个标准的函数式编程库
    - 和 lodash、ramda 不同的是，他没有提供很多功能函数
    - 只提供了一些函数式处理的操作，例如：compose、curry 等，一些函子 Task、Either、
  MayBe 等

  ```js
  const { compose, curry } = require('folktale/core/lambda')
  const { toUpper, first } = require('lodash/fp')
  // 第一个参数是传入函数的参数个数
  let f = curry(2, function (x, y) {
  console.log(x + y)
  })
  f(3, 4)
  f(3)(4)
  // 函数组合
  let f = compose(toUpper, first)
  f(['one', 'two'])

  ```



### Pointed 函子
Pointed 函子是实现了 of 静态方法的函子
of 方法是为了避免使用 new 来创建对象，更深层的含义是 of 方法用来把值放到上下文
Context（把值放到容器中，使用 map 来处理值）

### Monad 函子
Monad 函子是可以变扁的 Pointed 函子，IO(IO(x))
一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad

```js
// IO Monad
const fs = require('fs')
const fp = require('lodash/fp')

class IO {
  static of (value) {
    return new IO(function () {
      return value
    })
  }

  constructor (fn) {
    this._value = fn
  }

  map (fn) {
    return new IO(fp.flowRight(fn, this._value))
  }

  join () {
    return this._value()
  }

  flatMap (fn) {
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (x) {
  return new IO(function () {
    console.log(x)
    return x
  })
}

let r = readFile('package.json')
          // .map(x => x.toUpperCase())
          .map(fp.toUpper)
          .flatMap(print)
          .join()

console.log(r)
```
张小伟 | Front End Engineer | 2022.3.4
