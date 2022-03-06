### ECMAScript

::: tip
ECMAScript
:::

## 一、var 和 let

- JS 中作用域有：全局作用域、函数作用域。没有块作用域的概念。ECMAScript 6(简称 ES6)中新增了块级作用域
- 块作用域由 { } 包括,if 语句和 for 语句里面的{ }也属于块作用域

### 全局变量

在 if 或者 for 循环中声明的变量会变成全局变量

```js
for (var i = 0; i <= 5; i++) {
  console.log("hello");
}
console.log(i); //5
```

内层变量可能会覆盖外层变量

```js
var a = 1;
function fn() {
  console.log(a);
  if (false) {
    var a = 2;
  }
}
fn(); //undefined
```

#### let

- 允许块级作用域任意嵌套
- 外层作用域无法读取内层作用域的变量
- 内层作用域可以定义外层作用域的同名变量
- 函数本身的作用域在其所在的块级作用域之内

```js
"use strict";
function fn() {
  console.log("out");
}
(function () {
  if (false) {
    function fn() {
      console.log("in");
    }
  }
  fn();
})();
```

### var&let&const

- var 定义的变量没有块的概念,可以跨块访问,不能跨函数访问,有变量提升,可重复声明
- let 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问，无变量提升，不可以重复声明
- let 声明的变量只在块级作用域内有效,不存在变量提升，而是绑定在暂时性死区
  或者说 let 变量提升了，但是在 let 声明变量前不能使用该变量，这特性叫暂时性死区(temporal dead zone)
  如果有重复变量 let 会在编译阶段报错

- 暂时性死区

```js
// 不存在变量提升'use strict';
function func() {
  console.log(i);
  let i;
}
func(); // 报错
```

### ES5 声明变量只有两种方式：var 和 function

ES6 有 let、const、import、class 再加上 ES5 的 var、function 共有六种声明变量的方式
浏览器环境中顶层对象是 window，Node 中是 global 对象
ES5 中 顶层对象的属性等价于全局变量
ES6 中 var、function 声明的全局变量，依然是顶层对象的属性；let、const、class 声明的全局变量不属于顶层对象的属性

```js
"use strict";
var a = 1;
console.log(a); //1
{
  console.log(a); // f 1
  function a() {
    console.log(1);
  }
}
console.log(a); // f 1
```

## 二、解构

### 数组的解构

```js
// 数组的解构

const arr = [100, 200, 300];

// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]
// console.log(foo, bar, baz)

// const [foo, bar, baz] = arr
// console.log(foo, bar, baz)

// const [, , baz] = arr
// console.log(baz)

// const [foo, ...rest] = arr
// console.log(rest)

// const [foo, bar, baz, more] = arr
// console.log(more)

// const [foo, bar, baz = 123, more = 'default value'] = arr
// console.log(bar, more)

const path = "/foo/bar/baz";
// const tmp = path.split('/')
// const rootdir = tmp[1]

const [, rootdir] = path.split("/");
console.log(rootdir);
```

### 对象的解构

```js
// 对象的解构

const obj = { name: "zce", age: 18 };

// const { name } = obj
// console.log(name)

// const name = 'tom'
// const { name: objName } = obj
// console.log(objName)

// const name = 'tom'
// const { name: objName = 'jack' } = obj
// console.log(objName)
```

## 三 、 模板字符串

```js
// 模板字符串

// 反引号包裹
// const str = `hello es2015, this is a string`

// 允许换行
// const str = `hello es2015,

// this is a \`string\``

// console.log(str)

const name = "tom";
// 可以通过 ${} 插入表达式，表达式的执行结果将会输出到对应位置
const msg = `hey, ${name} --- ${1 + 2} ---- ${Math.random()}`;
console.log(msg);
```

## 四、 函数参数的默认值

```js
// 函数参数的默认值
// function foo (enable) {
//   // 短路运算很多情况下是不适合判断默认参数的，例如 0 '' false null
//   // enable = enable || true
//   enable = enable === undefined ? true : enable
//   console.log('foo invoked - enable: ')
//   console.log(enable)
// }

// 默认参数一定是在形参列表的最后
function foo(enable = true) {
  console.log("foo invoked - enable: ");
  console.log(enable);
}
foo(false);
```

## 五、 剩余参数

```js
// 剩余参数

// function foo () {
//   console.log(arguments)
// }

function foo(first, ...args) {
  console.log(args);
}

foo(1, 2, 3, 4);
```

## 六、 展开数组参数

```js
// 展开数组参数

const arr = ["foo", "bar", "baz"];

// console.log(
//   arr[0],
//   arr[1],
//   arr[2],
// )

// console.log.apply(console, arr)

console.log(...arr);
```

## 七、 箭头函数

```js
// 箭头函数

