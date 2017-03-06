Vue.use(UWeb, {
  debug: true,
  siteId: '1261414301'
})

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
