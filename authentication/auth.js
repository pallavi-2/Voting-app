const  User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth =async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).send("Authentication invalid");
      }
      
    try{
        if(authHeader){
        const token = authHeader.split(' ')[1];
    
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId :payload.userId , userName : payload.name} 
        req.token = token
        next()
    }
    } 
    catch(err){
        res.status(401).send({ error: 'Please authenticate.' });
    }
}

module.exports= auth