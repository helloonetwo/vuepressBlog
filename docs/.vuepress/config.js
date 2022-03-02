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
    nav: [
      // 导航栏配置
      { text: "前端基础", link: "/accumulate/" },
      { text: "大前端", link: "/algorithm/" },
      { text: "诗和远方", link: "/life/" },
      { text: "个人组件库", link: "https://helloonetwo.github.io/xiao-ui-website" },
    ],
    sidebar: {
      '/accumulate/': [
        {
          title: '前端积累',
          children: [
            '/accumulate/1.html',
            '/accumulate/2.html',
            '/accumulate/3.html',
            '/accumulate/4.html',
            '/accumulate/5.html',
            '/accumulate/6.html',
            '/accumulate/7.html',
            '/accumulate/8.html',
            '/accumulate/9.html',
            '/accumulate/10.html',
            '/accumulate/11.html',
          ]
        }
      ],
      '/algorithm/': [
        // '/algorithm/',
        {
          title: 'JavaScript 深度剖析',
          children: [
            "",
            "手写 Promie",
            "JS 异步编程"
          ]
        },
        {
          title: '前端工程化实战',
          children: [
            '/algorithm/',

          ]
        },
        {
          title: 'Vue.js 框架源码与进阶',
          children: [
            '/algorithm/'
          ]
        }
      ],
      "/life/": [
        "",
        "魔都折叠",
        "莎翁的智慧"
      ]

    },
    // sidebar: "auto", // 侧边栏配置
    sidebarDepth: 1,
  },
};
