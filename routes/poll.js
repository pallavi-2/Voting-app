const express = require('express')
const router = express.Router()
const Poll = require('../models/poll')

router.get('/allpolls',async(req,res)=>{
    try{
    const poll = await Poll.find()
    res.status(201).json(poll)
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = router