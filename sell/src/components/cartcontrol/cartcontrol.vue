<template>
  <div class="cartcontrol">
    <transition name="decrease">
      <div v-show="food.count > 0"  class="cart-decrease" @click.stop="decreaseFood">
        <i  class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div v-show="food.count > 0"  class="cart-count">
      {{food.count}}
    </div>
    <div class="cart-increase" @click.stop="increaseFood">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      increaseFood () {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      },
      decreaseFood () {
        if (this.food.count > 0) {
          this.food.count --;
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
*
  box-sizing border-box
.cartcontrol
  position: relative
  right 0
  font-size 0
  color rgb(0, 160, 220)
  vertical-align top
  .cart-decrease,.cart-increase
    display inline-block
    font-size 24px
   .cart-decrease
      transition all .4s linear
      &.decrease-enter-active,&.decrease-leave-active
        opacity 1
        transform translate3D(0,0,0)
        .icon-remove_circle_outline
          opacity 1
          transition all .4s linear
          transform rotate(0deg)
      &.decrease-enter,&.decrease-leave-to
        opacity 0
        transform translate3D(24px,0,0)
        .icon-remove_circle_outline
          transform rotate(180deg)

  .cart-count
    display inline-block
    width 24px
    color rgb(147,153,159)
    font-size 10px
    vertical-align top
    line-height 24px
    text-align center
</style>
