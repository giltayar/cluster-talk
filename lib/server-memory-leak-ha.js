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
  require('./puny.js');
}
