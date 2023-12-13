import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import { SpecialityFilter } from '../components/SpecialityFilter'
import { OrderFilter } from '../components/OrderFilter'
import { MentorCardRenderer } from '../components/MentorCardRenderer'
import { CategoryFilter } from '../components/CategoryFilter'
import { urlApi } from '../../config/axios'

export const MentoresPage = () => {
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [mentorsData, setMentorsData] = useState([])
    const [selectedOrder, setSelectedOrder] = useState('');

    //Filtro de especialidad:
    const handleSpecialityChange = (selectedSpeciality) => {
        setSelectedSpeciality(selectedSpeciality);
    };

    //Filtro de orden:
    const handleOrderChange = (selectedOrder) => {
        setSelectedOrder(selectedOrder);
        console.log(`Ordenando mentores por ${selectedOrder}`);
    };

    const handleFilterClick = async () => {
        //Aqui vamos a crear la funcion para el llamado al backend.
        try {
            let url = `mentor/filter?idSpeciality=${selectedSpeciality}&order=${selectedOrder}`;
            const response = await urlApi.get(url);
            setMentorsData(response.data);
            console.log('Respuesta del backend:', response.data);
        } catch (error) {
            console.error('Error al filtrar mentores:', error);
        }
    };

    //Funcion para la primera carga de dataMentors:
    useEffect(() => {
        const fetchAllMentors = async () => {
            try {
                const response = await urlApi.get('mentor/filter');
                setMentorsData(response.data);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        }

        fetchAllMentors();
    }, [])


    return (
        <Box sx={{
            width: '90%',
            maxWidth: '1400px',
            margin: '2rem auto',
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
                        boxShadow: '0px 0px 5px #25D366',
                        borderRadius: '10px',
                        width: '70%',
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1.75rem',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: '#111B21',
                    }}>
                        <SpecialityFilter onSelectSpeciality={handleSpecialityChange} />
                        <CategoryFilter />
                        <OrderFilter onOrderChange={handleOrderChange} />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#25D366',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#20A751',
                            },
                            fontSize: '.975rem',
                            padding: '0.5rem 1.5rem',
                        }}
                        onClick={handleFilterClick}
                    >
                        Filtrar
                    </Button>
                </Paper>
                <MentorCardRenderer mentorsData={mentorsData} />
            </Box>
        </Box>
    )
}
