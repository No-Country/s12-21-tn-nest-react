import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import { useState } from "react";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const SignUp = ({ onUserTypeSelection }) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const switchShow = () => setShow(!show);
    const switchshowRepeatPassword = () => setShowRepeatPassword(!showRepeatPassword);
    const defaultTheme = createTheme();

    const [errors, setErrors] = useState({
        password: "",
        repeatPassword: "",
        email: "",
        userName: "",
        userLastName: "",
        userNumber: "",
        userType: "",
    });

    const [newUser, setNewUser] = useState({
        userName: "",
        userLastName: "",
        userEmail: "",
        userNumber: "",
        userPassword: "",
        userRepeatPassword: "",
        userType: "",
    })
    const { userName, userLastName, userEmail, userNumber, userPassword, userRepeatPassword, userType } = newUser
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
          userType: newType,
        });
        onUserTypeSelection(newType);
      };

    function Copyright(props) {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              MentorSphere
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    
      const submit = (e) => {
        e.preventDefault();
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
        }));
        if (!validateEmail()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: "Correo electrónico inválido",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            userNumber: "",
        }));
        if (userNumber.length < 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userNumber: "El número ingresado es inválido",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: "",
        }));
        if (!validatePassword()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Contraseña inválida. Requisitos: 8 a 20 caracteres, incluir 1 mayúscula, 1 minúscula y 1 número",
            }));
            return;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            repeatPassword: "",
        }));
        if (userPassword !== userRepeatPassword) {
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
        if (!userType) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                userType: "Por favor, selecciona si quieres ser Mentor o Estudiante",
            }));
            return;
        }
        if (userType === 'mentor') {
            onUserTypeSelection('mentor');
          } else if (userType === 'student') {
            onUserTypeSelection('student');
          }
    };

    const validatePassword = () => {
        let validate_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
        return validate_password.test(userPassword);
      };
      const validateEmail = () => {
        const validate_email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return validate_email.test(userEmail);
    };


  return (
    <>
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
                        name="userName"
                        value={userName}
                        onChange={handleChange}
                        autoComplete="name"
                        autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                        required
                        fullWidth
                        id="userLastName"
                        label="Apellido"
                        name="userLastName"
                        value={userLastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="userEmail"
                        name="userEmail"
                        value={userEmail}
                        onChange={handleChange}
                        required
                        fullWidth
                        id="userEmail"
                        label="E-mail"
                        />
                    </Grid>
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="userNumber"
                        type='number'
                        name="userNumber"
                        value={userNumber}
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
                        name="userPassword"
                        label="Contraseña"
                        type={show ? "text" : "password"}
                        id="userPassword"
                        value={userPassword}
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
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
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
                value={userType}
                color="primary"
                exclusive
                onChange={handleTypeChange}
                aria-label="Platform"
                >
                <ToggleButton 
                value="mentor"  
                sx={{ backgroundColor: userType === 'mentor' ? '#4CAF50' : '#FFFFFF' }}>
                    Quiero ser Mentor
                </ToggleButton>
                <ToggleButton 
                value="student"
                sx={{ backgroundColor: userType === 'student' ? '#4CAF50' : '#FFFFFF' }}>
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
                Registrarme
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="./login" variant="body2">
                    ¿Ya tenes una cuenta? Ingresá!
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    </ThemeProvider>
        </>
  )
}

export default SignUp