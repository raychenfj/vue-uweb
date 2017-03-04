import uweb from '../index'
import { skip } from './util'

export default function (el, binding) {
  if (skip(binding)) return

  let args = []
  if (binding.value === false || binding.value === 'false') args.push(false)
  else args.push(true)
  uweb.setAutoPageview(...args)
}

