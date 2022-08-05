### 项目自适应

::: tip
项目自适应
:::


##  下载 postcss-px2rem
```js
npm install postcss-px2rem -D
```

## 设置rem
在public/html  引入rem.js 文件
### rem.js
```js
// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}

```

### 配置
在vue.config.js 配置
```js
const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 32
})

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
}

```

这样我们就是可以看到不同的屏幕分辨率下， html 的fontSize 是不一样的， 同时将项目的px  转换为了rem 