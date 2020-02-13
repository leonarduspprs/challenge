var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();
app.use(logger("dev"));
app.use(express.json());

require("./routes/todos.js")(app);
// Create a Server
var server = app.listen(3000, "127.0.0.1", function() {
var host = server.address().address;
var port = server.address().port;
console.log("App listening at http://%s:%s", host, port);
});
