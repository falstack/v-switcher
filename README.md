# v-switcher

### usage
```sh
yarn add v-switcher
// or
npm i v-switcher
```

```javascript
import Vue from 'vue'
import VSwitcher from 'v-switcher'
import 'v-switcher/dist/v-switcher.css'

Vue.component(VSwitcher.name, VSwitcher)
```

### props
| name | type | default  | required | meaning |
| --- | --- | --- | --- | --- |
| headers | <Array> | [] | Y | tab-header 的数组，支持 icon |
| default-index | <Number> | 0 | N | 默认选中的 tab index |
| routable | <Boolean> | false | N | 设为 true 则为路由模式 |
| animated | <Boolean> | false | N | 是否支持切换动画 | 
| duration | <Number> | 300 | N | 切换动画的时长，ms |
| align | <String> | around | N | tab 的展示模式 ['around', 'start', 'center', 'end', 'vertical'] |
| swipe | <Boolean> | false | N | 是否支持左右手势滑动 | 
| headerTrigger | <String> | click | N | 头部动画触发的方式 ['click', 'hover'] |
| anchorTrigger | <String> | click | N | 锚点动画触发的方式 ['click', 'hover'] |
| anchorPadding | <Number> | 0 | N | 锚点元素的 padding 值 |
| autoplay | <Number> | 0 | N | 自动切换的时长（ms）默认不自动切换 |
| itemWidth | <String> | 100% | N | 每个 content 的宽度，默认 100% |
| itemHeight | <Number> | 40 | N | 每个 item 的高度(px)，默认 40 |

### example
> 用例比较多，比较复杂，就不写了，把项目 clone 到本地，然后执行以下脚本来看 demo 吧
