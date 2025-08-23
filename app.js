const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db')

const app = express();

// connect to DB
connectDB();

app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        ok:true,
        service:'ABVP GUJARAT API'
    })
})

module.exports=app;

