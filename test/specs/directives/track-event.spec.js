import trackEvent from 'src/directives/track-event'
import uweb from 'src/index'
import { htmlElement } from '../../mocks'

function hasEvent (listeners, event) {
  return !!listeners.find(listener => listener.event === event)
}

function getEventListener (listeners, event) {
  const listener = listeners.find(listener => listener.event === event)
  if (listener && typeof listener.listener === 'function') {
    return listener.listener
  }
}

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
    hasEvent(el.listeners, 'click').should.be.true
    getEventListener(el.listeners, 'click')()

    trackEventSpy.withArgs('category', 'action').calledOnce.should.be.true
  })

  it('should use modifiers as event', () => {
    binding.value = 'category, action, label'
    binding.modifiers = {
      keypress: true
    }

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true

    hasEvent(el.listeners, 'keypress').should.be.true
    getEventListener(el.listeners, 'keypress')()

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

    hasEvent(el.listeners, 'keypress').should.be.true
    getEventListener(el.listeners, 'keypress')()

    hasEvent(el.listeners, 'mouseup').should.be.true
    getEventListener(el.listeners, 'mouseup')()

    hasEvent(el.listeners, 'mousedown').should.be.true
    getEventListener(el.listeners, 'mousedown')()

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
    hasEvent(el.listeners, 'click').should.be.true
    getEventListener(el.listeners, 'click')()

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
    const addEventListener = sandbox.spy(el, 'addEventListener')

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    addEventListener.notCalled.should.be.true
  })

  it('should skip when value is empty', () => {
    const addEventListener = sandbox.spy(el, 'addEventListener')

    trackEvent(el, binding)

    trackEventSpy.notCalled.should.be.true
    addEventListener.notCalled.should.be.true
  })

  it('should prevent duplicated binding when update', () => {
    binding.value = 'category, action'

    trackEvent(el, binding)

    binding.oldValue = {
      category: 'category',
      action: 'action'
    }
    binding.value = 'new-category, new-action'

    trackEvent(el, binding)

    hasEvent(el.listeners, 'click').should.be.true
    el.listeners.filter(listener => listener.event === 'click').length.should.equal(1)
  })
})
