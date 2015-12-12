"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const worker = cluster.fork();

  worker.on('exit', () => console.log('my worker just died'));
}
else {
  const http = require('http');

  console.log("I'm a worker");

  http.createServer(

    (req, res) => {
      if (req.url === '/error')
        throw new Error("Something bad happened");
      else
        res.end("hello");
    }


  ).listen(8000, () => console.log('listening'));
}
