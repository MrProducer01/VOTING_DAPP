import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import Navbar from './Navbar';
import candiImage from './css/candi.png'; // Import the image

const Candidate_List = () => {
    const [candidates, setCandidates] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/candidates');
                setCandidates(response.data);
            } catch (error) {
                console.error("Error fetching candidates:", error);
            }
        };

        fetchCandidates();
    }, []);

    // Filter candidates based on search term
    const filteredCandidates = candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        candidate.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.semester.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" sx={{ marginBottom: 1, fontSize: '2.5rem' }}>Registered Candidates</Typography>
                
                {/* Decorative Image 
                <img 
                    src={candiImage} 
                    alt="Candidates Decoration" 
                    style={{ width: '100%', borderRadius: '8px', marginBottom: '20px', display: 'block', position: 'relative', left: '50%', transform: 'translateX(-50%)' }} 
                />*/}
                
                <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '1.25rem', color: 'text.secondary' }}>
                    Explore the profiles of candidates running for election.
                </Typography>
                <TextField
                    label="Search by Name, USN, or Semester"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                {filteredCandidates.map((candidate) => (
                    <Card 
                        key={candidate.usn} 
                        sx={{ 
                            display: 'flex', 
                            marginBottom: 2, 
                            position: 'relative', 
                            boxShadow: 3,
                            marginLeft: 20,
                            marginRight: 20,
                            transition: '0.3s',
                            borderRadius: '16px', // Set border radius for rounded edges
                            '&:hover': {
                                boxShadow: 6,
                                backgroundColor: '#f5f5f5',
                                transform: 'scale(1.02)',
                            }
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: '45%', height: 'auto', borderRadius: '16px 0 0 16px', objectFit: 'cover' }} // Round left edges of the image
                            image={`http://localhost:5000/uploads/${candidate.photo}`}
                            alt={candidate.name}
                        />
                        <CardContent sx={{ flex: 1, paddingRight: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <Typography variant="h5" sx={{ fontSize: '2.5rem', textAlign: 'left' }}>{candidate.name}</Typography> {/* Align name to the left */}
                                <Typography variant="h6" sx={{ fontSize: '3rem', color: 'text.secondary', textAlign: 'left' }}>USN: {candidate.usn}</Typography> {/* Align USN to the left */}
                                
                                {/* Gradient Divider */}
                                <Box 
                                    sx={{ 
                                        height: '2px', 
                                        background: 'linear-gradient(to right, #ff7e5f, #feb47b)', // Example gradient colors
                                        margin: '10px 0' 
                                    }} 
                                />
                                
                                <Typography variant="body1" sx={{ fontSize: '1rem' }}>{candidate.message}</Typography> {/* Font size for message */}
                            </div>
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 'auto', fontSize: '1rem', textAlign : 'right' }}>
                                Semester: {candidate.semester} | Section: {candidate.section}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
                <Button variant="contained" 
                    color="primary" 
                    sx={{ marginTop: 2 }} component={Link} to="/voting">Vote Now</Button>
            </Box>
        </div>
    );
};

export default Candidate_List;