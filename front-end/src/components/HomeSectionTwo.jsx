import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import mentoriaJson from '../Home/mentorias.json'
import { Link } from 'react-router-dom';

export default function HomeSectionTwo() {
  return (
    <Container component='section' sx={{ marginTop: '8rem' }}>
      <Box>
        <Typography component='h4' variant="h4" sx={{ color: '#FFFFFF', mb: 3 }} data-aos="fade-right" data-aos-duration="1000">
          Encuentra mentorias
        </Typography>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {mentoriaJson.slice(0, 6).map(item =>
              <Grid item xs={12} sm={4} md={4} key={item.name}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #25D366', p: 2, textAlign: 'center', borderRadius: '5px' }} data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">
                  <Typography sx={{ color: '#FFFFFF' }}>
                    {item.name.toUpperCase()}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
          
            <Button to="/mentores" component={Link} endIcon={<KeyboardArrowRightIcon />} variant="contained" sx={{ py: 1, mt: 2,backgroundColor:"#25D366",color:"#FFF" }} data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
              Ver más
            </Button>
        </Container>
      </Box>
    </Container>
  )
}
