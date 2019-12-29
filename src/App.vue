<template>
  <div id="app" >
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
  </div>
</template>

<script>
import pullRefresh from './components/PullRefresh'
import showMsg from './components/ShowMsg'

export default {
  name: 'App',
  components: {
    pullRefresh,
    showMsg
  },
  data() {
    return {
      dataArray: [],
      index: 1,
      isScroll: false
    }
  },
  mounted() {
    let i = this.index
    for (; i <= 10; i++) {
      let data = this.genTestData(i, i % 7, i % 2)
      this.dataArray.push(data)
    }
    this.index = i

    setInterval(() => {
      let i = this.index++
      let data = this.genTestData(i, i % 4, 1)
      this.dataArray.push(data)
    }, 5000)
  },
  methods: {
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
    genTestData(i, type, direction) {
      return {
        direction: direction,
        type: type,
        content: '开心就好。[微笑]',
        ctime: new Date().toLocaleTimeString(),
        id: i,
        text: (100 * i + 10 * i + i) + ''
      }
    }
  }
}
</script>
<style>
body{
  margin: 0
}
</style>
<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: rgb(239, 239, 239);

  .refreshDataContainer {
    list-style: none;
    padding: 0 15px;
    margin: 0;
    background-color: rgb(239, 239, 239);

    li {
      background-color: #eee;
      margin-bottom: 1px;
      padding: 20px 10px;
    }
  }
}
</style>
