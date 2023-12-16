import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link , useNavigate} from "react-router-dom";
import { Box, Button, Chip, Container, Grid, OutlinedInput } from '@mui/material';
import { urlApi } from '../../config/axios';

const Mentorship = ({ location }) => {
  const { newUser, newMentor } = useLocation().state || {};
  const [categoryIds, setCategoryIds] = useState([]);
  const [newMentorship, setNewMentorship] = useState({
    mentorSpeciality: "", 
    mentorCategory: [],
  })
  const [specialities, setSpecialities] = useState([]); //opciones especialidades
  const [categories, setCategories] = useState([]);  //opciones categorias
  const [dayOptions, setDayOptions] = useState([]); //opciones dias
  const [hoursOptions, setHoursOptions] = useState([]); //opciones horas
  const { mentorSpeciality, mentorCategory } = newMentorship

  const [selectedDays, setSelectedDays] = useState([]);
  const [daySchedules, setDaySchedules] = useState([]);
 
  const handleDayChange = (event) => {
    const selectedDays = event.target.value;
    setSelectedDays(selectedDays);
    setDaySchedules((prevSchedules) => {
      const newSchedules = { ...prevSchedules };
      selectedDays.forEach((day) => {
        if (!newSchedules[day]) {
          newSchedules[day] = [""];
        }
      });
      return newSchedules;
    });
  };
  

  const handleScheduleChange = (day, index, value) => {
    setDaySchedules((prevSchedules) => {
      const newSchedules = { ...prevSchedules };
      newSchedules[day][index] = {
        dayWeek: dayOptions.find((d) => d.name === day).id,
        time: value,
      };
      return newSchedules;
    });
  };

  const addSchedule = (day) => {
    setDaySchedules((prevSchedules) => {
      const newSchedules = { ...prevSchedules };
      newSchedules[day] = [...newSchedules[day], ""]; // Inicializa con una cadena de texto
      return newSchedules;
    });
  };
  
  
  const removeSchedule = (day, index) => {
    setDaySchedules((prevSchedules) => {
      const newSchedules = { ...prevSchedules };
      newSchedules[day] = newSchedules[day].filter((_, i) => i !== index);
      return newSchedules;
    });
  };




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
  const fetchDayOptions = async () => {
    try {
      let URLDaysOptions = `quotes/days`
      const response = await urlApi.get(URLDaysOptions);
      setDayOptions(response.data);
    } catch (error) {
      console.error("Error al obtener las opciones de días:", error);
    }
  };
  const fetchHoursOptions = async () => {
    try {
      let URLHoursOptions = `quotes/hour`
      const response = await urlApi.get(URLHoursOptions);
      setHoursOptions(response.data);
    } catch (error) {
      console.error("Error al obtener las opciones de horas:", error);
    }
  };

  useEffect(() => {
    fetchSpecialities();
    fetchCategories();
    fetchDayOptions();
    fetchHoursOptions();
  }, []); 

  const submit = async (e) => {
    e.preventDefault();

    const mentor_availability = Object.entries(daySchedules).reduce((acc, [day, schedules]) => {
      schedules.forEach((schedule) => {
        if (schedule.time) {
          const [start, end] = schedule.time.split(' a ');
          acc.push({
            dayWeek: schedule.dayWeek,
            startDate: start,
            endDate: end,
          });
        }
      });
      return acc;
    }, []);
    
  
    console.log('mentor_availability:', mentor_availability);
  

    const formData = new FormData();
    formData.append('file', newMentor.mentorImage, newMentor.mentorImage.name);
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
      let url = 'Auth/register/mentor'
      const response = await urlApi.post( url , formData, {
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


{/* Day selection */}
<FormControl sx={{ m: 1, width: 300 }}>
  <InputLabel id="demo-multiple-select-label">Días de la semana</InputLabel>
  <Select
    labelId="demo-multiple-select-label"
    id="demo-multiple-select"
    multiple
    value={selectedDays}
    onChange={handleDayChange}
    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
    renderValue={(selected) => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.map((day) => (
          <Chip key={day} label={day} />
        ))}
      </Box>
    )}
  >
    {/* Use options from the fetched data */}
    {dayOptions.map((day) => (
      <MenuItem key={day.id} value={day.name}>
        {day.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>


// ... (código existente)

{/* Day schedule inputs */}
{selectedDays.map((day) => (
  <div key={day}>
    <Box sx={{ m: 1, width: 300 }}>
      <InputLabel id={`day-label-${day}`}>{day}</InputLabel>
      {daySchedules[day].map((schedule, index) => (
        <div key={index}>
          <FormControl>
            <InputLabel id={`time-label-${day}-${index}`}>Hora</InputLabel>
            <Select
  labelId={`time-label-${day}-${index}`}
  id={`time-input-${day}-${index}`}
  value={schedule.time || hoursOptions[0].name} // Asegúrate de que sea un valor válido
  onChange={(e) => {
    console.log('Selected Value in Select:', e.target.value);
    handleScheduleChange(day, index, e.target.value);
  }}
>
  {/* Use options from the fetched data */}
  {hoursOptions.map((hour) => (
    <MenuItem key={hour.id} value={hour.name}>
      {hour.name}
    </MenuItem>
  ))}
</Select>

          </FormControl>
          <Button onClick={() => removeSchedule(day, index)}>Eliminar</Button>
        </div>
      ))}
      <Button onClick={() => addSchedule(day)}>Agregar horario</Button>
    </Box>
  </div>
))}





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