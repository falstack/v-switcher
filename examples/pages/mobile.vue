<style lang="scss">
#h5 {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: #fff;
  transform: translateY(0);
  transition: transform 0.4s ease;

  &.active {
    transform: translateY(-120px);
  }

  .carousel {
    width: 100%;
    height: 120px;

    .c-item {
      display: block;
      height: 120px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .v-switcher {
      &-header {
        &-wrap {
          box-sizing: border-box;
          position: absolute;
          right: 10px;
          bottom: 10px;
          height: 35px;
          z-index: 1;
          width: 150px;
          border-bottom: none;
        }

        &-item {
          margin-left: 8px;
          width: 18px;
          height: 18px;
          background-position: -855px -790px;
          background-image: url("../icons.png");
          border-bottom-width: 0;
          cursor: default;
          padding: 0;

          &.is-active {
            background-position: -855px -727px;
          }
        }
      }
    }
  }

  .content {
    height: 100%;
    box-sizing: border-box;

    .v-switcher {
      height: 100%;
    }

    .ul-wrap {
      margin: 0;
      padding: 0;

      li {
        height: 40px;
        line-height: 40px;
      }

      .item-wrap {
        display: inline-block;
        white-space: nowrap;

        .item {
          height: 50px;
          line-height: 50px;
          font-size: 24px;
          display: inline-block;
          text-align: center;
          padding: 0 10px;
          width: 120px;
          white-space: nowrap;
        }
      }
    }
  }

  .flow-loader-state {
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
}
</style>

<template>
  <div id="h5" :class="{ 'active': isActive }">
    <div class="carousel">
      <v-switcher :headers="headers1" :swipe="true" :autoplay="2000" align="end" :header-height="18">
        <a
          v-for="(item, index) in headers1"
          :key="index"
          :slot="`${index}`"
          :style="{ backgroundColor: getRandomColor() }"
          class="c-item"
          href="javascript:;"
        >
          {{ item.title }}
        </a>
      </v-switcher>
    </div>
    <div class="content">
      <v-switcher
        :headers="headers2"
        :swipe="true"
        :sticky="true"
        align="start"
        @change="handleTabSwitch"
      >
        <template slot="header-after">
          <button @click="handleBtnClick">筛选</button>
        </template>
        <scroll
          v-for="(item, index) in headers2"
          ref="scroll"
          :key="index"
          :slot="`${index}`"
          :event="true"
          @scroll="handleScroll"
          @pull-down="handlePullDown"
          @pull-up="handlePullUp"
          @bottom="handleLoadMore"
        >
          <ul class="ul-wrap">
            <scroll :scroll-x="true" :stop="true">
              <div class="item-wrap">
                <div v-for="item in 10" :key="item" class="item" :style="{ backgroundColor: getRandomColor() }">{{ item }}</div>
              </div>
            </scroll>
            <flow-loader
              ref="loader"
              func="getListByPage"
              type="page"
              :auto="0"
              :query="{
                id: item,
                count: 10
              }"
              :callback="flowCallback"
            >
              <template #default="{ flow, count }">
                <virtual-list
                  v-if="count"
                  ref="list"
                  :size="110"
                  :remain="5"
                  :item="ItemComponent"
                  :itemcount="count"
                  :pagemode="true"
                  :itemprops="getItemProps"
                />
              </template>
            </flow-loader>
          </ul>
        </scroll>
      </v-switcher>
    </div>
  </div>
</template>

<script>
import Scroll from '../VueScroll'
import ItemComponent from '../Item'
import virtualList from '../virtual-list'

export default {
  name: 'Mobile',
  components: {
    virtualList,
    Scroll
  },
  data() {
    const headers2 = [
      'tab-0',
      'tab-1',
      'tab-2',
      'tab-3',
      'tab-4',
      'tab-5',
      'tab-6',
      'tab-7',
      'tab-8',
      'tab-9'
    ]
    return {
      ItemComponent,
      isActive: false,
      headers1: [
        {
          text: '',
          title: '成名必备！'
        },
        {
          text: '',
          title: '花泽香菜，甜美来袭！'
        },
        {
          text: '',
          title: '鸡鸣紫陌曙光寒，水转皇州春色阑'
        },
        {
          text: '',
          title: '请查收您的追番清单!'
        },
        {
          text: '',
          title: '欢迎来到天生制造狂的世界'
        }
      ],
      headers2,
      activeIndex: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getRandomColor() {
      var colors = [
        'rgba(21,174,103,.5)',
        'rgba(245,163,59,.5)',
        'rgba(255,230,135,.5)',
        'rgba(194,217,78,.5)',
        'rgba(195,123,177,.5)',
        'rgba(125,205,244,.5)'
      ]
      return colors[~~(Math.random() * colors.length)]
    },
    handlePullDown() {
      this.isActive = false
    },
    handlePullUp() {
      this.isActive = true
    },
    handleTabSwitch(index) {
      this.activeIndex = index
      this.$refs.loader[index].initData()
    },
    flowCallback() {
      this.$refs.scroll[this.activeIndex].refresh()
    },
    handleLoadMore() {
      this.$refs.loader[this.activeIndex].loadMore()
    },
    handleScroll(data) {
      this.$refs.list[this.activeIndex].onScroll(data)
    },
    getItemProps(index) {
      return {
        props: {
          item: this.$refs.loader[this.activeIndex].source.result[index],
          index
        }
      }
    },
    handleBtnClick() {
      alert(1)
    }
  }
}
</script>
