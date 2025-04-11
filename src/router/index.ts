import { createRouter, createWebHistory} from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Western from '../views/Western.vue';



import NotFoundPage from '../views/NotFoundPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name:  'HomePage',
    component: HomePage
  },
  {
    path: '/Western',
    name: 'Western',
    component: Western,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: NotFoundPage
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 