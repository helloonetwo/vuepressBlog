### 原生js项目工程化性能优化

## js 分离

### entry 多页面入口
webpack.config.js
```js
 entry: {
    index: './src/index.js',
    login: './src/login.js',
  },
```
### 配置出口 output
filename 中的 [name] 对应入口的文件名；
```js
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, './dist')
  },
```
### 配置插件 htmlWebpackPlugin，生成多页面
htmlWebpackPlugin 插件会生成页面。
chunk 为代码块，默认引入 entry 中所有文件。
入口有几个页面就配置几个实例。
```js
   new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './src/login.html',
      chunks: ['login']
    }),
```

### 打包
打包后生成两个入口文件  index.html 和 login.html
index.html 引用 index.js  login.html  引用 login.js

```js
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>登录</title>
	<script defer src="js/login.js"></script></head>
	<body>
		<!-------------------login-------------------------->
		<div class="login">
			<form action="#" method="post">
				<h1><a href="index.html"><img src="../src/img/temp/logo.png"></a></h1>
				<p></p>
				<div class="msg-warn hide"><b></b>公共场所不建议自动登录，以防账号丢失</div>
				<p><input type="text" name="" value="" placeholder="昵称/邮箱/手机号"></p>
				<p><input type="text" name="" value="" placeholder="密码"></p>
				<p><input type="submit" name="" value="登  录"></p>
				<p class="txt"><a class="" href="reg.html">免费注册</a><a href="forget.html">忘记密码？</a></p>
			</form>
		</div>

	</body>
</html>
```

## CopyWebpackPlugin 插件
- 可以将某个目录下的文件内容复制到指定文件中
```js
const CopyPlugin = require("copy-webpack-plugin");
```

```js
 new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './src/img'), to: path.resolve(__dirname, './dist/img') },
      ],
    }),
```

##  配置devServer
```js
  devServer:{
    static:{
      directory:  path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
```


## 从bundle剥离css资源 CssMinimizerWebpackPlugin
 - 这个插件使用 cssnano 优化和压缩 CSS。就像 optimize-css-assets-webpack-plugin 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。
### 引入
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
```
### 剥离css
```js
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  }
```
### 引用
```js
  plugins: [
    .....
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].chunk.css'
   })
  ],
```    


## 压缩js
###  引入
```
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
```
###  使用
```js
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
      })
    ]
  }
```


## 压缩css
```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
```

```js
  optimization: {
    minimize: true,
    minimizer: [
      .....
      new CssMinimizerPlugin(),
    ]
  }
```

## Tree Shaking
> tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 静态结构 特性，例如 import 和 export。这个术语和概念实际上是由 ES2015 模块打包工具 rollup 普及起来的。

###  Tree Shaking触发条件
  -  通过解构的方式获取方法 可以触发
  -  调用的npm  必须使用Esm


## SplitChunksPlugin
> 开箱即用的 SplitChunksPlugin 对于大部分用户来说非常友好。

默认情况下，它只会影响到按需加载的 chunks，因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。

webpack 将根据以下条件自动拆分 chunks：

新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
当按需加载 chunks 时，并行请求的最大数量小于或等于 30
当加载初始化页面时，并发请求的最大数量小于或等于 30
当尝试满足最后两个条件时，最好使用较大的 chunks。

```js
  optimization: {
    ......
    splitChunks: {
      chunks: 'all',
      minSize: 300 * 1024,
      name: 'common'
    }
  }
```

### 针对某一个模块进行打包
```js
     cacheGroups: {
        jquery: {
           name: 'jquery',
           test: /jquery/,
           chunks: 'all'
        }
      }
```
此刻dist 文件下新生成一个jquery.js 的打包文件 

## 利用CleanWebpackPlugin清空dist目录
```js 
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  //清空打包文件
```
```js
new CleanWebpackPlugin()
```