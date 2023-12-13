import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link , useNavigate} from "react-router-dom";
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';


const Mentorship = ({ location }) => {
  const { newUser, newMentor } = useLocation().state || {};
  const [categoryIds, setCategoryIds] = useState([]);

  const [newMentorship, setNewMentorship] = useState({
    mentorSpeciality: "", 
    mentorCategory: [],
  })

  const [specialities, setSpecialities] = useState([]); 
  const [categories, setCategories] = useState([]); 

  const { mentorSpeciality, mentorCategory } = newMentorship

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMentorship({
        ...newMentorship,
        [name]: value,
    });
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryIds = event.target.value;
    setCategoryIds(selectedCategoryIds);
    setNewMentorship({
      ...newMentorship,
      mentorCategory: selectedCategoryIds,
    });
  };

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

  useEffect(() => {
    fetchSpecialities();
    fetchCategories();
  }, []); // 


  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newMentor.mentorImage, newMentor.mentorImage.name);
  
    const { role, firstName, lastName, password, email, phone } = newUser;
    const { mentorDescription, aboutMe, birthDate, price } = newMentor;
    const { mentorSpeciality, mentorCategory } = newMentorship;

    formData.append('firstName', newUser.firstName);
    formData.append('lastName', newUser.lastName);
    formData.append('email', newUser.email);
    formData.append('phone', newUser.phone);
    formData.append('password', newUser.password);
    formData.append('role', newUser.role);
    formData.append('mentorDescription', newMentor.mentorDescription);
    formData.append('aboutMe', newMentor.aboutMe);
    formData.append('birthDate', newMentor.mentorDate);
    formData.append('price', newMentor.mentorPrice);
    mentorCategory.forEach(val => {
      formData.append('categories[]', val);
    });
    //formData.append('categories', studentCategories);
    formData.append('speciality', mentorSpeciality);
  
    try {
      const response = await axios.post('http://localhost:8080/api/Auth/register/mentor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      });
  
      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al enviar la información al servidor:', error);
    }
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
      
      <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>
          <Select
  labelId="demo-multiple-chip-label"
  id="demo-multiple-chip"
  multiple
  value={mentorCategory}
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
}
export default Mentorship