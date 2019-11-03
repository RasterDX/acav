const express = require('express')
const app = express()
const routes = require('./src/routes/routes');
const port = 3000

app.use('/', routes);

app.listen(port, () => {
    console.log("Listening on port " + port);
});
