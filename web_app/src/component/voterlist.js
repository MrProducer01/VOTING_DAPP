import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
                <Typography variant="h4" sx={{ marginBottom: 2 }}>Voter List</Typography>
                <Card>
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>USN</TableCell>
                                        <TableCell>Section</TableCell>
                                        <TableCell>Semester</TableCell>
                                        <TableCell>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {voters.map((voter) => (
                                        <TableRow key={voter.usn}>
                                            <TableCell>{voter.name}</TableCell>
                                            <TableCell>{voter.usn}</TableCell>
                                            <TableCell>{voter.section}</TableCell>
                                            <TableCell>{voter.semester}</TableCell>
                                            <TableCell>{voter.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

export default VoterList;