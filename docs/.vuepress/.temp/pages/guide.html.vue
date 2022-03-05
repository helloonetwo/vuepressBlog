<template><h1 id="手把手教你使用-vuepress-搭建个人博客" tabindex="-1"><a class="header-anchor" href="#手把手教你使用-vuepress-搭建个人博客" aria-hidden="true">#</a> 手把手教你使用 VuePress 搭建个人博客</h1>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>有阅读障碍的同学，可以跳过第一至四节，下载我写好的<a href="https://github.com/zhangyunchencc/vuepress-devkit.git" target="_blank" rel="noopener noreferrer">工具包<OutboundLink/></a>:
<code>git clone https://github.com/zhangyunchencc/vuepress-devkit.git</code> 然后从第五节开始看。</p>
</div>
<h2 id="一、为什么你需要一个博客" tabindex="-1"><a class="header-anchor" href="#一、为什么你需要一个博客" aria-hidden="true">#</a> 一、为什么你需要一个博客？</h2>
<p>优秀的程序员都在写博客，写博客有很多好处：</p>
<ul>
<li>帮助自己梳理、总结、理解知识点（个人提升）</li>
<li>帮助别人理解知识点（好人一生平安）</li>
<li>简历更好看，更多面试机会（升职加薪）</li>
</ul>
<h2 id="二、什么是-vuepress-为什么要使用-vuepress" tabindex="-1"><a class="header-anchor" href="#二、什么是-vuepress-为什么要使用-vuepress" aria-hidden="true">#</a> 二、什么是 VuePress，为什么要使用 VuePress ？</h2>
<p><strong>VuePress</strong> 是尤雨溪（vue.js 框架作者）4月12日发布的一个全新的基于 vue 的静态网站生成器，实际上就是一个 vue 的 spa 应用，内置 webpack，可以用来写文档。详见 <a href="https://vuepress.docschina.org/" target="_blank" rel="noopener noreferrer">VuePress中文网<OutboundLink/></a></p>
<p>其实类似的建站工具有很多，比如 WordPress、Jekyll、Hexo 等，其中 WordPress 需要自己购买虚拟主机，不考虑；Jekyll 是 Github-Page 默认支持的，听说操作比较复杂，没有用过不做过多评价了；Hexo 之前一直在用，但一直觉得主题不好看，风格不够简洁优雅。自从遇见 VuePress，嗯，就是它了~</p>
<p>VuePress 有很多优点：</p>
<ul>
<li>界面简洁优雅（个人感觉比 HEXO 好看）</li>
<li>容易上手（半小时能搭好整个项目）</li>
<li>更好的兼容、扩展 Markdown 语法</li>
<li>响应式布局，PC端、手机端</li>
<li>Google Analytics 集成</li>
<li>支持 PWA</li>
</ul>
<h2 id="三、开始搭建" tabindex="-1"><a class="header-anchor" href="#三、开始搭建" aria-hidden="true">#</a> 三、开始搭建</h2>
<h3 id="创建项目文件夹" tabindex="-1"><a class="header-anchor" href="#创建项目文件夹" aria-hidden="true">#</a> 创建项目文件夹</h3>
<p>可以右键手动新建，也可以使用 mkdir 命令新建：</p>
<pre><code>mkdir vuepressBlogDemo
</code></pre>
<h3 id="全局安装-vuepress" tabindex="-1"><a class="header-anchor" href="#全局安装-vuepress" aria-hidden="true">#</a> 全局安装 VuePress</h3>
<pre><code>npm install -g vuepress
</code></pre>
<h3 id="进入-vuepressblogdemo-文件夹-初始化项目" tabindex="-1"><a class="header-anchor" href="#进入-vuepressblogdemo-文件夹-初始化项目" aria-hidden="true">#</a> 进入 vuepressBlogDemo 文件夹，初始化项目</h3>
<p>使用 <code>npm init</code> 或 <code>npm init -y</code>（默认yes）</p>
<pre><code>npm init -y
</code></pre>
<h3 id="创建文件夹和文件" tabindex="-1"><a class="header-anchor" href="#创建文件夹和文件" aria-hidden="true">#</a> 创建文件夹和文件</h3>
<p>在 vuepressBlogDemo 文件夹中创建 docs 文件夹，在 docs 中创建 .vuepress 文件夹，在.vuepress中创建 public 文件夹和 config.js 文件，最终项目结构如下所示：</p>
<pre><code>vuepressBlogDemo
├─── docs
│   ├── README.md
│   └── .vuepress
│       ├── public
│       └── config.js
└── package.json
</code></pre>
<h3 id="在-config-js-文件中配置网站标题、描述、主题等信息" tabindex="-1"><a class="header-anchor" href="#在-config-js-文件中配置网站标题、描述、主题等信息" aria-hidden="true">#</a> 在 config.js 文件中配置网站标题、描述、主题等信息</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">'Chen\'s blog'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">description</span><span class="token operator">:</span> <span class="token string">'我的个人网站'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// 注入到当前页面的 HTML &lt;head> 中的标签</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'icon'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/logo.jpg'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 增加一个自定义的 favicon(网页标签的图标)</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">base</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token comment">// 这是部署到github相关的配置</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">lineNumbers</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 代码块显示行号</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">themeConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">nav</span><span class="token operator">:</span><span class="token punctuation">[</span> <span class="token comment">// 导航栏配置</span>
      <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'前端基础'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/accumulate/'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'算法题库'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'/algorithm/'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span> <span class="token string">'微博'</span><span class="token punctuation">,</span> <span class="token literal-property property">link</span><span class="token operator">:</span> <span class="token string">'https://baidu.com'</span><span class="token punctuation">}</span>      
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sidebar</span><span class="token operator">:</span> <span class="token string">'auto'</span><span class="token punctuation">,</span> <span class="token comment">// 侧边栏配置</span>
    <span class="token literal-property property">sidebarDepth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 侧边栏显示2级</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="在-package-json-文件里添加两个启动命令" tabindex="-1"><a class="header-anchor" href="#在-package-json-文件里添加两个启动命令" aria-hidden="true">#</a> 在 package.json 文件里添加两个启动命令</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
  <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="一切就绪-跑起来看看吧" tabindex="-1"><a class="header-anchor" href="#一切就绪-跑起来看看吧" aria-hidden="true">#</a> 一切就绪 🎉 跑起来看看吧</h3>
