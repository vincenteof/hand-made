import { expect, test, describe } from 'vitest'
import { reduce } from '../src/reduce'

describe('reduce', () => {
  test('Sum of Array Elements', () => {
    expect(reduce([1, 2, 3, 4, 5], (acc, cur) => acc + cur, 0)).toBe(15)
  })

  test('Product of Array Elements', () => {
    expect(reduce([1, 2, 3, 4, 5], (acc, cur) => acc * cur, 1)).toBe(120)
  })

  test('Counting Occurrences', () => {
    expect(
      reduce(
        ['apple', 'banana', 'apple', 'orange', 'banana', 'banana'],
        (obj, word) => {
          obj[word] = (obj[word] || 0) + 1
          return obj
        },
        {}
      )
    ).toEqual({ apple: 2, banana: 3, orange: 1 })
  })

  test('Flattening an Array of Arrays', () => {
    expect(
      reduce(
        [[1, 2, 3], [4, 5], [6]],
        (a: number[], b: number[]) => a.concat(b),
        []
      )
    ).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('Edge Case: Empty Array', () => {
    expect(reduce([], (a, b) => a + b, 0)).toBe(0)
  })

  test('Edge Case: Single Element Array', () => {
    expect(reduce([7], (a, b) => a * b, 1)).toBe(7)
  })
})
