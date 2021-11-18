import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

export default function BookingCard({ meetingName, host, guests, date }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://via.placeholder.com/500x300"
          alt="card image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {meetingName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Host: </strong><span>{host}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Guests: </strong>{guests.map((g, index) => <span key={index}>{`${g}${index !== guests.length - 1 ? ',' : ''} `}</span>)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Date: </strong><span>{ dayjs(date).format('MMMM DD, YYYY - hh:mm A') }</span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" startIcon={<EditIcon /> }>
          Edit
        </Button>
        <Button color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}