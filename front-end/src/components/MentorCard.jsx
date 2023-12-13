import { CardMedia, Box, Card, Typography, CardContent, Chip, Rating, Button, CardActions } from '@mui/material'


export const MentorCard = ({ name, speciality, date, aboutMe, categories, price, mentorImage }) => {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: 370,
            height: 550,
            background: '#389e2f32',
            borderRadius: 3,
            
        }}>
            <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box style={{ position: 'relative', width: '100%' }}>
                    <CardMedia
                        component="img"
                        height='100%'
                        alt={`Imagen de ${name}`}
                        src={mentorImage}
                        sx={{
                            maxWidth: '100%',
                            maxHeight: 300,
                            borderRadius: 3,
                        }} />
                    <Box style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        color: 'white',
                        padding: '8px',
                        background: 'rgba(2, 44, 11, 0.144)',
                    }}>
                        <Typography variant="h5" fontWeight="600">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1">
                            {speciality}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: '5px' }} >
                            {date}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-between', flex: 1,  }}>
                <CardContent>
                    <Rating name="read-only" value={4} readOnly style={{ fontSize: '22px', marginBottom: '1rem' }} />
                    <Typography variant="body1" color="textPrimary" sx={{
                        marginBottom: '1rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        color: 'white'
                    }}>
                        {aboutMe}
                    </Typography>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        {categories.map((category, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <img src={category.image} style={{ width: 30, height: 30 }} />
                                <Typography variant="body1" color="white">
                                    {category.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-around', paddingBottom: '1rem' }}>
                    <Chip label={`$${price}/h`} color='success' />
                    <Button variant='contained' color='success' >
                        Contactar
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}