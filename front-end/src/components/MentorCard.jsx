import { CardMedia, Box, Card, Typography, CardContent, Chip, Rating, Button } from '@mui/material'


export const MentorCard = () => {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 680,
            maxHeight: 550,
            background: '#d8d2d2ca',
            borderRadius: 3,
            padding: 2,
            gap: 4,
        }}>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <CardMedia
                    component="img"
                    height='100%'
                    alt="Imagen del mentor"
                    src='https://avatars.preply.com/i/logos/i/logos/avatar_sm2918u40dr.jpg'
                    sx={{
                        maxWidth: 250,
                        maxHeight: 250,
                        borderRadius: '8%',
                        margin: '0.5rem',
                    }} />
                <Chip label="Especialidad" color='error' size='large' sx={{ fontSize: '1.5rem', height: '36px', padding: '8px 16px' }} />
                <Rating name="read-only" value={4} readOnly />
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-between', flex: 1 }}>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                    <Typography variant="h4" fontWeight="bold">
                        Nombre del Mentor
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        Enero 20 / 2022
                    </Typography>
                </Box>
                <CardContent>
                    <Typography variant="body1" color="textPrimary" marginBottom={5}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus tempore ut quo, dolores at modi labore eius sed atque culpa qui maiores quibusdam nisi quasi enim voluptatem temporibus explicabo. Asperiores!
                    </Typography>
                    <Box style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Typography variant="h6" fontWeight="bold">
                            Skills
                        </Typography>
                        <Box style={{ display: 'flex', gap: 4, justifyContent: 'space-around' }}>
                            <Chip color="success" label='React' sx={{ fontSize: '1.5rem', height: '36px', padding: '4px 4px' }} />
                            <Chip color="success" label='Javascript' sx={{ fontSize: '1.5rem', height: '36px', padding: '4px 4px' }} />
                            <Chip color="success" label='Typescript' sx={{ fontSize: '1.5rem', height: '36px', padding: '4px 4px' }} />
                        </Box>
                    </Box>
                </CardContent>
                <Button variant="outlined" fullWidth={false} sx={{ fontSize: '1rem', height: '48px', padding: '12px 24px' }}>
                    Contactar
                </Button>
            </Box>
        </Card>
    );
}
