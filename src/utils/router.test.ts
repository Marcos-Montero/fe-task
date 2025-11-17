import { describe, it, expect } from 'vitest'
import { validateParams, buildUrl } from './router'
import { PathParams } from '../types/global'

describe('validateParams', () => {
  it('should return true for valid params matching path', () => {
    const path = '/user/:id'
    const params: PathParams = { id: '123' }
    expect(validateParams(path, params)).toBe(true)
  })

  it('should return true for multiple valid params', () => {
    const path = '/user/:userId/post/:postId'
    const params: PathParams = { userId: '123', postId: '456' }
    expect(validateParams(path, params)).toBe(true)
  })

  it('should return false when params is not an object', () => {
    const path = '/user/:id'
    expect(validateParams(path, null)).toBe(false)
    expect(validateParams(path, undefined)).toBe(false)
    expect(validateParams(path, 'string')).toBe(false)
    expect(validateParams(path, 123)).toBe(false)
  })

  it('should return false when required param is missing', () => {
    const path = '/user/:id'
    const params: PathParams = {}
    expect(validateParams(path, params)).toBe(false)
  })

  it('should return false when one of multiple required params is missing', () => {
    const path = '/user/:userId/post/:postId'
    const params: PathParams = { userId: '123' }
    expect(validateParams(path, params)).toBe(false)
  })

  it('should return true when path has no params', () => {
    const path = '/user'
    const params: PathParams = {}
    expect(validateParams(path, params)).toBe(true)
  })

  it('should return true when extra params are provided', () => {
    const path = '/user/:id'
    const params: PathParams = { id: '123', extra: 'value' }
    expect(validateParams(path, params)).toBe(true)
  })
})

describe('buildUrl', () => {
  it('should replace single param in path', () => {
    const path = '/user/:id'
    const params: PathParams = { id: '123' }
    expect(buildUrl(path, params)).toBe('/user/123')
  })

  it('should replace multiple params in path', () => {
    const path = '/user/:userId/post/:postId'
    const params: PathParams = { userId: '123', postId: '456' }
    expect(buildUrl(path, params)).toBe('/user/123/post/456')
  })

  it('should handle path with no params', () => {
    const path = '/user'
    const params: PathParams = {}
    expect(buildUrl(path, params)).toBe('/user')
  })

  it('should handle empty string param values', () => {
    const path = '/user/:id'
    const params: PathParams = { id: '' }
    expect(buildUrl(path, params)).toBe('/user/')
  })

  it('should handle special characters in param values', () => {
    const path = '/user/:id'
    const params: PathParams = { id: 'test-123_abc' }
    expect(buildUrl(path, params)).toBe('/user/test-123_abc')
  })

  it('should replace params in correct order', () => {
    const path = '/:a/:b/:c'
    const params: PathParams = { a: '1', b: '2', c: '3' }
    expect(buildUrl(path, params)).toBe('/1/2/3')
  })

  it('should handle params that appear multiple times', () => {
    const path = '/user/:id/profile/:id'
    const params: PathParams = { id: '123' }
    const result = buildUrl(path, params)
    expect(result).toBe('/user/123/profile/123')
  })
})

