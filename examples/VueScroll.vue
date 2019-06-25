<template>
  <div
    ref="wrapper"
    class="scroll-warp"
  >
    <slot />
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

export default {
  name: 'VScroll',
  props: {
    scrollX: {
      type: Boolean,
      default: false
    },
    stop: {
      type: Boolean,
      default: false
    },
    event: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastScroll: 0
    }
  },
  watch: {
    data() {
      this.refresh()
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  beforeDestroy() {
    if (this.scroll) {
      this.scroll.destroy()
    }
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.event ? 2 : 0,
        click: true,
        scrollX: this.scrollX,
        scrollY: !this.scrollX,
        stopPropagation: this.stop
      })
      if (this.event) {
        this.scroll.on('scroll', ({ y }) => {
          const direction = this.scroll.movingDirectionY
          this.$emit('scroll', {
            offset: Math.max(-y, 0),
            isUp: direction === -1
          })
          if (direction === -1) {
            if (y > -50) {
              this.$emit('pull-down')
            }
          }
          if (direction === 1) {
            this.$emit('pull-up')
          }
          if (y <= this.scroll.maxScrollY + 50) {
            this.$emit('bottom')
          }
        })
        this.scroll.on('scrollEnd', ({ y }) => {
          const direction = this.scroll.movingDirectionY
          this.$emit('scroll', {
            offset: Math.max(-y, 0),
            isUp: direction === -1
          })
          if (y <= this.scroll.maxScrollY + 50) {
            this.$emit('bottom')
          }
        })
      }
    },
    refresh() {
      return new Promise(resolve => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.scroll && this.scroll.refresh()
            this.$nextTick(() => {
              resolve()
            })
          }, 20)
        })
      })
    },
    scrollTo() {
      // 滚动到相应位置
      setTimeout(() => {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      }, 0)
    },
    scrollToElement() {
      setTimeout(() => {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }, 0)
    }
  }
}
</script>

<style>
.scroll-warp {
  height: 100%;
  overflow: hidden;
}
</style>
