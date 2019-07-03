<style lang="scss">
#carousel {

}
</style>

<template>
  <div id="carousel">
    <h1>自动轮播</h1>
    <h3>最简单的模式</h3>
    <section class="many">
      <main>
        <v-switcher ref="switch" :headers="headers" align="start" header-animation="scroll">
          <template slot="header-after">
            <button @click="backward">向后</button>
            <button @click="forward">向前</button>
          </template>
          <div
            v-for="(item, index) in headers"
            :slot="`${index}`"
            :key="index"
            class="demo-item"
          >
            第{{ item }}个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h3>带切换动画和指示器</h3>
    <section>
      <main>
        <v-switcher :headers="headers.slice(0, 5)" :swipe="true" :disabled-swipe="true" :autoplay="2000" item-width="600px">
          <div :style="{ height: '400px', backgroundColor: 'rgba(21,174,103,.5)' }" slot="0">
            <button @click="handleClick">第一个tab</button>
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(245,163,59,.5)' }" slot="1">
            <button @click="handleClick">第二个tab</button>
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(255,230,135,.5)' }" slot="2">
            <button @click="handleClick">第三个tab</button>
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(194,217,78,.5)' }" slot="3">
            <button @click="handleClick">第四个tab</button>
          </div>
          <div :style="{ height: '400px', backgroundColor: 'rgba(195,123,177,.5)' }" slot="4">
            <button @click="handleClick">第五个tab</button>
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
    backward() {
      const result = this.$refs.switch.backward()
      console.log(result)
    },
    forward() {
      const result = this.$refs.switch.forward()
      console.log(result)
    },
    handleClick() {
      console.log('handleClick')
    }
  }
}
</script>
