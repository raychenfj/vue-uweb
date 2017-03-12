import autoPageview from './directives/auto-pageview'
import trackEvent from '././directives/track-event'
import trackPageview from '././directives/track-pageview'

  /**
   * install
   *
   * @param {Vue} Vue
   * @param {Object} options
   * @returns
   */
export default function install (Vue, options) {
  if (this.install.installed) return

  if (options.debug) {
    this.debug = console.debug
  } else {
    this.debug = () => {}
  }

  let siteId = null
  // passsing siteId through object or string
  if (typeof options === 'object') {
    siteId = options.siteId
    if (options.autoPageview !== false) {
      options.autoPageview = true
    }
  } else {
    siteId = options
  }
  if (!siteId) {
    return console.error('siteId is missing')
  }
  this.install.installed = true

  // insert u-web statistics script
  const script = document.createElement('script')
  const src = `https://s95.cnzz.com/z_stat.php?id=${siteId}&web_id=${siteId}`
  script.src = options.src || src

  // callback when the script is loaded
  script.onload = () => {
    // if the global object is exist, resolve the promise, otherwise reject it
    if (window._czc) {
      this._resolve()
    } else {
      console.error('loading uweb statistics script failed, please check src and siteId')
      return this._reject()
    }
    // load from cache
    this._cache.forEach((cache) => {
      window._czc.push(cache)
    })
    this._cache = []
  }

  this.setAccount(options.siteId)
  this.setAutoPageview(options.autoPageview)

  document.body.appendChild(script)

  // store into cache when the script is not fully loaded
  // add $czc to Vue prototype
  Object.defineProperty(Vue.prototype, '$uweb', {
    get: () => this
  })

  Vue.directive('auto-pageview', autoPageview)
  Vue.directive('track-event', trackEvent)
  Vue.directive('track-pageview', trackPageview)
}
