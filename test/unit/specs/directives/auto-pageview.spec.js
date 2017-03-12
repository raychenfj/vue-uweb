import autoPageview from '../../../../src/directives/auto-pageview'
import uweb from '../../../../src/index'
import { htmlElement } from '../../mocks'

describe('directives.auto-pageview', () => {
  let el = htmlElement()
  let binding = {}
  let setAutoPageviewSpy = null
  let sandbox = null

  before(() => {
    sandbox = sinon.sandbox.create()
  })

  beforeEach(() => {
    el = htmlElement()
    binding = {}
    setAutoPageviewSpy = sandbox.spy(uweb, 'setAutoPageview')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should enable autoPageview by default', () => {
    binding.value = ''

    autoPageview(el, binding)

    setAutoPageviewSpy.withArgs(true).calledOnce.should.be.true
  })

  it('should set the autoPageview to true', () => {
    binding.value = true

    autoPageview(el, binding)

    setAutoPageviewSpy.withArgs(true).calledOnce.should.be.true
  })

  it('should set the autoPageview to false', () => {
    binding.value = false

    autoPageview(el, binding)

    setAutoPageviewSpy.withArgs(false).calledOnce.should.be.true
  })

  it('should set the autoPageview to false when given "false"', () => {
    binding.value = 'false'

    autoPageview(el, binding)

    setAutoPageviewSpy.withArgs(false).calledOnce.should.be.true
  })

  it('should skip when value not changed', () => {
    binding.value = binding.oldValue = 'same'

    autoPageview(el, binding)

    setAutoPageviewSpy.notCalled.should.be.true
  })
})
