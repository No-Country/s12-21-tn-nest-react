import { useState, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import { SpecialityFilter } from '../components/SpecialityFilter'
import { OrderFilter } from '../components/OrderFilter'
import { MentorCardRenderer } from '../components/MentorCardRenderer'
import { CategoryFilter } from '../components/CategoryFilter'
import { urlApi } from '../../config/axios'

export const MentoresPage = () => {
    const [mentorsData, setMentorsData] = useState([])
    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedSpeciality, setSelectedSpeciality] = useState('');

    //Filtro de especialidad:
    const handleSpecialityChange = (selectedSpeciality) => {
        setSelectedSpeciality(selectedSpeciality);
    };

    //Filtro de orden:
    const handleOrderChange = (selectedOrder) => {
        setSelectedOrder(selectedOrder);
    };
    
    //Filtro de categoria:
    const handleCategoryChange = (categoryName) => {
        let updateCategories = [...selectedCategory]
        if (updateCategories.includes(categoryName)) {
            updateCategories = updateCategories.filter(name => name !== categoryName)
        } else {
            updateCategories.push(categoryName)
        }
        setSelectedCategory(updateCategories)
    }

    const handleFilterClick = async () => {
        //Aqui vamos a crear la funcion para el llamado al backend.
        try {
            let url = `/mentor/filter?idSpeciality=${selectedSpeciality}&order=${selectedOrder}&categoryName=${selectedCategory}`;
            const response = await urlApi.get(url);
            setMentorsData(response.data);
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
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '1rem',
                        margin: '1rem 0',
                        backgroundColor: '#111B21',
                        boxShadow: '0px 0px 5px #25D366',
                        borderRadius: '10px',
                        width: '100%',
                        gap: '1.2rem',
                        [`@media (min-width:600px)`]: {
                            width: '700px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.75rem',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: '#111B21',
                        [`@media (min-width:600px)`]: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        },
                    }}>
                        <SpecialityFilter onSelectSpeciality={handleSpecialityChange} />
                        <CategoryFilter onSelectCategory={handleCategoryChange} />
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
