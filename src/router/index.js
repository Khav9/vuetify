import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/layout',
    component: () => import('@/views/layout/Layout.vue'),
    // redirect: { name: 'home' },
    // To ensure that when navigating to child routes,
    // Stay within the parent route, you can set up your routes to be nested properly.
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/ProfileLayout.vue'),
        redirect: { name: 'profile' },
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: () => import('@/views/user/Profile.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'my-save',
            name: 'my-save',
            component: () => import('@/views/user/MySave.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'my-summary',
            name: 'my-summary',
            component: () => import('@/views/user/MyCart.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'my-post',
            name: 'my-post',
            component: () => import('@/views/user/MyPost.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'my-follower',
            name: 'my-follower',
            component: () => import('@/views/user/MyFollower.vue'),
            meta: { requiresAuth: true }
          },
          {
            path: 'my-following',
            name: 'my-following',
            component: () => import('@/views/user/MyFollowing.vue'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/courses/Course.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const { isAuthenticated } = checkAuth()
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//   // const requiredRole = to.meta.requiredRole

//   if (requiresAuth && !isAuthenticated) {
//     next('/home')
//     localStorage.removeItem('authToken')
//   }
//   else {
//     next()
//   }
// })

// function checkAuth() {
//   const token = localStorage.getItem('authToken')
//   return { isAuthenticated: !!token}
// }

export default router
