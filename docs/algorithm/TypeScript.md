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

### 四.Super 属性

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

### 五.类的装饰器

#### 1.装饰类

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

#### 2.装饰类中属性

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

#### 3.装饰类中方法

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

#### 4.装饰参数

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


## 6.接口
接口可以在面向对象编程中表示行为的抽象，也可以描述对象的形状。 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。 (接口中不能含有具体的实现逻辑)

#### 一.函数接口参数
```js
const fullName = ({firstName,lastName}:{firstName:string,lastName:string}):string =>{
    return firstName + lastName
}
```
> 我们可以约束函数中的参数，但是类型无法复用
```js
interface IFullName {
    firstName:string,
    lastName:string
}
const fullName = ({firstName,lastName}:IFullName):string =>{
    return firstName + lastName
}
```
> 我们可以通过接口进行描述

#### 二.函数类型接口
```js
interface IFullName {
    firstName:string,
    lastName:string
}
interface IFn {
    (obj:IFullName):string
}
const fullName:IFn = ({firstName,lastName})=>{
    return firstName + lastName
}
```
> 通过接口限制函数的参数类型和返回值类型

#### 三.函数混合类型
```js
interface ICounter {
    (): number; // 限制函数类型
    count: 0 // 限制函数上的属性
}
let fn: any = () => {
    fn.count++;
    return fn.count;
}
fn.count = 0;
let counter:ICounter = fn;
console.log(counter());
console.log(counter());
```
#### 四.对象接口
>对象接口可以用来描述对象的形状结构
```js
interface IVegetables {
    readonly color:string,
    size:string
}
interface IVegetables{
    age?:number,
    taste:'sour'|'sweet'
}
const tomato:IVegetables = {
    color:'red',
    size:'10',
    taste:'sour'
}
tomato.color = 'green'; // 仅读属性不能进行修改
？标识的属性为可选属性, readOnly标识的属性则不能修改。多个同名的接口会自动合并

const tomato:IVegetables = {
    color:'red',
    size:'10',
    taste:'sour',
    type:'蔬菜'
} as IVegetables; // 多余的属性可以使用类型断言
```
#### 五.任意属性、可索引接口
```js
interface Person {
    name: string;
    [key: string]: any
}
let p: Person = {
    name: 'zhufeng',
    age: 10,
    [Symbol()]:'回龙观'
}
```
> 任意属性可以对某一部分必填属性做限制，其余的可以随意增减
```js
interface IArr {
    [key: number]: any
}
let p: IArr = {
    0:'1',1:'2',3:'3'
}
let arr:IArr = [1,'d','c'];
```
> 可索引接口可以用于标识数组

#### 六.类接口
> 这里先来强调一下抽象类和接口的区别,抽象类中可以包含具体方法实现。接口中不能包含实现
```js
interface Speakable {
    name:string;
    speak():void;
}
interface ChineseSpeakable{
    speakChinese():void
}
class Speak implements Speakable,ChineseSpeakable{
    name!:string
    speak(){}
    speakChinese(){}
}
```
> 一个类可以实现多个接口，在类中必须实现接口中的方法和属性

#### 七.接口继承
```js
interface Speakable {
    speak():void
}
interface SpeakChinese extends Speakable{
    speakChinese():void
}
class Speak implements SpeakChinese{
    speakChinese(): void {
        throw new Error("Method not implemented.");
    }
    speak(): void {
        throw new Error("Method not implemented.");
    }
}
```
#### 八.构造函数类型
```js
interface Clazz {
    new (name:string):any
}
function createClass(target:Clazz,name:string){
    return new target(name); // 传入的是一个构造函数
}
class Animal {
    constructor(public name:string){
        this.name = name;
    }
}
let r = createClass(Animal,'Tom');
```

>这里无法标识返回值类型
```js
interface Clazz<T> {
    new(name: string): T
}
function createClass<T>(target: Clazz<T>, name: string):T {
    return new target(name)
}
class Animal {
    constructor(public name: string) {
        this.name = name;
    }
}
let r = createClass(Animal, 'Tom');
```
> new() 表示当前是一个构造函数类型,这里捎带使用了下泛型。 在使用createClass时动态传入类型。



