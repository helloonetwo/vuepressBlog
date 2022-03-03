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
  // ES6 写法
  let checkAge = min => (age => age >= min)
  let checkAge18 = checkAge(18)
  let checkAge20 = checkAge(20)
  checkAge18(24)
  checkAge18(20)

```
### 登陆 [Github](https://github.com/)

打开 github 网站，登陆自己的 github 账号（没有账号的快去注册并面壁思过作为一个优秀的程序员为啥连一个 github 账号都没有）

接着我们新建两个仓库：

### 新建仓库一： USERNAME.github.io （不用克隆到本地）

<b>！！！注意：USERNAME 必须是你 Github 的账号名称，不是你的名字拼音，也不是你的非主流网名，不要瞎起，要保证和 Github 账号名一模一样！</b>

例如我的 Github 账号名称是 zhangyunchencc

![](/images/eg13.png)

那么新建仓库，Repository name 就填写为：zhangyunchencc.github.io

![](/images/eg14.png)

<b>这个仓库建好后，不用克隆到本地，内容更新修改都在仓库二中进行。</b>

### 新建仓库二：随便起一个名字，比如：vuepressBlog （克隆到本地）

这个项目是用来开发博客的，以后只需要改这个项目就够了。

- 使用工具包的，将 [vuepress-devkit](https://github.com/zhangyunchencc/vuepress-devkit.git) 中的内容拷贝到 vuepressBlog 文件夹中

- 自己从头搭建的，将 vuepressBlogDemo 文件夹的内容拷贝到仓库二，并在根目录下创建 deploy.sh 文件，内容如下：

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.yourwebsite.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://USERNAME.github.io
git push -f git@github.com:USERNAME/USERNAME.github.io.git master

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages

cd -
```

### 修改仓库二中的 deploy.sh 发布脚本

把文件中的 USERNAME 改成 Github 账号名，例如我的账号名是 zhangyunchencc，那么就可以改为：

```sh
# 如果你想要部署到 https://USERNAME.github.io
git push -f git@github.com:zhangyunchencc/zhangyunchencc.github.io.git master
```

这样仓库二和仓库一就建立了关联。

简单说二者的关系是：仓库一负责显示网站内容，我们不需要改动它；日常开发和新增内容，都在仓库二中，并通过 npm run deploy 命令，将代码发布到仓库一。

### 在 package.json 文件夹中添加发布命令（使用工具包的请忽略）

```json
"scripts": {
  "deploy": "bash deploy.sh"
}
```

### :clap: 大功告成，运行发布命令

    npm run deploy

此时打开 Github Settings 中下面的链接: [https://zhangyunchencc.github.io/](https://zhangyunchencc.github.io/) 即可看到自己的主页啦~

![](/images/eg2.png)

#### PC 端页面是这样的：

![](/images/eg3.png)

#### 手机端页面是这样的：

![](/images/eg4.png=200x)
<img src="/images/eg4.png" style="width: 50%; display: block; margin: 0 auto;">

可以看到导航栏变成了左上角的小图标，可以打开和收起。

## 六、发布到自己的个人域名

如果你不满足于 https://zhangyunchencc.github.io/ 这样的域名，想要一个自己个人的专属域名，比如 http://www.zhangyunchen.cc/ ，毕竟一些大牛（阮一峰 [http://www.ruanyifeng.com/blog/](http://www.ruanyifeng.com/blog/)） 都是自己名字的网址哦，很方便很酷呢 😎

下面跟着步骤一步步来就好啦~

### 购买域名

推荐在 [新网](http://www.xinnet.com/domain/domain.html) 或 [万网](https://wanwang.aliyun.com/) 购买。

我是在新网购买的，下面以新网为例，万网是类似的。

购买完成后进入管理后台，点击 ”解析“ 按钮，添加下面两条内容：
![](/images/eg5.png)

![](/images/eg6.png)

::: warning 注意！这里有坑：
在 万网 购买域名的同学请注意，第二条记录中的 _ 请用 @ 代替，万网不支持 _
:::

记录值里的 IP 可以通过 ping Github 的域名得到：

    ping www.username.github.io

### 修改仓库二中的 deploy.sh 文件

将仓库二中的 deploy.sh 文件的第 13 行反注释掉，并填上自己的域名，deploy.sh 文件的最终版：

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'www.zhangyunchen.cc' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你想要部署到 https://<USERNAME>.github.io
git push -f git@github.com:zhangyunchencc/zhangyunchencc.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:<USERNAME>/vuepress.git master:gh-pages

cd -

```

此时，我们运行 npm run deploy 即可发布到自己的专属域名啦~

### :clap: 大功告成，打开 [https://www.zhangyunchen.cc](https://www.zhangyunchen.cc) 看一下吧~~~

拥有自己专属域名的个人博客感觉很酷哦~

写一些文章，记录一点生活，把自己的网站发给同学朋友看看吧！ :sunglasses:

## 七、最后

- 你需要一些 [Markdown](https://www.jianshu.com/p/b03a8d7b1719) 语法的基础知识；
- 你需要一个 [Github](https://github.com/) 账号，并在里面创建两个 repo；
- Github 需要添加 ssh key，第一次使用的同学遇到问题可以百度解决；
- 个人博客不只可以用来写技术相关的内容，也可以有自己写的文章、随笔，甚至上传一些照片。

我的 [vuepress-devkit](https://github.com/zhangyunchencc/vuepress-devkit.git) 已经开源放在了 Github 上，还有很多想要增加的功能，例如添加评论模块、自动生成侧边栏目录、增加网站分析工具等等，在这里欢迎大家 Star 或者 Fork 。

以上，

张韵晨 | Front End Engineer | 2018.10
