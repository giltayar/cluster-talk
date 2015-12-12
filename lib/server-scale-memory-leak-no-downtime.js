"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const createWorker = (env) => {
    let worker = cluster.fork(env);

    setTimeout(() => {
      console.log('killing the worker');
      createWorker(env).on('listening', () => {
        worker.kill('SIGTERM');
        setTimeout(() => {if (!worker.isDead()) worker.kill('SIGKILL')}, 1000);
      });
    }, 2000);

    return worker;
  };

  for (let i = 0; i < 4; ++i)
    createWorker({I: i});
}
else {
  require('./puny-slow');
}
