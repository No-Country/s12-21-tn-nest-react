import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useAuth } from '../context/AuthContext';
import { urlApi } from '../../config/axios';

const MyMentorships = () => {
  const [mentorshipData, setMentorshipData] = useState([]);
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
        return 'yellow';
      case 'Aceptada':
        return 'green';
      case 'Rechazada':
        return 'red';
      default:
        return 'white';
    }
  };

  return (
    <Grid container spacing={2}>
      {mentorshipData.map((mentorship) => (
        <Grid item key={mentorship.id} xs={12} sm={6} md={4}>
          <Card
            style={{
              backgroundColor: getColorByState(mentorship.state.name),
              color: 'black',
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <CalendarTodayIcon />
                  </Grid>
                  <Grid item>{new Date(mentorship.appointmentDate).toLocaleDateString()}</Grid>
                </Grid>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estado: {mentorship.state.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Alumno: {mentorship.alumn.user.firstName} {mentorship.alumn.user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {mentorship.alumn.user.email}
              </Typography>
              <img
                src={mentorship.alumn.profileImg}
                alt={`${mentorship.alumn.user.firstName} ${mentorship.alumn.user.lastName}`}
                style={{ width: '100%', marginTop: '8px', borderRadius: '4px' }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MyMentorships;
