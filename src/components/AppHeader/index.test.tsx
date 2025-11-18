import { screen, fireEvent, act } from '@testing-library/react'
import { render } from '../../test/utils'
import AppHeader from './index'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { User } from '../../api/services/User/store'

describe('AppHeader', () => {
  const mockUser: User = {
    eMail: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
  }

  it('renders correctly with user and page title', () => {
    render(<AppHeader user={mockUser} pageTitle="Test Page" />)
    
    expect(screen.getByText(/SUPPLIER OS APPLICATION/i)).toBeInTheDocument()
    expect(screen.getByText('TEST PAGE')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('renders countdown timer', () => {
    vi.useFakeTimers()
    render(<AppHeader user={mockUser} pageTitle="Test Page" />)
    
    expect(screen.getByText('60:00')).toBeInTheDocument()
    
    act(() => {
      vi.advanceTimersByTime(1000)
    })
    
    expect(screen.getByText('59:59')).toBeInTheDocument()
    
    vi.useRealTimers()
  })

  it('opens language menu and changes language', async () => {
    render(<AppHeader user={mockUser} pageTitle="Test Page" />)
    
    const languageButton = screen.getByText('EN')
    fireEvent.click(languageButton)
    
    const deOption = screen.getByText('DE')
    expect(deOption).toBeInTheDocument()
    
    fireEvent.click(deOption)
    
    // Since we are mocking i18n or using the real one, we expect the button to update or the function to be called.
    // In this setup, we might need to check if the displayed language changed.
    // However, the component uses internal state initialized from i18n, and updates it on languageChanged event.
    // If our test utils setup i18n correctly, this should work.
    
    // Wait for state update if necessary, but fireEvent is synchronous usually.
    // Let's check if the button text changed to DE
    expect(await screen.findByText('DE')).toBeInTheDocument()
  })
})
