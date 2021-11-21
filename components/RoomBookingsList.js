import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import BookingCard from './Card'
import { useEffect, useState } from 'react';

// This function is a mirror of BookingsList but without the tedious data manipulation since I'm expecting a single source of data here
export default function RoomBookingsList({ bookings }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [dataDisplayed, setDataDisplayed] = useState(null)
  const currPageSize = 6;

  useEffect(() => {
    setPageCount(Math.ceil(bookings?.length / currPageSize) || 0)
  }, [bookings])

  useEffect(() => {
    if (bookings?.length > currPageSize) {
      setDataDisplayed(bookings.slice((currentPage - 1) * currPageSize, (currPageSize * currentPage)))
    } else {
      setDataDisplayed(bookings)
    }
  }, [bookings, currentPage])

  return (
    <section>
      <Grid container spacing={2} justifyContent="center" mb={2}>
        { dataDisplayed && dataDisplayed?.length ? dataDisplayed?.map((booking, index) => (
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
      {bookings?.length > currPageSize && (
        <Pagination sx={{ '& ul': { justifyContent: 'center' } }} onChange={(e, page) => setCurrentPage(page)} count={pageCount} page={currentPage} color="primary" />
      )}
    </section>
  )
}