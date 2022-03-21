### webpack

## 1、模块打包工具的由来

模块化确实很好地解决了复杂应用开发过程当中的代码组织问题，但是随着我们引入模块化，我们的应用又会产生许多新的问题：

- ES Modules 存在环境兼容问题
- 模块文件过多，网络请求频繁
- 所有前端资源都需要模块化
无容置疑，模块化是必要的，不过我们需要在原有的基础之上引入更好的方案或者工具去解决上面几个问题。让开发者在开发阶段可以继续享受模块化所带来的优势，又不必担心模块化对生产环境所产生的一些影响。

我们希望它们能够满足：

需要这样一个工具能够编译我们的代码，将开发阶段编写的那些包含新特性的代码直接转换为能够兼容绝大多数环境的代码。
能过将散落的模块文件再次打包到一起。
需要去支持不同种类的前端类型，就可以把前端开发过程中所涉及的资源文件都当作模块去使用。
由此，前端模块打包工具就诞生了。

## 2、 模块打包工具概述

前端领域有一些工具就很好地解决了以上这几个问题，其中最主流的就是Webpack、Parcel和Rollup。

![](/images/web1.png)

我们就拿Webpack为例，它的一些和新特性就很好地满足了上面我们所说的需求。

Webpack 作为一个模块打包器(Module bundler)，它本身就可以解决模块化JavaScript代码打包的问题。我们通过Webpack就可以将零散的代码打包到同一个JS文件当中。对于有环境兼容问题的代码，我们就可以在打包的过程当中通过模块加载器(Loader)对其进行编译转换。
其次，Webpack还具备代码拆分(Code Splitting)的能力，它能够将应用当中所有的代码都按照我们的需要去打包。我们可以把应用加载过程当中初次运行时所必需的模块打包到一起，对于其他模块再单独存放，等到应用工作过程当中实际需要到某个模块再异步去加载这个模块，从而实现增量加载。
最后，对于前端资源模块(Asset Module)的问题，Webpack支持在JavaScript当中以模块化的方式载入任意类型的资源文件。
这是Webpack解决了我们上边所说的这些需求，其他打包工具也都是类似的。总的来说，所有打包工具都是以模块化为目标。

> 打包工具解决的是前端整体的模块化，并不是指JavaScript模块化。它就可以让我们在开发阶段更好的去享受模块化所带来的优势，同时又不必担心模块化对生产环境所产生的影响，这就是模块化工具的作用。


## 3 、Webpack 基础
### Webpack 快速上手
Webpack作为目前最主流的前端模块打包器，提供了一整套的前端项目模块化方案，而不仅仅是局限于只对JavaScript的模块化。通过Webpack提供的前端模块化方案就可以很轻松地对前端项目开发过程中涉及到的所有的资源进行模块化。

接下来通过我们来通过一个小案例先来了解一下Webpack的基本使用。项目代码

1.我们首先安装项目依赖(自定义的项目可以忽略)
```js
yarn
```
2.安装serve
```js
yarn add serve --dev
```
3.通过serve运行项目(正常运行)
```js
yarn serve .
```
4.引入Webpack，使用项目代码可以直接yarn安装依赖（引用项目代码的话可以忽略）
```js
yarn add webpack webpack-cli --dev
```
5.打包src下的js代码
```js
yarn webpack
```
6.修改html引用的js路径，去除type="module"（引用的项目代码已更改）
```js
<script src="dist/main.js"></script>
```
7.将webpack命令定义到package.json当中（引用的项目代码已更改）
```js
{
...
"scripts": {
    "build": "webpack"
  },
...
}
```
8.使用build启动打包
```js
yarn build
```
### Webpack 配置文件
Webpack4以后的版本支持零配置的方式直接启动打包，这个打包过程会按照约定将 'src/index.js' -> 'dist/main.js'，但是很多时候我们都需要自定义这些路径。项目代码

