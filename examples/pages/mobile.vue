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

          &:hover {
            background-position: -919px -790px;
          }

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

      li {
        height: 40px;
        line-height: 40px;
      }
    }
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
        />
      </v-switcher>
    </div>
    <div class="content">
      <v-switcher :headers="headers2" align="start" :swipe="true" :sticky="true">
        <scroll
          v-for="(item, index) in headers2"
          :key="index"
          :slot="`${index}`"
          @pull-down="handlePullDown"
          @pull-up="handlePullUp"
        >
          <ul class="ul-wrap">
            <li>123 - start - {{ item }}</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123</li>
            <li>123 - end - {{ item }}</li>
          </ul>
        </scroll>
      </v-switcher>
    </div>
  </div>
</template>

<script>
import Scroll from '../VueScroll'

export default {
  name: 'Mobile',
  components: {
    Scroll
  },
  data() {
    const headers2 = [
      'tab-1',
      'tab-2',
      'tab-3',
      'tab-4',
      'tab-5',
      'tab-6',
      'tab-7',
      'tab-8',
      'tab-9',
      'tab-10',
      'tab-11',
      'tab-12',
      'tab-13',
      'tab-14',
      'tab-15',
      'tab-16',
      'tab-17',
      'tab-18',
      'tab-19',
      'tab-20',
      'tab-21',
      'tab-22'
    ]
    return {
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
      headers2
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
    }
  }
}
</script>
