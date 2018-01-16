import uweb from '../index'
import { notChanged } from './util'

export default function (el, binding) {
  if (notChanged(binding)) return

  const args = []
  if (binding.value === false || binding.value === 'false') args.push(false)
  else args.push(true)
  uweb.setAutoPageview(...args)
}

