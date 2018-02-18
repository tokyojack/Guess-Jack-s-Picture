//============================= Packages =============================

var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var colors = require('colors');

//============================= Letting express use them =============================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'elphinestoneisinteresting',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    
    next();
});

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

// Make sure it's "http" instead of "app" for Socket.io
http.listen(8080, function() {
    console.log("Server running".rainbow);
});