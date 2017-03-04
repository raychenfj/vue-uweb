Vue.use(UWeb, {
  siteId: '1261414301'
})

new Vue({
  el: '#app',
  data: {
    greeting: 'Welcome to your Vue.js app!',
    docsURL: 'http://vuejs.org/guide/',
    gitterURL: 'https://gitter.im/vuejs/vue',
    forumURL: 'http://forum.vuejs.org/',
    content: '',
    auto: true
  },
  methods: {
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    }
  }
})
