import React, { useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';

const CalendarWrapper = ({ children }) => (
  <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
    {children}
  </div>
);

const CalendarTest = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [formattedDate, setFormattedDate] = useState('');
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const isoFormattedDate = date.toISOString().split('T')[0];
    setFormattedDate(isoFormattedDate);
    console.log(isoFormattedDate);
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
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
      <h2 style={{ color: '#FFA500' }}>Selecciona la fecha y la hora para tu cita</h2>

      <div style={{ margin: '0 auto 20px', maxWidth: '300px' }}>
        <h3 style={{ color: '#FFA500' }}>Fecha:</h3>
        <CalendarWrapper>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </CalendarWrapper>
      </div>

      <div style={{ margin: '0 auto 20px', maxWidth: '200px' }}>
        <h3 style={{ color: '#FFA500' }}>Hora:</h3>
        <TimePicker onChange={handleTimeChange} value={selectedTime} />
      </div>

      <div style={{ fontWeight: 'bold' }}>
        <p style={{ color: '#00FF00' }}>Fecha seleccionada: {formattedDate}</p>
        <p style={{ color: '#00FF00' }}>Hora seleccionada: {selectedTime}</p>
      </div>
    </div>
  );
};

export default CalendarTest;
