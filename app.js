const express = require('express');
const mongoss=require("mongoose");

const authRoutes=require('./routes/authentificationR');

const app = express();

mongoss.connect("mongodb+srv://hamza:hamza@cluster0.xofqdwg.mongodb.net/?retryWrites=true&w=majority",(err,done)=>{
    if (err){
        console.log(err)
    }
    if(done){
        console.log("ssucss")
    }
})

// app.get('/', (req, res) => {res.write('home')});
app.use(authRoutes);
app.listen(3000,console.log('server run...'))

        