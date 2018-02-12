import uweb from '../index'
import { notChanged, isEmpty } from './util'

export default function (el, binding) {
  if (notChanged(binding) || isEmpty(binding)) return

  if (el.removeEventListeners && typeof el.removeEventListeners === 'function') {
    el.removeEventListeners()
  }

  let args = []
  // use modifier as events
  const events = Object.keys(binding.modifiers).map(modifier => {
    if (binding.modifiers[modifier]) {
      return modifier
    }
  })

  // passing parameters as object
  if (typeof binding.value === 'object') {
    const value = binding.value
    if (value.category) args.push(value.category)
    if (value.action) args.push(value.action)
    if (value.label) args.push(value.label)
    if (value.value) args.push(value.value)
    if (value.nodeid) args.push(value.nodeid)

    // passing parameters as string separate by comma
  } else if (typeof binding.value === 'string') {
    args = binding.value.split(',')
    args.forEach((arg, i) => (args[i] = arg.trim()))
  }

  if (!events.length) events.push('click') // listen click event by default

  // addEventListener for each event, call trackEvent api
  const listeners = []
  events.forEach((event, index) => {
    listeners[index] = () => uweb.trackEvent(...args)
    el.addEventListener(event, listeners[index], false)
  })

  // a function to remove all previous event listeners in update cycle to prevent duplication
  el.removeEventListeners = () => {
    events.forEach((event, index) => {
      el.removeEventListener(event, listeners[index])
    })
  }
}
