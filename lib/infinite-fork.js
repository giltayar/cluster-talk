"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  cluster.fork();
}
else {
  console.log("I'm a worker");
}
