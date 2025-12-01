const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.foodPartnerToken;
    
    if (!token) {
        return res.status(400).json({
            message: "please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
            return res.status(404).json({
                message: "Food partner not found"
            })
        }
        req.foodPartner = foodPartner
        next()

    } catch {
        return res.status(401).json({
            message: "invalid token"
        })

    }
}


async function authUserMiddleware(req, res, next) {
const token = req.cookies.userToken;

if (!token) {
    return res.status(400).json({
        message: "please login first"
    })

}

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id);
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    req.user = user

    next()
} catch (err) {
    return res.status(401).json({
        message: "invalid token"
    })
}

}
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}