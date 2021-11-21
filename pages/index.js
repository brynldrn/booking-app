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
import DateRangeIcon from '@mui/icons-material/DateRange';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateRangePickerDay, StaticDateRangePicker } from '@mui/lab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ClearAll from '@mui/icons-material/ClearAll';
import dayjs from 'dayjs';

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
    filterActive: [isFilterActive, setIsFilterActive],
    filteredByDate: [dateFilteredData, setDateFilteredData],
    filterDateRange: [dateRange, setDateRange]
  } = useContext(GlobalContext)
  const [dataToDisplay, setDataToDisplay] = useState(null)

  const renderWeekPickerDay = (date, dateRangePickerDayProps) => {
    return <DateRangePickerDay {...dateRangePickerDayProps} />;
  };

  // use SWR for now since we are using a mock API
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR('https://61964cdfaf46280017e7df88.mockapi.io/events', fetcher, { revalidateIfStale: true, revalidateOnFocus: true, refreshInterval: 5000 })

  // sets initial events to be loaded
  useEffect(() => {
    setEvents(data)
  }, [data, setEvents])

  // decides what cards to display after the user clicks on any page features
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

  // filters the events cards based on the Meeting Room filters
  useEffect(() => {
    const flags = Object.keys(roomFilters).filter(room => roomFilters[room])
    const filtered = flags && flags.length ? events.filter(event => flags.includes(event.meetingRoom)) : null

    setIsFilterActive(Boolean(flags.length))
    setFiltered(filtered)
    setCurrentPage(1)
  }, [roomFilters, events, setFiltered, setIsFilterActive, setCurrentPage])

  // filters the event cards based on the value of the Date Range Picker.
  // this will not execute unless the date range is complete
  useEffect(() => {
    if (!dateRange.includes(null)) {
      const filtered = events.filter(event => {
        const date = dayjs(event.startDate).hour(0).minute(0).second(0).millisecond(0)
        const startRange = dayjs(dateRange[0]).hour(0).minute(0).second(0).millisecond(0)
        const endRange = dayjs(dateRange[1]).hour(0).minute(0).second(0).millisecond(0)

        const startDiff = date.diff(startRange, 'days')
        const endDiff = endRange.diff(date, 'days')

        return startDiff >= 0 && endDiff >= 0
      }) || null

      setDateFilteredData(filtered)
      setCurrentPage(1)
    }
  }, [dateRange, setDateFilteredData, events, setCurrentPage])

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
          sx={{ width: { xs: 340, sm: 400 } }}
          role="presentation"
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
          <List>
            <ListItem>
              <ListItemIcon>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText primary="Filter by Date Range" />
            </ListItem>
            <ListItem>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateRangePicker
                  displayStaticWrapperAs="mobile"
                  label="date range"
                  value={dateRange}
                  onChange={(newValue) => setDateRange(newValue)}
                  renderDay={renderWeekPickerDay}
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </>
                  )}
                />
              </LocalizationProvider>
            </ListItem>
            <ListItem>
              <Button onClick={() => {setDateRange([null, null])}} startIcon={<ClearAll />}>Clear Dates</Button>
            </ListItem>
          </List>
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
