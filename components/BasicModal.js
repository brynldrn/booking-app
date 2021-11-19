import { useContext, useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GlobalContext } from '../context/GlobalContext';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

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
  const [guests, setGuests] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFormValid, setIsFormValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [sbOpen, setSbOpen] = useState(false)

  const resetForm = () => {
    setMeetingName('')
    setHost('')
    setGuests([])
    setStartDate(new Date())
    setEndDate(new Date())
  }

  useEffect(() => {
    eventId && fetch(`https://61964cdfaf46280017e7df88.mockapi.io/events/${eventId}`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(data => {
      const { meetingName, host, guests, startDate, endDate } = data;
      setMeetingName(meetingName)
      setHost(host)
      setGuests(guests)
      setStartDate(startDate)
      setEndDate(endDate)
    })
    .catch(err => console.error(err))
  }, [eventId])

  const handleSave = () => {
    if (isFormValid) {
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
          endDate
        })
      }).then(res => {
        setIsLoading(false)
        resetForm()
        setOpen(false)
        setSbOpen(true)
        return res.json()
      }).catch(err => console.error(err))
    }
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new event
          </Typography>
          <ValidatorForm
            onSubmit={handleSave}
            onError={errors => setIsFormValid(errors.length)}
          >
            <FormGroup>
              <TextValidator onChange={(e) => setMeetingName(e.target.value)} style={{ width: '100%' }} value={meetingName} id="meetingName" name="meetingName" validators={['required']} errorMessages={['this field is required']} label="Meeting Name" variant="standard" />
              <TextValidator onChange={(e) => setHost(e.target.value)} value={host} style={{ width: '100%' }} id="host" name="host" validators={['required']} errorMessages={['this field is required']} label="Host" variant="standard" />
              <Typography sx={{ mt: 2 }} variant="h6" component="p">
                Guests:
              </Typography>
              <TextField id="guest" name="guest" label="Guest" variant="standard" />
              <Box sx={{ mt: 5}} >
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ mt: 5, mb: 5 }} >
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <LoadingButton
                color="primary"
                onClick={handleSave}
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
    </div>
  );
}
