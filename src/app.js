const express = require('express');
const Sentry = require("@sentry/node");

const app = express()
const port = 8080;

Sentry.init({ dsn: ""});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

app.use(express.static('images'));

require('./routes')(app);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})