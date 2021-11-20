import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import BookingCard from './Card'
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export default function List({ bookings }) {
  const {
    eventsList: [events],
    filteredEvents: [filtered, setFiltered],
    page: [currentPage, setCurrentPage],
    pageSize: [currPageSize],
    searchResults: [searchRes],
    finalData: [finalDataDisplayed, setFinalDataDisplayed]
  } = useContext(GlobalContext)
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    if (searchRes?.length) {

      if (searchRes?.length > currPageSize) {
        setFinalDataDisplayed(searchRes.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
      } else {
        setFinalDataDisplayed(searchRes)
      }

    } else if (events?.length > currPageSize) {
      setFinalDataDisplayed(events.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
    }
  }, [currPageSize, currentPage, events, searchRes, setFinalDataDisplayed])

  useEffect(() => {
    if (searchRes) {
      setPageCount(Math.ceil(searchRes?.length / currPageSize) || 0)
    } else {
      setPageCount(Math.ceil(events?.length / currPageSize) || 0)
    }
  }, [searchRes, currPageSize, events])

  return (
    <section>
      <Grid container spacing={2} justifyContent="center" mb={2}>
        { bookings && bookings.length ? bookings.map((booking, index) => (
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