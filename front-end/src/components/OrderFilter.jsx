import { useRef, useState } from 'react'
import { ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem, Paper } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'


export const OrderFilter = () => {
  const options = ['Ordenar por:', 'Menor Precio', 'Mayor precio', 'A-Z', 'Z-A']

  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  }
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  }
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);

  }


  return (
    <>
      <ButtonGroup variant='contained' ref={anchorRef}>
        <Button onClick={handleClick}> {options[selectedIndex]} </Button>
        <Button
          size='small'
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose} >
                <MenuList autoFocusItem >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}