// function inc (number) {
//   return number + 1
// }

// 最简方式
// const inc = n => n + 1

// 完整参数列表，函数体多条语句，返回值仍需 return
const inc = (n, m) => {
  console.log("inc invoked");
  return n + 1;
};

console.log(inc(100));

const arr = [1, 2, 3, 4, 5, 6, 7];

// arr.filter(function (item) {
//   return item % 2
// })

// 常用场景，回调函数
arr.filter((i) => i % 2);
```

## 八、 展开数组参数

```js
// 展开数组参数

const arr = ["foo", "bar", "baz"];

// console.log(
//   arr[0],
//   arr[1],
//   arr[2],
// )

// console.log.apply(console, arr)

console.log(...arr);
```

## 九、 箭头函数与 this

- 箭头函数不会改变 this 指向
- 箭头函数没有 this 机制

```js
// 箭头函数与 this
// 箭头函数不会改变 this 指向

const person = {
  name: "tom",
  // sayHi: function () {
  //   console.log(`hi, my name is ${this.name}`)
  // }
  sayHi: () => {
    console.log(`hi, my name is ${this.name}`);
  },
  sayHiAsync: function () {
    // const _this = this
    // setTimeout(function () {
    //   console.log(_this.name)
    // }, 1000)

    console.log(this);
    setTimeout(() => {
      // console.log(this.name)
      console.log(this);
    }, 1000);
  },
};

person.sayHiAsync();
```

## 十、 对象字面量

```js
// 对象字面量

const bar = "345";

const obj = {
  foo: 123,
  // bar: bar
  // 属性名与变量名相同，可以省略 : bar
  bar,
  // method1: function () {
  //   console.log('method111')
  // }
  // 方法可以省略 : function
  method1() {
    console.log("method111");
    // 这种方法就是普通的函数，同样影响 this 指向。
    console.log(this);
  },
  // Math.random(): 123 // 不允许
  // 通过 [] 让表达式的结果作为属性名
  [bar]: 123,
};

// obj[Math.random()] = 123

console.log(obj);
obj.method1();
```

## 十一、 Object.assign 方法

```js
// Object.assign 方法

const source1 = {
  a: 123,
  b: 123,
};

const source2 = {
  b: 789,
  d: 789,
};

const target = {
  a: 456,
  c: 456,
};

const result = Object.assign(target, source1, source2);

console.log(target);
// console.log(result === target)

// 应用场景

function func(obj) {
  // obj.name = 'func obj'
  // console.log(obj)

  const funcObj = Object.assign({}, obj);
  funcObj.name = "func obj";
  console.log(funcObj);
}

const obj = { name: "global obj" };

func(obj);
console.log(obj);
```

## 十二、 Object.is

```js
// Object.is

console
  .log
  // 0 == false              // => true
  // 0 === false             // => false
  // +0 === -0               // => true
  // NaN === NaN             // => false
  // Object.is(+0, -0)       // => false
  // Object.is(NaN, NaN)     // => true
  ();
```

## 十二、 Object.is

```js
// Object.is

console
  .log
  // 0 == false              // => true
  // 0 === false             // => false
  // +0 === -0               // => true
  // NaN === NaN             // => false
  // Object.is(+0, -0)       // => false
  // Object.is(NaN, NaN)     // => true
  ();
```

## 十三、Proxy 对象

```js
// Proxy 对象

// const person = {
//   name: 'zce',
//   age: 20
// }

// const personProxy = new Proxy(person, {
//   // 监视属性读取
//   get (target, property) {
//     return property in target ? target[property] : 'default'
//     // console.log(target, property)
//     // return 100
//   },
//   // 监视属性设置
//   set (target, property, value) {
//     if (property === 'age') {
//       if (!Number.isInteger(value)) {
//         throw new TypeError(`${value} is not an int`)
//       }
//     }

//     target[property] = value
//     // console.log(target, property, value)
//   }
// })

// personProxy.age = 100

// personProxy.gender = true

// console.log(personProxy.name)
// console.log(personProxy.xxx)

// Proxy 对比 Object.defineProperty() ===============

// 优势1：Proxy 可以监视读写以外的操作 --------------------------

// const person = {
//   name: 'zce',
//   age: 20
// }

// const personProxy = new Proxy(person, {
//   deleteProperty (target, property) {
//     console.log('delete', property)
//     delete target[property]
//   }
// })

// delete personProxy.age
// console.log(person)

// 优势2：Proxy 可以很方便的监视数组操作 --------------------------

// const list = []

// const listProxy = new Proxy(list, {
//   set (target, property, value) {
//     console.log('set', property, value)
//     target[property] = value
//     return true // 表示设置成功
//   }
// })

