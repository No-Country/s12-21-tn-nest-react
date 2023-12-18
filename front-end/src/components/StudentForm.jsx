import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';
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


const StudentForm = ({ location }) => {
  const navigate = useNavigate();
  const { newUser } = useLocation().state || {};
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
/*   const [specialities, setSpecialities] = useState([]); 
 */  const [newStudent, setNewStudent] = useState({
    studentImage: null,
    studentSpecility: "",
    studentCategories: [],
  })
  const { studentImage, studentCategories, studentSpecility } = newStudent

  /*   const fetchSpecialities = async () => {
      try {
        let URLSpecialties = `mentor/speciality/filter`
        const response = await urlApi.get(URLSpecialties);
        setSpecialities(response.data); 
      } catch (error) {
        console.error("Error al obtener las especialidades:", error);
      }
    }; */
  const fetchCategories = async () => {
    try {
      const URLCategories = `mentor/categories/filter`
      const response = await urlApi.get(URLCategories);
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setNewStudent({
        ...newStudent,
        studentImage: file,
      });
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  useEffect(() => {
/*     fetchSpecialities();
 */    fetchCategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newStudent.studentImage, newStudent.studentImage.name);

    const { role, firstName, lastName, password, email, phone } = newUser;

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('role', role);
    studentCategories.forEach(val => {
      formData.append('categories[]', val);
    });
    //formData.append('categories', studentCategories);
    /*     formData.append('speciality', newStudent.studentSpecility);
     */
    try {
      let url = 'auth/register/student'
      const response = await urlApi.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Validation Error:', error.response.data.message);
      } else {
        console.error('Error registering the student:', error);
      }
    }
  };


  const handleCategoryChange = (event) => {
    const selectedCategoryIds = event.target.value;
    setCategoryIds(selectedCategoryIds);
    setNewStudent({
      ...newStudent,
      studentCategories: selectedCategoryIds,
    });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="section" sx={{ mt: 3 }}>
        <Typography component="h1" variant="h4" sx={{ color: "#25D366" }}>Mi Perfil de Estudiante</Typography>
        <Container /* style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }} */ maxWidth="sm" sx={{ mt: 5, pb: 5, borderRadius: "8px", backgroundColor: { sm: "#111B21" }, xs: "#0B141A", boxShadow: { sm: "0px 0px 5px 0px #FFF", xs: "none" } }}>
          <Grid sx={{ width: '100%',pt:2 }}>
            {/* <Typography component="h1" variant="h5">Mi Perfil de Estudiante</Typography> */}
            <Grid item sx={{ mt: 3, mb: 2 }}>
              <Button sx={{ color: "#FFF" }}
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
              >
                Subí tu foto y completa tu perfil!
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

            <div>
              {/* <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Especialidad</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={studentSpecility}
          onChange={handleChange}
          autoWidth
          label="Especialidad"
          name="studentSpecility"
        >
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        {specialities.map((speciality) => (
            <MenuItem key={speciality.id} value={speciality.name}>
              {speciality.name}
            </MenuItem>
        ))}
        </Select>
      </FormControl> */}
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={studentCategories}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => (
                        <Chip key={id} label={categories.find(category => category.id === id)?.name} />
                      ))}
                    </Box>
                  )}

                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>

              </FormControl>


            </div>
            <Grid item>
              <Button
                type="submit"
                onClick={submit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, color: "#FFF" }}
              >
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default StudentForm