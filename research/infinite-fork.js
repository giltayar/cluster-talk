"use strict";
const cluster  = require('cluster');

if (cluster.isMaster) {
  console.log("I'm a master", process.argv);

  var worker = cluster.fork();

  console.log("cluster settings", cluster.settings);

  worker.on('exit', function() {
    console.log('my worker just died');
  })
}
else {
  console.log("I'm a worker", process.argv);

}
