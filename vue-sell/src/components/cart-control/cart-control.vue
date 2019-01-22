<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0">
        <span class="inner icon-remove_circle_outline" @click.stop="decrease"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
  </div>
</template>

<script>
  const EVENT_ADD = 'add'
  
  export default {
    name: '',
    props: {
      food: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      add (event) {
        if (!this.food.count) {
          this.$set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit(EVENT_ADD, event.target)
      },
      decrease () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .cart-control
    width: 72px
    display: flex
    align-items: center
    justify-content: flex-end
    .cart-decrease
      .inner
        display: inline-block
        transform: rotate(0deg)
        transition: all 0.4s linear
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translateX(24px)
        .inner
          transform: rotate(180deg)
    .cart-decrease
    .cart-add
      color: $color-blue
      font-size: $fontsize-large-xxx
    .cart-add
      margin-bottom: 2px
    .cart-count
      width: 24px 
      text-align: center
      font-size: $fontsize-small-s
      color: $color-font-light
</style>