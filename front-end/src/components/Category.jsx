import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Container, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from "react";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'Programación',
    'Idiomas',
    'Ciencias Exactas',
    'Ciencias Naturales',
    'Ciencias Sociales',
  ];

function getStyles(name, userCategory, theme) {
  return {
    fontWeight:
    userCategory.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Category = () => {

    const [newMentor, setNewMentor] = useState({
        mentorImage: "",
        mentorDescription: "",
        mentorAboutMe: "",
        mentorPrice: "",
      })
      const { mentorImage, mentorDescription, mentorAboutMe, mentorPrice} = newMentor

  const theme = useTheme();
  const [userCategory, setUserCategory] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Categoría</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={userCategory}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, userCategory, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        <Grid item sx={{ mt: 3, mb: 2 }}>
            <TextField
              value={mentorPrice}
              onChange={handleChange}
              fullWidth
              id="outlined-basic"
              name='mentorPrice'
              label="Precio"
              type='number'
              variant="outlined" 
              required
            />
        </Grid>
    </div>
  );
}
export default Category