import { useEffect } from "react";
import { Card, Typography } from "@mui/material";

export const PayPalSuccessPage = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.close();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Card sx={{
                padding: "2rem",
                border: "2px solid #fff",
                textAlign: "center",
                background: "#389e2f32",
                color: "#fff",
                '@media (max-width: 600px)': {
                    padding: "1rem",
                    width: "90%",
                },
            }}>
                <Typography variant="h4" gutterBottom>
                    ¡Pago exitoso!
                </Typography>
                <Typography variant="body1">
                    Gracias por realizar la transacción. Tu pago ha sido procesado con éxito.
                </Typography>
            </Card>
        </div>
    );
};
