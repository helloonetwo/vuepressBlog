## 发布/订阅模式

> 我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern）

- 发布/订阅模式
  - 订阅者
  - 发布者
  - 信号中心

```js
// 事件触发器
class EventEmitter {
  constructor() {
    // { 'click': [fn1, fn2], 'change': [fn] }
    this.subs = Object.create(null); // 不设置原型属性 提升性能
  }

  // 注册事件
  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(handler);
  }

  // 触发事件
  $emit(eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach((handler) => {
        handler();
      });
    }
  }
}

// 测试
let em = new EventEmitter();
em.$on("click", () => {
  console.log("click1");
});
em.$on("click", () => {
  console.log("click2");
});

em.$emit("click");
```

## 观察者模式

- 观察者（订阅者）- Watcher
  update()：当事件发生时，具体要做的事情
- 目标（发布者）- Dep
  - subs 数组：存储所有的观察者
  - addSub()：添加观察者
  - notify()：当事件发生，调用所有观察者的 updata() 方法
- 没有事件中心

```js
// 发布者-目标
class Dep {
  constructor() {
    // 记录所有的订阅者
    this.subs = [];
  }
  // 添加订阅者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 发布通知
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}
// 订阅者-观察者
class Watcher {
  update() {
    console.log("update");
  }
}

// 测试
let dep = new Dep();
let watcher = new Watcher();

dep.addSub(watcher);

dep.notify();
```

## 发布订阅/观察者模式 总结

观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间是存在依赖的。
发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在。
![](/images/ob1.png)
