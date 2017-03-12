# 🚧 vue-uweb

> vuejs 友盟统计埋点插件

## 1. 安装

```shell
npm install vue-uweb --save
```
直接在页面中引用
```html
<script src="./node_modules/vue-uweb/dist/index.js"><script>
```
或通过es6模块加载
```javascript
import uweb from 'vue-uweb'
```
使用 vue-uweb 插件
```javascript
Vue.use(uweb,'YOUR_SITEID_HERE')
```
通过传递 options 参数进行更多设置
```javascript
Vue.use(uweb,options)
```
**options**

| 参数 | 必输 | 默认 | 说明 | 备注 |
|-----|------|-----|-----|------|
| siteId | 是 | | 绑定要接受API请求的统计代码siteid| |
| debug | 否 | false | 调试模式下将在控制台中输出调用 window._czc.push 时传递的参数 | **请不要在生产环境中使用，避免造成安全隐患** |
| autoPageview | 否 | true | 是否开启自动统计PV | |
| src | 否 | 精简代码 http://s11.cnzz.com/z_stat.php?id=SITEID&web_id=SITEID | 指定统计脚本标签的 src 属性 | |

## 2. uweb API

[查看官方文档](http://open.cnzz.com/a/new/procedure/)

**注意:** 所有 this 均为 Vue 实例


### 2.1 trackPageview

用于发送某个URL的PV统计请求，适用于统计AJAX、异步加载页面，友情链接，下载链接的流量。

**用法**
```javascript
this.$uweb.trackPageview(content_url[, referer_url])
```

**参数**

| 参数 | 必输 | 类型 | 说明 |
|-----|------|-----|-----|
| content_url | 是 | string | 自定义虚拟PV页面的URL地址，填写以斜杠‘/’开头的相对路径，系统会自动补全域名 |
| referer_url | 否 | string | 自定义该受访页面的来源页URL地址，建议填写该异步加载页面的母页面。不填，则来路按母页面的来路计算。填为“空”，即""，则来路按“直接输入网址或书签”计算。 |

### 2.2 trackEvent

用于发送页面上按钮等交互元素被触发时的事件统计请求。如视频的“播放、暂停、调整音量”，页面上的“返回顶部”、“赞”、“收藏”等。也可用于发送Flash事件统计请求。

**用法**
```javascript
this.$uweb.trackEvent(category, action[, label, value, nodeid])
```

**参数**

| 参数 | 必输 | 类型 | 说明 |
|-----|------|-----|-----|
| category | 是 | string | 表示事件发生在谁身上，如“视频”、“小说”、“轮显层”等等。 |
| action | 是 | string | 表示访客跟元素交互的行为动作，如"播放"、"收藏"、"翻层"等等。|
| label | 否 | string | 用于更详细的描述事件，如具体是哪个视频，哪部小说。|
| value | 否 | int | 用于填写打分型事件的分值，加载时间型事件的时长，订单型事件的价格。请填写整数数值，如果填写为其他形式，系统将按0处理。若填写为浮点小数，系统会自动取整，去掉小数点。|
| nodeid | 否 | string | 填写事件元素的div元素id。请填写class id，暂不支持name。|

### 2.3 setCustomVar

用于发送为访客打自定义标记的请求，用来统计会员访客、登录访客、不同来源访客的浏览数据。

**用法**
```javascript
this.$uweb.setCustomVar(name, value[, time])
```

**参数**

| 参数 | 必输 | 类型 | 说明 |
|-----|------|-----|-----|
| name | 是 | string | 自定义访客种类，用来描述观察访客的角度，如“会员级别”、“访客来源”等等。 |
| value | 是 | string | 自定义访客值，表示对访客类型的具体描述，如"VIP1"、"VIP2"等等。|
| time | 否 | int | 有效时长，表示本自定义访客标记的生效时长。 不填或填“1”表示长期有效。填“0”表示仅在发包页面有效。填“2”表示仅在本访次有效。填具体数值，表示生效时长，单位“秒”。|

### 2.4 setAccount

当您的页面上添加了多个CNZZ统计代码时，需要用到本方法绑定需要哪个siteid对应的统计代码来接受API发送的请求。未绑定的siteid将忽略相关请求。

**备注：** 一般情况下无需调用该方法，只需调用 Vue.use 时直接传递 siteId 或通过 options.siteId 传递即可

**用法**
```javascript
this.$uweb.setAccount(siteid)
```

**参数**

| 参数 | 必输 | 类型 | 说明 |
|-----|------|-----|-----|
| siteid | 是 | int | 绑定要接受API请求的统计代码siteid。 |

### 2.5 setAutoPageview

如果您使用_trackPageview改写了已有页面的URL，那么建议您在CNZZ的JS统计代码执行前先调用_setAutoPageview，将该页面的自动PV统计关闭，防止页面的流量被统计双倍。

**备注：** 在调用 Vue.use 时可通过通过 options.autoPageview 设置初始值，默认为 true

**用法**
```javascript
this.$uweb.setAutoPageview(autopageview)
```

**参数**

| 参数 | 必输 | 类型 | 说明 |
|-----|------|-----|-----|
| autopageview | 是 | boolean | 是否自动发送页面PV的统计请求。关闭自动发送，填false开启自动发送，为true，不调用时默认为true。 |

### 2.6 deleteCustomVar ###

发送删除自定义访客标签的请求。将访客身上已被标记的自定义访客类型去掉，去掉后不再继续统计。

**用法**
```javascript
his.$uweb.deleteCustomVar(name)
```

**参数**

| 参数 | 必输 | 类型 | 说明 |
|-----|------|-----|-----|
| name | 是 | string | 需要被删除的自定义访客类型。 填写自定义访客类型种类名name。 |

## 3. uweb 指令

vue-uweb 提供 track-event，track-pageview 和 auto-pageview 三个指令，开发者可以直接在 html 模版中使用来统计网站数据

### 3.1 track-event

使用指令 v-track-event 监听事件， 通过 modifiers 指定事件类型，将自动为绑定元素添加事件监听，当事件触发调用统计代码。 如不指定事件，默认监听 click 事件。 

可通过逗号分隔的字符串或对象字面量传递参数，以字符串传递时请注意参数顺序，可参考trackEvent API。

**用法**
```html
<button v-track-event.click="'category, action''"></button> // 统计click事件

<button v-track-event="'category, action'"></button> // 统计click事件简写

<input v-track-event.keypress="'category, action'"> // 统计keypress事件

<button v-track-event="'category, action, label, value, nodeid'"><button> // 以字符串传递参数

<button v-track-event="{category:'event', action:'click'}"></button> // 以对象字面量传递参数
```

### 3.2 track-pageview

使用指令 track-pageview 统计虚拟 PV ，一般可以配合 v-show 或 v-if 来统计局部动态视图的 PV。

可通过逗号分隔的字符串或对象字面量传递参数，以字符串传递时请注意参数顺序，可参考trackPageview API。

**用法**
```html
<div v-show="show" v-track-pageview="'/bar'">bar</div> //  跟踪 v-show 绑定元素的虚拟pv

<div v-if="show" v-track-pageview="'/foo'">foo</div> // 跟踪 v-if 绑定元素的虚拟pv

<div v-track-pageview="'/tar, https://github.com/raychenfj'"></div> // 以字符串指定受访页面和来源

<div v-track-pageview="{content_url:'/zoo', referer_url:'https://github.com/raychenfj'}"></div> // 以对象字面量指定受访页面和来源
```

### 3.3 auto-pageview

使用指令 auto-pageview 开关自动统计

**用法**
``` html
<div v-auto-pageview=true></div> // 启用 auto-pageview

<div v-auto-pageview=false></div> // 停止 auto-pageview
```

## 4. 默认参数和改变参数顺序

认情况下，vue-uweb 并不提供默认参数和参数顺序的设置，但开发者可以根据需求，使用装饰器模式，来提供默认参数和改变参数顺序。

例如：我们想在监听事件时默认category，只需要传递action，则代码如下

```javascript
let trackEvent = uweb.trackEvent
uweb.trackEvent = (action, category='default'') => {
  trackEvent.call(uweb, category, action, '', '', '')
}

Vue.use(uweb)
```
