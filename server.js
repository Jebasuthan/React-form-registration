const express = require('express');
const path = require('path');

const app = express();
const staticFileMiddleware = express.static(path.join(__dirname + '/build'));

app.use(staticFileMiddleware);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});