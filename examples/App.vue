<style lang="scss">
body {
  margin: 0;

  .banner {
    height: 200px;
    background-color: #4fc08d;
    color: #fff;
  }

  .tab {
    &-header {
      &-anchor {
        bottom: 0;
        height: 100%;
        background-color: #f25d8e;
        opacity: 0.1;
      }

      &-item {
        padding: 0 20px;
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <div class="banner">vue layout tab</div>
    <VueLayoutTab
      :headers="headers"
      :default-index="1"
      :animated="true"
      :swipe="true"
      align="start"
    >
      <template slot="0">
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
        <p>100</p>
      </template>
      <template slot="1">
        第二个tab
      </template>
      <template slot="2">
        第三个tab
      </template>
      <template slot="3">
        第四个tab
      </template>
      <template slot="4">
        第五个tab
      </template>
      <template slot="5">
        第六个tab
      </template>
      <template slot="6">
        第七个tab
      </template>
      <template slot="7">
        第八个tab
      </template>
      <template slot="8">
        第九个tab
      </template>
    </VueLayoutTab>
  </div>
</template>

<script>
import VueLayoutTab from '../src/VueLayoutTab'

export default {
  name: 'app',
  components: {
    VueLayoutTab
  },
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
        'tab-9'
      ]
    }
  }
}
</script>
