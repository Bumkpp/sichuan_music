import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'Login',
    component:()=>import("../pages/Login.vue")
  },
  {
    path:'/home',
    name:'Home',
    redirect:'/panel',
    component: () => import('../pages/Home.vue'),
    children:[
      {
        path:'/panel',
        component:() => import('../pages/panel/Panel.vue'),
        meta:{title:'节目填报'}
      },
      {
        path:'/setting',
        component:() => import('../pages/setting/Setting.vue'),
        meta:{title:'节目查看'}
      },
      {
        path:'/password',
        component:() => import('../pages/Password.vue'),
        meta:{title:'修改密码'}
      },
      {
        path:'/modify',
        name:'modify',
        component:() => import('../pages/modify.vue'),
        meta:{title:'填报信息修改'}
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
