const express = require('express');
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const cartController = require("../controllers/cart.controller");
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
});

/* ----------------------------------------
   FOOD PARTNER PROTECTED ROUTES
-----------------------------------------*/

// CREATE FOOD  (POST /api/food/)
router.post(
  '/',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("file"),
  foodController.createFood
);

// UPDATE FOOD  (PUT /api/food/:foodId)
router.put(
  '/:foodId',
  authMiddleware.authFoodPartnerMiddleware,
  upload.single('file'),
  foodController.updateFood
);

// DELETE FOOD  (DELETE /api/food/:foodId)
router.delete(
  '/:foodId',
  authMiddleware.authFoodPartnerMiddleware,
  foodController.deleteFood
);

// GET FOOD ITEMS BY PARTNER  (GET /api/food/:partnerId)
router.get(
  '/:partnerId',
  authMiddleware.authFoodPartnerMiddleware,
  foodController.getItemByPartner
);


/* ----------------------------------------
   USER CART ROUTE (Protected for User)
-----------------------------------------*/

// ADD TO CART  (POST /api/food/add-to-cart/:foodId)
router.post(
  '/add-to-cart/:foodId',
  authMiddleware.authUserMiddleware,
  cartController.addToCart
);



//get user's cart items
router.get(
  '/cart/:userId',
  authMiddleware.authUserMiddleware,
  cartController.getCartItemByUSer
);

/* ----------------------------------------
   PUBLIC FOOD ROUTE
-----------------------------------------*/

// GET ALL FOOD ITEMS (GET /api/food/)
router.get('/', foodController.getFoodItems);



module.exports = router;
