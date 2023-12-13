import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { urlApi } from '../../config/axios'

export const SpecialityFilter = ({ onSelectSpeciality }) => {
    const [specialities, setSpecialities] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    const fetchSpecialities = async () => {
        try {
            const response = await urlApi.get('/mentor/speciality/filter');
            setSpecialities(response.data);
        } catch (error) {
            console.error('Error fetching specialities:', error);
        }
    };

    useEffect(() => {
        fetchSpecialities();
    }, []);

    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        const selectedSpeciality = specialities.find(spec => spec.id === selectedId);
        setSelectedSpeciality(selectedId);

        // Llamar a la función de devolución de llamada para enviar la especialidad seleccionada al componente padre
        onSelectSpeciality(selectedId);
    };

    return (
        <FormControl fullWidth sx={{
            maxWidth: '170px',
            '& .MuiInputLabel-root': {
                color: '#fff',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#25d366',
                },
                '&:hover fieldset': {
                    borderColor: '#20a751',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#25d366',
                },
            },
            '& .MuiSelect-icon': {
                color: '#25d366',
            },
            '& .MuiSelect-select.MuiSelect-select': {
                color: '#fff',
            },
            '& .MuiListItem-root.Mui-selected': {
                backgroundColor: '#25d366',
                color: '#fff',
            },
        }}>
            <InputLabel id="speciality-filter-label" htmlFor="speciality-filter" sx={{
                '& .MuiInputLabel-root': {
                    color: '#fff',
                },
                '&.Mui-focused': {
                    color: '#25D366',
                },
            }}>Especialidad</InputLabel>
            <Select
                labelId="speciality-filter-label"
                id="speciality-filter"
                value={selectedSpeciality}
                label="Especialidad"
                onChange={handleOptionChange}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 220,
                            backgroundColor: '#111B21',
                            color: '#fff',
                        },
                    },
                }}
            >
                {specialities.map((speciality) => (
                    <MenuItem key={speciality.id} value={speciality.id}>
                        {speciality.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
