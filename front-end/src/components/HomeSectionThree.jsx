import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EmailIcon from '@mui/icons-material/Email';
import CardMentorSection from './CardMentorSection';

const sectionMentorHome = [
  { title: 'Cree su perfil', description: 'Díganos qué enseña, qué educación tiene, cuál es su horario', icon: <AppRegistrationIcon /> },
  { title: 'Elija solicitudes', description: 'Vea solicitudes de nuevos estudiantes.', icon: <NewspaperIcon /> },
  { title: 'Contacte al estudiante', description: 'Programe el comienzo de las clases.', icon: <EmailIcon /> }
];

export default function HomeSectionThree() {
  return (
    <Container>
      <CardMentorSection
        title="Regístrese como mentor y gana!"
        description="Publique su perfil de forma gratuita, establezca el precio de las clases y obtenga nuevos estudiantes"
        textButton="Registrarse" />
      <Container maxWidth='md' sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {sectionMentorHome.map(item =>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', color: '#fff', p: 1, backgroundColor: '#111B21' }}>
                <CardContent>
                  <Box color='#00A884'>{item.icon}</Box>
                  <Typography component='h4' variant='h6' gutterBottom>{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Container>
  )
}
