import { describe, test, expect } from 'vitest'
import { sum } from '../src/asyncAdd'

describe('sum function tests', () => {
  test('Should correctly sum an array of positive numbers', async () => {
    const input = [1, 2, 3, 4, 5]
    const expectedOutput = 15
    const result = await sum(input)
    expect(result).toBe(expectedOutput)
  })

  test('Should correctly sum an array of negative numbers', async () => {
    const input = [-1, -2, -3, -4, -5]
    const expectedOutput = -15
    const result = await sum(input)
    expect(result).toBe(expectedOutput)
  })

  test('Should correctly sum an array of mixed positive and negative numbers', async () => {
    const input = [-1, 2, -3, 4, -5]
    const expectedOutput = -3
    const result = await sum(input)
    expect(result).toBe(expectedOutput)
  })

  test('Should return 0 for an empty array', async () => {
    const input = []
    const expectedOutput = 0
    const result = await sum(input)
    expect(result).toBe(expectedOutput)
  })

  test('Should return the single element for a single element array', async () => {
    const input = [7]
    const expectedOutput = 7
    const result = await sum(input)
    expect(result).toBe(expectedOutput)
  })

  test('Should return 0 for an array of zeros', async () => {
    const input = [0, 0, 0, 0, 0]
    const expectedOutput = 0
    const result = await sum(input)
    expect(result).toBe(expectedOutput)
  })
})
