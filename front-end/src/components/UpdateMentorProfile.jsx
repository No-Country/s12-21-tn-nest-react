import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button, Container, Grid } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UpdateMentorProfile = () => {
  const location = useLocation();
  const mentorInfo = location.state?.mentorInfo || {};
  const [editedInfo, setEditedInfo] = useState({
    mentorDescription: mentorInfo.mentorDescription || '', 
    aboutMe: mentorInfo.aboutMe || '',
    price: mentorInfo.price || '',
    categories: mentorInfo.categories || [],
    firstName: mentorInfo.userId.firstName || '',
    lastName: mentorInfo.userId.lastName || '',
    phone: mentorInfo.userId.phone || '',
  });
  const customTheme = createTheme({
    palette: {
      background: {
        default: '#FFFFFF', // Fondo blanco
      },
      text: {
        primary: '#000000', // Texto negro
      },
    },
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setEditedInfo((prevInfo) => {
      let updatedValue = value;
  
      // Format categories if the field is 'categories' and the value is an array
      if (field === 'categories' && Array.isArray(value)) {
        updatedValue = value.map(categoryObj => categoryObj.name);
      }
  
      return {
        ...prevInfo,
        [field]: updatedValue,
      };
    });
  };
  

  const handleSaveChanges = async () => {
    try {
        console.log('Edited Info:', editedInfo);
      await axios.put(`http://localhost:8080/api/mentor/profile/categories/update/5d93e6fd-8d99-47d8-884a-ce71faf78552`, editedInfo);
    } catch (error) {
      console.error('Error updating mentor information:', error);
    }
  };

  return (
    <ThemeProvider theme={customTheme} >
      <div style={{ backgroundColor: '#FFFFFF', color: '#FFFFFF' }}>
        <Container component="main" maxWidth="xs">
          <TextField
            label="Nombre"
            fullWidth
            value={editedInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Apellido"
            fullWidth
            value={editedInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            margin="normal"
          />
          <TextField
            label="Número de teléfono"
            fullWidth
            value={editedInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
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
<div>
            {editedInfo.categories.map((category, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <TextField
                  label="Category"
                  fullWidth
                  value={category.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  margin="normal"
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteCategory(index)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>


<Link to={`/mentorProfile/${mentorInfo.id}`}>
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
          </Link>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default UpdateMentorProfile;
