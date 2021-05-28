import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Introduce from '@/views/Introduce.vue'
import AddGood from '@/views/AddGood.vue'
import Login from '@/views/Login.vue'
import Swiper from '@/views/Swiper.vue'
import IndexConfig from '@/views/IndexConfig.vue'
import Category from '@/views/Category.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    redirect: '/introduce'
  }, {
    path: '/introduce',
    name: 'introduce',
    component: Introduce
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: Index
  }, {
    path: '/add',
    name: 'add',
    component: AddGood
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/swiper',
    name: 'swiper',
    component: Swiper
  }, {
    path: '/hot',
    name: 'hot',
    component: IndexConfig
  }, {
    path: '/new',
    name: 'new',
    component: IndexConfig
  }, {
    path: '/recommend',
    name: 'recommend',
    component: IndexConfig
  }, {
    path: '/category',
    name: 'category',
    component: Category,
    children: [{
      path: '/category/level2',
      name: 'level2',
      component: Category
    }, {
      path: '/category/level3',
      name: 'level3',
      component: Category
    }]
  }]
})

export default router