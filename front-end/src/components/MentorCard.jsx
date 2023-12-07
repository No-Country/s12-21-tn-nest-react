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
            background: '#d8d2d2ca',
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
                    }}>
                        <Typography variant="h5" fontWeight="600" sx={{ fontSize: '2.25rem' }}>
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: '1.75rem' }}>
                            {speciality}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: '5px', fontSize: '1.25rem' }} >
                            {date}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-between', flex: 1 }}>
                <CardContent>
                    <Rating name="read-only" value={4} readOnly style={{ fontSize: '22px', marginBottom: '1.5rem' }} />
                    <Typography variant="body1" color="textPrimary" sx={{
                        fontSize: '1.24rem',
                        marginBottom: '1.35rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    }}>
                        {aboutMe}
                    </Typography>
                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        {categories.map((category, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                <img src={category.image} style={{ width: 40, height: 40 }} />
                                <Typography variant="body1" color="textPrimary" sx={{ fontSize: '1.24rem' }}>
                                    {category.name}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Chip label={`$${price}/h`} color='primary' sx={{ fontSize: '1.20rem' }} />
                    <Button variant='contained' sx={{ fontSize: '1.20rem' }} >
                        Contactar
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}