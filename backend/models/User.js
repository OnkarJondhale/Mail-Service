const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email : String,
    access_key : String
})

module.exports = mongoose.model("User",schema);