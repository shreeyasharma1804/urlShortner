const mongoose = require('mongoose');
const randomstring = require("randomstring");

let urlShortenerSchema = new mongoose.Schema({

    "fullUrl":{
        type:String,
        required: true,
    },

    "shortUrl":{
        type: String,
        required: true,
        default: randomstring.generate(10),
    }
     

}) 

module.exports = mongoose.model("urlShortener", urlShortenerSchema);