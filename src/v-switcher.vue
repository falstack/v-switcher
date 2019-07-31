<style lang="scss">
@mixin transition {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
}

.v-switcher {
  overflow: hidden;
  position: relative;

  &.v-switcher-vertical {
    .v-switcher-header {
      &-wrap {
        float: left;
        height: 100% !important;
      }

      &-item {
        display: block;
      }
    }

    .v-switcher-content {
      overflow: hidden;
    }
  }

  &.v-switcher-sticky {
    height: 100%;

    .v-switcher-content-wrap,
    .v-switcher-content,
    .v-switcher-content-panel {
      height: 100%;
    }

    .v-switcher-content-wrap {
      box-sizing: border-box;
    }
  }

  &-header {
    position: relative;
    font-size: 0;
    z-index: 1;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    flex-grow: 1;

    &-start {
      text-align: left;
      display: flex;
      flex-direction: row;
      @include transition();

      .v-switcher-header-item {
        flex-shrink: 0;
      }
    }

    &-before,
    &-after {
      position: relative;
      flex-shrink: 0;
      z-index: 1;
    }

    &-wrap {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &-fixed {
        background-color: #fff;
        position: fixed;
        z-index: 10;
      }
    }

    &-center {
      text-align: center;
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

    &-tabs {
      overflow: hidden;
      flex-grow: 1;
      height: 100%;
      width: 100%;
    }

    &-item {
      display: inline-block;
      text-align: center;
      font-size: 15px;
      color: #657786;
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
}
</style>

<template>
  <div
    class="v-switcher"
    :class="[
      { 'v-switcher-vertical': align === 'vertical' },
      { 'v-switcher-sticky': sticky }
    ]"
    @mouseenter="cursorInner = true"
    @mouseleave="cursorInner = false"
    @touchstart="touchInner = true"
    @touchend="touchInner = false"
  >
    <div
      ref="headerWrap"
      class="v-switcher-header-wrap"
      :class="{ 'v-switcher-header-wrap-fixed': isFixed }"
      :style="[{ height: `${headerHeight}px` }, fixedHeaderStyle]"
    >
      <div class="v-switcher-header-before">
        <slot name="header-before"></slot>
      </div>
      <div ref="tabWrap" class="v-switcher-header-tabs">
        <ul
          ref="header"
          class="v-switcher-header"
          :class="[`v-switcher-header-${align}`, `v-switcher-header-translate`]"
          :style="headerStyle"
          @touchstart.stop="_handleHeaderTouchStart"
          @touchmove.stop="_handleHeaderTouchMove"
          @touchend.stop="_handleHeaderTouchEnd"
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
    <div v-show="showFixedShim" ref="fixed" :style="fixedShimStyle" />
    <div
      v-if="!routable"
      ref="content"
      class="v-switcher-content-wrap"
      :class="{ 'v-switcher-content-swipe': swipe }"
      :style="contentWrapStyle"
    >
      <div
        class="v-switcher-content"
        :class="[{ 'v-switcher-content-animated': animated && !swipe }]"
        :style="contentStyle"
        @touchstart="_handleContentTouchStart"
        @touchmove="_handleContentTouchMove"
        @touchend="_handleContentTouchEnd"
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
import Swipe from './swipe.js'
import affix from './affix.js'
import { getMatchedRouteIndex } from './utils'

export default {
  name: 'VSwitcher',
  mixins: [affix],
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
      default: 'start',
      validator: val =>
        ~['around', 'start', 'center', 'end', 'vertical'].indexOf(val)
    },
    headerTrigger: {
      type: String,
      default: 'click',
      validator: val => ~['click', 'hover'].indexOf(val)
    },
    anchorTrigger: {
      type: String,
      default: 'click',
      validator: val => ~['click', 'hover'].indexOf(val)
    },
    anchorPadding: {
      type: Number,
      default: 0,
      validator: val => val >= 0
    },
    swipe: {
      type: Boolean,
      default: false
    },
    autoplay: {
      type: Number,
      default: 0
    },
    contentWidth: {
      type: String,
      default: '100%'
    },
    headerHeight: {
      type: Number,
      default: 40,
      validator: val => val >= 0
    },
    sticky: {
      type: Boolean,
      default: false
    },
    disabledSwipe: {
      type: Boolean,
      default: false
    },
    continuousSwipe: {
      type: Boolean,
      default: false
    },
    fixedTop: { // eslint-disable-line
      type: Number
    }
  },
  data() {
    let focusIndex
    if (this.routable) {
      focusIndex = getMatchedRouteIndex(this.headers, this.$route.path)
    } else {
      focusIndex = this.defaultIndex
    }
    return {
      cursorInner: false,
      touchInner: false,
      focusIndex,
      anchorStyle: {},
      headerStyle: {},
      isFixed: false,
      showFixedShim: false,
      fixedShimStyle: {},
      fixedHeaderStyle: {},
      timer: 0,
      headerLeft: 0,
      headerLastPoint: 0,
      contentStartPoint: {
        x: 0,
        y: 0
      },
      contentDeltaPoint: {
        x: 0,
        y: 0
      },
      swiper: null,
      lastSlide: 0,
      sizeCache: {
        tabs: [],
        headerWrap: null,
        tabsWrap: null,
        header: null,
        headerSize: 0,
        headerTabsWidth: 0,
        headerWrapWidth: 0,
        headerListWidth: 0,
        curScreenIndex: 0,
        maxScreenCount: 1
      }
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
      const result = {
        height: `${this.headerHeight}px`,
        lineHeight: `${this.headerHeight}px`
      }
      if (this.align === 'around') {
        result.width = `${100 / this.headerCount}%`
      }
      return result
    },
    contentWrapStyle() {
      const style = {}
      if (this.sticky) {
        style.paddingTop = `${this.headerHeight}px`
        style.marginTop = `-${this.headerHeight}px`
      }
      return style
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
    },
    notTouchDevice() {
      return typeof document === 'undefined'
        ? true
        : !('ontouchstart' in document.documentElement)
    }
  },
  beforeMount() {
    if (this.routable) {
      this.$watch('$route', newVal => {
        const currentIndex = getMatchedRouteIndex(this.headers, newVal.path)
        this._handleTabSwitch(currentIndex, true)
      })
    }
    this.$watch('headers', newVal => {
      if (this.routable) {
        this.focusIndex = getMatchedRouteIndex(newVal, this.$route.path)
      }
      this._cacheComponentSize()
    })
  },
  mounted() {
    this.$nextTick(() => {
      this._cacheComponentSize()
      this._initSwipe()
      this._initCarousel()
      window.addEventListener('resize', () => {
        this._cacheComponentSize()
      })
      this.$emit('change', this.focusIndex)
      this.$nextTick(() => {
        this._computeAnchorStyle(this.focusIndex)
        this._computeHeaderStyle()
      })
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
        if (Date.now() - this.lastSlide < this.duration) {
          return
        }
        if (this.notTouchDevice) {
          if (this.cursorInner) {
            return
          }
        } else {
          if (this.touchInner) {
            return
          }
        }
        this._switchTrigger(true)
      }, this.autoplay)
    },
    _initSwipe() {
      if (!this.swipe) {
        return
      }
      this.swiper = Swipe(this.$refs.content, {
        startSlide: this.focusIndex,
        speed: this.duration,
        disabled: this.disabledSwipe,
        continuous: this.continuousSwipe || !!this.autoplay,
        callback: this._swipeCallback
      })
    },
    _triggerSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper.slide(this.focusIndex, this.duration)
    },
    _computeHeaderStyle() {
      /**
       * 只支持 align 是 start
       */
      if (
        this.align !== 'start' ||
        this.sizeCache.headerSize < this.sizeCache.headerTabsWidth
      ) {
        return
      }
      const index = this.focusIndex
      if (index < 0) {
        return
      }

      let left = this.headerLeft
      if (!index) {
        left = 0
      } else if (index === this.headerCount - 1) {
        left = this.sizeCache.headerTabsWidth - this.sizeCache.headerSize
      } else {
        const firstTabRect = this._getComponentSize('tabs', 0)
        const checkTabRect = this._getComponentSize('tabs', index)
        left = firstTabRect.rect.left - checkTabRect.rect.left
        const max = this.sizeCache.headerTabsWidth - this.sizeCache.headerSize
        if (left < max) {
          left = max
        }
      }
      this._setHeaderScroll(left)
      this._computeCurrentScreenIndex(left)
      this.headerLeft = left
    },
    _setHeaderScroll(left) {
      this.headerStyle = {
        transform: `translateX(${left}px)`,
        transitionDuration: `${this.duration}ms`
      }
    },
    _computePanelStyle(index) {
      if (this.swipe) {
        return {
          width: this.contentWidth
        }
      }
      if (this.animated) {
        return {
          width: `${100 / this.headerCount}%`
        }
      }
      if (this.focusIndex !== index) {
        return {
          display: 'none'
        }
      }
      return {}
    },
    _computeMaxScreenCount() {
      if (this.align !== 'start') {
        return
      }
      const tabSize = this._getComponentSize('tabs', this.headerCount - 1)
      const header = this._getComponentSize('header')
      if (!tabSize || !header) {
        return
      }
      const fullWidth = tabSize.rect.left + tabSize.rect.width - header.left
      this.sizeCache.maxScreenCount = Math.ceil(
        fullWidth / this.sizeCache.headerListWidth
      )
      this.$emit('calc-screen-count', this.sizeCache.maxScreenCount)
    },
    _computeAnchorStyle(index, loop = 0) {
      if (index < 0) {
        return
      }
      const tabSize = this._getComponentSize('tabs', index)
      if (!tabSize) {
        // 这个地方 DOM 可能还没渲染好，refs 不存在，循环 5 次来取值
        if (loop < 5) {
          setTimeout(() => {
            this._computeAnchorStyle(this.focusIndex, loop + 1)
          }, 200)
        }
        return
      }
      const anchorPadding = +this.anchorPadding
      if (this.align === 'vertical') {
        const header = this._getComponentSize('header')
        this.anchorStyle = {
          width: `${this.sizeCache.headerListWidth}px`,
          height: `${tabSize.offset.height - anchorPadding * 2}px`,
          transform: `translateY(${tabSize.rect.top -
            header.top +
            anchorPadding}px)`,
          transitionDuration: `${this.duration}ms`
        }
      } else {
        this.anchorStyle = {
          width: `${tabSize.rect.width - anchorPadding * 2}px`,
          transform: `translateX(${tabSize.offset.left + anchorPadding}px)`,
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
    _swipeCallback(index) {
      this.$nextTick(() => {
        this.lastSlide = Date.now()
        this._handleTabSwitch(index, false, false)
      })
    },
    _handleTabSwitch(index, force = false, move = true) {
      if (this.routable && !force) {
        return
      }
      let newIndex = index
      if (this.autoplay && index >= this.headerCount) {
        newIndex = (newIndex - this.headerCount) % 2 ? this.headerCount - 1 : 0
      }
      if (this.focusIndex !== newIndex) {
        this.focusIndex = newIndex
        this.$emit('change', newIndex)
      }
      move && this._triggerSwiper()
      this._afterTabSwitch()
    },
    _afterTabSwitch() {
      this.$nextTick(() => {
        this._computeAnchorStyle(this.focusIndex)
        this._computeHeaderStyle()
      })
    },
    _switchTrigger(isNext) {
      if (Date.now() - this.lastSlide < this.duration) {
        return
      }
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
      const left = -targetScreenCount * this.sizeCache.headerListWidth
      this._setHeaderScroll(left)
      this.headerLeft = left
      this.sizeCache.curScreenIndex = targetScreenCount
      this.$emit('header-move', {
        is_first: targetScreenCount === 0,
        is_last: targetScreenCount + 1 === this.sizeCache.maxScreenCount
      })
    },
    _handleContentTouchStart(e) {
      if (this.swipe || !this.animated) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      this.contentStartPoint = {
        x: point.pageX,
        y: point.pageY
      }
    },
    _handleContentTouchMove(e) {
      if (this.swipe || !this.animated) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      const lastPoint = this.contentStartPoint
      this.contentDeltaPoint = {
        x: point.pageX - lastPoint.x,
        y: point.pageY - lastPoint.y
      }
    },
    _handleContentTouchEnd() {
      const delta = this.contentDeltaPoint
      if (Math.abs(delta.x) < Math.abs(delta.y)) {
        return
      }
      if (Math.abs(delta.x) * 3 < this.sizeCache.headerWrapWidth) {
        return
      }
      if (delta.x > 0) {
        if (!this.focusIndex) {
          return
        }
        this.prev()
      } else {
        if (this.focusIndex >= this.headerCount - 1) {
          return
        }
        this.next()
      }
      this.lastSlide = Date.now()
    },
    _handleHeaderTouchStart(e) {
      const point = e.touches ? e.touches[0] : e
      this.headerLastPoint =
        this.align === 'vertical' ? point.pageY : point.pageX
    },
    _handleHeaderTouchMove(e) {
      const point = e.touches ? e.touches[0] : e
      const isVertical = this.align === 'vertical'
      const curPoint = isVertical ? point.pageY : point.pageX
      const delta = (curPoint - this.headerLastPoint) * 3
      this.headerLastPoint = curPoint
      let left = this.headerLeft + delta
      if (isVertical) {
        // 到顶了
        if (delta < 0 && left < 0) {
          return
        }
        // TODO：暂不支持垂直滚动吧~~~
        return
      } else {
        // 到开头了
        if (left > 0 && delta > 0) {
          left = 0
        } else if (
          delta < 0 &&
          left + this.sizeCache.headerSize < this.sizeCache.headerTabsWidth
        ) {
          left = this.sizeCache.headerTabsWidth - this.sizeCache.headerSize
        }
      }
      this.headerLeft = left
      this._setHeaderScroll(left)
    },
    _handleHeaderTouchEnd() {
      this._computeCurrentScreenIndex(this.headerLeft)
    },
    _computeCurrentScreenIndex(left) {
      const result = Math.round(Math.abs(left / this.sizeCache.headerWrapWidth))
      this.sizeCache.curScreenIndex = result
      this.$emit('header-move', {
        is_first: result === 0,
        is_last: result + 1 === this.sizeCache.maxScreenCount
      })
    },
    _computeComponentSize() {
      const lastRect = this._getComponentSize('tabs', this.headerCount - 1)
      const firstRect = this._getComponentSize('tabs', 0)
      if (!firstRect || !lastRect) {
        return
      }
      this.sizeCache.headerSize =
        this.align === 'vertical'
          ? firstRect.rect.top - lastRect.rect.bottom
          : lastRect.rect.right - firstRect.rect.left
    },
    _cacheComponentSize() {
      const tabs = this.$refs.tab
      if (tabs) {
        const tabSize = []
        tabs.forEach(tab => {
          const rect = tab.getBoundingClientRect()
          tabSize.push({
            rect: {
              top: rect.top,
              left: rect.left,
              right: rect.right,
              bottom: rect.bottom,
              width: rect.width,
              height: rect.height
            },
            offset: {
              left: tab.offsetLeft
            }
          })
        })
        this.sizeCache.tabs = tabSize
        this._computeComponentSize()
      }
      const headerWrap = this.$refs.headerWrap
      if (headerWrap) {
        const headerWrapRect = headerWrap.getBoundingClientRect()
        this.sizeCache.headerWrap = {
          top: headerWrapRect.top,
          left: headerWrapRect.left,
          right: headerWrapRect.right,
          bottom: headerWrapRect.bottom,
          width: headerWrapRect.width,
          height: headerWrapRect.height
        }
        this.sizeCache.headerWrapWidth = headerWrapRect.width
      }
      const tabsWrap = this.$refs.tabWrap
      if (tabsWrap) {
        const tabsWrapRect = tabsWrap.getBoundingClientRect()
        this.sizeCache.tabsWrap = {
          top: tabsWrapRect.top,
          left: tabsWrapRect.left,
          right: tabsWrapRect.right,
          bottom: tabsWrapRect.bottom,
          width: tabsWrapRect.width,
          height: tabsWrapRect.height
        }
        this.sizeCache.headerTabsWidth = tabsWrapRect.width
      }
      const header = this.$refs.header
      if (header) {
        const headerRect = header.getBoundingClientRect()
        this.sizeCache.header = {
          top: headerRect.top,
          left: headerRect.left,
          right: headerRect.right,
          bottom: headerRect.bottom
        }
        this.sizeCache.headerListWidth = headerRect.width
        this._computeMaxScreenCount()
      }
    },
    _getComponentSize(type, index = -1) {
      const value = this.sizeCache[type]
      if (!value) {
        return null
      }
      if (index >= 0) {
        if (!value[index]) {
          return null
        }
        return value[index]
      }
      return value
    },
    next() {
      if (this.swiper) {
        this.swiper.next()
      } else {
        this._switchTrigger(true)
      }
    },
    prev() {
      if (this.swiper) {
        this.swiper.prev()
      } else {
        this._switchTrigger(false)
      }
    },
    forward() {
      if (
        this.align !== 'start' ||
        this.sizeCache.curScreenIndex + 1 >= this.sizeCache.maxScreenCount
      ) {
        this.$emit('header-move', {
          is_first: false,
          is_last: true
        })
      } else {
        this._moveHeader(this.sizeCache.curScreenIndex + 1)
      }
    },
    backward() {
      if (this.align !== 'start' || this.sizeCache.curScreenIndex === 0) {
        this.$emit('header-move', {
          is_first: true,
          is_last: false
        })
      } else {
        this._moveHeader(this.sizeCache.curScreenIndex - 1)
      }
    }
  }
}
</script>
