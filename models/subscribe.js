const mongoose = require('mongoose')

const SubscribeSchema = new mongoose.Schema({
    pollId:{
        type:String,
        require:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    }
})

module.exports = mongoose.model('Subscribe',SubscribeSchema)