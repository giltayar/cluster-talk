const run = (version, switchVersionIfNeededFunc) =>
  require(`${__dirname}/${version}/app.js`).run(switchVersionIfNeededFunc);

const fetchExpectedVersion = (callback) => {
  var fs = require('fs');

  fs.readFile(`${__dirname}/version.txt`, 'utf-8', (err, content) => {
    if (err)
      callback(err);
    else
      callback(null, content.trim());
  });
}

require('auto-version-switch')(run, fetchExpectedVersion);
