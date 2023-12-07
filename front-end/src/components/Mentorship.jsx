import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Container, Grid } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link , useNavigate} from "react-router-dom";

const Mentorship = ({ location }) => {
  const { newUser, newMentor } = useLocation().state || {};
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

    console.log('Información de newUser en MentorshipForm:', newUser);
    console.log('Información de newMentor en MentorshipForm:', newMentor);
    console.log('Información de newMentorship en MentorshipForm:', newMentorship);
  
    try {
      const response = await axios.post('http://localhost:8080/api/Auth/register/mentor', {
  
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        password: newUser.password,
        role: newUser.role,
  
        mentorDescription: newMentor.mentorDescription,
        aboutMe: newMentor.mentorAboutMe,
        birthDate: newMentor.mentorDate,
        price: newMentor.mentorPrice,
  
        categories: [newMentorship.mentorCategory],
        speciality: newMentorship.mentorSpeciality,
      });
  
      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
  
    } catch (error) {
      console.error('Error al enviar la información al servidor:', error);
    }
  };


  return (
    <div>
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
          {/* Mapear las especialidades desde el estado */}
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
          {/* Mapear las especialidades desde el estado */}
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
}
export default Mentorship