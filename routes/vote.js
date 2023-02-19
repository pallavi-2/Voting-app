const express = require('express')
const poll = require('../models/poll')
const router = express.Router()
const Poll = require('../models/poll')

// router.post('/vote/:poll_id', async (req, res) => {
//     try {
//         const value = req.body.value
//         const pollId = req.params.poll_id
//         // const result = await Poll.findByIdAndUpdate({_id:pollId},{$inc:{["choices.$.votes"]:1}},{new:true})

//         const poll =await Poll.findById({_id:pollId})
//         poll.choices.map((element,index)=>{
//             if(element.value== value){
//                 const array_id = element._id
//                 console.log(array_id)
//                 // const result = await Poll.findByIdAndUpdate({_id:pollId , 'choices[index]._id':})
//             }
//         })
//         res.status(200).send(result)

//     } catch (err) {
//         res.status(400).send(err)
//     }
// })

router.post('/vote/:poll_id', async (req, res) => {
    try {
        const value = req.body.value
        const pollId = req.params.poll_id
        const c = '63f1c80dd03f3eb575e13d7d'
        const poll = await Poll.findById({_id:pollId})
        // res.send(poll)
        // console.log(poll)
        const result = await Poll.findByIdAndUpdate({_id:pollId},{$inc:{['choices.$[elem].votes']:1}},{arrayFilters: [{ 'elem.value': value }]})
        res.status(200).send(result)

    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/subscribe', async (req, res) => {
    res.send('Subscribed')
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