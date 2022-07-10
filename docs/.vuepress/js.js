const path = require("path");
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
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'public','assets')
      }
    }
  },
  themeConfig: {
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      // 导航栏配置
      { text: "吃透前端工程化", link: "/engineering/" },
      { text: "大前端", link: "/algorithm/" },
      { text: "系统分析师", link: "/system/" },
      { text: "源码系列", link: "/hand/" },
      { text: "数据可视化", link: "/guide/" },
      { text: "设计模式", link: "/mode/" },
      { text: "前端发布脚手架", link: "/publish/" },
      { text: "wy高级前端", link: "/wy/" },
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
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            ''
          ]
        },
        {
          title: '基础阶段',
          collapsable: false,
          children: [
            'guide/scene',
            'guide/tech',
            'guide/canvas',
            'guide/svg',
            'guide/webgl',
            'guide/zrender',
            'guide/d3',
            'guide/three',
            'guide/highcharts',
            'guide/antv',
            'guide/echarts',
            'guide/echarts-basic',
            'guide/compare',
            'guide/bmap',
            'guide/bmap-harder',
            'guide/bmap-datav',
            'guide/bmap-webpack',
            'guide/echarts-map',
            'guide/amap',
            'guide/amap-harder',
            'guide/amap-datav',
          ]
        },
        {
          title: '数据报表项目',
          collapsable: false,
          children: [
            'report/guide',
            'report/qa',
            'report/summary',
          ]
        },
        {
          title: '数据大屏项目',
          collapsable: false,
          children: [
            'screen/guide',
          ]
        },
        {
          title: '移动报表项目',
          collapsable: false,
          children: [
            'mobile/guide',
          ]
        },
        {
          title: 'api',
          collapsable: false,
          children: [
            'api/api',
          ]
        },
      ],
      "/wy/": [
        {
          title: '指南',
          collapsable: false,
          children: [
            ''
          ]
        },
        {
            title: "JavaScript进阶",
            collapsable: false,
            children: [
              ["jsadvanced/",'前言'],
              ["jsadvanced/function",'函数'],
              ["jsadvanced/asyncpro",'异步编程'],
              ["jsadvanced/designpattern",'设计模式'],
            ]
          },
          {
            title: "计算机网络",
            collapsable: false,
            children: [
              ["computerNetwork/protocal",'网络协议'],
              ["computerNetwork/network-actual",'网络请求实战'],
              ["computerNetwork/security",'网络安全与攻防'],
              ["computerNetwork/browser-status",'浏览器状态同步和路由'],
              ["computerNetwork/tools",'工具链和其他'],
            ]
          },
          {
            title: "Vue",
            collapsable: false,
            children: [
              ["vue/",'前言'],
              ["vue/vueBase",'vue基础'],
              ["vue/vueComponents",'探索vue的组件世界'],
              ["vue/sourceCode",'部分源码解析'],
              ["vue/serverSideRender",'服务端渲染']
            ]
          },
          {
            title: "Vue2.0源码",
            collapsable: false,
            children: [
              ["vue2.0/",'前言'],
              ["vue2.0/dataResponse",'响应式'],
              ["vue2.0/virtualdomAndDiff",'virtualdom和DIff']
            ]
          },
          {
            title: "react",
            collapsable: false,
            children: [
              ["react/",'入门介绍'],
              ["react/react-base",'步入react'],
              ["react/react-positive",'react正篇'],
              ["react/react-ecology",'react生态'],
              ["react/react-principle",'react原理'],
              ["react/react-state-mana",'react状态管理'],
              ["react/react-actualCombat",'react高级实战'],
              ["react/react-hooks",'react-hooks']
            ]
          },
          {
            title: "Node.js进阶",
            collapsable: false,
            children: [
              ["node/",'Node.js基础'],
              ["node/koa",'koa'],
              ["node/egg",'企业级框架egg'],
            ]
          },
          {
            title: "工程化",
            collapsable: false,
            children: [
              ["engineering/script",'脚本世界'],
              ["engineering/coding-standards",'规范先行'],
              ["engineering/quality-code",'质量代码'],
              ["engineering/design",'工程设计'],
              ["engineering/ctg-art",'构建艺术'],
              ["engineering/auto-deploy",'持续集成与部署'],
              ["engineering/git",'Git操作'],
              ["engineering/tool",'效率工具']
            ]
          },
          {
            title: "小程序",
            collapsable: false,
            children: [
              ["applets/performance",'小程序进阶'],
            ]
          },
          {
            title: "数据结构与算法",
            collapsable: false,
            children: [
              ["algorithm/complexity",'复杂度'],
              ["algorithm/dataStructure",'数据结构'],
              ["algorithm/thinking",'解题思路'],
              ["algorithm/sort",'排序算法专题'],
              ["algorithm/base",'真题'],
            ]
          },
          {
            title: "项目实战",
            collapsable: false,
            children: [
              ["projectPractice/isomorphism",'认识同构及原理'],
              ["projectPractice/demo",'实现一个同构的demo'],
              ["projectPractice/",'Nextjs']
            ]
          }
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
          title: "数据可视化",
          children: ["shuju.md"],
        },
        {
          title: "计算机网络",
          children: ['工具链及其他.md', "深入探索网络请求.md", "JS 异步编程", 'Event Loop.md', 'TypeScript.md', 'javascript性能优化.md'],
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
        "脚手架开发.md",
        "工程设计范式.md",
        "Git工程规范.md"
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
