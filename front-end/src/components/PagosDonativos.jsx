import { Modal, Box, Typography, useMediaQuery  } from '@mui/material'
import React from 'react'


export const PagosDonativos = ({ open, onClose, name }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#ADD8E6',
                    boxShadow: 24,
                    p: 3,
                    textAlign: 'center',
                    borderRadius: '10px'
                }}>
                    <Typography variant="h6" component="h2">
                        Elige la opción de pago para {name}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '.5rem',
                        }}
                    >
                        <img
                            src="/MPago.png"
                            alt="Mercado Pago"
                            style={{ width: isMobile ? '70px' : '105px', height: isMobile ? '30px' : '35px' }}
                        />
                        <img
                            src="/PayPal.png"
                            alt="Pay Pal"
                            style={{ width: isMobile ? '70px' : '95px', height: isMobile ? '50px' : '70px' }}
                        />
                        <img
                            src="/Stripe.png"
                            alt="Stripe"
                            style={{ width: isMobile ? '70px' : '95px', height: isMobile ? '40px' : '55px' }}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