## 7.泛型
#### 一.指定函数参数类型
- 单个泛型
```js
const getArray = <T>(times:number,val:T):T[]=>{
    let result:T[] = [];
    for(let i = 0; i<times;i++){
        result.push(val);
    }
    return result;
}
getArray(3,3); // 3 => T => number
```
- 多个泛型
```js
function swap<T, K>(tuple: [T, K]): [K, T] {
    return [tuple[1], tuple[0]]
}
console.log(swap(['a','b']))
```
#### 二.函数标注的方式
- 类型别名
```js
type TArray = <T, K>(tuple: [T, K]) => [K, T];
const getArray:TArray = <T, K>(tuple: [T, K]): [K, T] => {
    return [tuple[1], tuple[0]]
}
```
> 可以使用类型别名，但是类型别名不能被继承和实现。一般联合类型可以使用类型别名来声明

- 接口
```js
interface IArray{
    <T,K>(typle:[T,K]):[K,T]
}
const getArray:IArray = <T, K>(tuple: [T, K]): [K, T] => {
    return [tuple[1], tuple[0]]
}
```
> 能使用interface尽量使用interface

#### 三.泛型接口使用
```js
interface ISum<T> { // 这里的T是使用接口的时候传入
    <U>(a: T, b: T): U // 这里的U是调用函数的时候传入
}
let sum: ISum<number> = (a:number, b:number) => {
    return 3 as any
}
```
#### 四.默认泛型
```
interface T2<T=string>{
    name:T
}
type T22 = T2;
let name1:T22 = {name:'zf'}
```
> 可以指定泛型的默认类型，方便使用

#### 五.类中的泛型
> 创建实例时提供类型
```
class MyArray<T>{ // T => number
    arr: T[] = [];
    add(num: T) {
        this.arr.push(num);
    }
    getMaxNum(): T {
        let arr = this.arr
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            current > max ? max = current : null
        }
        return max;
    }
}
let myArr = new MyArray<number>();
myArr.add(3);
myArr.add(1);
myArr.add(2);
console.log(myArr.getMaxNum());
校验构造函数类型
const createClass = <T>(clazz: new(name:string,age:number)=>T):T =>{
    return new clazz(name,age);
}
createClass<Person2>(Person2)
```
#### 六.泛型约束
- 泛型必须包含某些属性
```js
interface IWithLength {
    length:number
}
function getLen<T extends IWithLength>(val:T){
    return val.length;
}
getLen('hello');
const sum = <T extends number>(a: T, b: T): T => {
    return (a + b) as T
}
let r = sum<number>(1, 2); 
```
 - 返回泛型中指定属性
```js
const getVal = <T,K extends keyof T>(obj:T,key:K) : T[K]=>{
    return obj[key];
}
```



## 8.兼容性
TS中的兼容性，主要看结构是否兼容。（核心是考虑安全性）

#### 一.基本数据类型的兼容性
```js
let temp:string | number;
let num!:number;
temp = num;
```
> 你要的我有就可以
```js
let num:{
    toString():string
}
let str:string = 'zf';
num = str; // 字符串中具备toString()方法，所以可以进行兼容

```
#### 二.接口兼容性
```js
interface IAnimal {
    name: string,
    age: number
}
interface IPerson {
    name: string,
    age: number,
    address: string
}
let animal: IAnimal;
let person: IPerson = {
    name: 'zf',
    age: 11,
    address: '回龙观'
};
animal = person;
```
> 接口的兼容性，只要满足接口中所需要的类型即可！

#### 三.函数的兼容性
>函数的兼容性主要是比较参数和返回值

> 参数
```js
let sum1 = (a: string, b: string) => a + b;
let sum2 = (a: string) => a;
sum1 = sum2
```
> 赋值函数的参数要少于等于被赋值的函数，与对象相反,例如:
```js
type Func<T> = (item: T, index: number) => void
function forEach<T>(arr: T[], cb: Func<T>) {
    for (let i = 0; i < arr.length; i++) {
        cb(arr[i], i);
    }
}
forEach([1, 2, 3], (item) => {
    console.log(item);
});
```
> 返回值

