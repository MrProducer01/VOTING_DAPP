import React, {useState, useEffect} from 'react';
import personImage from '../person.png'
import Card from '@mui/material/Card';
import { Link,useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {getAllCandidate, putVote, votingStarted} from '../web3_functions'

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
        // Update state to reflect error (optional: display error message)
      }
    }
  
    connect();
  }, [account, contractInstance,adminAddress,navigate]);
  

  async function vote(candidate){
    let result = await putVote(contractInstance, account, candidate.candidateAddress);
    console.log("result:", result);
  }
  
  // const isAdmin = (adminAddress) => {
  //   return account === adminAddress;
  // };

  return (
    <div style={{paddingTop: "18px", paddingLeft: "5%",paddingRight: "5%" }}>
        <div className='banner-area'style={{marginBottom: 20}} >
          <h1>WELCOME TO PRESIDENT ELECTION</h1>
        </div>
        <div>
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
                      <Button variant="contained" onClick={(e)=>vote(candidate)}>Vote</Button>
                    </CardActions>
                  </Card>
                )
              })
            ):(
              <h2>no candidate found!</h2>  
          )} 
          {/* <Link to="/admin" style={{ marginTop: 20 }}>
            <Button variant="contained">Admin</Button>
          </Link> */}
        </div>
      </div>
      
  );
}

export default VoterComponent;
