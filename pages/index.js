import { useContext, useState } from 'react'
import Head from 'next/head';
import List from '../components/List'
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import BasicModal from '../components/BasicModal';
import { GlobalContext } from '../context/GlobalContext';

export default function Home() {
  const {
    modal: [_, setOpen],
  } = useContext(GlobalContext)
  const [bookings, setBookings] = useState([
    {
      meetingName: 'NY Meeting',
      host: 'Bryan Aldrin',
      guests: [
        'Chad',
        'Giga Chad',
        'Steve'
      ],
      date: new Date()
    },
    {
      meetingName: 'SF Meeting',
      host: 'Chuck Norris',
      guests: [
        'Bob Ross',
        'Spoderman',
        'Doge'
      ],
      date: new Date()
    },
    {
      meetingName: 'Patry in the USA',
      host: 'Miley Cyrus',
      guests: [
        'Jeff'
      ],
      date: new Date()
    },
    {
      meetingName: 'Patry in the USA',
      host: 'Miley Cyrus',
      guests: [
        'Jeff'
      ],
      date: new Date()
    },
    {
      meetingName: 'Patry in the USA',
      host: 'Miley Cyrus',
      guests: [
        'Jeff'
      ],
      date: new Date()
    },
    {
      meetingName: 'Patry in the USA',
      host: 'Miley Cyrus',
      guests: [
        'Jeff'
      ],
      date: new Date()
    },
    {
      meetingName: 'Patry in the USA',
      host: 'Miley Cyrus',
      guests: [
        'Jeff'
      ],
      date: new Date()
    }
  ])

  return (
    <main>
      <Head>
        <title>Bookin App - BAEQ</title>
      </Head>
      <PrimarySearchAppBar />
      <section style={{ padding: '20px 0' }}>
        <Container>
          <List bookings={bookings}/>
        </Container>
        <Fab onClick={() => setOpen(true)} color="primary" size="large" aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </section>
      <BasicModal />
    </main>
  )
}
