import React, { useState, useEffect } from 'react';
import './App.css';
import VoterComponent from './component/voter_component';
import HomeComponent from './component/home_component'; // Import the HomeComponent
import AdminComponent from './component/admin_component';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connectWeb3Metamask } from './web3_functions';
import detectEthereumProvider from '@metamask/detect-provider';
import Registration from './component/registration_component';
import CandidateList from './component/candidate_component';
import VoterList from './component/voterlist';
//import  '.component/css/admin_component.css';
function App() {
  const [contractInstance, setContract] = useState(null);
  const [accounts, setAccounts] = useState();

  useEffect(() => {
    async function connect() {
      const provider = await detectEthereumProvider();
      try {
        if (provider) {
          console.log("Metamask found");
          let { accounts, instance } = await connectWeb3Metamask(provider);
          setAccounts(accounts);
          setContract(instance);
        } else {
          alert(
            `Metamask not found. Install metamask!!`
          );
        }
      } catch (error) {
        // -32002 error code means metamask is trying to take permission
        if (error.code !== -32002) {
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
        }
        console.log(error);
      }
    }
    connect();
  }, []);

  return (
    <div className="App">
      {contractInstance == null ? 
        <>
          <h2 style={{ textAlign: "center" }}> Loading Application </h2>
        </> :
        <>
          <BrowserRouter>
            <Routes>
              <Route index element={<HomeComponent />} /> {/* Set HomeComponent as the default route */}
              <Route path="/voting" element={<VoterComponent contractInstance={contractInstance} account={accounts[0]} />} />
              <Route path="/admin" element={<AdminComponent contractInstance={contractInstance} account={accounts[0]} />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/candidate" element={<CandidateList />} />
              <Route path="/voterlist" element={<VoterList />} />
            </Routes> 
          </BrowserRouter>
        </>}
    </div>
  );
}

export default App;