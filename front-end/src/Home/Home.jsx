import "./Home.css"
import CardMentorSection from "../components/CardMentorSection";
import HomeMainSection from "../components/HomeMainSection";
import HomeSectionOne from "../components/HomeSectionOne";
import fotoMain from '../images/home//home-picture.jpg'
import Container from "@mui/material/Container";
import HomeSectionTwo from "../components/HomeSectionTwo";
import HomeSectionThree from "../components/HomeSectionThree";

const Home = () => {
  return (
    <Container>
      <HomeMainSection
        foto={fotoMain}
        title="Encuentra un mentor o conviértete en uno"
        description="Descubre MentorSphere, el lugar perfecto para encontrar mentores con horarios flexibles y convertirte en uno." />
      <HomeSectionOne />   
      <HomeSectionTwo/>   
      <HomeSectionThree/>
      <CardMentorSection />
      
    </Container>
  )
}

export default Home