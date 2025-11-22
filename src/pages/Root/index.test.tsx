import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import Root from './index'
import { describe, it, expect, vi } from 'vitest'

// Mock dependencies
vi.mock('../../api/services/User', () => ({
  useUserStore: vi.fn(() => ({
    user: { firstName: 'Test', lastName: 'User', eMail: 'test@example.com' }
  }))
}))

vi.mock('../../hooks/useMatchedRoute', () => ({
  default: vi.fn(() => ({
    route: { path: '/home' },
    MatchedElement: <div data-testid="matched-element">Matched Element</div>
  }))
}))

vi.mock('../../components/AppHeader', async () => {
  const React = await import('react')
  return {
    default: React.forwardRef((props: any, ref: any) => (
      <div ref={ref} {...props} data-testid="app-header">
        App Header
      </div>
    ))
  }
})

vi.mock('../AccessDenied', () => ({
  default: () => <div data-testid="access-denied">Access Denied</div>
}))

describe('Root', () => {
  it('renders correctly', () => {
    render(<Root />)
    
    expect(screen.getByTestId('app-header')).toBeInTheDocument()
    expect(screen.getByTestId('matched-element')).toBeInTheDocument()
  })
})
