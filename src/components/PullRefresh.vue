<!--
  下拉刷新控件：
    通过touchstart、touchmove、touchend事件进行实现

  使用方法：
    import pullRefresh from './PullRefresh'

    <pull-refresh @scroll-to-top="scrollTopHandler">...</pull-refresh>

    其中scroll-to-top事件为下拉刷新要实现的业务内容

  copyright fmzh@sina.cn
 -->
<template>
  <div>
    <div
      ref="refreshText"
      class="refreshText" />
    <div
      ref="refreshContainer"
      class="refreshContainer"
      @touchstart="touchstartHandler"
      @touchmove="touchmoveHandler"
      @touchend="touchendHandler">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PullRefresh',
  props: {
  },
  data() {
    return {
      element: null,
      refreshText: null,
      startPos: 0,
      transitionHeight: 0
    }
  },
  computed: {
    realMinHeight() {
      return this.minHeight + 30
    }
  },
  mounted() {
    this.element = this.$refs.refreshContainer
    this.refreshText = this.$refs.refreshText
  },
  methods: {
    touchstartHandler(e) {
      this.startPos = e.touches[0].pageY
      this.element.style.position = 'relative'
      this.element.style.transition = 'transform 0s'
    },
    touchmoveHandler(e) {
      this.transitionHeight = e.touches[0].pageY - this.startPos

      if (this.transitionHeight > 0 && this.transitionHeight < 60) {
        this.refreshText.innerText = '下拉刷新'
        this.element.style.transform = 'translateY(' + this.transitionHeight + 'px)'

        if (this.transitionHeight > 55) {
          this.refreshText.innerText = '释放更新'
        }
      }
    },
    touchendHandler(e) {
      this.element.style.transition = 'transform 0.5s ease 1s'
      this.element.style.transform = 'translateY(0px)'
      this.refreshText.innerText = '更新中...'

      this.$emit('scroll-to-top')
    }
  }
}
</script>

<style>
.refreshText{
  position: absolute;
  width: 100%;
  line-height: 50px;
  text-align: center;
  padding: 10px 0;
  font-size: .4rem;
  left: 0;
  top: 0;
  background-color: rgb(239, 239, 239);
}
</style>
