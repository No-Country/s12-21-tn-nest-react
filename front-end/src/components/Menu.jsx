import { useState } from 'react'
import MenuListDrawer from './MenuListDrawer'
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo-page.png'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

export default function Menu({ navLinksArray }) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth(); // Use the useAuth hook to get the authentication status

  return (
    <Box component='header' sx={{ width: '100%', bgcolor: '#202C33' }} data-aos="fade-down">
      <Container>
        <AppBar position='static' sx={{ border: 'none', boxShadow: '0', bgcolor: '#202C33', py: 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton color='inherit' size='large' onClick={() => setOpen(true)} sx={{ display: { sm: 'flex', md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box component='div' sx={{ width: { xs: '140px', sm: '220px' } }}>
              <img src={logo} style={{ width: '100%' }} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
              {isAuthenticated ? (
                // Render links for authenticated users
                <>
                  {navLinksArray
                    .filter(item => item.title !== 'Login' && item.title !== 'Register')
                    .map(item => (
                      <Button color='inherit' component={NavLink} key={item.title} to={item.path}>
                        {item.title}
                      </Button>
                    ))}
                </>
              ) : (
                // Render links for non-authenticated users
                <>
                  {navLinksArray
                    .filter(item => item.title === 'Login' || item.title === 'Register' || item.title === 'Home' || item.title === 'Mentores')
                    .map(item => (
                      <Button color='inherit' component={NavLink} key={item.title} to={item.path}>
                        {item.title}
                      </Button>
                    ))}
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer open={open} anchor='left' onClose={() => setOpen(false)} sx={{ display: { sm: 'flex', md: 'none' } }}>
          <MenuListDrawer navLinksArray={navLinksArray} NavLink={NavLink} setOpen={setOpen} />
        </Drawer>
      </Container>
    </Box>
  )
}
