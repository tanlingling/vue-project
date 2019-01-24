<template>
  <div class="rating-select">
    <div class="rating-type">
      <span class="type-item positive" :class="{active: selectType === 2}" @click="select(2)">{{desc.all}}</span>
      <span class="type-item positive" :class="{active: selectType === 0}" @click="select(0)">{{desc.positive}}</span>
      <span class="type-item negative" :class="{active: selectType === 1}" @click="select(1)">{{desc.negative}}</span>
    </div>
    <div class="switch">
      <span class="icon icon-check_circle" :class="{on: onlyContent}" @click="toggle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const ALL = 2
  const EVENT_SELECT = 'select'
  const EVENT_TOGGLE = 'toggle'

  export default {
    name: 'rating-select',
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      },
      onlyContent: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
      }
    },
    methods: {
      select (type) {
        this.$emit(EVENT_SELECT, type)
      },
      toggle () {
        this.$emit(EVENT_TOGGLE)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .rating-select
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-bottom: 1px solid $color-row-line
      .type-item
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: $fontsize-small
        color: $color-grey
        &.active
          color: $color-white
        &.all
          background-color: $color-blue
        &.positive
          background-color: $color-light-blue
          &.active
            background-color: $color-blue
        &.negative
          background-color: $color-light-grey-s
          &.active
            background-color: $color-grey
    .switch
      display: flex
      align-items: center
      padding: 12px 18px
      border-bottom: 1px solid $color-row-line
      .icon
        font-size: $fontsize-large-xx        
        color: $color-light-grey
        margin-right: 4px
        &.on
          color: $color-green
      .text
        font-size: $fontsize-small
        color: $color-font-light
</style>