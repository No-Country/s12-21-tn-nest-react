import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';

const sectionMentorHome = [
  {
    title: 'Cree su perfil',
    description: 'Díganos qué enseña, qué educación tiene, cuál es su horario',
    icon: <AppRegistrationIcon />
  },
  {
    title: 'Elija solicitudes',
    description: 'Vea solicitudes de nuevos estudiantes.',
    icon: <NewspaperIcon />
  },
  {
    title: 'Contacte al estudiante',
    description: 'Programe el comienzo de las clases.',
    icon: <EmailIcon />
  }
]

export default function HomeSectionThree() {
  return (
    <Container maxWidth='md' sx={{ py: 8 }}>
      
      <Grid container spacing={3}>
        {sectionMentorHome.map(item =>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ border: '1px solid #00A884', p: 1 }}>
              <CardContent>
                <Box color='#00A884'>{item.icon}</Box>
                <Typography component='h4' variant='h6'>{item.title}</Typography>
                <Typography>{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
