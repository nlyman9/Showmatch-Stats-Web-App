const MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
var mongoose = require('mongoose');
const express = require("express");
var games_schema = require("./gameSchema.js");
const router = express.Router();
const app = express();
const port = 9999;
var Promise = require('promise');
var uri;


function getURI() {
    return new Promise(function (resolve, reject) {
        fs.readFile('../../mongo_secret.txt', function (err, data) {
            if (err) return reject(err);
            uri = data.toString();
            console.log("this is printing");
            console.log('DATA IS: ' + data);
            resolve(uri);
        });
    })
}


/*
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
*/

function connect(uri) {
    const connection = mongoose.connection;
    console.log("Trying to connect");
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
    })
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
}

//Execute Query with Query Builder
function executeQuery() {
    return new Promise(function (resolve, reject) {
        console.log("Start");
        const uri = getURI();
        console.log("now this is printing");
        console.log("URI is: " + uri);
        uri.then(function (newuri) {
            console.log("URI HERE IS: " + newuri);
            connect(newuri);
            var games_col = mongoose.model('Games', games_schema)
            var query = games_col.find({ 'winner': 'Kronovi' }, { '_id': 0 });
            query.select('player1goals');
            query.exec(function (err, games) {
                if (err) return reject(err);
                //Otherwise it was a success
                resolve(games);
            });
        });
    })

    /*
    connect();
    var games_col = mongoose.model('Games', games_schema)
    return new Promise(function (resolve, reject) {
        var query = games_col.find({ 'winner': 'Kronovi' }, { '_id': 0 });
        query.select('player1goals');
        query.exec(function (err, games) {
            if (err) return reject(err);
            //Otherwise it was a success
            //var gamesString = String(games);
            //resolve(gamesString);
            resolve(games);
            //console.log(games);
        });
    })
    */

}

module.exports = executeQuery;

//console.log(callback);
/*
games_col.
    find({ 'winner': 'Kronovi' }).
    where('')
*/
//Query without query builder
/*
games_col.find({ 'winner': 'Kronovi' }, 'player1goals', function (err, games_cols) {
    if (err) return console.error(err);
    //Query was as successful. Print result.
    console.log(games_cols);
    //process.exit(0);
})

router.route("/fetch").get(function (req, res) {
    console.log("Made it here");
    games_col.find({}, function (err, result) {
        if (err) {
            res.send(err);
            //console.log("Error");
            console.log(err);
        }
        else {
            res.send(result);
            //console.log("Found something");
            console.log(result);
        }
        connection.close();
    });
});
*/