<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar" alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}钟送达
				</div>
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">
						{{seller.supports[0].description}}
					</span>
				</div>
			</div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">
          {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">
        {{seller.bulletin}}
      </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img class="bg-image" :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="detail-name">
            {{seller.name}}
          </h1>
         <div class="star-wrapper">
           <v-star :size="48" :score="seller.score"></v-star>
         </div>
         <div class="discount-info">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
         </div>
         <ul v-if="seller.supports" class="supports">
            <li v-for="(item, $key) in seller.supports" class="spports-item">
              <span class="icon" :class="classMap[seller.supports[$key].type]"></span>
              <span class="support-text">
              {{seller.supports[$key].description}}
            </span>
            </li>
         </ul>
          <div class="bulletin">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin-text">
            {{seller.bulletin}}
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
    </transition>
	</div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue';
export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      closeDetail () {
        this.detailShow = false;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
      'v-star': star
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/minxin.styl';
 *
  box-sizing border-box
.header
    position: relative
    background: rgba(7, 17, 27, .5)
    color: #fff
    font-size:0
  .content-wrapper
    position relative
    padding: 24px 12px 16px 24px
    .avatar,.content
      display:inline-block
      font-size: 14px;
      vertical-align top
    .content
      margin-left 16px
      .title
        padding 2px 0 8px 0
        .brand
          width 30px
          height 18px
          display inline-block
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight bold
          vertical-align top

      .description
        font-size 12px
        line-height 12px
      .supports
        padding 10px 0 2px 0
        .icon
          width 12px
          height 12px;
          display inline-block
          background-repeat no-repeat
          background-size 12px 12px
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          font-size 10px
          line-height 12px
          vertical-align top
    .supports-count
      height 24px
      position: absolute
      font-size 10px
      line-height 12px
      right 0
      bottom 14px
      margin-right 12px
      padding 0 8px
      background-color rgba(0, 0, 0, 0.2)
      border-radius 14px
      .count,
      .icon-keyboard_arrow_right
        height 24px
        line-height 24px
      .count
        margin-right 2px
  .bulletin-wrapper
    height 28px
    background-color rgba(7, 17, 27, .2)
    padding 0 12px
    line-height 28px
    .bulletin-title
      position relative
      display inline-block
      width 22px
      height 12px
      top 50%
      vertical-align top
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      transform translateY(-50%)
      margin-right 4px
    .bulletin-text
      display inline-block
      height 28px
      width 79.375%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      font-size 10px
      margin-right 4px
    .icon-keyboard_arrow_right
      display inline-block
      height 28px
      line-height 28px
      font-size 10px
      vertical-align top
  .background
    position: absolute
    top 0
    width 100%
    height 100%
    overflow hidden
    z-index -1
    .bg-image
      width 100%
      filter: blur(15px)
  .avatar>img
    border-radius: 2px;
    display inline-block
  .detail
    position: fixed
    width 100%
    height 100%
    top 0
    left 0
    z-index 100
    overflow auto
    background rgba(7, 17, 27, .8)
    opacity 1
    backdrop-filter blur(10px)
    &.fade-enter-active,
    &.fade-leave--active
      transition all .3s
    &.fade-enter,
    &.fade-leave-active
      opacity 0
      background rgba(7, 17, 27, 0)
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        padding 64px 0
        font-size 12px
        .detail-name
          line-height 16px
          font-size 16px
          font-weight 700
          text-align center
      .star-wrapper
        margin-top 16px
        text-align center
      .discount-info,
      .bulletin
        display flex
        width 80%
        margin 28px auto 24px auto
        .line
         flex 1
         position: relative
         top -6px
         border-bottom 1px solid rgba(255, 255, 255, .2)
        .text
         padding 0 12px
         font-size 14px
         font-weight 700
      .supports
        width 80%
        margin 0 auto
        .spports-item
          padding 0 12px
          font-size 0
          margin-bottom  12px
          &:last-child
            margin-bottom  0
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
            &.guarantee
              bg-image('guarantee_2')
            &.invoice
              bg-image('invoice_2')
            &.special
              bg-image('special_2')
          .support-text
            display inline-block
            font-size 12px
            line-height 16px



      .bulletin-text
        width 80%
        margin 0 auto
        font-size 12px
        line-height 24px
        padding 0 12px 12px 12px
        text-indent 24px
        text-align justify
    .detail-close
      position: relative
      width 32px
      height 32px
      font-size 32px
      margin -64px auto 0 auto
      clear both




</style>
