"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  for (let i = 0; i < 10; ++i)
    cluster.fork({I: i});
}
else {
  const http = require('http');

  console.log(`I'm a worker ${process.env.I}`);

  http.createServer(

    (req, res) => res.end(`hello ${process.env.I}`)
    
  ).listen(8000, () => console.log(`listening ${process.env.I}`));
}
