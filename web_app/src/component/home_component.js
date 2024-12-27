import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './css/home_component.css';

const HomeComponent = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="home-container">
            <header className="hero-section">
    <h1 className='head'>Welcome to the College Election</h1>
    <div className="image-container">
    <p className="border-box justified-text">
    Here you can find information about candidates, register to vote,
    and participate in the election process. College elections play a vital
    role in shaping the student body's governance and ensuring their voices 
    are heard in decision-making processes. However, traditional methods of
    conducting college elections often encounter challenges that limit active
    participation. Introduction of eVoting technology from Right2Vote offers a
    revolutionary online voting solution, making college elections more accessible,
    engaging, inclusive, efficient, secure, and transparent.
</p>

        <img
            src="https://img.freepik.com/free-vector/online-voting-isometric-illustration-with-workspace-with-laptop-election-website-passport_1284-57757.jpg?t=st=1735307721~exp=1735311321~hmac=7bac737e4e05f768956766262fcc59bf488d8a89359909d326dd06f03713ad23&w=1060"
            alt="Election"
            className="home-image"
        />
    </div>
</header>
                <section className="info-section">
                    <div className="info-card">
                        <h2>Meet the Candidates</h2>
                        <p>Learn more about the candidates running for president and their visions for the college.</p>
                        <button className="info-button" >View Candidates</button>
                    </div>

                    <div className="info-card">
                        <h2>Register to Vote</h2>
                        <p>Make sure you're registered to participate in the election. It's quick and easy!</p>
                        <button className="info-button">Register Now</button>
                    </div>

                    <div className="info-card">
                        <h2>Election Details</h2>
                        <p>Find out when and where the election will take place, and how you can participate.</p>
                        <button className="info-button">Learn More</button>
                    </div>
                </section>
                {/* Footer */}
            <Footer />
                
            </div>
        </div>
    );
};

export default HomeComponent;