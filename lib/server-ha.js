"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  const createWorker = () => {
    let worker = cluster.fork();

    worker.on('exit', () => {
      console.log('my worker just died');
      createWorker();
    });
  };
  createWorker();
}
else {
  require('./puny.js');
  process.on('SIGTERM', () => console.log('I am not going to die!'));
  setInterval(() => console.log('alive'), 500);
}
