import * as React from 'react';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import "./SignUp.css"
import MentorForm from '../components/MentorForm';
import StudentForm from '../components/StudentForm';

const SignUp = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const switchShow = () => setShow(!show);
    const switchshowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);
    const defaultTheme = createTheme();

    const [errors, setErrors] = useState({
        passwordError: "",
        repeatPassword: "",
        emailError: "",
        userName: "",
        userLastName: "",
        userNumber: "",
        userType: "",
    });

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        userRepeatPassword: "",
        role: "",
    })
    const { firstName, lastName, email, phone, password, userRepeatPassword, role } = newUser
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    const handleTypeChange = (_, newType) => {
        setNewUser({
          ...newUser,
          role: newType,
        });
    };
    
      const submit = (e) => {
        e.preventDefault();
        setErrors((prevErrors) => ({
            ...prevErrors,
            emailError: "",
        }));
        if (!validateEmail()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                emailError: "Correo electrónico inválido",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            userNumber: "",
        }));
        if (phone.length < 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userNumber: "El número ingresado es inválido",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            passwordError: "",
        }));
        if (!validatePassword()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: "Contraseña inválida. Requisitos: 8 a 20 caracteres, incluir 1 mayúscula, 1 minúscula y 1 número",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            repeatPassword: "",
        }));
        if (password !== userRepeatPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                repeatPassword: "Las contraseñas no coinciden",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            userType: "",
        }));
        if (role === 'mentor') {
            setNewUser((prevUser) => {
              return {
                ...prevUser,
                role: 'mentor', 
              };
            });
            console.log("Información del usuario en SignUp:", newUser);
            navigate('/mentorForm', { state:  newUser  });
          } else if (role === 'student') {
            setNewUser((prevUser) => {
              return {
                ...prevUser,
                role: 'student',
              };
            });
            navigate('/studentForm', { state: { newUser } });
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              userType: "Por favor, selecciona si quieres ser Mentor o Estudiante",
            }));
          }
    };

    const validatePassword = () => {
        let validate_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        return validate_password.test(password);
      };
      const validateEmail = () => {
        const validate_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return validate_email.test(email);
    };


  return (
    <>
    <div className='container'>
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Registrate
            </Typography>
            <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="userName"
                        label="Nombre"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                        autoComplete="name"
                        autoFocus
                        inputProps={{
                            minLength: 3, 
                          }}
                          InputProps={{
                            endAdornment: (
                              <span style={{ color: 'red' }}>
                                {firstName.length > 0 && firstName.length < 3 && 'Mínimo 3 caracteres'}
                              </span>
                            ),
                          }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="userLastName"
                        label="Apellido"
                        name="lastName"
                        value={lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        inputProps={{
                            minLength: 3, 
                          }}
                          InputProps={{
                            endAdornment: (
                              <span style={{ color: 'red' }}>
                                {lastName.length > 0 && lastName.length < 3 && 'Mínimo 3 caracteres'}
                              </span>
                            ),
                          }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="userEmail"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                        fullWidth
                        id="userEmail"
                        label="E-mail"
                        />
                    </Grid>
                    {errors.emailError && <p style={{ color: "red" }}>{errors.emailError}</p>}
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="userNumber"
                        type='number'
                        name="phone"
                        value={phone}
                        onChange={handleChange}
                        required
                        fullWidth
                        id="userNumber"
                        label="Número de teléfono"
                        />
                    </Grid>
                    {errors.userNumber && <p style={{ color: "red" }}>{errors.userNumber}</p>}
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type={show ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={switchShow} edge="end">
                                        {show ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    {errors.passwordError && <p style={{ color: "red" }}>{errors.passwordError}</p>}
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="userRepeatPassword"
                        label="Repetir Contraseña"
                        type={show ? "text" : "password"}
                        id="userRepeatPassword"
                        value={userRepeatPassword}
                        onChange={handleChange}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={switchShow} edge="end">
                                        {show ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </Grid>
                    {errors.repeatPassword && <p style={{ color: "red" }}>{errors.repeatPassword}</p>}
                </Grid>
                <ToggleButtonGroup
                value={role}
                color="primary"
                exclusive
                onChange={handleTypeChange}
                aria-label="Platform"
                >
                <ToggleButton 
                value="mentor"  
                sx={{ backgroundColor: role === 'mentor' ? '#4CAF50' : '#FFFFFF' }}>
                    Quiero ser Mentor
                </ToggleButton>
                <ToggleButton 
                value="student"
                sx={{ backgroundColor: role === 'student' ? '#4CAF50' : '#FFFFFF' }}>
                    Quiero ser Estudiante
                </ToggleButton>
                </ToggleButtonGroup>
                {errors.userType && <p style={{ color: "red" }}>{errors.userType}</p>}
                
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Siguiente
                    </Button>
                
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="./login">
                    ¿Ya tenes una cuenta? Ingresá!
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
    </ThemeProvider>
    </div>
        </>
  )
}

export default SignUp