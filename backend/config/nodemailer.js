const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host : process.env.EMAIL_HOST,
    auth : 
    {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
});

const mailSender = async (sender,receiver,subject,body)=>{
    try 
    {
        const response = await transporter.sendMail({
            from : {
                name : sender,
                address : sender
            },
            to : receiver,
            subject : subject,
            html : body
        })

        console.log(response);

        return response;
    }
    catch(error)
    {
        console.log(error.message);
        return null;
    }
}

module.exports = mailSender;