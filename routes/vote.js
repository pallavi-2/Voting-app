const express = require('express')
const poll = require('../models/poll')
const router = express.Router()
const Poll = require('../models/poll')
const auth = require('../authentication/auth')
const Subscribe = require('../models/subscribe')
const User = require('../models/user')

router.post('/createpoll', async (req, res) => {
    try {
        const userId = req.user.userId
        const poll = new Poll({...req.body,
        createdBy:userId
        })
        
        await poll.save()
        res.status(201).json(poll)
    } catch (err) {
        res.status(400).json(err)
    }

})

router.get('/createdpolls',async(req,res)=>{
    try{
        const userId = req.user.userId
        const createdPolls = await Poll.findById({userId})
        res.send(createdPolls)
    }catch(err){
        res.status(400).json(err)
    }
})

router.get('/votedpolls',async(req,res)=>{
    try{
        const userId = req.user.userId
        const allVoted = await User.findById({userId})
        const pollId = allVoted.pollsId
        const allVotedPolls = pollId.map(async(poll)=>{
            return (
               await Poll.findById({poll})
            )
        })
        res.status(200).send(allVotedPolls)
    }
    catch(err){
        res.send(400).send(err)
    }
})

router.post('/vote/:poll_id', async (req, res) => {
    try {
        const { userId, userName } = req.user
        const value = req.body.value
        const pollId = req.params.poll_id
        const isVoted = await User.findOne({pollsId:pollId})
        if(isVoted){
            res.send("You already voted for this poll")
        }
        const result = await Poll.findByIdAndUpdate({ _id: pollId }, { $inc: { ['choices.$[elem].votes']: 1 } }, { arrayFilters: [{ 'elem.value': value }] })
        await User.pollsId.push(pollId)
        await User.save()
        res.status(200).send({ userId, userName, result })

    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/subscribe/:poll_id', async (req, res) => {
    const { userId, userName } = req.user
    const pollId = req.params.poll_id
    try {
        const subscribe = new Subscribe({ pollId: pollId, createdBy: userId })
        await subscribe.save()
    } catch (err) {
        res.status(400).json(err)
    }

})



module.exports = router