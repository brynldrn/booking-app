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
  const [finalDataDisplayed, setFinalDataDisplayed] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [roomFilters, setRoomFilters] = useState({
    'new-york': false,
    'manila': false,
    'new-zealand': false,
    'japan': false
  })
  const [isFilterActive, setIsFilterActive] = useState(false)
  const [dateFilteredData, setDateFilteredData] = useState(null)
  const [dateRange, setDateRange] = useState([null, null]);

  const store = {
    modal: [modalState, setModalState],
    deleteModal: [deleteModalState, setDeleteModalState],
    event: [activeEvent, setActiveEvent],
    eventsList: [events, setEvents],
    filteredEvents: [filtered, setFiltered],
    searchResults: [searchRes, setSearchRes],
    page: [currentPage, setCurrentPage],
    pageSize: [currentPageSize, setCurrentPageSize],
    finalData: [finalDataDisplayed, setFinalDataDisplayed],
    drawer: [drawerOpen, setDrawerOpen],
    room: [roomFilters, setRoomFilters],
    filterActive: [isFilterActive, setIsFilterActive],
    filteredByDate: [dateFilteredData, setDateFilteredData],
    filterDateRange: [dateRange, setDateRange]
  }

  return <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
}
