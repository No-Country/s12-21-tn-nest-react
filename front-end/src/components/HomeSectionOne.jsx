import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import CardHomeText from './CardHomeText'
import dataHomeJson from '../Home/homeData.json'

export default function HomeSectionOne() {
  return (
    <Container component='section' sx={{ marginTop: '5rem' }}>
      <Box sx={{ mb: 3 }}>
        <Typography component='h4' variant="h4" sx={{ color: '#F9F9F9' }}>
          Lo que te ofrece nuestra plataforma
        </Typography>
      </Box>
      <Grid container spacing={6} style={{ marginBottom: "5rem" }}>
        {dataHomeJson.map(data =>
          <Grid item key={data.title} xs={12} sm={6} md={4} lg={4}>
            <CardHomeText
              image={data.picture}
              title={data.title}
              description={data.description} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
