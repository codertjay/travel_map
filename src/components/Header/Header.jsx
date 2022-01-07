import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, InputBase, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './styles';
import {Autocomplete} from '@react-google-maps/api';

const Header = ({onPlaceChanged, onLoad}) => {
        const classes = useStyles();

        return (
            <AppBar position={'static'}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant={'h5'} className={classes.toolbar}>
                        Travel Advisor
                    </Typography>
                    <Box display={'flex'}>
                        <Typography variant={'h7'}
                                    className={classes.toolbar}>
                            Explore new places
                        </Typography>
                        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase placeholder="Search…"
                                           classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                            </div>
                        </Autocomplete>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
;

export default Header;