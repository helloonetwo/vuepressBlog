### webpack简单使用

## 使用资源模块类型（asset module type）

```js
module.exports = {
  rules: [
    .....
    {
      //处理图片资源
      test: /\.(jpg|png|gif|jpeg)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024  //data转成url的条件，也就是转成bas64的条件,maxSize相当于limit
        }
      },
      generator: {
        //geneator中是个对象，配置下filename，和output中设置assetModuleFilename一样，将资源打包至imgs文件夹
        filename: "images/[name].[hash:6][ext]"  //[name]指原来的名字，[hash:6]取哈希的前六位，[ext]指原来的扩展名
      }
    }
  ],
};
```

## 使用html-webpack-plugin实现自动注入bundle
 - 先引入
 ```js
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 ```
 - 使用
 ```js
   plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html'
  })],
  ```

  code:
  ```
  const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html'
  })],
  module: {
    rules: [
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      },
      {                //处理图片资源                
        test: /\.(jpg|png|gif|jpeg|svg)$/i,
        //------使用webpack5内置的type                
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024  //data转成url的条件，也就是转成bas64的条件,maxSize相当于limit                   
          }
        },
        generator: {
          //geneator中是个对象，配置下filename，和output中设置assetModuleFilename一样，将资源打包至imgs文件夹                   
          filename: "images/[name].[hash:6][ext]"
          //[name]指原来的名字，[hash:6]取哈希的前六位，[ext]指原来的扩展名               
        }
      }
    ]
  },
};
```


## ProvidePlugin注入全局变量
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

```js
 plugins: [
     .....
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
```