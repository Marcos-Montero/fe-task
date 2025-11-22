import { screen, fireEvent, waitFor } from '@testing-library/react'
import { render } from '../../test/utils'
import { SolutionPanel } from './index'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('SolutionPanel', () => {
  const onCloseMock = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  it('does not render when issueIndex is null', () => {
    render(<SolutionPanel open={true} onClose={onCloseMock} issueIndex={null} />)
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
  })

  it('renders correctly when open and issueIndex is provided', () => {
    render(<SolutionPanel open={true} onClose={onCloseMock} issueIndex={0} />)
    
    expect(screen.getByText('Solution: Missing key prop in list')).toBeInTheDocument()
    expect(screen.getByText('Related Files')).toBeInTheDocument()
    expect(screen.getByText('src/pages/Home/index.tsx:25')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<SolutionPanel open={true} onClose={onCloseMock} issueIndex={0} />)
    
    // The close button is the first button in the drawer header
    const closeButton = screen.getAllByRole('button')[0]
    
    fireEvent.click(closeButton)
    expect(onCloseMock).toHaveBeenCalled()
  })

  it('copies file path to clipboard when clicked', async () => {
    render(<SolutionPanel open={true} onClose={onCloseMock} issueIndex={0} />)
    
    const fileLink = screen.getByText('src/pages/Home/index.tsx:25')
    fireEvent.click(fileLink)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('src/pages/Home/index.tsx:25')
  })
})
