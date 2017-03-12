// import trackPageview from '../../../../src/directives/track-pageview'
// import uweb from '../../../../src/index'
// import { htmlElement } from './mocks'

describe('directives.track-pageview', () => {
  // let el = htmlElement()
  // let binding = null
  let sandbox = null
  // let trackPageviewSpy = null

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    // el = htmlElement()
    // binding = {
    // }
    // trackPageviewSpy = null
  })

  afterEach(() => {
    sandbox.restore()
  })

  // it('should binding to nomarl html element', () => {
  //   binding.value = 'content_url, referer_url'
  //   trackPageviewSpy = sandbox.spy(uweb, 'trackPageview').withArgs('content_url', 'referer_url')

  //   trackPageview.bind(el, binding)

  //   trackPageviewSpy.calledOnce.should.be.true
  //   el.listeners.size.should.equal(0)
  // })

  // it('should add click event to a tag', () => {
  //   el = aElement()
  //   binding.value = 'content_url, referer_url'
  //   trackPageviewSpy = sandbox.spy(uweb, 'trackPageview').withArgs('content_url', 'referer_url')

  //   trackPageview(el, binding)

  //   trackPageviewSpy.notCalled.should.be.true
  //   el.listeners.has('click').should.be.true

  //   el.listeners.get('click')()
  //   trackPageviewSpy.calledOnce.should.be.true
  // })

  // it('should use href of a tag as content_url', () => {
  //   el = aElement()
  //   binding.value = ''
  //   el.href = 'http://localhost:9876/example'
  //   trackPageviewSpy = sandbox.spy(uweb, 'trackPageview').withArgs('/example')

  //   trackPageview(el, binding)

  //   trackPageviewSpy.notCalled.should.be.true
  //   el.listeners.has('click').should.be.true

  //   el.listeners.get('click')()
  //   trackPageviewSpy.calledOnce.should.be.true
  // })

  // it('should be able to pass a object as value', () => {
  //   binding.value = {
  //     content_url: 'content_url',
  //     referer_url: 'referer_url'
  //   }

  //   trackPageviewSpy = sandbox.spy(uweb, 'trackPageview').withArgs('content_url', 'referer_url')

  //   trackPageview.bind(el, binding)

  //   trackPageviewSpy.calledOnce.should.be.true
  //   el.listeners.size.should.equal(0)
  // })

  // it('should skip when value not changed', () => {
  //   binding.value = binding.oldValue = {
  //     content_url: 'content_url',
  //     referer_url: 'referer_url'
  //   }
  //   trackPageviewSpy = sandbox.spy(uweb, 'trackEvent')
  //   let addEventListener = sandbox.spy(el, 'addEventListener')

  //   trackPageview.update(el, binding)

  //   trackPageviewSpy.notCalled.should.be.true
  //   addEventListener.notCalled.should.be.true
  // })

  // it('should skip when a tag without binding value and href', () => {
  //   el = aElement()

  //   trackPageviewSpy = sandbox.spy(uweb, 'trackEvent')
  //   let addEventListener = sandbox.spy(el, 'addEventListener')

  //   trackPageview(el, binding)

  //   trackPageviewSpy.notCalled.should.be.true
  //   addEventListener.notCalled.should.be.true
  // })

  // it('should skip when a html element without binding value', () => {
  //   trackPageviewSpy = sandbox.spy(uweb, 'trackEvent')
  //   let addEventListener = sandbox.spy(el, 'addEventListener')

  //   trackPageview.bind(el, binding)

  //   trackPageviewSpy.notCalled.should.be.true
  //   addEventListener.notCalled.should.be.true
  // })
})
