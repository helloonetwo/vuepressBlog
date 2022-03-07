### Typescript

::: tip
Typescript
:::

## 1、环境配置和搭建

### 一.什么是 Typescript

![](/images/typescript.jpg)

TypeScript 是 Javascript 的超集，遵循最新的 ES5/ES6 规范。Typescript 扩展了 Javascript 语法。

Typescript 更像后端 JAVA,让 JS 可以开发大型企业应用
TS 提供的类型系统可以帮助我们在写代码时提供丰富的语法提示
在编写代码时会对代码进行类型检查从而避免很多线上错误
TypeScript 不会取代 JS, 尤雨溪： 我认为将类型添加到 JS 本身是一个漫长的过程 。让委员会设计一个类型系统是（根据 TC39 的经历来判断）不切实际的 。

### 二.环境配置

### 1.全局编译 TS 文件

全局安装 typescript 对 TS 进行编译

```js
npm install typescript -g
tsc --init # 生成tsconfig.json
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```

### 2.配置 webpack 环境

安装依赖

```js
npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```

初始化 TS 配置文件

```js
npx tsc --init
```

webpack 配置操作

// rollup.config.js

```js
import ts from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import serve from "rollup-plugin-serve";
import path from "path";
export default {
  input: "src/index.ts",
  output: {
    format: "iife",
    file: path.resolve("dist/bundle.js"),
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts"],
    }),
    ts({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    serve({
      open: true,
      openPage: "/public/index.html",
      port: 3000,
      contentBase: "",
    }),
  ],
};
```

package.json 配置

```js
"scripts": {
      "dev": "rollup -c -w"
}
```

我们可以通过 npm run start 启动服务来使用 typescript 啦~

## 2.基础类型

TS 中冒号后面的都为类型标识

### 一.布尔、数字、字符串类型

```
let bool:boolean = true;
let num:number = 10;
let str:string = 'hello zf';
```

### 二.元组类型

限制长度个数、类型一一对应

```js
let tuple: [string, number, boolean] = ["zf", 10, true];
// 像元组中增加数据，只能增加元组中存放的类型
tuple.push("回龙观");
```

### 三.数组

声明数组中元素数据类型

```js
let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2", "3"];
let arr3: (number | string)[] = [1, "2", 3];
let arr4: Array<number | string> = [1, "2", 3]; // 泛型方式来声明
```

#### 四.枚举类型

```js
enum USER_ROLE {
    USER, // 默认从0开始
    ADMIN,
    MANAGER
}
```

// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}
可以枚举，也可以反举

```js
// 编译后的结果
(function (USER_ROLE) {
  USER_ROLE[(USER_ROLE["USER"] = 0)] = "USER";
  USER_ROLE[(USER_ROLE["ADMIN"] = 1)] = "ADMIN";
  USER_ROLE[(USER_ROLE["MANAGER"] = 2)] = "MANAGER";
})(USER_ROLE || (USER_ROLE = {}));
```

异构枚举

```js
enum USER_ROLE {
    USER = 'user',
    ADMIN = 1,
    MANAGER,
}
```

常量枚举

```js
const enum USER_ROLE {
    USER,
    ADMIN,
    MANAGER,
}
console.log(USER_ROLE.USER)// console.log(0 /* USER */);
```

### 五.any 类型

不进行类型检测

```js
let arr: any = ["jiagou", true, { name: "zf" }];
```

### 六.null 和 undefined

任何类型的子类型,如果 strictNullChecks 的值为 true，则不能把 null 和 undefined 付给其他类型

```js
let name: number | boolean;
name = null;
```

### 七.void 类型

只能接受 null，undefined。一般用于函数的返回值
严格模式下不能将 null 赋予给 void

```js
let a: void;
a = undefined;
```

### 八.never 类型

任何类型的子类型,never 代表不会出现的值。不能把其他类型赋值给 never

```js
function error(message: string): never {
  throw new Error("err");
}
function loop(): never {
  while (true) {}
}
function fn(x: number | string) {
  if (typeof x == "number") {
  } else if (typeof x === "string") {
  } else {
    console.log(x); // never
  }
}
```

### 九.Symbol 类型

Symbol 表示独一无二

```js
const s1 = Symbol("key");
const s2 = Symbol("key");
console.log(s1 == s2); // false
```

### 十.BigInt 类型

