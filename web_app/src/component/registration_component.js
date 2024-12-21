import React, { useState } from 'react';
import { TextField, Button, Typography, Box, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';

const Registration = () => {
    const [role, setRole] = useState('voter'); // Default role
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
        formData.append('role', role); // Ensure this is included
    
        if (role === 'candidate') {
            formData.append('message', message);
            formData.append('photo', photo);
        }
        if (!name || !section || !semester || !usn || !email || !role) {
            alert("Please fill in all required fields.");
            return;
        }
        // Log the formData for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            alert(response.data.message);
        } catch (error) {
            console.error("There was an error registering!", error);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Registration</Typography>
            <form onSubmit={handleSubmit}>
                <RadioGroup value={role} onChange={(e) => setRole(e.target.value)}>
                    <FormControlLabel value="voter" control={<Radio />} label="Register as Voter" />
                    <FormControlLabel value="candidate" control={<Radio />} label="Register as Candidate" />
                </RadioGroup>
                <TextField label="Name" fullWidth required onChange={(e) => setName(e.target.value)} />
                <TextField label="Section" fullWidth required onChange={(e) => setSection(e.target.value)} />
                <TextField label="Semester" fullWidth required onChange={(e) => setSemester(e.target.value)} />
                <TextField label="USN" fullWidth required onChange={(e) => setUsn(e.target.value)} />
                <TextField label="Email" type="email" fullWidth required onChange={(e) => setEmail(e.target.value)} />
                {role === 'candidate' && (
                    <>
                        <TextField label="Message to Voters" fullWidth multiline rows={4} onChange={(e) => setMessage(e.target.value)} />
                        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />
                    </>
                )}
                <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>Register</Button>
            </form>
        </Box>
    );
};

export default Registration;