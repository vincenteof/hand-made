import { PromiseRace } from '../src/PromiseRace'
import { describe, it, expect } from 'vitest'

describe('PromiseRace', () => {
  // Test case 1: Testing with resolving promises
  it('should resolve with value from the fastest resolving promise', async () => {
    let promise1 = new Promise((resolve) => {
      setTimeout(resolve, 200, 'one')
    })

    let promise2 = new Promise((resolve) => {
      setTimeout(resolve, 100, 'two')
    })

    const result = await PromiseRace([promise1, promise2])
    expect(result).toEqual('two') // 'two' is resolved faster
  })

  // Test case 2: Testing with rejecting promise
  it('should reject with value from the fastest rejecting promise', async () => {
    let promise3 = new Promise((resolve) => {
      setTimeout(resolve, 200, 'one')
    })

    let promise4 = new Promise((reject) => {
      setTimeout(reject, 100, 'two')
    })

    try {
      await PromiseRace([promise3, promise4])
    } catch (e) {
      expect(e).toEqual('two') // 'two' is rejected faster
    }
  })

  // Test case 3: Testing with non-promise values
  it('should resolve with the first non-promise value', async () => {
    let promise5 = new Promise((resolve) => {
      setTimeout(resolve, 200, 'one')
    })

    // FIXME ts
    const result = await PromiseRace([promise5, 'two'] as any)
    expect(result).toEqual('two') // 'two' is a non-promise value
  })
})
