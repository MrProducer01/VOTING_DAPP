import React from 'react';
import './css/AboutUs.css';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutUs = () => {
    return (
        <div>
            <Navbar />
            <div className="about-container">
                <header className="about-hero">
                    <h1>About Us</h1>
                    <p>Revolutionizing college elections with a secure, transparent, and decentralized voting system.</p>
                </header>

                <div className="about-section-wrapper">
                    <div className="about-section">
                        <h2>What is a Decentralized Voting System?</h2>
                        <p>
                            A decentralized voting system leverages blockchain technology to ensure secure, tamper-proof, and transparent elections. 
                            Unlike traditional voting methods, decentralized systems store votes in an immutable ledger, 
                            making it nearly impossible to alter results or compromise voter anonymity.
                        </p>
                    </div>

                    <div className="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to empower students by providing a fair and efficient voting platform. 
                            We aim to foster trust in the election process and encourage greater participation in democratic
                            practices within the college.
                        </p>
                    </div>

                    <div className="about-section">
                        <h2>Why Choose Our System?</h2>
                        <p>
                            Traditional voting methods are often prone to errors, delays, and potential fraud. 
                            By utilizing our decentralized system, we eliminate these issues, providing a platform that is 
                            not only secure but also user-friendly and efficient. 
                            This ensures that every vote counts and every voice is heard.
                        </p>
                    </div>

                    <div className="about-section">
                        <h2>Key Features</h2>
                        <ul className="features-list">
                            <li>End-to-End Encryption for secure voting.</li>
                            <li>Transparent results accessible to all participants.</li>
                            <li>Immutable blockchain ledger ensuring data integrity.</li>
                            <li>Anonymous voting to protect voter identity.</li>
                            <li>Real-time vote counting and result publication.</li>
                        </ul>
                    </div>
                </div>

                <footer className="about-footer">
                    <p>Join us in creating a transparent and fair election process. Your vote, your voice!</p>
                </footer>
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;