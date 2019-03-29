<style lang="scss">
.tab {
  &-header {
    position: relative;
    font-size: 0;
    border-bottom: 1px solid #e7e7e7;

    &-center {
      text-align: center;
    }

    &-start {
      text-align: left;
    }

    &-end {
      text-align: right;
    }

    &-anchor {
      position: absolute;
      left: 0;
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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
    <div v-if="!routable" class="tab-content">
      <div
        v-for="(item, index) in headers"
        v-show="index === focusIndex"
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
      return { width: `${100 / this.headers.length}%` }
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
      this.bindAnchor(this.focusIndex)
    })
  },
  methods: {
    bindAnchor(index) {
      if (!this.anchor) {
        return
      }
      const tab = this.$refs.tab[index]
      this.anchorStyle = {
        width: `${tab.offsetWidth}px`,
        transform: `translateX(${tab.offsetLeft}px)`
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
      this.bindAnchor(index)
    }
  }
}
</script>
