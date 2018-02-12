export function htmlElement () {
  return {
    listeners: [],
    tagName: 'HTML',
    addEventListener (event, fn) {
      this.listeners.push({ event, listener: fn })
    },
    removeEventListener (event, fn) {
      const index = this.listeners.find(listener => listener.event === event && listener.listener === fn)
      if (index !== -1) {
        this.listeners.splice(index, 1)
      }
    },
    style: {}
  }
}
