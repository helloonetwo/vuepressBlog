### javascript 性能优化

::: tip
javascript 性能优化
:::

## 一、javascript 的垃圾

> JavaScript 中内存管理的主要概念是可达性。

简单地说，“可达性” 值就是那些以某种方式可访问或可用的值，它们被保证存储在内存中。

1. 有一组基本的固有可达值，由于显而易见的原因无法删除。例如:

   本地函数的局部变量和参数
   当前嵌套调用链上的其他函数的变量和参数
   全局变量
   还有一些其他的，内部的
   这些值称为根。

2. 如果引用或引用链可以从根访问任何其他值，则认为该值是可访问的。

   例如，如果局部变量中有对象，并且该对象具有引用另一个对象的属性，则该对象被视为可达性， 它引用的那些也是可以访问的，详细的例子如下。

   JavaScript 引擎中有一个后台进程称为垃圾回收器，它监视所有对象，并删除那些不可访问的对象。

   一个简单的例子
   下面是最简单的例子:

   ```js
   // user 具有对象的引用
   let user = {
     name: "John",
   };
   ```

   如果 user 的值被覆盖，则引用丢失:

   user = null;

   现在 John 变成不可达的状态，没有办法访问它，没有对它的引用。垃圾回收器将丢弃 John 数据并释放内存。

## 二、Gc 算法

### Gc 里的垃圾是什么

- 程序中不再需要使用的对象

```js
function fn() {
  name = "lg";
  console.log(`${name} is a coder`);
}

fn();
```

- 程序中不能再被访问到的对象

```js
function fn() {
  const name = "lg";
  console.log(`${name} is a coder`);
}
fn();
```

#### Gc 算法是什么

- Gc 是一种机制，垃圾回收器具体完成的工作
- 工作的内容就是查找垃圾释放空间， 回收空间
- 算法就是工作时查找和回收所遵循的规则

## 三 、 常用的 Gc 算法

- 引用计数:

  - 当一个对象有一个指针指向它时,那么这个对象的引用就+1,当一个对象的引用为 0 时,这个对象就可以被销毁掉
  - 这个算法有一个很大的弊端就是会产生循环引用

> 算法思想：设置引用数，判断当前引用数是否为 0, 引用关系改变时修改引用数，引用数为 0 时回收

```js
//循环引用
var obj1 = {
  friend: obj2,
};
var obj2 = {
  friend: obj1,
};
```

    优点：

    发现垃圾时立即回收
    能够最大限度的减少程序暂停

    缺点：

    无法回收循环引用的对象

- 标记清除:

  - 这个算法是设置一个根对象(root object),垃圾回收器会定期从这个根开始,找所有从根开始有引用到的对象,对于那些没有引用到的对象,就认为是不可用的对象
  - 这个算法可以很好的解决循环引用的问题

> 实现原理： 分为标记和清除两个部分，遍历所有对象找标记活动对象，遍历所有对象清除没有标记对象，回收对应空间

![](/images/biaoji.png)

    优点：

    相对以上，能够解决循环调用问题

    缺点：

    空间碎片化
    不会立即回收

- 标记整理

  > 核心思想：标记整理可以看作是标记清除的增强版，标记阶段和上面一致，只是在清理阶段会先执行整理，移动对象位置再清除未标记的对象,

  ```
  优点： 相对以上，能够解决空间碎片化的问题 不会立即回收垃圾对象
  ```

  下面用图片来更好的 解释一下标记整理回收阶段的过程。

  回收之前我们内存摆放位置如下，有着很多活动对象、非活动对象和空闲的空间，当他去执行当前标记操作的时候，会把所有的活动对象进行标记，紧接着会去进行一个整理的操作。

  ![](/images/js1.jpg)

  整理会把我们的活动对象进行移动，在地址上变成连续的位置，紧接着将当前活动对象右侧的范围进行回收。

  
  ![](/images/js2.jpg)

  回收之后大概长下面的样子，现在回收到的空间基本上都是连续的，后续可以最大化利用内存释放出来的空间。它会配合着标记清除，在我们的V8引擎当中配合实现频繁的GC操作。
  
  ![](/images/js3.jpg)

  
## 四、 V8 引擎的垃圾回收

认识V8
 - V8 是一款主流的 JavaScript 执行引擎
 - V8 采用即时编译，速度很快
 - V8 内存设限，64位操作系统最大1.5G，32位操作系统最大800M

V8 垃圾回收策略
 - 采用分代回收的思想
 - 内存分为新生代、老生代
 - 针对不同对象采用不同算法

![](/images/js4.png)

V8 中常用的 GC(Garbage Collection) 算法

