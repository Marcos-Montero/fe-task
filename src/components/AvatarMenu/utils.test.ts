import { describe, it, expect } from 'vitest'
import { getRGBByName } from './utils'

describe('getRGBByName', () => {
  it('should generate RGB color from name and lastName', () => {
    const result = getRGBByName({ name: 'John', lastName: 'Doe' })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should use default values when name is missing', () => {
    const result = getRGBByName({ lastName: 'Doe' })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should use default values when lastName is missing', () => {
    const result = getRGBByName({ name: 'John' })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should use default values when both are missing', () => {
    const result = getRGBByName({})
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should generate consistent colors for same input', () => {
    const result1 = getRGBByName({ name: 'Alice', lastName: 'Smith' })
    const result2 = getRGBByName({ name: 'Alice', lastName: 'Smith' })
    expect(result1).toBe(result2)
  })

  it('should generate different colors for different inputs', () => {
    const result1 = getRGBByName({ name: 'Alice', lastName: 'Smith' })
    const result2 = getRGBByName({ name: 'Bob', lastName: 'Jones' })
    expect(result1).not.toBe(result2)
  })

  it('should handle empty strings', () => {
    const result = getRGBByName({ name: '', lastName: '' })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should handle single character names', () => {
    const result = getRGBByName({ name: 'A', lastName: 'B' })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should handle special characters in names', () => {
    const result = getRGBByName({ name: 'José', lastName: 'García' })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })

  it('should handle very long names', () => {
    const result = getRGBByName({ 
      name: 'VeryLongFirstName', 
      lastName: 'VeryLongLastName' 
    })
    expect(result).toMatch(/^rgb\(\d+,\d+,\d+\)$/)
  })
})

