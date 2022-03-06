### 手写 call 原理

## 手写 call/apply/bind

- call/apply/bind 可以改变函数中 this 的指向
- 第一个参数是改变 this 指向(非严格模式下，传递 null/undefined 指向也是 window)
- call 参数是依次传递，apply 是以数组的方式传递

```js
Function.prototype.mycall = function (context, ...rest) {
  context.fun = this;
  const r = context.fun(...rest);
  delete context.fun;
  return r;
};

function fn(a, b, c) {
  return a + b + c;
}
let result = fn.mycall({ name: "abc" }, 2, 4, 9);
console.log(result);
```

```js
!(function (proto) {
  function getContext(context) {
    context = context || window;
    var type = typeof context;
    if (["number", "string", "boolean", "null"].includes(type)) {
      context = new context.constructor(context);
    }
    return context;
  }
  function call(context, ...args) {
    context = getContext(context);
    const fn = Symbol("fn"); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    context[fn] = this;
    let result = context[fn](...args);
    delete context.fn;
    return result;
  }
  function apply(context, args) {
    context = getContext(context);
    const fn = Symbol("fn"); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    context[fn] = this; // this指向调用call的对象,即我们要改变this指向的函数
    let result = context[fn](...args); // 执行函数
    delete context[fn]; // 删除我们声明的fn属性
    return result; // 返回函数执行结果
  }

  function bind(context, ...bindArgs) {
    return (...args) => this.call(context, ...bindArgs, ...args);
  }
  proto.call = call;
  proto.apply = apply;
  proto.bind = bind;
})(Function.prototype);

function foo() {
  console.log(this.name);
}

// 测试
const obj = {
  name: "写代码像蔡徐抻",
};
// 测试
const obj1 = {
  name: "打球像蔡徐抻",
};
obj.foo = foo; // 变更foo的调用者
// obj.foo()       // '写代码像蔡徐抻'
//测试
foo.call(obj1); // 输出'打球像蔡徐抻'
```
