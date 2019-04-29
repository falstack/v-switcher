<style lang="scss">
</style>

<template>
  <div id="animated">
    <h1>切换动画</h1>
    <h3>header click 切换</h3>
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
        </v-switcher>
      </main>
    </section>
    <h3>header hover 切换</h3>
    <section>
      <main>
        <v-switcher :headers="headers" :animated="true" header-trigger="hover" align="start">
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
  </div>
</template>

<script>
export default {
  name: 'Animated',
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
  methods: {}
}
</script>
