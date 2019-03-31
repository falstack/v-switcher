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
        background-color: #ff6881;
        opacity: 0.1;
      }
    }
  }

  .demo-list {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: block;
      height: 100px;
      line-height: 100px;
      margin: 10px 0;
      padding-left: 50px;
      background-color: #d3d3d3;
    }
  }
}
</style>

<template>
  <div id="app">
    <div class="banner">vue layout tab</div>
    <VueLayoutTab
      :headers="headers"
      :default-index="0"
      :animated="true"
      :swipe="true"
      align="start"
    >
      <template slot="0">
        <VueScroll
          :data="list"
          :refresh="test"
          :load-more="getData"
        >
          <ul class="demo-list">
            <li
              v-for="item in list"
              :key="item.id"
              :style="{ width: `${item.width}px`, backgroundColor: item.style.color }"
            >
              {{ item.index + 1 }}
            </li>
          </ul>
        </VueScroll>
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
import VueScroll from './VueScroll'
import ItemFactory from './item-factory'

export default {
  name: 'app',
  components: {
    VueScroll,
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
      ],
      list: []
    }
  },
  methods: {
    test() {
      console.log('test')
    },
    getData() {
      return new Promise(resolve => {
        if (this.list.length >= 50) {
          return resolve()
        }
        setTimeout(() => {
          this.list = this.list.concat(ItemFactory.get(10))
          resolve()
        }, 500)
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
