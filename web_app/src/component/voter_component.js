import React, {useState, useEffect} from 'react';
import personImage from '../person.png'
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {getAllCandidate, putVote, votingStarted} from '../web3_functions'
import Navbar from './Navbar';
import  './css/voter_component.css';
import voterPageImage from './css/voterpage.jpg';

function VoterComponent({account, contractInstance}) {

  const [totalCandidate, setTotalCandidate] = useState([]);
  const [votingStatus, setVotingStatus] = useState(false);
  const adminAddress = "0xe4A74dCC1bd80d02d70A10958335384Ccb2a6f18";
  const navigate = useNavigate();

  
  useEffect(() => {
    async function connect() {
      try {
        // Check if the logged-in account is the admin
        // if (account.toLowerCase() === adminAddress.toLowerCase()) {
        //   navigate('/'); // Redirect to admin route
        //   return; // Exit the function early
        // }
        const status = await votingStarted(contractInstance, account);
        if (status.message) {
          const arr = await getAllCandidate(contractInstance, account);
          setTotalCandidate(arr.message);
          setVotingStatus(true);
        }
      } catch (error) {
        console.error("Error retrieving candidates:", error);
      }
    }
  
    connect();
  }, [account, contractInstance,adminAddress,navigate]);
  

  async function vote(candidate){
    let result = await putVote(contractInstance, account, candidate.candidateAddress);
    console.log("result:", result);
  }
  
  return (
    <div className='content-area1'>
            <Navbar />
    <div style={{paddingTop: "1px", paddingLeft: "5%",paddingRight: "5%" }}>
        <div className='banner-area'style={{marginBottom: 5}} >
          <h1>WELCOME TO PRESIDENT ELECTION</h1>
        </div>
        <div>
        <Card sx={{ display: 'flex', marginBottom: 5, borderRadius: '10px' }}>
        <CardMedia
          component="img"
          sx={{ width: '40%', height: 'auto', borderRadius: '16px 0 0 16px', objectFit: 'cover' }}
          image={voterPageImage}
          alt="Candidate"
        />
    <CardContent sx={{ flex: 1, paddingRight: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div>
      
      <Typography variant="body1" sx={{ fontSize: '1.35rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold' }}>
        The college president plays a crucial role in shaping the academic and social environment we experience. Your vote directly influences who will lead our institution, advocate for our needs, and guide its future direction.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.2rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', marginTop: 1 }}>
      Take a moment to review the candidates and their visions before making your choice. Voting is quick and easy, ensuring that everyone has the opportunity to participate in this important process.
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.2rem', textAlign: 'center', fontFamily: 'Roboto, sans-serif', marginTop: 1 }}>
      Your vote matters! Together, let’s choose the leaders who will represent our values and aspirations, making our college a better place for everyone.
      </Typography>
    </div>
    </CardContent>
      </Card>
        </div>
        <div className='content-area'>
          {
            votingStatus === false ? (
            
              <h2>Voting not started yet !!</h2>
            ):totalCandidate.length>0?(
              totalCandidate.map((candidate)=>{
                return(
                  <Card sx={{ maxWidth: 380, float: "left", marginLeft: 8, marginBottom: 8 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="340"
                        image={personImage}
                        alt="green iguana"
                        style={{paddingTop: 20}}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {candidate.name} 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {candidate.uid}<br/>
                          {candidate.address}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button className='custom-button' variant="contained" onClick={(e)=>vote(candidate)}>Vote</Button>
                    </CardActions>
                  </Card>
                )
              })
            ):(
              <h2>no candidate found!</h2>  
          )} 
        </div>
      </div>
    </div>
  );
}

export default VoterComponent;
