import * as React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import {  Typography } from '@mui/material';
import { useLocation, Link , useNavigate} from "react-router-dom";
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';
import { urlApi } from '../../config/axios';

const StudentForm = ({ location }) => {
  const navigate = useNavigate();
  const {newUser} = useLocation().state || {};
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [categoryIds, setCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [newStudent, setNewStudent] = useState({
    studentImage: null,
    studentSpecility: "",
    studentCategories: [],
  })
  const { studentImage, studentCategories} = newStudent

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
    fetchCategories();
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
    try {
      let url = 'auth/register/student'
      const response = await urlApi.post( url , formData, {
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
    navigate('/login');
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
    <Container  style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>
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
