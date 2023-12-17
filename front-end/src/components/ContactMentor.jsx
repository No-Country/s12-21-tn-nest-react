import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SchedulerComponent from './SchedulerComponent';
import { Box, Button, TextareaAutosize } from '@mui/material';

const ContactMentor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mentorId = location.state?.id || {};
  const [schedulerInfo, setSchedulerInfo] = useState([]);
  const [comments, setComments] = useState('');
  const idStudent = "0c7a806a-a6a1-4dfb-8218-4aa4fdee8097";
  //capturar id estudiante cuando arreglen el login
  //capturar rol name. Si es mentor, va a poder ver todos los campos. Si es estudiante, 
  // solo va a ver el calendario y un textarea de "comentarios"

  const handleSchedulerInfoChange = (info) => {
    setSchedulerInfo(info);
  };

  const handleChange = (value) => {
    setComments(value);
  }

  const submit = async () => {
    try {
      let url = `` //agregar la url
      const response = await urlApi.post(url);//enviar la variable con la info
      } catch (error) {
        console.error('Error updating mentor information:', error);
    }

  }
  

  return (
    <div>
      <Box>
        <SchedulerComponent onSchedulerInfoChange={handleSchedulerInfoChange} />
        <TextareaAutosize
          label="Comentarios para el mentor..."
          minRows={7}
          style={{ width: '100%', margin: '16px' }}
          value={comments}
          onChange={(e) => handleChange(e.target.value)}
          margin="normal"
        />
          <Button onClick={submit}>
            Enviar
          </Button>
      </Box>
    </div>
  )
}

export default ContactMentor