```js
type sum1 = () => string | number
type sum2 = () => string;

let fn1: sum1;
let fn2!: sum2;
fn1 = fn2;
```
#### 四.函数的逆变与协变
> 函数的参数是逆变的，返回值是协变的 （在非严格模式下函数的参数是双向协变的）
```js
class Parent {
    address: string = '回龙观'
}
class Child extends Parent {
    money: number = 100
}
class Grandsom extends Child {
    name: string = '吉姆';
}
type Callback = (person: Child) => Child
function execCallback(cb: Callback) { }
let fn = (person: Parent) => new Grandsom;
execCallback(fn);
```
> 通过这个案例可以说明，函数参数可以接收父类，返回值可以返回子类

#### 五.类的兼容性
```js
class Perent {
    name: string = 'zf';
    age: number = 11
}
class Parent1 {
    name: string = 'zf';
    age: number = 11
}
let parent: Perent = new Parent1
```
> 这里要注意的是，只要有private或者protected关键字类型就会不一致;但是继承的类可以兼容
```js
class Parent1 {
    protected name: string = 'zf';
    age: number = 11
}
class Child extends Parent1{} 
let child:Parent1 = new Child;
```
#### 六.泛型的兼容性

```js
interface IT<T>{}
let obj1:IT<string>;
let obj2!:IT<number>;
obj1 = obj2;
```
#### 七.枚举的兼容性
```js
enum USER1 {
    role = 1
}
enum USER2 {
    role = 1
}
let user1!:USER1
let user2!:USER2
user1 = user2 // 错误语法
```
>  不同的枚举类型不兼容



## 9.类型保护
通过判断识别所执行的代码块，自动识别变量属性和方法

#### 一.typeof类型保护
```js
function double(val: number | string) {
    if (typeof val === 'number') {
        val
    } else {
        val
    }
}
```
#### 二.instanceof类型保护
```js
class Cat { }
class Dog { }

const getInstance = (clazz: { new(): Cat | Dog }) => {
    return new clazz();
}
let r = getInstance(Cat);
if(r instanceof Cat){
    r
}else{
    r
}
```
#### 三.in类型保护
```js
interface Fish {
    swiming: string,
}
interface Bird {
    fly: string,
    leg: number
}
function getType(animal: Fish | Bird) {
    if ('swiming' in animal) {
        animal // Fish
    } else {
        animal // Bird
    }
}
```
#### 四.可辨识联合类型
```js
interface WarningButton {
    class: 'warning'
}
interface DangerButton {
    class: 'danger'
}
function createButton(button: WarningButton | DangerButton) {
    if (button.class == 'warning') {
        button // WarningButton
    } else {
        button // DangerButton
    }
}
```
#### 五.null保护
```js
const addPrefix = (num?: number) => {
    num = num || 1.1;
    function prefix(fix: string) {
        return fix + num?.toFixed()
    }
    return prefix('zf');
}
console.log(addPrefix());
```
> 这里要注意的是ts无法检测内部函数变量类型

#### 六.自定义类型保护
```js
interface Fish {
    swiming: string,
}
interface Bird {
    fly: string,
    leg: number
}
function isBird(animal: Fish | Bird):animal is Bird {
    return 'swiming' in animal
}
function getAniaml (animal:Fish | Bird){
    if(isBird(animal)){
        animal
    }else{
        animal
    }
}
```
#### 七.完整性保护

```js
interface ICircle {
    kind: 'circle',
    r: number
}
interface IRant {
    kind: 'rant',
    width: number,
    height: number
}
interface ISquare {
    kind: 'square',
    width: number
}
type Area = ICircle | IRant | ISquare
const isAssertion = (obj: never) => { }
const getArea = (obj: Area) => {
    switch (obj.kind) {
        case 'circle':
            return 3.14 * obj.r ** 2
        default:
            return isAssertion(obj); // 必须实现所有逻辑
    }
}
```

