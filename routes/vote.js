const express = require('express')
const poll = require('../models/poll')
const router = express.Router()
const Poll = require('../models/poll')
const auth = require('../authentication/auth')
const Subscribe = require('../models/subscribe')

router.post('/vote/:poll_id', async (req, res) => {
    try {
        const { userId, userName } = req.user
        const value = req.body.value
        const pollId = req.params.poll_id
        const result = await Poll.findByIdAndUpdate({ _id: pollId }, { $inc: { ['choices.$[elem].votes']: 1 } }, { arrayFilters: [{ 'elem.value': value }] })
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

router.post('/createpoll', async (req, res) => {
    try {
        const poll = new Poll(req.body)
        await poll.save()
        res.status(201).json(poll)
    } catch (err) {
        res.status(400).json(err)
    }

})

module.exports = router