module.exports = {
  title: "张晓伟-技术文档",
  description: "Personal Website",
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    ["link", { rel: "icon", href: "/images/photo.jpg" }],
    ["link", { rel: "manifest", href: "/images/photo.jpg" }],
    ["link", { rel: "apple-touch-icon", href: "/images/photo.jpg" }],
    ["meta", { "http-quiv": "pragma", cotent: "no-cache" }],
    ["meta", { "http-quiv": "pragma", cotent: "no-cache,must-revalidate" }],
    ["meta", { "http-quiv": "expires", cotent: "0" }],
  ],
  serviceWorker: true, // 是否开启 PWA
  base: "/", // 部署到github相关的配置
  markdown: {
    lineNumbers: true, // 代码块是否显示行号
  },
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      // 导航栏配置
      { text: "吃透前端工程化", link: "/engineering/"},
      { text: "大前端", link: "/algorithm/" },
      { text: "系统分析师", link: "/system/" },
      { text: "源码系列", link: "/hand/" },
      { text: "js高级玩法", link: "/jsgaoji/" },
      { text: "设计模式", link: "/mode/" },
      { text: "前端发布脚手架", link: "/publish/" },
      { text: "web 前端架构师", link: "/web/" },
      // {
      //   text: "个人组件库",
      //   link: "https://helloonetwo.github.io/xiao-ui-website",
      // },
      {
        text: '个人',
        ariaLabel: '个人Menu',
        items: [
          { text: '个人组件库', link: 'https://helloonetwo.github.io/xiao-ui-website' },
          { text: '个人工具类', link: 'https://www.npmjs.com/package/js-util-zhangxiaowei' },
          { text: 'vue脚手架', link: 'https://www.npmjs.com/package/generator-zxw-vue' },
          { text: '自动化构建工作流', link: 'https://www.npmjs.com/package/zxw-pages' }
        ]
      }
    ],
    sidebar: {
      "/system/": [
        "",
        "计算机组成与系统.md"
      ],
      "/web/": [
        "B端项目需求分析 和 架构设计"
      ],
      "/mode/": [
        "",
        "设计模式.md"
      ],
      "/algorithm/": [
        {
          title: "JavaScript 深度剖析",
          children: ["", 'ECMAScript.md', "手写 Promie", "JS 异步编程", 'Event Loop.md', 'TypeScript.md', 'javascript性能优化.md'],
        },
        {
          title: "前端工程化实战",
          collapsable: true,
          children: [
            '脚手架工具.md',
            '自动化构建.md',
            '模块化开发.md',
            '规范化标准.md',
            'WebPack.md',
            'Rollup、Parcel 打包.md'
          ],
        },
        {
          title: "Vue.js 框架源码与进阶",
          collapsable: true,
          children: [
            '手写 Vue Router.md',
            '手写响应式实现.md',
            '手写虚拟 DOM 和 Diff 算法.md',
            'Vue源码-Virtual DOM.md',
            'Vuex 数据流管理及Vue.js 服务端渲染（SSR）.md',
            '搭建自己的SSR、静态站点生成（SSG）及封装 Vue.js 组件库.md',
            'Vue.js 3.0 Composition APIs 及 3.0 原理剖析.md',
            'Vue.js + TypeScript 实战项目开发与项目优化.md'
          ],
        },
        {
          title: "Node 全栈开发",
          collapsable: true,
          children: [
            'Node.js 高级编程',
            '手写响应式实现.md',
            '手写虚拟 DOM 和 Diff 算法.md',
            'Vue源码-Virtual DOM.md'
          ],
        },
      ],
      "/hand/": [
        "",
        "call",
        "手写 Promie",
        "手写 vue-router4"
      ],
      "/jsgaoji/": [
        "",
        "深入探索网络请求"
      ],
      "/engineering/": [
        "",
        "webpack简单使用.md",
        "原生js项目工程化性能优化.md",
        "vue-cli核心源码解析.md",
        "项目打包构建优化.md",
        "脚手架开发.md"
      ],
      "/publish/": [
        "",
        "深入探索网络请求"
      ],
      
    },
    sidebarDepth: 1,
  },
  plugins: [
    'reading-progress',
    '@vuepress/back-to-top',
    '@vuepress/nprogress',
    '@vuepress/active-header-links',
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
        content: "复制成功"
      }
    }],
    ['cursor-effects', {
      size: 2, // size of the particle, default: 2
      shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    }],
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: ['koharu', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'izumi', 'shizuku', 'wanko', 'miku', 'z16']
      }
    ],
    [
      '@vuepress-reco/vuepress-plugin-bgm-player',
      {
        audios: [
          {
            name: '강남역 4번 출구',
            artist: 'Plastic / Fallin` Dild',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
          },
          {
            name: '用胳膊当枕头',
            artist: '최낙타',
            url: 'https://assets.smallsunnyfox.com/music/3.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
          }
        ],
        // 是否默认缩小
        autoShrink: true,
        // 缩小时缩为哪种模式
        shrinkMode: 'float',
        // 悬浮窗样式
        floatStyle: { bottom: '10px', 'z-index': '999999' }
      }
    ]
  ]
};
