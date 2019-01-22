<template>
  <span class="bubble">{{num}}</span>
</template>

<script>

  export default {
    name: 'bubble',
    props: {
      num: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      }
    },
    methods: {},
    computed: {},
    components: {},
    beforeMount() {},
    mounted() {},
    watch: {}
  }
</script>

<style lang='stylus' scoped>
  .bubble
    padding: 0 5px
    font-size: $fontsize-small
    line-height: $fontsize-small
    font-weight: bold
    color: $color-white
    background-color: $color-red
    border-radius: 200px
</style>