## 10.类型推断
#### 一.赋值推断
> 赋值时推断，类型从右像左流动,会根据赋值推断出变量类型
```js
let str = 'zhufeng';
let age = 11;
let boolean = true;
```
#### 二.返回值推断
自动推断函数返回值类型
```js
function sum(a: string, b: string) {
    return a + b;
}
sum('a','b');
```
#### 三.函数推断
> 函数从左到右进行推断
```js
type Sum = (a: string, b: string) => string;
const sum: Sum = (a, b) => a + b;
```
#### 四.属性推断
> 可以通过属性值,推断出属性的类型
```js
let person = {
    name:'zf',
    age:11
}
let {name,age} = person;
```
#### 五.类型反推
> 可以使用typeof关键字反推变量类型
```js
let person = {
    name:'zf',
    age:11
}
type Person = typeof person
```
#### 六.索引访问操作符
```js
interface IPerson {
    name:string,
    age:number,
    job:{
        address:string
    }
}
type job = IPerson['job']
```
#### 七.类型映射
```js
interface IPerson {
    name:string,
    age:number
}
type MapPerson = {[key in keyof IPerson]:IPerson[key]}
```

## 11.交叉类型
交叉类型(Intersection Types)是将多个类型合并为一个类型
```js
interface Person1 {
    handsome: string,
}
interface Person2 {
    high: string,
}
type P1P2 = Person1 & Person2;
let p: P1P2 = { handsome: '帅', high: '高' }
```
> 举例：我们提供两拨人，一拨人都很帅、另一拨人很高。我们希望找到他们的交叉部分 => 又高又帅的人

> 交叉类型
```js
function mixin<T, K>(a: T, b: K): T & K {
    return { ...a, ...b }
}
const x = mixin({ name: 'zf' }, { age: 11 })
interface IPerson1 {
    name:string,
    age:number
}

interface IPerson2 {
    name:number
    age:number
}
type person = IPerson1 & IPerson2
let name!:never
let person:person = {name,age:11};  // 两个属性之间 string & number的值为never
```



## 12.条件类型
### s一.条件类型基本使用
>可以使用extends关键字和三元表达式，实现条件判断
```js
interface Fish {
    name1: string
}
interface Water {
    name2: string
}
interface Bird {
    name3: string
}
interface Sky {
    name4: string
}
type Condition<T> = T extends Fish ? Water : Sky;
let con1: Condition<Fish> = { name2: '水' }
```
### 二.条件类型分发
```js
let con2: Condition<Fish|Bird> = { name2: '水' } 
```
> 这里会用每一项依次进行分发,最终采用联合类型作为结果,等价于:
```js
type c1 = Condition<Fish>;
type c2 = Condition<Bird>;
type c = c1 | c2
```
#### 三.内置条件类型
 - 1.Exclude排除类型
    ```js
      type Exclude<T, U> = T extends U ? never : T;
       type MyExclude = Exclude<'1' | '2' | '3', '1' | '2'>
    ```
  - 2.Extract抽取类型
    ```js
  type Extract<T, U> = T extends U ? T : never;
  type MyExtract = Extract<'1' | '2' | '3', '1' | '2'>
  ```
  - 3.NoNullable 非空检测
    ```js 
    type NonNullable<T> = T extends null | undefined ? never : T
    type MyNone = NonNullable<'a' | null | undefined>
    ```
#### 四.infer类型推断

##### 1.ReturnType返回值类型
```js
function getUser(a: number, b: number) {
  return { name: 'zf', age: 10 }
}
type ReturnType<T> = T extends (...args: any) => infer R ? R : never
type MyReturn = ReturnType<typeof getUser>
```

