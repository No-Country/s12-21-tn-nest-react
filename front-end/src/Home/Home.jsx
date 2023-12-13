import "./Home.css"
import Container from "@mui/material/Container";
import HomeMainSection from "../components/HomeMainSection";
import HomeSectionOne from "../components/HomeSectionOne";
import HomeSectionTwo from "../components/HomeSectionTwo";
import HomeSectionThree from "../components/HomeSectionThree";
import fotoMain from '../images/home//home-picture.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => { AOS.init() }, [])
  return (
    <Container>
      <HomeMainSection
        foto={fotoMain}
        title="Encuentra un mentor o conviértete en uno"
        description="Descubre MentorSphere, el lugar perfecto para encontrar mentores con horarios flexibles y convertirte en uno." />
      <HomeSectionOne />
      <HomeSectionTwo />
      <HomeSectionThree />
    </Container>
  )
}

export default Home