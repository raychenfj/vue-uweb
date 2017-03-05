export function htmlElement () {
  return {
    listeners: new Map(),
    tagName: 'HTML',
    addEventListener (event, fn) {
      this.listeners.set(event, fn)
    }
  }
}

export function aElement () {
  return {
    ...htmlElement(),
    tagName: 'A',
    href: ''
  }
}
