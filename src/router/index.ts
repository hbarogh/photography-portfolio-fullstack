import { createRouter, createWebHistory} from 'vue-router';
import type {RouteRecordRaw} from 'vue-router';
import Home from '../views/Home.vue';
import Works from '../views/Works.vue';



import NotFoundPage from '../views/NotFoundPage.vue';
import AboutPage from '../views/AboutPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name:  'Home',
    component: Home
  },
  {
    path: '/Works',
    name: 'Works',
    component: Works,
  },
  {
    path: '/AboutPage',
    name: 'AboutPage',
    component: AboutPage,
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