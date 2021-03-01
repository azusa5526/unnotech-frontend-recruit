import Vue from 'vue';
import VueRouter from 'vue-router';
import Books from '../views/Books.vue';
import BookDetail from '../views/BookDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/books'
  },
  {
    path: '/',
    redirect: '/books'
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    children: [
      {
        path: ':bookId',
        name: 'BookDetail',
        component: BookDetail
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

export default router;
