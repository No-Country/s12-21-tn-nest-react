import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useAuth } from '../context/AuthContext';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';
import {Card, CardContent, Paper, TextField } from '@mui/material';
import { urlApi } from '../../config/axios';

import ContentBlock from './mini-components/ContentBlock';

const StudentProfile = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate()
  const [studentInfo, setStudentInfo] = useState(null);
/*   const { userId, mentorId } = useAuth();
 */  const studentId = '0c7a806a-a6a1-4dfb-8218-4aa4fdee8097' //0c7a806a-a6a1-4dfb-8218-4aa4fdee8097
  const userId = '42924aa9-fed5-428a-8eaa-8ba83bd4c737' //68cfbe0f-4cf2-4483-a487-6328ecbff1bd

  const customTheme = createTheme({
    palette: {
      background: {
        default: '#FFFFFF', // Fondo blanco
      },
      text: {
        primary: '#000000', // Texto negro
      },
    },
  });


  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        let url = `alumn/${studentId}`
        const response = await urlApi.get(url);
        setStudentInfo(response.data);
      } catch (error) {
        console.error('Error fetching mentor information:', error);
      }
    };
    fetchStudentInfo();
  }, []);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 5 }}>
      <Typography component="h2" variant="h3" sx={{ color: "#25D366", fontSize: { xs: "2rem", md: "3rem" } }}>Perfil de Estudiante</Typography>
      <Container component="section" maxWidth="sm" sx={{ display: "flex", justifyContent: "center"/*,  alignItems: "center" */, userSelect: "none" }}>
        <Box component="div" sx={{ height: "100%", width: "90%", mt: 10, border: "2px solid #25D366", borderRadius: "1rem", position: "relative", mb: 5 }}>
          {studentInfo && (
            <Card sx={{ borderRadius: "1rem", width: "100%", height: "100%", backgroundColor: "#0B141A", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <Paper
                sx={{
                  width: "100%", height: "7rem", filter: "blur(5px)",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundImage: `url(${studentInfo.image})`,
                }}
              />
              <Box sx={{ position: "absolute", top: { xs: "-3rem", sm: "-4rem" } }}>
                <Avatar sx={{ width: { xs: "8rem", md: "10rem" }, height: { xs: "8rem", md: "10rem" }, border: "3px solid #25D366" }} alt={`${studentInfo.user.firstName} ${studentInfo.user.lastName}`} src={studentInfo.image} />
              </Box>
              <CardContent sx={{ /* marginTop: "6rem", */ width: "100%" }}>
                <ContentBlock
                  title="Nombre:"
                  description={`${studentInfo.user.firstName} ${studentInfo.user.lastName}`} />
                <ContentBlock
                  title="Email:"
                  description={studentInfo.user.email} />
                <ContentBlock
                  title="Telefono:"
                  description={studentInfo.user.phone} />
                <ContentBlock
                  title="Categorias:"
                  description={`${studentInfo.categories.map((category) => category.name).join(', ')}`} />
              </CardContent>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Link to={`/updateStudentProfile/${studentId}`} state={{ studentInfo }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 1, mb: 2, width: "50%" }}
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
  );
};

export default StudentProfile;
