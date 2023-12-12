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

const Profile = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate()
  const [mentorInfo, setMentorInfo] = useState(null);
/*   const { userId, mentorId } = useAuth();
 */  const mentorId = '5d93e6fd-8d99-47d8-884a-ce71faf78552'
 const userId = 'adca6e5f-c606-47ae-9c67-1a00dbe9ffc1'

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
    const fetchMentorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mentor/filter/${mentorId}`);
        setMentorInfo(response.data);
      } catch (error) {
        console.error('Error fetching mentor information:', error);
      }
    };
    fetchMentorInfo();
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
        {mentorInfo && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Avatar alt={`${mentorInfo.userId.firstName} ${mentorInfo.lastName}`} src={mentorInfo.image} className=""/>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4">MENTOR: {`${mentorInfo.userId.firstName} ${mentorInfo.userId.lastName}`}</Typography>
              <Typography variant="subtitle1">Mentor email: {mentorInfo.userId.email}</Typography>
              <Typography variant="subtitle1">Mentor phone: {mentorInfo.userId.phone}</Typography>
              <Typography variant="subtitle1">Nacimiento: {mentorInfo.birthdate}</Typography>
              <Typography variant="subtitle1">Precio: {mentorInfo.price}</Typography>
            
              <Typography variant="body1">{`Descripción: ${mentorInfo.mentorDescription}`}</Typography>
              <Typography variant="body1">{`About Me: ${mentorInfo.aboutMe}`}</Typography>
              <Typography variant="body1">{`Especilidad: ${mentorInfo.speciality.name}`}</Typography>
              <Typography variant="body1">{`Categorias: ${mentorInfo.categories.map((category) => category.name).join(', ')}`}</Typography>

            </Grid>
            <Grid item xs={12} sm={6}>
            <Link to={`/updateProfile/${mentorId}`} state={{ mentorInfo }}>
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

export default Profile;
