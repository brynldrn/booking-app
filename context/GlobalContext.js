import { useState, createContext } from 'react'

export const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false)
  const [deleteModalState, setDeleteModalState] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)

  const store = {
    modal: [modalState, setModalState],
    deleteModal: [deleteModalState, setDeleteModalState],
    event: [activeEvent, setActiveEvent]
  }

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
}
