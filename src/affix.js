import { on, off, getScroll, getOffset, getScrollTarget } from './utils'

export default {
  props: {
    fixedTop: { // eslint-disable-line
      type: Number
    }
  },
  data() {
    return {
      isFixed: false,
      showFixedShim: false,
      fixedShimStyle: {},
      fixedHeaderStyle: {}
    }
  },
  mounted() {
    if (this.fixedTop !== undefined) {
      const target = getScrollTarget(this.$el)
      on(target, 'scroll', this.handleScroll)
      on(target, 'resize', this.handleScroll)
      this.$nextTick(() => {
        this.handleScroll()
      })
    }
  },
  beforeDestroy() {
    if (this.fixedTop !== undefined) {
      const target = getScrollTarget(this.$el)
      off(target, 'scroll', this.handleScroll)
      off(target, 'resize', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      const isFixed = this.isFixed
      const scrollTop = getScroll(window, true)
      const elOffset = getOffset(this.$el)
      // Fixed Top
      if (elOffset.top - this.fixedTop < scrollTop && !isFixed) {
        this.isFixed = true
        this.fixedShimStyle = {
          width: this.$refs.headerWrap.clientWidth + 'px',
          height: this.$refs.headerWrap.clientHeight + 'px'
        }
        this.showFixedShim = true
        this.fixedHeaderStyle = {
          top: `${this.fixedTop}px`,
          left: `${elOffset.left}px`,
          width: `${this.$el.offsetWidth}px`
        }
        this.$emit('on-fixed', true)
      } else if (elOffset.top - this.fixedTop > scrollTop && isFixed) {
        this.showFixedShim = false
        this.fixedShimStyle = {}
        this.isFixed = false
        this.fixedHeaderStyle = null
        this.$emit('on-fixed', false)
      }
    }
  }
}
