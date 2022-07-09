const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name : {
        type: String,
        required: true
    }, 
    product_image : String,
    description : String,
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema)