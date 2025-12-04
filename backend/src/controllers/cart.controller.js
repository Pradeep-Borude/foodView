// src/controllers/cart.controller.js
const cartModel = require("../models/cart.model");

async function addToCart(req, res) {
    try {
        const { foodId } = req.params;
        const userId = req.user._id;

        if (!foodId) {
            return res.status(400).json({ message: "foodId is required" });
        }

        let cartItem = await cartModel.findOne({
            user: userId,
            foodItem: foodId,
        });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            cartItem = await cartModel.create({
                user: userId,
                foodItem: foodId,
                quantity: 1,
            });
        }

        res.status(201).json({
            message: "Item added to cart successfully",
            cart: cartItem,
        });
    } catch (err) {
        console.error("addToCart error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function getCartItemByUSer(req, res) {
    try {
         const userId = req.user._id;

        const items = await cartModel.find({ user: userId }).populate("foodItem");

        return res.status(200).json({
            message: 'Food items fetched successfully',
            cartItem: items,
        });
    } catch (err) {
        console.error('getItemByPartner error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addToCart,
    getCartItemByUSer

};
