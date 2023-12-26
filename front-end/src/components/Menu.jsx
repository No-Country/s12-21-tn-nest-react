import { useState, useEffect } from "react";
import MenuListDrawer from "./MenuListDrawer";
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/logo-page.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, signOut, mentorId, studentId } = useAuth();
  const navigate = useNavigate();
  console.log("isStudent", studentId, "isMentor", mentorId);


  const renderUserButtons = () => {
    if (user != null) {
      if (studentId && mentorId) {
        return [
          <>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/mentores"
          >
            Mentores
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/myMentorships"
          >
            Mentorías
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to={`/mentorProfile`}
          >
            Mentor Profile
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to={`/studentProfile`}
          >
            Student Profile
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            Cerrar Sesión
          </Button>
        </>
        ];
      } else if (mentorId && studentId === null) {
        return [
          <>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/mentores"
          >
            Mentores
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/myMentorships"
          >
            Mentorías
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to={`/mentorProfile`}
          >
            Mentor Profile
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/mentorToStudent"
          >
            Quiero ser estudiante
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            Cerrar Sesión
          </Button>
        </>
        ];
      } else if (studentId && mentorId === null) {
        return [
          <>
          <Button color="inherit" component={NavLink} to="/">
            Home
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/mentores"
          >
            Mentores
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/myMentorships"
          >
            Mentorías
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to={`/studentProfile`}
          >
            Student Profile
          </Button>
          <Button
            color="inherit"
            component={NavLink}
            to="/studentToMentor"
          >
            Quiero ser mentor
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              signOut();
              navigate("/");
            }}
          >
            Cerrar Sesión
          </Button>
        </>
        ];
      }
    }
    return [
      <>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={NavLink} to="/mentores">
          Mentores
        </Button>
        <Button color="inherit" component={NavLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={NavLink} to="/signUp">
          Registro
        </Button>
      </>
    ]
  };

  useEffect(() => {
  }, []);

  return (
    <Box
      component="header"
      sx={{ width: "100%", bgcolor: "#202C33" }}
      // data-aos="fade-down"
    >
      <Container>
        <AppBar
          position="static"
          sx={{ border: "none", boxShadow: "0", bgcolor: "#202C33", py: 1 }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              size="large"
              onClick={() => setOpen(true)}
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box component="div" sx={{ width: { xs: "140px", sm: "220px" } }}>
              <img src={logo} style={{ width: "100%" }} />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
            {renderUserButtons()}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          anchor="left"
          onClose={() => setOpen(false)}
          sx={{ display: { sm: "flex", md: "none" } }}
        >
          <MenuListDrawer
             renderUserButtons={renderUserButtons}
             NavLink={NavLink}
            setOpen={setOpen}
          />
        </Drawer>
      </Container>
    </Box>
  );
}
