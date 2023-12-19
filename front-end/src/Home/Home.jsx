import "./Home.css"
import Container from "@mui/material/Container";
import HomeMainSection from "../components/HomeMainSection";
import HomeSectionOne from "../components/HomeSectionOne";
import HomeSectionTwo from "../components/HomeSectionTwo";
import HomeSectionThree from "../components/HomeSectionThree";
import fotoMain from '../images/home//home-picture.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#25D366',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      paper: '#111b21',
      default: '#0B141A',
    },
  },
});

const Home = () => {
  useEffect(() => { AOS.init() }, [])
  return (
    <ThemeProvider theme={customTheme}>
      <Container>
        <HomeMainSection
          foto={fotoMain}
          title="Encuentra un mentor o conviértete en uno"
          description="Descubre MentorSphere, el lugar perfecto para encontrar mentores con horarios flexibles y convertirte en uno." />
        <HomeSectionOne />
        <HomeSectionTwo />
        <HomeSectionThree />
      </Container>
    </ThemeProvider>
  )
}

export default Home