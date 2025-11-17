import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import useMatchedRoute from './useMatchedRoute'
import { describe, it, expect } from 'vitest'
import { TRoute } from '../types/global'

const TestComponent = ({ routes, options }: { routes: TRoute[], options?: any }) => {
  const { MatchedElement } = useMatchedRoute(routes, undefined, options)
  return MatchedElement
}

describe('useMatchedRoute', () => {
  const routes: TRoute[] = [
    {
      path: '/home',
      Component: () => <div>Home Component</div>,
      key: 'home'
    },
    {
      path: '/about',
      Component: () => <div>About Component</div>,
      key: 'about'
    }
  ]

  it('renders matched route component', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <TestComponent routes={routes} />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Home Component')).toBeInTheDocument()
  })

  it('renders nothing if no route matches and no fallback', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <TestComponent routes={routes} />
      </MemoryRouter>
    )
    
    expect(screen.getByText('not found')).toBeInTheDocument() // Default not found component renders "not found"
  })

  it('renders custom not found component', () => {
    const NotFound = () => <div>Custom Not Found</div>
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <TestComponent routes={routes} options={{ notFoundComponent: NotFound }} />
      </MemoryRouter>
    )
    
    expect(screen.getByText('Custom Not Found')).toBeInTheDocument()
  })
})
