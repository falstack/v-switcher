<style lang="scss">
</style>

<template>
  <div id="swipe">
    <h1>手势切换（仅支持移动端）</h1>
    <h3>普通使用</h3>
    <section>
      <main>
        <v-switcher :headers="headers" :swipe="true" align="start">
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
          <div class="demo-item" slot="5">
            第六个tab
          </div>
          <div class="demo-item" slot="6">
            第七个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h1>手势切换（仅支持移动端）</h1>
    <h3>不粘手</h3>
    <section>
      <main>
        <v-switcher :headers="headers" :animated="true" align="start">
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
          <div class="demo-item" slot="5">
            第六个tab
          </div>
          <div class="demo-item" slot="6">
            第七个tab
          </div>
        </v-switcher>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Swipe',
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
        'tab-7'
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
