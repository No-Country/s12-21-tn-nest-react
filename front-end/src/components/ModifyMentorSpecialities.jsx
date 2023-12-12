import React from 'react'

const ModifyMentorSpecialities = () => {
    const createSpeciality = "localhost:8080/api/mentor/speciality/create"
  return (
    <div>ModifyMentorSpecialities</div>
  )
}

export default ModifyMentorSpecialities

/* 
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button, Container, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from "sweetalert2"
import whitReactContent from "sweetalert2-react-content"

const mySwal = whitReactContent(Swal)

const ModifyMentorCategories = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mentorInfo = location.state?.mentorInfo || {};
/*     const [editedInfo, setEditedInfo] = useState({
/*       categories: mentorInfo.categories.map(category => category.name) || [],
    }); */
   /*  const [specialities, setSpecialities] = useState(mentorInfo.speciality.name);
  const [categories, setCategories] = useState([]);

  const [newMentorshipInfo, setNewMentorshipInfo] = useState({
    mentorSpeciality: mentorInfo.speciality,
    mentorCategory: mentorInfo.categories?.map(category => category.name) || [],  
  });
  const { mentorSpeciality, mentorCategory } = newMentorshipInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMentorshipInfo({
        ...newMentorshipInfo,
        [name]: value,
    });
  };

  const fetchSpecialities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mentor/speciality/filter');
      setSpecialities(response.data);
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mentor/categories/filter');
      setCategories(response.data);
    } catch (error) {
      console.error('Error al obtener las categorias:', error);
    }
  };

  useEffect(() => {
    fetchSpecialities();
    fetchCategories();
  }, []);

  const deleteCategory = async (id) => {
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: 'Estas Seguro/a?',
      text: 'No podes revertir esta Accion!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Deseo Borrarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id);
        MySwal.fire('Borrado!', 'La categoría ha sido eliminada.', 'success');
      }
    });
  };

  const submit = async (e) => {
   
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>
    <FormControl sx={{ m: 1, minWidth: 100 }}>
      <InputLabel id="demo-simple-select-autowidth-label">Especialidad</InputLabel>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={mentorSpeciality}
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
        value={mentorCategory}
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
 
  </div>
  );
};

export default ModifyMentorCategories; */ */ */