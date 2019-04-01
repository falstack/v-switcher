# vue-layout-tab

## usage

### install
```shell
yarn add vue-layout-tab
```

### example
```vue
<v-tab :headers="headers">
  <template slot="0">
    <VueScroll>
      建议使用 better-scroll
    </VueScroll>
  </template>
  <template slot="1">
    <p>非 routable 模式下，template 个数与 headers 的长度相同</p>
  </template>
</v-tab>
```
### args
| name | type | default  | required | meaning |
| --- | --- | --- | --- | --- |
| headers | <Array> | [] | Y | tab-header 的数组，支持 icon |
| tab-height | <Number> | 40 | N | tab-header 的高度，px |
| default-index | <Number> | 0 | N | 默认选中的 tab index |
| routable | <Boolean> | false | N | 设为 true 则为路由模式 |
| animated | <Boolean> | false | N | 是否支持切换动画 | 
| duration | <Number> | 300 | N | 切换动画的时长，ms |
| align | <String> | around | N | tab 的展示模式 ['around', 'start', 'center', 'end'] |
| swipe | <Boolean> | false | N | 是否支持左右手势滑动 | 
| sticky | <Boolean> | true | N | 是否让 tab-header 吸附在页面顶部 |


### tips
1. tab 较多时建议`align：start`
2. `swipe: true`的时候建议使用`better-scroll`
3. 使用`better-scroll`的使用，建议`sticky: true`
4. `headers`可以是字符串数组，也可以是对象数组，`routable: true`时，使用对象数组，每个tab有`route`属性，为指向页面的`name`
5. `routable：true`的时候，不需要`<template slot>`

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```
