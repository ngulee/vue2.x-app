// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

// import router from './router';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const Goods = { template: '<div>Goods</div>' };
const Ratings = { template: '<div>Ratings</div>' };
const Seller = { template: '<div>Seller</div>' };

const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
];

const router = new VueRouter({
  routes
});
const app = new Vue({
  router
}).$mount('#app');
