import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CardMentorSection({title,description,textButton}) {
  return (
    <Container sx={{ marginTop: '8rem' }}>      
      <Box sx={{ textAlign: 'center' }}>
        <Typography component="h3" variant="h2" sx={{ color: '#25D366' }}>
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#F9F9F9', mt: 1 }}>
          {description}
        </Typography>
        <Button variant="contained" sx={{ width: 130, mt: 1, py: 1 }}>
          {textButton}
        </Button>
      </Box>
    </Container>
  )
}