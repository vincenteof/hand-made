type Handler = (...args: any[]) => void

export class EventEmitter {
  eventHandlers: Map<string, Handler[]>

  constructor() {
    this.eventHandlers = new Map()
  }

  on = (event: string, handler: Handler) => {
    const prevHandlers = this.eventHandlers.get(event)
    if (prevHandlers) {
      prevHandlers!.push(handler)
      return
    }
    this.eventHandlers.set(event, [handler])
  }

  off = (event: string, handler: Handler) => {
    const prevHandlers = this.eventHandlers.get(event)
    if (prevHandlers) {
      const targetIndex = prevHandlers.findIndex(
        (registered) => registered === handler
      )
      if (targetIndex >= 0) {
        prevHandlers.splice(targetIndex, 1)
        return
      }
    }
    throw new Error('handler has not be registered')
  }

  emit = (event: string, ...args: any[]) => {
    const handlers = this.eventHandlers.get(event)
    handlers?.forEach((handler) => handler(...args))
  }
}
