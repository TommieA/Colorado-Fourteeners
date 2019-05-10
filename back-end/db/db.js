const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Colorado-Fourteeners", {useNewUrlParser: true});

mongoose.connection.on('connected', ()=>{
    console.log("MONGOOSE IS GOOD TO GO")
})

mongoose.connection.on('error', (err)=>{
    console.log(err)
})

mongoose.connection.on('disconnected', ()=>{
    console.log("WHOOPS DATA IS GONE")
})