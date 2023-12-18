import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
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


const Mentorship = ({ location }) => {
  const { newUser, newMentor } = useLocation().state || {};
  const navigate = useNavigate()
  const [categoryIds, setCategoryIds] = useState([]);
  const [newMentorship, setNewMentorship] = useState({
    mentorSpeciality: "",
    mentorCategory: [],
  })
  const [specialities, setSpecialities] = useState([]); //opciones especialidades
  const [categories, setCategories] = useState([]);  //opciones categorias
  const { mentorSpeciality, mentorCategory } = newMentorship

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "mentorSpeciality") {
      const selectedSpeciality = specialities.find((speciality) => speciality.name === value);
      setNewMentorship({
        ...newMentorship,
        mentorSpeciality: selectedSpeciality ? selectedSpeciality.id : "",
      });
    } else {
      setNewMentorship({
        ...newMentorship,
        [name]: value,
      });
    }
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
      let URLSpecialities = `mentor/speciality/filter`
      const response = await urlApi.get(URLSpecialities);
      setSpecialities(response.data);
    } catch (error) {
      console.error("Error al obtener las especialidades:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const URLCategories = `mentor/categories/filter`
      const response = await urlApi.get(URLCategories);
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  useEffect(() => {
    fetchSpecialities();
    fetchCategories();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', newMentor.mentorImage, newMentor.mentorImage.name);
    formData.append('mentorDescription', newMentor.mentorDescription);
    const { mentorSpeciality, mentorCategory } = newMentorship;
    formData.append('firstName', newUser.firstName);
    formData.append('lastName', newUser.lastName);
    formData.append('email', newUser.email);
    formData.append('phone', newUser.phone);
    formData.append('password', newUser.password);
    formData.append('role', newUser.role);
    formData.append('aboutMe', newMentor.mentorAboutMe);
    formData.append('birthDate', newMentor.mentorDate);
    formData.append('price', newMentor.mentorPrice);
    formData.append('speciality', mentorSpeciality);
    mentorCategory.forEach(val => {
      formData.append('categories[]', val);
    });

    console.log('FormData before sending:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      let url = 'Auth/register/mentor'
      const response = await urlApi.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
      navigate('/login');
    } catch (error) {
      console.error('Error al enviar la información al servidor:', error);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth="xs" sx={{ py: 2, mt: 10, borderRadius: "8px", backgroundColor: { sm: "#111B21" }, xs: "#0B141A", boxShadow: { sm: "0px 0px 5px 0px #FFF", xs: "none" } }}>

        {/* <div style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}> */}
        <FormControl sx={{ /* m: 1, minWidth: 100 */mt: 1, width: "100%" }}>
          <InputLabel id="demo-simple-select-autowidth-label">Especialidad</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={mentorSpeciality || specialities[0]}
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

        <FormControl sx={{ /* m: 1, width: 300 */mt: 1, width: "100%" }}>
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
            sx={{ mt: 3, mb: 2, color: "#FFF" }}
          >
            Terminar Registro
          </Button>
        </Grid>
        {/* </div> */}

      </Container>
    </ThemeProvider>
  );
}
export default Mentorship