import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { urlApi } from '../../config/axios';
import { useAuth } from '../context/AuthContext';

const UpdateStudentProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId , studentId} = useAuth();
  const studentInfo = location.state?.studentInfo || {};
  const [specialities, setSpecialities] = useState([]); //opciones del select
  const [categories, setCategories] = useState([]);  //opciones del select
  const [loadingSpecialities, setLoadingSpecialities] = useState(true);

  const [editedInfo, setEditedInfo] = useState({
/*     categories: mentorInfo.categories.map((category) => category.name) || [],
 */    firstName: studentInfo.user.firstName || '',
    lastName: studentInfo.user.lastName || '',
    phone: studentInfo.user.phone || '', 
/*     speciality: studentInfo.speciality || { id: '', name: '' }, 
 */    categoriesId: studentInfo.categories || [],
       email: studentInfo.user.email || '',
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
  
  const handleChange = (name, value) => {
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  
  
  const handleSaveChanges = async () => {
    try {
      let url = `alumn/${studentId}`
      console.log('Saving changes:', editedInfo);
      const categoryIds = editedInfo.categoriesId.map((category) => category.id);
      console.log('Category IDs:', categoryIds);
      
      await urlApi.patch(url , {
        ...editedInfo,
        categoriesId: categoryIds, 
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
            <Avatar src={studentInfo.image} className=""/>
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
          {/* <FormControl sx={{ m: 1, minWidth: 200 }}>
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
            </FormControl> */}
            <div>
  <FormControl sx={{ m: 1, width: 300 }}>
    <InputLabel id="demo-multiple-chip-label">Categorías</InputLabel>
    <Select
      labelId="demo-multiple-chip-label"
      id="demo-multiple-chip"
      multiple
      value={editedInfo.categoriesId.map((category) => category.name)}
      onChange={(e) => {
        const selectedCategories = e.target.value.map((categoryName) => ({
          id: categories.find((cat) => cat.name === categoryName)?.id || '',
          name: categoryName,
        }));
        handleChange('categoriesId', selectedCategories);
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
          style={getStyles(category.name, editedInfo.categoriesId, customTheme)}
        >
          {category.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>

        
           <Link to={`/studentProfile/${studentInfo.id}`}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                Guardar Cambios
            </Button>
           </Link>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default UpdateStudentProfile;
