import { useContext } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { GlobalContext } from '../context/GlobalContext';

export default function BookingCard({ id, meetingName, host, guests, startDate, endDate, meetingRoom }) {
  const {
    modal: [openEdit, setOpenEdit],
    deleteModal: [_, setOpen],
    event: [__, setEvent]
  } = useContext(GlobalContext)

  const handleDeleteClick = () => {
    setOpen(true)
    setEvent(id)
  }

  const handleEditClick = () => {
    setOpenEdit(true)
    setEvent(id)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {meetingName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Host: </strong><span>{host}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Guests: </strong>{guests ? guests.map((g, index) => <span key={index}>{`${g}${index !== guests.length - 1 ? ',' : ''} `}</span>) : 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Start Date &amp; Time: </strong><span>{ dayjs(startDate).format('MMM DD, YYYY - hh:mm A') }</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>End Date &amp; Time: </strong><span>{ dayjs(endDate).format('MMM DD, YYYY - hh:mm A') }</span>
        </Typography>
      </CardContent>
      <CardActionArea>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="body2" color="text.secondary">
            <Link href={`/rooms/${meetingRoom}`}>
              <a style={{ display: 'block', width: '100%', height: '100%', padding: '16px' }}>Meeting Room: <span style={{ textTransform: 'capitalize' }}>{meetingRoom?.replace('-', ' ')}</span></a>
            </Link>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" startIcon={<EditIcon />} onClick={handleEditClick}>
          Edit
        </Button>
        <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeleteClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}