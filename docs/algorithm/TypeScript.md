
### Typescript

::: tip
Typescript
:::

## 一、环境配置和搭建
### 一.什么是Typescript

![](/images/typescript.jpg)

TypeScript是Javascript的超集，遵循最新的ES5/ES6规范。Typescript扩展了Javascript语法。

Typescript更像后端JAVA,让JS可以开发大型企业应用
TS提供的类型系统可以帮助我们在写代码时提供丰富的语法提示
在编写代码时会对代码进行类型检查从而避免很多线上错误
TypeScript不会取代JS, 尤雨溪： 我认为将类型添加到JS本身是一个漫长的过程 。让委员会设计一个类型系统是（根据TC39的经历来判断）不切实际的 。

### 二.环境配置

### 1.全局编译TS文件
全局安装typescript对TS进行编译
```js
npm install typescript -g
tsc --init # 生成tsconfig.json
tsc # 可以将ts文件编译成js文件
tsc --watch # 监控ts文件变化生成js文件
```


### 2.配置webpack环境
安装依赖
```js
npm install rollup typescript rollup-plugin-typescript2 @rollup/plugin-node-resolve rollup-plugin-serve -D
```
初始化TS配置文件
```js
npx tsc --init
```
webpack配置操作

// rollup.config.js
```js
import ts from 'rollup-plugin-typescript2'
import {nodeResolve} from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import path from 'path'
export default {
    input:'src/index.ts',
    output:{
        format:'iife',
        file:path.resolve('dist/bundle.js'), 
        sourcemap:true
    },
    plugins:[
        nodeResolve({
            extensions:['.js','.ts']
        }),
        ts({
            tsconfig:path.resolve(__dirname,'tsconfig.json')
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:3000,
            contentBase:''
        })
    ]
}
```
package.json配置
```js
"scripts": {
      "dev": "rollup -c -w"
}
```
我们可以通过npm run start启动服务来使用typescript啦~



## 二.基础类型
TS中冒号后面的都为类型标识

### 一.布尔、数字、字符串类型
```
let bool:boolean = true;
let num:number = 10;
let str:string = 'hello zf';
```
### 二.元组类型
限制长度个数、类型一一对应
```js
let tuple:[string,number,boolean] = ['zf',10,true];
// 像元组中增加数据，只能增加元组中存放的类型
tuple.push('回龙观');
```

### 三.数组
声明数组中元素数据类型
```js
let arr1:number[] = [1,2,3];
let arr2:string[] = ['1','2','3'];
let arr3:(number|string)[] = [1,'2',3];
let arr4:Array<number | string> = [1,'2',3]; // 泛型方式来声明
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
    USER_ROLE[USER_ROLE["USER"] = 0] = "USER";
    USER_ROLE[USER_ROLE["ADMIN"] = 1] = "ADMIN";
    USER_ROLE[USER_ROLE["MANAGER"] = 2] = "MANAGER";
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
### 五.any类型
不进行类型检测
```js
let arr:any = ['jiagou',true,{name:'zf'}]
```
### 六.null 和 undefined
任何类型的子类型,如果strictNullChecks的值为true，则不能把null 和 undefined付给其他类型
```js
let name:number | boolean;
name = null;
```
### 七.void类型
只能接受null，undefined。一般用于函数的返回值
严格模式下不能将null赋予给void
```js
let a:void;
a = undefined;
``
### 八.never类型
任何类型的子类型,never代表不会出现的值。不能把其他类型赋值给never
```js
  function error(message: string): never {
      throw new Error("err");
  }
  function loop(): never {
      while (true) { }
  }
  function fn(x:number | string){
      if(typeof x == 'number'){

      }else if(typeof x === 'string'){

      }else{
          console.log(x); // never
      }
  }
```
### 九.Symbol类型
Symbol表示独一无二
```js
const s1 = Symbol('key');
const s2 = Symbol('key');
console.log(s1 == s2); // false
```
### 十.BigInt类型
```js
const num1 = Number.MAX_SAFE_INTEGER + 1;
const num2 = Number.MAX_SAFE_INTEGER + 2;
console.log(num1 == num2)// true

let max: bigint = BigInt(Number.MAX_SAFE_INTEGER)
console.log(max + BigInt(1) === max + BigInt(2))
```
number类型和bigInt类型是不兼容的

### 十一.object对象类型
object表示非原始类型
```js
let create = (obj:object):void=>{}
create({});
create([]);
create(function(){})
```