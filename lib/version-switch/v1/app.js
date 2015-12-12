const http = require('http');
const fs = require('fs');

setInterval(() => {
  fs.readFile(`${__dirname}/../version.txt`, 'utf-8', (err, content) => {
    if (err)
      throw err;

    if (content.trim() !== 'v1')
      process.send('switch-versions');
  });
}, 1000);

http.createServer(
  (req, res) => setTimeout(() => res.end("Hello, world v1"), 500)
).listen(8000);