```js
const num1 = Number.MAX_SAFE_INTEGER + 1;
const num2 = Number.MAX_SAFE_INTEGER + 2;
console.log(num1 == num2); // true

let max: bigint = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max + BigInt(1) === max + BigInt(2));
```

number 类型和 bigInt 类型是不兼容的

### 十一.object 对象类型

object 表示非原始类型

```js
let create = (obj: object): void => {};
create({});
create([]);
create(function () {});
```

## 3.类型推导

### 一.类型推导

声明变量没有赋予值时默认变量是 any 类型

```js
let name; // 类型为 any
name = "zhufeng";
name = 10;
```

声明变量赋值时则以赋值类型为准

```js
let name = "zhufeng"; // name 被推导为字符串类型
name = 10;
```

### 二.包装对象

我们在使用基本数据类型时，调用基本数据类型上的方法，默认会将原始数据类型包装成对象类型

```js
let bool1: boolean = true;
let bool2: boolean = Boolean(1);
let bool3: Boolean = new Boolean(2);
```

boolean 是基本数据类型 , Boolean 是他的封装类

### 三.联合类型

在使用联合类型时，没有赋值只能访问联合类型中共有的方法和属性

```js
let name:string | number // 联合类型
console.log(name!.toString()); // 公共方法
name = 10;
console.log(name!.toFixed(2)); // number 方法
name = 'zf';
console.log(name!.toLowerCase()); // 字符串方法
```

这里的!表示此值非空

```js
let ele: HTMLElement | null = document.getElementById('#app');
ele!.style.color = 'red'; // 断定 ele 元素一定有值
```

### 四.类型断言

```js
let name: string | number;
(name! as number).toFixed(2); // 强制
((<number>name!).toFixed(2));
```

尽量使用第一种类型断言因为在 react 中第二种方式会被认为是 jsx 语法

双重断言

```js
let name: string | boolean;
((name! as any) as string);
```

尽量不要使用双重断言，会破坏原有类型关系，断言为 any 是因为 any 类型可以被赋值给其他类型

### 五.字面量类型

```js
type Direction = "Up" | "Down" | "Left" | "Right";
let direction: Direction = "Down";
```

可以用字面量当做类型，同时也表明只能采用这几个值（限定值）。类似枚举。

## 4. 函数类型

### 一.函数的两种声明方式

通过 function 关键字来进行声明

```js
function sum(a: string, b: string): string {
  return a + b;
}
sum("a", "b");
```

可以用来限制函数的参数和返回值类型

通过表达式方式声明

```js
type Sum = (a1: string, b1: string) => string;
let sum: Sum = (a: string, b: string) => {
  return a + b;
};
```

### 二.可选参数

```js
let sum = (a: string, b?: string):string => {
  return a + b;
};
sum('a'); // 可选参数必须在其他参数的最后面 #三.默认参数
let sum = (a: string, b: string = 'b'): string => {
  return a + b;
};
sum('a'); // 默认参数必须在其他参数的最后面 #四.剩余参数
const sum = (...args: string[]): string => {
   return args.reduce((memo, current) => memo += current, '')
}
sum('a', 'b', 'c', 'd') #五.函数的重载
function toArray(value: number): number[]
function toArray(value: string): string[]
function toArray(value: number | string) {
if (typeof value == 'string') {
  return value.split('');
} else {
  return value.toString().split('').map(item => Number(item));
}
}
toArray(123); // 根据传入不同类型的数据 返回不同的结果
toArray('123')
```

## 5. 类

### 一.TS 中定义类

```js
class Pointer{
x!:number; // 实例上的属性必须先声明
y!:number;
constructor(x:number,y?:number,...args:number[]){
this.x = x;
this.y = y as number;
}
}
let p = new Pointer(100,200);
```

实例上的属性需要先声明在使用，构造函数中的参数可以使用可选参数和剩余参数

### 二.类中的修饰符

#### public 修饰符（谁都可以访问到）

```js
class Animal {
public name!: string; // 不写 public 默认也是公开的
public age!: number;
constructor(name: string, age: number) {
this.name = name;
this.age = age;
}
}
class Cat extends Animal {
constructor(name: string, age: number) {
super(name, age);
console.log(this.name,this.age); // 子类访问
}
}
let p = new Cat('Tom', 18);
console.log(p.name,p.age); // 外层访问
class Animal {
constructor(public name: string, public age: number) {
this.name = name;
this.age = age;
}
}
```

