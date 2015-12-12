"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  for (let i = 0; i < 10; ++i) {
    const worker = cluster.fork({I: i});

    worker.on('exit', () => console.log('my worker just died'));
  }
}
else {
  console.log("I'm a worker", process.env.I);

  if (process.env.I !== '0')
    process.exit(0);
}
