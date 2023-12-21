import React from "react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Box,
  TextField,
  Container,
  Button,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Login.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#25D366",
    },
    secondary: {
      main: "#FFFFFF",
    },
    background: {
      paper: "#111b21",
      default: "#0B141A",
    },
  },
});

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn, errors: loginErrors, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (MouseEvent) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  const login = handleSubmit((data) => {
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Container
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, color: '#fff' }}>Iniciar Sesión</Typography>
          <Container
            maxWidth="xs"
            sx={{
              border: { sm: "2px solid #25D366", xs: "none" },
              borderRadius: "8px",
              py: 1,
              height: "100%",
              width: "100%",
            }}
          >
            {loginErrors &&
              loginErrors.length > 0 &&
              loginErrors.map((error, i) => (
                <div
                  style={{
                    background: "red",
                    color: "white",
                    textAlign: "center",
                  }}
                  key={i}
                >
                  {error}
                </div>
              ))}
            <form className="container-login" onSubmit={login}>
              <div className="login-box">
                <Box
                  className="container-login__box"
                  sx={{
                    /* textAlign: "center", margin: "1rem auto" */ width:
                      "100%",
                  }}
                >
                  {/* <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} /> */}
                  <div
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      sx={{ width: "100%", mt: 2 }}
                      id="input-with-sx"
                      label="Email"
                      variant="standard"
                      className="input-username"
                      type="email"
                      required
                      {...register("email", { required: true })}
                      InputLabelProps={{
                        style: {
                          /* color: "white" */
                        },
                      }}
                      InputProps={{
                        style: {
                          /* color: "white", fontSize: "0.5em" */
                        },
                      }}
                    />
                    {errors.email && (
                      <p
                        style={{ color: "#fa4444" /* , fontSize: "1.8rem" */ }}
                      >
                        Username is required
                      </p>
                    )}
                  </div>
                </Box>
                <FormControl
                  sx={{ /* m: 0 */ width: "100%", mt: 2 }}
                  variant="outlined"
                >
                  <InputLabel
                    sx={
                      {
                        /* color: "white" */
                      }
                    }
                    htmlFor="outlined-adornment-password"
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          sx={{ color: "white" }}
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    inputProps={{
                      style: { color: "white" },
                    }}
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p style={{ color: "#fa4444", fontSize: "1.8rem" }}>
                      Password is required
                    </p>
                  )}
                </FormControl>
                <div>
                  {/* <button className="btn" type="submit">
                    <i className="animation"></i>Ingresa
                    <i className="animation"></i>
                  </button> */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ color: "#FFF", width: "100%", my: 2 }}
                  >
                    Ingresa
                  </Button>
                </div>
              </div>
            </form>
            <Typography
              variant="body1"
              sx={{
                color: "#FFF",
                textAlign: "center",
                mt: 2,
              }}
            >
              ¿No tienes una cuenta?{" "}
              <Link to="/signup" style={{ color: "#25D366" }}>
                ¡Regístrate aquí!
              </Link>
            </Typography>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
