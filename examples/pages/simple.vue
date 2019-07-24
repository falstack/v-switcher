<style lang="scss">
#simple {
  .vertical {
    .v-switcher-header-item-cell.is-active {
      border-bottom-color: transparent;
    }

    .v-switcher-header-anchor {
      background-color: #ff6881;
      opacity: 0.1;
    }
  }
}
</style>

<template>
  <div id="simple">
    <h1>简单用例</h1>
    <h3>header 展开</h3>
    <section>
      <main>
        <v-switcher :headers="headers" align="around">
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
          <div class="demo-item" slot="7">
            第八个tab
          </div>
          <div class="demo-item" slot="8">
            第九个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h3>header 居左</h3>
    <h5>这个模式下，屏幕外的 header 会页面切换时自动滚动到视口内</h5>
    <section>
      <main>
        <v-switcher :headers="headers" align="start">
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
          <div class="demo-item" slot="7">
            第八个tab
          </div>
          <div class="demo-item" slot="8">
            第九个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h3>header 居中</h3>
    <section>
      <main>
        <v-switcher :headers="headerCenter" align="center">
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
          <div class="demo-item" slot="7">
            第八个tab
          </div>
          <div class="demo-item" slot="8">
            第九个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h3>header 居右</h3>
    <section>
      <main>
        <v-switcher :headers="headerRight" align="end">
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
          <div class="demo-item" slot="7">
            第八个tab
          </div>
          <div class="demo-item" slot="8">
            第九个tab
          </div>
        </v-switcher>
      </main>
    </section>
    <h3>header 垂直</h3>
    <section>
      <main class="vertical">
        <v-switcher :headers="headers" align="vertical">
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
          <div class="demo-item" slot="7">
            第八个tab
          </div>
          <div class="demo-item" slot="8">
            第九个tab
          </div>
        </v-switcher>
      </main>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Simple',
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
      headerCenter: ['关注', '推荐', '最新'],
      headerRight: [
        {
          name: '最新',
          icon: 'ios',
          'name-active': '最新的',
          'icon-active': 'wechat'
        },
        {
          name: '最热',
          icon: 'android',
          'name-active': '最热的',
          'icon-active': 'weibo'
        }
      ]
    }
  }
}
</script>
