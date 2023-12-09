import { useState, useEffect } from 'react';
import { Paper, Box, Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { urlApi } from '../../config/axios';

export const SpecialityFilter = ({ onSelectSpeciality }) => {
    const [specialities, setSpecialities] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const fetchSpecialities = async () => {
            try {
                const response = await urlApi.get('/mentor/speciality/filter');
                setSpecialities(response.data);
                console.log('Datos de especialidades:', response.data);
            } catch (error) {
                console.error('Error fetching especialities:', error);
            }
        };

        fetchSpecialities();
    }, []);

    const open = Boolean(anchorEl);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = (speciality) => {
        setAnchorEl(null);
        console.log('ID de especialidad seleccionada:', speciality);
        onSelectSpeciality(speciality); // Envía la especialidad seleccionada al componente padre
    };

    const handleSpecialitySelect = (speciality) => {
        onSelectSpeciality(speciality); // Envía la especialidad seleccionada al componente padre
        handleClose();
    };

    const ITEM_HEIGHT = 60;

    return (
        <Paper>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        width: '15rem',
                        justifyContent: 'space-between',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    Especialidades
                    <ArrowDropDownIcon />
                </Button>
                <Menu
                    id='category-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '11vw'
                        }
                    }}
                >
                    {specialities.map((speciality) => (
                        <MenuItem
                            key={speciality.id}
                            selected={speciality.name === 'Especialidad'}
                            onClick={() => handleClose(speciality.id)}
                        >
                            {speciality.name}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Paper>
    );
};
