const express = require('express')
const app =express()

require('dotenv').config()
const cron =require('node-cron')

const connectDB = require('./database/db')
const authRouter = require('./routes/auth')
const voteRouter = require('./routes/vote')
const activePolls = require('./routes/poll')
const auth = require('./authentication/auth')
const sendEmail = require('./authentication/sendemail')

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Home page')
})

app.use(activePolls)
app.use(authRouter)
app.use(auth,voteRouter)

cron.schedule('0 * * * *',async()=>{
    sendEmail();
})


const start = async()=>{
    try{
    await connectDB(process.env.MONGO_URI)
    app.listen(5000,()=>console.log('Running on port 5000'))
}
catch(err){
    console.log(err)
}
}


start()

