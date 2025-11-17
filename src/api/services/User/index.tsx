import { createContext, type PropsWithChildren, useContext } from "react"

import Store from "./store"

/* 
CONTEXT / PROVIDER INIT
*/

const UserStoreContext = createContext<Store | null>(null)

export const StoreProvider = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <UserStoreContext.Provider value={new Store()}>
      {children}
    </UserStoreContext.Provider>
  )
}

/* 
HOOK DEFINITION
*/

export const useUserStore = () => useContext(UserStoreContext)
