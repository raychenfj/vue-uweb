import trackPageview, { watch } from '../../../../src/directives/track-pageview'
import uweb from '../../../../src/index'
import { htmlElement } from '../../mocks'

describe('directives.track-pageview', () => {
  let el = htmlElement()
  let binding = null
  let sandbox = null
  let trackPageviewSpy = null

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    el = htmlElement()
    binding = {
    }
    trackPageviewSpy = sandbox.spy(uweb, 'trackPageview')
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('should work with v-show', () => {
    beforeEach(() => {
      binding.value = 'v-show'
    })

    it('should watch a v-show binded element when it is not displayed', () => {
      el.style.display = 'none'

      trackPageview.bind(el, binding)

      trackPageviewSpy.notCalled.should.be.true
      watch.should.have.lengthOf(1)
      watch[0].should.equal(el)
    })

    it('should send request when a v-show binded element it is displayed', () => {
      el = watch[0]
      el.style.display = 'block'

      trackPageview.update(el, binding)

      trackPageviewSpy.withArgs('v-show').calledOnce.should.be.true
      watch.should.have.lengthOf(0)
      watch.should.not.include(el)
    })

    it('should remove from watch queue when a v-show binded element is unbinded', () => {
      watch.push(el)

      trackPageview.unbind(el, binding)

      watch.should.have.lengthOf(0)
      watch.should.not.include(el)
    })
  })

  it('should be able to pass an object as value', () => {
    binding.value = {
      content_url: '/foo',
      referer_url: 'vue-uweb.com'
    }

    trackPageview.bind(el, binding)

    trackPageviewSpy.withArgs(binding.value.content_url, binding.value.referer_url).calledOnce.should.be.true
    watch.should.have.lengthOf(0)
  })

  it('should return when value is empty', () => {
    trackPageview.bind(el, binding)

    trackPageviewSpy.notCalled.should.be.true
    watch.should.have.lengthOf(0)
  })

  it('should return when value is not changed', () => {
    binding.value = binding.oldValue = 'same'

    trackPageview.bind(el, binding)

    trackPageviewSpy.notCalled.should.be.true
    watch.should.have.lengthOf(0)
  })
})
