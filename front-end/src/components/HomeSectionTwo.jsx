import { Box, Button, Container, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import mentoriaJson from '../Home/mentorias.json'

export default function HomeSectionTwo() {
  return (
    <Container component='section'>
      <Box>
        <Typography component='h4' variant="h4" sx={{ color: '#FFFFFF', mb: 3 }}>
          Encuentra mentorias
        </Typography>
        <Grid container spacing={2}>
          {mentoriaJson.slice(0, 6).map(item =>
            <Grid item xs={12} sm={4} md={4} key={item.name}>
              <Box sx={{ height:'100%',display:'flex',justifyContent:'center',alignItems:'center',border: '2px solid #25D366', p: 2, textAlign: 'center', borderRadius: '5px' }}>
                <Typography sx={{ color: '#FFFFFF' }}>
                  {item.name.toUpperCase()}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
        <Button endIcon={<KeyboardArrowRightIcon />} variant="contained" sx={{ py: 1, mt: 2 }}>
          Ver más
        </Button>
      </Box>
    </Container>
  )
}
