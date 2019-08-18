<style lang="scss">
#list {
  overflow: hidden;

  .test {
    height: 300px;
    overflow: hidden;

    >div {
      height: 100%;
      overflow-y: auto;
      user-select: none;
      touch-action: none;
    }
  }
}
</style>

<template>
  <div id="list">
    <h1>start</h1>
    <button @click="prev">prev</button>
    <button @click="next">next</button>
    <button @click="destroy">destroy</button>
    <span>active：{{ active }}</span>
    <div class="test" ref="test">
      <div style="background-color: #00a1d6">
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
        <Test text="1111111111111111111111111111111111" />
      </div>
      <div style="background-color: #4fc08d">
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
        <Test text="2222222222222222222222222222222222" />
      </div>
      <div style="background-color: #657786">
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
        <Test text="3333333333333333333333333333333333" />
      </div>
      <div style="background-color: goldenrod">
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
        <Test text="4444444444444444444444444444444444" />
      </div>
    </div>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <p>list</p>
    <h1>end</h1>
  </div>
</template>

<script>
import Slide from '../../src/slide'
import Test from '../Test'

export default {
  components: {
    Test
  },
  data() {
    return {
      slide: null,
      active: 0
    }
  },
  mounted() {
    this.slide = new Slide({
      el: this.$refs.test,
      swipe: true,
      sticky: true,
      duration: 300,
      count: 4,
      index: this.active,
      callback: index => {
        this.active = index
      }
    })
  },
  methods: {
    prev() {
      this.slide.prev()
    },
    next() {
      this.slide.next()
    },
    destroy() {
      this.slide.destroy()
    }
  }
}
</script>
