import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';
import { urlApi } from '../../config/axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { Typography } from '@mui/material';

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


const StudentToMentor = ({ location }) => {
  const navigate = useNavigate()
 const { userId , signOut, obtenerIdDelMentor } = useAuth();
  const [categoryIds, setCategoryIds] = useState([]);
  const [newMentorship, setNewMentorship] = useState({
    mentorSpeciality: "",
    mentorCategory: [],
    file: null,
    mentorDescription: "",
    mentorAboutMe: "",
    mentorDate: "",
    mentorPrice: "",
  })
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [specialities, setSpecialities] = useState([]); //opciones especialidades
  const [categories, setCategories] = useState([]);  //opciones categorias
  const { mentorSpeciality, mentorCategory, mentorImage, mentorDescription, mentorAboutMe, mentorDate, mentorPrice } = newMentorship

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

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setNewMentorship({
        ...newMentorship,
        file: file,
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
    formData.append('file', selectedFile);
    formData.append('mentorDescription', mentorDescription);
    formData.append('userId', userId);
    formData.append('aboutMe', mentorAboutMe);
    formData.append('birthdate', mentorDate);
    formData.append('price', mentorPrice);
    formData.append('idSpeciality', mentorSpeciality);
    mentorCategory.forEach(val => {
      formData.append('Categories[]', val);
    });

    console.log('FormData before sending:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      let url = 'mentor/create'
      const response = await urlApi.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
      obtenerIdDelMentor(userId)
      navigate('/login');
    } catch (error) {
      console.error('Error al enviar la información al servidor:', error);
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth="xs" sx={{ py: 2, mt: 10, borderRadius: "8px", backgroundColor: { sm: "#111B21" }, xs: "#0B141A", boxShadow: { sm: "0px 0px 5px 0px #FFF", xs: "none" } }}>
      <Container maxWidth="sm" sx={{  mt: 5,pb:5,borderRadius: "8px", backgroundColor:{sm:"#111B21"},xs:"#0B141A",boxShadow:{sm:"0px 0px 5px 0px #FFF",xs:"none"} }}>
          <Box
            component="form"
            sx={{
              alignItems: 'center',
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
            }}
            noValidate
            autoComplete="off"
          >
            <Grid sx={{ width: '100%' }}>

              <Grid item sx={{ mt: 3, mb: 2 }}>
                <Button sx={{ color: "#FFF",mb:1 }}
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
                  <Box sx={{ mx:"auto"}} style={{ width: "200px"}}>
                    <Box
                      sx={{
                        margin: 'auto',
                        overflow: 'hidden',
                      }}
                    >
                      <img src={URL.createObjectURL(selectedFile)} alt="Vista previa de la imagen" style={{ width: '100%', height: '100%' }} />
                    </Box>
                  </Box>
                )}
              </Grid>
              <Grid item sx={{ mt: 3, mb: 2 }}>
                <TextField sx={{minHeight:"1rem"}}
                  value={mentorDescription}
                  onChange={handleChange}
                  name='mentorDescription'
                  id="filled-multiline-static"
                  label="Descripción"
                  multiline
                  rows={3}                            /* staba 5 */
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
                  rows={5}                            /* staba 10 */
                  variant="filled"
                  required
                />
              </Grid>
              <Grid item sx={{ mt: 3, mb: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Basic date picker" value={mentorDate} sx={{ color: "#25D366" }}
                      onChange={(date) => setNewMentorship({ ...newMentorship, mentorDate: date.toISOString() })} />
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
            </Grid>
          </Box>
        </Container>
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
      </Container>
    </ThemeProvider>
  );
}
export default StudentToMentor