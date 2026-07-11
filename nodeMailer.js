import express from "express";
import nodemailer from 'nodemailer'
const app = express();

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'amitn7906@gmail.com',
        pass:'fsrt kxge juld nkji'
    }
})

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set('view engine', 'ejs')
app.get('/mail',(req,res)=>{
res.render("mail")

})
app.post('/submit-email',(req,res)=>{
    console.log(req.body);

    const mailOptions={
        from :"amitn7906@gmail.com",
        to:"amitn7906@gmail.com",
        subject:req.body.subject,
        text:req.body.mail
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            res.send("email operation failed , try again")
        }else{
            res.send('mail send')
        }

    })
     res.send('mail send')
 
})
app.listen(4800)