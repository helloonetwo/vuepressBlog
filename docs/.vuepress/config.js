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
      { text: "前端基础", link: "/accumulate/" },
      { text: "大前端", link: "/algorithm/" },
      { text: "源码系列", link: "/hand/" },
      // {
      //   text: "个人组件库",
      //   link: "https://helloonetwo.github.io/xiao-ui-website",
      // },
      {
        text: '个人',
        ariaLabel: '个人Menu',
        items: [
          { text: '个人组件库', link: 'https://helloonetwo.github.io/xiao-ui-website' },
          { text: '个人工具类', link: 'https://www.npmjs.com/package/js-util-zhangxiaowei' }
        ]
      }
    ],
    sidebar: {
      "/accumulate/": [
        ""
      ],
      "/algorithm/": [
        {
          title: "JavaScript 深度剖析",
          children: ["", 'ECMAScript.md', "手写 Promie", "JS 异步编程", 'Event Loop.md', 'TypeScript.md'],
        },
      ],
      "/hand/": [
        "",
        "call",
        "手写 Promie",
        "手写 vue-router4"
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
