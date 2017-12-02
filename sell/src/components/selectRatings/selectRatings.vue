<template>
  <div class="select-ratings">
    <div class="rating-type border-1px">
      <span class="all" :class="{'active':mySelectType===2}" @click="select(2, $event)">{{desc.all}}<span class="count">{{getTotalCount}}</span></span>
      <span class="positive" :class="{'active':mySelectType===0}" @click="select(0, $event)">{{desc.positive}}<span class="count">{{getGositiveCount}}</span></span>
      <span class="negative" :class="{'active':mySelectType===1}" @click="select(1, $event)">{{desc.negative}}<span class="count">{{getNegativeCount}}</span></span>
    </div>
    <div class="rating-switch" :class="{'on': myOnlyContent}" >
      <i class="icon-check_circle"  @click='switchContent()'></i>
      <span class="switch-desc">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  data () {
    return {
      myRatings: this.ratings,
      mySelectType: this.selectType,
      myOnlyContent: this.onlyContent,
      myDesc: this.desc,
      positiveCount: 0,
      negativeCount: 0,
      totalCount: 0
    };
  },
  computed: {
    getGositiveCount () {
      this.positiveCount = 0;
      for (let item of this.ratings) {
        if (!item.rateType) {
          this.positiveCount++;
        }
      }
      return this.positiveCount;
    },
    getNegativeCount () {
      this.negativeCount = 0;
      for (let item of this.ratings) {
        if (item.rateType) {
          this.negativeCount++;
        }
      }
      return this.negativeCount;
    },
    getTotalCount () {
      return this.ratings.length;
    }
  },
  methods: {
    select (type) {
      this.mySelectType = type;
      this.$root.eventHub.$emit('selectType', type);
    },
    switchContent () {
      this.myOnlyContent = !this.myOnlyContent;
      this.$root.eventHub.$emit('onlyContent', this.myOnlyContent);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin.styl"
*
  box-sizing border-box
.select-ratings
  padding 0 18px
  border-bottom: 1px solid rgba(7,17,27,0.1)
  .rating-type
    font-size 0
    padding-bottom 18px
    border-1px(rgba(7,17,27,0.1))
    .all, .positive, .negative
      padding 8px 12px
      display inline-block
      line-height 16px
      color rgb(78,85,93)
      border-radius 2px
      font-size 12px
      .count
        font-size 8px
        padding-left 4px
    .all
      background rgba(0,160,220,0.2)
      &.active
        color #fff
        background rgb(0,160,220)
    .positive
      background rgba(0,160,220,0.2)
      margin 0 8px
      &.active
        color #fff
        background rgb(0,160,220)
    .negative
      background rgba(78,85,93,0.2)
      &.active
        color #fff
        background rgb(78,85,93)
  .rating-switch
    padding 12px 0
    color rgb(147,153,159)
    &.on
      .icon-check_circle
        color #00c850
    .icon-check_circle
      vertical-align middle
      font-size 24px
      margin-right 4px

</style>
