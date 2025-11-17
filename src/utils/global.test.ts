import { describe, it, expect } from 'vitest'
import { resultOrError, ResultOrErrorResponse } from './global'

describe('resultOrError', () => {
  it('should return result and null error for successful promise', async () => {
    const promise = Promise.resolve('success')
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<string>
    
    expect(result).toBe('success')
    expect(error).toBe(null)
  })

  it('should return null result and error for rejected promise', async () => {
    const errorMessage = 'Something went wrong'
    const promise = Promise.reject(new Error(errorMessage))
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<string>
    
    expect(result).toBe(null)
    expect(error).toBeInstanceOf(Error)
    expect((error as Error).message).toBe(errorMessage)
  })

  it('should handle promise that resolves to null', async () => {
    const promise = Promise.resolve(null)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<null>
    
    expect(result).toBe(null)
    expect(error).toBe(null)
  })

  it('should handle promise that resolves to undefined', async () => {
    const promise = Promise.resolve(undefined)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<undefined>
    
    expect(result).toBe(undefined)
    expect(error).toBe(null)
  })

  it('should handle promise that resolves to object', async () => {
    const data = { id: 1, name: 'Test' }
    const promise = Promise.resolve(data)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<typeof data>
    
    expect(result).toEqual(data)
    expect(error).toBe(null)
  })

  it('should handle promise that resolves to array', async () => {
    const data = [1, 2, 3]
    const promise = Promise.resolve(data)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<number[]>
    
    expect(result).toEqual(data)
    expect(error).toBe(null)
  })

  it('should handle promise that resolves to number', async () => {
    const promise = Promise.resolve(42)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<number>
    
    expect(result).toBe(42)
    expect(error).toBe(null)
  })

  it('should handle promise that resolves to boolean', async () => {
    const promise = Promise.resolve(true)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<boolean>
    
    expect(result).toBe(true)
    expect(error).toBe(null)
  })

  it('should preserve error type when promise rejects', async () => {
    const customError = new TypeError('Custom error')
    const promise = Promise.reject(customError)
    const [result, error] = (await resultOrError(promise)) as ResultOrErrorResponse<string>
    
    expect(result).toBe(null)
    expect(error).toBeInstanceOf(TypeError)
    expect(error).toBe(customError)
  })
})

