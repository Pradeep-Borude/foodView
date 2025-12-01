const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodPartner"
    },
    price: {
        type: Number,
        required: true
    }
});

const foodModel = mongoose.model("Food", foodSchema);
module.exports = foodModel;
