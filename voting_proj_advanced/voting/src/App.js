import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { VOTING_ABI, VOTING_ADDRESS } from './config';

var web3;
var voting;
var accounts;

function App() {
  const [account, setAccount] = useState();
  const [votes, setVotes] = useState();
  const [contractAddress, setContractAddress] = useState([]);

  useEffect(() => {
    async function load() {
      web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
      voting = new web3.eth.Contract(VOTING_ABI, VOTING_ADDRESS);
      setContractAddress(VOTING_ADDRESS);
      accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      voting.methods.getAllVotes().call().then(result => setVotes(JSON.stringify(result)));
    }
    
    load();
  }, []);
  
  return (
    <div>
      <p>Your account is: {account}</p>
      <p>
        <input id="contractAddress" placeholder="Contract address" defaultValue={contractAddress}></input>
        <button onClick={ refresh }>Refresh</button>
      </p>
      <p>Votes: {votes}</p>
      <p><button onClick={ vote1 }>Vote 1</button></p>
      <p><button onClick={ vote2 }>Vote 2</button></p>
      <p><button onClick={ vote3 }>Vote 3</button></p>
      <p>
        <input id="electorAddress" placeholder="Elector address"></input>
        <button onClick={ addElector }>Add Elector</button>
      </p>
      <p>
        <button onClick={ openVote }>Open vote</button>
        <button onClick={ closeVote }>Close vote</button>
      </p>

    </div>
  );
  function vote1(event) 
  {
    voting.methods.vote(accounts[0], 0).send({from: accounts[0]});
  }
  
  function vote2(event) 
  {
    voting.methods.vote(accounts[0], 1).send({from: accounts[0]});
  }
  
  function vote3(event) 
  {
    voting.methods.vote(accounts[0], 2).send({from: accounts[0]});
  }
  
  function addElector(event) 
  {
    voting.methods.addElector(document.getElementById("electorAddress").value, 1).send({from: accounts[0]});;
  }
  
  function openVote(event) 
  {
    voting.methods.setIsOpen(true).send({from: accounts[0]});
  }
  
  function closeVote(event) 
  {
    voting.methods.setIsOpen(false).send({from: accounts[0]});
  }
  
  function refresh(event) 
  {
    var contractAddressField = document.getElementById("contractAddress");
    voting = new web3.eth.Contract(VOTING_ABI, contractAddressField.value);
    voting.methods.getAllVotes().call().then(result => setVotes(JSON.stringify(result)));
  }
}


export default App;