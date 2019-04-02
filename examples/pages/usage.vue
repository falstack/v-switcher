<style lang="scss">
#usage {
  .carousel {
    width: 440px;
    height: 220px;
    border-radius: 4px;
    overflow: hidden;

    .c-item {
      height: 220px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .v-switcher {
      &-header-wrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 35px;
        background: -webkit-linear-gradient(transparent, rgba(0, 0, 0, 0.5));
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
        <VueLayoutTab :headers="headers" :swipe="true" :autoplay="2000" align="end">
          <div
            v-for="(item, index) in headers"
            :key="index"
            :slot="`${index}`"
            :style="{ backgroundImage: `url(${item.image})` }"
            class="c-item"
          >
            <span>{{ item.title }}</span>
          </div>
        </VueLayoutTab>
      </div>
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
      headers: [
        {
          text: '-',
          image: 'https://i0.hdslb.com/bfs/archive/3f0cb192c49270ec5f98b93c4b460e0ed39a017f.jpg@880w_440h.jpg',
          title: '成名必备！'
        },
        {
          text: '-',
          image: 'https://i0.hdslb.com/bfs/archive/d09b993b03402f232aa5ff0b0387dc13e75d43da.jpg@880w_440h.webp',
          title: '花泽香菜，甜美来袭！'
        },
        {
          text: '-',
          image: 'https://i0.hdslb.com/bfs/archive/e419eafc45212e661721a753c0fc9d67b0efded3.jpg@880w_440h.webp',
          title: '鸡鸣紫陌曙光寒，水转皇州春色阑'
        },
        {
          text: '-',
          image: 'https://i0.hdslb.com/bfs/archive/752a4ad671ae49650cfadd64a1c9e3ef75e3a769.jpg@880w_440h.webp',
          title: '请查收您的追番清单!'
        },
        {
          text: '-',
          image: 'https://i0.hdslb.com/bfs/archive/e515bcc182bcba0e079d01a10bd40c75d3f707f1.jpg@880w_440h.webp',
          title: '欢迎来到天生制造狂的世界'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
