var http = require('http');
var fs = require('fs');
var votings = JSON.parse(fs.readFileSync("votings.json"));

//var index = fs.readFileSync('index.html');
const express = require('express');
const app = express();
const port = 8080;

const Web3 = require('web3');
let web3 = new Web3();

const ethers = require('ethers');

app.use(express.static('public'));

app.get('/', (req, res) => {
	console.log("GET");
  res.send('Hello World!')
})

app.get('/voting', (req, res) => {
	console.log("GET");
  res.send('Hello World!')
})

for (var i = 0; i < votings.length; i++) 
{
  console.log(votings[i].name);
  app.get(`/${votings[i].name}`, function(req, res) {
    console.log("GET");
    for (var j = 0; j < votings.length; j++) 
    {
      console.log(req.url.substring(1));
      console.log(votings[j].name);
      if (votings[j].name === req.url.substring(1)) 
      {
        //res.json(votings[j]);
        //console.log(JSON.stringify(votings[j]));
        console.log(generate_vote_page(votings[j]));
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from(generate_vote_page(votings[j])));
        break;
      }
    }
  });
}

app.post('/create_vote', async function(req, res) {
	console.log("POST");
  //res.send('POST request to the homepage');

  web3.setProvider(new web3.providers.HttpProvider("https://goerli.infura.io/v3/088df60973524c2e853dbb33c461ba35"));

    
    // Read the compiled contract code
    // Compile with
    // solc SampleContract.sol --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > contracts.json
    let source = fs.readFileSync("../artifacts/contracts/Voting.sol/Voting.json");
    let jsonSource = JSON.parse(source);
    //let contracts = jsonSource["contracts"];

    // ABI description as JSON structure
    let abi = jsonSource["abi"];

    // Smart contract EVM bytecode as hex
    let code = jsonSource["bytecode"];

    // Create Contract proxy class
    //let SampleContract = web3.eth.contract(abi);

    /*
    let contract = new web3.eth.Contract(abi);
    await contract.deploy({
                data: code, 
                arguments: [3]
               })
              .send({
                from: "0x61dbFE8d0067f5B3F6082d0141C291f68083BA88", 
                gasPrice: '1000', gas: 2310334
               });
               */

    // Transaction has entered to geth memory pool
    //console.log(contract.contractAddress);
    //console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract.transactionHash);
    
    const provider = ethers.getDefaultProvider(ethers.providers.getNetwork("goerli"));
    const signer = new ethers.Wallet("6416581cf7b139f0af5569140dd76bde36b94fab8d01399f14c9956345a71807", provider);

    const factory = new ethers.ContractFactory(abi, code, signer);

// If your contract requires constructor args, you can specify them here
const contract = await factory.deploy([3], { gasLimit: 500000 });

console.log(contract.address);
console.log(contract.deployTransaction);
    
votings.push({ name: "vote", options: [ "option1", "option2", "option3" ] });
fs.writeFileSync("votings.json", JSON.stringify(votings), 'utf8');

    res.send(contract.address);
})

app.post('/make_choise', async function(req, res) 
{
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

/*
var server = http.createServer(function (req, res) {
  console.log("REQUEST");
  if (req.method === "GET") {
	console.log("GET");
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
  } 
  else if (req.method === "POST") 
  {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
      console.log('Partial body: ' + body)
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end('post received')
    })
    //res.writeHead(200, { "Content-Type": "text/plain" });
    //res.end("hello world!");
  }
}).listen(8080);
*/

function generate_vote_page(vote)
{
  var page = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <title>Voting</title>
  <script src="vote.js"></script>
  </head>
  <body>
  <h1>Vote test</h1>
  <form>
      <p><select size="3" id="options">`;
  var options = "";
  for (var i = 0; i < vote.options.length; i++) 
  {
    options = options.concat(`<option value="${i}">${vote.options[i]}</option>`);
  }
  page = page.concat(options);
  page = page.concat(`
  </select></p>
  </form>
  <button type="submit" onclick="vote()">Отправить</button>
  </body>
  </html>`);

  return page;
}

console.log("RUNNING");