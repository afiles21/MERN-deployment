const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Store Name is required"],
        minLength: [3, "Store Name must be at least 3 characters"]
    },
    number: {
        type: Number,
        required: [true, "Store Number is required"],
        min: [1, "Store Number must be greater than 0"]
    },
    isOpen: {
        type: Boolean
    }
}, {timestamps: true})

module.exports = mongoose.model("Store", StoreSchema);