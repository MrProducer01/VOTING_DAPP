import React, {useState, useEffect} from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Box'
import { Card, CardActions, Typography, Button, IconButton,CardContent } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link,useNavigate } from 'react-router-dom';
import {registerCandidates, whiteListAddress, getAllCandidate, getWinner, startVoting, stopVoting,getAllCandidateVotes} from '../web3_functions'
import Navbar from './Navbar';
import  './css/admin_component.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop'; // Icon for Stop Voting
import PeopleIcon from '@mui/icons-material/People'; // Icon for Voter List
import PersonIcon from '@mui/icons-material/Person'; // Icon for Candidate List

const errorMsg = (
    <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
    </Alert>
)


function AdminComponent({account, contractInstance}) {

    const [candidateName, setCandidateName] = useState();
    const [candidateUid, setCandidateUid] = useState();
    const [candidateAddress, setCandidatAddress] = useState();
    const [voterAddress, setVoterAddress] = useState();
    const [winnerAddress, setWinnerAddress] = useState();
    const [winnerUid, setWinnerUid] = useState('');
    const [winnerVotes, setWinnerVotes] = useState('');
    const [winnerDetails, setWinnerDetails] = useState([]);
    const [candidatesWithVotes, setCandidatesWithVotes] = useState([]);
    const adminAddress = "0xe4A74dCC1bd80d02d70A10958335384Ccb2a6f18";
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the logged-in account is the admin
        // if (account.toLowerCase() !== adminAddress.toLowerCase()) {
        //     navigate('/'); // Redirect to home route
        //     return; // Exit the function early
        // }
    }, [account, navigate, adminAddress]);
   
    async function register_candidate(){
        console.log("name:", candidateName);
        let result = await registerCandidates(contractInstance, account, candidateName, candidateUid, candidateAddress);
        console.log("result:", result);
    }

    
    async function register_voter(){
        console.log("name:", candidateName);
        let result = await whiteListAddress(contractInstance, account, voterAddress);
        console.log("result:", result);
    }

    
    async function start_voting(){
        console.log("name:", candidateName);
        let result = await startVoting(contractInstance, account);
        console.log("result:", result);
    }

    
    async function stop_voting(){
        console.log("name:", candidateName);
        let result = await stopVoting(contractInstance, account);
        console.log("result:", result);
    }

    async function fetchCandidatesWithVotes() {
        const result = await getAllCandidateVotes(contractInstance);
        if (!result.error) {
            setCandidatesWithVotes(result.message);
        } else {
            console.error("Error fetching candidates with votes:", result.message);
        }
    }
    async function get_Winner() {
        console.log("Fetching winner details...");
        const { error, message } = await getWinner(contractInstance, account);
        if (!error) {
            setWinnerDetails(message); // Set winner details in state
        } else {
            console.error("Error fetching winner details:", message);
            setWinnerDetails([]); // Reset to an empty array on error
        }
    }
    return (
        <div className="admin-container">
          <Navbar />
          <div style={{ padding: "20px 5%" }}>
            <Card className="content-card" style={{ paddingLeft: "5%",paddingRight:"5%", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Card className="banner-card">
                    <h1>ADMIN CONTROL PANEL</h1>
            </Card>
      
              {/* First Row */}
              <div className="row">
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="start voting" onClick={start_voting}>
                    <PlayArrowIcon /> {/* PlayArrow is a start icon */}
                </IconButton>
                    Start Voting
                  </Typography>
                  <CardActions>
                    <Button variant="contained" onClick={start_voting}>Start Voting</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="stop voting" onClick={stop_voting}>
                        <StopIcon /> {/* Stop Icon */}
                    </IconButton>
                    Stop Voting
                  </Typography>
                  <CardActions>
                    <Button variant="contained" onClick={stop_voting}>Stop Voting</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="voter list">
                        <PeopleIcon /> {/* Voter List Icon */}
                    </IconButton>
                    Voter List
                  </Typography>
                  <CardActions>
                    <Button variant="contained" component={Link} to="/voterlist">Voter List</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="candidate list">
                        <PersonIcon /> {/* Candidate List Icon */}
                    </IconButton>
                    Candidate List
                  </Typography>
                  <CardActions>
                    <Button variant="contained" component={Link} to="/candidate">Candidate List</Button>
                  </CardActions>
                </Card>
              </div>
      
              {/* Second Row */}
              <div className="row">
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                    Register Candidate
                  </Typography>
                  <CardContent>
                    <TextField
                      label="Candidate Name"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCandidateName(e.target.value)}
                    />
                    <TextField
                      label="Candidate UID"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCandidateUid(e.target.value)}
                      style={{ marginTop: 10 }}
                    />
                    <TextField
                      label="Candidate Address"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCandidatAddress(e.target.value)}
                      style={{ marginTop: 10 }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" onClick={register_candidate}>Register Candidate</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                    Register Voter
                  </Typography>
                  <CardContent>
                    <TextField
                      label="Voter Address"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setVoterAddress(e.target.value)}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" onClick={register_voter}>Register Voter</Button>
                  </CardActions>
                </Card>
              </div>
      
              {/* Third Row */}
              <div className="row">
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                    Winner Details
                  </Typography>
                  <CardActions>
                    <Button variant="contained" onClick={get_Winner}>Get Winner</Button>
                  </CardActions>
                  {winnerDetails.map((winner, index) => (
                    <Typography key={index} style={{ padding: 10 }}>
                      Name: {winner.name}, UID: {winner.uid}, Votes: {winner.votes.toString()}
                    </Typography>
                  ))}
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                    Candidates with Votes
                  </Typography>
                  <CardActions>
                    <Button variant="contained" onClick={fetchCandidatesWithVotes}>Fetch Candidates</Button>
                  </CardActions>
                  {candidatesWithVotes.map((candidate, index) => (
                    <Typography key={index} style={{ padding: 10 }}>
                      UID: {candidate.uid}, Votes: {candidate.votes.toString()}
                    </Typography>
                  ))}
                </Card>
              </div>
            </Card>
          </div>
        </div>
      );
}

export default AdminComponent;