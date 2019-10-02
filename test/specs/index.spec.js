import Vue from 'vue'
import uweb from 'src/index'
import chai from 'chai'

describe('vue-uweb', () => {
  let sandbox = null
  const should = chai.should()
  const method = 'new'
  const methods = [
    'trackPageview',
    'trackEvent',
    'setCustomVar',
    'setAccount',
    'setAutoPageview',
    'deleteCustomVar'
  ]

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should contain uweb apis', () => {
    methods.forEach((method) => {
      uweb.should.have.property(method)
      uweb[method].should.be.a('function')
    })
  })

  describe('install', function () {
    it('should load script successfully', function (done) {
      this.timeout(30 * 1000)
      const _resolve = sandbox.spy(uweb, '_resolve')
      const setAccount = sandbox.spy(uweb, 'setAccount')
      const setAutoPageview = sandbox.spy(uweb, 'setAutoPageview')

      const siteId = '1261414301'
      Vue.use(uweb, siteId)

      uweb.ready().then(() => {
        Vue.prototype.should.have.property('$uweb')
        Vue.prototype.$uweb.should.eql(uweb)
        Vue.directive('auto-pageview').should.exist
        Vue.directive('track-event').should.exist
        Vue.directive('track-pageview').should.exist
        uweb._cache.should.eql([])
        _resolve.calledOnce.should.be.true
        setAccount.calledOnce.should.be.true
        setAutoPageview.calledOnce.should.be.true
        uweb.install.installed.should.be.true
        window._czc.should.exist
        const scripts = document.body.getElementsByTagName('script')
        scripts[scripts.length - 1].src.indexOf(siteId).should.not.equal(-1)
        done()
      })
    })
  })

  it('should provide default parameters', () => {
    const _czc = window._czc
    window._czc = []
    const args = ['category', 'aciton', 'label', 999, 'nodeid']
    const trackEvent = uweb.trackEvent

    uweb.trackEvent = (category, action = args[1], label = args[2], value = args[3], nodeid = args[4]) => {
      trackEvent.call(uweb, category, action, label, value, nodeid)
    }

    uweb.trackEvent(args[0])

    window._czc.should.have.lengthOf(1)
    window._czc[0].should.eql(['_trackEvent', ...args])

    window._czc = _czc
    uweb.trackEvent = trackEvent
  })

  describe('_createMethod', () => {
    let array = null

    beforeEach(() => {
      array = null

      sandbox.stub(uweb, '_push').callsFake((arr) => {
        array = arr
      })
    })

    after(() => {
      delete uweb[method]
    })

    it('should reurn a new method', () => {
      uweb[method] = uweb._createMethod(method)
      uweb[method].should.be.a('function')
    })

    it('should pass 1 parameters to _push', () => {
      uweb[method]('1')

      array[0].should.equal(`_${method}`)
      array[1].should.equal('1')
      should.not.exist(array[2])
    })

    it('should pass 2 parameters to _push', () => {
      uweb[method]('1', '2')

      array[0].should.equal(`_${method}`)
      array[1].should.equal('1')
      array[2].should.equal('2')
      should.not.exist(array[3])
    })

    it('should pass 3 parameters to _push', () => {
      uweb[method]('1', '2', '3')

      array[0].should.equal(`_${method}`)
      array[1].should.equal('1')
      array[2].should.equal('2')
      array[3].should.equal('3')
    })
  })

  describe('patch', () => {
    it('should create a new method', () => {
      const _createMethod = sandbox.spy(uweb, '_createMethod')

      uweb.patch(method)

      _createMethod.calledOnce.should.be.true
      uweb[method].should.be.a('function')
    })
  })

  describe('_push', () => {
    let _czc = null
    const arg = ['_trackEvent', 'click', 'event']
    before(() => {
      _czc = window._czc
    })

    afterEach(() => {
      window._czc = _czc
      uweb._cache = []
    })

    it('should push into cache', () => {
      window._czc = undefined
      uweb._push(arg)

      uweb._cache.should.have.lengthOf(1)
      uweb._cache[0].should.equal(arg)
    })

    it('should push into _czc', () => {
      window._czc = []

      uweb._push(arg)

      window._czc.should.have.lengthOf(1)
      window._czc[0].should.equal(arg)
    })
  })
})
