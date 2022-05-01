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