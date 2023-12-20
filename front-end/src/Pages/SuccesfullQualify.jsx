import { Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const SuccesfullQualify = () => {
    // const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"))

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#111B21",
        paddingTop: "7rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "md",
          margin: "auto",
          borderRadius: "10px",
          backgroundColor: "#389e2f32",
          padding: "1rem",
        }}
        maxWidth="md"
      >
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Typography variant="h4" component="h2" color="white" gutterBottom>
            Gracias por calificar!
          </Typography>
          <Typography variant="body1" color="white" gutterBottom>
            Agradecemos tu tiempo y esfuerzo al calificar nuestro servicio. Tu
            retroalimentación nos ayuda a mejorar y brindarte la mejor
            experiencia posible.
          </Typography>
        </div>
        <div style={{ alignSelf: "flex-start" }}>
          <Button component={Link} to="/" variant="contained" color="success">
            Volver a página principal
          </Button>
        </div>
      </Container>
    </main>
  );
};
