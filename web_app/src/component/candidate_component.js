import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, TextField, Button } from '@mui/material';
import Navbar from './Navbar';
import candiImage from './css/9544563_4192364.jpg';

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

    const filteredCandidates = candidates.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        candidate.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.semester.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <Box sx={{ paddingLeft:2,paddingRight:2,paddingBottom:2 }}>
            <div className='banner-area'style={{marginBottom: 5}} >
          <h1>CANDIDATE LIST</h1>
        </div>
                
                <div>
                        <Card sx={{ display: 'flex', marginBottom: 2, borderRadius: '10px' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: '40%', height: 'auto', borderRadius: '16px 0 0 16px', objectFit: 'cover' }}
                    image={candiImage}
                    alt="Candidate"
                  />
                  <CardContent sx={{ flex: 1, paddingRight: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                    <Typography variant="h6" sx={{ fontSize: '1.55rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                    EXPLORE THE PROFILES OF CANDIDATES RUNNING FOR ELECTIONS
                     </Typography>
                      <Typography variant="h6" sx={{ fontSize: '1.35rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
                      Welcome to the Candidates Page for the upcoming College Election! Here, you’ll meet the individuals eager to represent and lead our student community. Each candidate brings unique ideas and a passion for enhancing campus life.
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.2rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', marginTop: 1 }}>
                      On this page, you’ll find their profiles outlining their goals and visions for our college. From academic improvements to community events, they aim to create a positive impact and address the needs of every student.
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: '1.2rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', marginTop: 1 }}>
                      Your vote matters in shaping our future. Take a moment to learn about the candidates and their plans. Together, let’s choose leaders who will make our college stronger and more united!
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
                        </div>
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
                        flexDirection: 'row',
                        marginBottom: 2, 
                        position: 'relative', 
                        boxShadow: 3,
                        marginLeft: 14,
                        marginRight: 20,
                        transition: '0.3s',
                        borderRadius: '16px', 
                        height: '400px', 
                        width: '100%', 
                        maxWidth: '85%', 
                        '&:hover': {
                            boxShadow: 6,
                            backgroundColor: '#f5f5f5',
                            transform: 'scale(1.02)',
                        }
                    }}
                >
                    <CardMedia
                        component="img"
                        sx={{ 
                            width: '45%', 
                            height: '100%', 
                            borderRadius: '16px 0 0 16px', 
                            objectFit: 'cover' 
                        }} 
                        image={`http://localhost:5000/uploads/${candidate.photo}`}
                        alt={candidate.name}
                    />
                    <CardContent sx={{ 
                        flex: 1, 
                        paddingRight: 2, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between' 
                    }}>
                        <div>
                            <Typography variant="h5" sx={{ fontSize: '1.5rem', textAlign: 'left' }}>{candidate.name}</Typography> {/* Align name to the left */}
                            <Typography variant="h6" sx={{ fontSize: '1.25rem', color: 'text.secondary', textAlign: 'left' }}>USN: {candidate.usn}</Typography> {/* Align USN to the left */}
                            
                            {/* Gradient Divider */}
                            <Box 
                                sx={{ 
                                    height: '2px', 
                                    background: 'linear-gradient(to right,rgb(190, 151, 219),rgb(87, 18, 155))', 
                                    margin: '10px 0' 
                                }} 
                            />
                            
                            <Typography variant="body1" sx={{ fontSize: '1rem' }}>{candidate.message}</Typography> {/* Font size for message */}
                        </div>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 'auto', fontSize: '1rem', textAlign: 'right' }}>
                            Semester: {candidate.semester} | Section: {candidate.section}
                        </Typography>
                    </CardContent>
                </Card>
                ))}
                <Button className='custom-button' variant="contained" 
                    color="primary" 
                    sx={{ marginTop: 2 }} component={Link} to="/voting">Vote Now</Button>
            </Box>
        </div>
    );
};

export default Candidate_List;