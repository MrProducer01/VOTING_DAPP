import React, {useState, useEffect} from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Link,useNavigate } from 'react-router-dom';
import {registerCandidates, whiteListAddress, getAllCandidate, getWinner, startVoting, stopVoting,getAllCandidateVotes} from '../web3_functions'

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

    
    async function get_Winner(){
        console.log("name:", candidateName);
        let {message} = await getWinner(contractInstance, account);
        console.log("result:", message);
        setWinnerAddress(message.name)
    }
    async function fetchCandidatesWithVotes() {
        const result = await getAllCandidateVotes(contractInstance);
        if (!result.error) {
            setCandidatesWithVotes(result.message);
        } else {
            console.error("Error fetching candidates with votes:", result.message);
        }
    }

    return(
        <div style={{paddingTop: "18px", paddingLeft: "5%", paddingRight: "5%" }}>
            <div className='banner-area'style={{marginBottom: 20}} >
                <h1>WELCOME TO COLLEGE PRESIDENT ELECTION</h1>
            </div>
            <div >
                <div style={{float:"left", marginRight: 100}}>
                    <Card sx={{ width: 400 }}>
                        <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2} style={{marginTop: '10px'}}>
                            Register Candidate
                        </Typography>
                        <CardContent>
                            <TextField id="outlined-basic" label="Candidate name" variant="outlined" style={{width: '100%', marginBottom: '10px'}}
                                onChange={(e)=>setCandidateName(e.target.value)}/>
                            <TextField id="outlined-basic" label="Candidate UID" variant="outlined" style={{width: '100%',marginBottom: '10px'}}
                                onChange={(e)=>setCandidateUid(e.target.value)}/>
                            <TextField id="outlined-basic" label="Candidate Address" variant="outlined" style={{width: '100%'}}
                                onChange={(e)=>setCandidatAddress(e.target.value)}/>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={register_candidate}>Register Candidate</Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: 400, marginTop: 5, marginBottom: 5}}>
                        <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2} style={{marginTop: '10px'}}>
                            Register Voter
                        </Typography>
                        <CardContent>
                            <TextField id="outlined-basic" label="Register Voter" variant="outlined" style={{width: '100%'}}
                                onChange={(e)=>setVoterAddress(e.target.value)}/>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={register_voter}>Register Voter</Button>
                        </CardActions>
                    </Card>
                </div>
                <div>
                    <Card sx={{ width: 400}}>
                        <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2}>
                            Start Voting
                        </Typography>
                        <CardActions align="middle">
                            <Button variant="contained" onClick={start_voting}>Start Voting</Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: 400, marginTop: 5}}>
                        <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2}>
                            Stop Voting
                        </Typography>
                        <CardActions>
                            <Button variant="contained" onClick={stop_voting}>Stop Voting</Button>
                        </CardActions>
                    </Card>

                    <Card sx={{ maxWidth: 400, marginTop: 5}}>
                        <CardContent>
                            <TextField id="outlined-basic" label={winnerAddress} variant="outlined" disabled style={{width: '100%'}}/>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={get_Winner}>Get Wineer</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ maxWidth: 400, marginTop: 5 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2}>
                                View Candidates with Votes
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" onClick={fetchCandidatesWithVotes}>Fetch Candidates</Button>
                        </CardActions>
                    </Card>

                    {candidatesWithVotes.length > 0 && (
            <Card sx={{ maxWidth: 400, marginTop: 5 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" align='left' paddingLeft={2}>
                    Candidates List
                    </Typography>
                    {candidatesWithVotes.map((candidate, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                     UID: {candidate.uid}, Votes: {candidate.votes.toString()} {/* Ensure votes is a string */}
                 </Typography>
                ))}
                </CardContent>
        </Card>
        )}
                    <Link to="/voterlist">
                 <Button variant="contained">Voterlist</Button>
                    </Link>

                    
                </div>
                
            </div>
      </div>
    )
}

export default AdminComponent