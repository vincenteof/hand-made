import { PromiseAll } from '../src/PromiseAll'
import { describe, it, expect } from 'vitest'

describe('PromiseAll', () => {
  it('should resolve with an array of resolved values when all promises resolve', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.resolve('a'),
      Promise.resolve(true),
    ]
    const result = await PromiseAll(promises)
    expect(result).toEqual([1, 'a', true])
  })

  it('should reject if any of the promises reject', async () => {
    const promises = [
      Promise.resolve(1),
      Promise.reject('Error'),
      Promise.resolve(true),
    ]
    await expect(PromiseAll(promises)).rejects.toEqual('Error')
  })

  it('should handle a mix of promises and non-promises', async () => {
    const mixed = [Promise.resolve(1), 'a', true]
    // FIXME ts
    const result = await PromiseAll(mixed as any)
    expect(result).toEqual([1, 'a', true])
  })

  it('should handle an empty array', async () => {
    const result = await PromiseAll([])
    expect(result).toEqual([])
  })

  it('should maintain the original order of the promises', async () => {
    const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'first'))
    const promise2 = Promise.resolve('second')
    const result = await PromiseAll([promise1, promise2])
    expect(result).toEqual(['first', 'second'])
  })
})
