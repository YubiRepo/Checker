import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login',
      icon: 'mdi-account',
      visible: true,
    },
    component: () => import('../views/auth/Login.vue')
  },

  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home',
    },

    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'Home',
          icon: 'mdi-view-dashboard',
          visible: true,
        },
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('CLEAR_ERRORS')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let auth = store.getters.isAuth
    if (!auth) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router



