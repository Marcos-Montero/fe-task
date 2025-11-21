import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import AvatarMenu from './index'
import { describe, it, expect, vi } from 'vitest'
import { User } from '../../api/services/User/store'

describe('AvatarMenu', () => {
  const mockUser: User = {
    eMail: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
  }

  it('renders correctly with user avatar', () => {
    render(<AvatarMenu user={mockUser} />)
    
    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('opens menu on click', () => {
    render(<AvatarMenu user={mockUser} />)
    
    const avatar = screen.getByText('TU')
    fireEvent.click(avatar)
    
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('Edit Profile')).toBeInTheDocument()
    expect(screen.getByText('Edit Organization')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('calls logout on button click', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<AvatarMenu user={mockUser} />)
    
    const avatar = screen.getByText('TU')
    fireEvent.click(avatar)
    
    const logoutButton = screen.getByText('Logout')
    fireEvent.click(logoutButton)
    
    expect(consoleSpy).toHaveBeenCalledWith('logout')
    consoleSpy.mockRestore()
  })
})
