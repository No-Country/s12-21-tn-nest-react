import { Modal, Box, Typography, useMediaQuery } from '@mui/material';
import { urlApi } from '../../config/axios';

export const PagosDonativos = ({ open, onClose, name, userData, mentorPrice }) => {
    const isMobile = useMediaQuery('(max-width:600px)');

    
    const redirectPaymentGateway = async (gateway) => {

        try {
            switch (gateway) {
                case 'mercadoPago':
                    const mercadoPagoData = {
                        external_reference: userData.id,
                        value: "15.00",
                        email: userData.email, // Cambia esto por la propiedad correcta de email
                        brand_name: `${userData.firstName} ${userData.lastName}`,
                    };
                    const responseMercadoPago = await urlApi.post('mpago', mercadoPagoData);
                    console.log('Respuesta de Mercado Pago: ', responseMercadoPago.data);
                    break;

                case 'payPal':
                    const paypalData = {
                        reference_id: userData.id,
                        currency_code: 'USD',
                        value: "15.00",
                        brand_name: `${userData.firstName} ${userData.lastName}`,
                    };
                    const responsePayPal = await urlApi.post('paypal', paypalData);
                    console.log('Respuesta de PayPal: ', responsePayPal.data);
                    break;

                case 'stripe':
                    const stripeData = {
                        reference_id: userData.id,
                        currency_code: "MXN",
                        amount: Number(mentorPrice),
                        brand_name: `${userData.firstName} ${userData.lastName}`
                    };
                    try {
                        const responseStripe = await urlApi.post('stripe', stripeData);

                        // Se abre la URL de Stripe en una nueva ventana
                        if (responseStripe.data && responseStripe.data.url) {
                            const stripeUrl = responseStripe.data.url;
                            window.open(stripeUrl, '_blank');
                        } else {
                            console.error('No se recibió la URL de Stripe en la respuesta.');
                        }
                    } catch (error) {
                        console.error('Error al realizar la solicitud a Stripe:', error);
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error(`Error al realizar la solicitud a ${gateway}: `, error);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: '#ADD8E6',
                        boxShadow: 24,
                        p: 3,
                        textAlign: 'center',
                        borderRadius: '10px',
                    }}
                >
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
                            onClick={() => redirectPaymentGateway('mercadoPago')}
                            style={{ width: isMobile ? '70px' : '105px', height: isMobile ? '30px' : '35px' }}
                        />
                        <img
                            src="/PayPal.png"
                            alt="Pay Pal"
                            onClick={() => redirectPaymentGateway('payPal')}
                            style={{ width: isMobile ? '70px' : '95px', height: isMobile ? '50px' : '70px' }}
                        />
                        <img
                            src="/Stripe.png"
                            alt="Stripe"
                            onClick={() => redirectPaymentGateway('stripe')}
                            style={{ width: isMobile ? '70px' : '95px', height: isMobile ? '40px' : '55px' }}
                        />
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
