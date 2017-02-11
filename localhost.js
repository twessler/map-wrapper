const http = require('http');
const fs = require("fs");

const hostname = 'localhost';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  
  try {
  	res.end(fs.readFileSync(req.url == "/" ? "index.html" : __dirname + req.url, "utf8"));
  }catch(e) {
  	console.log("error loading: " + req.url + ": " + e);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});