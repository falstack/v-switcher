<style lang="scss">
#list {
  overflow: hidden;

  .test {
    width: 400%;
    height: 300px;

    >div {
      float: left;
      width: 25%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>

<template>
  <div id="list">
    <h1>start</h1>
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
  name: '',
  components: {
    Test
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const slide = new Slide({
      el: this.$refs.test
    })
  },
  methods: {}
}
</script>

