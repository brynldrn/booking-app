import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GlobalContext } from '../context/GlobalContext';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal() {
  const {
    deleteModal: [open, setOpen],
    event: [eventId, setEventId]
  } = useContext(GlobalContext)
  const [sbOpen, setSbOpen] = useState(false)
  
  const handleModalClose = () => {
    setOpen(false)
  }
  
  const handleConfirm = () => {
    eventId && fetch(`https://61964cdfaf46280017e7df88.mockapi.io/events/${eventId}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
      handleModalClose()
      setSbOpen(true)
      setEventId(null)
    })
    .catch(err => console.error(err))
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
            Are you sure you want to delete?
          </Typography>
          <Button sx={{ mt: 2 }} onClick={handleConfirm} variant="outlined">Confirm</Button>
        </Box>
      </Modal>
      <Snackbar open={sbOpen} autoHideDuration={2000} onClose={() => setSbOpen(false)}>
        <Alert onClose={() => setSbOpen(false)} severity="success" sx={{ width: '100%' }}>
          Successfully deleted!
        </Alert>
      </Snackbar>
    </div>
  );
}