例如这个案例当中，入口就是src下的main.js，这时我们就需要专门为webpack添加专门的配置文件webpack.config.js，这个文件是一个运行在node环境当中的js文件，也就是说需要按照Common JS的方式去编写代码
```js
const path = require('path')

module.exports = {
  entry: './src/main.js', // 输入
  output: {
    filename: 'bundle.js', // 输出
    path: path.join(__dirname, 'output') // 输出目录(绝对路径 通过path转换)
  }
}
```

### Webpack 工作模式
Webpack4新增了一个工作模式的用发，这种用法大大简化了Webpack配置的复杂程度。可以理解成针对不同环境的几组预设配置。项目代码

我们注意到，打包过程中如果不设置mode，终端会打印出一段配置警告，大致意思是说我们没有去设置一个叫做mode的属性，Webpack会默认使用production模式去工作。在这个模式下面，Webpack会自动去启动一些优化插件，例如自动压缩代码，这对实际生产环境是非常友好的，但是打包结果无法阅读。

我们可以通过cli参数去指定打包模式，给webpack命令传入--mode参数。这个属性有三种取值：

production生产模式下，会自动启动优化优化打包结果。
development开发模式下，Webpack会自动优化打包速度，会添加一些调试过程中需要的辅助到代码当中
none模式下，Webpack就是运行最原始状态的打包，不会做任何额外的处理。
具体这三种模式的差异可以在官方文档中找到。

除了使用cli指定工作模式，我们还可以到配置文件中去设置工作模式
```js
module.exports = {
  // 这个属性有三种取值，分别是 production、development 和 none。
  mode: 'development',
  ...
}
```
### Webpack 打包结果运行原理
打开项目代码打包过后的bundle.js文件，通过ctrl+K ctrl+0把代码折叠起来以便我们对整体结构的了解

![](/images/web2.png)

我们可以看到，整体生成的代码是一个立即执行函数，这个函数是Webpack的工作入口，它接收modules参数，调用时传入一个数组。

展开这个数组，数组当中的每一个元素都是一个参数列表相同的函数，对应的函数就是源代码中的模块。也就是说，每一个模块最终都会被包裹到这样一个函数当中，从而去实现模块的私有作用域。

我们再来展开Webpack的工作入口函数，这个函数内部最开始先定义了一个对象用于去存放（缓存）我们加载过的模块。紧接着定义了一个require函数，顾名思义，这个函数就是用来加载模块的。再往后就是在require这个函数上挂在了一些其他的数据和一些工具函数。函数执行到最后它调用了require这个函数，传入0开始去加载模块。（这个地方的模块id实际就是上面的模块数组当中的元素下标，也就是说这里才开始加载源代码当中所谓的入口模块）

为了可以更好的理解，我们把它运行起来，通过浏览器的开发工具来单步调试一下

![](/images/web3.png)


在最开始的位置加上一个断点，然后刷新页面启动调试。

在函数一开始运行的时候，它接受到的应该是两个模块所对应的两个函数 

![](/images/web4.png)

在这个位置，它加载了id为0的模块，我们进入到这个require函数内部 

