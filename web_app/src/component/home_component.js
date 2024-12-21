import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
//import './HomeComponent.css'; // Optional: for custom styles

const HomeComponent = () => {
    return (
        <div>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        College Election App
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/candidate">Candidate List</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                    <Button color="inherit" component={Link} to="/voting">Voting</Button>
                    <Button color="inherit" component={Link} to="/admin">Admin</Button>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <div className="home-content">
                <h1>Welcome to the College President Election</h1>
                <p>Your voice matters! Participate in the election and make a difference.</p>
                <img src="path_to_your_image.jpg" alt="Election" className="home-image" />
                <p>Here you can find information about candidates, register to vote, and participate in the election process.</p>
            </div>
        </div>
    );
};

export default HomeComponent;