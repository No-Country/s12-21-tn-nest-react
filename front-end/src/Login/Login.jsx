import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div className="container-login">
      <div className="login-box">
        <Box
          sx={{ display: "flex", alignItems: "flex-end", fontSize: "2.4rem" }}
        >
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            sx={{ width: "24rem", fontSize: "2.4rem" }}
            id="input-with-sx"
            label="Username"
            variant="standard"
          />
        </Box>
        <br />
        <br />
        <FormControl
          sx={{ m: 1, width: "24rem", fontSize: "24px" }}
          variant="outlined"
        >
          <InputLabel
            sx={{ fontSize: "1.8rem", marginBottom: "2rem" }}
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
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div className="container-login__button">
          <Button className="login-button" variant="contained">
            Login
          </Button>
        </div>

        <p className="link-registerp">
          No tienes una cuenta? <Link to="/signUp">Registrate!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
