const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product_id : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Product",
        require: true
    },
    quantity: {
        type: Number,
        require: true
    }
})

cartSchema.statics.totalAmount = async function(cart){
    
    if(cart == undefined){
        cart = await this.find().populate('product_id');
    }
    
    totalAmount = 0;
    cart.forEach(item=> {
        totalAmount += item['product_id']['unit_price'] * item['quantity'];
    });
    return totalAmount;    
}

module.exports = mongoose.model("Cart", cartSchema)