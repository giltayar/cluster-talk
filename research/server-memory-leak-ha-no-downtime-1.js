"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const createWorker = () => {
    let worker = cluster.fork();

    worker.on('exit', () => {
      console.log('my worker just died');
    });

    setTimeout(() => {
      console.log('killing the worker');
      createWorker().on('listening', () => worker.kill());
    }, 2000);

    return worker;
  };
  createWorker();
}
else {
  const http = require('http');

  console.log("I'm a worker");

  http.createServer(

    (req, res) => {
      if (req.url === '/error')
        throw new Error("Something bad happened");
      else
        setTimeout(() => res.end("hello"), 500);
    }
  ).listen(8000, () => console.log('listening'));
}
