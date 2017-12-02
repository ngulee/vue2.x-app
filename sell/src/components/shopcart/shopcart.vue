<template>
  <div class="shopcart">
    <div class="content-left">
      <div class="logo-wrapper " @click="toggleList">
        <div class="shopcart-logo" :class="{'hightlight': totalCount > 0}" >
          <i class="icon-shopping_cart" :class="{'hightlight': totalCount > 0}"></i>
        </div>
        <div v-show="totalCount>0" class="totalNum">
          {{totalCount}}
        </div>
      </div>
      <div class="desc">
        <div class="shopcart-price">
          <div class="price" :class="{'hightlight': totalCount > 0}">
            ￥{{totalPrice}}
          </div>
        </div>
        <div class="delivery-price">
          <div  class="price" >
            另需配送费￥{{deliveryPrice}}元
          </div>
        </div>
      </div>
    </div>
    <div class="content-right" :class="{'toPay': totalPrice >= 20}" @click="pay">
      <span  class="min-price" >
        {{differencePrice}}
      </span>
    </div>

    <div class="shopcart-details" v-show="shopcartShow" @click="hideList">
      <transition name="fold">
        <div v-show="shopcartShow" class="details-container">
          <div class="details-header">
          <div class="header-left">
            购物车
          </div>
          <div class="clear-shopcart" @click="emptyCart">
            清空
          </div>
        </div>
          <div class="details-content" ref="detailsContent">
            <ul>
            <li v-for="food in selectFoods" class="shopcart-list border-1px">
              <div class="foodDesc-container">
                <div class="food-name">
                  {{food.name}}
                </div>
                <div class="food-price-container">
                  <span class="yuan">￥</span>
                  <span class="food-price">
                  {{food.price * food.count}}
                  </span>
                </div>
              </div>
              <div class="cartcontrol-container">
                 <v-cartcontrol :food="food"></v-cartcontrol>
               </div>
            </li>
          </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      shopcartShow: false
    };
  },
  computed: {
    totalPrice () {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount () {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    differencePrice () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice >= 20) {
        return '去结算';
      } else {
        return `还差￥${this.minPrice - this.totalPrice}元起送`;
      }
    }
  },
  components: {
    'v-cartcontrol': cartcontrol
  },
  methods: {
    toggleList () {
      if (this.totalCount > 0) {
        this.shopcartShow = !this.shopcartShow;
      }
      if (this.shopcartShow) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.detailsContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
    },
    hideList () {
      this.shopcartShow = false;
    },
    emptyCart () {
      this.selectFoods.forEach((food) => {
        food.count = 0;
      });
      this.shopcartShow = false;
    },
    pay () {
      alert(`总共需要支付${this.totalPrice + 4}元`);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
*
 box-sizing border-box
.shopcart
  position fixed
  display flex
  width 100%
  bottom 0;
  color rgba(255,255,255,.5)
  background-color #2B343B
  z-index: 99
  .content-right
    flex 0 0 105px
    text-align center
    z-index 29
    @media (min-device-width:375px )
      flex 0 0 125px
    width 105px
    background-color #2B343B
    .min-price
      color #8B8F92
      line-height 56px
      font-size 12px
      font-weight 700
      @media (min-device-width:330px )
        font-size 16px
    &.toPay
      background-color #00b43c
      .min-price
        color #fff
  .content-left
    position relative
    display flex
    flex 1
    background-color #141d27
    z-index 29
    .logo-wrapper
      position relative
      display table
      width 56px
      height 56px
      top -10px
      left 12px
      border-radius 50%
      flex 0 0 56px
      background-color #141d27
      padding 6px
      .shopcart-logo
        display table-cell
        width 44px
        height 44px
        border-radius 50%
        background-color #2B343B
        vertical-align middle
        text-align center
        color orange
        &.hightlight
          background-color rgb(0, 160, 220)
        .icon-shopping_cart
          color #8B8F92
          font-size 24px
          &.hightlight
            color #fff
      .totalNum
        position absolute
        background-color rgb(240,20,20)
        min-width 24px
        padding 0 5px
        height 16px
        top 0
        left 50%
        line-height 16px
        font-size 9px
        font-weight 700
        color #fff
        border-radius 12px
        text-align center
        box-shadow 0 4px 8px 0 rgba(0, 0, 0, .4)
    .desc
      display flex
      flex 1
      height 100%
      margin-left 10px
      .shopcart-price
        margin 12px 0
        flex 0 0 49px
        width 49px
        line-height 32px
        border-right 1px solid rgba(255,255,255,0.1)
        padding-right 16px
        @media (min-device-width:330px )
          padding-right 12px
        .price
          width 46px
          font-size 14px
          font-weight 700
          text-align center
          margin-right 5px
          @media (min-device-width:330px )
            font-size 16px
          &.hightlight
            color #fff
      .delivery-price
        flex 1
        line-height 56px
        font-size 12px
        @media (min-device-width:330px )
          font-size 16px
        .price
          font-size 12px
          text-align center
          @media (min-device-width:330px )
            font-size 16px




  .shopcart-details
    position: fixed
    bottom 100px
    width 100vw
    height 100vh
    z-index 19
    bottom 0
    background rgba(7, 17, 27, .8)
    backdrop-filter blur(10px)

    .details-container
      position absolute
      bottom -20px
      height 305px
      background #fff
      overflow hidden
      .details-header
        display flex
        width 100vw
        height 40px
        padding 0 18px
        background-color #f3f5f7
        border-bottom 2px solid #D9DDE0
        .header-left,.clear-shopcart
          flex 1 1 100%
          height 40px
          line-height 40px
        .header-left
          font-size 14px
          font-weight 200
          color rgb(7,17,27)
        .clear-shopcart
          color: rgb(0, 160, 220)
          font-size 12px
          text-align right
      .details-content
        width 100vw
        max-height 265px
        overflow hidden
        color black
        background-color #fff
        .shopcart-list
          position: relative
          display flex
          height 48px
          line-height 48px
          padding 0 12px
          border-1px(rgba(7,17,27,.1))
          .cartcontrol-container
            flex 1 3 100%
            line-height 48px
            .cart-count
              height 48px
              line-height 48px
          .foodDesc-container
            position: relative
            display flex
            height 100%
            flex 1 1 100%
            .food-name
              flex 0 0 50%
            .food-price-container
              flex 1
              text-align right
              padding-right 10px
              font-size 0
              .yuan
                font-size 10px
                color rgb(240, 20, 20)
              .food-price
                font-size 14px
                color rgb(240, 20, 20)
                font-weight 700
      &.fold-enter-active,
      &.fold-leave-active
        transition bottom .5s
      &.fold-enter,&.fold-leave-to
        bottom -305px

</style>
