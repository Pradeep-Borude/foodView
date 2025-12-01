const express = require('express');
const authController = require("../controllers/auth.controller")
const  verify  = require("../controllers/user.auth");

const router = express.Router();

// user APIs
router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)
router.post('/user/logout',authController.logoutUser)

// food-partner APIs
router.post('/food-partner/register', authController.registeredFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);
router.post('/food-partner/logout', authController.logoutFoodPartner);


// NEW: auth check / profile for current food partner
router.get("/food-partner/me", verify.verifyFoodPartner, (req, res) => {
  return res.status(200).json({
    success: true,
    partner: req.foodPartner,
  });
});


// NEW: auth check / profile for current user
router.get("/food-partner/user", verify.verifyUser, (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = router;