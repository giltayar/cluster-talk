const http = require('http');

exports.run = (switchVersionIfNeeded) => {
  setInterval(() => {switchVersionIfNeeded(() => 1)}, 1000);

  http.createServer(
    (req, res) => setTimeout(() => res.end("Hello, world v1"), 500)
  ).listen(8000);
};
