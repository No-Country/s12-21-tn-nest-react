import React, { useState } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import { SpecialityFilter } from '../components/SpecialityFilter'
import { OrderFilter } from '../components/OrderFilter'
import { MentorCardRenderer } from '../components/MentorCardRenderer'

export const MentoresPage = () => {
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    const handleSpecialityChange = (selectedId) => {
        setSelectedSpeciality(selectedId);
    };

    return (
        <Box sx={{
            width: '90%',
            maxWidth: '1400px',
            margin: '3rem auto',
            display: 'flex',
        }} >
            <Box>
                <Typography variant='h2' sx={{
                    color: '#25D366',
                    textAlign: 'left',
                    marginBottom: '2rem'
                }} >
                    Todos los mentores
                </Typography>
                <Paper
                    elevation={3}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        margin: '2rem 0',
                        backgroundColor: '#111B21',
                        gap: '3rem',
                    }}
                >
                    <SpecialityFilter onSelectSpeciality={handleSpecialityChange} />
                    <OrderFilter />
                </Paper>
                <MentorCardRenderer selectedSpeciality={selectedSpeciality} />
            </Box>
        </Box>
    )
}
