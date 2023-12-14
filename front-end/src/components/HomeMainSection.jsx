import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function HomeMainSection({ foto, title, description }) {
  return (
    <Paper component='section' data-aos="fade-down" data-aos-duration="1000" sx={{
      marginTop: '50px',
      position: 'relative',
      backgroundColor: 'grey.800',
      color: '#fff',
      mb: 4,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url(${foto})`,
    }}
    >
      <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,.4)', }} />
      <Grid container>
        <Grid item md={6}>
          <Box sx={{ position: 'relative', p: { xs: 3, md: 6 }, pr: { md: 0 } }} data-aos="fade-down">
            <Typography component="h1" variant="h2" color="inherit" gutterBottom sx={{ color: '#25D366', fontWeight: 'bold', fontSize: { xs: '2.8rem', sm: '4rem' } }}>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
