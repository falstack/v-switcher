<style lang="scss">
.vue-scroll {
  height: 100%;
}
</style>

<template>
  <div class="vue-scroll">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'VueScroll',
  props: {
    data: {
      type: Array,
      default: null
    },
    refresh: {
      type: Function,
      default: null
    },
    loadMore: {
      type: Function,
      default: null
    }
  },
  mounted() {
    // 保证在DOM渲染完毕后初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$el) {
        return
      }
      // better-scroll的初始化
      this.scroll = new BScroll(this.$el, {
        click: true
      })

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.refresh) {
        this.scroll.on('touchend', pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.refresh()
          }
        })
      }

      if (this.loadMore) {
        this.scroll.on('scrollEnd', () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.loadMore()
          }
        })
      }
    },
    scrollTo() {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll && this.scroll.refresh()
      }, 20)
    }
  },
  data() {
    return {
      scroll: null
    }
  }
}
</script>