我们可以通过参数属性来简化父类中的代码

#### rotected 修饰符 (自己和子类可以访问到)

```js
class Animal {
constructor(protected name: string, protected age: number) {
this.name = name;
this.age = age;
}
}
class Cat extends Animal {
constructor(name: string, age: number) {
super(name, age);
console.log(this.name, this.age)
}
}
let p = new Cat('Tom', 18);
console.log(p.name,p.age);// 无法访问
```

#### private 修饰符 （除了自己都访问不到）

```js
class Animal {
constructor(private name: string, private age: number) {
this.name = name;
this.age = age;
}
}
class Cat extends Animal {
constructor(name: string, age: number) {
super(name, age);
console.log(this.name, this.age); // 无法访问
}
}
let p = new Cat('Tom', 18);
console.log(p.name,p.age);// 无法访问

```

#### readonly 修饰符 （仅读修饰符）

```js
class Animal {
constructor(public readonly name: string, public age: number) {
this.name = name;
this.age = age;
}
changeName(name:string){
this.name = name; // 仅读属性只能在 constructor 中被赋值
}
}
class Cat extends Animal {
constructor(name: string, age: number) {
super(name, age);
}
}
let p = new Cat('Tom', 18);
p.changeName('Jerry'); #三.静态属性和方法
class Animal {
static type = '哺乳动物'; // 静态属性
static getName() { // 静态方法
return '动物类';
}
private \_name: string = 'Tom';

    get name() { // 属性访问器
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

}
let animal = new Animal();
console.log(animal.name);
```

静态属性和静态方法是可以被子类所继承的

#四.Super 属性

```js
class Animal {
  say(message: string) {
    console.log(message);
  }
  static getType() {
    return "动物";
  }
}
class Cat extends Animal {
  say() {
    // 原型方法中的 super 指代的是父类的原型
    super.say("猫猫叫");
  }
  static getType() {
    // 静态方法中的 super 指代的是父类
    return super.getType();
  }
}
let cat = new Cat();
console.log(Cat.getType());
```

#五.类的装饰器

#1.装饰类

```js
function addSay(target:any){
target.prototype.say = function(){console.log('say')}
}
@addSay
class Person {
say!:Function
}
let person = new Person
person.say();
```

装饰类可以给类扩展功能,需要开启 experimentalDecorators:true

#2.装饰类中属性

```js
function toUpperCase(target:any,key:string){
let value = target[key];
Object.defineProperty(target,key,{
get(){
return value.toUpperCase();
},
set(newValue){
value = newValue
}
})
}
function double(target: any, key: string) {
let value = target[key];
Object.defineProperty(target, key, {
get() {
return value \* 2;
},
set(newValue) {value = newValue}
})
}
class Person {
@toUpperCase
name: string = 'JiangWen'
@double
static age: number = 10;
getName() {
return this.name;
}
}
let person = new Person();
console.log(person.getName(),Person.age)
```

装饰属性可以对属性的内容进行改写，装饰的是实例属性则 target 指向类的原型、装饰的是静态属性则 target 执行类本身~

#3.装饰类中方法

```js
function noEnum(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(descriptor);
  descriptor.enumerable = false;
}
class Person {
  @toUpperCase
  name: string = "JiangWen";
  @double
  static age: number = 10;
  @noEnum
  getName() {
    return this.name;
  }
}
let person = new Person();
console.log(person); // getName 不可枚举
```

#4.装饰参数

```js
function addPrefix(target:any,key:string,paramIndex:number){
console.log(target,key,paramIndex); // Person.prototype getName 0
}
class Person {
@toUpperCase
name: string = 'JiangWen'
@double
static age: number = 10;
prefix!:string
@noEnum
getName(@addPrefix prefix:string) {
return this.name;
}
}
```

#六.抽象类
抽象类无法被实例化，只能被继承，抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现,而且必须实现。

```js
abstract class Animal{
name!:string;
abstract speak():void
}
class Cat extends Animal {
speak(){
console.log('猫猫叫');
}
}
class Dog extends Animal{
speak():string{
console.log('汪汪叫');
return 'wangwang'
}
}
```

定义类型时 void 表示函数的返回值为空（不关心返回值类型，所有在定义函数时也不关心函数返回值类型）
