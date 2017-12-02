<template>
	<div class="seller" ref="seller">
    <div class="seller-wrapper">
      <div class="seller-reputation">
        <div class="infos-top border-1px">
          <div class="seller-stars">
            <h1 class="title">{{seller.name}}</h1>
            <v-star :size="36" :score="seller.score"></v-star>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}份</span>
          </div>
          <div class="collections" @click="switchCollect">
            <span class="icon-favorite" :class="{'active': isCollected}"></span>
            <span class="collected" ref="collected">{{collectSeller}}</span>
          </div>
        </div>
        <ul class="infos-bottom">
          <li class="item-wrapper">
            <p class="title">起送价</p>
            <p class="content"><span class="number">{{seller.minPrice}}</span>元</p>
          </li>
          <li class="item-wrapper">
            <p class="title">商家配送</p>
            <p class="content"><span class="number">{{seller.deliveryPrice}}</span>元</p>
          </li>
          <li class="item-wrapper">
            <p class="title">起送价</p>
            <p class="content"><span class="number">{{seller.deliveryTime}}</span>分钟</p>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <h1 class="bulletin-title">商家公告</h1>
        <p class="bulletin-text">{{seller.bulletin}}</p>
        <ul class="bulletin-item">
          <li v-for="item in seller.supports" class="item">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="supports-desc"> {{item.description}}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="seller-scenery">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics">
          <ul class="seller-image">
          <li v-for="item in seller.pics" class="image-item">
            <img :src="item" alt="" width="120" height="90">
          </li>
        </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-infos">
        <h1 class="title">商家信息</h1>
        <ul class="infos-list">
          <li v-for="info in seller.infos" class="infos-item">{{info}}</li>
        </ul>
      </div>
    </div>
	</div>
</template>
<script >
import BScroll from 'better-scroll';
import { setLocalStorage, getLocalStorage } from '../../common/js/store.js';
import star from '../star/star.vue';
import split from '../split/split.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      isCollected: (() => {
        return getLocalStorage(this.seller.id, 'isCollected', false);
      })(),
      collectedText: ''
    };
  },
  created () {
    this.$nextTick(() => {
      if (this.$refs.seller) {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      };
      if (this.$refs.pics) {
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.pics, {
            scrollX: true,
            eventPassThrough: 'vertical'
          });
        } else {
          this.picScroll.refresh();
        }
      };
    });
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed: {
    collectSeller () {
      return this.isCollected ? '已收藏' : '收藏商家';
    }
  },
  methods: {
    switchCollect () {
      this.isCollected = !this.isCollected;
      setLocalStorage(this.seller.id, 'isCollected', this.isCollected);
    }
  },
  components: {
    'v-star': star,
    'v-split': split
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
*
  box-sizing border-box
.seller
  height calc(100vh - 176px)
  overflow hidden
  .seller-wrapper
    .seller-reputation
      padding 18px
      .infos-top
        display flex
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        .collections
          flex 0 0 50px
          width 50px
          text-align center
          .icon-favorite
            display block
            font-size 24px
            line-height 24px
            color rgba(77,85,93,0.3)
          .active
            color rgb(240,20,20)
          .collected
            margin-top 4px
            font-size 10px
            line-height 10px
            color rgb(77,85,93)
        .seller-stars
          flex 1
          font-size 0
          .title
            margin-bottom 8px
            font-size 14px
            line-height 14px
            color rgb(7,17,27)
          .star
            display inline-block
            vertical-align top
          .rating-count,
          .sell-count
            font-size 10px
            line-height 18px
            color rgb(77,85,93)
            padding-left 8px
          .sell-count
            padding-left 12px
      .infos-bottom
        padding 18px 0
        display flex
        .item-wrapper
          flex 0 0 33.333%
          text-align center
          .title
            margin-bottom 4px
            font-size 10px
            line-height 10px
            color rgb(147,153,159)
          .content
            font-size 10px
            line-height 24px
            font-weight 200
            color rgb(7,17,27)
            .number
              font-size 24px
        .item-wrapper + .item-wrapper
          border-left 1px solid rgba(7,17,27,0.1)
    .bulletin
      padding 0 18px
      .bulletin-title
        padding 18px 0 8px 0
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .bulletin-text
        padding 0 12px 16px 12px
        line-height 24px
        font-size 12px
        font-weight 200
        color rgb(240,20,20)
      .bulletin-item
        .item
          padding 16px 12px
          border-top 1px solid rgba(7,17,27,0.1)
          font-size 0
          .icon
            display inline-block
            width 16px
            height 16px
            margin-right 6px
            vertical-align top
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_2')
            &.discount
              bg-image('discount_2')
            &.special
              bg-image('special_2')
            &.invoice
              bg-image('invoice_2')
            &.guarantee
              bg-image('guarantee_2')
          .supports-desc
            display inline-block
            font-size 12px
            font-weight 200
            line-height 16px
            color rgb(7,17,27)

    .seller-scenery
      padding 0 18px
      font-size 0
      .title
        padding 18px 0 12px 0
        font-size 14px
        line-height 14px
        color rgb(7,17,27)
      .pics-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .seller-image
          position relative
          width 499px
          height 90px
          margin-bottom 18px
          overflow hidden
          .image-item
            float left
            margin-right 6px
          .image-item:last-child
            margin-right 0
    .seller-infos
      padding 0 18px
      .title
        padding 18px 0 12px 0
      .infos-list
        .infos-item
          padding 16px 12px
          border-top 1px solid rgba(7,17,27,0.1)
          font-size 12px
          font-weight 200
          line-height 16px
          color rgb(7,17,27)


</style>
