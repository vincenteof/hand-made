import { expect, test, describe, beforeEach, vi } from 'vitest'
import { EventEmitter } from '../src/EventEmitter'

describe('EventEmitter', () => {
  let emitter: EventEmitter

  beforeEach(() => {
    emitter = new EventEmitter()
  })

  test('should call a listener when an event is emitted', () => {
    const handler = vi.fn()
    emitter.on('testEvent', handler)

    emitter.emit('testEvent')

    expect(handler).toHaveBeenCalled()
  })

  test('should pass the right arguments to the listener', () => {
    const handler = vi.fn()
    emitter.on('testEvent', handler)

    emitter.emit('testEvent', 'arg1', 'arg2')

    expect(handler).toHaveBeenCalledWith('arg1', 'arg2')
  })

  test('should not call a listener after it has been removed', () => {
    const handler = vi.fn()
    emitter.on('testEvent', handler)
    emitter.off('testEvent', handler)

    emitter.emit('testEvent')

    expect(handler).not.toHaveBeenCalled()
  })

  test('should throw an error if trying to remove a handler that was not registered', () => {
    const handler = vi.fn()

    expect(() => emitter.off('testEvent', handler)).toThrow(
      'handler has not be registered'
    )
  })

  test('should not interfere with other events when a listener is removed', () => {
    const handler1 = vi.fn()
    const handler2 = vi.fn()
    emitter.on('testEvent1', handler1)
    emitter.on('testEvent2', handler2)

    emitter.off('testEvent1', handler1)
    emitter.emit('testEvent2')

    expect(handler1).not.toHaveBeenCalled()
    expect(handler2).toHaveBeenCalled()
  })
})
