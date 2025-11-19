import { screen } from '@testing-library/react'
import { render } from '../../test/utils'
import AccessDenied from './index'
import { describe, it, expect } from 'vitest'

describe('AccessDenied', () => {
  it('renders correctly', () => {
    render(<AccessDenied />)
    
    // Based on en.json: "accessDenied.title": "Access Denied"
    expect(screen.getByText('Access Denied')).toBeInTheDocument()
    // "accessDenied.message": "You are not authorized to access this application."
    expect(screen.getByText('You are not authorized to access this application.')).toBeInTheDocument()
  })
})
