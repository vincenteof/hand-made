import { PromiseScheduler } from '../src/PromiseScheduler'
import { describe, it, expect } from 'vitest'

describe('PromiseScheduler', () => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  it('should limit concurrent tasks', async () => {
    const scheduler = PromiseScheduler(2)
    let active = 0
    const task = () => {
      active++
      expect(active).toBeLessThanOrEqual(2)
      return delay(100).then(() => active--)
    }
    const promises = Array.from({ length: 10 }, () => scheduler.add(task))
    await Promise.all(promises)
  })

  it('should resolve tasks in order', async () => {
    const scheduler = PromiseScheduler(2)
    let i = 0
    const task = () => delay(100).then(() => i++)
    const promises = Array.from({ length: 10 }, () => scheduler.add(task))
    const results = await Promise.all(promises)
    expect(results).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('should handle rejections', async () => {
    const scheduler = PromiseScheduler(2)
    const task = () => Promise.reject(new Error('Test error'))
    await expect(scheduler.add(task)).rejects.toThrow('Test error')
  })

  it('should handle tasks with different delays', async () => {
    const scheduler = PromiseScheduler(2)
    // FIXME console better?
    let finalResult = ''
    const task = (ms: number, result: string) => () => delay(ms).then(() => finalResult += result)
    const promises = [
        scheduler.add(task(1000, '1')),
        scheduler.add(task(500, '2')),
        scheduler.add(task(300, '3')),
        scheduler.add(task(400, '4'))
    ]
    await Promise.all(promises)
    expect(finalResult).toBe('2314')
  })
})
