const express = require('express');
const router = require('../backend/route/route.js');
const connectDb = require('../backend/config/database.js');
const cors = require('cors');

const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('',router);

app.get("/",(req,res)=>{
    res.status(200).json({
        message : "Hello,World!"
    })
})

app.listen(3000,()=>{
    console.log("Server stated successfully");
})