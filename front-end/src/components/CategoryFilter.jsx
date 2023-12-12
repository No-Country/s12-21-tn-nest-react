import React, { useState, useRef } from 'react';
import { ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Checkbox } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export const CategoryFilter = () => {
    const options = [
        'Back-End',
        'Front-End',
        'DevOps',
        'SQL',
        'Typescript',
        'Javascript',
        'Vue Js',
        'Java',
        'Docker',
        'Angular',
        'CSS',
        'HTML',
        'React',
        'Python',
        'Node Js'
    ];

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndices, setSelectedIndices] = useState([]);

    const handleMenuItemClick = (event, index) => {
        const selectedIndex = selectedIndices.indexOf(index);
        let newSelectedIndices = [];

        if (selectedIndex === -1) {
            newSelectedIndices = [...selectedIndices, index];
        } else if (selectedIndex === 0) {
            newSelectedIndices = selectedIndices.slice(1);
        } else if (selectedIndex === selectedIndices.length - 1) {
            newSelectedIndices = selectedIndices.slice(0, -1);
        } else if (selectedIndex > 0) {
            newSelectedIndices = [
                ...selectedIndices.slice(0, selectedIndex),
                ...selectedIndices.slice(selectedIndex + 1),
            ];
        }

        setSelectedIndices(newSelectedIndices);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <ButtonGroup variant="outlined" ref={anchorRef} sx={{
                maxWidth: '170px',
                '& .MuiButton-endIcon': {
                    color: '#25D366',
                },
                '&.MuiButtonGroup-groupedText': {
                    color: '#25D366',
                }
            }}>
                <Button onClick={handleToggle} endIcon={<ArrowDropDownIcon />} sx={{ '&:hover': { backgroundColor: 'transparent' }, '&.MuiButton-outlined': { color: '#fff', borderColor: '#25D366', padding: '.894rem 1.5rem' } }}>
                    {selectedIndices.length ? 'Categorías:' : 'Categorías:'}
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
                        <Paper
                            sx={{
                                backgroundColor: '#111B21',
                                color: '#fff',
                                maxHeight: '210px',
                                overflow: 'auto',
                                marginTop: '8px',
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem key={option} sx={{ color: '#fff' }} onClick={(event) => handleMenuItemClick(event, index)}>
                                            <Checkbox
                                                checked={selectedIndices.indexOf(index) !== -1}
                                                sx={{ color: '#25d366', '&.Mui-checked': { color: '#25d366' } }}
                                            />
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
    );
};
