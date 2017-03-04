import Vue from 'vue'
import UWeb from '../../../src/index'
import chai from 'chai'

describe('vue-uweb', () => {
  let sandbox = null
  let should = chai.should()
  let method = 'new'
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
      UWeb.should.have.property(method)
      UWeb[method].should.be.a('function')
    })
  })

  describe('install', function () {
    it('should load script successfully', function (done) {
      let createElement = sandbox.spy(document, 'createElement').withArgs('script')
      let _resolve = sandbox.spy(UWeb, '_resolve')
      let setAccount = sandbox.spy(UWeb, 'setAccount')
      let setAutoPageview = sandbox.spy(UWeb, 'setAutoPageview')

      const siteId = '1261414301'
      Vue.use(UWeb, siteId)

      UWeb.ready().then(() => {
        Vue.prototype.should.have.property('$uweb')
        Vue.prototype.$uweb.should.eql(UWeb)
        Vue.directive('auto-pageview').should.exist
        Vue.directive('track-event').should.exist
        Vue.directive('track-pageview').should.exist
        UWeb._cache.should.eql([])
        createElement.calledOnce.should.be.true
        _resolve.calledOnce.should.be.true
        setAccount.calledOnce.should.be.true
        setAutoPageview.calledOnce.should.be.true
        UWeb.install.installed.should.be.true
        window._czc.should.exist
        let scripts = document.body.getElementsByTagName('script')
        scripts[scripts.length - 1].src.indexOf(siteId).should.not.equal(-1)
        done()
      })
    })
  })

  it('should provide default parameters', () => {
    const _czc = window._czc
    window._czc = []
    let args = ['category', 'aciton', 'label', 999, 'nodeid']
    UWeb.$trackEvent = UWeb.trackEvent

    UWeb.trackEvent = (category, action = args[1], label = args[2], value = args[3], nodeid = args[4]) => {
      UWeb.$trackEvent(category, action, label, value, nodeid)
    }

    UWeb.trackEvent(args[0])

    window._czc.should.have.lengthOf(1)
    window._czc[0].should.eql(['_trackEvent', ...args])

    window._czc = _czc
  })

  describe('_createMethod', () => {
    let array = null

    beforeEach(() => {
      array = null

      sandbox.stub(UWeb, '_push', (arr) => {
        array = arr
      })
    })

    after(() => {
      delete UWeb[method]
    })

    it('should reurn a new method', () => {
      UWeb[method] = UWeb._createMethod(method)
      UWeb[method].should.be.a('function')
    })

    it('should pass 1 parameters to _push', () => {
      UWeb[method]('1')

      array[0].should.equal(`_${method}`)
      array[1].should.equal('1')
      should.not.exist(array[2])
    })

    it('should pass 2 parameters to _push', () => {
      UWeb[method]('1', '2')

      array[0].should.equal(`_${method}`)
      array[1].should.equal('1')
      array[2].should.equal('2')
      should.not.exist(array[3])
    })

    it('should pass 3 parameters to _push', () => {
      UWeb[method]('1', '2', '3')

      array[0].should.equal(`_${method}`)
      array[1].should.equal('1')
      array[2].should.equal('2')
      array[3].should.equal('3')
    })
  })

  describe('patch', () => {
    it('should create a new method', () => {
      let _createMethod = sandbox.spy(UWeb, '_createMethod')

      UWeb.patch(method)

      _createMethod.calledOnce.should.be.true
      UWeb[method].should.be.a('function')
    })
  })

  describe('_push', () => {
    let _czc = null
    let arg = ['_trackEvent', 'click', 'event']
    before(() => {
      _czc = window._czc
    })

    afterEach(() => {
      window._czc = _czc
      UWeb._cache = []
    })

    it('should push into cache', () => {
      window._czc = undefined
      UWeb._push(arg)

      UWeb._cache.should.have.lengthOf(1)
      UWeb._cache[0].should.equal(arg)
    })

    it('should push into _czc', () => {
      window._czc = []

      UWeb._push(arg)

      window._czc.should.have.lengthOf(1)
      window._czc[0].should.equal(arg)
    })
  })
})
