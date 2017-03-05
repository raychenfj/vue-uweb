import uweb from '../index'
import { notChanged, isEmpty } from './util'

export default function (el, binding) {
  let isATag = el.tagName.toLowerCase() === 'a'
  if (notChanged(binding)) return
  if (isATag && isEmpty(binding) && !el.href) return
  if (!isATag && isEmpty(binding)) return

  let args = []

  // passing parameters as object
  if (typeof binding.value === 'object') {
    let value = binding.value
    if (value.content_url) args.push(value.content_url)
    if (value.referer_url) args.push(value.referer_url)

    // passing parameters as string separate by comma
  } else if (typeof binding.value === 'string' && binding.value) {
    args = binding.value.split(',')
    args.forEach((arg, i) => (args[i] = arg.trim()))
  }

  // track a tag
  if (isATag) {
    if (!args.length && el.href) {
      args.push(el.href.replace(location.origin, ''))
    }
    el.addEventListener('click', () => uweb.trackPageview(...args), false)
    return
  }

  uweb.trackPageview(...args)
}
