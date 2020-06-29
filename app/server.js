'use strict';
var http = require('http');
var port = process.env.PORT || 9999;
var Promise = require('promise');
var mongoose = require('mongoose');
var games = require('./index');

games().then(function (games) {
    //console.log(games);
    
    http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(games);
        res.end();
    }).listen(port);
})
