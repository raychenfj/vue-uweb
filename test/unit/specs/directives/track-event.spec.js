import trackEvent from '../../../../src/directives/track-event'
import uweb from '../../../../src/index'
import { htmlElement } from '../../mocks'

describe('directives.track-event', () => {
  let el = htmlElement()
  let binding = null
  let sandbox = null
  let trackEventSpy = null

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    el = htmlElement()
    binding = {
      modifiers: {}
    }
    trackEventSpy = sandbox.spy(uweb, 'trackEvent')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should track click by default', () => {
    binding.value = 'category, action'

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    el.listeners.has('click').should.be.true
    el.listeners.get('click')()

    trackEventSpy.withArgs('category', 'action').calledOnce.should.be.true
  })

  it('should use modifiers as event', () => {
    binding.value = 'category, action, label'
    binding.modifiers = {
      keypress: true
    }

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    el.listeners.has('keypress').should.be.true
    el.listeners.get('keypress')()

    trackEventSpy.withArgs('category', 'action', 'label').calledOnce.should.be.true
  })

  it('should be able to chain multi modifiers as events', () => {
    binding.value = 'category, action, label, 666'
    binding.modifiers = {
      keypress: true,
      mouseup: true,
      mousedown: true
    }

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true

    el.listeners.has('keypress').should.be.true
    el.listeners.get('keypress')()

    el.listeners.has('mouseup').should.be.true
    el.listeners.get('mouseup')()

    el.listeners.has('mousedown').should.be.true
    el.listeners.get('mousedown')()

    trackEventSpy.withArgs('category', 'action', 'label', '666').calledThrice.should.be.true
  })

  it('should be able to pass an object as value', () => {
    binding.value = {
      category: 'category',
      action: 'action',
      label: 'label',
      value: 666,
      nodeid: 'node'
    }

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    el.listeners.has('click').should.be.true
    el.listeners.get('click')()

    trackEventSpy.withArgs('category', 'action', 'label', 666, 'node').calledOnce.should.be.true
  })

  it('should skip when value is not changed', () => {
    binding.value = binding.oldValue = {
      category: 'category',
      action: 'action',
      label: 'label',
      value: 666,
      nodeid: 'node'
    }
    let addEventListener = sandbox.spy(el, 'addEventListener')

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    addEventListener.notCalled.should.be.true
  })

  it('should skip when value is empty', () => {
    let addEventListener = sandbox.spy(el, 'addEventListener')

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    addEventListener.notCalled.should.be.true
  })
})
