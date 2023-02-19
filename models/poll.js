const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please provide a poll'],
    },
    type:{
        type:String
    },
    views:Number,
    choices:[
        {
        value:String,
        votes:Number
    }
    ]
})


module.exports = mongoose.model('Poll',PollSchema)