import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import BookingCard from './Card'
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function BookingsList({ bookings }) {
  const {
    eventsList: [events],
    filteredEvents: [filtered],
    page: [currentPage, setCurrentPage],
    pageSize: [currPageSize],
    searchResults: [searchRes],
    finalData: [finalDataDisplayed, setFinalDataDisplayed],
    filterActive: [isFilterActive],
    filteredByDate: [dateFilteredData],
    filterDateRange: [dateRange]
  } = useContext(GlobalContext)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    if (searchRes?.length) {

      if (searchRes?.length > currPageSize) {
        setFinalDataDisplayed(searchRes.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
      } else {
        setFinalDataDisplayed(searchRes)
      }

    } else if (!dateRange.includes(null)) {

      if (dateFilteredData?.length > currPageSize) {
        setFinalDataDisplayed(dateFilteredData.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
      } else {
        setFinalDataDisplayed(dateFilteredData)
      }

    } else if (isFilterActive && filtered) {
      
      if (filtered?.length >= 1) {
        if (filtered?.length > currPageSize) {
          setFinalDataDisplayed(filtered.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
        } else {
          setFinalDataDisplayed(filtered)
        }
      } else {
        setFinalDataDisplayed(null)
      }

    } else if (events?.length > currPageSize) {
      setFinalDataDisplayed(events.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
    }
  }, [currPageSize, currentPage, events, searchRes, setFinalDataDisplayed, filtered, isFilterActive, dateRange, dateFilteredData])

  useEffect(() => {
    if (searchRes) {
      setPageCount(Math.ceil(searchRes?.length / currPageSize) || 0)
    } else if (dateFilteredData) {
      setPageCount(Math.ceil(dateFilteredData?.length / currPageSize) || 0)
    } else if (filtered) {
      setPageCount(Math.ceil(filtered?.length / currPageSize) || 0)
    } else {
      setPageCount(Math.ceil(events?.length / currPageSize) || 0)
    }
  }, [searchRes, currPageSize, events, filtered, dateFilteredData])

  return (
    <section>
      <Grid container spacing={2} justifyContent="center" mb={2}>
        { bookings && bookings?.length ? bookings?.map((booking, index) => (
            <Grid key={index} item xs={10} sm={4}>
              <BookingCard {...booking} />
            </Grid>
          )) : (
          <Grid item xs={10}>
            <Typography variant="h4" sx={{ marginTop: 10 }}>
              No bookings found!
            </Typography>
          </Grid>
        ) }
      </Grid>
      {events?.length > currPageSize && (
        <Pagination sx={{ '& ul': { justifyContent: 'center' } }} onChange={(e, page) => setCurrentPage(page)} count={pageCount} page={currentPage} color="primary" />
      )}
    </section>
  )
}