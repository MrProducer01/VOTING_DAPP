import React, { useState } from 'react';
import { TextField, Typography, FormControlLabel, Switch, Button } from '@mui/material';
import axios from 'axios';
import './css/registration_component.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Registration = () => {
    const [isCandidate, setIsCandidate] = useState(false);
    const [name, setName] = useState('');
    const [section, setSection] = useState('');
    const [semester, setSemester] = useState('');
    const [usn, setUsn] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('section', section);
        formData.append('semester', semester);
        formData.append('usn', usn);
        formData.append('email', email);
        formData.append('role', isCandidate ? 'candidate' : 'voter');

        if (isCandidate) {
            formData.append('message', message);
            formData.append('photo', photo);
        }

        if (!name || !section || !semester || !usn || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            alert(response.data.message);
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="banner" style={{borderRadius:"10px"}}>
                    <h1>REGISTRATION</h1>
            </div>
            <div className="registration-container">
                <div className="image-section" />
                <div className="form-section">
                    <div className="switch-row">
                        <Typography variant="body1"  >Voter</Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isCandidate}
                                    onChange={() => setIsCandidate(!isCandidate)}
                                    color="primary"
                                />
                            }
                            label=""
                        />
                        <Typography variant="body1" >Candidate</Typography>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Section"
                            fullWidth
                            required
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                        />
                        <TextField
                            label="Semester"
                            fullWidth
                            required
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                        />
                        <TextField
                            label="USN"
                            fullWidth
                            required
                            value={usn}
                            onChange={(e) => setUsn(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {isCandidate && (
                            <>
                                <TextField
                                    label="Message to Voters"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                            </>
                        )}
                        <Button className='custom-button' type="submit" variant="contained" sx={{ marginTop: 2 }}>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Registration;