##### 2.Parameters 参数类型
```js
type Parameters<T> = T extends (...args: infer R) => any ? R : any;
type MyParams = Parameters<typeof getUser>;
```
##### 3.ConstructorParameters构造函数参数类型
```js
class Person {
  constructor(name: string, age: number) { }
}
type ConstructorParameters<T> = T extends { new(...args: infer R): any } ? R : never
type MyConstructor = ConstructorParameters<typeof Person>
```
##### 4.InstanceType 实例类型
```js
type InstanceType<T> = T extends { new(...args: any): infer R } ? R : any
type MyInstance = InstanceType<typeof Person>
```
#### 五.infer实践
> 将数组类型转化为联合类型
```js
type ElementOf<T> = T extends Array<infer E> ? E : never;
type TupleToUnion = ElementOf<[string, number, boolean]>;
```
> 将两个函数的参数转化为交叉类型
```js
type T1 = { name: string };
type T2 = { age: number };
type ToIntersection<T> = T extends ([(x: infer U) => any, (x: infer U) => any]) ? U : never;
type t3 = ToIntersection<[(x:T1)=>any,(x:T2)=>any]>
```
> 表示要把T1、T2赋予给x，那么x的值就是T1、T2的交集。（参数是逆变的可以传父类）

> TS的类型：TS主要是为了代码的安全性来考虑。所以所有的兼容性问题都要从安全性来考虑!



## 13.内置类型
#### 一.Partial转化可选属性
```js
interface Company {
    num: number
}
interface Person {
    name: string,
    age: string,
    company: Company
}
// type Partial<T> = { [K in keyof T]?: T[K] }; 实现原理
type PartialPerson = Partial<Person>;
```
> 遍历所有的属性将属性设置为可选属性,但是无法实现深度转化!
```js
type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
type DeepPartialPerson = DeepPartial<Person>;
```
> 我们可以实现深度转化,如果值是对象继续深度转化。

#### 二.Required转化必填属性
```js
interface Company {
    num: number
}
interface Person {
    name: string,
    age: string,
    company: Company
}
type PartialPerson = Partial<Person>;
type Required<T> = {[K in keyof T]-?:T[K]} 
type RequiredPerson = Required<PartialPerson>
```
> 将所有的属性转化成必填属性

#### 三.Readonly转化仅读属性
```js
type Readonly<T> = { readonly [K in keyof T]: T[K] }
type RequiredPerson = Readonly<Person>
```
> 将所有属性变为仅读状态

#### 四.Pick挑选所需的属性
```js
type Pick<T, U extends keyof T> = { [P in U]: T[P] }
type PickPerson = Pick<Person, 'name' | 'age'>
```
> 在已有类型中挑选所需属性

#### 五.Record记录类型

```js
type Record<K extends keyof any, T> = { [P in K]  : T }
let person: Record<string, any> = { name: 'zf', age: 11 };
```

> 实现map方法，我们经常用record类型表示映射类型
```js
function map<T extends keyof any, K, U>(obj: Record<T, K>, callback: (item: K, key: T) => U) {
    let result = {} as Record<T, U>
    for (let key in obj) {
        result[key] = callback(obj[key], key)
    }
    return result
}
const r = map({ name: 'zf', age: 11 }, (item, key) => {
    return item
});
```
#### 六.Omit忽略属性
```js
let person = {
    name: 'zhufeng',
    age: 11,
    address: '回龙观'
}
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type OmitAddress = Omit<typeof person, 'address'>
```
> 忽略person中的address属性 (先排除掉不需要的key，在通过key选出需要的属性)


## 14.装包和拆包
#### 一.装包
```js
type Proxy<T> = {
    get():T,
    set(value:T):void
}
type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
} 
let props = {
    name: 'zhufeng',
    age: 11
}
function proxify<T>(obj:T):Proxify<T>{
    let result = {} as Proxify<T>;
    for(let key in obj){
        let value = obj[key];
        result[key] = {
            get(){
                return value
            },
            set:(newValue)=>value = newValue
        }
    }
    return result
}
let proxpProps = proxify(props);
```
#### 二.拆包
```js
function unProxify<T>(proxpProps:Proxify<T>):T{
    let result = {} as T;
    for(let key in proxpProps){
        let value = proxpProps[key];
        result[key] = value.get()
    }
    return result
}
let proxy = unProxify(proxpProps)
```


