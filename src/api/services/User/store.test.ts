import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import UserStore from './store'
import { ActionResultStatus } from '../../../types/global'

describe('UserStore', () => {
  let store: UserStore

  beforeEach(() => {
    store = new UserStore()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('constructor', () => {
    it('should initialize with null user', () => {
      expect(store.user).toBe(null)
    })
  })

  describe('getOwnUser', () => {
    it('should successfully fetch user and update state', async () => {
      const promise = store.getOwnUser()
      
      await vi.runAllTimersAsync()
      
      const result = await promise

      expect(result.status).toBe(ActionResultStatus.SUCCESS)
      if (result.status === ActionResultStatus.SUCCESS) {
        expect(result.result).toEqual({
          firstName: 'Aria',
          lastName: 'Test',
          eMail: 'linda.bolt@osapiens.com',
        })
        expect(store.user).toEqual({
          firstName: 'Aria',
          lastName: 'Test',
          eMail: 'linda.bolt@osapiens.com',
        })
      }
    })

    it('should update user state after successful fetch', async () => {
      expect(store.user).toBe(null)
      
      const promise = store.getOwnUser()
      await vi.runAllTimersAsync()
      await promise

      expect(store.user).not.toBe(null)
      expect(store.user?.firstName).toBe('Aria')
      expect(store.user?.lastName).toBe('Test')
      expect(store.user?.eMail).toBe('linda.bolt@osapiens.com')
    })
  })
})

