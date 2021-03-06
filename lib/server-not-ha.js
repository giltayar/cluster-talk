"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const worker = cluster.fork();

  worker.on('exit', () => console.log('my worker just died'));
}
else {
  require('./puny');
}
