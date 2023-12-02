import { CardMedia, Box, Card, Typography, CardContent, Chip, Rating, Button } from '@mui/material'


export const MentorCard = () => {
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
                        alt="Imagen del mentor"
                        src='https://avatars.preply.com/i/logos/i/logos/avatar_sm2918u40dr.jpg'
                        sx={{
                            maxWidth: '100%',
                            maxHeight: 420,
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
                            Nombre del mentor
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontSize: '1.75rem' }}>
                            Especialidad
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginBottom: '5px', fontSize: '1.25rem' }} >
                            Enero 20 / 2022
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: 4, justifyContent: 'space-between', flex: 1 }}>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                    <Rating name="read-only" value={4} readOnly/>
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
