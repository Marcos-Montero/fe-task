import { type PropsWithChildren, Suspense, useEffect } from "react"
import { SnackbarProvider } from "notistack"

import { HashRouter } from "react-router-dom"

import { CssBaseline } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles"
import StylesProvider from "@mui/styles/StylesProvider"

import RootComponent from "./pages/Root/index"
import { osapiens } from "./themes"

import "./i18n"
import {
  StoreProvider as UserStoreProvider,
  useUserStore,
} from "./api/services/User"

const theme = osapiens.light

const UserDataLoader = ({ children }: PropsWithChildren) => {
  const userStore = useUserStore()

  useEffect(() => {
    if (userStore && !userStore.user) {
      userStore.getOwnUser()
    }
  }, [userStore])

  return <>{children}</>
}

const CombinedStoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <UserStoreProvider>
      <UserDataLoader>{children}</UserDataLoader>
    </UserStoreProvider>
  )
}

const AppContainer = () => {
  return (
    <>
      <CssBaseline />
      {/* Kickstart a simple scoped CSS baseline to build upon. */}
      {/* Required to override Material-UI's styles via CSS modules. */}
      <Suspense fallback={<div>loading...</div>}>
        <CombinedStoreProvider>
          <SnackbarProvider maxSnack={3}>
            <StylesProvider injectFirst>
              <ThemeProvider theme={theme}>
                <HashRouter>
                  <RootComponent />
                </HashRouter>
              </ThemeProvider>
            </StylesProvider>
          </SnackbarProvider>
        </CombinedStoreProvider>
      </Suspense>
    </>
  )
}

export default AppContainer
