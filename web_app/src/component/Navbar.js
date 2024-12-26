import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, color: '#fff' }}>
                    College Election App
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/candidate">Candidate List</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
                <Button color="inherit" component={Link} to="/voting">Voting</Button>
                <Button color="inherit" component={Link} to="/admin">Admin</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;