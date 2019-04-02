<style lang="scss">
@mixin transition {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
}

$default-header-height: 40px;
$default-border-height: 1px;
$active-item-border-height: 2px;
$active-item-color: #ff6881;

.v-switcher {
  overflow: hidden;

  &-header {
    position: relative;
    font-size: 0;
    z-index: 1;
    flex-grow: 1;

    &-wrap {
      height: $default-header-height;
      border-bottom: $default-border-height solid #e5e5e5;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &-center {
      text-align: center;
    }

    &-start {
      text-align: left;
      display: flex;
      flex-direction: row;
      @include transition();

      .v-switcher-header-item {
        flex-shrink: 0;
      }
    }

    &-center,
    &-start {
      .v-switcher-header-item {
        padding: 0 25px;
      }
    }

    &-end {
      text-align: right;
    }

    &-anchor {
      position: absolute;
      left: 0;
      @include transition();
    }

    &-item {
      height: 100%;
      display: inline-block;
      line-height: $default-header-height - $default-border-height;
      text-align: center;
      font-size: 15px;
      color: #657786;
      user-select: none;

      &-cell {
        display: inline-block;
        line-height: $default-header-height - $default-border-height -
          $active-item-border-height;
        height: $default-header-height - $default-border-height -
          $active-item-border-height;
      }

      &.is-active &-cell {
        color: $active-item-color;
        border-bottom: $active-item-border-height solid $active-item-color;
      }
    }
  }

  &-content {
    &-animated {
      display: flex;
      flex-direction: row;
      @include transition();
    }

    &-sticky {
      box-sizing: border-box;
      padding-top: $default-header-height;
      margin-top: -$default-header-height;

      .v-switcher-content-panel {
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
      }
    }

    &-swipe {
      overflow: hidden;
      visibility: hidden;
      position: relative;

      .v-switcher-content {
        overflow: hidden;
        position: relative;
        box-sizing: border-box;

        &-panel {
          float: left;
          width: 100%;
          position: relative;
        }
      }
    }

    &-wrap {
      position: relative;
    }
  }

  &-indicator {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>

<template>
  <div
    class="v-switcher"
    :class="{ 'v-switcher-focus': cursorInner }"
    @mouseenter="cursorInner = true"
    @mouseleave="cursorInner = false"
  >
    <div class="v-switcher-header-wrap">
      <div ref="headerBefore"><slot name="header-before"></slot></div>
      <div
        class="v-switcher-header"
        :class="`v-switcher-header-${align}`"
        :style="headerStyle"
      >
        <div class="v-switcher-header-anchor" :style="anchorStyle">
          <slot name="anchor"></slot>
        </div>
        <div
          v-for="(item, index) in formatHeaders"
          :key="index"
          :class="{ 'is-active': index === focusIndex }"
          :style="headerItemStyle"
          ref="tab"
          class="v-switcher-header-item"
          @click="handleTabSwitch(index)"
          @mouseenter="handleMouseEvent(index)"
        >
          <div class="v-switcher-header-item-cell">
            <i v-if="item.icon" :class="item.icon"></i>
            <span v-text="item.text"></span>
          </div>
        </div>
      </div>
      <div ref="headerAfter"><slot name="header-after"></slot></div>
    </div>
    <div
      v-if="!routable"
      class="v-switcher-content-wrap"
      :class="{ 'v-switcher-content-swipe': swipe }"
      ref="content"
    >
      <div
        class="v-switcher-content"
        :class="[
          { 'v-switcher-content-animated': animated && !swipe },
          { 'v-switcher-content-sticky': sticky }
        ]"
        :style="contentStyle"
      >
        <div
          v-for="(item, index) in headers"
          :style="computePanelStyle(index)"
          :key="index"
          class="v-switcher-content-panel"
        >
          <slot :name="index" />
        </div>
      </div>
      <div v-if="indicator" class="v-switcher-indicator">
        <button @click="switchTrigger(false)">
          <slot name="btn-prev">prev</slot>
        </button>
        <button @click="switchTrigger(true)">
          <slot name="btn-next">next</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from './swipe'

export default {
  name: 'VueLayoutTab',
  props: {
    headers: {
      type: Array,
      required: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    routable: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 300
    },
    align: {
      type: String,
      default: 'around',
      validate: val => ~['around', 'start', 'center', 'end'].indexOf(val)
    },
    trigger: {
      type: String,
      default: 'click',
      validate: val => ~['click', 'hover'].indexOf(val)
    },
    swipe: {
      type: Boolean,
      default: false
    },
    sticky: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Number,
      default: 0
    },
    indicator: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let focusIndex
    if (this.routable) {
      focusIndex = this.headers.map(_ => _.route).indexOf(this.$route.name)
    } else {
      focusIndex = this.defaultIndex
    }
    return {
      cursorInner: false,
      focusIndex,
      anchorStyle: {},
      headerStyle: {},
      timer: 0,
      headerLeft: 0,
      swiper: null,
      windowHeight: this.$isServer ? 0 : window.innerHeight
    }
  },
  computed: {
    formatHeaders() {
      const result = []
      this.headers.forEach((item, index) => {
        result.push({
          text: this.computeItemText(item, index),
          icon: this.computeItemIcon(item, index)
        })
      })
      return result
    },
    headerCount() {
      return this.headers.length
    },
    headerItemStyle() {
      if (this.align !== 'around') {
        return {}
      }
      return this.aroundHeaderWidth
    },
    aroundHeaderWidth() {
      return {
        width: `${100 / this.headerCount}%`
      }
    },
    contentStyle() {
      const style = {}
      if (this.sticky) {
        style.height = `${this.windowHeight}px`
      }
      if (this.swipe) {
        return style
      }
      if (this.animated) {
        style.width = `${this.headerCount * 100}%`
        style.transform = `translateX(${(this.focusIndex / this.headerCount) *
          -100}%)`
        style.transitionDuration = `${this.duration}ms`
      }
      return style
    }
  },
  watch: {
    $route(newVal) {
      this.focusIndex = this.headers.map(_ => _.route).indexOf(newVal.name)
      this.computeHeaderStyle(0)
    },
    headers(newVal) {
      this.focusIndex = newVal.map(_ => _.route).indexOf(this.$route.name)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.computeAnchorStyle()
      this.computeHeaderStyle(0)
      this.initSwiper()
      this.initCarousel()
    })
    if (this.sticky) {
      window.addEventListener('resize', this.computeContentHeight)
    }
  },
  beforeDestroy() {
    if (this.sticky) {
      window.removeEventListener('resize', this.computeContentHeight)
    }
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  },
  methods: {
    initCarousel() {
      if (!this.autoplay) {
        return
      }
      this.timer = window.setInterval(() => {
        if (this.cursorInner) {
          return
        }
        this.switchTrigger(true)
      }, this.autoplay)
    },
    initSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper = Swipe(this.$refs.content, {
        startSlide: this.focusIndex,
        speed: this.duration,
        continuous: !!this.autoplay || this.indicator,
        callback: this.handleTabSwitch
      })
    },
    triggerSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper.slide(this.focusIndex, this.duration)
    },
    computeContentHeight() {
      this.windowHeight = window.innerHeight
    },
    computeHeaderStyle(lastFocusIndex) {
      if (this.align !== 'start' || this.focusIndex <= 0) {
        return
      }
      const index = this.focusIndex
      const tabs = this.$refs.tab
      const isToRight = index > lastFocusIndex
      let checkTab
      if (isToRight) {
        checkTab =
          index === this.headerCount - 1 ? tabs[index] : tabs[index + 1]
      } else {
        checkTab = index ? tabs[index - 1] : tabs[0]
      }
      let { offsetLeft, offsetWidth } = checkTab
      const { innerWidth } = window
      const rect = checkTab.getBoundingClientRect()
      const beforeWidth = this.$refs.headerBefore.offsetWidth
      let left = this.headerLeft
      if (
        isToRight &&
        !(rect.left < innerWidth && rect.right < innerWidth) &&
        beforeWidth + offsetWidth + offsetLeft > innerWidth
      ) {
        left = innerWidth - offsetWidth - offsetLeft - beforeWidth
      }
      if (!isToRight && (rect.left < beforeWidth || rect.right < 0)) {
        left = -offsetLeft
      }
      this.headerLeft = left
      this.headerStyle = {
        transform: `translateX(${left}px)`,
        transitionDuration: `${this.duration}ms`
      }
    },
    computePanelStyle(index) {
      if (this.swipe) {
        return {}
      }
      if (this.animated) {
        return this.aroundHeaderWidth
      }
      if (this.focusIndex !== index) {
        return {
          display: 'none'
        }
      }
      return {}
    },
    computeAnchorStyle() {
      const tab = this.$refs.tab[this.focusIndex]
      if (!tab) {
        setTimeout(this.computeAnchorStyle, 200)
        return
      }
      this.anchorStyle = {
        width: `${tab.offsetWidth}px`,
        transform: `translateX(${tab.offsetLeft}px)`,
        transitionDuration: `${this.duration}ms`
      }
    },
    computeItemText(item, curIndex) {
      let result
      if (typeof item === 'string') {
        result = item
      } else {
        result = item.label || item.name || item.text
        if (this.focusIndex === curIndex) {
          const temp =
            item['label-active'] || item['name-active'] || item['text-active']
          if (temp) {
            result = temp
          }
        }
      }
      return result
    },
    computeItemIcon(item, curIndex) {
      let result
      if (typeof item === 'string' || !item.icon) {
        result = ''
      } else {
        result = `iconfont ic-${item.icon.replace('ic-', '')}`
        if (this.focusIndex === curIndex && item['icon-active']) {
          result = `iconfont ic-${item['icon-active'].replace('ic-', '')}`
        }
      }
      return result
    },
    handleTabSwitch(index) {
      if (this.focusIndex === index) {
        return
      }
      if (this.routable) {
        this.$router.push({
          name: this.headers[index].route,
          params: this.$route.params
        })
      }
      const lastIndex = this.focusIndex
      this.focusIndex = index
      this.$emit('change', index)
      this.computeAnchorStyle()
      this.computeHeaderStyle(lastIndex)
      this.triggerSwiper()
    },
    handleMouseEvent(index) {
      if (this.trigger !== 'hover') {
        return
      }
      this.handleTabSwitch(index)
    },
    switchTrigger(isNext) {
      let result
      if (isNext) {
        if (this.focusIndex === this.headerCount - 1) {
          result = 0
        } else {
          result = this.focusIndex + 1
        }
      } else {
        if (this.focusIndex === 0) {
          result = this.headerCount - 1
        } else {
          result = this.focusIndex - 1
        }
      }
      this.handleTabSwitch(result)
    }
  }
}
</script>
