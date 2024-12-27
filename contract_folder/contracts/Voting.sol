// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

contract Voting {

    address public owner;
    address public winnerAddress;
    string public eventName;
    uint public totalVote;
    bool votingStarted;

    struct Candidate {
        string name;
        string usn;
        bool registered;
        address candidateAddress;
        uint votes;
    }

    struct Voter {
        bool registered;
        bool voted;
    }

    struct WinnerInfo {
        string name;
        string usn;
        uint votes;
    }

    event success(string msg);
    mapping(address => uint) public candidates;
    Candidate[] public candidateList;
    mapping(address => Voter) public voterList;

    constructor(string memory _eventName) {
        owner = msg.sender;
        eventName = _eventName;
        totalVote = 0;
        votingStarted = false;
    }

    function registerCandidates(string memory _name, string memory _usn, address _candidateAddress) external {
        require(msg.sender == owner, "Only owner can register Candidate!!");
        require(_candidateAddress != owner, "Owner can not participate!!");
        require(candidates[_candidateAddress] == 0, "Candidate already registered");
        Candidate memory candidate = Candidate({
            name: _name,
            usn: _usn,
            registered: true,
            votes: 0,
            candidateAddress: _candidateAddress
        });
        if (candidateList.length == 0) {
            candidateList.push();
        }
        candidates[_candidateAddress] = candidateList.length;
        candidateList.push(candidate);
        emit success("Candidate registered!!");
    }

    function whiteListAddress(address _voterAddress) external {
        require(_voterAddress != owner, "Owner can not vote!!");
        require(msg.sender == owner, "Only owner can whitelist the addresses!!");
        require(voterList[_voterAddress].registered == false, "Voter already registered!!");
        Voter memory voter = Voter({
            registered: true,
            voted: false
        });

        voterList[_voterAddress] = voter;
        emit success("Voter registered!!");
    }

    function startVoting() external {
        require(msg.sender == owner, "Only owner can start voting!!");
        votingStarted = true;
        emit success("Voting Started!!");
    }

    function putVote(address _candidateAddress) external {
        require(votingStarted == true, "Voting not started yet or ended!!");
        require(msg.sender != owner, "Owner can not vote!!");
        require(voterList[msg.sender].registered == true, "Voter not registered!!");
        require(voterList[msg.sender].voted == false, "Already voted!!");
        require(candidateList[candidates[_candidateAddress]].registered == true, "Candidate not registered");

        candidateList[candidates[_candidateAddress]].votes++;
        voterList[msg.sender].voted = true;

        uint candidateVotes = candidateList[candidates[_candidateAddress]].votes;

        if (totalVote < candidateVotes) {
            totalVote = candidateVotes;
            winnerAddress = _candidateAddress;
        }
        emit success("Voted !!");
    }

    function stopVoting() external {
        require(msg.sender == owner, "Only owner can stop voting!!");
        votingStarted = false;
        emit success("Voting stopped!!");
    }

    function getAllCandidateVotes() external view returns (string[] memory usns, uint[] memory votes) {
        uint candidateCount = candidateList.length;
        usns = new string[](candidateCount);
        votes = new uint[](candidateCount);

        for (uint i = 0; i < candidateCount; i++) {
            usns[i] = candidateList[i].usn;
            votes[i] = candidateList[i].votes;
        }
    }

    function getAllCandidate() external view returns (Candidate[] memory list) {
        return candidateList;
    }

    function votingStatus() external view returns (bool) {
        return votingStarted;
    }

    function getWinner() public view returns (WinnerInfo[] memory winners) {
    require(candidateList.length > 0, "No candidates registered");
    require(!votingStarted, "Voting is still ongoing");


    uint maxVotes = 0;
    for (uint i = 0; i < candidateList.length; i++) {
        if (candidateList[i].votes > maxVotes) {
            maxVotes = candidateList[i].votes;
        }
    }


    uint winnerCount = 0;
    for (uint i = 0; i < candidateList.length; i++) {
        if (candidateList[i].votes == maxVotes) {
            winnerCount++;
        }
    }


    winners = new WinnerInfo[](winnerCount);
    uint index = 0;
    for (uint i = 0; i < candidateList.length; i++) {
        if (candidateList[i].votes == maxVotes) {
            winners[index] = WinnerInfo({
                name: candidateList[i].name,
                usn: candidateList[i].usn,
                votes: candidateList[i].votes
            });
            index++;
        }
    }
}
}