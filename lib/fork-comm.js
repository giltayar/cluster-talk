"use strict";
const cluster  = require('cluster');
const clog = console.log;
if (cluster.isMaster) {
  console.log("I'm a master");

  const worker = cluster.fork();

  worker.on('message', (message) => clog(`worker sent message ${message}`));

  worker.on('exit', () => clog('my worker just died'));
}
else {
  clog("I'm a worker");

  process.send('hi');

  process.exit(0);
}
