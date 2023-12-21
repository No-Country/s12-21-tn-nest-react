import { useEffect } from "react";

export const PayPalSuccessPage = () => {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.close();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {/* Contenido opcional de la página de éxito */}
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por completar la transacción con PayPal.</p>
        </div>
    );
};