<style lang="scss">
.v-container {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>

<template>
  <div class="v-container" @scroll="handleScroll">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Container',
  data() {
    return {
      lastScrollTop: 0
    }
  },
  methods: {
    handleScroll(evt) {
      const scrollTop = evt.target.scrollTop
      const isUp = this.lastScrollTop > scrollTop
      if (isUp) {
        if (scrollTop < 50) {
          this.$emit('pull-down')
        }
      } else {
        if (scrollTop < 50) {
          this.$emit('pull-up')
        }
        if (this.$el.scrollHeight - this.$el.clientHeight - scrollTop < 50) {
          this.$emit('bottom')
        }
      }
      this.lastScrollTop = scrollTop
      console.log(scrollTop)
      this.$emit('scroll', {
        offset: scrollTop,
        isUp
      })
    }
  }
}
</script>
