<style lang="scss">
.tab {
  overflow: hidden;

  &-header {
    position: relative;
    font-size: 0;
    border-bottom: 1px solid #e7e7e7;

    &-center {
      text-align: center;
    }

    &-start {
      text-align: left;
      display: flex;
      flex-direction: row;

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
      transition-property: transform;
      transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &-item {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 13px;
      color: #757575;

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
      transition-property: transform;
      transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
</style>

<template>
  <div class="tab">
    <div class="tab-header" :class="`tab-header-${align}`">
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
    <div
      v-if="!routable"
      class="tab-content"
      :class="{ 'tab-content-animated': animated }"
      :style="computeContentStyle"
    >
      <div
        v-for="(item, index) in headers"
        :style="computePanelStyle(index)"
        :key="index"
        class="tab-body-panel"
      >
        <slot :name="index" />
      </div>
    </div>
  </div>
</template>

<script>
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
      anchorStyle: {}
    }
  },
  computed: {
    headerItemStyle() {
      if (this.align !== 'around') {
        return {}
      }
      return this.aroundHeaderWidth
    },
    aroundHeaderWidth() {
      return {
        width: `${100 / this.headers.length}%`
      }
    },
    computeContentStyle() {
      if (this.animated) {
        return {
          width: `${this.headers.length * 100}%`,
          transform: `translateX(${(this.focusIndex / this.headers.length) *
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
      this.computeAnchorStyle(this.focusIndex)
    })
  },
  methods: {
    computePanelStyle(index) {
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
    computeAnchorStyle(index) {
      if (!this.anchor) {
        return
      }
      const tab = this.$refs.tab[index]
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
      this.focusIndex = index
      this.$emit('change', index)
      this.computeAnchorStyle(index)
    }
  }
}
</script>