![](/images/web5.png)


 require函数内部先去判断模块有没有被加载过，如果加载了，就从缓存里面读，如果没有就创建一个新的对象 
 
 ![](/images/web6.png)
 
 
  紧接着调用了这个模块相对应的函数，把刚刚创建的模块对象还有导出成员对象以及require函数传入进去。这样在模块内部就可以使用module.xeports导出成员，通过Webpack的require载入模块 
  
 ![](/images/web7.png)
  
   我们进来，在模块内部，它先去调用了一个r函数，这个r函数内部作用就是用来给我们在导出对象上去添加一个标记，我们进去看一下 
   
  ![](/images/web8.png)
   
    进来过后，它实际上就是在导出对象上定义了一个__esModule的一个标记，定义完成过后这个导出对象上面就有了这样一个标记 
    
  ![](/images/web9.png)
    
     用来对外界表面这是一个ES Module，紧接着往下又调用了这个require函数，此时传入的id是1，也就是说去加载第一个模块，这个模块实际上就是我们在代码当中import的header。完成过后再去以相同的道理执行header模块 

  ![](/images/web10.png) 
     
     
     最后将header这个模块导出的整体的对象通过require函数return回去 
     
  ![](/images/web11.png)   
     
      module中的exports应该是一个对象，因为ES Module里面默认导出它是放在default上面。 
      
  ![](/images/web12.png)       
      
   此时将模块的导出对象拿到，然后访问里面的default。这个时候调用这个default函数，内部还是会调用内部模块的代码 
  
  ![](/images/web13.png)   
   
    最终将创建完的元素拿到并append到body上面 
  ![](/images/web15.png)
  
  ![](/images/web16.png)
   这实际上就是Webpack打包大致的运行过程。

![](/images/web14.png) 

我们可以看出来Webpack打包过后的代码并不会特别复杂，它只是说帮我们把所有的模块给放到了同一个文件当中。除此之外，它还提供了一些，让我们的模块与模块之间相互依赖的关系还可以保持原来的状态。


### 3.Webpack 插件机制 Plugin

插件机制是Webpack当中另外一个核心特性，目的是增强Webpack自动化能力。我们知道，Loader专注实现资源模块加载，从而实现整体项目的打包。

而Plugin解决其他自动化工作，例如Plugin可以帮我们去实现自动在打包之前清除dist目录、或是帮我们拷贝静态文件至输出目录，又或是帮我们压缩输出代码。

总之有了 Plugin 的 Webpack 实现大多前端工程化工作，这也正是很多初学者 "Webpack = 前端工程"的这种理解的原因。

### Webpack 自动清除输出目录插件 (clean-webpack-plugin)

Webpack 自动清除输出目录插件 (clean-webpack-plugin)
Webpack每次打包的结果都是覆盖到dist目录，而在打包之前，dist中就可能存在一些之前的遗留文件，我们只能覆盖掉同名文件，其他已经移除的资源文件就会一直积累在当中。因此我们需要一个自动清除输出目录的插件。

clean-webpack-plugin这个插件就很好地解决了这样一个问题，它是一个第三方插件。

```js
yarn add clean-webpack-plugin --dev
```
// webpack.config.js
```js
...
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  ...
  plugins: [ // 专门用于配置插件
    new CleanWebpackPlugin() // 创建一个实例
  ]
}
```



### Webpack 自动生成HTML插件 (html-webpack-plugin)

除此之外，还有一个常见的需求就是自动生成使用 bundle.js 的 HTML。

在此之前，我们的html都是通过硬编码的方式单独存放在项目的根目录下的，这种方式有两个问题：

第一就是我们在项目发布时，我们需要同时去发布根目录下的html文件和dist目录下所有的打包结果，相对麻烦。而且上线过后还需要去确保html代码中路径引用都是正确的。

第二个问题就是如果输出的目录也就是打包结果的配置发生变化的话，html代码当中script标签所引用的路径就需要手动去修改。

解决这两个问题最好的办法就是通过 Webpack 输出 HTML 文件
```js
yarn add html-webpack-plugin --dev
```
// webpack.config.js

```js
// 默认导出一个插件的类型，不需要解构内部成员
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...
  output: {
    ...
    // html是自动生成到dist目录 就不再需要此配置
    // publicPath: 'dist/'
  },
  ...
  plugins: [
    ...
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample', // 设置html标题
      meta: { // 设置对象中的元数据标签
        viewport: 'width=device-width'
      }
    })
  ]
}
```
如果需要对html文件进行大量的自定义的话，更好的做法是在源代码当中添加一个用于生成html文件的模板，让插件根据模板生成页面
```js
src/index.html

...
<head>
  ...
  <title>Webpack</title>
</head>
<body>
  <div class="container">
    <h1><%= htmlWebpackPlugin.options.title %></h1>
  </div>
</body>
</html>
```
// webpack.config.js

