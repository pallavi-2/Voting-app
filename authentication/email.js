const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    },
})

const mail = async (email,subject,text)=>{
    await transporter.sendMail(
        {
            from:"Voting app",
            to:email,
            subject:subject,
            text:text,
        },
        (err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log("Email sent " + info.response)
            }
        }
    )
}