## 15.自定义类型
#### 一.Diff实现
> 求两个对象不同的部分
```js
let person1 = {
    name: 'zhufeng',
    age: 11,
    address: '回龙观'
}
let person2 = {
    address: '回龙观',
}
type Diff<T extends object,K extends Object> = Omit<T,keyof K>
type DiffPerson = Diff<typeof person1,typeof person2>
```

#### 二.InterSection交集
```js
let person1 = {
    name: 'zhufeng',
    age: 11,
    address: '回龙观'
}
let person2 = {
    address: '回龙观',
}
type InterSection<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>>
type InterSectionPerson = InterSection<typeof person1, typeof person2>
```
#### 三.Overwrite属性覆盖
```js
type OldProps = { name: string, age: number, visible: boolean };
type NewProps = { age: string, other: string };

type Diff<T extends object,K extends Object> = Omit<T,keyof K>
type InterSection<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>>
type Overwrite<T extends object, K extends object, I = Diff<T,K> & InterSection<K,T>> = Pick<I,keyof I>
type ReplaceProps = Overwrite<OldProps, NewProps>
```
> 如果存在已有属性则使用新属性类型进行覆盖操作

#### 四.Merge对象合并
```js
type Compute<A extends any> = { [K in keyof A]: A[K] };
type Merge<T, K> = Compute<Omit<T, keyof K> & K>;
type MergeObj = Merge<OldProps,NewProps>
```
> 将两个对象类型进行合并操作


## 16.unknown
#### 一.unknown类型
> unknown类型，任何类型都可以赋值为unknown类型。 它是 any 类型对应的安全类型
```JS
let unknown:unknown;
unknown = 'zf';
unknown = 11;
```
> 不能访问unknown类型上的属性，不能作为函数、类来使用

> 联合类型中的unknown
```js
type UnionUnknown = unknown | null | string | number
```
> 联合类型与unknown都是unknown类型

> s交叉类型中的unknown
```js
type inter = unknown & null
```
> 交叉类型与unknown都是其他类型

#### 二.unknown特性
> never是unknown的子类型
```JS
type isNever = never extends unknown ? true : false;=
keyof unknown 是never

type key = keyof unknown;
```
> unknown类型不能被遍历
```JS
type IMap<T> = {
    [P in keyof T]:number
}
type t = IMap<unknown>;
```
> unknown类型不能和number类型进行 +运算,可以用于等或不等操作



## 17.模块和命名空间
默认情况下 ,我们编写的代码处于全局命名空间中

#### 一.模块
> 文件模块： 如果在你的 TypeScript 文件的根级别位置含有 import 或者 export，那么它会在这个文件中创建一个本地的作用域 。
```js
// a.ts导出
export default 'zf'
// index.ts导入
import name from './a'
```
#### 二.命名空间
> 命名空间可以用于组织代码，避免文件内命名冲突
- 命名空间的使用
```js
export namespace zoo {
    export class Dog { eat() { console.log('zoo dog'); } }
}
export namespace home {
    export class Dog { eat() { console.log('home dog'); } }
}
let dog_of_zoo = new zoo.Dog();
dog_of_zoo.eat();
let dog_of_home = new home.Dog();
dog_of_home.eat();
```
- 命名空间嵌套使用
```js
export namespace zoo {
    export class Dog { eat() { console.log('zoo dog'); } }
    export namespace bear{
        export const name = '熊'
    } 
}
console.log(zoo.bear.name); 
```
> 命名空间中导出的变量可以通过命名空间使用。





## 18.类型声明
#### 一.声明全局变量
- 普通类型声明
```js
declare let age: number;
declare function sum(a: string, b: string): void;
declare class Animal { };
declare const enum Seaons{
    Spring,
    Summer,
    Autumn,
    Winter
}
declare interface Person {
    name:string,
    age:number
}
```
> 类型声明在编译的时候都会被删除，不会影响真正的代码。目的是不重构原有的js代码，而且可以得到很好的TS支持

