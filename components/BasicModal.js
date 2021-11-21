import { useContext, useEffect, useRef, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GlobalContext } from '../context/GlobalContext';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '80%',
    md: 600
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const {
    modal: [open, setOpen],
    event: [eventId],
  } = useContext(GlobalContext)
  const [meetingName, setMeetingName] = useState('')
  const [host, setHost] = useState('')
  const [guests, setGuests] = useState([''])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false)
  const [sbOpen, setSbOpen] = useState(false)
  const [sbErrorOpen, setSbErrorOpen] = useState(false)
  const [isStartDateValid, setIsStartDateValid] = useState(false)
  const [isEndDateValid, setIsEndDateValid] = useState(false)
  const eventForm = useRef()
  const meetingRooms = [
    { label: 'New York', slug: 'new-york' },
    { label: 'Manila', slug: 'manila' },
    { label: 'New Zealand', slug: 'new-zealand' },
    { label: 'Japan', slug: 'japan' },
  ]
  const [meetingRoom, setMeetingRoom] = useState('new-york')

  const resetForm = () => {
    setMeetingName('')
    setHost('')
    setGuests([''])
    setStartDate(new Date())
    setEndDate(new Date())
    setMeetingRoom('')
  }

  // gets the event based on the ID and automatically appends them to each state
  useEffect(() => {
    eventId && fetch(`https://61964cdfaf46280017e7df88.mockapi.io/events/${eventId}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      const { meetingName, host, guests, startDate, endDate, meetingRoom } = data;

      setMeetingName(meetingName)
      setHost(host)
      setGuests(guests || [''])
      setStartDate(new Date(startDate))
      setEndDate(new Date(endDate))
      setMeetingRoom(meetingRoom)
      setIsStartDateValid(true)
      setIsEndDateValid(true)
    })
    .catch(err => console.error(err))
  }, [eventId])

  const handleSave = async () => {
    const valid = await eventForm.current.isFormValid()
    const meetingDuration = Math.round(endDate.getTime() - startDate.getTime()) / 60000;
    const isMeetingDurationValid = meetingDuration >= 30 && meetingDuration <= 60;

    // Save and Update are handled here both by conditional HTTP method
    if (valid && isStartDateValid && isEndDateValid) {
      if (isMeetingDurationValid) {
        setIsLoading(true)
        fetch(`https://61964cdfaf46280017e7df88.mockapi.io/events/${eventId || ''}`, {
          method: eventId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            meetingName,
            host,
            guests,
            startDate,
            endDate,
            meetingRoom
          })
        }).then(res => {
          setIsLoading(false)
          resetForm()
          setOpen(false)
          setSbOpen(true)

          return res.json()
        }).catch(err => console.error(err))
      } else {
        setSbErrorOpen(true)
      }
    }
  }

  const handleGuestsChange = (e, index) => {
    const _guests = [...guests];
    _guests[index] = e.target.value;

    setGuests([..._guests])
  }

  const handleAddGuest = () => {
    setGuests([...guests, ''])
  }

  const handleRemoveGuest = (index) => {
    const _guests = [...guests];
    _guests.splice(index, 1);

    setGuests([..._guests])
  }
  
  const handleModalClose = () => {
    setOpen(false)
    resetForm()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography mb={2} id="modal-modal-title" variant="h6" component="h2">
            Add a new event
          </Typography>
          <ValidatorForm
            onSubmit={handleSave}
            ref={eventForm}
          >
            <FormGroup>
              <FormControl fullWidth>
                <InputLabel id="meetingRoom">Meeting Room</InputLabel>
                <Select
                  labelId="meetingRoom"
                  value={meetingRoom}
                  label="Meeting Room"
                  onChange={(e) => setMeetingRoom(e.target.value)}
                >
                  {
                    meetingRooms.map((room, index) => <MenuItem key={index + room.slug} value={room.slug}>{room.label}</MenuItem>)
                  }
                </Select>
              </FormControl>
              <TextValidator onChange={(e) => setMeetingName(e.target.value)} style={{ width: '100%' }} value={meetingName} id="meetingName" name="meetingName" validators={['required']} errorMessages={['this field is required']} label="Meeting Name" variant="standard" />
              <TextValidator onChange={(e) => setHost(e.target.value)} value={host} style={{ width: '100%' }} id="host" name="host" validators={['required']} errorMessages={['this field is required']} label="Host" variant="standard" />
              <Typography sx={{ mt: 2 }} variant="h6" component="p">
                Guests:
              </Typography>
              <TextValidator onChange={(e) => handleGuestsChange(e, 0)} value={guests[0]} style={{ width: '100%' }} id="guest-0" name="guest-0" validators={['required']} errorMessages={['this field is required']} label="Guest 1" variant="standard" />
              <Box mt={1} mb={3}>
                {
                  guests && guests?.length >= 2 && guests?.map((field, index) => {
                    return index !== 0 ? (
                      <Grid key={index} container alignContent="center" alignItems="center" justifyContent="space-between">
                        <Grid item xs={8}>
                          <TextValidator style={{ width: '100%' }} onChange={(e) => handleGuestsChange(e, index)} value={guests[index]} id={`guest-${index + 1}`} name={`guest-${index + 1}`} validators={['required']} errorMessages={['this field is required']} label={`Guest ${index + 1}`} variant="standard" />
                        </Grid>
                        <Grid item xs={3}>
                          <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleRemoveGuest(index)}>Remove</Button>
                        </Grid>
                      </Grid>
                    ) : null
                  })
                }
              </Box>
              <Button variant="outlined" startIcon={<Add />} onClick={handleAddGuest}>Add a guest</Button>
              <Box mt={5} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue)
                    }}
                    minDate={new Date()}
                    minTime={new Date(0, 0, 0, 8)}
                    maxTime={new Date(0, 0, 0, 17, 1)}
                    onAccept={() => setIsStartDateValid(true)}
                    onError={() => setIsStartDateValid(false)}
                  />
                </LocalizationProvider>
              </Box>
              <Box mt={5} mb={5} >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    minDate={startDate}
                    maxDate={startDate}
                    minTime={new Date(0, 0, 0, 8, 30)}
                    maxTime={new Date(0, 0, 0, 18, 1)}
                    onAccept={() => setIsEndDateValid(true)}
                    onError={() => setIsEndDateValid(false)}
                  />
                </LocalizationProvider>
              </Box>
              <LoadingButton
                color="primary"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Save
              </LoadingButton>
            </FormGroup>
          </ValidatorForm>
        </Box>
      </Modal>
      <Snackbar open={sbOpen} autoHideDuration={2000} onClose={() => setSbOpen(false)}>
        <Alert onClose={() => setSbOpen(false)} severity="success" sx={{ width: '100%' }}>
          { eventId ? 'Successfully Updated!' : 'Successfully Created!' }
        </Alert>
      </Snackbar>
      <Snackbar open={sbErrorOpen} autoHideDuration={2000} onClose={() => setSbErrorOpen(false)}>
        <Alert onClose={() => setSbErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
          Meeting duration should be at least 30 minutes and not more than an hour.
        </Alert>
      </Snackbar>
    </div>
  );
}
