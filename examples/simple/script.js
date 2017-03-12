var Vue = window.Vue
var uweb = window.uweb

Vue.use(uweb, '1261414301')

new Vue({
  el: '#app',
  data: {
    content: '',
    auto: true,
    vshow: false,
    vif: false
  },
  methods: {
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    }
  }
})
