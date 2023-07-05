import { debounce } from '../src/debounce'
import { describe, beforeEach, it, expect, vi } from 'vitest'
const jestMockFn = vi.fn()

describe('debounce function', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    jestMockFn.mockClear()
  })

  it('Should execute the function once', () => {
    const debouncedFn = debounce(jestMockFn, { timeout: 500 })
    debouncedFn()
    vi.runAllTimers()
    expect(jestMockFn).toHaveBeenCalledTimes(1)
  })

  it('Should execute the function only once if called multiple times in quick succession', () => {
    const debouncedFn = debounce(jestMockFn, { timeout: 500 })
    debouncedFn()
    debouncedFn()
    debouncedFn()
    vi.runAllTimers()
    expect(jestMockFn).toHaveBeenCalledTimes(1)
  })

  it('Should delay the execution of the function', () => {
    const debouncedFn = debounce(jestMockFn, { timeout: 500 })
    debouncedFn()
    expect(jestMockFn).not.toHaveBeenCalled()
    vi.runAllTimers()
    expect(jestMockFn).toHaveBeenCalled()
  })

  it('Should execute the function after the specified wait time', () => {
    const debouncedFn = debounce(jestMockFn, { timeout: 500 })
    debouncedFn()
    vi.advanceTimersByTime(499)
    expect(jestMockFn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(jestMockFn).toHaveBeenCalled()
  })

  it('Should execute the function once after the wait time, even if called multiple times', () => {
    const debouncedFn = debounce(jestMockFn, { timeout: 500 })
    for (let i = 0; i < 10; i++) {
      debouncedFn()
    }
    vi.advanceTimersByTime(499)
    expect(jestMockFn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(jestMockFn).toHaveBeenCalledTimes(1)
  })
})
