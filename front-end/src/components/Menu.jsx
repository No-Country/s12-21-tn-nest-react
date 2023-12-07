import { useState } from 'react'
import MenuListDrawer from './MenuListDrawer'
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import logo from '../images/logo-page.png'

const navLinks = [
  { title: 'Home', path: '#', icon: <HomeIcon /> },
  { title: 'Mentores', path: '#mentores', icon: <GroupAddIcon /> },
  { title: 'Mentorias', path: '#mentorias', icon: <SchoolIcon /> },
  { title: 'Login', path: '#login', icon: <LoginIcon /> },
  { title: 'Register', path: '#register', icon: <HowToRegIcon /> }
]

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <Box component='header' sx={{ width: '100%', bgcolor: '#202C33' }}>
      <Container>
        <AppBar position='static' sx={{ border: 'none', boxShadow: '0', bgcolor: '#202C33', py: 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color='inherit' size='large' onClick={() => setOpen(true)} sx={{ display: { sm: 'flex', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box component='div' >
              <img src={logo} style={{ width: 220 }} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
              {
                navLinks.map(item => (
                  <Button color='inherit' component='a' key={item.title} href={item.path}>
                    {item.title}
                  </Button>
                ))
              }
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer open={open} anchor='left' onClose={() => setOpen(false)} sx={{ display: { sm: 'flex', md: 'none' } }}>
          <MenuListDrawer navLinks={navLinks} />
        </Drawer>
      </Container>
    </Box>
  )
}
