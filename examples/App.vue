<style lang="scss">
body {
  margin: 0;

  .banner {
    height: 200px;
    background-color: #4fc08d;
    color: #fff;
  }

  .v-switcher {
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
    padding-top: 10px;

    li {
      padding: 0 10px 10px;

      div {
        height: 100px;
        line-height: 100px;
        text-align: center;
        border-radius: 5px;
      }
    }
  }

  .end {
    text-align: center;
  }
}
</style>

<template>
  <div id="app">
    <div class="banner">vue layout tab</div>
    <VueLayoutTab :headers="headers" align="start">
      <template slot="0">
        <VueScroll :data="list" :refresh="test" :load-more="getData">
          <ul class="demo-list">
            <li v-for="item in list" :key="item.id">
              <div :style="{ backgroundColor: item.style.color }">
                {{ item.index + 1 }}
              </div>
            </li>
          </ul>
          <div class="end">- end -</div>
        </VueScroll>
      </template>
      <template slot="1">
        <p>start</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>end</p>
      </template>
      <template slot="2">
        <VueScroll :data="list" :refresh="test" :load-more="getData">
          <ul class="demo-list">
            <li v-for="item in list" :key="item.id">
              <div :style="{ backgroundColor: item.style.color }">
                {{ item.index + 1 }}
              </div>
            </li>
          </ul>
        </VueScroll>
      </template>
      <template slot="3">
        <VueScroll :data="list" :refresh="test" :load-more="getData">
          <ul class="demo-list">
            <li v-for="item in list" :key="item.id">
              <div :style="{ backgroundColor: item.style.color }">
                {{ item.index + 1 }}
              </div>
            </li>
          </ul>
        </VueScroll>
      </template>
      <template slot="4">
        <VueScroll :data="list" :refresh="test" :load-more="getData">
          <ul class="demo-list">
            <li v-for="item in list" :key="item.id">
              <div :style="{ backgroundColor: item.style.color }">
                {{ item.index + 1 }}
              </div>
            </li>
          </ul>
        </VueScroll>
      </template>
      <template slot="5">
        <VueScroll :data="list" :refresh="test" :load-more="getData">
          <ul class="demo-list">
            <li v-for="item in list" :key="item.id">
              <div :style="{ backgroundColor: item.style.color }">
                {{ item.index + 1 }}
              </div>
            </li>
          </ul>
        </VueScroll>
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
      console.log('refresh')
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
