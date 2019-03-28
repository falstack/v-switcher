<style lang="scss">
.tab-container {
  > header {
    font-size: 0;
    border-bottom: 1px solid #f0f0f0;

    div {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 14px;
      color: gray;

      &.is-active {
        position: relative;
        color: #f25d8e !important;

        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 56px;
          max-width: 100%;
          border-bottom: 1px solid #f25d8e;
          transform: translateX(-50%);
        }

        &:before {
          content: '';
          position: absolute;
          margin-left: -3px;
          left: 50%;
          bottom: 1px;
          width: 0;
          height: 0;
          border: 3px solid #f25d8e;
          border-top-width: 0;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
  }
}
</style>

<template>
  <section class="tab-container">
    <div class="tab-container-header">
      <div
        v-for="(item, index) in headers"
        :key="index"
        :class="{ 'is-active': index === focusIndex }"
        :style="{ width: `${100 / headers.length}%` }"
        class="tab-container-header-item"
        @click="handleTabSwitch(index)"
      >
        <i v-if="computeItemIcon(item)" :class="computeItemIcon(item)" ></i>
        <span v-text="computeItemText(item)" ></span>
      </div>
    </div>
    <div
      v-if="!routable"
      class="tab-container-body"
    >
      <div
        v-for="(item, index) in headers"
        v-show="index === focusIndex"
        :key="index"
        class="tab-container-body-panel"
      >
        <slot :name="index" />
      </div>
    </div>
  </section>
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
      focusIndex
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
  methods: {
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
    }
  }
}
</script>
