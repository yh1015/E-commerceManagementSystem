import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决路由连续点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const Login = () => import('views/login/Login')
const Home = () => import('views/home/Home')
const Welcome = () => import('views/home/childCpns/Welcome')
const Users = () => import('views/user/Users')
const Rights = () => import('views/power/Rights')
const Roles = () => import('views/power/Roles')
const Category = () => import('views/goods/Category')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/categories',
        component: Category
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由全局导航守卫
router.beforeEach((to, from, next) => {
  // to代表访问的路径
  // form代表从哪个路径跳转而来
  // next表示放行

  if (to.path === '/login') return next();
  // 获取token
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');
  next();
})

export default router
