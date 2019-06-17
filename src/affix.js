const on = (function() {
  if (typeof window === 'undefined') {
    return
  }
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

const off = (function() {
  if (typeof window === 'undefined') {
    return
  }
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

const getScroll = (target, top) => {
  const prop = top ? 'pageYOffset' : 'pageXOffset'
  const method = top ? 'scrollTop' : 'scrollLeft'
  let ret = target[prop]
  if (typeof ret !== 'number') {
    ret = window.document.documentElement[method]
  }
  return ret
}

const getOffset = element => {
  const rect = element.getBoundingClientRect()
  const scrollTop = getScroll(window, true)
  const scrollLeft = getScroll(window)
  const docEl = window.document.body
  const clientTop = docEl.clientTop || 0
  const clientLeft = docEl.clientLeft || 0
  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  }
}

export default {
  props: {
    fixedTop: {
      type: Number
    }
  },
  mounted() {
    if (this.fixedTop !== undefined) {
      const target = this._getScrollTarget()
      on(target, 'scroll', this.handleScroll)
      on(target, 'resize', this.handleScroll)
      this.$nextTick(() => {
        this.handleScroll()
      })
    }
  },
  beforeDestroy() {
    if (this.fixedTop !== undefined) {
      const target = this._getScrollTarget()
      off(target, 'scroll', this.handleScroll)
      off(target, 'resize', this.handleScroll)
    }
  },
  methods: {
    _getScrollTarget() {
      let el = this.$el
      if (!el) {
        return null
      }
      while (
        el &&
        el.tagName !== 'HTML' &&
        el.tagName !== 'BOYD' &&
        el.nodeType === 1
      ) {
        const overflowY = window.getComputedStyle(el).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
          return el
        }
        el = el.parentNode
      }
      return document
    },
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
