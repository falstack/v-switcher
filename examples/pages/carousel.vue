<style lang="scss">
</style>

<template>
  <div id="carousel">
    <h1>自动轮播</h1>
    <h3>最简单的模式</h3>
    <section>
      <main>
        <v-switcher :headers="headers" :autoplay="2000">
          <div class="demo-item" slot="0">
            第一个tab
          </div>
          <div class="demo-item" slot="1">
            第二个tab
          </div>
          <div class="demo-item" slot="2">
            第三个tab
          </div>
          <div class="demo-item" slot="3">
            第四个tab
          </div>
          <div class="demo-item" slot="4">
            第五个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h3>带切换动画和指示器</h3>
    <section>
      <main>
        <v-switcher :headers="headers" :swipe="true" :autoplay="2000" :indicator="true" item-width="600px">
          <div :style="{ height: '400px', backgroundColor: 'rgba(21,174,103,.5)' }" slot="0">
            第一个tab
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(245,163,59,.5)' }" slot="1">
            第二个tab
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(255,230,135,.5)' }" slot="2">
            第三个tab
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(194,217,78,.5)' }" slot="3">
            第四个tab
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(195,123,177,.5)' }" slot="4">
            第五个tab
          </div>
        </v-switcher>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  components: {},
  props: {},
  data() {
    return {
      headers: [
        'tab-1',
        'tab-2',
        'tab-3',
        'tab-4',
        'tab-5'
      ]
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
    }
  }
}
</script>
