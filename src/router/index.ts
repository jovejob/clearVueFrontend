// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: "/customers",
    name: "customers.index",
    component: () => import("@/views/customers/IndexView.vue"),
  },
  {
    path: "/customers/create",
    name: "customers.create",
    component: () => import("@/views/customers/CreateView.vue"),
  },
  {
    path: "/customers/edit/:id",
    name: "customers.edit",
    component: () => import("@/views/customers/EditView.vue"),
  },
  {
    path: "/circuits",
    name: "circuits.index",
    component: () => import("@/views/circuits/IndexView.vue"),
  },
  {
    path: "/circuits/create",
    name: "circuits.create",
    component: () => import("@/views/circuits/CreateView.vue"),
  },
  {
    path: "/circuits/edit/:id",
    name: "circuits.edit",
    component: () => import("@/views/circuits/EditView.vue"),
  },
  {
    path: "/meters",
    name: "meters.index",
    component: () => import("@/views/meters/IndexView.vue"),
  },
  {
    path: "/meters/create",
    name: "meters.create",
    component: () => import("@/views/meters/CreateView.vue"),
  },
  {
    path: "/meters/edit/:id",
    name: "meters.edit",
    component: () => import("@/views/meters/EditView.vue"),
  },
  {
    path: "/sites",
    name: "sites.index",
    component: () => import("@/views/sites/IndexView.vue"),
  },
  {
    path: "/sites/create",
    name: "sites.create",
    component: () => import("@/views/sites/CreateView.vue"),
  },
  {
    path: "/sites/edit/:id",
    name: "sites.edit",
    component: () => import("@/views/sites/EditView.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
