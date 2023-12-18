import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { urlApi } from '../../config/axios';

const CalendarWrapper = ({ children }) => (
  <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
    {children}
  </div>
);

const ContactMentor = () => {
  const { userId, studentId } = useAuth();
  const location = useLocation();
  const mentorId = location.state?.id || {};
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    if (date >= new Date()) {
      setSelectedDate(date);
      const isoFormattedDate = date.toISOString().split('T')[0];
      setFormattedDate(isoFormattedDate);
      console.log(isoFormattedDate);
    }
  };

  const handleSubmit = async (e) => {
   /*  e.preventDefault();
    const requestData = {
      studentId: studentId,
      mentorId: mentorId,
      selectedDate: formattedDate,
    };
    try {
      let url = ''
      const response = await urlApi.post( url, requestData );
      console.log('Respuesta.data del servidor:', response.data);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Validation Error:', error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
    navigate('/'); */
  };

  return (
    <div
      style={{
        color: '#FFF',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        border: '2px solid #00FF00', 
      }}
    >
      <h2 style={{ color: '#FFA500' }}>Selecciona la fecha para tu cita</h2>

      <div style={{ margin: '10px auto 20px', maxWidth: '300px' }}>
        <CalendarWrapper>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
          />
        </CalendarWrapper>
      </div>

      <div style={{ fontWeight: 'bold' }}>
        <p style={{ color: '#00FF00' }}>Fecha seleccionada: {formattedDate}</p>
      </div>

      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Enviar solicitud
      </button>
    </div>
  );
};

export default ContactMentor;
