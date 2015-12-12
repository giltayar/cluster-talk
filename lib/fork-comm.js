"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const worker = cluster.fork();

  worker.on('message', (message) => console.log(`worker sent message ${message}`));

  worker.on('exit', () => console.log('my worker just died'));
}
else {
  console.log("I'm a worker");

  process.send('hi');

  process.exit(0);
}
