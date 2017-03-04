import uweb from '../index'
import { skip } from './util'

export default function (el, binding) {
  if (skip(binding)) return

  let args = []

  // passing parameters as object
  if (typeof binding.value === 'object') {
    let value = binding.value
    if (value.content_url) args.push(value.content_url)
    if (value.referer_url) args.push(value.referer_url)

    // passing parameters as string separate by comma
  } else if (typeof binding.value === 'string') {
    args = binding.value.split(',')
    args.forEach(arg => arg.trim())
  }

  // track a tag
  if (!args.length) {
    if (el.tagName.toLowerCase() === 'a' && el.href) {
      args.push(el.href.replace(location.origin, ''))
    }
  }

  uweb.trackPageview(...args)
}
