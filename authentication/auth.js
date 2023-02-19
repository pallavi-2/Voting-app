const  User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth =async(req,res,next)=>{
    const authHeader = req.headers.authorization
    
    try{
        if(authHeader){
        const token = authHeader.split(' ')[1]
    
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId :payload.userId , userName : payload.name}
        req.token = token
        next()
    }
    } 
    catch(err){
        console.log(err)
    }
}

module.exports= auth