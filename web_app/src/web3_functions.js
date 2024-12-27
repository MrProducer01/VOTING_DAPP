import Web3 from "web3";
import VotingContract from './Voting.json';

const web3 = new Web3(window.ethereum);

async function connectWeb3() {
    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await VotingContract.networks[networkId];
    const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork.address
    );
    return { accounts, instance }
}

//function for using Metamask
async function connectWeb3Metamask(provider) {
    const web3 = new Web3(provider);
  
    try {
      // Request accounts from MetaMask using 'eth_requestAccounts'
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      if (!accounts || accounts.length === 0) {
        console.warn("MetaMask account connection is not confirmed.");
        return null;
      }
  
      const networkId = await web3.eth.net.getId();
      console.log("Injected web3 detected.", accounts, networkId);
  
      const deployedNetwork = await VotingContract.networks[networkId];
  
      if (!deployedNetwork) {
        console.error("Contract is not deployed on this network.");
        return null;
      }
  
      const instance = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork.address
      );
  
      return { accounts, instance };
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      return null;
    }
  }

async function registerCandidates(contract, account, _name, _usn, _candidateAddress) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods
            .registerCandidates(
                _name,
                _usn,
                _candidateAddress
            )
            .encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function whiteListAddress(contract, account, _voterAddress) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods.whiteListAddress(_voterAddress).encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }

    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function startVoting(contract, account) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods.startVoting().encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }

    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function stopVoting(contract, account) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods.stopVoting().encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function votingStarted(contractInstance, account) {
    try {
        let res2 = await contractInstance.methods.votingStatus().call();
        console.log("Res:",res2);
        return {error: false, message: res2}
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function getWinner(contractInstance, account) {
    try {
        console.log("Fetching winner details from contract...");

        const winners = await contractInstance.methods.getWinner().call();

        if (!Array.isArray(winners)) {
            console.error("Expected winners to be an array, but got:", winners);
            return { error: true, message: "Unexpected data format" };
        }

        const winnerDetails = winners.map(winner => ({
            name: winner.name || "",
            usn: winner.usn || "",
            votes: winner.votes || 0
        }));

        console.log("Winner Details:", winnerDetails);
        return { error: false, message: winnerDetails };
    } catch (error) {
        console.error("Error fetching winner details:", error.message || error);
        return { error: true, message: error.message || "Unknown error" };
    }
}

async function getAllCandidate(contractInstance, account) {
    try {
        let candidateList = []
        let res2 = await contractInstance.methods.getAllCandidate().call();

        for (let i = 1; i < res2.length; i++) {
            candidateList.push(res2[i])
        }

        console.log("listwww:", candidateList);
        return { error: false, message: candidateList }
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function getAllCandidateVotes(contractInstance) {
    try {
        // Call the getAllCandidateVotes function from the contract
        const { 0: usns, 1: votes } = await contractInstance.methods.getAllCandidateVotes().call();

        const candidatesWithVotes = usns.slice(1).map((usn, index) => ({
            usn: usn,
            votes: votes[index + 1] 
        }));

        console.log("Candidates with Votes:", candidatesWithVotes);
        return { error: false, message: candidatesWithVotes };
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message };
    }
}

async function putVote(contract, account, _candidateAddress) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods.putVote(_candidateAddress).encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

export {
    connectWeb3,
    connectWeb3Metamask,
    putVote,
    getAllCandidate,
    getWinner,
    registerCandidates,
    whiteListAddress,
    startVoting,
    stopVoting,
    getAllCandidateVotes,
    votingStarted,}