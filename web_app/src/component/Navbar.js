import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from './css/logo.png'; 
import './css/navbar.css'; // Import the CSS file

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Logo and Title Container */}
                <div className="logo-title-container">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="logo" // Use a class for styling
                    />
                    <Typography variant="h6" className="navbar-title">
                        Right2Vote
                    </Typography>
                </div>
                <div className="nav-buttons">
                    <Button color="inherit" className="nav-button" component={Link} to="/">Home</Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/about">About Us</Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/candidate">Candidate List</Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/register">Register</Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/voting">Voting</Button>
                    <Button color="inherit" className="nav-button" component={Link} to="/admin">Admin</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;