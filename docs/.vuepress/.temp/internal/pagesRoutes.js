import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-5d7259d4","/guide.html","手把手教你使用 VuePress 搭建个人博客",["/guide","/guide.md"]],
  ["v-8daa1a0e","/","",["/index.html","/README.md"]],
  ["v-39f08e74","/accumulate/","前端积累",["/accumulate/index.html","/accumulate/README.md"]],
  ["v-a1b16ff0","/algorithm/JS%20%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B.html","",["/algorithm/JS 异步编程.html","/algorithm/JS%20%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B","/algorithm/JS 异步编程.md","/algorithm/JS%20%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B.md"]],
  ["v-70bc2959","/algorithm/","",["/algorithm/index.html","/algorithm/README.md"]],
  ["v-200f62ab","/algorithm/%E6%89%8B%E5%86%99%20Promie.html","",["/algorithm/手写 Promie.html","/algorithm/%E6%89%8B%E5%86%99%20Promie","/algorithm/手写 Promie.md","/algorithm/%E6%89%8B%E5%86%99%20Promie.md"]],
  ["v-14e6315a","/life/","",["/life/index.html","/life/README.md"]],
  ["v-9012c57c","/life/%E8%8E%8E%E7%BF%81%E7%9A%84%E6%99%BA%E6%85%A7.html","",["/life/莎翁的智慧.html","/life/%E8%8E%8E%E7%BF%81%E7%9A%84%E6%99%BA%E6%85%A7","/life/莎翁的智慧.md","/life/%E8%8E%8E%E7%BF%81%E7%9A%84%E6%99%BA%E6%85%A7.md"]],
  ["v-576fcab4","/life/%E9%AD%94%E9%83%BD%E6%8A%98%E5%8F%A0.html","",["/life/魔都折叠.html","/life/%E9%AD%94%E9%83%BD%E6%8A%98%E5%8F%A0","/life/魔都折叠.md","/life/%E9%AD%94%E9%83%BD%E6%8A%98%E5%8F%A0.md"]],
  ["v-25b47c13","/others/","诗",["/others/index.html","/others/README.md"]],
  ["v-503d11fc","/guide/ts/test01.html","",["/guide/ts/test01","/guide/ts/test01.md"]],
  ["v-06710531","/guide/vue/test01.html","",["/guide/vue/test01","/guide/vue/test01.md"]],
  ["v-3706649a","/404.html","",["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
