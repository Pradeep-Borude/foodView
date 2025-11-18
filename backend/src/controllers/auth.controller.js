const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model")
const bcrypt = require('bcryptjs')


async function registerUser(req,res) {
 
    const { fullName , email , password}=req.body;
const isUseraAlreadyExists = await userModel.findOne({email})

if(isUseraAlreadyExists){
    return res.status(400).json({
        message:"user already exists"
    })
}


const hashedPassword = await bcrypt.hash(password,10);

const user = await userModel.create({
    fullName,
    email,
    password:hashedPassword
})

const token = jwt.sign(
    {
    id:user._id,
},
"2e851fc24b70bd16374f0092e6ab5e68"
);

res.cookie("token",token)

res.status(201).json({
    message:"user registered successfully",
    user:{
        _id: user._id,
        email:user.email,
        fullName:user.fullName,
    },
});
}

async function loginUser(req,res) {
}

module.exports={
    registerUser,
    loginUser
}