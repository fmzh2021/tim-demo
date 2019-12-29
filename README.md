# tim-demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 介绍

[演示地址](http://120.79.79.144:8080)

## 相关控件
| Project | Status | Description |
|---------|--------|-------------|
| [PullRefresh]          | [![Build Status](https://img.shields.io/circleci/project/github/vuejs/vue-router/dev.svg)](https://circleci.com/gh/vuejs/vue-router) | 下拉刷新；<span style="color:red">注意：由于使用touchstart、touchmove、touchend事件进行实现，所以请使用移动端测试，或者pc浏览器中，使用调试模式，调成移动端形式</span> |
| [ShowMsg]                | [![Build Status](https://img.shields.io/circleci/project/github/vuejs/vue-router/dev.svg)](https://circleci.com/gh/vuejs/vue-router) | 信息展示模板 |

## PullRefresh使用方法

见 src/App.vue中使用方法

引入控件
```
import pullRefresh from './components/PullRefresh'
import showMsg from './components/ShowMsg'
```
注册控件
```
components: {
	pullRefresh,
	showMsg
}
```
使用控件，pullRefresh中实现scroll-to-top事件，即可使用下拉刷新获取历史数据功能；
showMsg控件入参message需包含ctime(信息发送时间)、type(信息类型：字符串、图片、视频、音频等)、content(信息内容)、direction(方向：区分是自己还是其他用户)等属性
```
<pull-refresh @scroll-to-top="scrollTopHandler">
  <ul
    ref="refreshDataContainer"
    class="refreshDataContainer" >
    <li
      v-for="message in dataArray"
      :key="message.id">
      <show-msg :message="message" />
    </li>
  </ul>
</pull-refresh>
```
下拉刷新内容：
其中效率是通过数据加载进行控制（eg：分页加载数据，每次只加载10条数据）
```
scrollTopHandler() {
  // 简易节流
  if (!this.isScroll) {
    this.isScroll = true
    setTimeout(() => {
      let i = this.index++
      let data = this.genTestData(i, 99, 1)
      this.dataArray.unshift(data)
      this.isScroll = false
    }, 1000)
  }
},
```

## ShowMsg使用方法

见 src/App.vue中使用方法，同上