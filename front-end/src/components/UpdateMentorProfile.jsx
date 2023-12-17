import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { urlApi } from '../../config/axios';
import { useAuth } from '../context/AuthContext';


const UpdateMentorProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mentorId } = useAuth();
  const mentorInfo = location.state?.mentorInfo || {};
  const [specialities, setSpecialities] = useState([]); //opciones del select
  const [categories, setCategories] = useState([]);  //opciones del select
  const [loadingSpecialities, setLoadingSpecialities] = useState(true);

  const [editedInfo, setEditedInfo] = useState({
    mentorDescription: mentorInfo.mentorDescription || '', 
    aboutMe: mentorInfo.aboutMe || '',
    price: mentorInfo.price || '',
/*     categories: mentorInfo.categories.map((category) => category.name) || [],
 */    firstName: mentorInfo.userId.firstName || '',
    lastName: mentorInfo.userId.lastName || '',
    phone: mentorInfo.userId.phone || '', 
    birthdate: mentorInfo.birthdate,
    speciality: mentorInfo.speciality || { id: '', name: '' }, 
    categories: mentorInfo.categories || [],
  });


  const fetchSpecialities = async () => {
    try {
      let URLSpecialties = `mentor/speciality/filter`
      const response = await urlApi.get(URLSpecialties);
      setSpecialities(response.data);
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
    } finally {
      setLoadingSpecialities(false);
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

  const customTheme = createTheme({
    palette: {
      background: {
        default: '#FFFFFF', // Fondo blanco
      },
      text: {
        primary: '#000000', // Texto negro
      },
    },
  });
  function getStyles(name, selectedCategories, theme) {
    return {
      fontWeight:
        selectedCategories.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  
  

  const handleChange = (field, value) => {
    setEditedInfo((prevInfo) => {
      let updatedValue = value;
  
      if (field === 'birthdate' && value instanceof Date) {
        updatedValue = value;
      } else if (field === 'speciality') {
        updatedValue = value;
      }
  
      return {
        ...prevInfo,
        [field]: updatedValue,
      };
    });
  };
  
  
  
  const handleSaveChanges = async () => {
    try {
      let url = `mentor/profile/update/${mentorId}`
      console.log(editedInfo);
      const categoryIds = editedInfo.categories.map((category) => category.id);
      console.log('Category IDs:', categoryIds);
      
      await urlApi.put(url , {
        ...editedInfo,
        speciality: editedInfo.speciality.id,
        categories: categoryIds, 
      });
      } catch (error) {
        console.error('Error updating mentor information:', error);
    }
  };
      

  return (
    <ThemeProvider theme={customTheme} >
      <div style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>
        <Container component="main" maxWidth="xs">
          <Grid item xs={12} sm={6}>
            <Avatar src={mentorInfo.image} className=""/>
          </Grid>
          <TextField
            label="Nombre"
            fullWidth
            value={editedInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Apellido"
            fullWidth
            value={editedInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Número de teléfono"
            fullWidth
            value={editedInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            margin="normal"
          />
          <TextareaAutosize
            label="Descripción"
            minRows={7}
            style={{ width: '100%', marginBottom: '16px' }}
            value={editedInfo.mentorDescription}
            onChange={(e) => handleChange('mentorDescription', e.target.value)}
            margin="normal"
          />
          <TextareaAutosize
            label="aboutMe"
            minRows={5}
            style={{ width: '100%', marginBottom: '16px' }} 
            value={editedInfo.aboutMe}
            onChange={(e) => handleChange('aboutMe', e.target.value)}
            margin="normal"
          />
          <TextField
            label="price"
            fullWidth
            value={editedInfo.price}
            onChange={(e) => handleChange('price', e.target.value)}
            margin="normal"
          />
          <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="mentorSpeciality-label">Especialidad</InputLabel>
              <Select
                  labelId="mentorSpeciality-label"
                  id="demo-simple-select-autowidth"
                  value={editedInfo.speciality.name}
                  onChange={(e) => handleChange('speciality', {
                    id: specialities.find((s) => s.name === e.target.value)?.id || '',
                    name: e.target.value,
                  })}
                  name="mentorInfo.speciality.name"
                  label="Especialidad"
                >
                  {specialities.map((specialityOption) => (
                    <MenuItem key={specialityOption.id} value={specialityOption.name}>
                      {specialityOption.name}
                    </MenuItem>
                  ))}
                </Select>
            </FormControl>
          <Link to={`/modifyMentorSpeciality`} state={{ mentorInfo }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 8 }}
                >
                  Modificar Especilidad
                </Button>
            </Link>
            <div>
  <FormControl sx={{ m: 1, width: 300 }}>
    <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={editedInfo.categories.map((category) => category.name)}
      onChange={(e) => {
        const selectedCategories = e.target.value.map((categoryName) => ({
          id: categories.find((cat) => cat.name === categoryName)?.id || '',
          name: categoryName,
        }));
        handleChange('categories', selectedCategories);
      }}
      input={<OutlinedInput id="select-multiple-chip" label="Categorías" />}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value, index) => (
            <Chip key={index} label={value} />
          ))}
        </Box>
      )}
    >
      {categories.map((category) => (
        <MenuItem
          key={category.id}
          value={category.name}
          style={getStyles(category.name, editedInfo.categories, customTheme)}
        >
          {category.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  <Link to={`/modifyMentorCategories`} state={{ mentorInfo }}>
    <Button variant="outlined" color="secondary" style={{ marginLeft: 8 }}>
      Modificar Categorías
    </Button>
  </Link>
</div>

          <Grid item sx={{ mt: 3, mb: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Fecha de Nacimiento"
                value={dayjs(editedInfo.birthdate)} 
                onChange={(date) => setEditedInfo({ ...editedInfo, birthdate: date.toISOString() })}
                slotProps={{ textField: { variant: 'outlined' } }}
                />
            </LocalizationProvider>
           </Grid>
           <Link to={`/mentorProfile/${mentorInfo.id}`}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Guardar Cambios
            </Button>
           </Link>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default UpdateMentorProfile;
