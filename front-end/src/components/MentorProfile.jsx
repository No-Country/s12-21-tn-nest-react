import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useAuth } from '../context/AuthContext';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Card, CardContent, Paper } from '@mui/material';
/* MiniComponete para los textos del perfil */
import ContentBlock from './mini-components/ContentBlock';
import { urlApi } from '../../config/axios';

import { createTheme, ThemeProvider } from '@mui/material/styles';
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

const MentorProfile = () => {
  const navigate = useNavigate()
  const [mentorInfo, setMentorInfo] = useState(null);
  const { userId, mentorId } = useAuth();

  useEffect(() => {
    const fetchMentorInfo = async () => {
      try {
        const response = await urlApi.get(`/mentor/filter/${mentorId}`);
        setMentorInfo(response.data);
      } catch (error) {
        console.error('Error fetching mentor information:', error);
      }
    };
    fetchMentorInfo();
    console.log("userId:", userId, "mentorId", mentorId);
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main" maxWidth="lg" sx={{ mt: 5 }}>
        <Typography component="h2" variant="h3" sx={{ color: "#25D366", fontSize: { xs: "2rem", md: "3rem" } }}>Perfil de Mentor</Typography>
        <Container component="section" maxWidth="sm" sx={{ display: "flex", justifyContent: "center"/*,  alignItems: "center" */, userSelect: "none" }}>
          <Box component="div" sx={{ height: "100%", width: "90%", mt: 10, border: "2px solid #25D366", borderRadius: "1rem", position: "relative", mb: 5 }}>
            {mentorInfo && (
              <Card sx={{ borderRadius: "1rem", width: "100%", height: "100%", backgroundColor: "#0B141A", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Paper
                  sx={{

                    width: "100%", height: "7rem", filter: "blur(5px)",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${mentorInfo.image})`,
                  }}
                />
                <Box sx={{ position: "absolute", top: { xs: "-3rem", sm: "-4rem" } }}>
                  <Avatar sx={{ width: { xs: "8rem", md: "10rem" }, height: { xs: "8rem", md: "10rem" }, border: "3px solid #25D366" }} alt={`${mentorInfo.userId.firstName} ${mentorInfo.lastName}`} src={mentorInfo.image} />
                </Box>
                <CardContent sx={{ /* marginTop: "6rem", */ width: "100%" }}>
                  <ContentBlock
                    title="Nombre:"
                    description={`${mentorInfo.userId.firstName} ${mentorInfo.userId.lastName}`} />
                  <ContentBlock
                    title="Nacimiento:"
                    description={mentorInfo.birthdate} />
                  <ContentBlock
                    title="Especilidad:"
                    description={`${mentorInfo.speciality.name}`} />
                  <ContentBlock
                    title="Email:"
                    description={mentorInfo.userId.email} />
                  <ContentBlock
                    title="Telefono:"
                    description={mentorInfo.userId.phone} />
                  <ContentBlock
                    title="Categorias:"
                    description={`${mentorInfo.categories.map((category) => category.name).join(', ')}`} />
                  <ContentBlock
                    title="About Me:"
                    description={`${mentorInfo.aboutMe}`} />
                  <ContentBlock
                    title="Descripción:"
                    description={`${mentorInfo.mentorDescription}`} />
                  <ContentBlock
                    title="Precio:"
                    description={mentorInfo.price} />
                </CardContent>

                <Box sx={{ width: "100%", textAlign: "center" }}>
                  <Link to={`/updateMentorProfile`} state={{ mentorInfo }}>
                    <Button
                      variant="contained"
                      sx={{ mt: 1, mb: 2, width: "50%", backgroundColor: "#25D366", color: "#FFF" }}
                    >
                      Editar
                    </Button>
                  </Link>
                </Box>

              </Card>
            )}
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default MentorProfile;
