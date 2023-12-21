
import { Modal, Box, Typography, useMediaQuery } from '@mui/material';
import { urlApi } from '../../config/axios';


export const PagosDonativos = ({ open, onClose, name, mentorData, mentorPrice }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    console.log(mentorPrice)


    const redirectPaymentGateway = async (gateway) => {
        try {
            switch (gateway) {
                case 'mercadoPago':
                    const mercadoPagoData = {
                        external_reference: "9def4c21-e187-48f2-bfaa-9ddf42f18670", //Id alumnhire 20/dec
                        value: "15.00",
                        email: mentorData.email,
                        brand_name: name
                    };
                    try {
                        const responseMercadoPago = await urlApi.post('mpago', mercadoPagoData);
                        console.log('Respuesta de Mercado Pago: ', responseMercadoPago.data);
                        console.log('Datos a enviar con mercadopagoData: ', mercadoPagoData)
                        if (responseMercadoPago.data && responseMercadoPago.data.url) {
                            const mercadoPagoUrl = responseMercadoPago.data.url;
                            window.open(mercadoPagoUrl, '_blank');
                        } else {
                            console.error('No se recibió la URL de Mercado Pago en la respuesta.');
                        }
                    } catch (error) {
                        console.error('Error al realizar la solicitud a Mercado Pago: ', error);
                    }
                    break;

                case 'payPal':
                    const paypalData = {
                        reference_id: "9def4c21-e187-48f2-bfaa-9ddf42f18670", //Id alumnhire 20/dec
                        currency_code: 'USD',
                        value: "15.00",
                        brand_name: name
                    };
                    try {
                        const responsePayPal = await urlApi.post('paypal', paypalData);

                        if (responsePayPal.data && responsePayPal.data.url) {
                            const payPalUrl = responsePayPal.data.url;
                            window.open(payPalUrl, '_blank');
                        } else {
                            console.error('No se recibió la URL de PayPal en la respuesta.');
                        }
                    } catch (error) {
                        console.error('Error al realizar la solicitud a PayPal: ', error);
                    }
                    break;

                case 'stripe':
                    const stripeData = {
                        reference_id: "9def4c21-e187-48f2-bfaa-9ddf42f18670", //Id alumnhire 20/dec
                        currency_code: "USD",
                        amount: mentorPrice,
                        brand_name: name
                    };
                    try {
                        const responseStripe = await urlApi.post('stripe', stripeData);
                        console.log('Respuesta de Stripe: ', responseStripe.data);
                        console.log('Datos a enviar con stripeData: ', stripeData)
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
