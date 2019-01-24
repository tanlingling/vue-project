<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart 
      ref="shopCart" 
      :select-foods="selectFoods" 
      :delivery-price="deliveryPrice" 
      :min-price="minPrice"
      :fold="fold"
      :sticky="true">
    </shop-cart>
  </div>
</template>

<script>
  import ShopCart from 'components/shop-cart/shop-cart'
  import PopupMixin from 'common/mixins/popup'

  export default {
    mixins: [PopupMixin],
    name: 'shop-cart-sticky',
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      fold: {
        type: Boolean,
        default: true
      },
      list: {
        type: Object,
        default () {
          return {}
        }
      },
      sticky: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      drop (el) {
        this.$refs.shopCart.drop(el)
      }
    },
    components: {
      ShopCart
    }
  }
</script>

<style lang='stylus' scoped>
  .shop-cart-sticky
    position: absolute 
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 999
</style>