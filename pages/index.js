import { useContext, useState } from 'react'
import Head from 'next/head';
import List from '../components/List'
import { Container } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import BasicModal from '../components/BasicModal';
import DeleteModal from '../components/DeleteModal';
import { GlobalContext } from '../context/GlobalContext';
import useSWR from 'swr'

export default function Home() {
  const {
    modal: [_, setOpen],
    event: [__, setEventId]
  } = useContext(GlobalContext)

  // use SWR for now since we are using a mock API
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('https://61964cdfaf46280017e7df88.mockapi.io/events', fetcher, { refreshInterval: 1000 })

  return (
    <main>
      <Head>
        <title>Booking App - BAEQ</title>
      </Head>
      <PrimarySearchAppBar />
      <section style={{ padding: '20px 0' }}>
        <Container>
          <List bookings={data}/>
        </Container>
        <Fab onClick={() => {
          setEventId(null)
          setOpen(true)
        }} color="primary" size="large" aria-label="add" sx={{ position: 'fixed', bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </section>
      <BasicModal />
      <DeleteModal />
    </main>
  )
}
