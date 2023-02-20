const Subscribe = require('../models/subscribe')
const mail = require('./email')
const User = require('../models/user')
const Poll = require('../models/poll')

const sendAlert = async function(){
    try{
        const subscription = await Subscribe.find()
        subscription.forEach(async function(subs){
            let subId = subs.pollId
            let createdUserId = subs.createdBy

            const user = await User.findById(createdUserId)
            let email = user.email

            const poll = await Poll.findById(subId)

            if(poll.status === 'Completed'){
                let subject = `Poll completed`
                let text = `The poll named ${poll.name} has been completed. Please check the results`
                await mail(email,subject,text)
                await Subscribe.findByIdAndDelete(subId)
            }

        })

    }catch(err){

    }

}

module.exports = sendAlert