import { throttle } from '../src/throttle'
import { describe, beforeEach, it, expect, vi } from 'vitest'
const jestMockFn = vi.fn()

describe('throttle function', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    jestMockFn.mockClear()
  })

  it('Should execute the function immediately', () => {
    const throttledFn = throttle(jestMockFn, { wait: 500 })
    throttledFn()
    expect(jestMockFn).toHaveBeenCalledTimes(1)
  })

  it('Should not execute the function again if called before the wait time', () => {
    const throttledFn = throttle(jestMockFn, { wait: 500 })
    throttledFn()
    throttledFn()
    expect(jestMockFn).toHaveBeenCalledTimes(1)
  })

  it('Should execute the function again after the wait time has passed', () => {
    const throttledFn = throttle(jestMockFn, { wait: 500 })
    throttledFn()
    vi.advanceTimersByTime(500)
    throttledFn()
    expect(jestMockFn).toHaveBeenCalledTimes(2)
  })

  it('Should execute the function once for each wait period, even if called multiple times', () => {
    const throttledFn = throttle(jestMockFn, { wait: 500 })
    for (let i = 0; i < 10; i++) {
      throttledFn()
    }
    expect(jestMockFn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(500)
    expect(jestMockFn).toHaveBeenCalledTimes(1)
    throttledFn()
    expect(jestMockFn).toHaveBeenCalledTimes(2)
  })
})
