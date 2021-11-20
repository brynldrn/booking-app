import { useState, createContext } from 'react'

export const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {
  const [modalState, setModalState] = useState(false)
  const [deleteModalState, setDeleteModalState] = useState(false)
  const [activeEvent, setActiveEvent] = useState(null)
  const [events, setEvents] = useState(null)
  const [filtered, setFiltered] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageSize, setCurrentPageSize] = useState(6)
  const [searchRes, setSearchRes] = useState(null)

  const store = {
    modal: [modalState, setModalState],
    deleteModal: [deleteModalState, setDeleteModalState],
    event: [activeEvent, setActiveEvent],
    eventsList: [events, setEvents],
    filteredEvents: [filtered, setFiltered],
    searchResults: [searchRes, setSearchRes],
    page: [currentPage, setCurrentPage],
    pageSize: [currentPageSize, setCurrentPageSize]
  }

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
}
