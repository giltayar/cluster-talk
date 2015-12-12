"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master");

  for (let i = 0; i < 10; ++i)
    cluster.fork({I: i});
}
else {
  require('./puny-slow');
}
