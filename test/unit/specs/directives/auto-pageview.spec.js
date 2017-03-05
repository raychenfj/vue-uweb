import autoPageview from '../../../../src/directives/auto-pageview'
import uweb from '../../../../src/index'
import { htmlElement } from './mocks'

describe('directives.auto-pageview', () => {
  let el = htmlElement()
  let binding = {}
  let setAutoPageview = null
  let sandbox = null

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    el = htmlElement()
    binding = {}
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should enable autoPageview by default', () => {
    binding.value = ''
    setAutoPageview = sandbox.spy(uweb, 'setAutoPageview').withArgs(true)

    autoPageview(el, binding)

    setAutoPageview.calledOnce.should.be.true
  })

  it('should set the autoPageview to true', () => {
    binding.value = true
    setAutoPageview = sandbox.spy(uweb, 'setAutoPageview').withArgs(true)

    autoPageview(el, binding)

    setAutoPageview.calledOnce.should.be.true
  })

  it('should set the autoPageview to false', () => {
    binding.value = false
    setAutoPageview = sandbox.spy(uweb, 'setAutoPageview').withArgs(false)

    autoPageview(el, binding)

    setAutoPageview.calledOnce.should.be.true
  })

  it('should set the autoPageview to false when given "false"', () => {
    binding.value = 'false'
    setAutoPageview = sandbox.spy(uweb, 'setAutoPageview').withArgs(false)

    autoPageview(el, binding)

    setAutoPageview.calledOnce.should.be.true
  })

  it('should skip when value not changed', () => {
    binding.value = binding.oldValue = 'same'
    setAutoPageview = sandbox.spy(uweb, 'setAutoPageview')

    autoPageview(el, binding)

    setAutoPageview.notCalled.should.be.true
  })
})
