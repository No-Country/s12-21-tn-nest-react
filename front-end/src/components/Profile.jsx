import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const Profile = ({ match }) => {
  const [mentorInfo, setMentorInfo] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchMentorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mentor/filter/${id}`);
        setMentorInfo(response.data);
      } catch (error) {
        console.error('Error fetching mentor information:', error);
      }
    };

    fetchMentorInfo();
  }, [mentorId]);

  return (
    <div className={classes.root}>
      {mentorInfo && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Avatar alt={`${mentorInfo.firstName} ${mentorInfo.lastName}`} src={mentorInfo.file} className={classes.avatar} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4">{`${mentorInfo.firstName} ${mentorInfo.lastName}`}</Typography>
            <Typography variant="subtitle1">{mentorInfo.email}</Typography>
            {/* Otros campos de información */}
            <Typography variant="body1">{`Mentor Description: ${mentorInfo.mentorDescription}`}</Typography>
            <Typography variant="body1">{`About Me: ${mentorInfo.aboutMe}`}</Typography>
            {/* Agrega el resto de los campos de información */}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Profile;
