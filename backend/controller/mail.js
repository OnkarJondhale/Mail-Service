const mailSender = require('../config/nodemailer.js');
const User = require('../models/User.js');
const accessKeyTemplate = require('../template/accesskey.js');
const businessTemplate = require('../template/business.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

exports.sendAccessKey = async (req,res)=>{
    try 
    {
        const email = req.body.email;

        if(!email)
        {
            return res.status(401).json({
                success : false,
                message : "Email is required"
            })
        }

        const userExist = await User.findOne({email : email});
        
        const ACCESS_KEY = crypto.randomUUID();
        if(userExist)
        {
            await User.findByIdAndUpdate(userExist._id,{
                access_key : ACCESS_KEY
            })

        }
        else 
        {
            await User.create({email : email,access_key : ACCESS_KEY});
        }

        const body = accessKeyTemplate(ACCESS_KEY);
        const response = await mailSender('onkar.jondhale@gmail.com',email,"Here is your ACCESS_KEY to access mailService",body);
        // console.log(response);

        res.status(200).json({
            success : true,
            message : "ACCESS_KEY sent successfully",
            access_key : ACCESS_KEY
        })
    }
    catch(error)
    {
        // console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Could not get the ACCESS_KEY at this moment" 
        })
    }
}

exports.mail = async (req,res)=>{
    try 
    {
        const {sender,subject,body,access_key} = req.body;

        // console.log(sender,subject,body,access_key)
        if(!sender || !subject || !body)
        {
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            }) 
        }

        const userExist = await User.findOne({access_key : access_key});

        if(!userExist)
        {
            return res.status(404).json({
                success : false,
                message : "Invalid request"
            })
        }

        // console.log(userExist)
        const mailContent = businessTemplate(subject,body);
        const response = await mailSender(sender,userExist.email,subject,mailContent);
        // console.log(response);

        return res.status(200).json({
            success : true,
            message : "Mail sent successfully"
        })
    }
    catch(error)
    {
        // console.log("Error has occured while sending email",error.message);
        return res.status(500).json({
            success : false,
            message : "Could not send the mail at this moment"
        })
    }
}