<style lang="scss">
@mixin transition {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
}

$default-header-height: 40px;
$default-border-height: 1px;

.tab {
  overflow: hidden;

  &-header {
    position: relative;
    font-size: 0;

    &-wrap {
      height: $default-header-height;
      border-bottom: $default-border-height solid #e7e7e7;
      box-sizing: border-box;
    }

    &-center {
      text-align: center;
    }

    &-start {
      text-align: left;
      display: flex;
      flex-direction: row;
      @include transition();

      .tab-header-item {
        flex-shrink: 0;
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
      font-size: 13px;
      color: #757575;
      background-color: #fff;

      &.is-active {
        position: relative;
        color: #f25d8e;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 56px;
          max-width: 100%;
          border-bottom: 2px solid #f25d8e;
          transform: translateX(-50%);
        }
      }
    }
  }

  &-content {
    &-animated {
      display: flex;
      flex-direction: row;
      @include transition();
    }
  }

  &-content-swipe {
    overflow: hidden;
    visibility: hidden;
    position: relative;

    .tab-content {
      overflow: hidden;
      position: relative;

      &-panel {
        float: left;
        width: 100%;
        position: relative;
      }
    }
  }
}
</style>

<template>
  <div class="tab">
    <div class="tab-header-wrap">
      <div
        class="tab-header"
        :class="`tab-header-${align}`"
        :style="headerStyle"
      >
        <div
          v-for="(item, index) in headers"
          :key="index"
          :class="{ 'is-active': index === focusIndex }"
          :style="headerItemStyle"
          ref="tab"
          class="tab-header-item"
          @click="handleTabSwitch(index)"
        >
          <i v-if="computeItemIcon(item)" :class="computeItemIcon(item)"></i>
          <span v-text="computeItemText(item)"></span>
        </div>
        <div class="tab-header-anchor" :style="anchorStyle">
          <slot name="anchor"></slot>
        </div>
      </div>
    </div>
    <div v-if="!routable" :class="{ 'tab-content-swipe': swipe }" ref="content">
      <div
        class="tab-content"
        :class="{ 'tab-content-animated': animated && !swipe }"
        :style="contentStyle"
      >
        <div
          v-for="(item, index) in headers"
          :style="computePanelStyle(index)"
          :key="index"
          class="tab-content-panel"
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
  name: 'VueLayoutTab',
  components: {},
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
    anchor: {
      type: Boolean,
      default: true
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
    swipe: {
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
      focusIndex,
      anchorStyle: {},
      headerStyle: {},
      headerLeft: 0,
      swiper: null
    }
  },
  computed: {
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
      if (this.swipe) {
        return {}
      }
      if (this.animated) {
        return {
          width: `${this.headerCount * 100}%`,
          transform: `translateX(${(this.focusIndex / this.headerCount) *
            -100}%)`,
          transitionDuration: `${this.duration}ms`
        }
      }
      return {}
    }
  },
  watch: {
    $route(newVal) {
      this.focusIndex = this.headers.map(_ => _.route).indexOf(newVal.name)
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
    })
  },
  methods: {
    initSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper = Swipe(this.$refs.content, {
        startSlide: this.focusIndex,
        speed: this.duration,
        continuous: false,
        callback: this.handleTabSwitch
      })
    },
    moveSwiper() {
      if (!this.swipe) {
        return
      }
      this.swiper.slide(this.focusIndex, this.duration)
    },
    computeHeaderStyle(lastFocusIndex) {
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
      const { offsetLeft, offsetWidth } = checkTab
      const { innerWidth } = window
      const rect = checkTab.getBoundingClientRect()
      let left = this.headerLeft
      if (
        isToRight &&
        !(rect.left < innerWidth && rect.right < innerWidth) &&
        offsetWidth + offsetLeft > innerWidth
      ) {
        left = innerWidth - offsetWidth - offsetLeft
      }
      if (!isToRight && (rect.left < 0 || rect.right < 0)) {
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
      if (!this.anchor) {
        return
      }
      const tab = this.$refs.tab[this.focusIndex]
      this.anchorStyle = {
        width: `${tab.offsetWidth}px`,
        transform: `translateX(${tab.offsetLeft}px)`,
        transitionDuration: `${this.duration}ms`
      }
    },
    computeItemText(item) {
      if (typeof item === 'string') {
        return item
      }
      return item.label || item.name || item.text
    },
    computeItemIcon(item) {
      if (typeof item === 'string' || !item.icon) {
        return false
      }
      return `iconfont ic-${item.replace('ic-', '')}`
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
      this.moveSwiper()
    }
  }
}
</script>
