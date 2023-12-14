import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SchedulerComponent = ({ idMentor, idStudent }) => {
  const [selectedTime, setSelectedTime] = useState([]);
  const dates = [
    { day: 'lunes', timeStart: '10:00', timeEnd: '11:00'},
    { day: 'miércoles', timeStart: '19:00', timeEnd: '22:00' },
    { day: 'viernes', timeStart: '21:00', timeEnd: '22:00' },
    { day: 'viernes', timeStart: '22:00', timeEnd: '23:00' },
  ];


  const handleCellClick = (day, timeStart, timeEnd) => {
    const isSelected = isCellSelected(day, timeStart, timeEnd);
  
    if (isSelected) {
      // Si ya está seleccionado, eliminarlo
      const updatedSelectedTime = selectedTime.filter(
        (selected) => !(selected.day === day && selected.timeStart === timeStart && selected.timeEnd === timeEnd)
      );
      setSelectedTime(updatedSelectedTime);
    } else {
      // Si no está seleccionado, añadirlo
      setSelectedTime([...selectedTime, { day, timeStart, timeEnd }]);
    }
  };
  

  const isCellSelected = (day, timeStart, timeEnd) => {
    return selectedTime.some((selected) => {
      const isSelectedDay = selected.day === day;
  
      if (isSelectedDay) {
        const selectedStartTime = convertToMinutes(selected.timeStart);
        const selectedEndTime = convertToMinutes(selected.timeEnd);
        const cellStartTime = convertToMinutes(timeStart);
        const cellEndTime = convertToMinutes(timeEnd);
  
        const isOverlapping =
          (cellStartTime >= selectedStartTime && cellStartTime < selectedEndTime) ||
          (cellEndTime > selectedStartTime && cellEndTime <= selectedEndTime) ||
          (cellStartTime <= selectedStartTime && cellEndTime >= selectedEndTime);
  
        return isOverlapping;
      }
  
      return false;
    });
  };
  
  
  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };
  

  const guardarInformacion = () => {
    //Aca me asuguro de guardar la info en el formato adecuado, y despues hago la llamada al back
    const informacionGuardada = selectedTime.map(({ day, timeStart, timeEnd }) => ({
      day,
      timeStart,
      timeEnd,
    }));
  
    console.log('Información Guardada:', informacionGuardada);
  };

  
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Hora</TableCell>
            {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map((day) => (
              <TableCell key={day}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 17 }, (_, index) => index + 8).map((hour) => (
            <TableRow key={hour}>
              <TableCell>{`${hour}:00 - ${hour + 1}:00`}</TableCell>
              {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map((day) => {
                const cellData = dates.find((date) => date.day === day && date.timeStart === `${hour}:00`);
                const isSelected = isCellSelected(day, `${hour}:00`, `${hour + 1}:00`);
                const isColored = cellData !== undefined;

                return (
                  <TableCell
                    key={`${day}-${hour}`}
                    style={{ backgroundColor: isColored ? (isSelected ? 'blue' : 'green') : 'white' }}
                    onClick={() => handleCellClick(day, `${hour}:00`, `${hour + 1}:00`)}
                  >
                    {isColored ? 'Disponible' : ''}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SchedulerComponent;
