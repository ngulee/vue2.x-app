<template>
	<div class="ratings-component">
		<div class="ratings-wrapper">
      <div class="ratings-header">
        <div class="seller-rank border-1px">
          <p class="rank">{{seller.score}}</p>
          <h1 class="rank-title">综合评分</h1>
          <p class="rank-rate">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="seller-server">
          <div class="server-score">
            <span class="desc">服务评分</span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="food-score">
            <span class="desc">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="desc">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <div class="select-rating">
        <v-selectRatings :ratings="ratings" :only-content="onlyContent" :select-type="selectType"></v-selectRatings>
      </div>
      <div class="ratins-content-wrapper" ref="content">
        <ul class="ratings-content" >
          <li v-for="rating in ratings" v-show="isShowItem(rating.rateType,rating.text)" class="rating-item">
            <div class="avatar-wrapper">
              <img class="avatar" :src="rating.avatar" alt="" width="18" height="18">
            </div>
            <div class="rating-right">
              <div class="rating-details">
                <span class="username">{{rating.username}}</span>
                <span class="rate-time">{{rating.rateTime | formatData}}</span>
              </div>
              <div class="delivery">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="deliver-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="rating-text" v-if="rating.text">
                {{rating.text}}
              </p>
              <div class="recommends">
                <span :class="{'icon-thumb_up':rating.rateType == 0,'icon-thumb_down':rating.rateType == 1}"></span>
                <span v-for="(item, index) in rating.recommend" v-if="item && item.length && index < 3" class="recommend-item">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

	</div>
</template>
<script >
import BScroll from 'better-scroll';
import { formatDateMethod } from '../../common/js/formatDate.js';
import star from '../star/star.vue';
import split from '../split/split.vue';
import selectRatings from '../selectRatings/selectRatings.vue';
const ERR_NO = 0;
export default {
  name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: [],
      selectType: 2,
      onlyContent: false
    };
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.errno === ERR_NO) {
        this.ratings = response.data;
        this.$nextTick(() => {
          if (this.$refs.content) {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.content, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          }
        });
      }
    });
    this.$root.eventHub.$on(['selectType', 'onlyContent'], (res) => {
      if ((typeof res) === 'boolean') {
        this.onlyContent = res;
      } else {
        this.selectType = res;
      }
      this.$nextTick(() => {
        if (this.$refs.content) {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.content, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        }
      });
    });
  },
  filters: {
    formatData (ms) {
      let data = new Date(ms);
      return formatDateMethod(data, 'yyyy-MM-dd hh:mm');
    }
  },
  methods: {
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
  components: {
    'v-star': star,
    'v-split': split,
    'v-selectRatings': selectRatings
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
*
  margin 0
  padding 0
  box-sizing border-box
.ratings-component
  position: fixed
  width: 100%
  top 176px
  bottom 0
  left 0
  overflow hidden
  .ratings-wrapper
    .ratings-header
      display flex
      padding 18px 0
      .seller-rank
        flex 0 0 135px
        width 135px
        text-align center
        border-right 1px solid rgba(7,17,27,0.1)
        @media only screen and (max-width 320px)
          flex 0 0 120px
          width 120px
        .rank
          font-size 24px
          line-height 28px
          color: #FE9800
          padding-bottom 6px
        .rank-title
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
          padding-bottom 8px
        .rank-rate
          padding-bottom 6px
          font-size 10px
          line-height 10px
          color rgb(147,153,159)
      .seller-server
        flex 1
        padding 0 24px
        font-size 12px
        @media only screen and (max-width: 320px)
          padding 0 10px
        .server-score,
        .food-score,
        .delivery-time
          position relative
          font-size 0
          margin-bottom 8px
          .desc
            color rgb(7,17,27)
            line-height 18px
            font-size 12px
          .score
            line-height 18px
            font-size 12px
            color rgb(255,153,0)
          .star
            display inline-block
            vertical-align top
          .desc,
          .star
            padding-right 12px
            @media only screen and (max-width: 320px)
              padding-right 8px
          .time
            font-size 12px
            line-height 18px
            color rgb(147,153,159)

    .select-rating
      padding-top 18px
    .ratins-content-wrapper
      height 178px
      overflow hidden
      .ratings-content
        .rating-item
          display flex
          .avatar-wrapper
            flex 0 0 58px
            width 116px
            padding 18px 12px 0 18px
            .avatar
              border-radius 50%
          .rating-right
            flex 1
            margin 18px 18px 18px 0
            .rating-details
              position relative
              font-size 0
              .username,
              .rate-time
                display inline-block
                width 50%
                height: 100%
                line-height 12px
                font-size 12px
              .username
                color rgb(7,17,27)
              .rate-time
                font-weight 200
                color rgb(147,153,159)
                text-align right

            .delivery
              margin 4px 0 6px 0
              font-size 0
              .deliver-time
                display inline-block
                font-size 10px
                font-weight 200
                color rgb(147,153,159)
                line-height 12px
              .star
                display inline-block
                vertical-align top
                padding-right 6px
            .rating-text
              margin-bottom 8px
              font-size 12px
              color rgb(7,17,27)
              line-height 18px
            .recommends
              font-size 0
              .icon-thumb_up,
              .icon-thumb_down
                font-size 12px
                line-height 16px
              .icon-thumb_up
                color rgb(0,160,220)
              .icon-thumb_down
                color rgb(147,153,159)
              .recommend-item
                margin-left 8px
                padding 0 6px
                font-size 12px
                color rgb(147,153,159)
                border: 1px solid rgb(147,153,159)
                border-radius 2px
                background #fff


</style>
