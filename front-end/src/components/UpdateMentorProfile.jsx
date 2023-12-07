import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateMentorProfile = () => {
  const location = useLocation();
  const mentorInfo = location.state?.mentorInfo || {};
  const [editedInfo, setEditedInfo] = useState({
    mentorDescription: mentorInfo.mentorDescription || '', 
    aboutMe: mentorInfo.aboutMe || '',
    price: mentorInfo.price || '',
    categories: mentorInfo.categories || '',
    firstName: mentorInfo.firstName || '',
    lastName: mentorInfo.lastName || '',
    phone: mentorInfo.phone || '',
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`http://localhost:8080/api/mentor/profile/categories/update/5d93e6fd-8d99-47d8-884a-ce71faf78552`, editedInfo);
      navigate('/mentorProfile/:id');
    } catch (error) {
      console.error('Error updating mentor information:', error);
    }
  };

  return (
    <div>
      <TextField
        label="Nombre"
        fullWidth
        value={editedInfo.firstName}
        onChange={(e) => handleChange('firstName', e.target.value)}
        margin="normal"
      />
      <TextField
        label="Descripción"
        fullWidth
        value={editedInfo.mentorDescription}
        onChange={(e) => handleChange('mentorDescription', e.target.value)}
        margin="normal"
      />
      <TextField
        label="aboutMe"
        fullWidth
        value={editedInfo.aboutMe}
        onChange={(e) => handleChange('aboutMe', e.target.value)}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={handleSaveChanges}>
        Guardar Cambios
      </Button>
    </div>
  );
};

export default UpdateMentorProfile;
