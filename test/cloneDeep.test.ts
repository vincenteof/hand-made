import { describe, test, expect } from 'vitest'
import { cloneDeep } from '../src/cloneDeep'

describe('Testing cloneDeep function', () => {
  test('should clone a simple object', () => {
    const obj = { a: 1, b: 2 }
    const cloned = cloneDeep(obj)

    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
  })

  test('should clone a nested object', () => {
    const obj = { a: 1, b: { c: 3 } }
    const cloned = cloneDeep(obj)

    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).not.toBe(obj.b)
  })

  test('should clone an array', () => {
    const arr = [1, 2, [3, 4]]
    const cloned = cloneDeep(arr)

    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[2]).not.toBe(arr[2])
  })

  test('should clone an object with circular reference', () => {
    const obj = { a: 1 }
    ;(obj as any).self = obj

    const cloned = cloneDeep(obj)

    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect((cloned as any).self).toBe(cloned)
  })
})
