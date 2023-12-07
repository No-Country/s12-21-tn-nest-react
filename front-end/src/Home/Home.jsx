import "./Home.css"
import { Link } from "react-router-dom";
import topImage from '../images/home/top-image.jpg'
import dataHomeJson from '../Home/homeData.json'
import { Grid, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CardHomeText from "../components/CardHomeText";

const Home = () => {
  return (
    <main>
      
      <Container>
        <Grid container spacing={5} style={{ marginTop: "8rem", marginBottom: "8rem" }}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Box sx={{
              display: 'flex',              
            }}>

              <Typography variant="h1" style={{fontSize:"10rem"}}>
                Encuentra un mentor o conviértete en uno
              </Typography>
            </Box>
            <Box sx={{ typography: 'body2' }} style={{fontSize:"2rem", color:"#F9F9F9"}}>
              Descubre MentorSphere, el lugar perfecto para encontrar menotres con horarios flexibles y convertirte en uno. Explora las próximas mentorías, clases con notificaciones y calificaciones de los mentores.
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <img className="home__image" src={topImage} alt="Top Home" />
          </Grid>
        </Grid>
      </Container>

      <Container >
        <Grid container spacing={5} style={{ marginTop: "8rem", marginBottom: "8rem" }}>
          {dataHomeJson.map(data =>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardHomeText
                picture={data.picture}
                title={data.title}
                description={data.description}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  )
}

export default Home