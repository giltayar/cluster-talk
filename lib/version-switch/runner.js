const cluster = require('cluster');

if (cluster.isMaster) {
  const createWorker = () => {
    const worker = cluster.fork().on('message', (message) => {
      if (message === 'switch-versions')
        createWorker().on('listening', () => worker.kill());
    });

    return worker;
  };
  createWorker();
}
else {
  const fs = require('fs');
  fs.readFile(`${__dirname}/version.txt`, 'utf-8', (err, content) => {
    if (err)
      throw err;

    require(`${__dirname}/${content.trim()}/app.js`)
  });

}
