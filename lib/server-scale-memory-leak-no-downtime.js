"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  const createWorker = (env) => {
    let worker = cluster.fork(env);

    worker.on('exit', () => {
      console.log('my worker just died');
    });

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
  const http = require('http');

  console.log(`I'm a worker ${process.env.I}`);

  http.createServer(

    (req, res) => {
      if (req.url === '/hello')
        setTimeout(() => {res.end(`hello ${process.env.I}`)}, 500)
      else
        throw new Error('!!!');
    }
    
  ).listen(8000, () => console.log(`listening ${process.env.I}`));
}
