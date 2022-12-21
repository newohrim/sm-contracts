fs = require('fs');
const Web3 = require('web3')
let web3 = new Web3();

async function create_vote(evt)
{
    web3.setProvider(new web3.providers.HttpProvider("https://goerli.infura.io/v3/088df60973524c2e853dbb33c461ba35"));

    // Read the compiled contract code
    // Compile with
    // solc SampleContract.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
    let source = fs.readFileSync("artifacts/contracts/Voting.sol/Voting.json");
    let jsonSource = JSON.parse(source);
    //let contracts = jsonSource["contracts"];

    // ABI description as JSON structure
    let abi = JSON.parse(jsonSource["abi"]);

    // Smart contract EVM bytecode as hex
    let code = jsonSource["bytecode"];

    // Create Contract proxy class
    //let SampleContract = web3.eth.contract(abi);

    let contract = new web3.eth.Contract(abi);
    await contract.deploy({
                data: code, 
                arguments: [3]
               })
              .send({
                from: "0x61dbFE8d0067f5B3F6082d0141C291f68083BA88", 
                gasPrice: '1000', gas: 2310334
               });

    // Transaction has entered to geth memory pool
    console.log(contract.contractAddress);
    console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);
}

// http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock() {
  while (true) {
    let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    if (receipt && receipt.contractAddress) {
      console.log("Your contract has been deployed at http://testnet.etherscan.io/address/" + receipt.contractAddress);
      console.log("Note that it might take 30 - 90 sceonds for the block to propagate befor it's visible in etherscan.io");
      break;
    }
    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    await sleep(4000);
  }
}

//waitBlock();