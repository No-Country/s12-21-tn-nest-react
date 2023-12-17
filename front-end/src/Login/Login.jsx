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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Login.css";

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
    signIn(data);
  });

  return (
    <>
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
            sx={{ textAlign: "center", margin: "1rem auto" }}
          >
            <AccountCircle sx={{ color: "white", mr: 1, my: 0.5 }} />
            <div
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TextField
                id="input-with-sx"
                label="Email"
                variant="standard"
                className="input-username"
                type="email"
                required
                {...register("email", { required: true })}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                InputProps={{
                  style: { color: "white", fontSize: "0.5em" },
                }}
              />
              {errors.email && (
                <p style={{ color: "#fa4444", fontSize: "1.8rem" }}>
                  Username is required
                </p>
              )}
            </div>
          </Box>
          <FormControl sx={{ m: 0 }} variant="outlined">
            <InputLabel
              sx={{ color: "white" }}
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
            <button className="btn" type="submit">
              <i className="animation"></i>Ingresa
              <i className="animation"></i>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
