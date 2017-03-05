import { isEmpty, notChanged } from '../../../../src/directives/util'

describe('directives.util', () => {
  describe('skip', () => {
    let binding = {}

    it('should isEmpty should be true when value is empty', () => {
      binding.value = ''
      isEmpty(binding).should.be.true

      binding.value = undefined
      isEmpty(binding).should.be.true

      binding.value = null
      isEmpty(binding).should.be.true
    })

    it('should isEmpty should be false when value is false', () => {
      binding.value = false
      isEmpty(binding).should.be.false
    })

    it('should notChanged should be true when value is equal to oldValue', () => {
      binding.value = binding.oldValue = 'notChanged'
      notChanged(binding).should.be.true

      binding.value = binding.oldValue = { a: 'notChanged' }
      notChanged(binding).should.be.true
    })

    it('should notChanged should be false when oldValue is undefined', () => {
      binding.value = binding.oldValue = undefined
      notChanged(binding).should.be.false
    })
  })
})
