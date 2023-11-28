import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container, Grid, Typography } from '@mui/material';

const MentorForm = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);
  const [newMentor, setNewMentor] = useState({
    mentorImage: "",
    mentorDescription: "",
    mentorAboutMe: "",
    mentorPrice: "",
  })
  const { mentorImage, mentorDescription, mentorAboutMe, mentorPrice} = newMentor
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setSelectedFile(file);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(newMentor);
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
                          value={mentorImage}
                          onChange={handleFileChange}
                          type="file"
                          hidden
                        />
                    </Button>
                    {selectedFile && (
                        <div style={{width: "200px" , margin: "auto"}}>
                            <p>Archivo: {selectedFile.name}</p>
                            <Box
                            sx={{
                                margin: 'auto',
                                overflow: 'hidden',
                            }}
                            >
                            <img src={imagePreview} alt="Vista previa de la imagen" style={{ width: '100%', height: '100%' }} />
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
