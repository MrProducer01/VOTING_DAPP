// HomeComponent.js
import React from 'react';
import Navbar from './Navbar';
// import './HomeComponent.css';

const HomeComponent = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

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