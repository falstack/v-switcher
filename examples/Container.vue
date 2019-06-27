<style lang="scss">
.v-scroller {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>

<template>
  <div
    class="v-scroller"
    @scroll="handleScroll"
    @touchstart="handleStart"
    @touchmove="handleMove"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VScroller',
  data() {
    return {
      lastScrollTop: 0,
      lastTouchY: 0
    }
  },
  methods: {
    handleScroll(evt) {
      const scrollTop = evt.target.scrollTop
      const isUp = this.lastScrollTop > scrollTop
      if (isUp) {
        if (scrollTop < 50 && scrollTop > 0) {
          this.$emit('pull-down')
        }
      } else {
        if (scrollTop < 50 && scrollTop > 0) {
          this.$emit('pull-up')
        }
        if (this.$el.scrollHeight - this.$el.clientHeight - scrollTop < 50) {
          this.$emit('bottom')
        }
      }

      this.lastScrollTop = scrollTop
      this.$emit('scroll', {
        offset: scrollTop,
        isUp
      })
    },
    handleStart(evt) {
      this.lastTouchY = evt.touches[0].pageY
      this.fixedIOS()
    },
    handleMove(evt) {
      if (evt.touches[0].pageY > this.lastTouchY && this.lastScrollTop <= 0) {
        this.$emit('pull-down')
      }
    },
    fixedIOS() {
      const el = this.$el
      let top = el.scrollTop
      let totalScroll = el.scrollHeight
      let currentScroll = top + el.offsetHeight

      if (top === 0) {
        el.scrollTop = 1
      } else if (currentScroll === totalScroll) {
        el.scrollTop = top - 1
      }
    }
  }
}
</script>