<pre><code>npm run dev
</code></pre>
<h2 id="四、一些小亮点" tabindex="-1"><a class="header-anchor" href="#四、一些小亮点" aria-hidden="true">#</a> 四、一些小亮点</h2>
<p>完成了基础搭建后，就可以在docs目录下新建 <code>.md</code> 文件写文章了（.md 是 Markdown 语法文件，你需要知道 Markdown 的一些基本写法，很简单，这里给大家一份 <a href="https://www.jianshu.com/p/b03a8d7b1719" target="_blank" rel="noopener noreferrer">Markdown 语法整理大集合<OutboundLink/></a>）</p>
<p>下面给大家安利一些实用的方法。</p>
<h3 id="代码块高亮" tabindex="-1"><a class="header-anchor" href="#代码块高亮" aria-hidden="true">#</a> 代码块高亮</h3>
<p>在 .md 文件中书写代码时，可在 ``` 后增加 js、html、json等格式类型，代码块即可按照指定类型高亮</p>
<p>代码：</p>
<pre class="language-text"><code>``` js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```</code></pre>
<p>效果：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">'Highlighted!'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="自定义容器" tabindex="-1"><a class="header-anchor" href="#自定义容器" aria-hidden="true">#</a> 自定义容器</h3>
<p>代码：</p>
<pre><code>::: tip 提示
this is a tip
:::

::: warning 注意
this is a tip
:::

::: danger 警告
this is a tip
:::
</code></pre>
<p>效果：</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>this is a tip</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>this is a tip</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>this is a tip</p>
</div>
<h3 id="支持-emoji" tabindex="-1"><a class="header-anchor" href="#支持-emoji" aria-hidden="true">#</a> 支持 Emoji</h3>
<p>代码：</p>
<pre><code>:tada: :100: :bamboo: :gift_heart: :fire:
</code></pre>
<p>效果：
🎉 💯 🎍 💝 🔥</p>
<p>👉 这里有一份 <a href="https://www.webpagefx.com/tools/emoji-cheat-sheet/" target="_blank" rel="noopener noreferrer">Emoji 大全<OutboundLink/></a></p>
<h3 id="支持-pwa" tabindex="-1"><a class="header-anchor" href="#支持-pwa" aria-hidden="true">#</a> 支持 PWA</h3>
<p>VuePress 默认支持 <a href="https://segmentfault.com/a/1190000012353473" target="_blank" rel="noopener noreferrer">PWA<OutboundLink/></a>，配置方法如下：</p>
<p>config.js 文件中增加</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// 注入到当前页面的 HTML &lt;head> 中的标签</span>
  <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'manifest'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/photo.jpg'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">'apple-touch-icon'</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">'/photo.jpg'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token literal-property property">serviceWorker</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 是否开启 PWA</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>public 文件夹下新建 manifest.json 文件，添加</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span>
  <span class="token property">"short_name"</span><span class="token operator">:</span> <span class="token string">"张三"</span><span class="token punctuation">,</span>
  <span class="token property">"start_url"</span><span class="token operator">:</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span>
  <span class="token property">"display"</span><span class="token operator">:</span> <span class="token string">"standalone"</span><span class="token punctuation">,</span>
  <span class="token property">"background_color"</span><span class="token operator">:</span> <span class="token string">"#2196f3"</span><span class="token punctuation">,</span>
  <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"张三的个人主页"</span><span class="token punctuation">,</span>
  <span class="token property">"theme_color"</span><span class="token operator">:</span> <span class="token string">"blue"</span><span class="token punctuation">,</span>
  <span class="token property">"icons"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"src"</span><span class="token operator">:</span> <span class="token string">"./photo.jpg"</span><span class="token punctuation">,</span>
      <span class="token property">"sizes"</span><span class="token operator">:</span> <span class="token string">"144x144"</span><span class="token punctuation">,</span>
      <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"image/png"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"related_applications"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"platform"</span><span class="token operator">:</span> <span class="token string">"web"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      <span class="token property">"platform"</span><span class="token operator">:</span> <span class="token string">"play"</span><span class="token punctuation">,</span>
      <span class="token property">"url"</span><span class="token operator">:</span> <span class="token string">"https://play.google.com/store/apps/details?id=cheeaun.hackerweb"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>最后在 iPhone 的 safrai 浏览器中打开本网站，点击 <code>+添加到主屏幕</code> 就能在桌面看到一个像原生 App 一样的图标（感觉自己写了一个 App 有木有 😄）</p>
<h2 id="五、部署上线" tabindex="-1"><a class="header-anchor" href="#五、部署上线" aria-hidden="true">#</a> 五、部署上线</h2>
<p>说了这么多都是在本地进行的，现在我们要把本地的内容推送到某个服务器上，这样只要有网络，就可以随时随地看自己的网站了。</p>
<p>一般来说，有两种方案可供选择：</p>
<ol>
<li>自己买一个服务器，阿里云、腾讯云等，这种方式的好处是速度有保证、可以被搜索引擎收录，坏处是要花钱啊 💰 土豪同学可以考虑。</li>
<li>使用 <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">Github Pages<OutboundLink/></a> 。什么是 Github Pages 呢？简单说就是 Github 提供的、用于搭建个人网站的静态站点托管服务。很多人用它搭建个人博客。这种方式的好处是免费、方便，坏处是速度可能会有些慢、不能被国内的搜索引擎收录。</li>
</ol>
<p>最终我选择了方案2，下面将给大家讲解如何使用 Github Pages 服务。</p>
<h3 id="登陆-github" tabindex="-1"><a class="header-anchor" href="#登陆-github" aria-hidden="true">#</a> 登陆 <a href="https://github.com/" target="_blank" rel="noopener noreferrer">Github<OutboundLink/></a></h3>
<p>打开 github 网站，登陆自己的 github 账号（没有账号的快去注册并面壁思过作为一个优秀的程序员为啥连一个github账号都没有）</p>
<p>接着我们新建两个仓库：</p>
<h3 id="新建仓库一-username-github-io-不用克隆到本地" tabindex="-1"><a class="header-anchor" href="#新建仓库一-username-github-io-不用克隆到本地" aria-hidden="true">#</a> 新建仓库一： USERNAME.github.io （不用克隆到本地）</h3>
<p><b>！！！注意：USERNAME 必须是你 Github 的账号名称，不是你的名字拼音，也不是你的非主流网名，不要瞎起，要保证和Github账号名一模一样！</b></p>
<p>例如我的 Github 账号名称是 zhangyunchencc</p>
<p><img src="/images/eg13.png" alt=""></p>
<p>那么新建仓库，Repository name 就填写为：zhangyunchencc.github.io</p>
<p><img src="/images/eg14.png" alt=""></p>
<p><b>这个仓库建好后，不用克隆到本地，内容更新修改都在仓库二中进行。</b></p>
<h3 id="新建仓库二-随便起一个名字-比如-vuepressblog-克隆到本地" tabindex="-1"><a class="header-anchor" href="#新建仓库二-随便起一个名字-比如-vuepressblog-克隆到本地" aria-hidden="true">#</a> 新建仓库二：随便起一个名字，比如：vuepressBlog （克隆到本地）</h3>
<p>这个项目是用来开发博客的，以后只需要改这个项目就够了。</p>
<ul>
<li>
<p>使用工具包的，将 <a href="https://github.com/zhangyunchencc/vuepress-devkit.git" target="_blank" rel="noopener noreferrer">vuepress-devkit<OutboundLink/></a> 中的内容拷贝到 vuepressBlog 文件夹中</p>
</li>
<li>
<p>自己从头搭建的，将 vuepressBlogDemo 文件夹的内容拷贝到仓库二，并在根目录下创建 deploy.sh 文件，内容如下：</p>
</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># 如果是发布到自定义域名</span>
<span class="token comment"># echo 'www.yourwebsite.com' > CNAME</span>

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -m <span class="token string">'deploy'</span>

<span class="token comment"># 如果你想要部署到 https://USERNAME.github.io</span>
<span class="token function">git</span> push -f git@github.com:USERNAME/USERNAME.github.io.git master

<span class="token comment"># 如果发布到 https://USERNAME.github.io/&lt;REPO>  REPO=github上的项目</span>
<span class="token comment"># git push -f git@github.com:USERNAME/&lt;REPO>.git master:gh-pages</span>

<span class="token builtin class-name">cd</span> -
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="修改仓库二中的-deploy-sh-发布脚本" tabindex="-1"><a class="header-anchor" href="#修改仓库二中的-deploy-sh-发布脚本" aria-hidden="true">#</a> 修改仓库二中的 deploy.sh 发布脚本</h3>
<p>把文件中的 USERNAME 改成 Github 账号名，例如我的账号名是 zhangyunchencc，那么就可以改为：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如果你想要部署到 https://USERNAME.github.io</span>
<span class="token function">git</span> push -f git@github.com:zhangyunchencc/zhangyunchencc.github.io.git master
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这样仓库二和仓库一就建立了关联。</p>
<p>简单说二者的关系是：仓库一负责显示网站内容，我们不需要改动它；日常开发和新增内容，都在仓库二中，并通过 npm run deploy 命令，将代码发布到仓库一。</p>
<h3 id="在-package-json-文件夹中添加发布命令-使用工具包的请忽略" tabindex="-1"><a class="header-anchor" href="#在-package-json-文件夹中添加发布命令-使用工具包的请忽略" aria-hidden="true">#</a> 在 package.json 文件夹中添加发布命令（使用工具包的请忽略）</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  <span class="token property">"deploy"</span><span class="token operator">:</span> <span class="token string">"bash deploy.sh"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="大功告成-运行发布命令" tabindex="-1"><a class="header-anchor" href="#大功告成-运行发布命令" aria-hidden="true">#</a> 👏 大功告成，运行发布命令</h3>
<pre><code>npm run deploy
</code></pre>
<p>此时打开 Github Settings 中下面的链接: <a href="https://zhangyunchencc.github.io/" target="_blank" rel="noopener noreferrer">https://zhangyunchencc.github.io/<OutboundLink/></a> 即可看到自己的主页啦~</p>
<p><img src="/images/eg2.png" alt=""></p>
<h4 id="pc-端页面是这样的" tabindex="-1"><a class="header-anchor" href="#pc-端页面是这样的" aria-hidden="true">#</a> PC 端页面是这样的：</h4>
<p><img src="/images/eg3.png" alt=""></p>
<h4 id="手机端页面是这样的" tabindex="-1"><a class="header-anchor" href="#手机端页面是这样的" aria-hidden="true">#</a> 手机端页面是这样的：</h4>
<p><img src="/images/eg4.png=200x" alt="">
<img src="/images/eg4.png" style="width: 50%; display: block; margin: 0 auto;"></p>
<p>可以看到导航栏变成了左上角的小图标，可以打开和收起。</p>
<h2 id="六、发布到自己的个人域名" tabindex="-1"><a class="header-anchor" href="#六、发布到自己的个人域名" aria-hidden="true">#</a> 六、发布到自己的个人域名</h2>
<p>如果你不满足于 https://zhangyunchencc.github.io/ 这样的域名，想要一个自己个人的专属域名，比如 http://www.zhangyunchen.cc/ ，毕竟一些大牛（阮一峰 <a href="http://www.ruanyifeng.com/blog/" target="_blank" rel="noopener noreferrer">http://www.ruanyifeng.com/blog/<OutboundLink/></a>） 都是自己名字的网址哦，很方便很酷呢 😎</p>
<p>下面跟着步骤一步步来就好啦~</p>
<h3 id="购买域名" tabindex="-1"><a class="header-anchor" href="#购买域名" aria-hidden="true">#</a> 购买域名</h3>
<p>推荐在 <a href="http://www.xinnet.com/domain/domain.html" target="_blank" rel="noopener noreferrer">新网<OutboundLink/></a> 或 <a href="https://wanwang.aliyun.com/" target="_blank" rel="noopener noreferrer">万网<OutboundLink/></a> 购买。</p>
<p>我是在新网购买的，下面以新网为例，万网是类似的。</p>
<p>购买完成后进入管理后台，点击 ”解析“ 按钮，添加下面两条内容：
<img src="/images/eg5.png" alt=""></p>
<p><img src="/images/eg6.png" alt=""></p>
<div class="custom-container warning"><p class="custom-container-title">注意！这里有坑：</p>
<p>在 万网 购买域名的同学请注意，第二条记录中的 * 请用 @ 代替，万网不支持 *</p>
</div>
<p>记录值里的 IP 可以通过 ping Github 的域名得到：</p>
<pre><code>ping www.username.github.io
</code></pre>
<h3 id="修改仓库二中的-deploy-sh-文件" tabindex="-1"><a class="header-anchor" href="#修改仓库二中的-deploy-sh-文件" aria-hidden="true">#</a> 修改仓库二中的 deploy.sh 文件</h3>
<p>将仓库二中的 deploy.sh 文件的第 13 行反注释掉，并填上自己的域名，deploy.sh 文件的最终版：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># 确保脚本抛出遇到的错误</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># 生成静态文件</span>
<span class="token function">npm</span> run build

<span class="token comment"># 进入生成的文件夹</span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># 如果是发布到自定义域名</span>
<span class="token builtin class-name">echo</span> <span class="token string">'www.zhangyunchen.cc'</span> <span class="token operator">></span> CNAME

<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -m <span class="token string">'deploy'</span>

<span class="token comment"># 如果你想要部署到 https://&lt;USERNAME>.github.io</span>
<span class="token function">git</span> push -f git@github.com:zhangyunchencc/zhangyunchencc.github.io.git master

<span class="token comment"># 如果发布到 https://&lt;USERNAME>.github.io/&lt;REPO>  REPO=github上的项目</span>
<span class="token comment"># git push -f git@github.com:&lt;USERNAME>/vuepress.git master:gh-pages</span>

<span class="token builtin class-name">cd</span> -

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>此时，我们运行 npm run deploy 即可发布到自己的专属域名啦~</p>
<h3 id="大功告成-打开-https-www-zhangyunchen-cc-看一下吧" tabindex="-1"><a class="header-anchor" href="#大功告成-打开-https-www-zhangyunchen-cc-看一下吧" aria-hidden="true">#</a> 👏 大功告成，打开 <a href="https://www.zhangyunchen.cc" target="_blank" rel="noopener noreferrer">https://www.zhangyunchen.cc<OutboundLink/></a> 看一下吧~~~</h3>
<p>拥有自己专属域名的个人博客感觉很酷哦~</p>
<p>写一些文章，记录一点生活，把自己的网站发给同学朋友看看吧！ 😎</p>
<h2 id="七、最后" tabindex="-1"><a class="header-anchor" href="#七、最后" aria-hidden="true">#</a> 七、最后</h2>
<ul>
<li>你需要一些 <a href="https://www.jianshu.com/p/b03a8d7b1719" target="_blank" rel="noopener noreferrer">Markdown<OutboundLink/></a> 语法的基础知识；</li>
<li>你需要一个 <a href="https://github.com/" target="_blank" rel="noopener noreferrer">Github<OutboundLink/></a> 账号，并在里面创建两个 repo；</li>
<li>Github 需要添加 ssh key，第一次使用的同学遇到问题可以百度解决；</li>
<li>个人博客不只可以用来写技术相关的内容，也可以有自己写的文章、随笔，甚至上传一些照片。</li>
</ul>
<p>我的 <a href="https://github.com/zhangyunchencc/vuepress-devkit.git" target="_blank" rel="noopener noreferrer">vuepress-devkit<OutboundLink/></a> 已经开源放在了 Github 上，还有很多想要增加的功能，例如添加评论模块、自动生成侧边栏目录、增加网站分析工具等等，在这里欢迎大家 Star 或者 Fork 。</p>
<p>以上，</p>
<p>张韵晨 | Front End Engineer | 2018.10</p>
</template>
