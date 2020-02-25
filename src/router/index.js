import Vue from 'vue'
import VueRouter from 'vue-router'

import MainLayout from "@/layouts/MainLayout"
import PopupLayout from "@/layouts/PopupLayout"

Vue.use(VueRouter)

import firebase from 'firebase/app'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: PopupLayout },
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: PopupLayout },
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: { layout: MainLayout, auth: true },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: MainLayout, auth: true },
    component: () => import('@/views/Categories.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: { layout: MainLayout, auth: true },
    component: () => import('@/views/Record.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: MainLayout, auth: true },
    component: () => import('@/views/Planning.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: MainLayout, auth: true },
    component: () => import('@/views/History.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
