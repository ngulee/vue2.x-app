<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script >
const ERR_OK = 0;
import header from './components/header/Header';
import {urlParse} from './common/js/toolUnit.js';

export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created () {
    this.$http.get('./api/seller?id=' + this.seller.id).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      };
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/minxin.styl'

#app
  .tab
    display: flex
    width: 100%
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      height: 40px
      line-height: 40px
      flex: 1
      text-align: center
      &>a
        display:block
        color:rgb(77, 85, 93)
        font-size:14px
      .router-link-exact-active
        color:rgb(240, 20, 20)

</style>

