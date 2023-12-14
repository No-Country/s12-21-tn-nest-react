import { useState } from 'react'
import MenuListDrawer from './MenuListDrawer'
import { AppBar, Box, Button, Container, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../images/logo-page.png'
import { NavLink } from 'react-router-dom';

export default function Menu({ navLinksArray }) {
  const [open, setOpen] = useState(false);

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
              {
                navLinksArray.map(item => (
                  <Button color='inherit' component={NavLink} key={item.title} to={item.path}>
                    {item.title}
                  </Button>
                ))
              }
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
