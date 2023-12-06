import React from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import fotoPrueba from '../images/home//home-picture.jpg'


export default function CardMentorSection() {
    return (
        <Container>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', mt:5,mb:5,background: '#0B141A',border: '1px solid #00A884' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 5 }}>
                    <Typography component="h2" variant="h3" sx={{ color: '#25D366' }}>
                        Regístrese como mentor y gana!
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" sx={{ color: '#F9F9F9' }}>
                        Publique su perfil de forma gratuita, establezca el precio de las clases y obtenga nuevos estudiantes
                    </Typography>
                    <Button variant="contained" sx={{width:130}}>
                        Registrarse
                    </Button>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 400, display: { xs: 'none', sm: 'block' } }}
                    image={fotoPrueba}
                    alt={fotoPrueba}
                />
            </Card>

        </Container>
    )
}