import { Box, Button, Container, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import mentoriaJson from '../Home/mentorias.json'

export default function HomeSectionTwo() {
  return (
    <Container >
      <Box>
        <Typography component='h3' variant="h4">Encuentra mentorias!</Typography>
        <Grid container spacing={2}>
          {mentoriaJson.slice(0, 6).map(item =>
            <Grid item xs={12} sm={4} md={4} key={item.name}>
              <Box sx={{ border: '2px solid #25D366', p: 2, textAlign: 'center', borderRadius: '5px' }}>
                <Typography>
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
