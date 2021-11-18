import { Grid } from '@mui/material'
import BookingCard from './Card'

export default function List({ bookings }) {

  return (
    <section>
      <Grid container spacing={2} justifyContent="center">
        { bookings.map((booking, index) => (
          <Grid key={index} item xs={10} sm={4}>
            <BookingCard {...booking} />
          </Grid>
        )) }
      </Grid>
    </section>
  )
}