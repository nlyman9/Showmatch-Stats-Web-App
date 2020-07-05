//var http = require('http');
var port = process.env.PORT || 9999;
var host = 'localhost';
var games = require('./index');
const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

//With using Games as data
/*
games().then(function (games) {
    //console.log(games);
    const requestListener = function (req, res) {
        //res.setHeader('Content-Type', 'application/json');//'text/plain' });
        //res.writeHead(200);
        //res.write(games);
        //res.end(games);
        fs.readFile(__dirname + "/index.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
    }
    const server = http.createServer(requestListener);
    server.listen(port, host, () => {
        console.log('Server is running on http://${host}:${port}');
    });
});
*/
games().then(function (games) {
    router.get('/', function (req, res) {
        //res.sendFile(path.join(__dirname + '/views/index.html'));
        res.send(games);
    });
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', router);
    app.listen(port);

    console.log('Running on port 9999');
});

