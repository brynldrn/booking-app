import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import BookingCard from './Card'

export default function List({ bookings }) {

  return (
    <section>
      <Grid container spacing={2} justifyContent="center">
        { bookings && bookings.length ? bookings.map((booking, index) => (
          <Grid key={index} item xs={10} sm={4}>
            <BookingCard {...booking} />
          </Grid>
        )) : (
        <Grid item xs={10}>
          <Typography variant="h4" sx={{ marginTop: 10 }}>
            No bookings yet!
          </Typography>
        </Grid>
      ) }
      </Grid>
    </section>
  )
}