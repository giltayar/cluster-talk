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
      createWorker().on('listening', () => {
        worker.kill('SIGTERM');
        setTimeout(() => {if (!worker.isDead()) worker.kill('SIGKILL')}, 1000);
      });
    }, 2000);

    return worker;
  };
  createWorker();
}
else {
  const http = require('http');

  console.log("I'm a worker");

  http.createServer(
    (req, res) => res.end("hello")
  ).listen(8000, () => console.log('listening'));

  setInterval(() => console.log('alive'), 500);
  process.on('SIGTERM', () => console.log('I am not going to die!'));
}
