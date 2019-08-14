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
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
        <p>111</p>
      </div>
      <div style="background-color: #4fc08d">
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
        <p>222</p>
      </div>
      <div style="background-color: #657786">
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
        <p>333</p>
      </div>
      <div style="background-color: goldenrod">
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
        <p>444</p>
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

export default {
  name: '',
  components: {},
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

