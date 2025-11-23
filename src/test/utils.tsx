import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { osapiens } from '../themes'
import i18n from '../i18n/i18n'

type AllTheProvidersProps = {
  children: React.ReactNode
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return (
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={osapiens.light}>
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </MemoryRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

