fs = require('fs');

const Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/cb8b86ec19dc4e95b2d78fa0255f3606"));
const address = "0xa50Da3C009d4a14799397808e12FAF5B78A32742";
fs.readFile('abi.json', 'utf8', function(err, data) {
    const ABI = data;
    console.log(web3.eth.getBalance('0x61dbFE8d0067f5B3F6082d0141C291f68083BA88')) // проверяем
    //const myContract = new web3.eth.Contract(ABI, address)
    //myContract.methods. ().call().then(console.log)
});
