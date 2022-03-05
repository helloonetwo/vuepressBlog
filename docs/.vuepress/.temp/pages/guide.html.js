export const data = {
  "key": "v-5d7259d4",
  "path": "/guide.html",
  "title": "手把手教你使用 VuePress 搭建个人博客",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "手把手教你使用 VuePress 搭建个人博客",
    "sidebar": "auto",
    "sidebarDepth": 2
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "一、为什么你需要一个博客？",
      "slug": "一、为什么你需要一个博客",
      "children": []
    },
    {
      "level": 2,
      "title": "二、什么是 VuePress，为什么要使用 VuePress ？",
      "slug": "二、什么是-vuepress-为什么要使用-vuepress",
      "children": []
    },
    {
      "level": 2,
      "title": "三、开始搭建",
      "slug": "三、开始搭建",
      "children": [
        {
          "level": 3,
          "title": "创建项目文件夹",
          "slug": "创建项目文件夹",
          "children": []
        },
        {
          "level": 3,
          "title": "全局安装 VuePress",
          "slug": "全局安装-vuepress",
          "children": []
        },
        {
          "level": 3,
          "title": "进入 vuepressBlogDemo 文件夹，初始化项目",
          "slug": "进入-vuepressblogdemo-文件夹-初始化项目",
          "children": []
        },
        {
          "level": 3,
          "title": "创建文件夹和文件",
          "slug": "创建文件夹和文件",
          "children": []
        },
        {
          "level": 3,
          "title": "在 config.js 文件中配置网站标题、描述、主题等信息",
          "slug": "在-config-js-文件中配置网站标题、描述、主题等信息",
          "children": []
        },
        {
          "level": 3,
          "title": "在 package.json 文件里添加两个启动命令",
          "slug": "在-package-json-文件里添加两个启动命令",
          "children": []
        },
        {
          "level": 3,
          "title": "一切就绪 🎉 跑起来看看吧",
          "slug": "一切就绪-跑起来看看吧",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "四、一些小亮点",
      "slug": "四、一些小亮点",
      "children": [
        {
          "level": 3,
          "title": "代码块高亮",
          "slug": "代码块高亮",
          "children": []
        },
        {
          "level": 3,
          "title": "自定义容器",
          "slug": "自定义容器",
          "children": []
        },
        {
          "level": 3,
          "title": "支持 Emoji",
          "slug": "支持-emoji",
          "children": []
        },
        {
          "level": 3,
          "title": "支持 PWA",
          "slug": "支持-pwa",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "五、部署上线",
      "slug": "五、部署上线",
      "children": [
        {
          "level": 3,
          "title": "登陆 Github",
          "slug": "登陆-github",
          "children": []
        },
        {
          "level": 3,
          "title": "新建仓库一： USERNAME.github.io （不用克隆到本地）",
          "slug": "新建仓库一-username-github-io-不用克隆到本地",
          "children": []
        },
        {
          "level": 3,
          "title": "新建仓库二：随便起一个名字，比如：vuepressBlog （克隆到本地）",
          "slug": "新建仓库二-随便起一个名字-比如-vuepressblog-克隆到本地",
          "children": []
        },
        {
          "level": 3,
          "title": "修改仓库二中的 deploy.sh 发布脚本",
          "slug": "修改仓库二中的-deploy-sh-发布脚本",
          "children": []
        },
        {
          "level": 3,
          "title": "在 package.json 文件夹中添加发布命令（使用工具包的请忽略）",
          "slug": "在-package-json-文件夹中添加发布命令-使用工具包的请忽略",
          "children": []
        },
        {
          "level": 3,
          "title": "👏 大功告成，运行发布命令",
          "slug": "大功告成-运行发布命令",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "六、发布到自己的个人域名",
      "slug": "六、发布到自己的个人域名",
      "children": [
        {
          "level": 3,
          "title": "购买域名",
          "slug": "购买域名",
          "children": []
        },
        {
          "level": 3,
          "title": "修改仓库二中的 deploy.sh 文件",
          "slug": "修改仓库二中的-deploy-sh-文件",
          "children": []
        },
        {
          "level": 3,
          "title": "👏 大功告成，打开 https://www.zhangyunchen.cc 看一下吧~~~",
          "slug": "大功告成-打开-https-www-zhangyunchen-cc-看一下吧",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "七、最后",
      "slug": "七、最后",
      "children": []
    }
  ],
  "filePathRelative": "guide.md",
  "git": {
    "updatedTime": 1646210304000,
    "contributors": [
      {
        "name": "zhang",
        "email": "31178293+helloonetwo@users.noreply.github.com",
        "commits": 1
      }
    ]
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
