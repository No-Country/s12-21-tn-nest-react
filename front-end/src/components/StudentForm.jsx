import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Container, Grid, Typography } from '@mui/material';
import { useLocation, Link , useNavigate} from "react-router-dom";

const StudentForm = ({ location }) => {
  const navigate = useNavigate();
  const {newUser} = useLocation().state || {};
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [categories, setCategories] = useState([]); 
  const [specialities, setSpecialities] = useState([]); 
  const [newStudent, setNewStudent] = useState({
    studentImage: null,
    studentSpecility: "",
    studentCategories: [],
  })
  const { studentImage, studentCategories, studentSpecility} = newStudent

  const fetchSpecialities = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/mentor/speciality/filter");
      setSpecialities(response.data); 
    } catch (error) {
      console.error("Error al obtener las especialidades:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/mentor/categories/filter");
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
    fetchSpecialities();
    fetchCategories();
  }, []); 

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newStudent.studentImage, newStudent.studentImage.name);
    console.log('Información de newUser en studentForm:', newUser);
    const {role, firstName, lastName,password, email, phone} = newUser
    console.log('Información de newUse.newuser en studentForm:', newUser);

    try {
      
      const response = await axios.post('http://localhost:8080/api/auth/register/student', {
        firstName,
        lastName,
        email,
        phone,
        password,
        role
      });
      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Validation Error:', error.response.data.message);
      } else {
        console.error('Error registering the student:', error);
      }
  }};

  return (
    <Container>
            <Grid sx={{ width: '100%' }}>
                <Typography component="h1" variant="h5">Mi Perfil de Estudiante</Typography>
                <Grid item sx={{ mt: 3, mb: 2 }}>
                    <Button
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
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Especialidad</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={studentSpecility}
          onChange={handleChange}
          autoWidth
          label="Especialidad"
          name="mentorSpeciality"
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
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Categorias</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={studentCategories}
          onChange={handleChange}
          autoWidth
          label="category"
          name="mentorCategory"
        >
        <MenuItem value="">
            <em>None</em>
        </MenuItem>
        {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
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
          sx={{ mt: 3, mb: 2 }}
        >
          Siguiente
        </Button>
      </Grid>
            </Grid>
    </Container>
  );
}

export default StudentForm