> 分代回收、空间复制、标记清除、标记整理、标记增量

 V8 内存分配

 ![](/images/js5.png)
 > 如上图所示，V8内存空间一分为二，左侧白色背景部分用于存放新生代对象  新生代指的是存活时间较短的对象

 - V8 内存空间一分为二
 - 小空间用于存储新生代对象（64位操作系统：32M，32位操作系统：16M）
 - 新生代指的是存活时间较短的对象

 新生代对象回收实现
 - 回收过程采用复制算法 + 标记整理
 - 新生代内存区分为两个等大小空间 From 和 To
 - 使用空间为 From，空闲空间为 To
 - 活动对象存储在 From 空间，标记整理后将活动对象拷贝至 To
 - From 与 To 交换空间之后完成内存释放


 回收细节说明

 - 拷贝过程中可能出现晋升
 - 晋升就是将新生代对象移动至老生代
 - 一轮 GC 还存活的新生代需要晋升
 - To 空间的使用率超过 25%，也要将活动对象移动至老生代

  老生代对象说明
  - 老生代对象存放在右侧的老生代区域
  - 64位操作系统 1.4G，32位操作系统 700M
  - 老生代对象就是指存活时间较长的对象
  
  老生代对象回收实现
  - 主要采用标记清除、标记整理、增量标记算法
  - 首先使用标记清除完成垃圾空间的回收
  - 采用标记整理进行空间优化
  - 采用增量标记进行效率优化


  细节对比

  - 新生代区域垃圾回收使用空间换时间，会浪费一部分空间
  - 老生代区域垃圾回收不适合复制算法(因为老生代区域比较大，一分为二浪费比较大，复制算法比较浪费时间)
  
  增量标记优化垃圾回收 程序执行与垃圾回收交替执行

   ![](/images/js6.png)

  V8 总结
  
  - V8 是一款主流的 JavaScript 执行引擎
  - V8 内存设置上限（从web应用、用户体验考虑）
  - V8 采用基于分代回收思想实现垃圾回收
  - V8 内存分为新生代和老生代
  - V8 垃圾回收常见的 GC 算法

## 五、 Performance 工具
- 为什么使用 Performance
    - GC 的目的是为了实现内存空间的良性循环
    - 良性循环的基石是合理使用
    - 时刻关注才能确定是否合理
    - Performance 提供多种监控方式
- Performance 使用步骤
    - 打开浏览器输入目标网址
    - 进入开发人员工具面板，选择性能
    - 开启录制功能，访问具体界面
    - 执行用户行为，一段时间后停止录制
    - 分析界面中记录的内存信息
  
- 内存问题的外在表现
    - 页面出现延迟加载或经常性暂停
    - 页面持续性出现糟糕的性能
    - 页面的性能随时间延长越来越差
  
- 界定内存问题的标准
    - 内存泄漏：内存使用持续升高
    - 内存膨胀：在多数设备上都存在性能问题
    - 频繁垃圾回收：通过内存变化图进行分析
- 监控内存的几种方式
    - 浏览器任务管理器
    - Timeline 时序图记录
    - 堆快照查找分离 DOM
    - 判断是否存在频繁的垃圾回收
- 如何确定存在频繁的垃圾回收？
    - Timeline 中频繁的上升下降
    - 任务管理器中数据频繁的增加减小

## 六、 堆栈执行

### 堆栈的一些概念

 - JS执行环境（V8引擎等）
 - 执行环境栈（ECStack，execution context stack），浏览器渲染界面时在内存中开辟的一块空间
 - 执行上下文，管理不用的区域，每个执行上下文中的代码需要执行时，进栈执行，栈底永远都有一个全局的执行上下文EC(G)
 - VO(G)，全局变量对象
 - 无论是栈内存还是引用类型数据的堆内存，都是属于计算机内存
### 堆栈对基本数据类型处理

 - 基本数据类型是按值进行操作
 - 基本数据类型值是存放在栈区的，不会分配16进制的内存地址，也没有开辟内存空间
```js
// 1、创建一个值100，由于100是一个基本数据类型，所以会直接存放在栈区
// 2、声明一个变量x，存放在VO(G)
// 3、建立变量与值之间的联系 x = 100
var x = 100

// 1、声明一个变量y，存放在VO(G)
// 2、建立变量与值之间的联系 y = x = 100
var y = x

// 1、创建一个值200，由于200是一个基本数据类型，所以会直接存放在栈区
// 2、断掉y和100的联系
// 2、建立变量与值之间的联系 y = 200
y = 200
console.log(x)

```

