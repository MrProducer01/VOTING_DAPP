import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Navbar from './Navbar';

const VoterList = () => {
    const [voters, setVoters] = useState([]);

    useEffect(() => {
        const fetchVoters = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/voters');
                setVoters(response.data);
            } catch (error) {
                console.error("Error fetching voters:", error);
            }
        };

        fetchVoters();
    }, []);

    return (
        <div>
            <Navbar />
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">Voter List</Typography>
            {voters.map((voter) => (
                <Card key={voter.usn} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{voter.name}</Typography>
                        <Typography variant="body2">Section: {voter.section}</Typography>
                        <Typography variant="body2">Semester: {voter.semester}</Typography>
                        <Typography variant="body2">USN: {voter.usn}</Typography>
                        <Typography variant="body2">Email: {voter.email}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
        </div>
    );
};

export default VoterList;