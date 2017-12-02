// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';
import Goods from './components/goods/Goods';
import Ratings from './components/ratings/Ratings';
import Seller from './components/seller/Seller';
import './common/stylus/index.styl';
Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/seller', component: Seller }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    // 定义全局事件广播，在任意的子组件中可以通过this.$root.eventHub.$emit()派发事件，通过this.$root.eventHub.$on()监听事件。
    eventHub: new Vue()
  },
  template: '<App/>',
  components: { App },
  router: router
}).$mount('#app');
router.push('./goods');
