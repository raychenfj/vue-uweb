import install from './install'

// deferred promise
const deferred = {}
deferred.promise = new Promise((resolve, reject) => {
  deferred.resolve = resolve
  deferred.reject = reject
})

// uweb apis
const methods = [
  'trackPageview', // http://open.cnzz.com/a/api/trackpageview/
  'trackEvent', // http://open.cnzz.com/a/api/trackevent/
  'setCustomVar', // http://open.cnzz.com/a/api/setcustomvar/
  'setAccount', // http://open.cnzz.com/a/api/setaccount/
  'setAutoPageview', // http://open.cnzz.com/a/api/setautopageview/
  'deleteCustomVar' // http://open.cnzz.com/a/api/deletecustomvar/
]

const uweb = {
  /**
   * internal user only
   */
  _cache: [],

  /**
   * internal user only, resolve the promise
   */
  _resolve () {
    deferred.resolve()
  },

  /**
   * internal user only, reject the promise
   */
  _reject () {
    deferred.reject()
  },

  /**
   * push the args into _czc, or _cache if the script is not loaded yet
   */
  _push () {
    this.debug(arguments)
    if (window._czc) {
      window._czc.push.apply(window._czc, arguments)
    } else {
      this._cache.push.apply(this._cache, arguments)
    }
  },

  /**
   * general method to create uweb apis
   */
  _createMethod (method) {
    return function () {
      const args = Array.prototype.slice.apply(arguments)
      this._push([`_${method}`, ...args])
    }
  },

  /**
   * debug
   */
  debug () {},

  /**
   * the plugins is ready when the script is loaded
   */
  ready () {
    return deferred.promise
  },

  /**
   * install function
   */

  install,

  /**
   * patch up to create new api
   */
  patch (method) {
    this[method] = this._createMethod(method)
  }
}

// uweb apis
methods.forEach((method) => (uweb[method] = uweb._createMethod(method)))

if (window.Vue) {
  window.uweb = uweb
}
export default uweb
