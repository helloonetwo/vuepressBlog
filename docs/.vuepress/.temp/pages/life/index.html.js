export const data = {
  "key": "v-14e6315a",
  "path": "/life/",
  "title": "",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 3,
      "title": "记录生活",
      "slug": "记录生活",
      "children": []
    }
  ],
  "filePathRelative": "life/README.md",
  "git": {
    "updatedTime": 1646234795000,
    "contributors": [
      {
        "name": "zhang",
        "email": "1774761877@qq.com",
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
