export default {
  name: 'VueFlowRender',
  props: {
    column: {
      type: Number,
      default: 1,
      validator: val => val >= 1
    },
    height: {
      type: Number,
      default: 0,
      validator: val => val >= 0
    },
    remain: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    item: {
      type: Object,
      default: null
    },
    getter: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      wrap: null,
      offsetTop: 0,
      lastScrollTop: 0,
      isUp: false,
      start: 0,
      style: {
        height: 0,
        paddingTop: 0
      },
      cache: {}
    }
  },
  computed: {
    isSameHeight() {
      return this.height !== 0
    },
    isSingleColumn() {
      return this.column === 1
    }
  },
  watch: {
    total(newVal, oldVal) {
      this._computeRenderHeight(this.isSameHeight ? undefined : this.$slots.default.slice(oldVal, newVal), oldVal)
    }
  },
  mounted() {
    this.setOffset()
    this.setWrap()
    this._computeRenderHeight(this.$slots.default, 0)
  },
  beforeUpdate() {
    this._resetStart()
  },
  methods: {
    setOffset() {
      this.offsetTop = this.$el.offsetTop
    },
    setWrap(el) {
      this.wrap = el || this.$el.parentElement
    },
    scroll(offset, up) {
      this.isUp = up === undefined ? offset < this.lastScrollTop : up
      this.lastScrollTop = offset
      const { start, remain, cache, offsetTop, isUp, total } = this
      if (remain >= total) {
        return
      }
      if (offset - offsetTop <= 0) {
        this.start = 0
        this.style.paddingTop = 0
        return
      }
      if (isUp) {
        if (this.start <= 0) {
          this.style.paddingTop = 0
          this.start = 0
          return
        }
        const condition = offset - offsetTop
        if (
          cache[start + remain - 1].top > condition + this.wrap.clientHeight ||
          cache[start].top > condition
        ) {
          this.style.paddingTop -= cache[start - 1].height
          this.start--
          if (this.start < 0) {
            this.start = 0
          }
        }
      } else {
        if (start + remain >= total) {
          this.start = total - remain
          this.style.paddingTop = cache[total - remain].top
          return
        }
        const condition = offset - offsetTop
        if (
          cache[start].bottom < condition ||
          cache[start + remain - 1].bottom < condition + this.wrap.clientHeight
        ) {
          this.style.paddingTop += cache[start].height
          this.start++
        }
      }
    },
    _resetStart() {
      const { lastScrollTop, cache, start, isSameHeight, height, remain, column, offsetTop, total } = this
      if (remain >= total) {
        return
      }
      const resetUp = () => {
        if (start <= 0) {
          this.start = 0
          this.style.paddingTop = 0
          return
        }
        const detectRect = cache[start]
        const offset = lastScrollTop - offsetTop
        const deltaHeight = detectRect.top - offset
        if (deltaHeight > 0) {
          if (isSameHeight) {
            const decreaseCount = Math.abs(Math.ceil(deltaHeight / height / column))
            this.start = Math.max(start - decreaseCount, 0)
            this.style.paddingTop -= decreaseCount * height
          } else {
            for (let i = start - 1; i >= 0; i--) {
              const rect = cache[i]
              if (rect.top <= offset) {
                this.style.paddingTop = rect.top
                this.start = i
                break
              }
            }
          }
        }
      }
      const resetDown = () => {
        if (start + remain >= total) {
          this.start = total - remain
          this.style.paddingTop = cache[total - remain].top
          return
        }
        const detectRect = cache[start + remain - 1]
        const offset = lastScrollTop - offsetTop + this.wrap.clientHeight
        const deltaHeight = detectRect.bottom - offset
        if (deltaHeight < 0) {
          if (isSameHeight) {
            const increaseCount = Math.abs(Math.floor(deltaHeight / height / column))
            this.start = Math.min(start + increaseCount, total - remain)
            this.style.paddingTop += increaseCount * height
          } else {
            for (let i = start + remain; i <= total - remain; i++) {
              const rect = cache[i]
              if (rect.bottom >= offset) {
                this.style.paddingTop = rect.top
                this.start = i
                break
              }
            }
          }
        }
      }
      resetUp()
      resetDown()
    },
    _computeRenderHeight(items, offset) {
      const { height, isSameHeight, total, column, cache, isSingleColumn } = this
      if (!total) {
        return
      }
      if (isSameHeight) {
        const end = items ? items.length : total - offset
        for (let i = 0; i < end; i++) {
          const top = height * Math.floor((i + offset) / column)
          cache[i + offset] = {
            height,
            top,
            bottom: height + top
          }
        }
        this.style.height = height * total / column
      } else {
        if (isSingleColumn) {
          let beforeHeight = offset ? cache[offset - 1].bottom : 0
          items.forEach((item, index) => {
            const hgt = +item.data.style.height.replace('px', '')
            cache[index + offset] = {
              height: hgt,
              top: beforeHeight,
              bottom: hgt + beforeHeight
            }
            beforeHeight += hgt
          })
          this.style.height = beforeHeight
        } else {
          let offsets
          if (offset) {
            for (let i = offset - column; i <= offset - 1; i++) {
              offsets.push(cache[i].bottom)
            }
          } else {
            offsets = new Array(column).fill(0)
          }
          items.forEach((item, index) => {
            const realIndex = index + offset
            const beforeHeight = Math.min(...offsets)
            const hgt = +item.data.style.height.replace('px', '')
            cache[realIndex] = {
              height: hgt,
              top: beforeHeight,
              bottom: hgt + beforeHeight
            }
            offsets[offsets.indexOf(beforeHeight)] += hgt
          })
          this.style.height = Math.max(...offsets)
        }
      }
    },
    _filter(h) {
      const { remain, total, start, item, getter } = this
      const end = remain >= total ? total : start + remain

      if (item) {
        const result = []
        for (let i = start; i < end; i++) {
          result.push(h(item, getter(i)))
        }
        return result
      }

      return this.$slots.default.slice(start, end)
    }
  },
  render: function(h) {
    const { paddingTop, height } = this.style
    const list = this._filter(h)

    return h('div', {
      'style': {
        boxSizing: 'border-box',
        height: `${height}px`,
        paddingTop: `${paddingTop}px`
      },
      'class': 'vue-flow-render'
    }, list)
  }
}
