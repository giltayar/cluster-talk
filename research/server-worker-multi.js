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
  const http = require('http');

  console.log(`I'm a worker ${process.env.I}`);

  http.createServer(

    (req, res) => {
      //console.log(`worker ${process.env.I} responding`);
      res.end(`hello ${process.env.I}`);
    }
    
  ).listen(8000, () => console.log(`listening ${process.env.I}`));
}
