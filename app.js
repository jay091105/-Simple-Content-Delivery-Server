const express=require('express');
const app=express();
const fs=require('fs');
const path =require('path');
const port=8008;
app.use((req,res,next)=>{
    const date=new Date().toISOString();
    const formateDate=new Date(date).toLocaleString();

    const log = `\nDate : ${formateDate} - Ip : ${req.ip}`;
    fs.appendFile('log.txt',log,'utf8',(err)=>
    {
        if(err)
        {
            console.log('Error Found in file');
        }
    });
    next();
});
//If a user requests http://localhost:8008/index.html, Express will serve public/index.html.
app.use(express.static(path.join(__dirname,'public'))); 

app.get('/log',(req,res)=>{
    fs.readFile('log.txt','utf8',(err,data)=>{
        if(err)
        {
            return res.status(500).json({Error : 'Error reading log file'});
        }
        else
        {
            res.json({logs : data});
        }
    });

});

app.listen(port,()=>{console.log('Server started...')});