"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  const createWorker = () => {
    let worker = cluster.fork();

    worker.on('exit', () => {
      console.log('my worker just died');
      createWorker();
    });

    setTimeout(() => worker.kill(), 5000);
  };
  createWorker();
}
else {
  const http = require('http');

  console.log("I'm a worker");

  const server = http.createServer(
    (req, res) => res.end("hello")
  );
  server.on('close', () => console.log('server closed'));

  server.listen(8000, () => console.log('listening'));
}
