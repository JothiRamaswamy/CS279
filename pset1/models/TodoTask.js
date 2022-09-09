// mongoose allows us to connect our todo list to mongodb
// where the todo items are stored
const mongoose = require('mongoose');

// make collection schema for how we want to store the todo items and what we want
// to store
const todoTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// export the schema to use and process in index.js
module.exports = mongoose.model('TodoTask', todoTaskSchema);