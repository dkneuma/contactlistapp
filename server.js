var express = require("express");
var app = express();

app.get('/',function (req, res) {
    res.send('Hello from Express server.js');
});

app.listen(3000);
console.log("Server listening on 3000");
