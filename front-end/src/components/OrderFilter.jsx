import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const OrderFilter = ({ onOrderChange }) => {
    const options = [
        { label: 'Menor Precio', id: 'asc' },
        { label: 'Mayor Precio', id: 'desc' },
        { label: 'A-Z', id: 'descAlf' },
        { label: 'Z-A', id: 'ascAlf' }
    ];

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        if (event && event.target) {
            const selectedOrder = event.target.value;
            setSelectedOption(selectedOrder);
            console.info(`You selected ${selectedOrder}`);

            onOrderChange(selectedOrder);
        }
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
            }}>Ordenar Por:</InputLabel>
            <Select
                labelId="speciality-filter-label"
                id="speciality-filter"
                value={selectedOption}
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
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
