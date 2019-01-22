<template>
  <div class="tab">
    <cube-tab-bar
      ref="tabBar"
      :showSlider="true"
      :useTransition="false"
      v-model="selectedLabel"
      :data="tabs"
      class="border-bottom-1px">
    </cube-tab-bar>
    <div class="slide-wp">
      <cube-slide 
        ref="slide" 
        :loop="false" 
        :auto-play="false" 
        :showDots="false" 
        :initialIndex="index"
        :options="slideOptions"
        @change="onChange"
        @scroll="onScroll"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name:'tab',
    props: {
      tabs: {
        type: Array,
        default () {
          return []
        }
      },
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        index: this.initialIndex,
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }      
      }
    },
    methods: {
      onChange (current) {
        this.index = current
        const component = this.$refs.component[current]
        component.fetch && component.fetch()
      },
      onScroll (pos) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      }
    },
    computed: {
      selectedLabel: {
        get () {
          return this.tabs[this.index].label
        },
        set (newValue) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newValue
          })
        }
      }
    },
    mounted () {
      this.onChange(this.index)
    }
  }
</script>

<style lang='stylus' scoped>
  @import '~common/stylus/variable'

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wp
      flex: 1
      overflow: hidden
</style>