// listProxy.push(100)
// listProxy.push(100)

// 优势3：Proxy 不需要侵入对象 --------------------------

// const person = {}

// Object.defineProperty(person, 'name', {
//   get () {
//     console.log('name 被访问')
//     return person._name
//   },
//   set (value) {
//     console.log('name 被设置')
//     person._name = value
//   }
// })
// Object.defineProperty(person, 'age', {
//   get () {
//     console.log('age 被访问')
//     return person._age
//   },
//   set (value) {
//     console.log('age 被设置')
//     person._age = value
//   }
// })

// person.name = 'jack'

// console.log(person.name)

// Proxy 方式更为合理
const person2 = {
  name: "zce",
  age: 20,
};

const personProxy = new Proxy(person2, {
  get(target, property) {
    console.log("get", property);
    return target[property];
  },
  set(target, property, value) {
    console.log("set", property, value);
    target[property] = value;
  },
});

personProxy.name = "jack";

console.log(personProxy.name);
```

## 十四、 Reflect 对象

```js
// Reflect 对象

// const obj = {
//   foo: '123',
//   bar: '456'
// }

// const proxy = new Proxy(obj, {
//   get (target, property) {
//     console.log('watch logic~')

//     return Reflect.get(target, property)
//   }
// })

// console.log(proxy.foo)

const obj = {
  name: "zce",
  age: 18,
};

// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

console.log(Reflect.has(obj, "name"));
console.log(Reflect.deleteProperty(obj, "age"));
console.log(Reflect.ownKeys(obj));
```

## 十五、 class 关键词

```js
// class 关键词

// function Person (name) {
//   this.name = name
// }

// Person.prototype.say = function () {
//   console.log(`hi, my name is ${this.name}`)
// }

class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`hi, my name is ${this.name}`);
  }
}

const p = new Person("tom");
p.say();
```

## 十六、 static 方法

```js
// static 方法

class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`hi, my name is ${this.name}`);
  }

  static create(name) {
    return new Person(name);
  }
}

const tom = Person.create("tom");
tom.say();
```

## 十七、 extends 继承

```js
// extends 继承

class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`hi, my name is ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, number) {
    super(name); // 父类构造函数
    this.number = number;
  }

  hello() {
    super.say(); // 调用父类成员
    console.log(`my school number is ${this.number}`);
  }
}

const s = new Student("jack", "100");
s.hello();
```

## 十八、 extends 继承

```js
// extends 继承

class Person {
  constructor(name) {
    this.name = name;
  }

  say() {
    console.log(`hi, my name is ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, number) {
    super(name); // 父类构造函数
    this.number = number;
  }

  hello() {
    super.say(); // 调用父类成员
    console.log(`my school number is ${this.number}`);
  }
}

const s = new Student("jack", "100");
s.hello();
```

## 十九、 Set 数据结构

```js
// Set 数据结构

const s = new Set();

s.add(1).add(2).add(3).add(4).add(2);

// console.log(s)

// s.forEach(i => console.log(i))

// for (let i of s) {
//   console.log(i)
// }

// console.log(s.size)

// console.log(s.has(100))

// console.log(s.delete(3))
// console.log(s)

// s.clear()
// console.log(s)

// 应用场景：数组去重

const arr = [1, 2, 1, 3, 4, 1];

// const result = Array.from(new Set(arr))
const result = [...new Set(arr)];

console.log(result);

// 弱引用版本 WeakSet
// 差异就是 Set 中会对所使用到的数据产生引用
// 即便这个数据在外面被消耗，但是由于 Set 引用了这个数据，所以依然不会回收
// 而 WeakSet 的特点就是不会产生引用，
// 一旦数据销毁，就可以被回收，所以不会产生内存泄漏问题。
```

## 二十、 Map 数据结构

```js
// Map 数据结构

// const obj = {}
// obj[true] = 'value'
// obj[123] = 'value'
// obj[{ a: 1 }] = 'value'

// console.log(Object.keys(obj))
// console.log(obj['[object Object]'])

const m = new Map();

const tom = { name: "tom" };

m.set(tom, 90);

console.log(m);

console.log(m.get(tom));

// m.has()
// m.delete()
// m.clear()

m.forEach((value, key) => {
  console.log(value, key);
});

// 弱引用版本 WeakMap
// 差异就是 Map 中会对所使用到的数据产生引用
// 即便这个数据在外面被消耗，但是由于 Map 引用了这个数据，所以依然不会回收
// 而 WeakMap 的特点就是不会产生引用，
// 一旦数据销毁，就可以被回收，所以不会产生内存泄漏问题。
```

## 二十一、 Symbol 数据类型

```js
// Symbol 数据类型

// 场景1：扩展对象，属性名冲突问题

// // shared.js ====================================

