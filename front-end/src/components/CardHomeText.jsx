import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function CardHomeText({ picture, title, description }) {
  return (
    <Container>
      <Card sx={{ maxWidth: 300, border: '1px solid #00A884' }}>
        <CardMedia
          sx={{ height: 180 }}
          image={picture}
          title={picture}
        />
        <CardContent sx={{ background: '#0B141A' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#25D366' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ color: '#F9F9F9' }} >
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}