import React, { useState, useEffect } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Container } from '@mui/material';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// ...

const ModifyMentorCategories = () => {
    const location = useLocation();
    const mentorInfo = location.state?.mentorInfo || {};
    const [specialities, setSpecialities] = useState([]); //opciones del select
    const [speciality, setSpeciality] = useState(mentorInfo.speciality.name);//opcion seleccionada
  
    const [loadingSpecialities, setLoadingSpecialities] = useState(true);

  const fetchSpecialities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/mentor/speciality/filter');
      setSpecialities(response.data);
    } catch (error) {
      console.error('Error al obtener las especialidades:', error);
    } finally {
      setLoadingSpecialities(false);
    }
  };
  
    useEffect(() => {
      fetchSpecialities();
      console.log(speciality);
    }, []);
  
    const handleChange = (event) => {
      setSpeciality(event.target.value);
    };
  
    const submit = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/api/mentor/profile/categories/update/5d93e6fd-8d99-47d8-884a-ce71faf78552`, {
          speciality: speciality,
        });
  
        console.log('Respuesta del backend:', response.data);
        console.log("speciality final", speciality);
      } catch (error) {
        console.error('Error al enviar la especialidad al backend:', error);
      }
    };

      return (
        <div style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>
          <Container>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="mentorSpeciality-label">Especialidad</InputLabel>
              <Select
                labelId="mentorSpeciality-label"
                id="mentorSpeciality"
                value={loadingSpecialities ? '' : speciality}
                onChange={handleChange}
                label="Especialidad"
              >
                {specialities.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
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
          </Container>
        </div>
      );
    };
    
    export default ModifyMentorCategories;
  