"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const createWorker = () => {
    let worker = cluster.fork();

    worker.on('exit', () => {
      console.log('my worker just died');
      createWorker();
    });

    setTimeout(() => {
      console.log("Killing worker");
      process.kill(worker.process.pid, 'SIGKILL');
      //setTimeout(() => {if (!worker.isDead()) worker.kill('SIGKILL')}, 3000);
    }, 5000);
  };
  createWorker();
}
else {
  process.on('SIGTERM', () => console.log('SIGTERM!'));
  const http = require('http');

  console.log("I'm a worker");

  const server = http.createServer(

    (req, res) => {
      if (req.url === '/error')
        throw new Error("Something bad happened");
      else
        setTimeout(() => res.end("hello"), 500);
    }

  );
  server.on('close', () => console.log('server is closed'));
  server.listen(8000, () => console.log('listening'));

  //setInterval(() => console.log('alive'), 500);
}
