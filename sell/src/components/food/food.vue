<template>
  <transition name="food">
    <div class="wrapper"  ref="food" v-show="showFlag">
      <div class="food" >
        <div class="image-header">
          <img :src="food.image" :alt="food.name">
        </div>
        <div class="sell-details border-1px">
          <h1 class="food-name">{{food.name}}</h1>
          <div class="food-sell">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="sell-rating">好评率{{food.rating}}%</span>
          </div>
          <div class="food-price">
            <span class="new-price">￥<span class="yuan">{{food.price}}</span></span>
            <span class="old-price" v-if="food.oldPrice">￥<span class="yuan">{{food.oldPrice}}</span></span>
          </div>
          <v-cartcontrol :food="food" ></v-cartcontrol>
        </div>
        <div class="back">
          <i class="icon-arrow_lift" @click="backGoods"></i>
        </div>
        <v-split v-show="food.info"></v-split>
        <div class="food-info" v-show="food.info">
          <h1 class="info-title">商品信息</h1>
          <p class="info-content" >
            {{food.info}}
          </p>
        </div>
        <v-split></v-split>
        <div class="ratings">
          <div class="ratings-outline">
            <h1 class="ratings-title">商品评价</h1>
            <v-selectRatings :desc="desc" :ratings="food.ratings" :only-content="onlyContent" :select-type="selectType"></v-selectRatings>
            <ul class="rating-list" v-show="isShowRatings">
              <li class="rating-item border-1px" v-for="item in food.ratings" v-show="isShowItem(item.rateType, item.text)">
                <div class="rating-header">
                  <div class="rating-time">
                    {{item.rateTime | formatDate}}
                  </div>
                  <div class="rating-user">
                    <span class="username">{{item.username}}</span>
                    <img :src="item.avatar" alt="" class="avatar" width="12" height="12">
                  </div>
                </div>
                <p class="ranting-content" >
                  <span :class="{'icon-thumb_up':item.rateType == 0,'icon-thumb_down':item.rateType == 1}"></span>
                  <span>{{item.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-ratings" v-if="!isShowRatings">
              暂无评价！
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import { formatDateMethod } from '../../common/js/formatDate.js';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import split from '../split/split.vue';
  import selectRatings from '../selectRatings/selectRatings.vue';

  // const POSITIVE = 0;
  // const NEGATIVE = 1;
  const ALL = 2;
  export default {
    name: 'food',
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    computed: {
      foodCount () {
        return this.food.count;
      },
      isShowRatings () {
        return this.food.ratings && this.food.ratings.length;
      }
    },
    created () {
      this.$root.eventHub.$on(['selectType', 'onlyContent'], (res) => {
        if ((typeof res) === 'boolean') {
          this.onlyContent = res;
        } else {
          this.selectType = res;
        }
        this.$nextTick(() => {
          if (this.$refs.food) {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          }
        });
      });
    },
    beforeMount () {
      this.selectType = 2;
      this.onlyContent = false;
    },
    methods: {
      show () {
        this.showFlag = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      backGoods () {
        this.showFlag = false;
      },
      isShowItem (type, text) {
        if (this.onlyContent && !text) {
          return false;
        };
        if (this.selectType === 2) {
          return true;
        } else {
          return this.selectType === type;
        }
      }
    },
    filters: {
      formatDate (ms) {
        let date = new Date(ms);
        return formatDateMethod(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      'v-cartcontrol': cartcontrol,
      'v-split': split,
      'v-selectRatings': selectRatings
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
*
  margin: 0
  padding: 0
  box-sizing border-box
.wrapper
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: calc(100vh - 56px)
  background: #fff
  overflow hidden
  &.food-enter,
  &.food-leave-to
    left: -100%
  &.food-enter-active,
  &.food-leave-active
    transition: left .5s
  .food
    width: 100%
    background: #fff
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        width: 100%
        height: 100%
    .sell-details
      position: relative
      border-1px(rgba(7,17 , 27, .1))
      font-size 0
      .food-name
        font-size 14px
        font-weight 700
        line-height 14px
        padding 18px 0 8px 18px
      .food-sell
        font-size 10px
        color rgb(147,153,159)
        line-height 10px
        padding-left 18px
        .sell-count
          margin-right: 12px
      .food-price
        padding 18px 0 18px 18px
        font-size 10px
        .new-price
          color rgb(240,20,20)
          .yuan
            font-size 14px
            font-weight 700
            line-height:14px
        .old-price
          .yuan
            font-weight 700
            line-height 14px
            text-decoration line-through
      .cartcontrol
        float right
        padding-right 18px
        position: absolute
        top 37px
    .back
      position: absolute
      top: 0
      color: #fff
      font-size 20px
      padding: 10px
      .icon-arrow_lift
        padding 5px
    .food-info
      font-size 12px
      padding 18px
      .info-content
        padding 6px 8px 0 8px
        font-weight 200
        line-height 24px
        color rgb(77,85,93)
    .ratings
      font-size 12px
      .ratings-outline
        padding 18px 0 12px 0
        .ratings-title
          padding 18px
        .rating-list
          padding 0 18px
          .rating-item
            padding 16px 0
            border-1px(rgba(7,17 , 27, .1))
            .rating-header
              display flex
              padding-bottom 6px
              color rgb(147,153,159)
              font-size 10px
              .rating-time
                width 50%
              .rating-user
                width 50%
                font-size 0
                text-align right
                .username
                  font-size 10px
                  margin-right 6px
                  line-height 12px
                .avatar
                  vertical-align top
                  border-radius 50%

            .ranting-content
              font-size 12px
              color rgb(7,17,27)
              .icon-thumb_up
                color rgb(0,160,220)
              .icon-thumb_down
                color rgb(147,153,159)
        .no-ratings
          padding 18px 16px
          font-size 12
          color rgb(147,153,159)
</style>