```js

module.exports = {
  ...
  plugins: [
    ...
    // 生成多个页面
    
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      template: './src/index.html' // 使用的模板地址
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html' // 指定输出文件名 默认值为index.html
    })
  ]
}
```


### Webpack 插件使用总结（copy-webpack-plugin）
项目中还有一些不需要参加构建的静态文件，我们希望Webpack在打包时可以一并将它们复制到输出目录，对于这种需求可以借助于 copy-webpack-plugin 实现
```js
yarn add copy-webpack-plugin --dev
```

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  ...
  plugins: [
   ...
    new CopyWebpackPlugin([
      // 'public/**' // 通配符
      'public' // 或目录
    ])
  ]
}
```
至此我们了解了三种插件，它们适用于任何类型的项目
clean-webpack-plugin
html-webpack-plugin
copy-webpack-plugin

### Webpack 开发一个 Plugin

- 相比于Loader，Plugin拥有更宽的能力范围。Loader只是在加载模块的环节工作，而插件的作用范围几乎可以触及到Webpack工作的每一个环节。

- Plugin 通过钩子机制实现(类似于事件)，为了便于插件的扩展，Webpack几乎给每一个环节都埋下了一个钩子，我们在去开发插件时就可以通过往这些不同的节点上挂载不同的任务

  ![](/images/web40.png)   

- Webpack要求每一个插件必须是一个函数或者是一个包含apply方法的对象。一般我们都会把这个插件定义为一个类型，然后在这个类型中定义一个apply方法。使用就是通过这个类型构建一个实例去使用。

- 通过在生命周期的钩子中挂载函数实现扩展

现在我们来开发一个Plugin，清除打包后的注释

```js
...

class MyPlugin {
  apply (compiler) {
    console.log('MyPlugin 启动')

    // emit钩子符合需求
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) { // 判断JS文件
          const contents = compilation.assets[name].source() // 获取文件内容
          const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
          compilation.assets[name] = { // 覆盖原有内容
            source: () => withoutComments, // 新内容
            size: () => withoutComments.length // Webpack要求返回大小
          }
        }
      }
    })
  }
}

module.exports = {
  ...
  plugins: [
    ...
    new MyPlugin()
  ]
}
```


## 4. Webpack 开发一个 Loader
这里我们来开发一个markdown-loader，希望有了这样一个加载器过后可以在代码中直接导入markdown文件。

Webpack加载资源的过程有点类似一个工作管道，你可以在这个过程当中依次使用多个loader 

 ![](/images/web41.png)   

 但是要求我们最终这个管道工作过后的结果必须是一段JavaScript代码。要么我们的loader直接返回一段JS代码，要么去找一个合适的加载器接着去处理我们这里返回的结果

 ![](/images/web42.png) 

 ![](/images/web43.png) 
 
  我们都知道，markdown文件一般是被转换为html过后再呈现到页面。我们先来安装一个markdown解析的模块marked
```js
yarn add marked --dev
```
// markdown-loader.js
const marked = require('marked') // 导入marked模块
```js
module.exports = source => {
  const html = marked(source) // 解析来自参数当中的source
  // return html // 需要返回js代码
  // return `module.exports = "${html}"` // 存在换行符、引号等丢失的问题
  // return `export default ${JSON.stringify(html)}` // 解决字符串的换行符、引号等问题

  // 返回 html 字符串交给下一个 loader 处理
  return html
}
```
安装一个用来处理html加载的loader
```js
yarn add html-loader --dev
```
// webpack.config.js

```js
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.md$/,
        use: [
          'html-loader',
          './markdown-loader' // 通过相对路径找到markdown-loader
        ]
      }
    ]
  }
}
```
Loader 负责资源文件从输入到输出的转换
对于同一个资源可以依次使用多个Loader