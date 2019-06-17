<style lang="scss">
body {
  margin: 0;

  a {
    text-decoration: none;
    color: #222;
  }

  .header {
    .v-switcher {
      &-header {
        &-anchor {
          bottom: 0;
          height: 100%;
          background-color: #00a1d6;
          opacity: 0.1;
        }
      }
    }
  }

  .v-switcher {
    &-header-item {
      padding: 0 20px;
      box-sizing: border-box;

      &.is-active {
        color: palevioletred;
      }
    }
  }

  .banner {
    height: 150px;
    background-color: #4fc08d;
    color: #fff;
  }
  /*
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
  */

  .container {
    width: 1160px;
    max-width: 100%;
    margin: 0 auto;

    section {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      margin-bottom: 50px;

      main {
        width: 900px;
        max-width: 100%;
        @media (min-width: 768px) {
          padding-right: 20px;
        }
      }

      aside {
        flex-grow: 1;
      }
    }
  }

  .demo-item {
    background-color: #e5e9ef;
    height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>

<template>
  <div id="app">
    <div class="container header">
      <v-switcher :headers="headers" :routable="true" align="start" anchor-trigger="hover">
        <router-link
          v-for="(item, index) in headers"
          :key="index"
          :slot="`tab-${index}`"
          :to="item.route"
          v-text="item.name"
        ></router-link>
      </v-switcher>
    </div>
    <div class="banner">vue layout tab</div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      headers: [
        {
          name: '首页',
          route: '/'
        },
        {
          name: '简单用例',
          route: '/simple'
        },
        {
          name: '带切换动画',
          route: '/animated'
        },
        {
          name: '带手势操作',
          route: '/swipe'
        },
        {
          name: '自动轮播',
          route: '/carousel'
        },
        {
          name: '生产实例',
          route: '/usage'
        },
        {
          name: 'H5实例',
          route: '/mobile'
        }
      ]
    }
  }
}
</script>
