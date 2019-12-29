<!--
  消息模板控件：
    通过v-message指令对消息内容进行解析控制

  使用方法：
    import showMsg from './ShowMsg'

    <show-msg :message="message" />

    其中messge数据格式如：
    {
      direction: 1, (1-自己发送；0-其他人发送)
      type: 1, (1-文本；4-图片；... 详见/src/utils/messages.js中解析方法)
      content: '开心就好。[微笑]',
      ctime: new Date().toLocaleTimeString(),
      id: i,
      text: 'test'
    }

  扩展解析信息方法：
    window.FormatMessage.type99Handler = function(data, el) {}
    其中方法名构造方式为： 'type' + message.type + 'Handler'

  copyright fmzh@sina.cn
 -->
<template>
  <div class="showMsg">
    <p class="time">
      <span v-text="message.ctime" />
    </p>
    <p
      v-if="message.type==99"
      class="time system">
      <span v-message="message" />
    </p>
    <div
      v-else
      :class="'main' + (message.direction==1?' self':'')">
      <img
        :src="message.direction==1? ownerAvatarUrl: contactAvatarUrl"
        :width="width"
        :height="width"
        class="avatar">
      <div
        v-message="message"
        class="text" />
    </div>
  </div>
</template>

<script>
import message from '@/directive/message/index'
import me from '@/assets/me.jpg'
import other from '@/assets/other.jpg'

export default {
  name: 'ShowMsg',
  directives: {
    message
  },
  props: {
    message: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ownerAvatarUrl: me,
      contactAvatarUrl: other,
      width: 45
    }
  },
  mounted() {
    if (window.lib && window.lib.flexible) {
      this.width = window.lib.flexible.rem2px(1.2)
    }

    /**
     * 扩展消息类型处理模板
     */
    if (window.FormatMessage && !window.FormatMessage.type99Handler) {
      window.FormatMessage.type99Handler = function(data, el) {
        return '系统消息： system message'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.showMsg {
  .time {
    margin: 10px 0;
    text-align: center;

    span {
      display: inline-block;
      padding: 0 5px;
      font-size: .32rem;
      color: #fff;
      border-radius: 2px;
      background-color: #DADADA;
    }
  }
  .system{
    span{
      padding: 4px 9px;
      text-align: left;
    }
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: calc(100% - 75px);
    min-height: 35px;
    line-height: 2.1;
    font-size: .4rem;
    padding: 6px 10px;
    text-align: left;
    word-break: break-all;
    background-color: #fff;
    color: #000;
    border-radius: 4px;
    box-shadow: 0px 1px 7px -5px #000;
    margin-left: 10px;
  }
  .text:before {
    content: " ";
    position: absolute;
    bottom: 16px;
    right: 100%;
    border: 6px solid transparent;
    border-right-color: #fff;
  }
  .main {
    .text {
      top: -17px;
    }
  }
  .self {
    text-align: right;

    .text {
      background-color: #9EEA6A;
      top: 0;
    }
    .text:before {
      right: inherit;
      left: 100%;
      border-right-color: transparent;
      border-left-color: #9EEA6A;
    }
    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
  }
}
</style>
