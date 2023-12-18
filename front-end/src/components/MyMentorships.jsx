import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Box,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../context/AuthContext';
import { urlApi } from '../../config/axios';

export const CalendarWrapper = ({ appointmentDate }) => {
  const formattedDate = new Date(appointmentDate);

  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '40px' }}>
      <Calendar
        value={formattedDate}
        calendarType="US"
        showNavigation={false}
        tileContent={({ date }) =>
          date.toISOString().split('T')[0] === formattedDate.toISOString().split('T')[0] ? (
            <div style={{ backgroundColor: 'green', borderRadius: '50%', height: '12px', width: '12px' }}></div>
          ) : null
        }
      />
    </div>
  );
};

const MyMentorships = () => {
  const [mentorshipData, setMentorshipData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { userId, studentId, mentorId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/quotes/filter/all/${studentId}`);
        const data = await response.json();
        setMentorshipData(data);
      } catch (error) {
        console.error('Error fetching mentorship data', error);
      }
    };

    fetchData();
  }, []);

  const getColorByState = (stateName) => {
    switch (stateName) {
      case 'Pendiente':
        return { bgColor: 'yellow', borderColor: 'yellow', textColor: 'black' };
      case 'Aceptada':
        return { bgColor: 'green', borderColor: 'green', textColor: 'white' };
      case 'Rechazada':
        return { bgColor: 'red', borderColor: 'red', textColor: 'white' };
      default:
        return { bgColor: 'white', borderColor: 'white', textColor: 'black' };
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <Grid container spacing={4}>
      {mentorshipData.map((mentorship) => (
        <Grid item key={mentorship.id} xs={12} sm={6} md={4}>
          <Card
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: `1px solid ${getColorByState(mentorship.state.name).borderColor}`,
              margin: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Centro todos los elementos
            }}
          >
            <Box
              style={{
                backgroundColor: getColorByState(mentorship.state.name).bgColor,
                padding: '8px',
                borderRadius: '4px 4px 0 0',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '8px',
              }}
            >
              <Chip
                label={mentorship.state.name}
                style={{
                  backgroundColor: getColorByState(mentorship.state.name).bgColor,
                  color: getColorByState(mentorship.state.name).textColor,
                }}
              />
            </Box>
            <CardContent style={{ textAlign: 'center', flex: '1', width: '100%', boxSizing: 'border-box', marginBottom: '16px' }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Avatar
                    src={mentorship.alumn.profileImg}
                    alt={`${mentorship.alumn.user.firstName} ${mentorship.alumn.user.lastName}`}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2" style={{ color: 'white', marginBottom: '8px' }}>
                    Alumno: {mentorship.alumn.user.firstName} {mentorship.alumn.user.lastName}
                  </Typography>
                  <Typography variant="body2" style={{ color: 'white', marginBottom: '8px' }}>
                    Email: {mentorship.alumn.user.email}
                  </Typography>
                </Grid>
              </Grid>
              {mentorship.textTime && (
                <Typography variant="body2" style={{ color: 'white', marginBottom: '8px' }}>
                  Hora: {mentorship.textTime}
                </Typography>
              )}
              {mentorship.textRejection && (
                <Typography variant="body2" style={{ color: 'white', marginBottom: '8px' }}>
                  Razón de rechazo: {mentorship.textRejection}
                </Typography>
              )}
              <Typography variant="h6">
                {new Date(mentorship.appointmentDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CalendarWrapper appointmentDate={mentorship.appointmentDate} />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyMentorships;
