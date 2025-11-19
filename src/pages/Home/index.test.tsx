import { screen, fireEvent } from '@testing-library/react'
import { render } from '../../test/utils'
import Home from './index'
import { describe, it, expect, vi } from 'vitest'

describe('Home', () => {
  it('renders correctly', () => {
    render(<Home />)
    
    // "home.welcome": "Welcome!"
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
    // "home.intro": "This is a demo application..."
    expect(screen.getByText(/This is a demo application/)).toBeInTheDocument()
  })

  it('renders issues list', () => {
    render(<Home />)
    
    // "issues.0.title": "Console error: Warning: Each child in a list should have a unique &quot;key&quot; prop."
    expect(screen.getByText(/Console error/)).toBeInTheDocument()
  })

  it('opens solution panel when "see solution" is clicked', () => {
    render(<Home />)
    
    const seeSolutionButtons = screen.getAllByText('✅ see solution →')
    fireEvent.click(seeSolutionButtons[0])
    
    // Solution panel should open
    // "solutions.0.title": "Solution: Missing key prop in list"
    expect(screen.getByText('Solution: Missing key prop in list')).toBeInTheDocument()
  })
})
