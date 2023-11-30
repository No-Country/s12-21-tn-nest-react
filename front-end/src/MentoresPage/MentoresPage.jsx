import { Box, Typography, Paper } from '@mui/material'
import React from 'react'
import { FilterBar } from '../components/FilterBar'
import { PriceFilter } from '../components/PriceFilter'

export const MentoresPage = () => {
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
                        margin: '1rem 0',
                        backgroundColor: '#111B21',
                        gap: '3rem'
                    }}
                >
                    <FilterBar />
                    <PriceFilter />
                </Paper>
            </Box>
        </Box>
    )
}
