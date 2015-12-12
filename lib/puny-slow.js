"use strict";
const http = require('http');

console.log(`I'm a worker ${process.env.I || ''}`);

http.createServer(
  (req, res) => {
    if (req.url === '/error')
      throw new Error("Something bad happened");
    else {
      for (let i = 0; i < 100000000; ++i)
        ;
      res.end(`hello ${process.env.I || ''}`);
    }
  }
).listen(8000, () => console.log('listening'));
