import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Navbar from './Navbar';

const Candidate_List = () => {
    const [candidates, setCandidates] = useState([]);

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

    return (
        <div>
            <Navbar />
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Candidates</Typography>
            {candidates.map((candidate) => (
                <Card key={candidate.usn} sx={{ marginBottom: 2 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={`http://localhost:5000/uploads/${candidate.photo}`}
                        alt={candidate.name}
                    />
                    <CardContent>
                        <Typography variant="h5">{candidate.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{candidate.message}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
        </div>
    );
};

export default Candidate_List;