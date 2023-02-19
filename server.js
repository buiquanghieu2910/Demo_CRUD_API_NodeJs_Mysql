const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
port = process.env.PORT || 2910;

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routers = require('./routers/api'); //importing route
app.use('/api', routers);//register the route
