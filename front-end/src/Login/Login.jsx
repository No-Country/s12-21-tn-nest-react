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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from '@mui/icons-material/Lock';
import "./Login.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#25D366',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      paper: '#111b21',
      default: '#0B141A',
    },
  },
});
const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, signIn, errors: loginErrors } = useAuth();

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
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const login = handleSubmit((data) => {
    console.log(data);
    signIn(data);
  });

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Container component="section" sx={{display:"flex" ,alignItems:"center",justifyContent:"center" , minHeight:"70vh"}}>
          <Container maxWidth="xs" sx={{ border: {sm:"2px solid #25D366",xs:"none"},borderRadius:"8px",py:1,height:"100%",width:"100%" }}>
            {loginErrors.map((error, i) => (
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
                  sx={{
                    width: "100%",
                    /* display: "flex",
                    alignItems: "flex-start", */
                    /* margin: "3rem 0 3rem 0", */
                  }}
                >
                  {/* <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} /> */}
                  <div sx={{ /* display: "flex", flexDirection: "column" */ }}>
                    <TextField
                      sx={{/*  width: "19rem" */width: "100%", mt: 2 }}
                      id="input-with-sx"
                      label="Email"
                      variant="standard"
                      className="input-username"
                      required
                      {...register("email", { required: true })}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                      InputProps={{
                        style: { color: "white" },
                      }}
                    />
                    {errors.email && (
                      <p style={{ color: "#fa4444"/* , fontSize: "1.8rem" */ }}>
                        Username is required
                      </p>
                    )}
                  </div>
                </Box>
                <FormControl sx={{ /* m: 1, width: "20rem" */ width: "100%", mt: 2 }} variant="outlined">
                  <InputLabel
                    sx={{ /* fontSize: "1.8rem", marginBottom: "2rem", color: "white" */ }}
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
                  <Button type="submit" variant="contained" sx={{ color: "#FFF", width: "100%", my: 2 }}>
                    Ingresa
                  </Button>
                </div>
              </div>
            </form>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
