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

    &-translate {
      flex-grow: 1;

      .v-switcher-header-start {
        text-align: left;
        display: flex;
        flex-direction: row;
        @include transition();

        .v-switcher-header-item {
          flex-shrink: 0;
        }
      }
    }

    &-scroll {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      height: 110%;
      padding-bottom: 10%;
      box-sizing: content-box;
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
          :class="[
            `v-switcher-header-${align}`,
            `v-switcher-header-${notTouchDevice ? 'translate' : 'scroll'}`
          ]"
          :style="headerStyle"
          @touchstart="_handleHeaderTouchStart"
          @touchmove="_handleHeaderTouchMove"
          @scroll="_setHeaderLeft"
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
import scroll from './scroll.js'

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, pos) {
      pos = !pos || pos < 0 ? 0 : +pos
      return this.substring(pos, pos + search.length) === search
    }
  })
}

const getMatchedRouteIndex = (headers, path) => {
  let result = -1
  headers
    .map(_ => _.route)
    .forEach((route, index) => {
      if (path.startsWith(route)) {
        result = index
      }
    })
  return result
}

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
      default: 'around',
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
      isFixed: false,
      showFixedShim: false,
      fixedShimStyle: {},
      fixedHeaderStyle: {},
      timer: 0,
      headerLeft: 0,
      headerSize: 0,
      headerLastPoint: 0,
      contentLastPoint: {
        x: 0,
        y: 0
      },
      swiper: null,
      curScreenIndex: 0,
      maxScreenCount: 1,
      lastSlide: 0
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
      if (this.align !== 'around') {
        return result
      }
      return Object.assign(result, this.aroundHeaderWidth)
    },
    aroundHeaderWidth() {
      return {
        width: `${100 / this.headerCount}%`
      }
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
      return !('ontouchstart' in document.documentElement)
    }
  },
  beforeMount() {
    this.$watch('$route', newVal => {
      const currentIndex = getMatchedRouteIndex(this.headers, newVal.path)
      this._handleTabSwitch(currentIndex, true)
    })
    this.$watch('headers', newVal => {
      if (this.routable) {
        this.focusIndex = getMatchedRouteIndex(newVal, this.$route.path)
      }
      this._computeMaxScreenCount()
      this._computeHeaderSize()
    })
  },
  mounted() {
    this.$nextTick(() => {
      this._computeAnchorStyle(this.focusIndex)
      this._computeHeaderStyle(0)
      this._initSwipe()
      this._initCarousel()
      this._computeMaxScreenCount()
      this._computeHeaderSize()
      if (this.align === 'start') {
        window.addEventListener('resize', () => {
          this._computeMaxScreenCount()
        })
      }
      this.$emit('change', this.focusIndex)
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
      this._setHeaderScroll(left)
      this._computeCurrentScreenIndex(left)
    },
    _setHeaderScroll(left) {
      if (this.notTouchDevice) {
        this.headerStyle = {
          transform: `translateX(${left}px)`,
          transitionDuration: `${this.duration}ms`
        }
      } else {
        scroll(this.$refs.header, -left, this.duration)
      }
    },
    _setHeaderLeft(evt) {
      this.headerLeft = -evt.target.scrollLeft
    },
    _computePanelStyle(index) {
      if (this.swipe) {
        return {
          width: this.contentWidth
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
      if (this.align !== 'start') {
        return
      }
      const tab = this.$refs.tab[this.headerCount - 1]
      const header = this.$refs.header
      if (!tab || !header) {
        return
      }
      const tabRect = tab.getBoundingClientRect()
      const fullWidth =
        tabRect.left + tabRect.width - header.getBoundingClientRect().left
      const { offsetWidth } = header
      this.maxScreenCount = Math.ceil(fullWidth / offsetWidth)
      this.$emit('calc-screen-count', this.maxScreenCount)
    },
    _computeAnchorStyle(index, loop = 0) {
      const tab = this.$refs.tab[index]
      if (!tab) {
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
        const header = this.$refs.header
        this.anchorStyle = {
          width: `${header.offsetWidth}px`,
          height: `${tab.offsetHeight - anchorPadding * 2}px`,
          transform: `translateY(${tab.getBoundingClientRect().top -
            header.getBoundingClientRect().top +
            anchorPadding}px)`,
          transitionDuration: `${this.duration}ms`
        }
      } else {
        this.anchorStyle = {
          width: `${tab.offsetWidth - anchorPadding * 2}px`,
          transform: `translateX(${tab.offsetLeft + anchorPadding}px)`,
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
      this.lastSlide = Date.now()
      this._handleTabSwitch(index, false, false)
    },
    _handleTabSwitch(index, force = false, move = true) {
      if (this.routable && !force) {
        return
      }
      let newIndex = index
      if (index >= this.headerCount) {
        newIndex = (newIndex - this.headerCount) % 2 ? this.headerCount - 1 : 0
      }
      const lastIndex = this.focusIndex
      if (this.focusIndex !== newIndex) {
        this.focusIndex = newIndex
        this.$emit('change', newIndex)
      }
      this._computeAnchorStyle(newIndex)
      this._computeHeaderStyle(lastIndex)
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
      const left = -targetScreenCount * this.$refs.header.offsetWidth
      this._setHeaderScroll(left)
      this.headerLeft = left
      this.curScreenIndex = targetScreenCount
      return {
        is_begin: targetScreenCount === 0,
        is_end: targetScreenCount + 1 === this.maxScreenCount
      }
    },
    _handleContentTouchStart(e) {
      if (this.swipe || !this.animated) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      this.contentLastPoint = {
        x: point.pageX,
        y: point.pageY
      }
    },
    _handleContentTouchMove(e) {
      if (this.swipe || !this.animated) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      const lastPoint = this.contentLastPoint
      const curPoint = {
        x: point.pageX,
        y: point.pageY
      }
      const delta = {
        x: curPoint.x - lastPoint.x,
        y: curPoint.y - lastPoint.y
      }
      if (Math.abs(delta.x) < Math.abs(delta.y)) {
        return
      }
      if (Math.abs(delta.x) * 3 < this.$el.clientWidth) {
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
      this.contentLastPoint = lastPoint
    },
    _handleHeaderTouchStart(e) {
      if (!this.notTouchDevice) {
        return
      }
      const point = e.touches ? e.touches[0] : e
      this.headerLastPoint =
        this.align === 'vertical' ? point.pageY : point.pageX
    },
    _handleHeaderTouchMove(e) {
      if (!this.notTouchDevice) {
        return
      }
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
          left + this.headerSize < this.$refs.tabWrap.offsetWidth
        ) {
          left = this.$refs.tabWrap.offsetWidth - this.headerSize
        }
      }
      this.headerLeft = left
      this._setHeaderScroll(left)
      this._computeCurrentScreenIndex(left)
    },
    _computeCurrentScreenIndex(left) {
      this.curScreenIndex = Math.round(
        Math.abs(left / this.$refs.headerWrap.offsetWidth)
      )
    },
    _computeHeaderSize() {
      this.$nextTick(() => {
        if (!this.$refs.tab) {
          return
        }
        const tabs = this.$refs.tab
        const lastIndex = tabs.length - 1
        this.headerSize =
          this.align === 'vertical'
            ? tabs[0].getBoundingClientRect().top -
              tabs[lastIndex].getBoundingClientRect().bottom
            : tabs[lastIndex].getBoundingClientRect().right -
              tabs[0].getBoundingClientRect().left
      })
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
    },
    refresh() {
      if (!this.swipe) {
        return
      }
      this.swiper.refreshShadowSlide()
    }
  }
}
</script>
