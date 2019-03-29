<style lang="scss">
body {
  margin: 0;

  .tab {
    &-header {
      &-anchor {
        bottom: 0;
        height: 2px;
        background-color: #f25d8e;
      }
    }
  }
}
</style>

<template>
  <div id="app">
    <VueLayoutTable
      :headers="headers"
      :default-index="1"
    >
      <template slot="0">
        第一个tab
      </template>
      <template slot="1">
        第二个tab
      </template>
      <template slot="2">
        第三个tab
      </template>
    </VueLayoutTable>
  </div>
</template>

<script>
import VueLayoutTable from '../src/VueLayoutTab'

export default {
  name: 'app',
  components: {
    VueLayoutTable
  },
  data() {
    return {
      headers: [
        'tab-1',
        'tab-2',
        'tab-3'
      ]
    }
  }
}
</script>
