import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/Welcome.vue'
import User from '@/views/user/User.vue'
import Rights from '@/views/right/rights'
import Roles from '@/views/right/roles'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [{
    name: 'default',
    path: '/',
    // 添加重定向
    redirect: {
      name: 'Login'
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    redirect: {
      name: 'Welcome'
    },
    children: [
      {
        name: 'Welcome',
        path: 'welcome',
        component: Welcome
      },
      {
        name: 'User',
        path: 'user',
        component: User
      },
      {
        name: 'Rights',
        path: 'rights',
        component: Rights
      },
      {
        name: 'Roles',
        path: 'roles',
        component: Roles
      }
    ]
  }
  ]
})