> jquery通过外部CDN方式引入，想在代码中直接使用
```js
declare const $:(selector:string)=>{
    height(num?:number):void
    width(num?:number):void
};
$('').height();
```
- 命名空间声明
```js
declare namespace jQuery {
    function ajax(url:string,otpions:object):void;
    namespace fn {
        function extend(obj:object):void
    }
}
jQuery.ajax('/',{});
jQuery.fn.extend({});
```
> namespace表示一个全局变量包含很多子属性 , 命名空间内部不需要使用 declare 声明属性或方法
#### 二. 类型声明文件
> 类型声明文件以.d.ts结尾。默认在项目编译时会查找所有以.d.ts结尾的文件
```js
declare const $:(selector:string)=>{
    height(num?:number):void
    width(num?:number):void
};
declare namespace jQuery {
    function ajax(url:string,otpions:object):void;
    namespace fn {
        function extend(obj:object):void
    }
}
```
#### 三.编写第三方声明文件
配置tsconfig.json
- jquery声明文件
```js
"moduleResolution": "node",
"baseUrl": "./",
"paths": {
    "*": ["types/*"]
},
```
```js
// types/jquery/index.d.ts
declare function jQuery(selector: string): HTMLElement;
declare namespace jQuery {
    function ajax(url: string): void
}
export = jQuery;
```
- events模块声明文件
```js
import { EventEmitter } from "zf-events";
var e = new EventEmitter();
e.on('message', function (text) {
   console.log(text)
})
e.emit('message', 'hello');
export type Listener = (...args: any[]) => void;
export type Type = string | symbol

export class EventEmitter {
   static defaultMaxListeners: number;
   emit(type: Type, ...args: any[]): boolean;
   addListener(type: Type, listener: Listener): this;
   on(type: Type, listener: Listener): this;
   once(type: Type, listener: Listener): this;
}
```
#### 四.模块导入导出
```js
import $ from 'jquery'  // 只适用于 export default $

const $ = require('jquery'); // 没有声明文件可以直接使用 require语法

import * as $ from 'jquery'  // 为了支持 Commonjs规范 和 AMD规范 导出时采用export = jquery

import $ = require('jquery')  // export = jquery 在commonjs规范中使用

```

#### 五.第三方声明文件
@types是一个约定的前缀，所有的第三方声明的类型库都会带有这样的前缀
```js
npm install @types/jquery -S
```
> 当使用jquery时默认会查找 node_modules/@types/jquery/index.d.ts 文件
> 

> 查找规范
```js
node_modules/jquery/package.json 中的types字段
node_modules/jquery/index.d.ts
node_modules/@types/jquery/index.d.ts
```


## 19.扩展全局变量类型
#### 一.扩展局部变量
> 可以直接使用接口对已有类型进行扩展
```js
interface String {
    double():string
}
String.prototype.double = function () {
    return this as string + this;
}
let str = 'zhufeng';
interface Window {
    mynane:string
}
console.log(window.mynane)
```
#### 二.模块内全局扩展
```js
declare global{
    interface String {
        double():string;
    }
    interface Window{
        myname:string
    }
}
```
> 声明全局表示对全局进行扩展

#### 三.声明合并
同一名称的两个独立声明会被合并成一个单一声明，合并后的声明拥有原先两个声明的特性。

- 1.同名接口合并
```js
interface Animal {
    name:string
}
interface Animal {
    age:number
}
let a:Animal = {name:'zf',age:10};
```
-  2.命名空间的合并
   - 扩展类
   ```
   class Form {}
   namespace Form {
       export const type = 'form'
   }
   ```
   - 扩展方法
   ```js
   function getName(){}
   namespace getName {
       export const type = 'form'
   }
   ```
   - 扩展枚举类型
   ```js
   enum Seasons {
       Spring = 'Spring',
       Summer = 'Summer'
   }
   namespace Seasons{
       export let Autum = 'Autum';
       export let Winter = 'Winter'
   }
   ```
- 3.交叉类型合并
```js
import { createStore, Store } from 'redux';
type StoreWithExt = Store & {
    ext:string
}
let store:StoreWithExt
```

#### 四.生成声明文件
配置tsconfig.json 为true 生成声明文件
```js
"declaration": true
```