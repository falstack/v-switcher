<style lang="scss">
@mixin transition {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
}

$default-header-height: 40px;

.v-switcher {
  overflow: hidden;
  position: relative;

  &.v-switcher-vertical {
    .v-switcher-header {
      &-wrap {
        float: left;
        height: 100%;
      }

      &-item {
        display: block;
      }
    }

    .v-switcher-content {
      overflow: hidden;
    }
  }

  &-header {
    position: relative;
    font-size: 0;
    z-index: 1;
    flex-grow: 1;
    padding: 0;
    margin: 0;

    &-before,
    &-after {
      flex-shrink: 0;
    }

    &-wrap {
      height: $default-header-height;
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

    &-end {
      text-align: right;
    }

    &-anchor {
      display: block;
      position: absolute;
      left: 0;
      @include transition();
      transition-property: width, height, transform;
      pointer-events: none;
    }

    &-item {
      height: 100%;
      display: inline-block;
      line-height: $default-header-height;
      text-align: center;
      font-size: 15px;
      color: #657786;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;
    }
  }

  &-content {
    z-index: 0;

    &-animated {
      display: flex;
      flex-direction: row;
      @include transition();
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
          position: relative;
          background-color: #fff;
        }
      }
    }

    &-wrap {
      position: relative;
    }
  }

  &-tab-wrap {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>

<template>
  <div
    class="v-switcher"
    :class="{ 'v-switcher-vertical': align === 'vertical' }"
    @mouseenter="cursorInner = true"
    @mouseleave="cursorInner = false"
  >
    <div ref="headerWrap" class="v-switcher-header-wrap">
      <div class="v-switcher-header-before">
        <slot name="header-before"></slot>
      </div>
      <div ref="tabWrap" class="v-switcher-tab-wrap">
        <ul
          ref="header"
          class="v-switcher-header"
          :class="`v-switcher-header-${align}`"
          :style="headerStyle"
        >
          <li
            v-for="(item, index) in formatHeaders"
            :key="index"
            ref="tab"
            :style="headerItemStyle"
            :class="{ 'is-active': index === focusIndex }"
            class="v-switcher-header-item"
            @mouseenter="_handleAnchorTrigger(index)"
            @mouseleave="_handleAnchorTrigger(focusIndex)"
            @click="_handleTabSwitch(index)"
          >
            <slot :name="`tab-${index}`">
              <i v-if="item.icon" :class="item.icon"></i>
              <span v-text="item.text"></span>
            </slot>
          </li>
          <li class="v-switcher-header-anchor" :style="anchorStyle">
            <slot name="anchor"></slot>
          </li>
        </ul>
      </div>
      <div class="v-switcher-header-after">
        <slot name="header-after"></slot>
      </div>
    </div>
    <div
      v-if="!routable"
      ref="content"
      class="v-switcher-content-wrap"
      :class="{ 'v-switcher-content-swipe': swipe }"
    >
      <div
        class="v-switcher-content"
        :class="[{ 'v-switcher-content-animated': animated && !swipe }]"
        :style="contentStyle"
      >
        <div
          v-for="(item, index) in headers"
          :key="index"
          :style="_computePanelStyle(index)"
          class="v-switcher-content-panel"
        >
          <slot :name="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swipe from './swipe'

export default {
  name: 'VSwitcher',
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
      validate: val =>
        ~['around', 'start', 'center', 'end', 'vertical'].indexOf(val)
    },
    headerTrigger: {
      type: String,
      default: 'click',
      validate: val => ~['click', 'hover'].indexOf(val)
    },
    anchorTrigger: {
      type: String,
      default: 'click',
      validate: val => ~['click', 'hover'].indexOf(val)
    },
    anchorPadding: {
      type: Number,
      default: 0,
      validate: val => val >= 0
    },
    swipe: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Number,
      default: 0
    },
    itemWidth: {
      type: String,
      default: '100%'
    }
  },
  data() {
    let focusIndex
    if (this.routable) {
      focusIndex = this.headers.map(_ => _.route).indexOf(this.$route.path)
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
      curScreenIndex: 0,
      maxScreenCount: 1
    }
  },
  computed: {
    formatHeaders() {
      const result = []
      this.headers.forEach((item, index) => {
        result.push({
          text: this._computeItemText(item, index),
          icon: this._computeItemIcon(item, index)
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
      const currentIndex = this.headers.map(_ => _.route).indexOf(newVal.path)
      this._handleTabSwitch(currentIndex, true)
    },
    headers(newVal) {
      this.focusIndex = newVal.map(_ => _.route).indexOf(this.$route.path)
      this._computeMaxScreenCount()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._computeAnchorStyle(this.focusIndex)
      this._computeHeaderStyle(0)
      this._initSwiper()
      this._initCarousel()
      if (this.align === 'start') {
        this._computeMaxScreenCount()
        window.addEventListener('resize', () => {
          this._computeMaxScreenCount()
        })
      }
    })
  },
  beforeDestroy() {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  },
  methods: {
    _initCarousel() {
      if (!this.autoplay) {
        return
      }
      this.timer = window.setInterval(() => {
        if (this.cursorInner) {
          return
        }
        this._switchTrigger(true)
      }, this.autoplay)
    },
    _initSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper = Swipe(this.$refs.content, {
        startSlide: this.focusIndex,
        speed: this.duration,
        continuous: !!this.autoplay,
        callback: this._handleTabSwitch
      })
    },
    _triggerSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper.slide(this.focusIndex, this.duration)
    },
    _computeHeaderStyle(lastFocusIndex) {
      if (this.align !== 'start') {
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
      if (!checkTab) {
        return
      }
      const headerWrap = this.$refs.tabWrap
      if (!headerWrap) {
        return
      }
      let { offsetLeft, offsetWidth } = checkTab
      const rect = checkTab.getBoundingClientRect()
      const headerWrapRect = headerWrap.getBoundingClientRect()
      const rectLeft = rect.left - headerWrapRect.left
      const rectRight = rect.right - headerWrapRect.left
      const innerWidth = headerWrap.offsetWidth
      let left = this.headerLeft
      if (
        isToRight &&
        !(rectLeft < innerWidth && rectRight < innerWidth) &&
        offsetWidth + offsetLeft > innerWidth
      ) {
        left = innerWidth - offsetWidth - offsetLeft
      }
      if (!isToRight && (rectLeft < 0 || rect.right < 0)) {
        left = -offsetLeft
      }
      this.curScreenIndex = Math.round(Math.abs(left / innerWidth))
      this.headerLeft = left
      this.headerStyle = {
        transform: `translateX(${left}px)`,
        transitionDuration: `${this.duration}ms`
      }
    },
    _computePanelStyle(index) {
      if (this.swipe) {
        return {
          width: this.itemWidth
        }
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
    _computeMaxScreenCount() {
      const tab = this.$refs.tab[this.headerCount - 1]
      const header = this.$refs.header
      const tabRect = tab.getBoundingClientRect()
      const fullWidth =
        tabRect.left + tabRect.width - header.getBoundingClientRect().left
      const { offsetWidth } = header
      this.maxScreenCount = Math.ceil(fullWidth / offsetWidth)
      this.$emit('calc-screen-count', this.maxScreenCount)
    },
    _computeAnchorStyle(index) {
      const tab = this.$refs.tab[index]
      if (!tab) {
        setTimeout(() => {
          this._computeAnchorStyle(index)
        }, 200)
        return
      }
      if (this.align === 'vertical') {
        const header = this.$refs.header
        this.anchorStyle = {
          width: `${header.offsetWidth}px`,
          height: `${tab.offsetHeight - this.anchorPadding * 2}px`,
          transform: `translateY(${tab.getBoundingClientRect().top -
            header.getBoundingClientRect().top +
            this.anchorPadding}px)`,
          transitionDuration: `${this.duration}ms`
        }
      } else {
        this.anchorStyle = {
          width: `${tab.offsetWidth - this.anchorPadding * 2}px`,
          transform: `translateX(${tab.offsetLeft + this.anchorPadding}px)`,
          transitionDuration: `${this.duration}ms`
        }
      }
    },
    _computeItemText(item, curIndex) {
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
    _computeItemIcon(item, curIndex) {
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
    _handleTabSwitch(index, force = false) {
      if (this.routable && !force) {
        return
      }
      const lastIndex = this.focusIndex
      if (this.focusIndex !== index) {
        this.focusIndex = index
        this.$emit('change', index)
      }
      this._computeAnchorStyle(index)
      this._computeHeaderStyle(lastIndex)
      this._triggerSwiper()
    },
    _switchTrigger(isNext) {
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
      this._handleTabSwitch(result)
    },
    _handleAnchorTrigger(index) {
      if (this.anchorTrigger === 'hover') {
        this._computeAnchorStyle(index)
      }
      if (this.headerTrigger === 'hover') {
        this._handleTabSwitch(index)
      }
    },
    _moveHeader(targetScreenCount) {
      const left = -targetScreenCount * this.$refs.header.offsetWidth
      this.headerStyle = {
        transform: `translateX(${left}px)`,
        transitionDuration: `${this.duration}ms`
      }
      this.headerLeft = left
      this.curScreenIndex = targetScreenCount
      return {
        is_begin: targetScreenCount === 0,
        is_end: targetScreenCount + 1 === this.maxScreenCount
      }
    },
    next() {
      this._switchTrigger(true)
    },
    prev() {
      this._switchTrigger(false)
    },
    forward() {
      if (
        this.align !== 'start' ||
        this.curScreenIndex + 1 >= this.maxScreenCount
      ) {
        return {
          is_begin: false,
          is_end: true
        }
      }
      return this._moveHeader(this.curScreenIndex + 1)
    },
    backward() {
      if (this.align !== 'start' || this.curScreenIndex === 0) {
        return {
          is_begin: true,
          is_end: false
        }
      }
      return this._moveHeader(this.curScreenIndex - 1)
    }
  }
}
</script>
