import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default function MenuListDrawer({ navLinksArray, NavLink, setOpen  }) {
  return (
    <Box sx={{ width: 250, px: 2, height: '100%', bgcolor: '#202C33', color: '#fff' }}>
      <nav>
        <List >
          {
            navLinksArray.map((item) => (
              <ListItem disablePadding key={item.path}>
                <ListItemButton component={NavLink} to={item.path} onClick={() => setOpen(false)}>
                  <ListItemIcon sx={{ color: '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {item.title}
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </nav>
    </Box>
  )
}
