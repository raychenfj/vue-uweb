import { isEmpty, notChanged } from 'src/directives/util'

describe('directives.util', () => {
  describe('skip', () => {
    const binding = {}

    it('should be empty when value is empty', () => {
      binding.value = ''
      isEmpty(binding).should.be.true

      binding.value = undefined
      isEmpty(binding).should.be.true

      binding.value = null
      isEmpty(binding).should.be.true
    })

    it('should be not empty when value is false', () => {
      binding.value = false
      isEmpty(binding).should.be.false
    })

    it('should be not changed when value is equal to oldValue', () => {
      binding.value = binding.oldValue = 'notChanged'
      notChanged(binding).should.be.true

      binding.value = binding.oldValue = { a: 'notChanged' }
      notChanged(binding).should.be.true
    })

    it('should not changed when oldValue is undefined', () => {
      binding.value = binding.oldValue = undefined
      notChanged(binding).should.be.false
    })

    it('should not be changed when value and oldValue are deep equal', () => {
      const binding = {
        value: { foo: 'foo', bar: 'bar' },
        oldValue: { foo: 'foo', bar: 'bar' }
      }

      notChanged(binding).should.be.true
    })
  })
})
