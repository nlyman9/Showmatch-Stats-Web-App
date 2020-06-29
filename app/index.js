const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://nlyman9:VbKRsEbom3b7bg@cluster0-ewyzk.gcp.mongodb.net/Showmatch-Statistics?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
var mongoose = require('mongoose');
const express = require("express");
var games_schema = require("./gameSchema.js");
const router = express.Router();
const app = express();
const port = 9999;
var Promise = require('promise');
/*
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
*/

function connect() {
    const connection = mongoose.connection;
    connection.on('error', console.error.bind(console, 'connection error:'));
    connection.once("open", function () {
        console.log("MongoDB database connection established successfully");
    })
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
}

//Execute Query with Query Builder
function executeQuery() {
    connect();
    var games_col = mongoose.model('Games', games_schema)
    return new Promise(function (resolve, reject) {
        var query = games_col.find({ 'winner': 'Kronovi' }, { '_id': 0 });
        query.select('player1goals');
        query.exec(function (err, games) {
            if (err) return reject(err);
            //Otherwise it was a success
            var gamesString = String(games);
            resolve(gamesString);
            //console.log(games);
        });
    })

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
*/
//console.log("Hiiiiii");
/*
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
//Connecting without mongoose
/*
client.connect(err => {
    if (err) {
        console.log("Could not connect to MongoDB", err);
    }
    else {
        const collection = client.db("Showmatch-Statistics").collection("Games");
        collection.find({ winner: "Kronovi" }).toArray(function (err, results) {
            if (err) {
                console.log("Error happened:", err);
            }
            else {
                for (i = 0; i < results.length; i++) {
                    globArray[i] = results[i];
                    //console.log("global array was set");
                    //console.log("His Goals: " + results[i].player1goals);
                }
                globArray = results;
                console.log("global array set");
                console.log("this array is: ", getarray());
            }
        });
    }
    client.close();
});
*/


//Exporting Attempts
/*
console.log("Global Array length is: ", globArray.length);
function getarray() {
    return globArray;
}
module.exports.getarray = getarray;
*/
/*
module.exports = {
    getArray: function () {
        return globArray;
    }
};
*/