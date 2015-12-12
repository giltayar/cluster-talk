"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  const createWorker = (env) => {
    const worker = cluster.fork(env);

    worker.on('exit', () => { createWorker(env); });
  };

  for (let i = 0; i < 4; ++i)
    createWorker({I: i});
}
else {
  require('./puny-slow');
}
