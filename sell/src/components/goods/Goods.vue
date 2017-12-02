<template>
	<div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item border-1px" :class="{'current': currentIndex === index}" @click="sellectMenu(index)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul>
        <li v-for="item in goods" class="goods-list food-list-hook">
          <h1 class="foods-name">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)"  v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img class="icon-img" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="food-name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="sell-count">
                    月售{{food.sellCount}}份
                  </span>
                  <span class="rating">
                    好评率{{food.rating}}%
                  </span>
                </div>
                <div class="price">
                  <span class="current-price">
                    ￥<strong class="price-num">{{food.price}}</strong>
                  </span>
                  <span v-show="food.oldPrice" class="old-price">
                    ￥<strong class="price-num">{{food.oldPrice}}</strong>
                  </span>
                </div>
                <div class="cartcontrol-wrapper">
                  <v-cartcontrol  :food="food"></v-cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-shopcart>
    <v-food :food="selectedFood" ref="food"></v-food>
	</div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import food from '../food/food.vue';
  const ERR_NO = 0;
  export default {
    name: 'goods',
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i] - 30;
          let height2 = this.listHeight[i + 1] - 30;
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((item) => {
          item.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_NO) {
          this.goods = response.data;
          this.$nextTick(() => {
            this.initScroll();
            this.calcHeight();
          });
        }
      });
    },
    methods: {
      sellectMenu (index) {
        let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        let element = foodList[index];
        this.foodScroll.scrollToElement(element, 300);
      },
      initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.goodsWrapper, {
          click: true,
          probeType: 3
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calcHeight () {
        let foodList = this.$refs.goodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      }
    },
    components: {
      'v-shopcart': shopcart,
      'v-cartcontrol': cartcontrol,
      'v-food': food
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
  *
    box-sizing border-box
  .goods
    position: absolute
    display flex
    width 100%
    height calc(100vh - 176px - 46px)
    top 176px
    overflow hidden
    .menu-wrapper
      background #f3f5f7
      flex 0 0 80px
      width 80px
      overflow hidden
      .menu-item
        display table
        width 100%
        height 54px
        line-height 14px
        padding 0 12px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-no()
        .text
          display table-cell
          vertical-align middle
          font-size 12px
        &.current
          position relative
          z-index 10
          margin-top -1px
          font-weight 700
          background #fff
          &.after
            border-no()
        .icon
          display inline-block
          width 16px
          height 16px
          margin-right 6px
          vertical-align top
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')

    .goods-wrapper
      flex 1
      .goods-list
        width 100%
        .foods-name
          width 100%
          height 26px
          line-height 26px
          font-size 12px
          padding 0 18px
          border-left 2px solid #d9dde1
          background #f3f5f7;
        .food-item
          margin 18px 18px 0 18px
          padding-bottom 18px
          display flex
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-no()
          .icon
            flex 0 0 57px
            .icon-img
              width 57px
          .content
            flex 1
            padding-left 10px
            .food-name
              font-size 14px
              color rgb(7, 17, 27)
              line-height 14px
            .desc
              margin-top 8px
              font-size 10px
              line-height 10px
              color rgb(147,153,159)
            .extra
              margin 8px 0
              .sell-count,
              .rating
                font-size 10px
                line-height 10px
                color rgb(147,153,159)
              .sell-count
                margin-right 12px
            .price
              font-size 12px
              .current-price
                color rgb(240,20,20)
                .price-num
                  font-size 14px
                  font-weight 700
              .old-price
                color rgb(147,153,159)
                text-decoration line-through
                .price-num
                  font-size 10px
                  font-weight 700
            .cartcontrol-wrapper
              position: absolute
              right 0
              bottom 10px

</style>
