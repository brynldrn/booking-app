import { useContext, useEffect, useState } from 'react'
import Head from 'next/head';
import BookingsList from '../components/BookingsList'
import List from '@mui/material/List'
import Container from '@mui/material/Container';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PrimarySearchAppBar from '../components/PrimarySearchAppBar';
import BasicModal from '../components/BasicModal';
import DeleteModal from '../components/DeleteModal';
import { GlobalContext } from '../context/GlobalContext';
import useSWR from 'swr'
import Box from '@mui/system/Box';
import Divider from '@mui/material/Divider';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Home() {
  const {
    modal: [_, setOpen],
    event: [__, setEventId],
    eventsList: [events, setEvents],
    page: [currentPage, setCurrentPage],
    filteredEvents: [filtered, setFiltered],
    searchResults: [searchRes],
    finalData: [finalDataDisplayed],
    drawer: [isDrawerOpen, setIsDrawerOpen],
    room: [roomFilters, setRoomFilters],
    filterActive: [isFilterActive, setIsFilterActive]
  } = useContext(GlobalContext)
  const [dataToDisplay, setDataToDisplay] = useState(null)

  // use SWR for now since we are using a mock API
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('https://61964cdfaf46280017e7df88.mockapi.io/events', fetcher, { revalidateIfStale: true, revalidateOnFocus: true, refreshInterval: 5000 })

  useEffect(() => {
    setEvents(data)
  }, [data, setEvents])

  useEffect(() => {
    setDataToDisplay(finalDataDisplayed || searchRes || filtered || events)
  }, [searchRes, filtered, events, finalDataDisplayed, setDataToDisplay])

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  useEffect(() => {
    const flags = Object.keys(roomFilters).filter(room => roomFilters[room])
    const filtered = flags && flags.length ? events.filter(event => flags.includes(event.meetingRoom)) : null

    setIsFilterActive(Boolean(flags.length))
    setFiltered(filtered)
    setCurrentPage(1)
  }, [roomFilters, events, setFiltered, setIsFilterActive, setCurrentPage])

  const handleRoomFilterUpdate = (key, value) => {
    const _roomFilters = {...roomFilters}
    _roomFilters[key] = value;

    setRoomFilters({..._roomFilters})
  }

  return (
    <main>
      <Head>
        <title>Booking App - BAEQ</title>
      </Head>
      <PrimarySearchAppBar />
      <SwipeableDrawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: { xs: 250, sm: 400 } }}
          role="presentation"
          // onClick={toggleDrawer(false)}
          // onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary="Filter by Meeting Room" />
            </ListItem>
            <ListItem>
              <FormGroup>
                {
                  roomFilters && Object.keys(roomFilters)?.map(room => <FormControlLabel sx={{ textTransform: 'uppercase' }} key={room} control={<Checkbox checked={roomFilters[room]} onChange={(e, val) => handleRoomFilterUpdate(room, val)} />} label={room.replace('-', ' ')} />)
                }
              </FormGroup>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </SwipeableDrawer>
      <section style={{ padding: '20px 0' }}>
        <Container>
          <BookingsList bookings={dataToDisplay}/>
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
