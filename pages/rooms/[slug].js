import Head from 'next/head'
import Grid from '@mui/material/Grid'
import PrimarySearchAppBar from '../../components/PrimarySearchAppBar'
import Container from '@mui/material/Container'
import RoomBookingsList from '../../components/RoomBookingsList'
import BasicModal from '../../components/BasicModal'
import DeleteModal from '../../components/DeleteModal'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

export default function MeetingRoom({ events, slug }) {

  return (
    <main>
      <Head>
        <title>Booking App - <span style={{ textTransform: 'uppercase' }}>{slug.replace('-', ' ')}</span></title>
      </Head>
      <PrimarySearchAppBar back slug={slug}/>
      <section style={{ padding: '20px 0' }}>
        <Container>
          <Grid mb={2}>
            <Grid item>
              <Card>
                <CardMedia
                  component="img"
                  height="auto"
                  image="https://picsum.photos/1920/768"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <span style={{ textTransform: 'uppercase' }}>{slug.replace('-', ' ')}</span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <RoomBookingsList bookings={events}/>
        </Container>
      </section>
      <BasicModal />
      <DeleteModal />
    </main>
  )
}

export async function getStaticProps({ params }) {
  const req = await fetch('https://61964cdfaf46280017e7df88.mockapi.io/events', { method: 'GET' })
  const reqJson = await req.json()
  const events = reqJson.filter(event => event.meetingRoom === params.slug)
  const data = { events, slug: params.slug }

  return {
    props: data,
  }
}

export async function getStaticPaths() {
  const paths =
    ['new-york', 'manila', 'new-zealand', 'japan'].map(slug => ({
      params: { slug },
    }))

  return {
    paths,
    fallback: false,
  }
}