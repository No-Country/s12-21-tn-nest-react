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
import {useNavigate, Link} from "react-router-dom";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { urlApi } from '../../config/axios';

const StudentProfile = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate()
  const [studentInfo, setStudentInfo] = useState(null);
/*   const { userId, mentorId } = useAuth();
 */  const studentId = '52d0fa61-0eb8-4e32-9039-e10fc2406283' //0c7a806a-a6a1-4dfb-8218-4aa4fdee8097
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
    <>
    <div className="profileContainer">
      <ThemeProvider theme={customTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
               <Box sx={{ mt: 3 }}>
        {studentInfo && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Avatar alt={`${studentInfo.user.firstName} ${studentInfo.user.lastName}`} src={studentInfo.image} className=""/>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4">ESTUDIANTE: {`${studentInfo.user.firstName} ${studentInfo.user.lastName}`}</Typography>
              <Typography variant="subtitle1">Estudiante email: {studentInfo.user.email}</Typography>
              <Typography variant="subtitle1">Estudiante phone: {studentInfo.user.phone}</Typography>
{/*               <Typography variant="body1">{`Especilidad: ${studentInfo.speciality.name}`}</Typography>
 */}              <Typography variant="body1">{`Categorias: ${studentInfo.categories.map((category) => category.name).join(', ')}`}</Typography>

            </Grid>
            <Grid item xs={12} sm={6}>
            <Link to={`/updateStudentProfile/${studentId}`} state={{ studentInfo }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Editar
                    </Button>
              </Link>
            </Grid>
          </Grid>
        )}
        </Box>
        </Box>
        </Container>
    </ThemeProvider>
    </div>
    </>
  );
};

export default StudentProfile;
