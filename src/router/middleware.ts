// 将动态路由添加到路由表中
import { nextTick } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'

interface EagerLoadedFunc {
  default: RouteRecordRaw
}
type EagerLoadedModules = Record<string, EagerLoadedFunc>

// 1. 获取modules目录下所有的动态路由文件
const routeFiles: EagerLoadedModules = import.meta.glob('./modules/*.ts', { eager: true })

// 2. 初始化一个变量,保存遍历出来的路由
const routeConfiguras: RouteRecordRaw[] = []
// 3. 遍历所有文件的路由
Object.keys(routeFiles).forEach((routeModule: string) => {
  routeFiles[routeModule].default && routeConfiguras.push(routeFiles[routeModule].default)
})

// 4. 动态添加路由
export const useMiddleware = (router: Router) => {
  router.beforeEach((to, from, next) => {
    routeConfiguras.forEach((routeModule: RouteRecordRaw) => {
      router.addRoute(routeModule)
    })
    nextTick(() => {
      return next()
    })
  })
}
