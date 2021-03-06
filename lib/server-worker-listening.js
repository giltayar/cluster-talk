"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const worker = cluster.fork();

  worker.on('listening', () => console.log('my worker started listening'));
}
else {
  const http = require('http');

  console.log("I'm a worker");

  http.createServer(

    (req, res) => res.end("hello")

  ).listen(8000, () => console.log('listening'));
}
