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
        white-space: normal;
      }

      &-anchor {
        top: 0;
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

    &-wrap {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;

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
      will-change: transform;
      pointer-events: none;
    }

    &-tabs {
      overflow: hidden;
      height: 100%;
      flex-grow: 1;
      order: 1;
    }

    &-before,
    &-after {
      position: relative;
      flex-shrink: 0;
      z-index: 1;
    }

    &-before {
      float: left;
      order: 0;
    }

    &-after {
      float: right;
      order: 3;
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

    &-panel {
      overflow: hidden;
      will-change: transform;
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
      <div class="v-switcher-header-after">
        <slot name="header-after"></slot>
      </div>
      <div ref="tabWrap" class="v-switcher-header-tabs">
        <ul
          v-show="!hiddenTabs"
          ref="header"
          class="v-switcher-header"
          :class="[`v-switcher-header-${align}`, `v-switcher-header-translate`]"
          :style="headerStyle"
          @touchstart.stop="_handleHeaderTouchStart"
          @touchmove.stop="_handleHeaderTouchMove"
          @touchend.stop="_handleHeaderTouchEnd"
          @mouseleave="_resetAnchorStyle"
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
import { getMatchedRouteIndex, on, off } from './utils'

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
        header: null,
        headerSize: 0,
        headerTabsWidth: 0,
        headerWrapWidth: 0,
        headerListWidth: 0,
        headerScrollHeight: 0,
        curScreenIndex: 0,
        maxScreenCount: 1
      }
    }
  },
  computed: {
    hiddenTabs() {
      return this.autoplay && this.headerCount <= 1
    },
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
      const result = {}
      if (!this.autoplay && this.align !== 'vertical') {
        result.height = `${this.headerHeight}px`
        result.lineHeight = `${this.headerHeight}px`
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
        if (currentIndex < 0) {
          this.focusIndex = -1
          this._resetAnchorStyle()
        } else {
          this._handleTabSwitch(currentIndex, true)
        }
      })
    }
    this.$watch('headers', newVal => {
      this.$nextTick(() => {
        const beforeIndex = this.focusIndex
        this._cacheComponentSize()
        if (this.routable) {
          this.focusIndex = getMatchedRouteIndex(newVal, this.$route.path)
        }
        if (beforeIndex !== this.focusIndex) {
          this._computeAnchorStyle(this.focusIndex)
          this._computeHeaderStyle(beforeIndex)
        }
      })
    })
    this.$watch('focusIndex', (newVal, oldVal) => {
      this._computeAnchorStyle(newVal)
      this._computeHeaderStyle(oldVal)
      this.$emit('change', newVal)
    })
  },
  mounted() {
    this.$nextTick(() => {
      this._cacheComponentSize()
      this._initSwipe()
      this._initCarousel()
      this.$emit('change', this.focusIndex)
      this.$nextTick(() => {
        this._computeAnchorStyle(this.focusIndex)
        this._computeHeaderStyle(0)
      })
      on(window, 'resize', this._cacheComponentSize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this._cacheComponentSize)
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
    _computeHeaderStyle(beforeIndex) {
      /**
       * 只支持 align 是 start
       */
      if (this.align !== 'start' || this.sizeCache.maxScreenCount <= 1) {
        return
      }
      const index = this.focusIndex
      if (index < 0) {
        return
      }

      /**
       * left <= 0
       */
      let left = this.headerLeft
      const max = 0
      const min = this.sizeCache.headerScrollHeight
      if (!index) {
        left = max
      } else if (index === this.headerCount - 1) {
        left = min
      } else {
        /**
         * 如果设置了 beforeHeader 则 tabs[0].left 不为 0
         */
        const baseLeft = this._getComponentSize('tabs', 0).left
        const curTabRect = this._getComponentSize('tabs', index)
        if (beforeIndex > index) {
          /**
           * 向前切换
           * 取当前 focus 的前一个 tab 来 check
           * 如果 checkTab 的左边在视口外，则重置 left
           */
          const checkTabRect = this._getComponentSize('tabs', index - 1)
          if (checkTabRect.left + left < baseLeft) {
            left = baseLeft - checkTabRect.left
          }
          /**
           * 如果下一个 tab 的宽度过大
           * 导致当前 tab 无法完全展示在屏幕内
           * 则重置 left
           */
          const condition =
            curTabRect.right - baseLeft - this.sizeCache.headerTabsWidth
          if (condition > left > 0) {
            left = -condition
          }
        } else {
          /**
           * 向后切换
           * 取当前 focus 的后一个 tab 来 check
           * 如果 checkTab 的右边
           */
          const checkTabRect = this._getComponentSize('tabs', index + 1)
          const result =
            checkTabRect.right - baseLeft - this.sizeCache.headerTabsWidth
          if (result > 0) {
            left = -result
          }
          /**
           * 如果上一个 tab 的宽度过大
           * 导致当前 tab 无法完全展示在屏幕内
           * 则重置 left 为当前 tab 的 left
           */
          const condition = curTabRect.left - baseLeft
          if (left + condition < 0) {
            left = -condition
          }
        }
      }
      if (left < min) {
        left = min
      } else if (left > max) {
        left = max
      }
      this._setHeaderScroll(left)
      this._computeCurrentScreenIndex(left)
      this.headerLeft = left
    },
    _setHeaderScroll(left, duration = true) {
      this.headerStyle = {
        transform: `translateX(${left}px)`,
        transitionDuration: `${duration ? this.duration : 0}ms`
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
      const fullWidth = tabSize.left + tabSize.width - header.left
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
      const firstTab = this._getComponentSize('tabs', 0)
      if (this.align === 'vertical') {
        const header = this._getComponentSize('header')
        this.anchorStyle = {
          height: `${tabSize.height - anchorPadding * 2}px`,
          transform: `translateY(${tabSize.top -
            header.top +
            anchorPadding}px)`,
          transitionDuration: `${this.duration}ms`
        }
      } else {
        this.anchorStyle = {
          width: `${tabSize.width - anchorPadding * 2}px`,
          transform: `translateX(${tabSize.left -
            firstTab.left +
            anchorPadding}px)`,
          transitionDuration: `${this.duration}ms`
        }
      }
    },
    _resetAnchorStyle() {
      if (this.focusIndex > -1) {
        return
      }
      if (this.align === 'vertical') {
        this.anchorStyle.transform = 'translateY(-100%)'
      } else {
        this.anchorStyle.transform = 'translateX(-100%)'
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
      this.lastSlide = Date.now()
      this._handleTabSwitch(index, false, false)
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
      }
      move && this._triggerSwiper()
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
      if (this.sizeCache.maxScreenCount <= 1) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      this.headerLastPoint =
        this.align === 'vertical' ? point.pageY : point.pageX
    },
    _handleHeaderTouchMove(e) {
      if (this.sizeCache.maxScreenCount <= 1) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      const isVertical = this.align === 'vertical'
      const curPoint = isVertical ? point.pageY : point.pageX
      const delta = curPoint - this.headerLastPoint
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
          left = this.sizeCache.headerScrollHeight
        }
      }
      this.headerLeft = left
      this._setHeaderScroll(left, false)
    },
    _handleHeaderTouchEnd() {
      if (this.sizeCache.maxScreenCount <= 1) {
        return
      }
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
          ? firstRect.top - lastRect.bottom
          : lastRect.right - firstRect.left
    },
    _cacheComponentSize() {
      const tabs = this.$refs.tab
      if (tabs) {
        const tabSize = []
        tabs.forEach(tab => {
          const rect = tab.getBoundingClientRect()
          tabSize.push({
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
          })
        })
        this.sizeCache.tabs = tabSize
        this._computeComponentSize()
      }
      const headerWrap = this.$refs.headerWrap
      if (headerWrap) {
        this.sizeCache.headerWrapWidth = headerWrap.clientWidth
      }
      const tabsWrap = this.$refs.tabWrap
      if (tabsWrap) {
        this.sizeCache.headerTabsWidth = tabsWrap.clientWidth
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
      this.sizeCache.headerScrollHeight =
        this.sizeCache.headerTabsWidth - this.sizeCache.headerSize
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
