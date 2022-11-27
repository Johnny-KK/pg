import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const menu: RouteRecordRaw[] = [
  { path: '/todo', name: 'todo', component: () => import('../views/todo/index.vue'), meta: { title: '待办' } },
  { path: '/novel', name: 'novel', component: () => import('../views/novel/novel-shelf.vue'), meta: { title: '小说' } },
  { path: '/wiki', name: 'wiki', component: () => import('../views/wiki/index.vue'), meta: { title: 'Wiki' } },
  { path: '/roadmap', name: 'roadmap', component: () => import('../views/roadmap/index.vue'), meta: { title: 'Roadmap' } },
];

const routes: RouteRecordRaw[] = [
  { path: '', redirect: '/todo' },
  { path: '/novel-view/:id', name: 'novel-view', component: () => import('../views/novel/novel-view.vue'), props: true },
  { path: '/novel-crypto', name: 'novel-crypto', component: () => import('../views/novel/novel-crypto.vue') },
  ...menu,
];

const router = createRouter({ history: createWebHashHistory(), routes });

export default router;

export { menu };
