import { useState } from 'react'
import { Paper, Box, Button, Menu, MenuItem } from '@mui/material'
import dataCategoriesJson from '../MentoresPage/categoriesData.json'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

export const ProfileFilter = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const ITEM_HEIGHT = 48;

    return (
        <Paper>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        width: '15rem',
                        justifyContent: 'space-between',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    Categorías
                    <ArrowDropDownIcon />
                </Button>
                <Menu
                    id='category-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '11vw'
                        }
                    }}
                >    {dataCategoriesJson.map((categoria) => (
                    <MenuItem key={categoria.id} selected={categoria.nombre === 'Frontend'} onClick={handleClose}>
                        {categoria.nombre}
                    </MenuItem>
                ))}
                </Menu>
            </Box>
        </Paper>
    )
}
