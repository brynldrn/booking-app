import { useState, createContext } from 'react'

export const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false)
  const store = {
    modal: [modalState, setModalState],
  }

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
}
