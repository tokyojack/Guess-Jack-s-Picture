//============================= Packages =============================

var express = require("express");
var app = express();

var bodyParser = require("body-parser");

var http = require('http').Server(app);
var io = require('socket.io')(http);

var colors = require('colors');

//============================= Letting express use them =============================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//============================= Routes =============================

// Index

var indexRoutes = require("./routes/indexRoutes")();
app.use("/", indexRoutes);

// Misc

var miscRoutes = require("./routes/misc/miscRoutes")();
app.use("*", miscRoutes);

//============================= Socket io =============================

io.on('connection', function(socket) {
    
    require('./socketEvents/onMessage')(socket, io);
    
});

//============================= Starting Server =============================

http.listen(8080, function() {
    console.log("Server running".rainbow);
});