// const cache = {}

// // a.js =========================================

// cache['a_foo'] = Math.random()

// // b.js =========================================

// cache['b_foo'] = '123'

// console.log(cache)

// =========================================================

// const s = Symbol()
// console.log(s)
// console.log(typeof s)

// 两个 Symbol 永远不会相等

// console.log(
//   Symbol() === Symbol()
// )

// Symbol 描述文本

// console.log(Symbol('foo'))
// console.log(Symbol('bar'))
// console.log(Symbol('baz'))

// 使用 Symbol 为对象添加用不重复的键

// const obj = {}
// obj[Symbol()] = '123'
// obj[Symbol()] = '456'
// console.log(obj)

// 也可以在计算属性名中使用

// const obj = {
//   [Symbol()]: 123
// }
// console.log(obj)

// =========================================================

// 案例2：Symbol 模拟实现私有成员

// a.js ======================================

const name = Symbol();
const person = {
  [name]: "zce",
  say() {
    console.log(this[name]);
  },
};
// 只对外暴露 person

// b.js =======================================

// 由于无法创建出一样的 Symbol 值，
// 所以无法直接访问到 person 中的「私有」成员
// person[Symbol()]
person.say();
```

## 二十二、 Symbol 数据类型

```js
// Symbol 数据类型

// 场景1：扩展对象，属性名冲突问题

// // shared.js ====================================

// const cache = {}

// // a.js =========================================

// cache['a_foo'] = Math.random()

// // b.js =========================================

// cache['b_foo'] = '123'

// console.log(cache)

// =========================================================

// const s = Symbol()
// console.log(s)
// console.log(typeof s)

// 两个 Symbol 永远不会相等

// console.log(
//   Symbol() === Symbol()
// )

// Symbol 描述文本

// console.log(Symbol('foo'))
// console.log(Symbol('bar'))
// console.log(Symbol('baz'))

// 使用 Symbol 为对象添加用不重复的键

// const obj = {}
// obj[Symbol()] = '123'
// obj[Symbol()] = '456'
// console.log(obj)

// 也可以在计算属性名中使用

// const obj = {
//   [Symbol()]: 123
// }
// console.log(obj)

// =========================================================

// 案例2：Symbol 模拟实现私有成员

// a.js ======================================

const name = Symbol();
const person = {
  [name]: "zce",
  say() {
    console.log(this[name]);
  },
};
// 只对外暴露 person

// b.js =======================================

// 由于无法创建出一样的 Symbol 值，
// 所以无法直接访问到 person 中的「私有」成员
// person[Symbol()]
person.say();
```

## 二十三、 for...of 循环

```js
// for...of 循环

const arr = [100, 200, 300, 400];

// for (const item of arr) {
//   console.log(item)
// }

// for...of 循环可以替代 数组对象的 forEach 方法

// arr.forEach(item => {
//   console.log(item)
// })

// for (const item of arr) {
//   console.log(item)
//   if (item > 100) {
//     break
//   }
// }

// forEach 无法跳出循环，必须使用 some 或者 every 方法

// arr.forEach() // 不能跳出循环
// arr.some()
// arr.every()

// 遍历 Set 与遍历数组相同

// const s = new Set(['foo', 'bar'])

// for (const item of s) {
//   console.log(item)
// }

// 遍历 Map 可以配合数组结构语法，直接获取键值

// const m = new Map()
// m.set('foo', '123')
// m.set('bar', '345')

// for (const [key, value] of m) {
//   console.log(key, value)
// }

// 普通对象不能被直接 for...of 遍历

// const obj = { foo: 123, bar: 456 }

// for (const item of obj) {
//   console.log(item)
// }
```

## 二十四、 迭代器

#### 维护一个数据指针 返回一个带有 next 的方法

```js
const set = new Set(["foo", "bar", "baz"]);

const iterator = set[Symbol.iterator]();

// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

while (true) {
  const current = iterator.next();
  if (current.done) {
    break; // 迭代已经结束了，没必要继续了
  }
  console.log(current.value);
}
```

## 二十五、 Generator 函数 生成器

```js
// Generator 函数

// function * foo () {
//   console.log('zce')
//   return 100
// }

// const result = foo()
// console.log(result.next())

function* foo() {
  console.log("1111");
  yield 100;
  console.log("2222");
  yield 200;
  console.log("3333");
  yield 300;
}

const generator = foo();

console.log(generator.next()); // 第一次调用，函数体开始执行，遇到第一个 yield 暂停
console.log(generator.next()); // 第二次调用，从暂停位置继续，直到遇到下一个 yield 再次暂停
console.log(generator.next()); // 。。。
console.log(generator.next()); // 第四次调用，已经没有需要执行的内容了，所以直接得到 undefined
```
