const mongoose = require('mongoose');



function connectDB(){
    mongoose.connect("mongodb://127.0.0.1:27017/food-view")
    .then(()=>{
        console.log("mongoDB connected");
    })
    .catch((err)=>{
        console.error("mongoDB connection error", err);
    });
}

module.exports = connectDB;