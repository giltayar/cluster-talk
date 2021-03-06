"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  for (let i = 0; i < 4; ++i) {
    const worker = cluster.fork({I: i});

    worker.on('exit', () => console.log('my worker just died'));
  }
}
else {
  console.log(`I'm a worker ${process.env.I}`);

  process.exit(0);
}