### 堆栈对引用类型数据处理
```js
// 1、声明一个变量obj5，存放在VO(G)
// 2、创建一个堆内存heap 0x000，存放对象键值对形式数据，x: 100
// 3、栈区的obj5指向堆内存地址0x000
var obj5 = { x: 100 }

// 栈区的obj6指向obj5同样的堆内存地址0x000
var obj6 = obj5

// 1、obj5.y由于优先运算，在0x000中创建一个y，这个y将来会指向接下来将会创建的内存地址
// 2、obj5 = { x: 200 }，此时obj5创建并指向一个堆内存heap 0x001，存放对象键值对形式数据，x: 200
// 3、此时heap 0x000内存内新增了y指向0x001内存内数据{ x: 200 }
obj5.y = obj5 = { x: 200 }

// 此时obj5内只有x，没有y，输出undefined
console.log(obj5.y)
// 此时obj6地址还是0x000，输出{ x: 200 }
console.log(obj6)

```


### 堆栈对函数类型处理

#### 函数的创建

- 可以将函数名称看作是变量，存放在VO中，同时它的值就是当前函数对应的内存地址
- 函数本身也是一个对象，创建时会有一个内存地址，空间内存放的就是字符串形式函数体代码


#### 函数执行时会形成一个全新私有上下文，它里面有一个AO（全局执行环境里面叫VO），用于管理这个上下文当中的变量，具体步骤如下

 - 确定作用域链<当前执行上下文，上级作用域所在的执行上下文>
 - 确定this
 - 初始化arguments（对象）
 - 形参赋值：它就相当于是变量声明，然后将声明的变量放置于AO
 - 变量提升
 - 代码执行
 ```js
 // 1、声明一个变量arr，存放在VO(G)
// 2、创建一个堆内存heap 0x001，存放对象键值对形式数据，0: zce，1: tom
// 3、栈区的arr指向堆内存地址0x001
var arr = ['zce', 'tom']

// 1、创建函数和创建变量类型，函数名此时就可以看做是一个变量
// 2、单独开辟一个堆内存用于存放函数体（字符串形式代码），当前内存地址也会有一个16进制数值地址0x000（函数创建优先）
// 3、创建函数的时候，它的作用域[[scope]]就已经确定了（创建函数时所在的执行上下文），此例为EC(G)全局执行上下文
// 4、创建函数之后会将它的内存地址存放在栈区与对应的函数名进行关联
function foo (obj) {
  // 函数参数obj指向0x001的地址，修改0x001地址上0: zoe
  obj[0] = 'zoe'
  // 重新创建一个堆地址0x002，0: javascript，obj指向0x002
  obj = ['javascript']
  // 0x002地址下新增1: typescript
  obj[1] = 'typescript'
  // 打印0x002地址数据 ['javascript', 'typescript']
  console.log(obj)
}

// 函数执行，目的就是为了将函数对应的堆内存里的字符串形式代码进行执行。代码在执行的时候肯定需要一个环境，此时就意味着函数在执行的时候会生成一个新的执行上下文EC(foo)来管理函数体当中的代码
// 执行函数相当于找到foo的内存地址0x000，然后吧参数的内存地址0x001传入，执行0x000(0x001)
foo(arr) // 执行完成后，没有其他引用关系，出栈

// 打印0x001地址数据 [‘zoe’, 'tom']
console.log(arr)

 ```


### 堆栈对闭包类型处理

- 闭包是一种机制，通过私有上下文来保护当中变量的机制
- 我们也可以认为当我们创建的某一个执行上下文不被释放的时候就形成来闭包
- 保护：使当前上下文中的数据和其他上下文中的数据互不干扰，保存数据：当前上下文的数据（堆内存）被当前上下文以外的上下文中的变量所引用，这个数据就保存下来
- 函数调用形成来一个全新的私有上下文，在函数调用之后当前上下文不被释放或临时不被释放就是闭包

```js
// 全局执行上下文中的VO中声明a = 1
var a = 1

// 为函数foo创立一个堆地址0x000，全局执行上下文中的VO中声明foo指向0x000，确定作用域为EC(G)
// foo函数执行时，会创立一个EC(FOO)的执行上下文，并在其中的AO中声明变量b=2
function foo () {
  var b = 2
  // 函数执行完时返回了一个函数。此时创建一个新的存放此匿名函数的堆地址0x001
  return function (c) {
    console.log(c + b++)
  }
}

// 当前ec(foo)执行上下文当中引用的一个堆地址0x001被ec(g)中的变量f引用，因此foo()调用时所创建的执行上下文不鞥被释放，此时就形成了闭包
// foo函数执行完毕返回了0x001地址的函数，所以f指向0x001
var f = foo()

// f函数执行时创建新的执行上下文ec(f)，并在其AO中声明参数c=5，在上级作用域中找到b，打印5+2=7，b自增为3
f(5)

// 函数每调用一次会产生一个全新的上下文，此时函数执行产生新的执行上下文ec(f)，并在其AO中声明参数c=10，在上级作用域中找到b，打印10+3=13，b自增为4
f(10)

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
