import React, { useState, useRef, useEffect } from 'react';
import { ButtonGroup, Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem, Checkbox } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { urlApi } from '../../config/axios';

export const CategoryFilter = ({ onSelectCategory }) => {
    const [open, setOpen] = useState(false);
    const [categoryData, setCategoryData] = useState([])
    const [selectedIndices, setSelectedIndices] = useState([]);
    const anchorRef = useRef(null);

    const fetchCategories = async () => {
        try {
            const response = await urlApi.get('mentor/categories/filter')
            setCategoryData(response.data)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleMenuItemClick = (event, categoryName) => {
        const selectedIndex = selectedIndices.indexOf(categoryName);
        let newSelectedIndices = [];

        if (selectedIndex === -1) {
            newSelectedIndices = [...selectedIndices, categoryName];
        } else {
            newSelectedIndices = selectedIndices.filter(name => name !== categoryName);
        }

        setSelectedIndices(newSelectedIndices);
        onSelectCategory(categoryName)
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
                width: '150px', minWidth: '150px',
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
                                    {categoryData.map((categories) => (
                                        <MenuItem key={categories.id} value={categories.id} sx={{ color: '#fff' }} onClick={(event) => handleMenuItemClick(event, categories.name)}>
                                            <Checkbox
                                                checked={selectedIndices.indexOf(categories.name) !== -1}
                                                sx={{ color: '#25d366', '&.Mui-checked': { color: '#25d366' } }}
                                            />
                                            {categories.name}
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
