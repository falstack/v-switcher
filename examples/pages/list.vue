<style lang="scss">
#list {
  overflow: hidden;

  .test {
    height: 300px;
    overflow: hidden;

    >div {
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>

<template>
  <div id="list">
    <h1>start</h1>
    <button @click="prev">prev</button>
    <button @click="next">next</button>
    <div class="test" ref="test">
      <div style="background-color: #00a1d6">
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
        <Test text="111" />
      </div>
      <div style="background-color: #4fc08d">
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
        <Test text="222" />
      </div>
      <div style="background-color: #657786">
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
        <Test text="333" />
      </div>
      <div style="background-color: goldenrod">
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
        <Test text="444" />
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
    }
  }
}
</script>

