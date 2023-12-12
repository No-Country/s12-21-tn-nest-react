import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function CardHomeText({ image, title, description }) {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '2px solid #25D366' }}>
      <CardMedia component="div" sx={{ pt: '56.25%' }} image={image} />
      <CardContent sx={{ flexGrow: 1, background: '#0B141A' }}>
        <Typography gutterBottom variant="h5" component="h5" sx={{ color: '#25D366' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#F9F9F9' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}