const restify = require('restify');

app.get(
  '/*',
  restify.plugins.serveStatic({
    directory: path.join(__dirname, 'images'),
  })
);

function respond(req, res, next) {
  res.send('Test');
  next();
}

var server = restify.createServer();
server.get('/', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});