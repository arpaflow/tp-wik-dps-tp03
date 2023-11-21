import http from "node:http";
import {hostname} from "os";

const port = process.env.PING_LISTEN_PORT;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/ping') {
    var headers = JSON.stringify(req.headers);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(headers);
    console.log(hostname());
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end();
  }
  });

server.listen(port, () => {
  console.log('Server running at localhost:',port);
});