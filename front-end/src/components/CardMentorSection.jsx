import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CardMentorSection() {
  return (
    <Container sx={{ marginTop: '8rem' }}>      
      <Box sx={{ textAlign: 'center' }}>
        <Typography component="h3" variant="h2" sx={{ color: '#25D366' }}>
          Regístrese como mentor y gana!
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#F9F9F9', mt: 1 }}>
          Publique su perfil de forma gratuita, establezca el precio de las clases y obtenga nuevos estudiantes
        </Typography>
        <Button variant="contained" sx={{ width: 130, mt: 1, py: 1 }}>
          Registrarse
        </Button>
      </Box>
    </Container>
  )
}