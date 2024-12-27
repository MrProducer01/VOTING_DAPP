import React, {useState, useEffect} from 'react';
import { TextField } from '@mui/material';
import { Card, CardActions, Typography, Button, IconButton,CardContent } from '@mui/material';
// import Alert from '@mui/material/Alert';
// import AlertTitle from '@mui/material/AlertTitle';
import { Link,useNavigate } from 'react-router-dom';
import {registerCandidates, whiteListAddress, getWinner, startVoting, stopVoting,getAllCandidateVotes} from '../web3_functions'
import Navbar from './Navbar';
import  './css/admin_component.css';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import PlayCircleFilledWhiteTwoToneIcon from '@mui/icons-material/PlayCircleFilledWhiteTwoTone';
import StopCircleTwoToneIcon from '@mui/icons-material/StopCircleTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import Footer from './Footer';
import PollTwoTone from '@mui/icons-material/PollTwoTone';
// const errorMsg = (
//     <Alert severity="error">
//         <AlertTitle>Error</AlertTitle>
//         This is an error alert — <strong>check it out!</strong>
//     </Alert>
// )


function AdminComponent({account, contractInstance}) {

    const [candidateName, setCandidateName] = useState();
    const [candidateUsn, setCandidateUsn] = useState();
    const [candidateAddress, setCandidatAddress] = useState();
    const [voterAddress, setVoterAddress] = useState();
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
        let result = await registerCandidates(contractInstance, account, candidateName, candidateUsn, candidateAddress);
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
            setWinnerDetails(message);
        } else {
            console.error("Error fetching winner details:", message);
            setWinnerDetails([]);
        }
    }
    return (
        <div className="admin-container">
          <Navbar />
          <div style={{ padding: "20px 5%" }}>
          <Card className="content-card" style={{ 
            paddingLeft: "5%", 
            paddingRight: "5%", 
            borderRadius: "20px", 
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
            backgroundColor: "#B7D3F2" 
            }}>
            <Card className="banner-card" style={{borderRadius:"10px"}}>
                    <h1>ADMIN CONTROL PANEL</h1>
            </Card>
      
              <div className="row">
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="start voting" onClick={start_voting}>
                    <PlayCircleFilledWhiteTwoToneIcon />
                </IconButton>
                    Start Voting
                  </Typography>
                  <CardActions>
                    <Button className='custom-button' variant="contained" onClick={start_voting}>Start Voting</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="stop voting" onClick={stop_voting}>
                        <StopCircleTwoToneIcon />
                    </IconButton>
                    Stop Voting
                  </Typography>
                  <CardActions>
                    <Button className='custom-button' variant="contained" onClick={stop_voting}>Stop Voting</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="voter list">
                        <PeopleAltTwoToneIcon  />
                    </IconButton>
                    Voter List
                  </Typography>
                  <CardActions>
                    <Button className='custom-button' variant="contained" component={Link} to="/voterlist">Voter List</Button>
                  </CardActions>
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                  <IconButton color="primary" aria-label="candidate list">
                        <AssignmentIndTwoToneIcon />
                    </IconButton>
                    Candidate List
                  </Typography>
                  <CardActions>
                    <Button className='custom-button' variant="contained" component={Link} to="/candidate">Candidate List</Button>
                  </CardActions>
                </Card>
              </div>
      
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
                      label="Candidate USN"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setCandidateUsn(e.target.value)}
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
                    <Button className='custom-button' variant="contained" onClick={register_candidate}>Register Candidate</Button>
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
                    <Button className='custom-button' variant="contained" onClick={register_voter}>Register Voter</Button>
                  </CardActions>
                </Card>
              </div>
      
              <div className="row">
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                    <IconButton color='primary' alt='winner'>
                    <EmojiEventsTwoToneIcon/>
                    </IconButton>
                    Winner Details
                  </Typography>
                  <CardActions>
                    <Button className='custom-button' variant="contained" onClick={get_Winner}>Get Winner</Button>
                  </CardActions>
                  {winnerDetails.map((winner, index) => (
                    <Typography key={index} style={{ padding: 10 }}>
                      Name: {winner.name}, USN: {winner.usn}, Votes: {winner.votes.toString()}
                    </Typography>
                  ))}
                </Card>
                <Card className="card">
                  <Typography variant="h5" className="card-title">
                    <IconButton color="primary" aria-label="candidate vote"><PollTwoTone/> </IconButton>
                    Candidates with Votes
                  </Typography>
                  <CardActions>
                    <Button className='custom-button' variant="contained" onClick={fetchCandidatesWithVotes}>Fetch Candidates</Button>
                  </CardActions>
                  {candidatesWithVotes.map((candidate, index) => (
                    <Typography key={index} style={{ padding: 10 }}>
                      USN: {candidate.usn}, Votes: {candidate.votes.toString()}
                    </Typography>
                  ))}
                </Card>
              </div>
            </Card>
          </div>
          <Footer />
        </div>
      );
}

export default AdminComponent;