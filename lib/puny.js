const http = require('http');

console.log("I'm a worker");

http.createServer(
  (req, res) => {
    if (req.url === '/error')
      throw new Error("Something bad happened");
    else
      setTimeout(() =>
        res.end(`hello ${process.env.I || ''}`),
        500);
  }
).listen(8000, () => console.log('listening'));
