const ALL = 2

export default {
  data () {
    return {
      selectType: ALL,
      onlyContent: false
    }
  },
  computed: {
    computedRatings () {
      let ret = []
      this.ratings.forEach((rating) => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || this.selectType === rating.rateType) {
          ret.push(rating)
        }
      })
      return ret
    }
  },
  methods: {
    format (time) {
      let t = new Date(time)
      let yy = t.getFullYear()
      let mm = t.getMonth()
      let dd = t.getDate() + 1
      let h = t.getHours()
      let m = t.getMinutes()
      return `${yy}-${mm}-${dd} ${h}:${m}`
    },
    onSelect (type) {
      this.selectType = type
    },
    onToggle () {
      this.onlyContent = !this.onlyContent
    }
  }
}