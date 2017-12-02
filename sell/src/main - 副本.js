// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Goods from './components/goods/Goods';
import Ratings from './components/ratings/Ratings';
import Seller from './components/seller/Seller';
// import router from './router';

Vue.use(VueRouter);

Vue.config.productionTip = false;

let app = Vue.extend(App);
let router = new VueRouter();
router.map({
  '/goods': {
    component: Goods
  },
  '/ratings': {
    component: Ratings
  },
  '/seller': {
    component: Seller
  }
});
router.start(app, '#app');

