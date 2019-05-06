<style lang="scss">
#usage {
  .v-switcher-header-item {
    cursor: pointer;
  }

  .carousel {
    width: 440px;
    height: 220px;
    border-radius: 4px;
    overflow: hidden;

    .c-item {
      display: block;
      height: 220px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      .title {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 35px;
        line-height: 35px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
        font-size: 15px;
        text-decoration: none;
        background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.5));
        padding-left: 10px;
        padding-right: 160px;
      }

      .more {
        display: block;
        position: absolute;
        right: 15px;
        bottom: 35px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.64);
        width: 50px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 4px;
        opacity: 0;
        transition: all 0.2s linear;
        font-size: 12px;
        text-decoration: none;

        &:hover {
          text-shadow: 0 0 3px #fff;
        }

        &:after {
          content: '';
          display: inline-block;
          width: 6px;
          height: 12px;
          margin: -2px 0 0 5px;
          vertical-align: middle;
          background: url('../icons.png') -541px -218px;
        }
      }

      &:hover .more {
        opacity: 1;
      }
    }

    .v-switcher {
      &-header {
        &-wrap {
          box-sizing: border-box;
          position: absolute;
          right: 0;
          bottom: 0;
          height: 35px;
          z-index: 1;
          width: 150px;
          padding-right: 20px;
          border-bottom: none;
        }

        &-item {
          margin-left: 8px;
          width: 18px;
          height: 18px;
          background-position: -855px -790px;
          background-image: url("../icons.png");
          border-bottom-width: 0;
          cursor: pointer;
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

  .bangumi {
    .b-item {
      margin: 26px 20px 40px 0;
      height: 398px;
      background-color: #f6f9fa;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .v-switcher {
      overflow: visible;
    }

    .v-switcher-header {
      &-wrap {
        overflow: visible;
      }

      &-item {
        width: 100%;
        font-size: 18px;
        line-height: 39px;
        height: 39px;
        color: #000;
        transition: 0.2s;
        border-bottom: 1px solid #e5e9ef;

        &:hover {
          color: #00a1d6;
        }

        &.is-active {
          color: #00a1d6;
          border-bottom-color: #00a1d6;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            left: 50%;
            margin-left: -3px;
            bottom: 0;
            width: 0;
            height: 0;
            border-bottom: 3px solid #00a1d6;
            border-top: 0;
            border-left: 3px dashed transparent;
            border-right: 3px dashed transparent;
          }
        }
      }
    }

    .header-before {
      margin-top: 8px;

      i {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-right: 10px;
        vertical-align: middle;
        float: left;
        margin-top: -10px;
        background-image: url("../icons.png");
        background-position: -141px -140px;
      }

      a {
        font-size: 24px;
        line-height: 24px;
        font-weight: 400;
        margin-right: 20px;
        float: left;
        color: #222;
        transition: color 0.2s;
        text-decoration: none;

        &:hover {
          color: #00a1d6;
        }
      }
    }

    .header-after {
      display: block;
      border: 1px solid #f25d8e;
      width: 104px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #f25d8e;
      font-size: 14px;
      border-radius: 4px;
      transition: 0.1s;
      text-decoration: none;
      margin-left: 30px;

      &:hover {
        color: #fff;
        background-color: #f25d8e;

        i {
          background-position: -541px -218px;
        }
      }

      i {
        display: inline-block;
        vertical-align: middle;
        background-position: -478px -281px;
        width: 6px;
        height: 12px;
        margin: -2px 0 0 5px;
        background-image: url("../icons.png");
      }
    }
  }

  .recommended {
    width: 700px;
    height: 220px;
    margin-left: 20px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    &:hover {
      .indicator {
        opacity: 1;
      }
    }

    .indicator {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.3s;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;

      button {
        width: 20px;
        cursor: pointer;
        font-size: 12px;
        color: #fff;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.6);
        background-image: url("../icons2.png");
        box-sizing: content-box;
        border-width: 0;
        pointer-events: auto;

        &:hover,
        &:focus {
          outline-width: 0;
          border-width: 0;
        }
      }

      .btn-prev {
        border-radius: 0 4px 4px 0;
        padding: 13px 5px 13px 10px;
        background-position: 6px -1211px;
      }

      .btn-next {
        border-radius: 4px 0 0 4px;
        padding: 13px 10px 13px 5px;
        background-position: 25px -1262px;
      }
    }

    .v-switcher {
      height: 100%;

      &-header-wrap {
        display: none;
      }

      &-content {
        height: 220px;

        .r-item {
          height: 220px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .ranking {
    .header-before {
      font-size: 18px;
      font-weight: 400;
      color: #000;
      margin-right: 8px;
      margin-top: 4px;
    }

    .k-item {
      height: 340px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .v-switcher {
      &-header {
        &-item {
          margin-left: 12px;
          padding: 0;
          font-size: 12px;
          line-height: 24px;
          height: 24px;
          color: #000;
          transition: 0.2s;
          border-bottom: 1px solid transparent;

          &.is-active {
            color: #00a1d6;
            border-bottom-color: #00a1d6;
            position: relative;

            &:after {
              content: '';
              position: absolute;
              left: 50%;
              margin-left: -3px;
              bottom: 0;
              width: 0;
              height: 0;
              border-bottom: 3px solid #00a1d6;
              border-top: 0;
              border-left: 3px dashed transparent;
              border-right: 3px dashed transparent;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div id="usage">
    <h3>轮播</h3>
    <section>
      <div class="carousel">
        <v-switcher :headers="headers1" :swipe="true" :autoplay="2000" align="end">
          <a
            v-for="(item, index) in headers1"
            :key="index"
            :slot="`${index}`"
            :style="{ backgroundColor: getRandomColor() }"
            class="c-item"
            href="javascript:;"
          >
            <a class="title" href="javascript:;">{{ item.title }}</a>
            <a class="more" href="javascript:;">更多</a>
          </a>
        </v-switcher>
      </div>
      <div class="recommended">
        <v-switcher :headers="headers3" @change="handleChangeRecommended" ref="recommended">
          <div slot="0" class="r-item" style="background-color: rgba(21,174,103,.5)">三日</div>
          <div slot="1" class="r-item" style="background-color: rgba(195,123,177,.5)">一周</div>
          <div slot="2" class="r-item" style="background-color: rgba(125,205,244,.5)">昨日</div>
        </v-switcher>
        <div class="indicator">
          <button class="btn-prev" @click="switchRecommended(false)">{{ tab3LeftText }}</button>
          <button class="btn-next" @click="switchRecommended(true)">{{ tab3RightText }}</button>
        </div>
      </div>
    </section>
    <h3>面板</h3>
    <section>
      <main class="bangumi">
        <v-switcher :headers="headers2">
          <div
            slot="header-before"
            class="header-before"
          >
            <i></i>
            <a href="javascript:;">番剧</a>
          </div>
          <a
            slot="header-after"
            class="header-after"
            href="javascript:;"
          >
            <span>新番时间表</span>
            <i></i>
          </a>
          <div
            v-for="(item, index) in headers2"
            :key="index"
            :slot="`${index}`"
            class="b-item"
          >{{ index }}</div>
        </v-switcher>
      </main>
      <aside class="ranking">
        <v-switcher :headers="headers4" align="start" :animated="true" header-trigger="hover">
          <div class="header-before" slot="header-before">排行</div>
          <div class="header-after" slot="header-after">三日</div>
          <div class="k-item" slot="0" style="background-color: rgba(21,174,103,.5)">
            0
          </div>
          <div class="k-item" slot="1" style="background-color: rgba(125,205,244,.5)">
            1
          </div>
        </v-switcher>
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Usage',
  components: {},
  props: {},
  data() {
    return {
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
      headers2: [
        '最新',
        {
          text: '一',
          'text-active': '周一'
        },
        {
          text: '二',
          'text-active': '周二'
        },
        {
          text: '三',
          'text-active': '周三'
        },
        {
          text: '四',
          'text-active': '周四'
        },
        {
          text: '五',
          'text-active': '周五'
        },
        {
          text: '六',
          'text-active': '周六'
        },
        {
          text: '日',
          'text-active': '周日'
        }
      ],
      headers3: ['', '', ''],
      tab3Index: 0,
      headers4: ['全部', '原创']
    }
  },
  computed: {
    tab3LeftText() {
      const index = this.tab3Index
      if (index === 0) {
        return '昨日'
      } else if (index === 1) {
        return '三日'
      }
      return '一周'
    },
    tab3RightText() {
      const index = this.tab3Index
      if (index === 0) {
        return '一周'
      } else if (index === 1) {
        return '昨日'
      }
      return '三日'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleChangeRecommended(index) {
      this.tab3Index = index
    },
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
    switchRecommended(isNext) {
      isNext ? this.$refs.recommended.next() : this.$refs.recommended.prev()
    }
  }
}
</script>
