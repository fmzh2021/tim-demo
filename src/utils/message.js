/**
 * 消息解析
 *
 * 包含方法：
 *     方法名              功能                  入参
 *   format             总解析入口           入参：type、content
 *   type0Handler   type=0的信息模板解析     同上
 *   type1Handler   type=1的信息模板解析     同上
 *   type2Handler   type=2的信息模板解析     同上
 *   type3Handler   type=3的信息模板解析     同上
 *   type4Handler   type=4的(图片)信息模板解析     同上
 *   type5Handler   type=5的(视频)信息模板解析     同上
 *   type6Handler   type=6的(音频)信息模板解析     同上
 *   type99Handler  type=99的(系统)信息模板解析     同上
 * @author fmzh@sina.cn
 */
(function(win) {
  const FormatMessage = function() {}

  /**
   * 解析数据、渲染页面
   * @data 传入数据
   * @el html节点
   */
  FormatMessage.prototype.format = function(data, el) {
    if (!data) {
      return data
    }

    if (this['type' + data.type + 'Handler']) {
      return this['type' + data.type + 'Handler'](data, el)
    } else {
      return '[暂未支持的消息类型:' + data.type + ']'
    }
  }

  /**
   * type=0 执行 文本展示 方法
   * @data 传入数据
   * @el html节点
   */
  FormatMessage.prototype.type0Handler = function(data, el) {
    return '<span>' + data.content + '</span>'
  }
  FormatMessage.prototype.type1Handler = FormatMessage.prototype.type0Handler
  FormatMessage.prototype.type2Handler = FormatMessage.prototype.type0Handler
  FormatMessage.prototype.type3Handler = FormatMessage.prototype.type0Handler
  /**
   * type=4 执行 图片解析 方法
   * @data 传入数据
   * @el html节点
   */
  FormatMessage.prototype.type4Handler = function(data, el) {
    let width = '100%'
    if (window.lib && window.lib.flexible) {
      width = window.lib.flexible.rem2px(6.4) + ''
    }
    return '<img src="https://www.w3school.com.cn/i/eg_tulip.jpg" width="' + width + '"  alt="上海鲜花港 - 郁金香" />'
  }
  /**
   * type=5 执行 视频展示 方法
   * @data 传入数据
   * @el html节点
   */
  FormatMessage.prototype.type5Handler = function(data, el) {
    let width = '100%'
    if (window.lib && window.lib.flexible) {
      width = window.lib.flexible.rem2px(6.4) + ''
    }
    return '<video src="https://www.w3school.com.cn/i/movie.ogg" width="' + width + '" controls="controls">your browser does not support the video tag</video>'
  }
  /**
   * type=6 执行 音频展示 方法
   * @data 传入数据
   * @el html节点
   */
  FormatMessage.prototype.type6Handler = function(data, el) {
    let width = '100%'
    if (window.lib && window.lib.flexible) {
      width = window.lib.flexible.rem2px(6.4) + ''
    }
    return '<div style="transform: scale(0.8, 0.8);width:' + width + 'px;"><audio src="https://www.w3school.com.cn/i/horse.ogg" width="100%" style="margin-left: -30px;" controls="controls">Your browser does not support the audio element.</audio></div>'
  }

  win.FormatMessage = new FormatMessage()
})(window)
