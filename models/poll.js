const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please provide a poll'],
    },
    choices:[
        {
        value:String,
        votes:Number
    }
    ],
    status:{
        type : String,
        enum:['Ongoing','Completed']
    }
})


module.exports = mongoose.model('Poll',PollSchema)