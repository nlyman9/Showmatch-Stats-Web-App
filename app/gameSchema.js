const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    player1goals: Number,
    player1name: String,
    player1saves: Number,
    player1shots: Number,
    player2goals: Number,
    player2name: String,
    player2saves: Number,
    player2shots: Number,
    winner: String,
}, { collection: 'Games' });

module.exports = gameSchema