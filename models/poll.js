const mongoose = require('mongoose')

const PollSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a poll'],
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
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})


module.exports = mongoose.model('Poll',PollSchema)