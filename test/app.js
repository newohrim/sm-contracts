var http = require('http');
var fs = require('fs');
//var index = fs.readFileSync('index.html');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
	console.log("GET");
  res.send('Hello World!')
})

app.get('/voting', (req, res) => {
	console.log("GET");
  res.send('Hello World!')
})

app.post('/', (req, res) => {
	console.log("POST");
  res.send('POST request to the homepage')
})

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

console.log("RUNNING");