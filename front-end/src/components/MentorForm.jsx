import * as React from 'react';
import axios from "axios";
import { useState } from "react";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container, Grid, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocation, Link , useNavigate} from "react-router-dom";

const MentorForm = ({ location }) => {
  const navigate = useNavigate();
  const newUser = useLocation().state || {};
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [newMentor, setNewMentor] = useState({
    mentorImage: null,
    mentorDescription: "",
    mentorAboutMe: "",
    mentorDate: "",
    mentorPrice: "",
  })
  const { mentorImage, mentorDescription, mentorAboutMe, mentorDate, mentorPrice} = newMentor
  const handleChange = (event) => {
      const { name, value } = event.target;
      setNewMentor({
          ...newMentor,
          [name]: value,
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setNewMentor({
        ...newMentor,
        mentorImage: file,
      });
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(mentorDate);
    console.log(newMentor);
    console.log('Información de newUser en MentorForm:', newUser);
    navigate('/mentorshipForm', { state: { newUser, newMentor } });
  }



  return (
    <Container>
        <Box
          component="form"
          sx={{
           alignItems: 'center',
           marginTop: 8,
           display: 'flex',
           flexDirection: 'column',
          }}
          noValidate
          autoComplete="off"
          onSubmit={submit}
        >
            <Grid sx={{ width: '100%' }}>
                <Typography component="h1" variant="h5">Mi Perfil de Mentor</Typography>
                <Grid item sx={{ mt: 3, mb: 2 }}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                    >
                        Subí tu foto!
                        <input
                          onChange={handleFileChange}
                          type="file"
                          hidden
                        />
                    </Button>
                    {selectedFile && (
                      <div style={{ width: "200px", margin: "auto" }}>
                        <p>Archivo: {selectedFile.name}</p>
                        <Box
                          sx={{
                            margin: 'auto',
                            overflow: 'hidden',
                          }}
                        >
                          <img src={URL.createObjectURL(selectedFile)} alt="Vista previa de la imagen" style={{ width: '100%', height: '100%' }} />
                        </Box>
                      </div>
                    )}
                </Grid>
                <Grid item sx={{ mt: 3, mb: 2 }}>
                    <TextField
                      value={mentorDescription}
                      onChange={handleChange}
                      name='mentorDescription'
                      id="filled-multiline-static"
                      label="Descripción"
                      multiline
                      rows={5}
                      variant="filled"
                      fullWidth
                      required
                    />
                </Grid>
                <Grid item sx={{ mt: 3, mb: 2 }}>
                    <TextField
                      value={mentorAboutMe}
                      onChange={handleChange}
                      fullWidth 
                      id="filled-multiline-static"
                      name='mentorAboutMe'
                      label="Sobre mi..."
                      multiline
                      rows={10}
                      variant="filled"
                      required
                    />
                </Grid>
                <Grid item sx={{ mt: 3, mb: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Basic date picker" value={mentorDate}
                    onChange={(date) => setNewMentor({ ...newMentor, mentorDate: date.toISOString() })}/>
                      </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item sx={{ mt: 3, mb: 2 }}>
                    <TextField
                      value={mentorPrice}
                      onChange={handleChange}
                      fullWidth
                      id="outlined-basic"
                      name='mentorPrice'
                      label="Precio"
                      type='number'
                      variant="outlined" 
                      required
                    />
                </Grid>
                <Grid item>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                       Siguiente
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </Container>
  );
}

export default MentorForm;
