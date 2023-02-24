const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/signup', async(req,res)=>{
    try{
        const user = new User(req.body)
        const checkEmail = await User.findOne({email:req.body.email})
        if (checkEmail){
            res.send('Email already exists')
        }
        await user.save()
        const token = await user.createJWT()

        res.json({user:user.name,token})

    }catch(err){
        res.status(400).send(err)

    }

})

router.post('/login', async(req,res)=>{
    try{
        const {email,password } =   req.body
    if(!email || !password){
        res.send("Please provide email and password")
    }

    const user = await User.findOne({email})
    if(!user){
        res.send("No such user found")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        res.send("Incorrect password")
    }
    
    const token = user.createJWT()
    
    res.send({user:{name:user.name},token})

    }catch(err){
        res.status(400).send(err)

    }

})


module.exports= router